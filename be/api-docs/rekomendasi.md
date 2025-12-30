# API Specification for Rekomendasi
---

### Hitung Rekomendasi

**Description:**
Menghitung rekomendasi motor menggunakan metode SAW & TOPSIS

**Authorization:**
Diperlukan (JWT)

**Access:**
User

### Endpoint: `POST /api/rekomendasi`

#### Response Body (Success):
```json
{
    "message": "Rekomendasi berhasil dihitung",
    "data": [
        {
            "alternatif_id": 1,
            "skor_saw": 0.82,
            "skor_topsis": 0.78
        }
    ]
}
```

### Get Rekomendasi User

**Description:**
Mengambil hasil rekomendasi user

**Authorization:**
Diperlukan (JWT)

**Access:**
User

### Endpoint: `GET /api/rekomendasi`
### Query Params: `?page=1&limit=5`

#### Response Body (Success):
```json
{
    "data": [
        {
            "id": 1,
            "alternatif_id": 1,
            "skor_saw": 0.82,
            "skor_topsis": 0.78,
            "created_at": "2025-01-01T10:00:00Z"
        }
    ],
    "meta": {
        "page": 1,
        "limit": 5,
        "total_data": 8,
        "total_page": 2
    }
}
```