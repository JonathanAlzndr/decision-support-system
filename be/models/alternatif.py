from utils.extensions import db

class Alternatif(db.Model):
    __tablename__ = 'alternatif'
    id = db.Column(db.Integer, primary_key=True)
    kode = db.Column(db.String(5), unique=True, nullable=False) 
    nama_motor = db.Column(db.String(100), nullable=False)
    deskripsi = db.Column(db.Text, nullable=True)
    gambar = db.Column(db.String(255), nullable=True)
    penilaian = db.relationship('Penilaian', backref='alternatif', cascade='all, delete-orphan')