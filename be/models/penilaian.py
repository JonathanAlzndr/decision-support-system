from utils.extensions import db

class Penilaian(db.Model):
    __tablename__ = 'penilaian'
    id_penilaian = db.Column(db.Integer, primary_key=True)
    id_alternatif = db.Column(db.Integer, db.ForeignKey('alternatif.id_alternatif'), nullable=False)
    id_kriteria = db.Column(db.Integer, db.ForeignKey('kriteria.id_kriteria'), nullable=False)
    nilai = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Penilaian Alt:{self.id_alternatif} Crit:{self.id_kriteria} Nilai:{self.nilai}>'