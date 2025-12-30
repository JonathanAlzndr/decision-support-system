from utils.extensions import db
from models.penilaian import Penilaian

def create_new_penilaian(alternatif_id, kriteria_id, nilai_skor):
    penilaian = Penilaian(alternatif_id=alternatif_id, kriteria_id=kriteria_id, nilai_skor=nilai_skor)
    db.session.add(penilaian)
    db.session.commit()
    return penilaian

def get_all_penilaian():
    return Penilaian.query.all()

def get_penilaian_by_id(id):
    return Penilaian.query.get(id)

def delete_penilaian(id):
    penilaian = Penilaian.query.get(id)
    if penilaian:
        db.session.delete(penilaian)
        db.session.commit()
        return True
    return False

def update_penilaian(penilaian, data):
    if "alternatif_id" in data:
        penilaian.alternatif_id = data["alternatif_id"]
    if "kriteria_id" in data:
        penilaian.kriteria_id = data["kriteria_id"]
    if "nilai_skor" in data:
        penilaian.nilai_skor = data["nilai_skor"]
    return penilaian