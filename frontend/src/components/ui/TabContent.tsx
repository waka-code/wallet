import type { TabType } from "../../types/TabType";
import { ConfirmPayment } from "../wallet/ConfirmPayment";
import { CreatePayment } from "../wallet/CreatePayment";
import { GetBalance } from "../wallet/GetBalance";
import { RechargeWallet } from "../wallet/RechargeWallet";
import { RegisterClient } from "../wallet/RegisterClient";

interface TabContentProps {
  activeTab: TabType;
  handlePaymentCreated: (newSessionId: string) => void;
  sessionId: string;
  setSessionId: (id: string) => void;
  setActiveTab: (tab: TabType) => void;
}

export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  handlePaymentCreated,
  sessionId,
  setSessionId,
  setActiveTab
}) => {
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
          onPaymentConfirmed={() => {
            setSessionId('');
            setActiveTab('balance');
          }}
        />
      );
    default:
      return null;
  }
};