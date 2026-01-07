from models.penilaian import Penilaian
from models.kriteria import Kriteria
from models.sub_kriteria import SubKriteria
from utils.extensions import db
from sqlalchemy.orm import joinedload
from models.alternatif import Alternatif

def delete_existing_penilaian(alternatif_id):
    Penilaian.query.filter_by(alternatif_id=alternatif_id).delete()
    db.session.commit()

def create_bulk_penilaian(list_penilaian_objects):
    try:
        db.session.bulk_save_objects(list_penilaian_objects)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        raise e

def get_penilaian_by_alternatif_id(alternatif_id):
    return Penilaian.query.filter_by(alternatif_id=alternatif_id)\
        .join(Kriteria).join(SubKriteria)\
        .order_by(Kriteria.id)\
        .all()

def get_alternatif_exists(alternatif_id):
    from models.alternatif import Alternatif
    return db.session.query(Alternatif.id).filter_by(id=alternatif_id).first() is not None

def get_all_alternatif_with_penilaian():
    return Alternatif.query.options(
        joinedload(Alternatif.penilaian).joinedload(Penilaian.kriteria),
        joinedload(Alternatif.penilaian).joinedload(Penilaian.sub_kriteria_ref)
    ).all()