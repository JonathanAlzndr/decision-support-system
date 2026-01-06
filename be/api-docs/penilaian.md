# API Specification for Penilaian
---

### Create / Update Penilaian (Batch)

**Description:**
Menyimpan penilaian spesifikasi motor untuk **semua kriteria sekaligus**.
Admin mengirim ID Sub-Kriteria (pilihan dropdown), sistem otomatis mengonversi jadi nilai bobot.

**Authorization:** Diperlukan (JWT)
**Access:** Admin

### Endpoint: `POST /api/penilaian/batch`

#### Request Body:
```json
{
    "alternatif_id": 1,
    "penilaian": [
        { "kriteria_id": 1, "sub_kriteria_id": 12 },
        { "kriteria_id": 2, "sub_kriteria_id": 15 },
        { "kriteria_id": 3, "sub_kriteria_id": 22 },
        { "kriteria_id": 4, "sub_kriteria_id": 31 },
        { "kriteria_id": 5, "sub_kriteria_id": 44 },
        { "kriteria_id": 6, "sub_kriteria_id": 54 },
        { "kriteria_id": 7, "sub_kriteria_id": 64 },
        { "kriteria_id": 8, "sub_kriteria_id": 74 }
    ]
}
```

#### Response Body (Success):
```json
{
    "status": "success",
    "message": "Data penilaian berhasil disimpan"
}
```

---

### Get Penilaian by Alternatif

**Description:**
Mengambil data penilaian yang sudah tersimpan untuk ditampilkan di Form Edit atau untuk Validasi.

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
    "data": {
        "alternatif": { "id": 1, "nama_motor": "Viar Q1" },
        "penilaian": [
            {
                "kriteria_id": 1,
                "nama_kriteria": "Harga",
                "sub_kriteria_selected": {
                    "id": 12,
                    "nama_sub": "14jt - 16jt",
                    "nilai": 3
                }
            },
            {
                "kriteria_id": 2,
                "nama_kriteria": "Jarak Tempuh",
                "sub_kriteria_selected": {
                    "id": 15,
                    "nama_sub": "60 km - 70 km",
                    "nilai": 5
                }
            }
        ]
    }
}
```