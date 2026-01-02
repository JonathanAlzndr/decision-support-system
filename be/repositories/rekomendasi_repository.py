from models.hasil_rekomendasi import HasilRekomendasi
from models.alternatif import Alternatif
from utils.extensions import db

def save_riwayat_rekomendasi(user_id, result_data):
    try:
        top_saw = result_data['saw']['alternatif_terbaik']
        top_topsis = result_data['topsis']['alternatif_terbaik']

        if not top_saw or not top_topsis:
            return False

        riwayat = HasilRekomendasi(
            user_id=user_id,
            alternatif_id=top_saw['alternatif_id'], 
            skor_saw=top_saw['nilai_preferensi'],
            skor_topsis=top_topsis['nilai_preferensi'] 
        )
        
        db.session.add(riwayat)
        db.session.commit()
        return True

    except Exception as e:
        print(f"[ERROR] Gagal menyimpan riwayat: {e}")
        db.session.rollback()
        return False

def get_riwayat_rekomendasi_paginated(user_id, page, limit):
    return HasilRekomendasi.query.filter_by(user_id=user_id)\
        .join(Alternatif)\
        .order_by(HasilRekomendasi.created_at.desc())\
        .paginate(page=page, per_page=limit, error_out=False)