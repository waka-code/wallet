export interface EmailService {
  sendPaymentToken(to: string, token: string, amount: number): Promise<void>;
}
