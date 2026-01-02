# API Specification for Dashboard

---

### Get Dashboard Statistics

**Description:**
Mengambil data statistik ringkas untuk ditampilkan di Halaman Beranda Admin. Informasi ini memberikan gambaran cepat mengenai jumlah data yang ada di dalam sistem.

**Authorization:**
Diperlukan (JWT)

**Access:**
Admin

### Endpoint: `GET /api/dashboard/stats`

#### Response Body (Success):
```json
{
    "status": "success",
    "message": "Data statistik berhasil diambil",
    "data": {
        "total_alternatif": 5,       
        "total_kriteria": 8,         
        "total_penilaian": 5,  
        "total_users": 12
    }
}