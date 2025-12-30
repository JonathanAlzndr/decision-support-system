# API Specification for Alternatif

---
### Create new Alternatif

**Description:**
Menambahkan alternatif baru

**Authorization:**
Diperlukan

**Access:**
Admin

### Endpoint: `POST /api/alternatif`
#### Request Body:
```json
{
    "kode": "A1",
    "nama_motor": "Honda PCX",
    "deskripsi": "Motor matic premium"
}
```

#### Response Body (Success):
```json
{
    "message": "Success"
}
```

---

### Get All Alternatif

**Description:**
Mengambil semua alternatif

**Authorization:**
Diperlukan

**Access:**
public

### Endpoint: `GET /api/alternatif`
### Query Params : `?page=1&limit=10`

#### Response Body:
```json
{
    "data": [
        {
            "id": 1,
            "kode": "A1",
            "nama_motor": "Honda PCX",
            "deskripsi": "Motor Matic Premium"
        },
        {
            "id": 2,
            "kode": "A2",
            "nama_motor": "Yamaha NMAX",
            "deskripsi": "Motor Matic Besar"
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total_data": 25,
    }
}
```
---
### Update Alternatif

**Description:**
Mengubah data alternatif

**Authorization:**
Diperlukan (JWT)

**Access:**
Admin

### Endpoint: `PUT /api/alternatif/{id}`
#### Request Body:
```json
{
    "nama_motor": "Honda PCX 160",
    "deskripsi": "Update deskripsi"
}
```

#### Response Body (Success):
```json
{
    "message": "Success"
}
```

---

### Delete Alternatif

**Description:**
Menghapus alternatif (cascade ke penilaian & rekomendasi)

**Authorization:**
Diperlukan (JWT)

**Access:**
Admin

### Endpoint: `DELETE /api/alternatif/{id}`
#### Response Body (Success):

```json
{
    "message": "Success"
}
```

