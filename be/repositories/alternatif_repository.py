from models.alternatif import Alternatif
from utils.extensions import db

def get_alternatif_paginated(page, limit):
    return Alternatif.query.paginate(page=page, per_page=limit, error_out=False)

def get_all_alternatif():
    return Alternatif.query.all()

def get_alternatif_by_id(id):
    return Alternatif.query.get(id)

def get_alternatif_by_kode(kode):
    return Alternatif.query.filter_by(kode=kode).first()

def create_new_alternatif(data):
    alternatif = Alternatif(
        kode=data['kode'], 
        nama_motor=data['nama_motor'], 
        deskripsi=data.get('deskripsi'), 
        gambar=data.get('gambar')
    )
    db.session.add(alternatif)
    db.session.commit()
    return alternatif

def update_alternatif_repo(alternatif, data):
    if "kode" in data:
        alternatif.kode = data["kode"]
    if "nama_motor" in data:
        alternatif.nama_motor = data["nama_motor"]
    if "deskripsi" in data:
        alternatif.deskripsi = data["deskripsi"]
    if "gambar" in data and data["gambar"] is not None:
        alternatif.gambar = data["gambar"]

    db.session.commit()
    return alternatif

def delete_alternatif_repo(alternatif):
    db.session.delete(alternatif)
    db.session.commit()