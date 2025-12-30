from repositories.kriteria_repository import (
    get_all_kriteria,
    create_new_kriteria,
    delete_kriteria,
    update_kriteria,
    get_kriteria_by_kode,
    get_kriteria_by_id
)
import math
from utils.extensions import db
from models.kriteria import Kriteria

def get_all_kriteria_service(page=1, limit=10):
    data = get_all_kriteria()

    total_data = len(data)
    total_pages = math.ceil(total_data / limit) if limit > 0 else 1

    start = (page - 1) * limit
    end = start + limit

    paginated_data = data[start:end]

    formatted_data = [
        {
            "id": kriteria.id,
            "kode": kriteria.kode,
            "nama": kriteria.nama,
            "sifat": kriteria.sifat
        }
        for kriteria in paginated_data
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

def create_kriteria_service(data):
    if get_kriteria_by_kode(data.get("kode")):
        return {"message": "Kriteria with the same ID already exists"}, 400
    
    create_new_kriteria(data.get("kode"), data.get("nama"), data.get("sifat"))
    return {"message": "Kriteria created successfully"}, 201

def delete_kriteria_service(id):
    kriteria = get_kriteria_by_id(id)
    if not kriteria:
        return {"message": "Kriteria not found"}, 404
    
    delete_kriteria(id)
    return {"message": "Kriteria deleted successfully"}, 200

def update_kriteria_service(id, data):
    kriteria = Kriteria.query.get(id)
    if not kriteria:
        return {"message": "Kriteria not found"}, 404

    update_kriteria(kriteria, data)
    db.session.commit()
    return {"message": "Kriteria updated successfully"}, 200
