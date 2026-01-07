from models.kriteria import Kriteria
from models.sub_kriteria import SubKriteria
from utils.extensions import db
from models.penilaian import Penilaian

def create_new_kriteria(kode, nama, sifat, bobot):
    kriteria = Kriteria(kode=kode, nama=nama, sifat=sifat, bobot=bobot)
    db.session.add(kriteria)
    db.session.commit()
    return kriteria

def get_kriteria_paginated(page, limit):
    return Kriteria.query.paginate(page=page, per_page=limit, error_out=False)

def get_kriteria_by_id(id):
    return Kriteria.query.get(id)

def get_kriteria_by_kode(kode):
    return Kriteria.query.filter_by(kode=kode).first()

def update_kriteria(kriteria, data):
    if "kode" in data: kriteria.kode = data["kode"]
    if "nama" in data: kriteria.nama = data["nama"]
    if "sifat" in data: kriteria.sifat = data["sifat"]
    if "bobot" in data: kriteria.bobot = data["bobot"]
    return kriteria

def delete_kriteria(id):
    kriteria = Kriteria.query.get(id)
    if kriteria:
        db.session.delete(kriteria)
        db.session.commit()
        return True
    return False

def create_sub_kriteria(kriteria_id, nama_sub, nilai, keterangan=None):
    sub = SubKriteria(
        kriteria_id=kriteria_id,
        nama_sub=nama_sub,
        nilai=nilai,
        keterangan=keterangan
    )
    db.session.add(sub)
    db.session.commit()
    return sub

def get_all_kriteria():
    return Kriteria.query.all()

def get_sub_kriteria_by_kriteria_id(kriteria_id):
    return SubKriteria.query.filter_by(kriteria_id=kriteria_id).all()

def get_sub_kriteria_by_id(id):
    return SubKriteria.query.get(id)

def update_sub_kriteria(sub, data):
    if "nama_sub" in data: sub.nama_sub = data["nama_sub"]
    if "nilai" in data: sub.nilai = data["nilai"]
    if "keterangan" in data: sub.keterangan = data["keterangan"]
    return sub

def delete_sub_kriteria(id):
    sub = SubKriteria.query.get(id)
    if sub:
        db.session.delete(sub)
        db.session.commit()
        return True
    return False

def is_sub_kriteria_used(sub_id):
    """Cek apakah sub-kriteria ini sudah dipakai di penilaian motor"""
    return Penilaian.query.filter_by(sub_kriteria_id=sub_id).first() is not None