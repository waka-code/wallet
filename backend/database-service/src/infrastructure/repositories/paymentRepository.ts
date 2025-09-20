import { PaymentRepository } from '../../domain/ports/paymentRepository';
import { Payment, CreatePaymentData, PaymentStatus } from '../../domain/entities/payment';
import { PaymentModel } from '../adapters/models/paymentModel';
import { getTokenExpiryDate } from '../adapters/services/tokenGenerator';

export const createPaymentRepository = (): PaymentRepository => ({
  async create(paymentData: CreatePaymentData & { token: string; sessionId: string }): Promise<Payment> {
    const tokenExpiresAt = getTokenExpiryDate();

    const paymentDoc = new PaymentModel({
      clientDocument: paymentData.document,
      amount: paymentData.amount,
      token: paymentData.token,
      sessionId: paymentData.sessionId,
      status: PaymentStatus.PENDING,
      tokenExpiresAt
    });

    const savedPayment = await paymentDoc.save();
    
    return {
      id: savedPayment._id.toString(),
      clientDocument: savedPayment.clientDocument,
      amount: savedPayment.amount,
      token: savedPayment.token,
      sessionId: savedPayment.sessionId,
      status: savedPayment.status,
      tokenExpiresAt: savedPayment.tokenExpiresAt,
      createdAt: savedPayment.createdAt,
      updatedAt: savedPayment.updatedAt
    };
  },

  async findBySessionId(sessionId: string): Promise<Payment | null> {
    const paymentDoc = await PaymentModel.findOne({ sessionId });
    if (!paymentDoc) return null;

    return {
      id: paymentDoc._id.toString(),
      clientDocument: paymentDoc.clientDocument,
      amount: paymentDoc.amount,
      token: paymentDoc.token,
      sessionId: paymentDoc.sessionId,
      status: paymentDoc.status,
      tokenExpiresAt: paymentDoc.tokenExpiresAt,
      createdAt: paymentDoc.createdAt,
      updatedAt: paymentDoc.updatedAt
    };
  },

  async updateStatus(sessionId: string, status: PaymentStatus): Promise<Payment> {
    const paymentDoc = await PaymentModel.findOneAndUpdate(
      { sessionId },
      { status },
      { new: true }
    );

    if (!paymentDoc) {
      throw new Error('Payment not found');
    }

    return {
      id: paymentDoc._id.toString(),
      clientDocument: paymentDoc.clientDocument,
      amount: paymentDoc.amount,
      token: paymentDoc.token,
      sessionId: paymentDoc.sessionId,
      status: paymentDoc.status,
      tokenExpiresAt: paymentDoc.tokenExpiresAt,
      createdAt: paymentDoc.createdAt,
      updatedAt: paymentDoc.updatedAt
    };
  },

  async deleteExpiredPayments(): Promise<void> {
    await PaymentModel.deleteMany({
      tokenExpiresAt: { $lt: new Date() },
      status: PaymentStatus.PENDING
    });
  }
});
