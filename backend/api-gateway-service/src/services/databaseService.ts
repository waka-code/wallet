import axios, { AxiosResponse } from 'axios';
import {
  RegisterClientRequest,
  RechargeWalletRequest,
  GetBalanceRequest,
  CreatePaymentRequest,
  ConfirmPaymentRequest,
  ApiResponse
} from '../presentation/schemas/validationSchemas';
import { DatabaseService } from '../interface/IDatabaseService';
import { redisClient } from '@epayco/shared-types';


export const createDatabaseService = (): DatabaseService => {
  const baseURL = process.env.DATABASE_SERVICE_URL;

  const apiClient = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Database service error');
      } else if (error.request) {
        throw new Error('Database service is unavailable');
      } else {
        throw new Error('Failed to communicate with database service');
      }
    }
  );

  return {
    async registerClient(data: RegisterClientRequest): Promise<ApiResponse> {
      try {
        const response = await apiClient.post('/api/clients/register', data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async rechargeWallet(data: RechargeWalletRequest): Promise<ApiResponse> {
      try {
        const response = await apiClient.post('/api/wallet/recharge', data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    // Nota: En producción, la integración con Redis debe ser más robusta.
    // Aquí solo se guarda el resultado en caché después de consultar la base de datos,
    // pero no se aprovecha la lectura desde Redis ni se gestiona la expiración, invalidación o errores.
    // Una implementación correcta debería:
    // 1. Consultar primero en Redis antes de ir a la base de datos.
    // 2. Actualizar/invalidad la caché cuando cambie el saldo o los datos.
    // 3. Manejar posibles fallos de conexión con Redis.
    // 4. Definir una política de expiración adecuada.
    // 5. Evitar inconsistencias entre la caché y la base de datos.
    async getBalance(data: GetBalanceRequest): Promise<ApiResponse> {
      const cacheKey = `balance:${data.document}`;
      try {
        const response = await apiClient.get('/api/wallet/balance', {
          params: data
        });
        await redisClient.set(cacheKey, JSON.stringify(response.data), { EX: 20 });
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async createPayment(data: CreatePaymentRequest): Promise<ApiResponse> {
      try {
        const response = await apiClient.post('/api/payment/create', data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async confirmPayment(data: ConfirmPaymentRequest): Promise<ApiResponse> {
      try {
        const response = await apiClient.post('/api/payment/confirm', data);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  };
};
