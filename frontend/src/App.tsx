import React, { useState } from 'react';
import { Wallet, Users, Plus, Search, CreditCard, CheckCircle2 } from 'lucide-react';

import { RegisterClient } from './components/wallet/RegisterClient';
import { RechargeWallet } from './components/wallet/RechargeWallet';
import { GetBalance } from './components/wallet/GetBalance';
import { CreatePayment } from './components/wallet/CreatePayment';
import { ConfirmPayment } from './components/wallet/ConfirmPayment';

type TabType = 'register' | 'recharge' | 'balance' | 'payment' | 'confirm';

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const tabs: TabConfig[] = [
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

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('register');
  const [sessionId, setSessionId] = useState<string>('');

  const handlePaymentCreated = (newSessionId: string) => {
    setSessionId(newSessionId);
    setActiveTab('confirm');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'register':
        return <RegisterClient onSuccess={() => console.log('Client registered successfully')} />;
      case 'recharge':
        return <RechargeWallet onSuccess={() => console.log('Wallet recharged successfully')} />;
      case 'balance':
        return <GetBalance onBalanceRetrieved={(balance) => console.log('Balance:', balance)} />;
      case 'payment':
        return <CreatePayment onPaymentCreated={handlePaymentCreated} />;
      case 'confirm':
        return (
          <ConfirmPayment
            initialSessionId={sessionId}
            onPaymentConfirmed={(newBalance) => {
              console.log('Payment confirmed, new balance:', newBalance);
              setSessionId('');
              setActiveTab('balance');
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Wallet className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Virtual Wallet</h1>
                <p className="text-sm text-gray-500">Secure digital payments platform</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Powered by React + Vite</p>
              <p className="text-xs text-gray-400">Backend: Express + MongoDB</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tab Description */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              <p className="text-gray-600 mb-4">
                {tabs.find(tab => tab.id === activeTab)?.description}
              </p>
              
              {/* Instructions based on active tab */}
              <div className="text-sm text-gray-500">
                {activeTab === 'register' && (
                  <ul className="space-y-1">
                    <li>• Enter your personal information</li>
                    <li>• All fields are required</li>
                    <li>• A wallet will be created automatically</li>
                  </ul>
                )}
                {activeTab === 'recharge' && (
                  <ul className="space-y-1">
                    <li>• Enter your document and cellphone</li>
                    <li>• Specify the amount to add</li>
                    <li>• Funds will be added immediately</li>
                  </ul>
                )}
                {activeTab === 'balance' && (
                  <ul className="space-y-1">
                    <li>• Enter your document and cellphone</li>
                    <li>• Both must match your registration</li>
                    <li>• Current balance will be displayed</li>
                  </ul>
                )}
                {activeTab === 'payment' && (
                  <ul className="space-y-1">
                    <li>• Enter payment details</li>
                    <li>• Check your email for the token</li>
                    <li>• Token expires in 15 minutes</li>
                  </ul>
                )}
                {activeTab === 'confirm' && (
                  <ul className="space-y-1">
                    <li>• Enter the session ID from payment</li>
                    <li>• Input the 6-digit token from email</li>
                    <li>• Payment will be processed immediately</li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="lg:w-2/3 flex justify-center">
            {renderTabContent()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Virtual Wallet System - Built with Hexagonal Architecture</p>
            <p className="mt-1">React + TypeScript + Tailwind CSS + Express + MongoDB</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
