from utils.extensions import db
from models.alternatif import Alternatif

def create_new_alternatif(kode, nama_motor, deskripsi):
    alternatif = Alternatif(kode=kode, nama_motor=nama_motor, deskripsi=deskripsi)
    db.session.add(alternatif)
    db.session.commit()
    return alternatif

def get_all_alternatif():
    return Alternatif.query.all()

def update_alternatif(alternatif, data):
    if "kode" in data:
        alternatif.kode = data["kode"]
    if "nama_motor" in data:
        alternatif.nama_motor = data["nama_motor"]
    if "deskripsi" in data:
        alternatif.deskripsi = data["deskripsi"]
    return alternatif

def get_alternatif_by_id(id):
    return Alternatif.query.get(id)

def delete_alternatif(id):
    alternatif = Alternatif.query.get(id)
    if alternatif:
        db.session.delete(alternatif)
        db.session.commit()
        return True
    return False

def get_alternatif_by_kode(kode):
    return Alternatif.query.filter_by(kode=kode).first()
