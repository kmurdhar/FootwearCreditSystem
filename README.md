# B2B Credit System - Footwear Market

A comprehensive B2B credit management system designed specifically for the footwear industry, enabling transparent credit scoring, transaction management, and relationship building between retailers and suppliers.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

### Local Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd b2b-credit-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

### Default Login Credentials

The system comes with pre-configured demo accounts:

#### Admin Account
- **Email:** `admin@footwear.com`
- **Password:** `password`
- **Role:** System Administrator

#### Customer Account
- **Email:** `retailer@example.com`
- **Password:** `password`
- **Role:** Retailer/Customer

#### Supplier Account
- **Email:** `supplier@example.com`
- **Password:** `password`
- **Role:** Supplier/Shopkeeper

## 🏗️ Production Deployment

### Server Requirements

- **Operating System:** Linux (Ubuntu 20.04+ recommended)
- **Node.js:** v18.0.0 or higher
- **Memory:** Minimum 2GB RAM
- **Storage:** Minimum 10GB available space
- **Network:** HTTPS-enabled domain

### Deployment Steps

1. **Prepare the server**
   ```bash
   # Update system packages
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   ```

2. **Deploy the application**
   ```bash
   # Clone the repository
   git clone <repository-url> /var/www/b2b-credit-system
   cd /var/www/b2b-credit-system
   
   # Install dependencies
   npm install
   
   # Build for production
   npm run build
   
   # Start with PM2
   pm2 start npm --name "b2b-credit-system" -- start
   pm2 save
   pm2 startup
   ```

3. **Configure reverse proxy (Nginx)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:5173;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Enable SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
│   ├── admin/          # Admin-specific components
│   ├── customer/       # Customer-specific components
│   ├── shopkeeper/     # Shopkeeper-specific components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard components
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── main.tsx           # Application entry point
```

### Technology Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Build Tool:** Vite
- **State Management:** React Context + Hooks

## 📊 Features Overview

### For Administrators
- **User Management:** Complete CRUD operations for users
- **Credit Score Monitoring:** Real-time credit score tracking and analytics
- **Transaction Oversight:** Monitor all system transactions
- **Business Verification:** Approve/reject business verification requests
- **System Reports:** Generate comprehensive business reports
- **System Configuration:** Manage credit scoring parameters and system settings

### For Customers (Retailers)
- **Credit Score Dashboard:** View personal credit score and improvement recommendations
- **Transaction History:** Track all purchases and payment history
- **Credit Limit Management:** Monitor usage and request limit increases
- **Supplier Network:** Manage relationships with suppliers
- **Profile Management:** Update business and personal information

### For Shopkeepers (Suppliers)
- **Customer Management:** Monitor customer relationships and credit health
- **Transaction Management:** Track sales and payment collection
- **Inventory Management:** Manage product inventory with alerts
- **Business Analytics:** Comprehensive business performance analytics
- **Profile Management:** Manage business information and preferences

## 🔒 Security Features

- **Role-based Access Control:** Different interfaces for different user types
- **Secure Authentication:** Password-based authentication with session management
- **Data Validation:** Client and server-side validation
- **Audit Trail:** Complete transaction and activity logging

## 🤝 Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in the `/docs` folder

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.