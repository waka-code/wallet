import { ClientRepository } from '../../domain/ports/clientRepository';
import { WalletRepository } from '../../domain/ports/walletRepository';
import { CreateClientData, Client } from '../../domain/entities/client';
import { ApiResponse, createSuccessResponse, createErrorResponse } from '@epayco/shared-types';
import { RegisterClientUseCase } from '../interface/IregisterClient';

export const createRegisterClientUseCase = (
  clientRepository: ClientRepository,
  walletRepository: WalletRepository
): RegisterClientUseCase => ({
  async execute(clientData: CreateClientData): Promise<ApiResponse<Client>> {
    try {
      if (!clientData.document || !clientData.names || !clientData.email || !clientData.cellphone) {
        return createErrorResponse('All fields are required', 'MISSING_FIELDS', 400);
      }

      const existingClientByDocument = await clientRepository.findByDocument(clientData.document);
      if (existingClientByDocument) {
        return createErrorResponse('Client with this document already exists', 'DOCUMENT_EXISTS', 409);
      }

      const existingClientByEmail = await clientRepository.findByEmail(clientData.email);
      if (existingClientByEmail) {
        return createErrorResponse('Client with this email already exists', 'EMAIL_EXISTS', 409);
      }

      const client = await clientRepository.create(clientData);

      await walletRepository.create(client.document);

      return createSuccessResponse(client, 'Client registered successfully', 201);
    } catch (error) {
      return createErrorResponse(
        'Failed to register client',
        error instanceof Error ? error.message : 'Unknown error',
        500
      );
    }
  }
});
