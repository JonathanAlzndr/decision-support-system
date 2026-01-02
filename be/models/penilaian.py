from utils.extensions import db

class Penilaian(db.Model):
    __tablename__ = 'penilaian'
    id = db.Column(db.Integer, primary_key=True)
    alternatif_id = db.Column(db.Integer, db.ForeignKey('alternatif.id', ondelete='CASCADE'), nullable=False)
    kriteria_id = db.Column(db.Integer, db.ForeignKey('kriteria.id'), nullable=False)
    nilai_skor = db.Column(db.Float, nullable=False)

    __table_args__ = (
        db.UniqueConstraint('alternatif_id', 'kriteria_id', name='uq_penilaian_alt_krit'),
    )