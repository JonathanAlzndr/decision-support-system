import time
import numpy as np
from models.penilaian import Penilaian
from repositories.alternatif_repository import get_all_alternatif
from repositories.kriteria_repository import get_all_kriteria
from utils.extensions import db


def calculate_rekomendasi(detail=False, bobot_custom_input=None):

    alternatif_list = get_all_alternatif()
    kriteria_list = get_all_kriteria()

    if not alternatif_list:
        raise ValueError("Data alternatif belum tersedia. Mohon input data motor dulu.")
    if not kriteria_list:
        raise ValueError("Data kriteria belum tersedia.")

    X = _build_decision_matrix(alternatif_list, kriteria_list)
    w = _get_bobot_normalized(kriteria_list, bobot_custom_input)
    jenis = _get_jenis_kriteria(kriteria_list)

    start_saw = time.perf_counter()
    saw_result = _calculate_saw(X, w, jenis, alternatif_list, kriteria_list, detail)
    end_saw = time.perf_counter()

    start_topsis = time.perf_counter()
    topsis_result = _calculate_topsis(X, w, jenis, alternatif_list, kriteria_list, detail)
    end_topsis = time.perf_counter()

    execution_time = {
        "saw_ms": round((end_saw - start_saw) * 1000, 4),
        "topsis_ms": round((end_topsis - start_topsis) * 1000, 4)
    }

    ranking_consistency = _calculate_ranking_consistency(
        saw_result["ranking"],
        topsis_result["ranking"]
    )

    return {
        "saw": saw_result,
        "topsis": topsis_result,
        "execution_time": execution_time,
        "ranking_consistency": ranking_consistency
    }

def _build_decision_matrix(alternatif_list, kriteria_list):

    m = len(alternatif_list)
    n = len(kriteria_list)
    X = np.zeros((m, n))

    alt_map = {alt.id: i for i, alt in enumerate(alternatif_list)}
    kri_map = {kri.id: j for j, kri in enumerate(kriteria_list)}

    all_penilaian = Penilaian.query.options(
        db.joinedload(Penilaian.sub_kriteria_ref)
    ).all()

    for p in all_penilaian:
        if p.alternatif_id in alt_map and p.kriteria_id in kri_map:
            row = alt_map[p.alternatif_id]
            col = kri_map[p.kriteria_id]

            if p.sub_kriteria_ref:
                X[row][col] = p.sub_kriteria_ref.nilai
            else:
                X[row][col] = 0

    if np.any(X == 0):
        raise ValueError(
            "Data penilaian belum lengkap. Pastikan semua motor memiliki spesifikasi untuk setiap kriteria."
        )

    return X


def _get_bobot_normalized(kriteria_list, custom_input=None):

    raw_weights = []
    custom_map = {}

    if custom_input:
        for item in custom_input:
            if "kriteria_kode" in item and "nilai" in item:
                custom_map[item["kriteria_kode"]] = float(item["nilai"])

    for k in kriteria_list:
        raw_weights.append(custom_map.get(k.kode, k.bobot))

    w = np.array(raw_weights, dtype=float)

    if w.sum() == 0:
        raise ValueError("Total bobot tidak boleh 0.")

    return w / w.sum()


def _get_jenis_kriteria(kriteria_list):
    return np.array([1 if k.sifat.lower() == "benefit" else 0 for k in kriteria_list])


def _calculate_saw(X, w, jenis, alternatif_list, kriteria_list, detail):

    R = np.zeros_like(X, dtype=float)

    for j in range(len(kriteria_list)):
        col = X[:, j]
        if jenis[j] == 1:  # benefit
            R[:, j] = col / col.max() if col.max() != 0 else 0
        else:  # cost
            R[:, j] = col.min() / col if col.min() != 0 else 0

    V = R.dot(w)
    ranking = _format_ranking(alternatif_list, V)

    result = {
        "metode": "Simple Additive Weighting (SAW)",
        "alternatif_terbaik": ranking[0] if ranking else None,
        "ranking": ranking
    }

    if detail:
        result["detail"] = {
            "matriks_keputusan_X": _serialize_matrix(X, alternatif_list, kriteria_list),
            "matriks_normalisasi_R": _serialize_matrix(R, alternatif_list, kriteria_list),
            "bobot_W": list(w),
            "nilai_preferensi_V": list(np.round(V, 4))
        }

    return result

def _calculate_topsis(X, w, jenis, alternatif_list, kriteria_list, detail):

    pembagi = np.sqrt((X ** 2).sum(axis=0))
    pembagi[pembagi == 0] = 1

    R = X / pembagi
    Y = R * w

    A_plus = np.where(jenis == 1, Y.max(axis=0), Y.min(axis=0))
    A_min  = np.where(jenis == 1, Y.min(axis=0), Y.max(axis=0))

    D_plus = np.sqrt(((Y - A_plus) ** 2).sum(axis=1))
    D_min  = np.sqrt(((Y - A_min) ** 2).sum(axis=1))

    denom = D_plus + D_min
    V = np.divide(D_min, denom, out=np.zeros_like(D_min), where=denom != 0)

    ranking = _format_ranking(alternatif_list, V)

    result = {
        "metode": "TOPSIS",
        "alternatif_terbaik": ranking[0] if ranking else None,
        "ranking": ranking
    }

    if detail:
        result["detail"] = {
            "matriks_normalisasi_R": _serialize_matrix(R, alternatif_list, kriteria_list),
            "matriks_terbobot_Y": _serialize_matrix(Y, alternatif_list, kriteria_list),
            "solusi_ideal_plus": list(np.round(A_plus, 4)),
            "solusi_ideal_min": list(np.round(A_min, 4)),
            "nilai_preferensi_V": list(np.round(V, 4))
        }

    return result

def _format_ranking(alternatif_list, V):

    ranking = [
        {
            "alternatif_id": alt.id,
            "kode": alt.kode,
            "nama_motor": alt.nama_motor,
            "nilai_preferensi": round(float(V[i]), 4)
        }
        for i, alt in enumerate(alternatif_list)
    ]

    ranking.sort(key=lambda x: x["nilai_preferensi"], reverse=True)
    return ranking


def _calculate_ranking_consistency(ranking_saw, ranking_topsis):

    saw_map = {item["alternatif_id"]: idx + 1 for idx, item in enumerate(ranking_saw)}
    topsis_map = {item["alternatif_id"]: idx + 1 for idx, item in enumerate(ranking_topsis)}

    same_count = 0
    detail = []

    for alt_id, saw_rank in saw_map.items():
        topsis_rank = topsis_map.get(alt_id)
        is_same = saw_rank == topsis_rank

        if is_same:
            same_count += 1

        detail.append({
            "alternatif_id": alt_id,
            "rank_saw": saw_rank,
            "rank_topsis": topsis_rank,
            "same": is_same
        })

    total = len(saw_map)
    percentage = round((same_count / total) * 100, 2) if total > 0 else 0

    return {
        "total_alternatif": total,
        "same_rank_count": same_count,
        "consistency_percentage": percentage,
        "detail": detail
    }


def _serialize_matrix(matrix, alternatif_list, kriteria_list):

    result = {}
    for i, alt in enumerate(alternatif_list):
        result[alt.kode] = {}
        for j, kri in enumerate(kriteria_list):
            result[alt.kode][kri.kode] = round(float(matrix[i][j]), 4)
    return result
