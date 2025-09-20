export interface Wallet {
  id: string;
  clientDocument: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
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
