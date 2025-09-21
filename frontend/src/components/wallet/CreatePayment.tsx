import { CreditCard, Mail } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';
import ucCreatePayment from '../hooks/ucCreatePayment';

export interface CreatePaymentProps {
  onPaymentCreated?: (sessionId: string) => void;
}

export const CreatePayment: React.FC<CreatePaymentProps> = ({ onPaymentCreated }) => {
  const {
    isLoading,
    alert,
    sessionId,
    register,
    handleSubmit,
    errors,
    setAlert,
    onSubmit
  } = ucCreatePayment({ onPaymentCreated });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Create Payment
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

        {sessionId && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Payment Session Created</span>
            </div>
            <p className="text-sm text-blue-600 mb-2">
              A 6-digit confirmation token has been sent to your email.
            </p>
            <p className="text-xs text-blue-500 font-mono bg-blue-100 p-2 rounded">
              Session ID: {sessionId}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Document"
            type="text"
            placeholder="Enter your document number"
            required
            error={errors.document?.message}
            {...register('document')}
          />

          <Input
            label="Cellphone"
            type="text"
            placeholder="Enter your cellphone number"
            required
            error={errors.cellphone?.message}
            {...register('cellphone')}
          />

          <Input
            label="Amount"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="Enter payment amount"
            required
            error={errors.amount?.message}
            {...register('amount', { valueAsNumber: true })}
          />

          <Button
            type="submit"
            variant="secondary"
            loading={isLoading}
            className="w-full"
          >
            Create Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
