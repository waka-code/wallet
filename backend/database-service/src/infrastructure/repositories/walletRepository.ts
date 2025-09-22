import { WalletRepository } from '../../domain/ports/walletRepository';
import { Wallet } from '../../domain/entities/wallet';
import { WalletModel } from '../adapters/models/walletModel';
import { redisClient } from '@epayco/shared-types';

export const createWalletRepository = (): WalletRepository => ({
  async create(clientDocument: string): Promise<Wallet> {
    const walletDoc = new WalletModel({ clientDocument, balance: 0 });
    const savedWallet = await walletDoc.save();
    
    return {
      id: savedWallet._id.toString(),
      clientDocument: savedWallet.clientDocument,
      balance: savedWallet.balance,
      createdAt: savedWallet.createdAt,
      updatedAt: savedWallet.updatedAt
    };
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
  async findByClientDocument(clientDocument: string): Promise<Wallet | null> {
    const cacheKey = `wallet:${clientDocument}`;
    const walletDoc = await WalletModel.findOne({ clientDocument });
    if (!walletDoc) return null;
    const wallet: Wallet = {
      id: walletDoc._id.toString(),
      clientDocument: walletDoc.clientDocument,
      balance: walletDoc.balance,
      createdAt: walletDoc.createdAt,
      updatedAt: walletDoc.updatedAt
    };
    await redisClient.set(cacheKey, JSON.stringify(wallet), { EX: 20 });
    return wallet;
  },

  async updateBalance(clientDocument: string, newBalance: number): Promise<Wallet> {
    const walletDoc = await WalletModel.findOneAndUpdate(
      { clientDocument },
      { balance: newBalance },
      { new: true }
    );

    if (!walletDoc) {
      throw new Error('Wallet not found');
    }

    return {
      id: walletDoc._id.toString(),
      clientDocument: walletDoc.clientDocument,
      balance: walletDoc.balance,
      createdAt: walletDoc.createdAt,
      updatedAt: walletDoc.updatedAt
    };
  },

  async addFunds(clientDocument: string, amount: number): Promise<Wallet> {
    const walletDoc = await WalletModel.findOneAndUpdate(
      { clientDocument },
      { $inc: { balance: amount } },
      { new: true }
    );

    if (!walletDoc) {
      throw new Error('Wallet not found');
    }

    return {
      id: walletDoc._id.toString(),
      clientDocument: walletDoc.clientDocument,
      balance: walletDoc.balance,
      createdAt: walletDoc.createdAt,
      updatedAt: walletDoc.updatedAt
    };
  },

  async deductFunds(clientDocument: string, amount: number): Promise<Wallet> {
    const walletDoc = await WalletModel.findOneAndUpdate(
      { clientDocument, balance: { $gte: amount } },
      { $inc: { balance: -amount } },
      { new: true }
    );

    if (!walletDoc) {
      throw new Error('Insufficient funds or wallet not found');
    }

    return {
      id: walletDoc._id.toString(),
      clientDocument: walletDoc.clientDocument,
      balance: walletDoc.balance,
      createdAt: walletDoc.createdAt,
      updatedAt: walletDoc.updatedAt
    };
  }
});
