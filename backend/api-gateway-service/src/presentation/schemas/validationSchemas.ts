import { z } from 'zod';

export const registerClientSchema = z.object({
  document: z.string().min(1, 'Document is required').trim(),
  names: z.string().min(1, 'Names are required').trim(),
  email: z.string().email('Invalid email format').trim().toLowerCase(),
  cellphone: z.string().min(1, 'Cellphone is required').trim()
});

export const rechargeWalletSchema = z.object({
  document: z.string().min(1, 'Document is required').trim(),
  cellphone: z.string().min(1, 'Cellphone is required').trim(),
  amount: z.number().positive('Amount must be greater than zero')
});

export const getBalanceSchema = z.object({
  document: z.string().min(1, 'Document is required').trim(),
  cellphone: z.string().min(1, 'Cellphone is required').trim()
});

export const createPaymentSchema = z.object({
  document: z.string().min(1, 'Document is required').trim(),
  cellphone: z.string().min(1, 'Cellphone is required').trim(),
  amount: z.number().positive('Amount must be greater than zero')
});

export const confirmPaymentSchema = z.object({
  sessionId: z.string().uuid('Invalid session ID format'),
  token: z.string().length(6, 'Token must be 6 digits').regex(/^\d{6}$/, 'Token must contain only digits')
});

export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
  error: z.string().optional(),
  code: z.number()
});

export type RegisterClientRequest = z.infer<typeof registerClientSchema>;
export type RechargeWalletRequest = z.infer<typeof rechargeWalletSchema>;
export type GetBalanceRequest = z.infer<typeof getBalanceSchema>;
export type CreatePaymentRequest = z.infer<typeof createPaymentSchema>;
export type ConfirmPaymentRequest = z.infer<typeof confirmPaymentSchema>;

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  code: number;
}