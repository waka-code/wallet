import React, { Suspense } from "react";
import type { TabType } from "../../types/TabType";

const LazyRegisterClient = React.lazy(() => import("../wallet/RegisterClient"));
const LazyRechargeWallet = React.lazy(() => import("../wallet/RechargeWallet"));
const LazyGetBalance = React.lazy(() => import("../wallet/GetBalance"));
const LazyCreatePayment = React.lazy(() => import("../wallet/CreatePayment"));
const LazyConfirmPayment = React.lazy(() => import("../wallet/ConfirmPayment"));
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
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-full">Loading...</div>}>
      {(() => {
        switch (activeTab) {
          case "register":
            return <LazyRegisterClient onSuccess={() => console.log("Client registered successfully")} />;
          case "recharge":
            return <LazyRechargeWallet onSuccess={() => console.log("Wallet recharged successfully")} />;
          case "balance":
            return <LazyGetBalance onBalanceRetrieved={(balance) => console.log("Balance:", balance)} />;
          case "payment":
            return <LazyCreatePayment onPaymentCreated={handlePaymentCreated} />;
          case "confirm":
            return (
              <LazyConfirmPayment
                initialSessionId={sessionId}
                tab={setActiveTab}
                onPaymentConfirmed={() => {
                  setSessionId("");
                }}
              />
            );
          default:
            return null;
        }
      })()}
    </Suspense>
  );
};