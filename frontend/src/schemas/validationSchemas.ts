import { z } from 'zod';

export const registerClientSchema = z.object({
  document: z.string()
    .min(1, 'Document is required')
    .trim()
    .regex(/^\d+$/, 'Document must contain only numbers'),
  names: z.string()
    .min(1, 'Names are required')
    .min(2, 'Names must be at least 2 characters')
    .trim(),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .trim()
    .toLowerCase(),
  cellphone: z.string()
    .min(1, 'Cellphone is required')
    .trim()
    .regex(/^\d+$/, 'Cellphone must contain only numbers')
    .min(10, 'Cellphone must be at least 10 digits')
});

export const rechargeWalletSchema = z.object({
  document: z.string()
    .min(1, 'Document is required')
    .trim()
    .regex(/^\d+$/, 'Document must contain only numbers'),
  cellphone: z.string()
    .min(1, 'Cellphone is required')
    .trim()
    .regex(/^\d+$/, 'Cellphone must contain only numbers'),
  amount: z.number()
    .min(0.01, 'Amount must be at least 0.01')
    .max(999999, 'Amount cannot exceed 999,999')
});

export const getBalanceSchema = z.object({
  document: z.string()
    .min(1, 'Document is required')
    .trim()
    .regex(/^\d+$/, 'Document must contain only numbers'),
  cellphone: z.string()
    .min(1, 'Cellphone is required')
    .trim()
    .regex(/^\d+$/, 'Cellphone must contain only numbers')
});

export const createPaymentSchema = z.object({
  document: z.string()
    .min(1, 'Document is required')
    .trim()
    .regex(/^\d+$/, 'Document must contain only numbers'),
  cellphone: z.string()
    .min(1, 'Cellphone is required')
    .trim()
    .regex(/^\d+$/, 'Cellphone must contain only numbers'),
  amount: z.number()
    .min(0.01, 'Amount must be at least 0.01')
    .max(999999, 'Amount cannot exceed 999,999'),
  emailUser: z.string().email('Invalid email format').optional(),
  emailPass: z.string().min(6, 'Password must be at least 6 characters').optional()
});

export const confirmPaymentSchema = z.object({
  sessionId: z.string()
    .min(1, 'Session ID is required')
    .uuid('Invalid session ID format'),
  token: z.string()
    .min(1, 'Token is required')
    .length(6, 'Token must be 6 digits')
    .regex(/^\d{6}$/, 'Token must contain only digits')
});

// Type exports
export type RegisterClientFormData = z.infer<typeof registerClientSchema>;
export type RechargeWalletFormData = z.infer<typeof rechargeWalletSchema>;
export type GetBalanceFormData = z.infer<typeof getBalanceSchema>;
export type CreatePaymentFormData = z.infer<typeof createPaymentSchema>;
export type ConfirmPaymentFormData = z.infer<typeof confirmPaymentSchema>;
