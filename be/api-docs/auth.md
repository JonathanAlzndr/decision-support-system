# API Specification for Auth

--- 
### Login
**Description:**
Digunakan oleh Admin untuk mendapatkan token akses (Bearer Token) yang diperlukan untuk semua endpoint CRUD.

**Authorization:**
Tidak diperlukan

**Access:**
All

### Endpoint: `POST /api/auth/login`

#### Request Body:

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `username` | `string` | Username |
| `password` | `string` | Password |

```json
{
  "username": "John Doe",
  "password": "kata_sandi_rahasia"
}
```

#### Response Body (Success):
```json
{
  "msg": "Login Success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "Admin"
}
```

--- 
### Register

**Description**:
Digunakan untuk mendaftarkan user baru ke dalam sistem

**Authorization:**
Tidak diperlukan

**Access**:
All

### Endpoint: `POST /api/auth/register`

#### Request Body:
```json
{
  "username": "Jane Doe",
  "password": "rahasia",
  "role": "user"
}
```

#### Response Body (Success):
```json
{
  "msg": "User registered successfully"
}
```   



