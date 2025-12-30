from utils.extensions import db
from datetime import datetime

class HasilRekomendasi(db.Model):
    __tablename__ = 'hasil_rekomendasi'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    alternatif_id = db.Column(db.Integer, db.ForeignKey('alternatif.id'), nullable=False)
    skor_saw = db.Column(db.Float) # Hasil perhitungan SAW [cite: 760]
    skor_topsis = db.Column(db.Float) # Hasil perhitungan TOPSIS [cite: 1067]
    created_at = db.Column(db.DateTime, default=datetime.utcnow())