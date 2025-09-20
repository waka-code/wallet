import { ApiResponse } from "@epayco/shared-types";
import { ConfirmPaymentRequest, CreatePaymentRequest, GetBalanceRequest, RechargeWalletRequest, RegisterClientRequest } from "../presentation/schemas/validationSchemas";

export interface DatabaseService {
  registerClient(data: RegisterClientRequest): Promise<ApiResponse>;
  rechargeWallet(data: RechargeWalletRequest): Promise<ApiResponse>;
  getBalance(data: GetBalanceRequest): Promise<ApiResponse>;
  createPayment(data: CreatePaymentRequest): Promise<ApiResponse>;
  confirmPayment(data: ConfirmPaymentRequest): Promise<ApiResponse>;
}
