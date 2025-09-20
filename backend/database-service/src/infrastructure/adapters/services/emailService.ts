import axios from 'axios';
import { EmailService } from '../../../domain/ports/emailService';

export const createEmailService = (): EmailService => {
  return {
    async sendPaymentToken(to: string, token: string, amount: number): Promise<void> {
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error('Resend API Key not configured');
      await axios.post('https://api.resend.com/emails', {
        from: 'onboarding@resend.dev',
        to,
        subject: 'Payment Confirmation Token',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Payment Confirmation Required</h2>
            <p>You have requested a payment of <strong>$${amount.toFixed(2)}</strong>.</p>
            <p>To confirm this payment, please use the following 6-digit token:</p>
            <div style="background-color: #f0f0f0; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="color: #007bff; letter-spacing: 5px; margin: 0;">${token}</h1>
            </div>
            <p style="color: #666;">This token will expire in 15 minutes.</p>
            <p style="color: #666;">If you did not request this payment, please ignore this email.</p>
          </div>
        `
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
    }
  };
};
