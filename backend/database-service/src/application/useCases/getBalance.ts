import { ClientRepository } from '../../domain/ports/clientRepository';
import { WalletRepository } from '../../domain/ports/walletRepository';
import { GetBalanceData, Wallet } from '../../domain/entities/wallet';
import { ApiResponse, createSuccessResponse, createErrorResponse } from '@epayco/shared-types';
import { GetBalanceUseCase } from '../interface/IGetBalance';

export const createGetBalanceUseCase = (
  clientRepository: ClientRepository,
  walletRepository: WalletRepository
): GetBalanceUseCase => ({
  async execute(balanceData: GetBalanceData): Promise<ApiResponse<{ balance: number }>> {
    try {
      if (!balanceData.document || !balanceData.cellphone) {
        return createErrorResponse('Document and cellphone are required', 'MISSING_FIELDS', 400);
      }

      const client = await clientRepository.findByDocumentAndCellphone(
        balanceData.document,
        balanceData.cellphone
      );

      if (!client) {
        return createErrorResponse(
          'Client not found or document/cellphone combination is invalid',
          'CLIENT_NOT_FOUND',
          404
        );
      }

      const wallet = await walletRepository.findByClientDocument(balanceData.document);

      if (!wallet) {
        return createErrorResponse('Wallet not found', 'WALLET_NOT_FOUND', 404);
      }

      return createSuccessResponse(
        { balance: wallet.balance },
        'Balance retrieved successfully',
        200
      );
    } catch (error) {
      return createErrorResponse(
        'Failed to get balance',
        error instanceof Error ? error.message : 'Unknown error',
        500
      );
    }
  }
});
