import rateLimit from 'express-rate-limit';
import type { Application } from 'express';

export const configureRateLimit = (app: Application) => {
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again later.',
      code: 429
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
      return req.path === '/health';
    }
  });

  app.use(generalLimiter as any);
};

export const createPaymentLimiter = () => rateLimit({
  windowMs: 60 * 1000, 
  max: 5, 
  message: {
    success: false,
    message: 'Too many payment attempts, please wait.',
    code: 429
  },
  keyGenerator: (req) => {
    const document = req.body?.document;
    
    const getClientIp = (req: any) => {
      return req.headers['x-forwarded-for']?.split(',')[0] ||
             req.headers['x-real-ip'] ||
             req.connection?.remoteAddress ||
             req.socket?.remoteAddress ||
             'unknown';
    };
    
    const clientIp = getClientIp(req);
    return `payment-${clientIp}-${document || 'no-doc'}`;
  }
});

export const createAuthLimiter = () => rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.',
    code: 429
  }
});
