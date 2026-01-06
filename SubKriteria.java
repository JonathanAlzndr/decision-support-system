from utils.extensions import db

class SubKriteria(db.Model):
    __tablename__ = 'sub_kriteria'
    
    id = db.Column(db.Integer, primary_key=True)
    kriteria_id = db.Column(db.Integer, db.ForeignKey('kriteria.id', ondelete='CASCADE'), nullable=False)
    
    nama_sub = db.Column(db.String(100), nullable=False)  
    nilai = db.Column(db.Float, nullable=False)           
    keterangan = db.Column(db.String(255), nullable=True) 
   
    penilaian = db.relationship('Penilaian', backref='sub_kriteria_ref', lazy=True)

    def __repr__(self):
        return f'<SubKriteria {self.nama_sub} ({self.nilai})>'

from utils.extensions import db

class Kriteria(db.Model):
    __tablename__ = 'kriteria'
    
    id = db.Column(db.Integer, primary_key=True)
    kode = db.Column(db.String(5), unique=True, nullable=False) 
    nama = db.Column(db.String(100), nullable=False)            
    sifat = db.Column(db.Enum('benefit', 'cost', name='sifat_kriteria'), nullable=False)
    bobot = db.Column(db.Float, nullable=False) 
    
    sub_kriteria = db.relationship('SubKriteria', backref='kriteria', cascade='all, delete-orphan', lazy=True)
    penilaian = db.relationship('Penilaian', backref='kriteria', cascade='all, delete-orphan', lazy=True)
    
    def __repr__(self):
        return f'<Kriteria {self.kode}>'

from utils.extensions import db

class Penilaian(db.Model):
    __tablename__ = 'penilaian'
    
    id = db.Column(db.Integer, primary_key=True)

    alternatif_id = db.Column(db.Integer, db.ForeignKey('alternatif.id', ondelete='CASCADE'), nullable=False)
    kriteria_id = db.Column(db.Integer, db.ForeignKey('kriteria.id', ondelete='CASCADE'), nullable=False)
    
    sub_kriteria_id = db.Column(db.Integer, db.ForeignKey('sub_kriteria.id'), nullable=False)

    __table_args__ = (
        db.UniqueConstraint('alternatif_id', 'kriteria_id', name='uq_penilaian_alt_krit'),
    )

    @property
    def nilai_konversi(self):
        return self.sub_kriteria_ref.nilai