# Deployment Guide

## 🚀 Production Deployment Options

### Option 1: Traditional VPS/Server Deployment

#### Server Requirements
- **OS**: Ubuntu 20.04 LTS or higher
- **CPU**: 2+ cores
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 20GB SSD minimum
- **Network**: 100Mbps connection

#### Step-by-Step Deployment

1. **Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y
```

2. **Application Deployment**
```bash
# Create application directory
sudo mkdir -p /var/www/b2b-credit-system
sudo chown $USER:$USER /var/www/b2b-credit-system

# Clone repository
cd /var/www/b2b-credit-system
git clone <your-repo-url> .

# Install dependencies
npm install

# Build application
npm run build

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'b2b-credit-system',
    script: 'npm',
    args: 'run preview',
    cwd: '/var/www/b2b-credit-system',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 4173
    }
  }]
}
EOF

# Start application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

3. **Nginx Configuration**
```bash
# Create Nginx configuration
sudo tee /etc/nginx/sites-available/b2b-credit-system << EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:4173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/b2b-credit-system /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

4. **SSL Certificate Setup**
```bash
# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Verify auto-renewal
sudo certbot renew --dry-run
```

### Option 2: Docker Deployment

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    volumes:
      - ./logs:/var/log/nginx

  # Optional: Add database service
  # postgres:
  #   image: postgres:14
  #   environment:
  #     POSTGRES_DB: b2b_credit_system
  #     POSTGRES_USER: postgres
  #     POSTGRES_PASSWORD: your_password
  #   volumes:
  #     - postgres_data:/var/lib/postgresql/data

# volumes:
#   postgres_data:
```

#### Deployment Commands
```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Update application
git pull
docker-compose build
docker-compose up -d
```

### Option 3: Cloud Platform Deployment

#### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Configure custom domain
vercel domains add your-domain.com
```

#### Netlify Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### AWS S3 + CloudFront
```bash
# Build application
npm run build

# Install AWS CLI
pip install awscli

# Configure AWS credentials
aws configure

# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Upload files
aws s3 sync dist/ s3://your-bucket-name --delete

# Configure CloudFront distribution
# (Use AWS Console or CloudFormation)
```

## 🔧 Environment Configuration

### Environment Variables
```bash
# Create .env.production file
NODE_ENV=production
VITE_API_URL=https://api.your-domain.com
VITE_APP_NAME="B2B Credit System"
VITE_APP_VERSION=1.0.0

# Database (if using backend)
DATABASE_URL=postgresql://user:password@localhost:5432/b2b_credit_system

# Redis (for caching)
REDIS_URL=redis://localhost:6379

# Email service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# File upload
MAX_FILE_SIZE=10MB
UPLOAD_PATH=/var/uploads
```

## 📊 Monitoring and Logging

### PM2 Monitoring
```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs

# Restart application
pm2 restart b2b-credit-system

# Reload with zero downtime
pm2 reload b2b-credit-system
```

### Log Configuration
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'b2b-credit-system',
    script: 'npm',
    args: 'run preview',
    log_file: '/var/log/b2b-credit-system/combined.log',
    out_file: '/var/log/b2b-credit-system/out.log',
    error_file: '/var/log/b2b-credit-system/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
}
```

### Health Check Endpoint
```javascript
// Add to your backend
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version
  });
});
```

## 🔒 Security Hardening

### Server Security
```bash
# Configure firewall
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

# Disable root login
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart ssh

# Install fail2ban
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
```

### Application Security
```javascript
// Security headers (if using Express backend)
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

## 📈 Performance Optimization

### Nginx Optimization
```nginx
# Add to nginx.conf
worker_processes auto;
worker_connections 1024;

# Enable caching
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Enable compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 6;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/javascript
    application/xml+rss
    application/json;
```

### Application Optimization
```javascript
// Vite build optimization
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          icons: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /var/www/b2b-credit-system
          git pull origin main
          npm install
          npm run build
          pm2 reload b2b-credit-system
```

## 📋 Backup Strategy

### Database Backup
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/b2b-credit-system"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
pg_dump b2b_credit_system > $BACKUP_DIR/db_backup_$DATE.sql

# Backup application files
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz /var/www/b2b-credit-system

# Remove old backups (keep last 7 days)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

### Automated Backup Cron
```bash
# Add to crontab
0 2 * * * /path/to/backup.sh
```

This deployment guide provides comprehensive instructions for deploying the B2B Credit System in various environments with proper security, monitoring, and backup strategies.