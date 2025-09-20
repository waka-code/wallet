import { ApiResponse } from "@epayco/shared-types";
import { CreatePaymentData } from "../../domain/entities/payment";

export interface CreatePaymentUseCase {
  execute(paymentData: CreatePaymentData): Promise<ApiResponse<{ sessionId: string }>>;
}