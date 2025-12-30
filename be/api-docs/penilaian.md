# API Specification for Penilaian
---
### Create Penilaian

**Description:**
Memberikan nilai kriteria ke alternatif

**Authorization:**
Diperlukan (JWT)

**Access:**
Admin

### Endpoint: `POST /api/penilaian`

#### Request Body:
```json
{
    "alternatif_id": 1,
    "kriteria_id": 1,
    "nilai_skor": 4
}
```

#### Response Body (Success):
```json
{
    "message": "Success"
}
```
---

### Get Penilaian by Alternatif

**Description:**
Mengambil penilaian berdasarkan alternatif

**Authorization:**
Tidak diperlukan

**Access:**
Public

### Endpoint: `GET /api/penilaian/{alternatif_id}`
### Query Params: `?page=1&limit=10`
#### Response Body (Success):
```json
{
    "data": [
        {
            "kriteria_id": 1,
            "nilai_skor": 4
        },
        {
            "kriteria_id": 2,
            "nilai_skor": 5
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total_data": 6,
        "total_page": 1
    }
}
```