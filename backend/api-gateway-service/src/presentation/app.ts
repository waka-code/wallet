import express, { Application } from 'express';
import { createDatabaseService } from '../services/databaseService';
import { createClientController } from './controllers/clientController';
import { createWalletController } from './controllers/walletController';
import { createPaymentController } from './controllers/paymentController';
import { configureSecurity } from '@epayco/shared-types';
import { configureRateLimit } from '@epayco/shared-types';
import { requestIdMiddleware } from '@epayco/shared-types';
import { timeoutMiddleware } from '@epayco/shared-types';
import { configureBodyParsing } from '@epayco/shared-types';
import { configureLogging } from '@epayco/shared-types';
import { validateContentType } from '@epayco/shared-types';
import { errorHandler } from '@epayco/shared-types';
import { notFoundHandler } from '@epayco/shared-types';

export const createApp = () => {
  const app:Application = express();

  configureSecurity(app);
  configureRateLimit(app);

  app.use(requestIdMiddleware);
  app.use(timeoutMiddleware(Number(process.env.TIMEOUT_MIDDLEWARE)));
  configureBodyParsing(app);
  configureLogging(app);
  app.use(validateContentType);

  const databaseService = createDatabaseService();
  const clientController = createClientController(databaseService);
  const walletController = createWalletController(databaseService);
  const paymentController = createPaymentController(databaseService);

  app.get('/health', (_req, res) => {
    res.json({
      status: 'OK',
      service: 'API Gateway',
      timestamp: new Date().toISOString()
    });
  });

  app.get('/api', (_req, res) => {
    res.json({
      name: 'Virtual Wallet API Gateway',
      version: '1.0.0',
      description: 'API Gateway for virtual wallet operations',
      endpoints: {
        'POST /api/clients/register': 'Register a new client',
        'POST /api/wallet/recharge': 'Recharge wallet balance',
        'GET /api/wallet/balance': 'Get wallet balance',
        'POST /api/payment/create': 'Create a payment (sends confirmation token)',
        'POST /api/payment/confirm': 'Confirm payment with token'
      }
    });
  });

  app.post('/api/clients/register', clientController.register);
  app.post('/api/wallet/recharge', walletController.recharge);
  app.get('/api/wallet/balance', walletController.getBalance);
  app.post('/api/payment/create', paymentController.createPayment);
  app.post('/api/payment/confirm', paymentController.confirmPayment);

  app.use(errorHandler);

  app.use(notFoundHandler);

  return app
};