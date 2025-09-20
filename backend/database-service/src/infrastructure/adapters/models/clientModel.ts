import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  document: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  names: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  cellphone: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

export const ClientModel = mongoose.model('Client', clientSchema);
