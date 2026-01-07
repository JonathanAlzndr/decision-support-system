from flask import Blueprint, request, jsonify
from services.penilaian_service import (
    create_update_penilaian_batch_service,
    get_penilaian_by_alternatif_service,
    get_all_penilaian_matrix_service
)
from utils.decorators import admin_required

penilaian_bp = Blueprint('penilaian', __name__, url_prefix='/api/penilaian')

@penilaian_bp.route('/batch', methods=['POST'])
@admin_required
def create_update_penilaian_batch():
    data = request.get_json()
    res, code = create_update_penilaian_batch_service(data)
    return jsonify(res), code

@penilaian_bp.route('/<int:alternatif_id>', methods=['GET'])
def get_penilaian_by_alternatif(alternatif_id):
    res, code = get_penilaian_by_alternatif_service(alternatif_id)
    return jsonify(res), code

@penilaian_bp.route('/', methods=['GET'])
def get_all_penilaian():
    res, code = get_all_penilaian_matrix_service()
    return jsonify(res), code