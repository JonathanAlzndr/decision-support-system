from repositories.rekomendasi_repository import get_riwayat_rekomendasi_paginated

def get_user_history_service(user_id, page=1, limit=10):

    pagination = get_riwayat_rekomendasi_paginated(user_id, page, limit)

    formatted_data = []
    for item in pagination.items:
        formatted_data.append({
            "id": item.id,
            "alternatif_id": item.alternatif_id,
            "kode": item.alternatif.kode,
            "nama_motor": item.alternatif.nama_motor,
            "skor_saw": round(item.skor_saw, 4),
            "skor_topsis": round(item.skor_topsis, 4),
            "created_at": item.created_at.strftime('%Y-%m-%d %H:%M:%S')
        })

    return {
        "status": "success",
        "data": formatted_data,
        "meta": {
            "page": page,
            "limit": limit,
            "total_pages": pagination.pages,
            "total_data": pagination.total
        }
    }