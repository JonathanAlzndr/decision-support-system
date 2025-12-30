# API Specification for Kriteria

### Create New Kriteria

**Description:**
Menambahkan kriteria baru

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
    "sifat": "cost"
}
```

#### Response Body (Success):
```json
{
    "message": "Success"
}
```

---

### Get All Kriteria

**Description:**
Mengambil semua kriteria

**Authorization:**
Tidak diperlukan

**Access:**
Public

### Endpoint: `GET /api/kriteria`
### Query Params: `?page=1&limit=10`

#### Response Body (Success):
```json
{
    "data": [
        {
            "id": 1,
            "kode": "C1",
            "nama": "Harga",
            "sifat": "cost"
        },
        {
            "id": 2,
            "kode": "C2",
            "nama": "Kecepatan",
            "sifat": "benefit"
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
Mengubah data kriteria

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
    "sifat": "cost"
}
```

#### Response Body (Success):
```json
{
    "message": "Success"
}
```

---

### Delete Kriteria

**Description:**
Menghapus kriteria

**Authorization:**
Diperlukan (JWT)

**Access:**
Admin

### Endpoint: `DELETE /api/kriteria/{id}`
#### Response Body (Success):
```json
{
    "message": "Success"
}
```