import { UserPlus } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';
import ucRegisterClient from '../hooks/ucRegisterClient';
import type { Client } from '../../types/api';

export interface RegisterClientProps {
  onSuccess?: (client: Client) => void;
}

export const RegisterClient: React.FC<RegisterClientProps> = ({ onSuccess }) => {
  const {
    isLoading,
    alert,
    register,
    handleSubmit,
    onSubmit,
    setAlert,
    errors
  } = ucRegisterClient({ onSuccess });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Register Client
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
            label="Full Names"
            type="text"
            placeholder="Enter your full names"
            required
            error={errors.names?.message}
            {...register('names')}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
            error={errors.email?.message}
            {...register('email')}
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
            variant="secondary"
            loading={isLoading}
            className="bg-primary-600 hover:bg-primary-700 w-full mt-2 cursor-pointer"
          >
            Register Client
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
