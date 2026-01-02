from models.alternatif import Alternatif
from models.kriteria import Kriteria
from models.user import User  
from models.penilaian import Penilaian
from models.hasil_rekomendasi import HasilRekomendasi
from utils.extensions import db
from sqlalchemy import func

def get_counts_summary():

    try:
        total_alternatif = Alternatif.query.count()
        total_kriteria = Kriteria.query.count()
        total_users = User.query.count()

        total_penilaian = db.session.query(func.count(func.distinct(Penilaian.alternatif_id))).scalar()

        return {
            "total_alternatif": total_alternatif,
            "total_kriteria": total_kriteria,
            "total_users": total_users,
            "total_penilaian": total_penilaian
        }
    except Exception as e:
        print(f"[ERROR] Dashboard Count: {e}")
        return {
            "total_alternatif": 0, "total_kriteria": 0, 
            "total_users": 0, "total_penilaian": 0
        }

def get_last_activity_time():
    last_rec = HasilRekomendasi.query.order_by(HasilRekomendasi.created_at.desc()).first()
    if last_rec:
        return last_rec.created_at
    return None