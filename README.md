# Virtual Wallet System - Complete Documentation

## Project Overview

A complete virtual wallet system built with hexagonal architecture, consisting of two REST services, a React frontend, and Docker containerization.

## Architecture

### System Components

1. **Database Service** (Port 3001)
   - Direct MongoDB access
   - Business logic implementation
   - Email token generation

2. **API Gateway Service** (Port 3000)
   - Client-facing API
   - HTTP proxy to Database Service
   - Request/response validation

3. **React Frontend** (Port 5173)
   - User interface
   - Form validation
   - API integration

4. **MongoDB Database** (Port 27017)
   - Data persistence
   - Containerized

### Architecture Principles

- **Hexagonal Architecture**: Clear separation of domain, application, and infrastructure layers
- **Functional Programming**: No classes, only functions and modules
- **Validation**: Zod schemas for all requests and responses
- **Type Safety**: TypeScript throughout the stack

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for development)
- Git

### Installation & Setup

1. **Clone and Setup**:
   ```bash
   git clone <repository-url>
   cd epayco
   ```

2. **Install All Dependencies**:
   ```bash
   npm install
   ```

3. **Start Complete System**:
   
   **With Docker (Recommended):**
   ```bash
   # Windows
   deploy.bat start
   
   # Linux/Mac
   ./deploy.sh start
   
   # Or directly
   npm run docker:up
   ```
   
   **Development Mode:**
   ```bash
   # Windows
   deploy.bat dev
   
   # Linux/Mac  
   ./deploy.sh dev
   
   # Or directly
   npm run dev
   ```

4. **Access Applications**:
   - Frontend: http://localhost:4173
   - API Gateway: http://localhost:3000
   - Database Service: http://localhost:3001
   - MongoDB: localhost:27017

### Development Mode

**Global Commands (from root directory):**

```bash
# Install all dependencies
npm install

# Start all services in development mode
npm run dev

# Build all services
npm run build

# Run tests for all services
npm run test

# Lint all services
npm run lint
```

**Docker Commands:**

```bash
# Start with Docker
npm run docker:up

# Stop Docker services
npm run docker:down

# View logs
npm run docker:logs

# Clean everything
npm run docker:clean
```

**Individual Service Development:**

```bash
# Backend services
npm run dev:db        # Database Service
npm run dev:api       # API Gateway Service

# Frontend
npm run dev:frontend  # React Application
```

## API Documentation

### Client Management

#### Register Client
- **Endpoint**: `POST /api/clients/register`
- **Purpose**: Create new client and associated wallet
- **Request**:
  ```json
  {
    "document": "12345678",
    "names": "John Doe",
    "email": "john.doe@example.com",
    "cellphone": "1234567890"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "client-id",
      "document": "12345678",
      "names": "John Doe",
      "email": "john.doe@example.com",
      "cellphone": "1234567890"
    }
  }
  ```

### Wallet Operations

#### Recharge Wallet
- **Endpoint**: `POST /api/wallet/recharge`
- **Purpose**: Add funds to existing wallet
- **Request**:
  ```json
  {
    "document": "12345678",
    "cellphone": "1234567890",
    "amount": 100.00
  }
  ```

#### Get Balance
- **Endpoint**: `GET /api/wallet/balance`
- **Purpose**: Check current wallet balance
- **Query Parameters**: `document`, `cellphone`

### Payment Operations

#### Create Payment
- **Endpoint**: `POST /api/payment/create`
- **Purpose**: Initiate payment and send email token
- **Request**:
  ```json
  {
    "document": "12345678",
    "cellphone": "1234567890",
    "amount": 25.00
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "sessionId": "unique-session-id"
    }
  }
  ```

#### Confirm Payment
- **Endpoint**: `POST /api/payment/confirm`
- **Purpose**: Confirm payment with email token
- **Request**:
  ```json
  {
    "sessionId": "unique-session-id",
    "token": "123456"
  }
  ```

## Frontend Usage

The React frontend provides a complete user interface with the following features:

### Available Tabs

1. **Register Client**: New user registration
2. **Recharge Wallet**: Add funds to wallet
3. **Get Balance**: Check current balance
4. **Create Payment**: Initiate new payment
5. **Confirm Payment**: Confirm with email token

### Features

- **Form Validation**: Real-time validation with Zod schemas
- **Responsive Design**: Tailwind CSS styling
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Clear success confirmations
- **Type Safety**: Full TypeScript integration

## Testing

### Postman Collection

Import the Postman collection from `postman/` directory:

1. **Collection**: `Virtual-Wallet-API.postman_collection.json`
2. **Environment**: `Virtual-Wallet-Development.postman_environment.json`

### Testing Flow

1. **Health Checks**: Verify all services are running
2. **Register Client**: Create test user
3. **Recharge Wallet**: Add initial funds
4. **Check Balance**: Verify funds added
5. **Create Payment**: Initiate payment
6. **Confirm Payment**: Use email token to confirm

### Manual Testing

```bash
# Health checks
curl http://localhost:3000/health
curl http://localhost:3001/health

# Register client
curl -X POST http://localhost:3000/api/clients/register \
  -H "Content-Type: application/json" \
  -d '{"document":"12345678","names":"John Doe","email":"test@example.com","cellphone":"1234567890"}'

# Recharge wallet
curl -X POST http://localhost:3000/api/wallet/recharge \
  -H "Content-Type: application/json" \
  -d '{"document":"12345678","cellphone":"1234567890","amount":100}'
```

## Configuration

### Environment Variables

#### Database Service (.env)
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/virtual-wallet
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### API Gateway Service (.env)
```env
PORT=3000
DATABASE_SERVICE_URL=http://localhost:3001
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

## Project Structure

```
epayco/
├── backend/
│   ├── database-service/          # Core business logic service
│   │   ├── src/
│   │   │   ├── domain/           # Domain entities and interfaces
│   │   │   ├── application/      # Use cases and business logic
│   │   │   └── infrastructure/   # Database and external services
│   │   ├── package.json
│   │   └── .env
│   └── api-gateway-service/       # Client-facing API
│       ├── src/
│       │   ├── controllers/      # HTTP request handlers
│       │   ├── services/         # External service clients
│       │   └── schemas/          # Validation schemas
│       ├── package.json
│       └── .env
├── frontend/                      # React application
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── services/             # API clients
│   │   └── schemas/              # Validation schemas
│   ├── package.json
│   └── .env
├── postman/                       # API testing
│   ├── Virtual-Wallet-API.postman_collection.json
│   ├── Virtual-Wallet-Development.postman_environment.json
│   └── README.md
├── docker-compose.yml             # Container orchestration
└── README.md                      # This file
```

## Development Guidelines

### Code Style

- **No Classes**: Use functional programming only
- **Type Safety**: Leverage TypeScript throughout
- **Validation**: Use Zod for all data validation
- **Error Handling**: Consistent error responses
- **Clean Architecture**: Maintain layer separation

### Database Schema

#### Clients Collection
```javascript
{
  _id: ObjectId,
  document: String (unique),
  names: String,
  email: String,
  cellphone: String,
  createdAt: Date
}
```

#### Wallets Collection
```javascript
{
  _id: ObjectId,
  clientId: ObjectId,
  balance: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Payment Sessions Collection
```javascript
{
  _id: ObjectId,
  clientId: ObjectId,
  amount: Number,
  token: String,
  expiresAt: Date,
  createdAt: Date
}
```

## Deployment

### Production Deployment

**Using Scripts:**
```bash
# Windows
deploy.bat start

# Linux/Mac
./deploy.sh start
```

**Using NPM Commands:**
```bash
# Start with Docker
npm run docker:up

# Build and start
npm run build
npm run docker:build
npm run docker:up
```

### Available Commands

**Global NPM Scripts:**
```bash
npm install           # Install all dependencies
npm run dev          # Start all services in development
npm run build        # Build all services
npm run start        # Start all services in production
npm run test         # Run all tests
npm run lint         # Lint all services
npm run clean        # Clean all node_modules and dist folders
npm run reset        # Clean and reinstall everything
```

**Docker Commands:**
```bash
npm run docker:build    # Build Docker images
npm run docker:up       # Start containers
npm run docker:down     # Stop containers  
npm run docker:logs     # View logs
npm run docker:restart  # Restart containers
npm run docker:clean    # Remove everything
```

**Deploy Scripts:**
```bash
# Windows
deploy.bat start     # Start all services
deploy.bat stop      # Stop all services
deploy.bat restart   # Restart all services
deploy.bat logs      # View logs
deploy.bat status    # Check status
deploy.bat dev       # Development mode
deploy.bat clean     # Clean everything

# Linux/Mac
./deploy.sh start    # Start all services
./deploy.sh stop     # Stop all services
./deploy.sh restart  # Restart all services
./deploy.sh logs     # View logs
./deploy.sh status   # Check status
./deploy.sh dev      # Development mode
./deploy.sh clean    # Clean everything
```

### Scaling Considerations

- **Database**: Consider MongoDB replica sets for high availability
- **Services**: Use container orchestration (Kubernetes) for scaling
- **Load Balancing**: Add nginx for load balancing multiple instances
- **Monitoring**: Implement logging and monitoring solutions

## Security

### Implemented Security Measures

- **Input Validation**: Zod schemas prevent invalid data
- **CORS Configuration**: Proper cross-origin settings
- **Environment Variables**: Sensitive data in environment files
- **Token Expiration**: Payment tokens expire after time limit

### Additional Security Recommendations

- **HTTPS**: Use SSL certificates in production
- **Rate Limiting**: Implement API rate limiting
- **Authentication**: Add JWT authentication for production
- **Input Sanitization**: Additional sanitization for database queries

## Troubleshooting

### Common Issues

1. **Services Not Starting**:
   - Check port availability
   - Verify Docker is running
   - Check environment variables

2. **Database Connection Issues**:
   - Ensure MongoDB is running
   - Verify connection string
   - Check network connectivity

3. **Email Not Sending**:
   - Verify SMTP configuration
   - Check email credentials
   - Ensure firewall allows SMTP ports

4. **Frontend Not Loading**:
   - Check if Vite dev server is running
   - Verify API_URL environment variable
   - Check browser console for errors

### Logs and Debugging

```bash
# View service logs
docker-compose logs database-service
docker-compose logs api-gateway-service
docker-compose logs frontend

# Debug individual services
cd backend/database-service && npm run dev
cd backend/api-gateway-service && npm run dev
cd frontend && npm run dev
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Follow coding guidelines
4. Add tests for new features
5. Submit pull request

## License

This project is for educational purposes. Please ensure proper licensing for production use.

---

**Project Status**: ✅ Complete - Ready for testing and deployment

**Last Updated**: January 2024
# wallet
