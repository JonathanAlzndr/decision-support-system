from utils.extensions import db

class Kriteria(db.Model):
    __tablename__ = 'kriteria'
    id = db.Column(db.Integer, primary_key=True)
    kode = db.Column(db.String(5), unique=True, nullable=False) # C1, C2, dst [cite: 622]
    nama = db.Column(db.String(100), nullable=False) # Harga, Kecepatan, dst [cite: 622]
    # Sifat: 'benefit' atau 'cost' 
    sifat = db.Column(db.String(10), nullable=False) 

    def __repr__(self):
        return f'<Kriteria {self.kode}>'