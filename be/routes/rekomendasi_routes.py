from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.algoritma_service import calculate_rekomendasi
from utils.decorators import admin_required

rekomendasi_bp = Blueprint('rekomendasi', __name__, url_prefix='/api/rekomendasi')

@rekomendasi_bp.route('/', methods=['POST'])
@admin_required
def rekomendasi():

    try:
        body = request.get_json(silent=True) or {}
        detail = bool(body.get("detail", False))

        hasil = calculate_rekomendasi(detail=detail)

        return jsonify({
            "status": "success",
            "message": "Rekomendasi motor listrik berhasil dihitung",
            "data": hasil
        }), 200

    except ValueError as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": "Terjadi kesalahan pada sistem",
            "detail": str(e)
        }), 500
