export interface Payment {
  id: string;
  clientDocument: string;
  amount: number;
  token: string;
  sessionId: string;
  status: PaymentStatus;
  tokenExpiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  EXPIRED = 'expired',
  FAILED = 'failed'
}

export interface CreatePaymentData {
  document: string;
  cellphone: string;
  amount: number;
}

export interface ConfirmPaymentData {
  sessionId: string;
  token: string;
}
