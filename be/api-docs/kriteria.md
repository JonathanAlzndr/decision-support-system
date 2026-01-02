# API Specification for Kriteria

### Create New Kriteria

**Description:**
Menambahkan kriteria baru yang akan digunakan dalam proses perhitungan
SAW dan TOPSIS. Setiap kriteria memiliki bobot dan sifat (benefit/cost).

**Authorization:**
Diperlukan (JWT)

**Access:**
Admin

### Endpoint: `POST /api/kriteria`
#### Request Body:
```json
{
    "kode": "C1",
    "nama": "Harga",
    "sifat": "cost",
    "bobot": 0.3
}
```

#### Response Body (Success):
```json
{
    "status": "success",
    "message": "Kriteria berhasil ditambahkan"
}
```

#### Response Body (Failed Duplikat):
```json
{
    "status": "error",
    "message": "Kriteria dengan kode ini sudah ada"
}
```

---

### Get All Kriteria

**Description:**
Mengambil seluruh data kriteria yang digunakan dalam sistem.

**Authorization:**
Tidak diperlukan

**Access:**
Public

### Endpoint: `GET /api/kriteria`

### Query Params: `?page=1&limit=10`

#### Response Body (Success):
```json
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "kode": "C1",
            "nama": "Harga",
            "sifat": "cost",
            "bobot": 0.3
        },
        {
            "id": 2,
            "kode": "C2",
            "nama": "Jarak Tempuh",
            "sifat": "benefit",
            "bobot": 0.4
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total_data": 12,
        "total_page": 2
    }
}
```
---

### Update Kriteria

**Description:**
Mengubah data kriteria, termasuk bobot dan sifat kriteria.

**Authorization:**
Diperlukan (JWT)

**Access:**
Admin

### Endpoint: `PUT /api/kriteria/{id}`

#### Request Body:
```json
{
    "kode": "C1",
    "nama": "Harga Motor",
    "sifat": "cost",
    "bobot": 0.25
}
```

#### Response Body (Success):
```json
{
    "status": "success",
    "message": "Kriteria berhasil diperbarui"
}
```

---

### Delete Kriteria

**Description:**
Menghapus data kriteria dari sistem. Seluruh penilaian yang terkait akan ikut terhapus (cascade).

**Authorization:**
Diperlukan (JWT)

**Access:**
Admin

### Endpoint: `DELETE /api/kriteria/{id}`

#### Response Body (Success):
```json
{
    "status": "success",
    "message": "Kriteria berhasil dihapus"
}
```