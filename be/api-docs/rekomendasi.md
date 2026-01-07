# API Specification for Rekomendasi (Perhitungan)
---

### Hitung Rekomendasi

**Description:**
Menghitung rekomendasi sepeda motor listrik menggunakan metode
SAW (Simple Additive Weighting) dan
TOPSIS (Technique for Order Preference by Similarity to Ideal Solution)
berdasarkan data alternatif, kriteria, bobot, dan penilaian,
kemudian menyimpan hasil perankingan ke tabel hasil rekomendasi.

**Authorization:**
Diperlukan (JWT)

**Access:**
All

### Endpoint: `POST /api/rekomendasi`

### Request Body (Optional): 
```json
{
    "detail": true
}
```

### Request Body (Optional):
Admin/User bisa mengirim bobot custom. Jika tidak dikirim, sistem pakai bobot default.

```json
{
    "detail": true,
    "bobot_custom": [
        { "kriteria_kode": "C1", "nilai": 0.50 },
        { "kriteria_kode": "C2", "nilai": 0.20 },
        { "kriteria_kode": "C3", "nilai": 0.30 }
    ]
}

```

#### Response Body (Success - Detail False):
**Notes**: User-Default

```json
{
    "status": "success",
    "message": "Rekomendasi motor listrik berhasil dihitung dan disimpan",
    "data": {
        "saw": {
            "alternatif_terbaik": {
                "alternatif_id": 5,
                "kode": "A2",
                "nama_motor": "Viar Q1",
                "nilai_preferensi": 0.9861
            },
            "ranking": [
                {
                    "alternatif_id": 5,
                    "kode": "A2",
                    "nama_motor": "Viar Q1",
                    "nilai_preferensi": 0.9861
                },
                {
                    "alternatif_id": 4,
                    "kode": "A1",
                    "nama_motor": "Gesits",
                    "nilai_preferensi": 0.9216
                }
            ]
        },
        "topsis": {
            "alternatif_terbaik": {
                "alternatif_id": 5,
                "kode": "A2",
                "nama_motor": "Viar Q1",
                "nilai_preferensi": 0.8041
            },
            "ranking": [
                {
                    "alternatif_id": 5,
                    "kode": "A2",
                    "nama_motor": "Viar Q1",
                    "nilai_preferensi": 0.8041
                },
                {
                    "alternatif_id": 4,
                    "kode": "A1",
                    "nama_motor": "Gesits",
                    "nilai_preferensi": 0.1959
                }
            ]
        }
    }
}
```

#### Response Body (Detail = true):
**Notes**: Admin purpose, kalau User gunakan checkbox

```json
{
    "status": "success",
    "message": "Rekomendasi motor listrik berhasil dihitung dan disimpan",
    "data": {
        "saw": {
            "ranking": [...],
            "detail": {
                "matriks_keputusan": [[...]],
                "matriks_normalisasi": [[...]],
                "bobot": [0.3, 0.2, 0.5],
                "nilai_preferensi": [...]
            }
        },
        "topsis": {
            "ranking": [...],
            "detail": {
                "matriks_keputusan": [[...]],
                "matriks_normalisasi": [[...]],
                "matriks_ternormalisasi_berbobot": [[...]],
                "solusi_ideal_positif": [...],
                "solusi_ideal_negatif": [...],
                "jarak_positif": [...],
                "jarak_negatif": [...],
                "nilai_preferensi": [...]
            }
        }
    }
}
```

### Get Rekomendasi User (History)

**Description:**
Mengambil hasil rekomendasi yang telah disimpan sebelumnya berdasarkan user yang sedang login.

**Authorization:**
Diperlukan (JWT)

**Access:**
User

### Endpoint: `GET /api/rekomendasi`

### Query Params: `?page=1&limit=5`

#### Response Body (Success):
```json
{
    "status": "success",
    "data": [
        {
            "id": 12,
            "alternatif_id": 5,
            "kode": "A2",
            "nama_motor": "Viar Q1",
            "skor_saw": 0.9861,
            "skor_topsis": 0.8041,
            "created_at": "2026-01-02T17:30:00Z"
        },
        {
            "id": 13,
            "alternatif_id": 4,
            "kode": "A1",
            "nama_motor": "Gesits",
            "skor_saw": 0.9216,
            "skor_topsis": 0.1959,
            "created_at": "2026-01-02T17:30:00Z"
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