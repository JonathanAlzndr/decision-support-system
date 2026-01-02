# API Specification for Alternatif

---
### Create new Alternatif

**Description:**
Menambahkan data alternatif sepeda motor listrik beserta gambar

**Authorization:**
Diperlukan

**Content-Type**:
multipart/form-data

**Access:**
Admin

### Endpoint: `POST /api/alternatif`

#### Request Body(Form Data):
| Key         | Type | Required | Description                                  |
|-------------|------|----------|----------------------------------------------|
| kode        | Text | Yes      | Kode unik (cth: A1)                          |
| nama_motor  | Text | Yes      | Nama motor (cth: Gesits G1)                  |
| deskripsi   | Text | No       | Penjelasan singkat                           |
| gambar      | File | No       | File gambar (.jpg, .png, .webp)              |


#### Response Body (Success):
```json
{
    "status": "success",
    "message": "Alternatif berhasil ditambahkan",
    "data": {
        "id": 15
    }
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
            "nama_motor": "Honda PCX Electric",
            "deskripsi": "Motor matic premium listrik",
            "gambar_url": "http://localhost:5000/static/uploads/alternatif/2721_honda.jpg"
        },
        {
            "id": 2,
            "kode": "A2",
            "nama_motor": "Gesits G1",
            "deskripsi": "Motor listrik buatan lokal",
            "gambar_url": "http://localhost:5000/static/uploads/alternatif/234_yamaha.jpg"
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
Mengubah data alternatif. Jika field gambar diisi, gambar lama akan dihapus dan diganti dengan yang baru.

**Authorization:**
Diperlukan (JWT)

**Content-Type:** 
multipart/form-data

**Access:**
Admin

### Endpoint: `PUT /api/alternatif/{id}`
#### Request Body (Form Data):

| Key         | Type | Required | Description                          |
|-------------|------|----------|--------------------------------------|
| kode        | Text | No       | Update kode unik                     |
| nama_motor  | Text | No       | Update nama motor                    |
| deskripsi   | Text | No       | Update deskripsi                     |
| gambar      | File | No       | Upload gambar baru (opsional)        |

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
Menghapus data alternatif dari database serta menghapus file gambar fisiknya dari server.

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

