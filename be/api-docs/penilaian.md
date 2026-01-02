# API Specification for Penilaian
---
### Create Penilaian

**Description:**
Memberikan nilai suatu kriteria terhadap alternatif tertentu. Penilaian menggunakan kode alternatif dan kode kriteria, dan akan disimpan ke database menggunakan foreign key (ID).

**Authorization:**
Diperlukan (JWT)

**Access:**
Admin

### Endpoint: `POST /api/penilaian`

#### Request Body:
```json
{
    "alternatif_kode": "A1",
    "kriteria_kode": "C1",
    "nilai_skor": 90
}
```

#### Response Body (Success):
```json
{
    "status": "success",
    "message": "Penilaian berhasil ditambahkan"
}
```

#### Response Body (Failed Duplikat):
```json
{
    "status": "error",
    "message": "Penilaian untuk alternatif dan kriteria ini sudah ada"
}
```
---

### Get Penilaian by Alternatif

**Description:**
Mengambil seluruh data penilaian berdasarkan alternatif tertentu. Endpoint ini digunakan untuk mengecek kelengkapan data sebelum perhitungan SAW & TOPSIS.

**Authorization:**
Tidak diperlukan

**Access:**
Public

### Endpoint: `GET /api/penilaian/{alternatif_kode}`

### Query Params: `?page=1&limit=10`

#### Response Body (Success):
```json
{
    "status": "success",
    "data": [
        {
            "kriteria_kode": "C1",
            "nama_kriteria": "Harga",
            "sifat": "cost",
            "nilai_skor": 90
        },
        {
            "kriteria_kode": "C2",
            "nama_kriteria": "Jarak Tempuh",
            "sifat": "benefit",
            "nilai_skor": 120
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total_data": 2,
        "total_page": 1
    }
}
```