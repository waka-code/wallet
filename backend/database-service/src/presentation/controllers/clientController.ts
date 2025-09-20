import { Request, Response } from 'express';
import { registerClientSchema } from '../schemas/validationSchemas';
import { RegisterClientUseCase } from '../../application/interface/IregisterClient';

export const createClientController = (registerClientUseCase: RegisterClientUseCase) => ({
  async register(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = registerClientSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: validationResult.error.errors.map(err => err.message).join(', '),
          code: 400
        });
        return;
      }

      const result = await registerClientUseCase.execute(validationResult.data);
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
