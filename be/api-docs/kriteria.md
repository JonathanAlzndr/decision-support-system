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

---
### Create Sub-Kriteria (Indikator)

**Description:**
Menambahkan indikator atau rentang nilai untuk kriteria tertentu.
Contoh: Untuk Kriteria Harga, tambahkan sub "14jt - 16jt" dengan nilai 3.

**Authorization:** Diperlukan (JWT)
**Access:** Admin

### Endpoint: `POST /api/sub-kriteria`

#### Request Body:
```json
{
    "kriteria_id": 1,
    "nama_sub": "14jt - 16jt",
    "nilai": 3,
    "keterangan": "Sedang"
}
```

#### Response Body (Success):
```json
{
    "status": "success",
    "message": "Sub-kriteria berhasil ditambahkan"
}
```

### Get Sub-Kriteria by Kriteria
**Description**: Mengambil daftar opsi indikator untuk satu kriteria. Dipakai untuk isi Dropdown di Form Penilaian.

**Authorization**: Tidak Diperlukan Access: Public

### Endpoint: `GET /api/kriteria/{kriteria_id}/sub-kriteria`

#### Response Body:
```json
{
    "status": "success",
    "data": [
        { "id": 10, "nama_sub": "20jt - 25jt", "nilai": 1 },
        { "id": 11, "nama_sub": "14jt - 16jt", "nilai": 3 }
    ]
}
```
---

### Get All Sub-Kriteria (Full Mapping)
**Description:**
Mengambil daftar kriteria secara menyeluruh di mana setiap kriteria sudah memuat daftar sub-kriteria (indikator) yang terkait.

#### Endpoint: GET /api/sub-kriteria?page=1&limit=10
**Authorization:**
Tidak Diperlukan

**Access:**
Public / Admin

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
      "bobot": 0.3,
      "sub_kriteria": [
        {
          "id": 10,
          "nama_sub": "< 15 Juta",
          "nilai": 5,
          "keterangan": "Sangat Terjangkau"
        },
        {
          "id": 11,
          "nama_sub": "15 - 20 Juta",
          "nilai": 4,
          "keterangan": "Terjangkau"
        }
      ]
    },
    {
      "id": 2,
      "kode": "C2",
      "nama": "Jarak Tempuh",
      "sifat": "benefit",
      "bobot": 0.2,
      "sub_kriteria": [
        {
          "id": 25,
          "nama_sub": "> 100 Km",
          "nilai": 5,
          "keterangan": "Sangat Jauh"
        }
      ]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total_pages": 1,
    "total_data": 5
  }
}
```

---

### Update Sub-Kriteria
**Description:**
Mengubah data indikator atau rentang nilai pada kriteria tertentu. Perubahan pada field nilai akan secara otomatis mempengaruhi hasil perhitungan (SAW/TOPSIS) yang menggunakan sub-kriteria ini.

**Authorization:**
Diperlukan (JWT)

**Access:** 
Admin

#### Endpoint:  PUT /api/sub-kriteria/{id}  

#### Request Body:

```json
{
    "nama_sub": "12jt - 14jt (Promo)",
    "nilai": 4,
    "keterangan": "Sangat Terjangkau"
}
```

#### Response Body (Success):

```json
{
    "status": "success",
    "message": "Sub-kriteria berhasil diperbarui"
}
```

#### Response Body (Failed - Not Found):

```json
{
    "status": "error",
    "message": "Sub-kriteria tidak ditemukan"
}
```

--- 

### Delete Sub-Kriteria
**Description:**
Menghapus data sub-kriteria dari sistem.


**Authorization:**
Diperlukan (JWT)

**Access:**
Admin

#### Endpoint: `DELETE /api/sub-kriteria/{id}`

#### Response Body (Success):
```json
{
    "status": "success",
    "message": "Sub-kriteria berhasil dihapus"
}
```

#### Response Body (Failed - Constraint):
```json
{
    "status": "error",
    "message": "Tidak dapat menghapus: Sub-kriteria ini sedang digunakan dalam penilaian motor."
}
```