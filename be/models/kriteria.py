from utils.extensions import db

class Kriteria(db.Model):
    __tablename__ = 'kriteria'
    id_kriteria = db.Column(db.Integer, primary_key=True)
    kode_kriteria = db.Column(db.String(10), nullable=False)
    nama_kriteria = db.Column(db.String(100), nullable=False)
    atribut = db.Column(db.Enum('benefit', 'cost'), nullable=False)
    bobot = db.Column(db.Float, nullable=False)

    # Relasi ke penilaian
    penilaian = db.relationship('Penilaian', backref='kriteria', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Kriteria {self.kode_kriteria}>'