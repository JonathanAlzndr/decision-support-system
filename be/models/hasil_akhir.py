from utils.extensions import db

class HasilAkhir(db.Model):
    __tablename__ = 'hasil_akhir'
    id_hasil = db.Column(db.Integer, primary_key=True)
    id_alternatif = db.Column(db.Integer, db.ForeignKey('alternatif.id_alternatif'), nullable=False)

    nilai_saw = db.Column(db.Float)
    rank_saw = db.Column(db.Integer)
    
    nilai_topsis = db.Column(db.Float)
    rank_topsis = db.Column(db.Integer)

    def __repr__(self):
        return f'<Hasil Akhir ID_Alt: {self.id_alternatif}>'