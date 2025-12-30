from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.kriteria_service import (
    create_kriteria_service,
    get_all_kriteria_service,
    delete_kriteria_service,
    update_kriteria_service
)
from utils.decorators import admin_required

kriteria_bp = Blueprint('kriteria', __name__, url_prefix='/api/kriteria')

@kriteria_bp.route('/', methods=['POST'])
@admin_required
def create_kriteria():
    data = request.get_json()
    res, code = create_kriteria_service(data)
    return jsonify(res), code

@kriteria_bp.route('/', methods=['GET'])
def get_all_kriteria():
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=10, type=int)
    res = get_all_kriteria_service(page, limit)
    return jsonify(res), 200

@kriteria_bp.route('/<int:id>', methods=['DELETE']) 
def delete_kriteria(id):
    res, code = delete_kriteria_service(id)
    return jsonify(res), code

@kriteria_bp.route('/<int:id>', methods=['PUT'])
def update_kriteria(id):
    data = request.json
    res, code = update_kriteria_service(id, data)
    return jsonify(res), code

