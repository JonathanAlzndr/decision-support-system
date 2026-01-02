from utils.extensions import db

class SubKriteria(db.Model):
    __tablename__ = 'sub_kriteria'
    
    id = db.Column(db.Integer, primary_key=True)
    # Foreign Key ke Kriteria Induk
    kriteria_id = db.Column(db.Integer, db.ForeignKey('kriteria.id', ondelete='CASCADE'), nullable=False)
    
    nama_sub = db.Column(db.String(100), nullable=False)  # Contoh: "14jt - 16jt"
    nilai = db.Column(db.Float, nullable=False)           # Contoh: 3.0
    keterangan = db.Column(db.String(255), nullable=True) # Contoh: "Sedang"
   
    penilaian = db.relationship('Penilaian', backref='sub_kriteria_ref', lazy=True)

    def __repr__(self):
        return f'<SubKriteria {self.nama_sub} ({self.nilai})>'