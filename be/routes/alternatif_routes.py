from flask import Blueprint, request, jsonify
from services.alternatif_service import (
    create_alternatif_service,
    get_all_alternatif_service,
    delete_alternatif_service,
    update_alternatif_service
)
from utils.decorators import admin_required

alternatif_bp = Blueprint('alternatif', __name__, url_prefix='/api/alternatif')

@alternatif_bp.route('', methods=['GET'])
def get_all():
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=10, type=int)
    response, code = get_all_alternatif_service(page, limit)
    return jsonify(response), code

@alternatif_bp.route('', methods=['POST'])
@admin_required
def create():
    response, code = create_alternatif_service()
    return jsonify(response), code

@alternatif_bp.route('/<int:id>', methods=['PUT'])
@admin_required 
def update(id):
    response, code = update_alternatif_service(id)
    return jsonify(response), code

@alternatif_bp.route('/<int:id>', methods=['DELETE'])
@admin_required
def delete(id):    
    response, code = delete_alternatif_service(id)
    return jsonify(response), code