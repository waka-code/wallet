# Virtual Wallet API - Postman Collection

This directory contains Postman collections and environments for testing the Virtual Wallet API system.

## Files

- `Virtual-Wallet-API.postman_collection.json` - Complete API collection with all endpoints
- `Virtual-Wallet-Development.postman_environment.json` - Development environment variables

## Import Instructions

1. Open Postman application
2. Click "Import" button
3. Select "Upload Files"
4. Import both the collection and environment files
5. Select "Virtual Wallet - Development" environment in Postman

## Collection Structure

### 1. Client Management
- **Register Client**: Create new client with wallet

### 2. Wallet Operations
- **Recharge Wallet**: Add funds to existing wallet
- **Get Balance**: Check current wallet balance

### 3. Payment Operations
- **Create Payment**: Initiate payment (sends email token)
- **Confirm Payment**: Confirm payment with email token

### 4. System Health
- **API Gateway Health Check**: Verify API Gateway status
- **Database Service Health Check**: Verify Database Service status
- **API Documentation**: Get API information

## Testing Flow

### Complete Wallet Testing Sequence:

1. **Start Services** (run from project root):
   ```bash
   docker-compose up -d
   ```

2. **Register Client**:
   - Run "Register Client" request
   - Verify success response with client ID

3. **Recharge Wallet**:
   - Run "Recharge Wallet" request
   - Use same document/cellphone from registration
   - Add funds (e.g., 100.00)

4. **Check Balance**:
   - Run "Get Balance" request
   - Verify balance matches recharge amount

5. **Create Payment**:
   - Run "Create Payment" request
   - Note the sessionId in response
   - Check email for 6-digit token

6. **Confirm Payment**:
   - Run "Confirm Payment" request
   - Use sessionId from step 5
   - Use token from email
   - Verify new balance is reduced

## Environment Variables

The environment includes test values:
- `api_url`: http://localhost:3000
- `test_document`: 12345678
- `test_cellphone`: 1234567890
- `test_email`: john.doe@example.com

## Notes

- The collection includes automated tests for each request
- Session ID is automatically captured from "Create Payment" for use in "Confirm Payment"
- All requests include proper error handling tests
- Health checks help verify system status before testing

## Email Configuration

For payment confirmation emails to work, configure email settings in:
- `backend/database-service/.env`

Set the following variables:
```
> ⚠️ **IMPORTANTE**  
> Este proyecto corresponde a una prueba técnica y no incluye una suscripción activa a Resend para el envío de correos electrónicos a cualquier destinatario.  
> Si deseas probar la funcionalidad de envío de correos con tu propia dirección (o la de otra persona), deberás crear una cuenta gratuita en [Resend](https://resend.com), generar una API Key y actualizar el valor de `API_KEY` en el archivo `.env` ubicado en `backend/database-service`.  
> **Sin este paso, la funcionalidad de envío de correos no estará disponible.**
>
```

## Troubleshooting

- Ensure all services are running with `docker-compose up`
- Check service health endpoints first
- Verify email configuration for payment confirmations
- Use actual email tokens (not the placeholder "123456")

