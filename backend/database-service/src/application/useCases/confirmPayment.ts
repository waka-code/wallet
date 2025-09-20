import { WalletRepository } from '../../domain/ports/walletRepository';
import { PaymentRepository } from '../../domain/ports/paymentRepository';
import { ConfirmPaymentData, PaymentStatus } from '../../domain/entities/payment';
import { ApiResponse, createSuccessResponse, createErrorResponse } from '@epayco/shared-types';
import { ConfirmPaymentUseCase, PaymentResponse } from '../interface/IConfirmPayment ';

export const createConfirmPaymentUseCase = (
  walletRepository: WalletRepository,
  paymentRepository: PaymentRepository
): ConfirmPaymentUseCase => ({
  async execute(confirmData: ConfirmPaymentData): Promise<ApiResponse<PaymentResponse>> {
    try {
      if (!confirmData.sessionId || !confirmData.token) {
        return createErrorResponse('Session ID and token are required', 'MISSING_FIELDS', 400);
      }

      const payment = await paymentRepository.findBySessionId(confirmData.sessionId);
      if (!payment) {
        return createErrorResponse('Payment session not found', 'SESSION_NOT_FOUND', 404);
      }

      if (payment.status !== PaymentStatus.PENDING) {
        return createErrorResponse('Payment has already been processed', 'PAYMENT_ALREADY_PROCESSED', 400);
      }

      if (new Date() > payment.tokenExpiresAt) {
        await paymentRepository.updateStatus(confirmData.sessionId, PaymentStatus.EXPIRED);
        return createErrorResponse('Payment token has expired', 'TOKEN_EXPIRED', 400);
      }

      if (payment.token !== confirmData.token) {
        return createErrorResponse('Invalid token', 'INVALID_TOKEN', 400);
      }

      const updatedWallet = await walletRepository.deductFunds(
        payment.clientDocument,
        payment.amount
      );

      await paymentRepository.updateStatus(confirmData.sessionId, PaymentStatus.CONFIRMED);

      return createSuccessResponse(
        {
          message: 'Payment confirmed successfully',
          newBalance: updatedWallet.balance
        },
        'Payment has been processed successfully',
        200
      );
    } catch (error) {
      try {
        await paymentRepository.updateStatus(confirmData.sessionId, PaymentStatus.FAILED);
      } catch (updateError) {
        return createErrorResponse(
          'Failed to update payment status',
          updateError instanceof Error ? updateError.message : 'Unknown error',
          500
        );
      }

      return createErrorResponse(
        'Failed to confirm payment',
        error instanceof Error ? error.message : 'Unknown error',
        500
      );
    }
  }
});
