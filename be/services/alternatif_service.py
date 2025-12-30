from repositories.alternatif_repository import (
    get_all_alternatif,
    create_new_alternatif,
    delete_alternatif,
    update_alternatif,
    get_alternatif_by_id,
    get_alternatif_by_kode
)

from utils.extensions import db
from models.alternatif import Alternatif
import math 


def get_all_alternatif_service(page=1, limit=10): 
    data = get_all_alternatif()

    total_data = len(data)
    total_pages = math.ceil(total_data / limit) if limit > 0 else 1

    start = (page - 1) * limit
    end = start + limit

    paginated_data = data[start:end]
    formatted_data = [
        {
            "id": alternatif.id,
            "kode": alternatif.kode,
            "nama_motor": alternatif.nama_motor,
            "deskripsi": alternatif.deskripsi
        }
        for alternatif in paginated_data
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

def create_alternatif_service(data):
    if get_alternatif_by_kode(data.get("kode")):
        return {"message": "Alternatif with this kode already exists"}, 400
    create_new_alternatif(data.get("kode"), data.get("nama_motor"), data.get("deskripsi"))
    return {"message": "Alternatif created successfully"}, 201

def update_alternatif_service(id, data):
    alternatif = get_alternatif_by_id(id)
    if not alternatif:
        return {"message": "Alternatif not found"}, 404

    update_alternatif(alternatif, data)
    db.session.commit()
    return {"message": "Alternatif updated successfully"}, 200

def delete_alternatif_service(id):
    alternatif = get_alternatif_by_id(id)
    if not alternatif:
        return {"message": "Alternatif not found"}, 404

    delete_alternatif(id)
    return {"message": "Alternatif deleted successfully"}, 200

