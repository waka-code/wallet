import type {
  ApiResponse,
  RegisterClientData,
  RechargeWalletData,
  GetBalanceData,
  CreatePaymentData,
  ConfirmPaymentData,
  Client,
  BalanceResponse,
  PaymentSessionResponse,
  ConfirmPaymentResponse
} from '../types/api';
import { apiClient } from './Client';
import { handleApiError } from '../utils/handleApiError';

export const walletApi = {
  async registerClient(data: RegisterClientData): Promise<ApiResponse<Client>> {
    try {
      const response = await apiClient.post('/api/clients/register', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async rechargeWallet(data: RechargeWalletData): Promise<ApiResponse> {
    try {
      const response = await apiClient.post('/api/wallet/recharge', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getBalance(data: GetBalanceData): Promise<ApiResponse<BalanceResponse>> {
    try {
      const params = new URLSearchParams();
      params.append('document', data.document);
      params.append('cellphone', data.cellphone);

      const response = await apiClient.get(`/api/wallet/balance?${params.toString()}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async createPayment(data: CreatePaymentData): Promise<ApiResponse<PaymentSessionResponse>> {
    try {
      const response = await apiClient.post('/api/payment/create', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async confirmPayment(data: ConfirmPaymentData): Promise<ApiResponse<ConfirmPaymentResponse>> {
    try {
      const response = await apiClient.post('/api/payment/confirm', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};