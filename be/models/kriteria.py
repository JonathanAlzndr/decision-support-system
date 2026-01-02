from utils.extensions import db

class Kriteria(db.Model):
    __tablename__ = 'kriteria'
    id = db.Column(db.Integer, primary_key=True)
    kode = db.Column(db.String(5), unique=True, nullable=False) 
    nama = db.Column(db.String(100), nullable=False)    
    sifat = db.Column(
        db.Enum('benefit', 'cost', name='sifat_kriteria'),
        nullable=False
    )
    bobot = db.Column(db.Float, nullable=False) 
    penilaian = db.relationship('Penilaian', backref='kriteria', lazy=True)
    
    def __repr__(self):
        return f'<Kriteria {self.kode}>'