from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.penilaian_service import (
    create_penilaian_service,
    get_all_penilaian_service,
    delete_penilaian_service,
    update_penilaian_service
)
from utils.decorators import admin_required

penilaian_bp = Blueprint('penilaian', __name__, url_prefix='/api/penilaian')

@penilaian_bp.route('/', methods=['POST'])
@admin_required
def create_penilaian():
    data = request.get_json()
    res, code = create_penilaian_service(data)
    return jsonify(res), code

@penilaian_bp.route('/<int:alternatif_id>', methods=['GET'])
@admin_required
def get_penilaian(alternatif_id):    
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=10, type=int)
    res = get_all_penilaian_service(alternatif_id=alternatif_id, page=page, limit=limit)
    return jsonify(res), 200

