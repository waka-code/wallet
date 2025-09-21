import { CheckCircle2, Key } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';
import { ucConfirmPayment } from '../hooks/ucConfirmPayment';
import type { TabType } from '../../types/TabType';

export interface ConfirmPaymentProps {
  initialSessionId?: string;
  onPaymentConfirmed?: (newBalance: number) => void;
  tab?: (tab: TabType) => void;
}
const ConfirmPayment: React.FC<ConfirmPaymentProps> = ({
  initialSessionId,
  onPaymentConfirmed,
  tab
}) => {

  const {
    isLoading,
    alert,
    paymentResult,
    handleSubmit,
    register,
    errors,
    onSubmit,
    setAlert
  } = ucConfirmPayment({ initialSessionId, onPaymentConfirmed });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          Confirm Payment
        </CardTitle>
      </CardHeader>

      <CardContent>
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(undefined)}
            className="mb-4"
          />
        )}

        {paymentResult && (
          <div className="mb-4 p-4 bg-success-50 rounded-lg border border-success-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-success-600" />
              <span className="text-sm font-medium text-success-700">Payment Confirmed!</span>
            </div>
            <p className="text-sm text-success-600 mb-2">
              {paymentResult.message}
            </p>
            <p className="text-sm text-success-700">
              <span className="font-medium">New Balance:</span> ${paymentResult.newBalance.toFixed(2)}
            </p>
            {tab && (
              <span
                onClick={() => tab("balance")}
                className="mt-2 text-sm text-green-600 cursor-pointer hover:text-green-800"
              >
                go to balance
              </span>
            )}
          </div>
        )}

        <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-1">
            <Key className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-700">Token Required</span>
          </div>
          <p className="text-xs text-yellow-600">
            Check your email for the 6-digit confirmation token sent when you created the payment.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Session ID"
            type="text"
            placeholder="Enter the session ID from payment creation"
            required
            disabled={true}
            error={errors.sessionId?.message}
            {...register('sessionId')}
          />

          <Input
            label="6-Digit Token"
            type="text"
            placeholder="Enter the token from your email"
            maxLength={6}
            required
            error={errors.token?.message}
            {...register('token')}
          />

          <Button
            type="submit"
            variant="secondary"
            loading={isLoading}
            className="w-full"
          >
            Confirm Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};


export default ConfirmPayment;