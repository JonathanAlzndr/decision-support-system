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