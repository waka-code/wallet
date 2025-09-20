import { ApiResponse } from "@epayco/shared-types";
import { GetBalanceData } from "../../domain/entities/wallet";

export interface GetBalanceUseCase {
  execute(balanceData: GetBalanceData): Promise<ApiResponse<{ balance: number }>>;
}