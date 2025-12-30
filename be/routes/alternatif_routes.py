from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.alternatif_service import (
    create_alternatif_service,
    get_all_alternatif_service,
    delete_alternatif_service,
    update_alternatif_service
)
from utils.decorators import admin_required

alternatif_bp = Blueprint('alternatif', __name__, url_prefix='/api/alternatif')

@alternatif_bp.route('/', methods=['GET'])
@admin_required
def get_all_alternatif():
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=10, type=int)
    res = get_all_alternatif_service(page, limit)
    return jsonify(res), 200

@alternatif_bp.route('/', methods=['POST'])
@admin_required
def create_alternatif():
    data = request.get_json()
    res, code = create_alternatif_service(data)
    return jsonify(res), code

@alternatif_bp.route('/<int:id>', methods=['PUT'])
def update_alternatif(id):
    data = request.get_json()
    res, code = update_alternatif_service(id, data)
    return jsonify(res), code

@alternatif_bp.route('/<int:id>', methods=['DELETE'])
@admin_required
def delete_alternatif(id):    
    res, code = delete_alternatif_service(id)
    return jsonify(res), code