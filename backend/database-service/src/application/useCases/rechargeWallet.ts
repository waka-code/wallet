import { ClientRepository } from '../../domain/ports/clientRepository';
import { WalletRepository } from '../../domain/ports/walletRepository';
import { RechargeWalletData, Wallet } from '../../domain/entities/wallet';
import { ApiResponse, createSuccessResponse, createErrorResponse } from '@epayco/shared-types';
import { RechargeWalletUseCase } from '../interface/IRechargeWallet';

export const createRechargeWalletUseCase = (
  clientRepository: ClientRepository,
  walletRepository: WalletRepository
): RechargeWalletUseCase => ({
  async execute(rechargeData: RechargeWalletData): Promise<ApiResponse<Wallet>> {
    try {
      if (!rechargeData.document || !rechargeData.cellphone || !rechargeData.amount) {
        return createErrorResponse('Document, cellphone and amount are required', 'MISSING_FIELDS', 400);
      }

      if (rechargeData.amount <= 0) {
        return createErrorResponse('Amount must be greater than zero', 'INVALID_AMOUNT', 400);
      }

      const client = await clientRepository.findByDocumentAndCellphone(
        rechargeData.document,
        rechargeData.cellphone
      );

      if (!client) {
        return createErrorResponse(
          'Client not found or document/cellphone combination is invalid',
          'CLIENT_NOT_FOUND',
          404
        );
      }

      const wallet = await walletRepository.addFunds(rechargeData.document, rechargeData.amount);

      return createSuccessResponse(wallet, 'Wallet recharged successfully', 200);
    } catch (error) {
      return createErrorResponse(
        'Failed to recharge wallet',
        error instanceof Error ? error.message : 'Unknown error',
        500
      );
    }
  }
});
