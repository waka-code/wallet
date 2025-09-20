import { ApiResponse } from "@epayco/shared-types";
import { ConfirmPaymentData } from "../../domain/entities/payment";

export type PaymentResponse = {
  message: string;
  newBalance: number;
};

export interface ConfirmPaymentUseCase {
  execute(confirmData: ConfirmPaymentData): Promise<ApiResponse<PaymentResponse>>;
}