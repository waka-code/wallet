import crypto from 'crypto';
import { TokenGenerator } from '../../../domain/ports/tokenGenerator';

export const createTokenGenerator = (): TokenGenerator => ({
  generateSixDigitToken(): string {
    const bytes = crypto.randomBytes(3);
    const token = parseInt(bytes.toString('hex'), 16) % 900000 + 100000;
    return token.toString();
  },

  generateSessionId(): string {
    return crypto.randomUUID();
  }
});

export const getTokenExpiryDate = (): Date => {
  if (!process.env.TOKEN_EXPIRY_MINUTES) {
    throw new Error('TOKEN_EXPIRY_MINUTES is not defined in environment variables');
  }
  return new Date(Date.now() + parseInt(process.env.TOKEN_EXPIRY_MINUTES) * 60 * 1000);
};