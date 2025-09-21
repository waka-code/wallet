import { CheckCircle2, CreditCard, Plus, Search, Users } from "lucide-react";
import type { TabConfig, TabType } from "../types/TabType";

export const tabs: TabConfig[] = [
  {
    id: 'register',
    label: 'Register',
    icon: <Users className="h-4 w-4" />,
    description: 'Create new client account'
  },
  {
    id: 'recharge',
    label: 'Recharge',
    icon: <Plus className="h-4 w-4" />,
    description: 'Add money to wallet'
  },
  {
    id: 'balance',
    label: 'Balance',
    icon: <Search className="h-4 w-4" />,
    description: 'Check wallet balance'
  },
  {
    id: 'payment',
    label: 'Payment',
    icon: <CreditCard className="h-4 w-4" />,
    description: 'Create new payment'
  },
  {
    id: 'confirm',
    label: 'Confirm',
    icon: <CheckCircle2 className="h-4 w-4" />,
    description: 'Confirm payment with token'
  }
];

export const instructions: Record<TabType, string[]> = {
  register: [
    '• Enter your personal information',
    '• All fields are required',
    '• A wallet will be created automatically'
  ],
  recharge: [
    '• Enter your document and cellphone',
    '• Specify the amount to add',
    '• Funds will be added immediately'
  ],
  balance: [
    '• Enter your document and cellphone',
    '• Both must match your registration',
    '• Current balance will be displayed'
  ],
  payment: [
    '• Enter payment details',
    '• Check your email for the token',
    '• Token expires in 15 minutes'
  ],
  confirm: [
    '• Enter the session ID from payment',
    '• Input the 6-digit token from email',
    '• Payment will be processed immediately'
  ]
};