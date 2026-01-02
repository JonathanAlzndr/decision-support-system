from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.algoritma_service import calculate_rekomendasi
from services.rekomendasi_service import get_user_history_service 
from repositories.rekomendasi_repository import save_riwayat_rekomendasi 

rekomendasi_bp = Blueprint('rekomendasi', __name__, url_prefix='/api/rekomendasi')

@rekomendasi_bp.route('/', methods=['POST'])
@jwt_required()
def rekomendasi():

    try:
        user_id = get_jwt_identity()
        body = request.get_json(silent=True) or {}
        
        detail = bool(body.get("detail", False))
        bobot_custom = body.get("bobot_custom", None)
    
        hasil = calculate_rekomendasi(detail=detail, bobot_custom_input=bobot_custom)

        save_riwayat_rekomendasi(user_id, hasil)

        return jsonify({
            "status": "success",
            "message": "Rekomendasi berhasil dihitung dan disimpan",
            "data": hasil
        }), 200

    except ValueError as e:
        return jsonify({"status": "error", "message": str(e)}), 400

    except Exception as e:
        return jsonify({
            "status": "error", 
            "message": "Terjadi kesalahan sistem", 
            "detail": str(e)
        }), 500


@rekomendasi_bp.route('/', methods=['GET'])
@jwt_required()
def get_history():
    try:
        user_id = get_jwt_identity()
        page = request.args.get('page', default=1, type=int)
        limit = request.args.get('limit', default=10, type=int)

        res = get_user_history_service(user_id, page, limit)
        return jsonify(res), 200
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500