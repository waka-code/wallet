import { Request, Response } from 'express';
import { createPaymentSchema, confirmPaymentSchema } from '../schemas/validationSchemas';
import { CreatePaymentUseCase } from '../../application/interface/ICreatePayment';
import { ConfirmPaymentUseCase } from '../../application/interface/IConfirmPayment ';

export const createPaymentController = (
  createPaymentUseCase: CreatePaymentUseCase,
  confirmPaymentUseCase: ConfirmPaymentUseCase
) => ({
  async createPayment(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = createPaymentSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: validationResult.error.errors.map((err: any) => err.message).join(', '),
          code: 400
        });
        return;
      }

      const result = await createPaymentUseCase.execute(validationResult.data);
      
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
          error: validationResult.error.errors.map((err: any) => err.message).join(', '),
          code: 400
        });
        return;
      }

      // Execute use case
      const result = await confirmPaymentUseCase.execute(validationResult.data);
      
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