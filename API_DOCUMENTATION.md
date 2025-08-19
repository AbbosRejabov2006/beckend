# Buyurtma API Documentation

## Overview
Bu API to'liq point-of-sale (POS) tizimini ta'minlaydi, foydalanuvchilar boshqaruvi, mahsulot katalogi va sotuvlarni kuzatish bilan.

## Authentication
Barcha endpointlar (login/register dan tashqari) JWT autentifikatsiyasini talab qiladi. Authorization headerida JWT tokenini kiriting:
```
Authorization: Bearer <your-jwt-token>
```

## User Roles
- `ADMIN`: Barcha endpointlarga to'liq ruxsat
- `KASSIR`: Cheklangan ruxsat (sotuvlarni yaratish, mahsulotlarni ko'rish)

## Base URL
```
http://localhost:3000
```

## API Endpoints

### Authentication

#### Register User
```http
POST /api/users/register
```
**Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "password": "password123",
  "role": "KASSIR",
  "permissions": ["read", "write"]
}
```

#### Login
```http
POST /api/users/login
```
**Body:**
```json
{
  "login": "johndoe",
  "password": "password123"
}
```

### Users Management (Admin Only)

#### Get All Users
```http
GET /api/users
```

#### Get User by ID
```http
GET /api/users/:id
```

#### Update User
```http
PATCH /api/users/:id
```

#### Delete User
```http
DELETE /api/users/:id
```

### Categories

#### Create Category (Admin Only)
```http
POST /categories
```
**Body:**
```json
{
  "name": "Electronics",
  "description": "Electronic devices and accessories",
  "icon": "📱"
}
```

#### Get All Categories
```http
GET /categories
```

#### Get Category by ID
```http
GET /categories/:id
```

#### Update Category (Admin Only)
```http
PATCH /categories/:id
```

#### Delete Category (Admin Only)
```http
DELETE /categories/:id
```

### Products

#### Create Product (Admin Only)
```http
POST /products
```
**Body:**
```json
{
  "name": "iPhone 15",
  "price": 999.99,
  "stock": 50,
  "barcode": "1234567890123",
  "unit": "piece",
  "minStock": 5,
  "categoryId": "category-uuid"
}
```

#### Get All Products
```http
GET /products
```

#### Get Product by ID
```http
GET /products/:id
```

#### Get Product by Barcode
```http
GET /products/barcode/:barcode
```

#### Update Product (Admin Only)
```http
PATCH /products/:id
```

#### Delete Product (Admin Only)
```http
DELETE /products/:id
```

### Sales

#### Create Sale
```http
POST /sales
```
**Body:**
```json
{
  "cashierId": "user-uuid",
  "cashierName": "John Doe",
  "date": "2024-01-15",
  "time": "14:30:00",
  "items": [
    {
      "productId": "product-uuid",
      "name": "iPhone 15",
      "quantity": 2,
      "price": 999.99,
      "total": 1999.98
    }
  ],
  "totalAmount": 1999.98,
  "paymentMethod": "CASH",
  "debtorName": "Jane Smith",
  "paidAmount": 1500.00,
  "returnedAmount": 0
}
```

#### Get All Sales
```http
GET /sales
```

#### Get Sale by ID
```http
GET /sales/:id
```

#### Get Sales by Cashier
```http
GET /sales/cashier/:cashierId
```

#### Get Sales by Date Range
```http
GET /sales/date-range?startDate=2024-01-01&endDate=2024-01-31
```

#### Update Sale (Admin Only)
```http
PATCH /sales/:id
```

#### Delete Sale (Admin Only)
```http
DELETE /sales/:id
```

## Data Models

### User
```typescript
{
  id: string
  name: string
  username: string
  password?: string // Optional for security, not sent to client
  role: "ADMIN" | "KASSIR"
  permissions?: string[]
  createdAt: Date
  updatedAt: Date
}
```

### Category
```typescript
{
  id: string
  name: string
  description?: string
  icon: string
  createdAt: Date
  updatedAt: Date
}
```

### Product
```typescript
{
  id: string
  name: string
  price: number
  stock: number
  categoryId: string
  barcode: string
  unit: string
  minStock: number
  createdAt: Date
  updatedAt: Date
  category: Category
}
```

### Sale
```typescript
{
  id: string
  cashierId: string
  cashierName: string
  date: Date
  time: string
  items: SaleItem[]
  totalAmount: number
  paymentMethod: "CASH" | "CARD" | "DEBT"
  debtorName?: string
  paidAmount?: number
  returnedAmount?: number
  createdAt: Date
  updatedAt: Date
}
```

### SaleItem
```typescript
{
  id: string
  productId: string
  name: string
  quantity: number
  price: number
  total: number
  createdAt: Date
  product: Product
}
```

## Error Responses

Barcha endpointlar tegishli HTTP status kodlarini qaytaradi:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

Error response format:
```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

## Security Features

1. **JWT Authentication**: Barcha endpointlar JWT tokenlarini talab qiladi
2. **Role-based Access Control**: ADMIN va KASSIR rollari uchun turli ruxsatlar
3. **Password Hashing**: Parollar bcrypt bilan xashlanadi
4. **Input Validation**: Barcha inputlar class-validator bilan tekshiriladi
5. **Rate Limiting**: API suiiste'mol qilishdan himoyalangan

## Database Schema

Ilova PostgreSQL va Prisma ORM ishlatadi. Schema quyidagilarni o'z ichiga oladi:

- Foydalanuvchilar boshqaruvi rollar va ruxsatlar bilan
- Mahsulot katalogi kategoriyalar bilan
- Sotuvlarni kuzatish elementlar bilan
- Avtomatik stock boshqaruvi

## Getting Started

1. Dependencies o'rnatish:
```bash
npm install
```

2. Environment variables o'rnatish `.env` faylida:
```
DATABASE_URL="postgresql://username:password@localhost:5432/buyurtma"
JWT_SECRET="your-jwt-secret"
```

3. Database migrationlarni ishga tushirish:
```bash
npx prisma migrate dev
```

4. Ilovani ishga tushirish:
```bash
npm run start:dev
```

API `http://localhost:3000` da mavjud bo'ladi

## Asosiy Xususiyatlar

1. **Avtomatik Stock Boshqaruvi**: Sotuvlar yaratilganda mahsulot stocki avtomatik kamayadi. Sotuvlar o'chirilganda stock tiklanadi.

2. **Barcode Qo'llab-quvvatlash**: Mahsulotlar barcode orqali qidirilishi mumkin POS operatsiyalari uchun.

3. **Sana Oralig'i So'rovlari**: Sotuvlar hisobot uchun sana oralig'i bo'yicha filtrlanishi mumkin.

4. **Transaction Xavfsizligi**: Muhim operatsiyalar ma'lumotlar izchilligini ta'minlash uchun database transactionlarini ishlatadi.
