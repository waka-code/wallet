import express from 'express';
import { createClientController } from './controllers/clientController';
import { createWalletController } from './controllers/walletController';
import { createPaymentController } from './controllers/paymentController';

// Use cases
import { createRegisterClientUseCase } from '../application/useCases/registerClient';
import { createRechargeWalletUseCase } from '../application/useCases/rechargeWallet';
import { createGetBalanceUseCase } from '../application/useCases/getBalance';
import { createCreatePaymentUseCase } from '../application/useCases/createPayment';
import { createConfirmPaymentUseCase } from '../application/useCases/confirmPayment';

// Repositories
import { createClientRepository } from '../infrastructure/repositories/clientRepository';
import { createWalletRepository } from '../infrastructure/repositories/walletRepository';
import { createPaymentRepository } from '../infrastructure/repositories/paymentRepository';

// Services
import { createTokenGenerator } from '../infrastructure/adapters/services/tokenGenerator';
import { createEmailService } from '../infrastructure/adapters/services/emailService';
import { configureSecurity } from '@epayco/shared-types';
import { configureRateLimit } from '@epayco/shared-types';
import { requestIdMiddleware } from '@epayco/shared-types';
import { timeoutMiddleware } from '@epayco/shared-types';
import { configureBodyParsing } from '@epayco/shared-types';
import { configureLogging } from '@epayco/shared-types';
import { validateContentType } from '@epayco/shared-types';
import { createPaymentLimiter } from '@epayco/shared-types';
import { errorHandler } from '@epayco/shared-types';
import { notFoundHandler } from '@epayco/shared-types';


export const createApp = () => {
  const app = express();

  configureSecurity(app);
  configureRateLimit(app);

  app.use(requestIdMiddleware);
  app.use(timeoutMiddleware(Number(process.env.TIMEOUT_MIDDLEWARE)));

  configureBodyParsing(app);
  configureLogging(app);

  app.use(validateContentType);

  const clientRepository = createClientRepository();
  const walletRepository = createWalletRepository();
  const paymentRepository = createPaymentRepository();

  const emailService = createEmailService();
  const tokenGenerator = createTokenGenerator();

  const registerClientUseCase = createRegisterClientUseCase(clientRepository, walletRepository);
  const rechargeWalletUseCase = createRechargeWalletUseCase(clientRepository, walletRepository);
  const getBalanceUseCase = createGetBalanceUseCase(clientRepository, walletRepository);
  const createPaymentUseCase = createCreatePaymentUseCase(
    clientRepository,
    walletRepository,
    paymentRepository,
    emailService,
    tokenGenerator
  );
  const confirmPaymentUseCase = createConfirmPaymentUseCase(walletRepository, paymentRepository);

  const clientController = createClientController(registerClientUseCase);
  const walletController = createWalletController(rechargeWalletUseCase, getBalanceUseCase);
  const paymentController = createPaymentController(createPaymentUseCase, confirmPaymentUseCase);

  app.get('/health', (_req, res) => {
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'database-service',
      version: process.env.npm_package_version || '1.0.0'
    });
  });

  const paymentLimiter = createPaymentLimiter();

  app.post('/api/clients/register', clientController.register);
  app.post('/api/wallet/recharge', walletController.recharge);
  app.get('/api/wallet/balance', walletController.getBalance);
  app.post('/api/payment/create', paymentLimiter, paymentController.createPayment);
  app.post('/api/payment/confirm', paymentLimiter, paymentController.confirmPayment);

  app.use(errorHandler);
  app.use(notFoundHandler);

  return app;
};
