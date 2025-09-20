import { ClientRepository } from '../../domain/ports/clientRepository';
import { WalletRepository } from '../../domain/ports/walletRepository';
import { PaymentRepository } from '../../domain/ports/paymentRepository';
import { EmailService } from '../../domain/ports/emailService';
import { TokenGenerator } from '../../domain/ports/tokenGenerator';
import { CreatePaymentData } from '../../domain/entities/payment';
import { ApiResponse, createSuccessResponse, createErrorResponse } from '@epayco/shared-types';
import { CreatePaymentUseCase } from '../interface/ICreatePayment';

export const createCreatePaymentUseCase = (
  clientRepository: ClientRepository,
  walletRepository: WalletRepository,
  paymentRepository: PaymentRepository,
  emailService: EmailService,
  tokenGenerator: TokenGenerator
): CreatePaymentUseCase => ({
  async execute(paymentData: CreatePaymentData): Promise<ApiResponse<{ sessionId: string }>> {
    try {
      if (!paymentData.document || !paymentData.cellphone || !paymentData.amount) {
        return createErrorResponse('Document, cellphone and amount are required', 'MISSING_FIELDS', 400);
      }

      if (paymentData.amount <= 0) {
        return createErrorResponse('Amount must be greater than zero', 'INVALID_AMOUNT', 400);
      }

      const client = await clientRepository.findByDocumentAndCellphone(
        paymentData.document,
        paymentData.cellphone
      );

      if (!client) {
        return createErrorResponse(
          'Client not found or document/cellphone combination is invalid',
          'CLIENT_NOT_FOUND',
          404
        );
      }

      const wallet = await walletRepository.findByClientDocument(paymentData.document);
      if (!wallet) {
        return createErrorResponse('Wallet not found', 'WALLET_NOT_FOUND', 404);
      }

      if (wallet.balance < paymentData.amount) {
        return createErrorResponse('Insufficient funds', 'INSUFFICIENT_FUNDS', 400);
      }

      const token = tokenGenerator.generateSixDigitToken();
      const sessionId = tokenGenerator.generateSessionId();

      await paymentRepository.create({
        ...paymentData,
        token,
        sessionId
      });

      await emailService.sendPaymentToken(client.email, token, paymentData.amount);

      return createSuccessResponse(
        { sessionId },
        'Payment token sent to your email. Please check your inbox to complete the payment.',
        200
      );
    } catch (error) {
      console.log('Error in CreatePaymentUseCase:', error);
      return createErrorResponse(
         error instanceof Error ? error.message : 'Failed to create payment',
        error instanceof Error ? error.message : 'Unknown error',
        500
      );
    }
  }
});
