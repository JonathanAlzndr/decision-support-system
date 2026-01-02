from utils.extensions import db
from models.kriteria import Kriteria

def create_new_kriteria(kode, nama, sifat, bobot):
    if sifat not in ["benefit", "cost"]:
        raise ValueError("Sifat harus 'benefit' atau 'cost'")

    kriteria = Kriteria(
        kode=kode,
        nama=nama,
        sifat=sifat,
        bobot=bobot
    )
    db.session.add(kriteria)
    db.session.commit()
    return kriteria

def get_all_kriteria():
    return Kriteria.query.all()

def delete_kriteria(id):
    kriteria = Kriteria.query.get(id)
    if kriteria:
        db.session.delete(kriteria)
        db.session.commit()
        return True
    return False

def update_kriteria(kriteria, data):
    if "kode" in data:
        kriteria.kode = data["kode"]
    if "nama" in data:
        kriteria.nama = data["nama"]
    if "sifat" in data:
        kriteria.sifat = data["sifat"]
    return kriteria


def get_kriteria_by_id(id):
    return Kriteria.query.get(id)

def get_kriteria_by_kode(kode):
    return Kriteria.query.filter_by(kode=kode).first()