from utils.extensions import db

class Alternatif(db.Model):
    __tablename__ = 'alternatif'
    id_alternatif = db.Column(db.Integer, primary_key=True)
    nama_motor = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(50))
    gambar = db.Column(db.String(255))
    deskripsi = db.Column(db.Text)

    # Relasi
    penilaian = db.relationship('Penilaian', backref='alternatif', cascade="all, delete-orphan")
    hasil = db.relationship('HasilAkhir', backref='alternatif', uselist=False, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Alternatif {self.nama_motor}>'