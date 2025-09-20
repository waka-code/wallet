import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  clientDocument: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

export const WalletModel = mongoose.model('Wallet', walletSchema);
