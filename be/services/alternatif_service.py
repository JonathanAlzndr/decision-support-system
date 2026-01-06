from flask import request
from repositories.alternatif_repository import (
    get_alternatif_paginated,
    create_new_alternatif,
    update_alternatif_repo,
    delete_alternatif_repo,
    get_alternatif_by_id,
    get_alternatif_by_kode
)
from utils.file_handler import save_image, delete_image

def get_all_alternatif_service(page, limit):
    pagination = get_alternatif_paginated(page, limit)
   
    base_url = request.host_url.rstrip('/') 

    formatted_data = [
        {
            "id": item.id,
            "kode": item.kode,
            "nama_motor": item.nama_motor,
            "deskripsi": item.deskripsi,
            "gambar_url": f"{base_url}/static/uploads/alternatif/{item.gambar}" if item.gambar else None
        }
        for item in pagination.items
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
    }, 200

def create_alternatif_service():
    data = request.form.to_dict()
    file = request.files.get('gambar')

    if not data.get('kode') or not data.get('nama_motor'):
        return {"status": "error", "message": "Kode dan Nama Motor wajib diisi"}, 400
 
    if get_alternatif_by_kode(data['kode']):
        return {"status": "error", "message": "Kode alternatif sudah ada"}, 400

    filename = None
    if file:
        filename = save_image(file, folder='alternatif')
    
    data['gambar'] = filename

    try:
        new_alternatif = create_new_alternatif(data)
        return {"status": "success", "message": "Alternatif berhasil ditambahkan", "data": {"id": new_alternatif.id}}, 201
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

def update_alternatif_service(id):
    alternatif = get_alternatif_by_id(id)
    if not alternatif:
        return {"status": "error", "message": "Alternatif tidak ditemukan"}, 404

    data = request.form.to_dict()
    file = request.files.get('gambar')

    if file:
        if alternatif.gambar:
            delete_image(alternatif.gambar, folder='alternatif')

        new_filename = save_image(file, folder='alternatif')
        data['gambar'] = new_filename

    try:
        update_alternatif_repo(alternatif, data)
        return {"status": "success", "message": "Alternatif berhasil diperbarui"}, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

def delete_alternatif_service(id):
    alternatif = get_alternatif_by_id(id)
    if not alternatif:
        return {"status": "error", "message": "Alternatif tidak ditemukan"}, 404
    
    if alternatif.gambar:
        delete_image(alternatif.gambar, folder='alternatif')

    delete_alternatif_repo(alternatif)
    
    return {"status": "success", "message": "Alternatif berhasil dihapus"}, 200