from utils.extensions import db
from models.penilaian import Penilaian
from sqlalchemy.exc import IntegrityError
from repositories.kriteria_repository import get_kriteria_by_kode
from repositories.alternatif_repository import get_alternatif_by_kode

def create_new_penilaian(alternatif_kode, kriteria_kode, nilai_skor):
    alternatif = get_alternatif_by_kode(alternatif_kode)
    if not alternatif:
        raise ValueError("Alternatif tidak ditemukan")

    kriteria = get_kriteria_by_kode(kriteria_kode)
    if not kriteria:
        raise ValueError("Kriteria tidak ditemukan")
    
    if nilai_skor <= 0:
        raise ValueError("Nilai skor harus lebih besar dari 0")

    penilaian = Penilaian(
        alternatif_id=alternatif.id,
        kriteria_id=kriteria.id,
        nilai_skor=nilai_skor
    )

    db.session.add(penilaian)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise ValueError("Penilaian untuk alternatif & kriteria ini sudah ada")

    return penilaian


def get_all_penilaian_by_alternatif(alternatif_id):
    return Penilaian.query.filter_by(alternatif_id=alternatif_id).all()

def get_penilaian_by_id(id):
    return Penilaian.query.get(id)

def get_penilaian_by_alternatif_kriteria(alternatif_id, kriteria_id):
    return Penilaian.query.filter_by(alternatif_id=alternatif_id, kriteria_id=kriteria_id).first()

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