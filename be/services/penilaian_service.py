from repositories.penilaian_repository import (
    create_bulk_penilaian,
    delete_existing_penilaian,
    get_penilaian_by_alternatif_id,
    get_alternatif_exists
)
from repositories.kriteria_repository import get_kriteria_by_id
from models.penilaian import Penilaian
from utils.extensions import db

def create_update_penilaian_batch_service(data):
    alternatif_id = data.get("alternatif_id")
    list_penilaian = data.get("penilaian", [])

    if not alternatif_id:
        return {"status": "error", "message": "alternatif_id wajib diisi"}, 400
    
    if not list_penilaian or not isinstance(list_penilaian, list):
        return {"status": "error", "message": "Data penilaian (array) tidak boleh kosong"}, 400

    if not get_alternatif_exists(alternatif_id):
        return {"status": "error", "message": "Alternatif tidak ditemukan"}, 404

    try:
        delete_existing_penilaian(alternatif_id)

        new_objects = []
        for item in list_penilaian:
            if "kriteria_id" not in item or "sub_kriteria_id" not in item:
                continue
            
            penilaian = Penilaian(
                alternatif_id=alternatif_id,
                kriteria_id=item["kriteria_id"],
                sub_kriteria_id=item["sub_kriteria_id"]
            )
            new_objects.append(penilaian)
        
        if new_objects:
            create_bulk_penilaian(new_objects)
        
        return {
            "status": "success", 
            "message": "Spesifikasi penilaian berhasil disimpan",
            "data": {
                "alternatif_id": alternatif_id,
                "total_disimpan": len(new_objects)
            }
        }, 201

    except Exception as e:
        return {"status": "error", "message": f"Gagal menyimpan data: {str(e)}"}, 500


def get_penilaian_by_alternatif_service(alternatif_id):

    if not get_alternatif_exists(alternatif_id):
        return {"status": "error", "message": "Alternatif tidak ditemukan"}, 404

    raw_data = get_penilaian_by_alternatif_id(alternatif_id)
    
    formatted_data = []
    for p in raw_data:
        formatted_data.append({
            "kriteria_id": p.kriteria.id,
            "kode_kriteria": p.kriteria.kode,
            "nama_kriteria": p.kriteria.nama,
            "sifat": p.kriteria.sifat,
            "sub_kriteria_selected": {
                "id": p.sub_kriteria_ref.id,
                "nama_sub": p.sub_kriteria_ref.nama_sub,     
                "nilai_konversi": p.sub_kriteria_ref.nilai, 
                "keterangan": p.sub_kriteria_ref.keterangan
            }
        })

    return {
        "status": "success",
        "data": {
            "alternatif_id": alternatif_id,
            "penilaian": formatted_data
        }
    }, 200