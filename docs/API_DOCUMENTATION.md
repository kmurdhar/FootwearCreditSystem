# API Documentation

## Overview

This document outlines the API endpoints and data structures for the B2B Credit System. While the current implementation uses mock data, this documentation serves as a blueprint for backend integration.

## 🔐 Authentication

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "customer",
      "isVerified": true
    },
    "token": "jwt_token_here"
  }
}
```

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password",
  "role": "customer",
  "businessName": "Doe Footwear",
  "phone": "+91 9876543210"
}
```

## 👥 User Management

### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer {token}
```

### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "phone": "+91 9876543210",
  "businessName": "Updated Business Name"
}
```

## 📊 Credit Scoring

### Get Credit Score
```http
GET /api/credit/score
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 775,
    "category": "Good",
    "lastUpdated": "2024-01-15",
    "components": {
      "paymentBehavior": 85,
      "creditUtilization": 70,
      "transactionConsistency": 80,
      "relationshipStability": 75,
      "marketReputation": 78
    },
    "history": [
      {
        "month": "2024-01",
        "score": 775
      }
    ]
  }
}
```

### Get Credit Score History
```http
GET /api/credit/score/history?period=6months
Authorization: Bearer {token}
```

## 💳 Transactions

### Get Transactions
```http
GET /api/transactions?status=all&page=1&limit=10
Authorization: Bearer {token}
```

### Create Transaction
```http
POST /api/transactions
Authorization: Bearer {token}
Content-Type: application/json

{
  "customerId": "customer_123",
  "amount": 25000,
  "description": "Sports shoes bulk order",
  "paymentTerms": 30
}
```

### Update Transaction Status
```http
PUT /api/transactions/{transactionId}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "paid",
  "paidDate": "2024-01-18",
  "paidAmount": 25000
}
```

## 🏪 Suppliers

### Get Suppliers
```http
GET /api/suppliers?category=all&location=all
Authorization: Bearer {token}
```

### Get Supplier Details
```http
GET /api/suppliers/{supplierId}
Authorization: Bearer {token}
```

## 📦 Inventory (Shopkeeper)

### Get Inventory
```http
GET /api/inventory?category=all&status=all
Authorization: Bearer {token}
```

### Add Inventory Item
```http
POST /api/inventory
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Nike Air Max 270",
  "category": "Sports Shoes",
  "brand": "Nike",
  "size": "8",
  "color": "Black",
  "currentStock": 25,
  "minStock": 10,
  "maxStock": 50,
  "unitPrice": 8500
}
```

## 📈 Analytics

### Get Business Analytics
```http
GET /api/analytics/business?period=6months
Authorization: Bearer {token}
```

### Get Customer Analytics (Shopkeeper)
```http
GET /api/analytics/customers
Authorization: Bearer {token}
```

## ⚙️ Admin APIs

### Get All Users
```http
GET /api/admin/users?role=all&status=all&page=1&limit=10
Authorization: Bearer {admin_token}
```

### Verify User
```http
PUT /api/admin/users/{userId}/verify
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "isVerified": true,
  "notes": "All documents verified successfully"
}
```

### Get System Reports
```http
GET /api/admin/reports?type=overview&period=1month
Authorization: Bearer {admin_token}
```

## 📋 Data Models

### User Model
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer' | 'shopkeeper';
  phone?: string;
  businessName?: string;
  gstNumber?: string;
  address?: string;
  registrationDate: string;
  isVerified: boolean;
  creditLimit?: number;
}
```

### Transaction Model
```typescript
interface Transaction {
  id: string;
  customerId: string;
  shopkeeperId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'defaulted';
  paymentTerms: number;
  description?: string;
  createdAt: string;
}
```

### Credit Score Model
```typescript
interface CreditScore {
  customerId: string;
  score: number;
  category: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor';
  lastUpdated: string;
  components: {
    paymentBehavior: number;
    creditUtilization: number;
    transactionConsistency: number;
    relationshipStability: number;
    marketReputation: number;
  };
}
```

## 🔄 Webhooks

### Payment Status Update
```http
POST /api/webhooks/payment-status
Content-Type: application/json

{
  "transactionId": "txn_123",
  "status": "paid",
  "paidAmount": 25000,
  "paidDate": "2024-01-18",
  "paymentMethod": "bank_transfer"
}
```

### Credit Score Update
```http
POST /api/webhooks/credit-score-update
Content-Type: application/json

{
  "customerId": "customer_123",
  "oldScore": 750,
  "newScore": 775,
  "reason": "on_time_payment",
  "transactionId": "txn_123"
}
```

## 🚨 Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "message": "Invalid email format"
    }
  }
}
```

### Error Codes
- `VALIDATION_ERROR`: Input validation failed
- `AUTHENTICATION_ERROR`: Invalid credentials
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `CREDIT_LIMIT_EXCEEDED`: Transaction exceeds credit limit
- `PAYMENT_OVERDUE`: Payment is overdue
- `ACCOUNT_SUSPENDED`: Account is suspended

## 📊 Rate Limiting

- **Authentication endpoints**: 5 requests per minute
- **General API endpoints**: 100 requests per minute
- **Analytics endpoints**: 20 requests per minute
- **Admin endpoints**: 50 requests per minute

## 🔒 Security

### Headers Required
```http
Authorization: Bearer {jwt_token}
Content-Type: application/json
X-API-Version: v1
```

### CORS Policy
- Allowed origins: Configured domains only
- Allowed methods: GET, POST, PUT, DELETE
- Allowed headers: Authorization, Content-Type, X-API-Version

This API documentation provides a comprehensive guide for integrating with the B2B Credit System backend services.