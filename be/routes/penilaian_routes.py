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

