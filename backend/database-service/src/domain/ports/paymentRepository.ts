import { Payment, CreatePaymentData, PaymentStatus } from '../entities/payment';

export interface PaymentRepository {
  create(paymentData: CreatePaymentData & { token: string; sessionId: string }): Promise<Payment>;
  findBySessionId(sessionId: string): Promise<Payment | null>;
  updateStatus(sessionId: string, status: PaymentStatus): Promise<Payment>;
  deleteExpiredPayments(): Promise<void>;
}
