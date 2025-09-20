import { ApiResponse } from "@epayco/shared-types";
import { RechargeWalletData, Wallet } from "../../domain/entities/wallet";

export interface RechargeWalletUseCase {
  execute(rechargeData: RechargeWalletData): Promise<ApiResponse<Wallet>>;
}
