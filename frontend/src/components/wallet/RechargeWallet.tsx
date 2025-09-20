import { Plus } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';

import { ucRechargeWallet } from '../hooks/ucRechargeWallet';

export interface RechargeWalletProps {
  onSuccess?: () => void;
}

export const RechargeWallet: React.FC<RechargeWalletProps> = ({ onSuccess }) => {
  const { isLoading, alert, register, errors, handleSubmit, onSubmit, setAlert } = ucRechargeWallet({ onSuccess });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Recharge Wallet
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
            placeholder="Enter amount to recharge"
            required
            error={errors.amount?.message}
            {...register('amount', { valueAsNumber: true })}
          />
          <Button
            type="submit"
            variant="success"
            loading={isLoading}
            className="w-full"
          >
            Recharge Wallet
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
