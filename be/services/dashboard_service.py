from repositories.dashboard_repository import get_counts_summary, get_last_activity_time
from datetime import datetime

def get_dashboard_stats_service():

    counts = get_counts_summary()
    last_active = get_last_activity_time()

    data = {
        "total_alternatif": counts['total_alternatif'],
        "total_kriteria": counts['total_kriteria'],
        "total_penilaian": counts['total_penilaian'], 
        "total_users": counts['total_users'],
        "last_update": last_active.isoformat() if last_active else datetime.utcnow().isoformat()
    }

    return {
        "status": "success",
        "message": "Data statistik berhasil dimuat",
        "data": data
    }

def get_app_info_service():
    return {
        "status": "success",
        "data": {
            "app_name": "SPK Motor Listrik (SAW & TOPSIS)",
            "description": (
                "Sistem Pendukung Keputusan ini dirancang untuk membantu masyarakat "
                "memilih sepeda motor listrik terbaik. Menggunakan metode SAW untuk pembobotan "
                "dan TOPSIS untuk perankingan berdasarkan jarak solusi ideal."
            ),
            "version": "1.0.0",
            "developer": "Petrik Indra Joseph Modimbaba",
            "university": "Universitas Katolik De La Salle Manado",
            "year": "2025"
        }
    }