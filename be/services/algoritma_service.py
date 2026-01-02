import numpy as np

from repositories.alternatif_repository import get_all_alternatif
from repositories.kriteria_repository import get_all_kriteria
from repositories.penilaian_repository import get_all_penilaian_by_alternatif


# =====================================================
# UTILITIES
# =====================================================

def serialize_matrix(matrix, alternatif_list, kriteria_list, precision=4):
    """
    Mengubah matriks numpy menjadi dict:
    {A1: {C1: x, C2: y}, A2: {...}}
    """
    result = {}
    for i, alt in enumerate(alternatif_list):
        result[alt.kode] = {}
        for j, kri in enumerate(kriteria_list):
            result[alt.kode][kri.kode] = round(float(matrix[i][j]), precision)
    return result


def build_decision_matrix(alternatif_list, kriteria_list):
    """
    Membentuk matriks keputusan X dari tabel penilaian
    """
    m, n = len(alternatif_list), len(kriteria_list)

    alt_index = {a.id: i for i, a in enumerate(alternatif_list)}
    kri_index = {k.id: j for j, k in enumerate(kriteria_list)}

    X = np.zeros((m, n))

    for alt in alternatif_list:
        penilaian_list = get_all_penilaian_by_alternatif(alt.id)
        for p in penilaian_list:
            i = alt_index[p.alternatif_id]
            j = kri_index[p.kriteria_id]
            X[i][j] = p.nilai_skor

    # validasi kelengkapan data
    if np.any(X == 0):
        raise ValueError(
            "Penilaian belum lengkap. "
            "Setiap alternatif harus memiliki nilai untuk semua kriteria."
        )

    return X


def get_bobot(kriteria_list):
    w = np.array([k.bobot for k in kriteria_list], dtype=float)
    if w.sum() == 0:
        raise ValueError("Total bobot kriteria tidak boleh 0")
    return w / w.sum()


def get_jenis_kriteria(kriteria_list):
    return np.array([
        1 if k.sifat == "benefit" else 0
        for k in kriteria_list
    ])


# =====================================================
# MAIN ENTRY
# =====================================================

def calculate_rekomendasi(detail=False):
    return {
        "saw": calculate_saw(detail),
        "topsis": calculate_topsis(detail)
    }


# =====================================================
# SAW
# =====================================================

def calculate_saw(detail=False):
    alternatif_list = get_all_alternatif()
    kriteria_list = get_all_kriteria()

    if not alternatif_list or not kriteria_list:
        raise ValueError("Data alternatif atau kriteria belum tersedia")

    X = build_decision_matrix(alternatif_list, kriteria_list)
    w = get_bobot(kriteria_list)
    jenis = get_jenis_kriteria(kriteria_list)

    # normalisasi SAW
    R = np.zeros_like(X, dtype=float)

    for j in range(len(kriteria_list)):
        col = X[:, j]
        if jenis[j] == 1:  # benefit
            max_val = col.max()
            R[:, j] = col / max_val if max_val != 0 else 0
        else:  # cost
            min_val = col.min()
            R[:, j] = min_val / col if min_val != 0 else 0

    # nilai preferensi
    V = R.dot(w)

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

    result = {
        "metode": "Simple Additive Weighting (SAW)",
        "alternatif_terbaik": ranking[0],
        "ranking": ranking
    }

    if detail:
        result["tahapan"] = {
            "matriks_keputusan": serialize_matrix(X, alternatif_list, kriteria_list),
            "normalisasi": serialize_matrix(R, alternatif_list, kriteria_list),
            "bobot": {
                k.kode: round(float(w[i]), 4)
                for i, k in enumerate(kriteria_list)
            },
            "nilai_preferensi": {
                alt.kode: round(float(V[i]), 4)
                for i, alt in enumerate(alternatif_list)
            }
        }

    return result


# =====================================================
# TOPSIS
# =====================================================

def calculate_topsis(detail=False):
    alternatif_list = get_all_alternatif()
    kriteria_list = get_all_kriteria()

    if not alternatif_list or not kriteria_list:
        raise ValueError("Data alternatif atau kriteria belum tersedia")

    X = build_decision_matrix(alternatif_list, kriteria_list)
    w = get_bobot(kriteria_list)
    jenis = get_jenis_kriteria(kriteria_list)

    # normalisasi TOPSIS
    pembagi = np.sqrt((X ** 2).sum(axis=0))
    pembagi[pembagi == 0] = 1
    R = X / pembagi

    # normalisasi berbobot
    Y = R * w

    # solusi ideal
    A_plus = np.where(jenis == 1, Y.max(axis=0), Y.min(axis=0))
    A_min  = np.where(jenis == 1, Y.min(axis=0), Y.max(axis=0))

    # jarak
    D_plus = np.sqrt(((Y - A_plus) ** 2).sum(axis=1))
    D_min  = np.sqrt(((Y - A_min) ** 2).sum(axis=1))

    # nilai preferensi
    V = D_min / (D_plus + D_min)

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

    result = {
        "metode": "Technique for Order Preference by Similarity to Ideal Solution (TOPSIS)",
        "alternatif_terbaik": ranking[0],
        "ranking": ranking
    }

    if detail:
        result["tahapan"] = {
            "matriks_keputusan": serialize_matrix(X, alternatif_list, kriteria_list),
            "normalisasi": serialize_matrix(R, alternatif_list, kriteria_list),
            "normalisasi_berbobot": serialize_matrix(Y, alternatif_list, kriteria_list),
            "solusi_ideal": {
                "A_plus": {
                    k.kode: round(float(A_plus[i]), 4)
                    for i, k in enumerate(kriteria_list)
                },
                "A_min": {
                    k.kode: round(float(A_min[i]), 4)
                    for i, k in enumerate(kriteria_list)
                }
            },
            "nilai_preferensi": {
                alt.kode: round(float(V[i]), 4)
                for i, alt in enumerate(alternatif_list)
            }
        }

    return result
