from flask import Blueprint, request, jsonify
from services.kriteria_service import (
    create_kriteria_service,
    get_all_kriteria_service,
    delete_kriteria_service,
    update_kriteria_service,
    create_sub_kriteria_service,
    get_sub_kriteria_service,
    update_sub_kriteria_service,
    delete_sub_kriteria_service
)
from utils.decorators import admin_required

kriteria_bp = Blueprint('kriteria', __name__, url_prefix='/api')

@kriteria_bp.route('/kriteria', methods=['GET'])
def get_all_kriteria():
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)
    
    service_result = get_all_kriteria_service(page, limit)

    if isinstance(service_result, dict):
        return service_result, 200
    
    elif isinstance(service_result, tuple):
        return service_result
        
    else:
        return service_result, 200

@kriteria_bp.route('/kriteria', methods=['POST'])
@admin_required
def create_kriteria():
    data = request.get_json()
    res, code = create_kriteria_service(data)
    return jsonify(res), code

@kriteria_bp.route('/kriteria/<int:id>', methods=['PUT'])
@admin_required
def update_kriteria(id):
    data = request.get_json()
    res, code = update_kriteria_service(id, data)
    return jsonify(res), code

@kriteria_bp.route('/kriteria/<int:id>', methods=['DELETE']) 
@admin_required
def delete_kriteria(id):
    res, code = delete_kriteria_service(id)
    return jsonify(res), code


@kriteria_bp.route('/sub-kriteria', methods=['POST'])
@admin_required
def create_sub_kriteria():
    data = request.get_json()
    res, code = create_sub_kriteria_service(data)
    return jsonify(res), code

@kriteria_bp.route('/kriteria/<int:kriteria_id>/sub-kriteria', methods=['GET'])
def get_sub_kriteria(kriteria_id):
    res, code = get_sub_kriteria_service(kriteria_id)
    return jsonify(res), code

@kriteria_bp.route('/sub-kriteria/<int:id>', methods=['PUT'])
@admin_required
def update_sub_kriteria(id):
    data = request.get_json()
    res, code = update_sub_kriteria_service(id, data)
    return jsonify(res), code

@kriteria_bp.route('/sub-kriteria/<int:id>', methods=['DELETE'])
@admin_required
def delete_sub_kriteria(id):
    res, code = delete_sub_kriteria_service(id)
    return jsonify(res), code