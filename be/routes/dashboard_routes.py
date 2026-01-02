from flask import Blueprint, jsonify
from services.dashboard_service import get_dashboard_stats_service, get_app_info_service
from utils.decorators import admin_required

dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/api/dashboard')

@dashboard_bp.route('/stats', methods=['GET'])
@admin_required
def get_dashboard_stats():
    res = get_dashboard_stats_service()
    return jsonify(res), 200

@dashboard_bp.route('/info', methods=['GET'])
def get_app_info():
    res = get_app_info_service()
    return jsonify(res), 200