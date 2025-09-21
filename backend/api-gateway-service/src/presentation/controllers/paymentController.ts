import { Request, Response } from 'express';
import { createPaymentSchema, confirmPaymentSchema } from '../schemas/validationSchemas';
import { DatabaseService } from '../../interface/IDatabaseService';

export const createPaymentController = (databaseService: DatabaseService) => ({
  async createPayment(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = createPaymentSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: validationResult.error.errors.map((err) => err.message).join(', '),
          code: 400
        });
        return;
      }

      const result = await databaseService.createPayment(validationResult.data);
      
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

  async confirmPayment(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = confirmPaymentSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: validationResult.error.errors.map((err) => err.message).join(', '),
          code: 400
        });
        return;
      }

      const result = await databaseService.confirmPayment(validationResult.data);
      
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
