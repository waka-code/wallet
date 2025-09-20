import mongoose from 'mongoose';
import { PaymentStatus } from '../../../domain/entities/payment';

const paymentSchema = new mongoose.Schema({
  clientDocument: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01
  },
  token: {
    type: String,
    required: true,
    length: 6
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.PENDING
  },
  tokenExpiresAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

export const PaymentModel = mongoose.model('Payment', paymentSchema);
