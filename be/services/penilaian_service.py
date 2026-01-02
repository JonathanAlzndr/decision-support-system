from repositories.penilaian_repository import (
    get_all_penilaian_by_alternatif,
    create_new_penilaian,
    delete_penilaian,
    update_penilaian,
    get_penilaian_by_id,
    get_penilaian_by_alternatif_kriteria
)

from utils.extensions import db
from models.penilaian import Penilaian
import math 

def get_all_penilaian_service(alternatif_id, page=1, limit=10):
    data = get_all_penilaian_by_alternatif(alternatif_id=alternatif_id)

    total_data = len(data)
    total_pages = math.ceil(total_data / limit) if limit > 0 else 1

    start = (page - 1) * limit
    end = start + limit

    paginated_data = data[start:end]
    formatted_data = [
        {
            "kriteria_id": penilaian.kriteria_id,
            "nilai_skor": penilaian.nilai_skor
        }   
        for penilaian in paginated_data
    ]
    return {
        "data": formatted_data,
        "meta": {
            "page": page,
            "limit": limit,
            "total_pages": total_pages,
            "total_data": total_data
        }
    }

def create_penilaian_service(data):
    try:
        create_new_penilaian(
            data.get("alternatif_kode"),
            data.get("kriteria_kode"),
            data.get("nilai_skor")
        )
    except ValueError as e:
        return {"message": str(e)}, 400

    return {"message": "Penilaian berhasil dibuat"}, 201

def update_penilaian_service(id, data):
    penilaian = get_penilaian_by_id(id)
    if not penilaian:
        return {"message": "Penilaian not found"}, 404

    update_penilaian(penilaian, data)
    db.session.commit()
    return {"message": "Penilaian updated successfully"}, 200

def delete_penilaian_service(id):
    penilaian = get_penilaian_by_id(id)
    if not penilaian:
        return {"message": "Penilaian not found"}, 404
    
    delete_penilaian(id)
    return {"message": "Penilaian deleted successfully"}, 200