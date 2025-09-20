import type { RechargeWalletProps } from '../wallet/RechargeWallet'
import { rechargeWalletSchema, type RechargeWalletFormData } from '../../schemas/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { ApiResponse } from '../../types/api';
import { walletApi } from '../../services/walletApi';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { useApiState } from '../../utils/ucApiState';

export function ucRechargeWallet({ onSuccess }: RechargeWalletProps) {
  const {
    isLoading,
    setIsLoading,
    alert,
    setAlert,
    resetState
  } = useApiState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RechargeWalletFormData>({
    resolver: zodResolver(rechargeWalletSchema)
  });

  const onSubmit = async (data: RechargeWalletFormData) => {
    resetState(true);
    try {
      const response: ApiResponse = await walletApi.rechargeWallet(data);

      if (response.success) {
        setAlert({
          type: 'success',
          message: response.message
        });
        reset();
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setAlert({
          type: 'error',
          message: response.error || response.message
        });
      }
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: getErrorMessage(error, 'An unexpected error occurred while recharging the wallet.')
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    alert,
    register,
    errors,
    handleSubmit,
    onSubmit,
    setAlert
  }
}
