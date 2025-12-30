from repositories.penilaian_repository import (
    get_all_penilaian,
    create_new_penilaian,
    delete_penilaian,
    update_penilaian,
    get_penilaian_by_id
)

from utils.extensions import db
from models.penilaian import Penilaian
import math 

def get_all_penilaian_service(page=1, limit=10):
    data = get_all_penilaian()

    total_data = len(data)
    total_pages = math.ceil(total_data / limit) if limit > 0 else 1

    start = (page - 1) * limit
    end = start + limit

    paginated_data = data[start:end]
    formatted_data = [
        {
            "id": penilaian.id,
            "nama": penilaian.nama,
            "nilai": penilaian.nilai
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
    if get_penilaian_by_id(data.get("id")):
        return {"message": "Penilaian with this ID already exists"}, 400
    create_new_penilaian(data.get("nama"), data.get("nilai"), data.get("nilai_skor"))
    return {"message": "Penilaian created successfully"}, 201

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