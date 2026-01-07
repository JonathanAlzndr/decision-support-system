from repositories.kriteria_repository import (
    get_kriteria_paginated,
    create_new_kriteria,
    delete_kriteria,
    update_kriteria,
    get_kriteria_by_kode,
    get_kriteria_by_id,
    create_sub_kriteria,
    get_sub_kriteria_by_kriteria_id,
    get_sub_kriteria_by_id,
    update_sub_kriteria,
    delete_sub_kriteria,
    is_sub_kriteria_used
)
from utils.extensions import db


def get_all_kriteria_service(page=1, limit=10):
    pagination = get_kriteria_paginated(page, limit)
    
    formatted_data = [
        {
            "id": k.id,
            "kode": k.kode,
            "nama": k.nama,
            "sifat": k.sifat,
            "bobot": k.bobot,
            "sub_kriteria": [
                { 
                    "id": sub.id,
                    "nama_sub": sub.nama_sub,
                    "nilai": sub.nilai,
                    "keterangan": sub.keterangan
                }
                for sub in k.sub_kriteria
            ]
        }
        for k in pagination.items
    ]

    return {
        "status": "success",
        "data": formatted_data,
        "meta": {
            "page": page,
            "limit": limit,
            "total_pages": pagination.pages,
            "total_data": pagination.total
        }
    }


def create_kriteria_service(data):

    if get_kriteria_by_kode(data.get("kode")):
        return {"status": "error", "message": "Kriteria dengan kode ini sudah ada"}, 400

    sifat = data.get("sifat", "").lower()
    if sifat not in ["benefit", "cost"]:
        return {"status": "error", "message": "Sifat harus 'benefit' atau 'cost'"}, 400

    try:
        create_new_kriteria(
            data.get("kode"),
            data.get("nama"),
            sifat,
            data.get("bobot")
        )
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

    return {"status": "success", "message": "Kriteria berhasil dibuat"}, 201

def update_kriteria_service(id, data):
    kriteria = get_kriteria_by_id(id)
    if not kriteria:
        return {"status": "error", "message": "Kriteria tidak ditemukan"}, 404

    if "sifat" in data and data["sifat"].lower() not in ["benefit", "cost"]:
        return {"status": "error", "message": "Sifat harus 'benefit' atau 'cost'"}, 400

    update_kriteria(kriteria, data)
    db.session.commit() 
    return {"status": "success", "message": "Kriteria berhasil diperbarui"}, 200

def delete_kriteria_service(id):
    if not get_kriteria_by_id(id):
        return {"status": "error", "message": "Kriteria tidak ditemukan"}, 404
    
    delete_kriteria(id)
    return {"status": "success", "message": "Kriteria berhasil dihapus"}, 200

def create_sub_kriteria_service(data):
    kriteria_id = data.get("kriteria_id")
    if not get_kriteria_by_id(kriteria_id):
        return {"status": "error", "message": "Kriteria induk tidak ditemukan"}, 404

    try:
        create_sub_kriteria(
            kriteria_id,
            data.get("nama_sub"),
            data.get("nilai"),
            data.get("keterangan")
        )
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

    return {"status": "success", "message": "Sub-kriteria berhasil ditambahkan"}, 201

def get_sub_kriteria_service(kriteria_id):
    subs = get_sub_kriteria_by_kriteria_id(kriteria_id)
    
    data = [
        {
            "id": s.id,
            "nama_sub": s.nama_sub,
            "nilai": s.nilai,
            "keterangan": s.keterangan
        } for s in subs
    ]
    return {"status": "success", "data": data}, 200

def update_sub_kriteria_service(id, data):
    sub = get_sub_kriteria_by_id(id)
    if not sub:
        return {"status": "error", "message": "Sub-kriteria tidak ditemukan"}, 404

    try:
        update_sub_kriteria(sub, data)
        db.session.commit()
        return {"status": "success", "message": "Sub-kriteria berhasil diperbarui"}, 200
    except Exception as e:
        db.session.rollback()
        return {"status": "error", "message": str(e)}, 500

def delete_sub_kriteria_service(id):
    sub = get_sub_kriteria_by_id(id)
    if not sub:
        return {"status": "error", "message": "Sub-kriteria tidak ditemukan"}, 404

    if is_sub_kriteria_used(id):
        return {
            "status": "error", 
            "message": "Tidak dapat menghapus: Sub-kriteria ini sedang digunakan dalam penilaian motor."
        }, 400

    try:
        delete_sub_kriteria(id)
        return {"status": "success", "message": "Sub-kriteria berhasil dihapus"}, 200
    except Exception as e:
        db.session.rollback()
        return {"status": "error", "message": str(e)}, 500