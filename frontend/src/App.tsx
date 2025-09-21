import React, { useCallback, useState } from 'react';
import { Wallet } from 'lucide-react';

import type {  TabType } from './types/TabType';
import { TabContent } from './components/ui/TabContent';
import { instructions, tabs } from './utils/tabConfig';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('register');
  const [sessionId, setSessionId] = useState<string>('');

  const handlePaymentCreated = useCallback((newSessionId: string) => {
    setSessionId(newSessionId);
    setActiveTab('confirm');
  }, []);


  return (
    <div className="min-h-screen h-full bg-gray-50">
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
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex cursor-pointer items-center gap-2 py-4 px-1 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
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
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              <p className="text-gray-600 mb-4">
                {tabs.find(tab => tab.id === activeTab)?.description}
              </p>

              <div className="text-sm text-gray-500">
                <ul className="space-y-1">
                  {instructions[activeTab].map((text, idx) => (
                    <li key={idx}>{text}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3  border rounded-lg bg-white shadow-sm border-gray-200 p-6">
            <TabContent
              activeTab={activeTab}
              handlePaymentCreated={handlePaymentCreated}
              sessionId={sessionId}
              setSessionId={setSessionId}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
      </main>

    </div>
  );
};

export default App;
