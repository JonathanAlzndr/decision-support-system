from flask import Flask, jsonify
from config import Config
from utils.extensions import db, bcrypt, jwt, migrate
from flask_cors import CORS
from models.user import User
from models.alternatif import Alternatif
from models.kriteria import Kriteria
from models.penilaian import Penilaian
from models.hasil_rekomendasi import HasilRekomendasi


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(
        app,
        resources={r"/api/*": {"origins": "*"}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )

    bcrypt.init_app(app)
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    @jwt.unauthorized_loader
    def unauthorized_callback(error):
        return jsonify(msg="Unauthorized: Token tidak ditemukan"), 401

    @jwt.expired_token_loader
    def expired_callback(jwt_header, jwt_payload):
        return jsonify(msg="Token expired"), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify(msg="Unauthorized: Token invalid"), 422

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
