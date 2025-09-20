import { Wallet } from '../entities/wallet';

export interface WalletRepository {
  create(clientDocument: string): Promise<Wallet>;
  findByClientDocument(clientDocument: string): Promise<Wallet | null>;
  updateBalance(clientDocument: string, newBalance: number): Promise<Wallet>;
  addFunds(clientDocument: string, amount: number): Promise<Wallet>;
  deductFunds(clientDocument: string, amount: number): Promise<Wallet>;
}
