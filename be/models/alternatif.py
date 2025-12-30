from utils.extensions import db

class Alternatif(db.Model):
    __tablename__ = 'alternatif'
    id = db.Column(db.Integer, primary_key=True)
    kode = db.Column(db.String(5), unique=True, nullable=False) # A1, A2, dst [cite: 625]
    nama_motor = db.Column(db.String(100), nullable=False) # Viar Q1, dst [cite: 264]
    deskripsi = db.Column(db.Text, nullable=True)

    # Relasi ke tabel penilaian (skoring)
    skor_kriteria = db.relationship('Penilaian', backref='motor',cascade='all, delete')