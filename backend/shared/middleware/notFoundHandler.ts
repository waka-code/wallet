import { Request, Response, NextFunction, request } from 'express';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    success: false,
    message: 'Resource not found',
    code: 404,
    requestId: request && (request as any).id,
    timestamp: new Date().toISOString()
  });
}