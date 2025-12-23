# Super Saravana Retail - REST API Design Specification

## Overview
*   **Base URL:** `https://api.supersaravana.com/v1`
*   **Content-Type:** `application/json`
*   **Date Format:** ISO 8601 (e.g., `2024-07-15T10:00:00Z`)

## Standard Response Formats

### Success Response (Single Object)
```json
{
  "data": { ... }
}
```

### Success Response (List with Pagination)
```json
{
  "data": [ ... ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 20,
    "total": 100
  },
  "links": {
    "self": "/api/products?page=1",
    "first": "/api/products?page=1",
    "prev": null,
    "next": "/api/products?page=2",
    "last": "/api/products?page=5"
  }
}
```

### Error Response
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested product could not be found.",
    "details": [] 
  }
}
```

---

## I. Security & Authentication Endpoints

### 1.1 Login
Authenticate an administrator.

*   **Endpoint:** `POST /auth/login`
*   **Request Body:**
    ```json
    { "username": "admin@supersaravana.com", "password": "password123" }
    ```
*   **Response:**
    ```json
    {
      "data": {
        "token": "eyJhbGciOiJIUzI1Ni...",
        "user": { "id": "u1", "name": "Admin User", "role": "admin" }
      }
    }
    ```

### 1.2 Logout
Invalidate the user's session.

*   **Endpoint:** `POST /auth/logout`
*   **Headers:** `Authorization: Bearer <token>`

### 1.3 Get Profile
Retrieve authenticated user details.

*   **Endpoint:** `GET /auth/profile`
*   **Headers:** `Authorization: Bearer <token>`

---

## II. Admin Management Endpoints
*All endpoints below require `Authorization: Bearer <token>` header.*

### 2.1 Product Management
*   `GET /admin/products`: List all products (sortable, searchable).
*   `POST /admin/products`: Create a new product.
*   `PUT /admin/products/{id}`: Update a product.
*   `DELETE /admin/products/{id}`: Delete a product.

### 2.2 Category Management
*   `GET /admin/categories`: List categories with product counts.
*   `POST /admin/categories`: Add a category.
*   `PUT /admin/categories/{id}`: Update a category.
*   `DELETE /admin/categories/{id}`: Delete a category.

### 2.3 Branch Management
*   `GET /admin/branches`: List all branches.
*   `POST /admin/branches`: Add a new branch.
*   `PUT /admin/branches/{id}`: Update branch details.
*   `DELETE /admin/branches/{id}`: Remove a branch.

### 2.4 Contact Submissions
*   `GET /admin/submissions`: List inquiries (filter by read/unread).
*   `GET /admin/submissions/{id}`: View full message details.
*   `PUT /admin/submissions/{id}/read`: Mark as read.

### 2.5 Banners (CMS)
*   `GET /admin/banners`: List active banners.
*   `POST /admin/banners`: Upload and create a banner.
*   `PUT /admin/banners/{id}`: Update banner details.
*   `DELETE /admin/banners/{id}`: Remove a banner.

---

## III. Public Endpoints (Read-Only)

### 3.1 List Categories
`GET /categories`

### 3.2 List Products
`GET /products`

### 3.3 Get Product Details
`GET /products/{id}`

### 3.4 List Branches
`GET /branches`

### 3.5 Get Branch Details
`GET /branches/{id}`

### 3.6 Submit Contact Form
`POST /contact`
