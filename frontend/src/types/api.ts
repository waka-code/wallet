export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  code: number;
}

export interface Client {
  id: string;
  document: string;
  names: string;
  email: string;
  cellphone: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterClientData {
  document: string;
  names: string;
  email: string;
  cellphone: string;
}

export interface RechargeWalletData {
  document: string;
  cellphone: string;
  amount: number;
}

export interface GetBalanceData {
  document: string;
  cellphone: string;
}

export interface CreatePaymentData {
  document: string;
  cellphone: string;
  amount: number;
}

export interface ConfirmPaymentData {
  sessionId: string;
  token: string;
}

export interface BalanceResponse {
  balance: number;
}

export interface PaymentSessionResponse {
  sessionId: string;
}

export interface ConfirmPaymentResponse {
  message: string;
  newBalance: number;
}
