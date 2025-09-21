import { Request, Response } from 'express';
import { rechargeWalletSchema, getBalanceSchema } from '../schemas/validationSchemas';
import { RechargeWalletUseCase } from '../../application/interface/IRechargeWallet';
import { GetBalanceUseCase } from '../../application/interface/IGetBalance';

export const createWalletController = (
  rechargeWalletUseCase: RechargeWalletUseCase,
  getBalanceUseCase: GetBalanceUseCase
) => ({
  async recharge(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = rechargeWalletSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: validationResult.error.errors.map((err) => err.message).join(', '),
          code: 400
        });
        return;
      }

      const result = await rechargeWalletUseCase.execute(validationResult.data);
      
      res.status(result.code).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
        code: 500
      });
    }
  },

  async getBalance(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = getBalanceSchema.safeParse(req.query);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: validationResult.error.errors.map((err) => err.message).join(', '),
          code: 400
        });
        return;
      }

      const result = await getBalanceUseCase.execute(validationResult.data);
      
      res.status(result.code).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
        code: 500
      });
    }
  }
});
