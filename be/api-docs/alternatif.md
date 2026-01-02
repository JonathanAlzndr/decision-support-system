# API Specification for Alternatif

---
### Create new Alternatif

**Description:**
Menambahkan data alternatif sepeda motor listrik yang akan digunakan sebagai objek rekomendasi pada metode SAW dan TOPSIS.

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
    "status": "success",
    "message": "Alternatif berhasil ditambahkan"
}
```

#### Response Body (Failed Duplikat):
```json
{
    "status": "error",
    "message": "Alternatif dengan kode ini sudah ada"
}
```

---

### Get All Alternatif

**Description:**
Mengambil seluruh data alternatif yang tersedia di sistem.

**Authorization:**
Diperlukan

**Access:**
public

### Endpoint: `GET /api/alternatif`

### Query Params : `?page=1&limit=10`

#### Response Body:
```json
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "kode": "A1",
            "nama_motor": "Honda PCX",
            "deskripsi": "Motor matic premium"
        },
        {
            "id": 2,
            "kode": "A2",
            "nama_motor": "Yamaha NMAX",
            "deskripsi": "Motor matic besar"
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total_data": 25,
        "total_page": 3
    }
}
```
---
### Update Alternatif

**Description:**
Mengubah data alternatif sepeda motor listrik.

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
    "status": "success",
    "message": "Alternatif berhasil diperbarui"
}
```

---

### Delete Alternatif

**Description:**
Menghapus data alternatif dari sistem.
Penghapusan ini akan menghapus seluruh data penilaian dan hasil rekomendasi terkait
(cascade delete).

**Authorization:**
Diperlukan (JWT)

**Access:**
Admin

### Endpoint: `DELETE /api/alternatif/{id}`
#### Response Body (Success):

```json
{
    "status": "success",
    "message": "Alternatif berhasil dihapus"
}
```

