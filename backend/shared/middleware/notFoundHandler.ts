import { Request, Response } from 'express';

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: 'Resource not found',
    code: 404,
    requestId: (req as any).id,
    timestamp: new Date().toISOString()
  });
}