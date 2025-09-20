import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  (req as any).id = crypto.randomUUID();
  res.setHeader('X-Request-ID', (req as any).id);
  next();
};

export const timeoutMiddleware = (timeout: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const timer = setTimeout(() => {
      if (!res.headersSent) {
        res.status(408).json({
          success: false,
          message: 'Request timeout',
          code: 408,
          requestId: (req as any).id
        });
      }
    }, timeout);

    res.on('finish', () => clearTimeout(timer));
    res.on('close', () => clearTimeout(timer));
    
    next();
  };
};

export const validateContentType = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        success: false,
        message: 'Content-Type must be application/json',
        code: 400,
        requestId: (req as any).id
      });
    }
  }
  next();
};

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(`[${(req as any).id}] Unhandled error:`, err);
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  let statusCode = 500;
  let message = 'Internal server error';

  if ((err as any).status) {
    statusCode = (err as any).status;
    message = err.message;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation error';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid data format';
  }

  res.status(statusCode).json({
    success: false,
    message,
    code: statusCode,
    error: isDevelopment ? err.stack : undefined,
    requestId: (req as any).id
  });
};
