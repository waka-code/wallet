import { Search, Wallet } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';
import ucGetBalance from '../hooks/ucGetBalance';

export interface GetBalanceProps {
  onBalanceRetrieved?: (balance: number) => void;
}

export const GetBalance: React.FC<GetBalanceProps> = ({ onBalanceRetrieved }) => {
  const {
    isLoading,
    alert,
    balance,
    register,
    handleSubmit,
    errors,
    setAlert,
    onSubmit
  } = ucGetBalance({ onBalanceRetrieved });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Check Balance
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

        {balance !== undefined && (
          <div className="mb-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">Current Balance:</span>
            </div>
            <p className="text-2xl font-bold text-primary-800 mt-1">
              ${balance.toFixed(2)}
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

          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            className="w-full"
          >
            Check Balance
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
