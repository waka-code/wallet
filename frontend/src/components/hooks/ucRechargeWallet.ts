import type { RechargeWalletProps } from '../wallet/RechargeWallet'
import { rechargeWalletSchema, type RechargeWalletFormData } from '../../schemas/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { walletApi } from '../../services/walletApi';
import { useSubmit } from '../../utils/ucSubmit';
import { useCallback } from 'react';

export function ucRechargeWallet({ onSuccess }: RechargeWalletProps) {
  const { alert, onSubmit, isLoading, setAlert } = useSubmit<RechargeWalletFormData, void>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RechargeWalletFormData>({
    resolver: zodResolver(rechargeWalletSchema)
  });

  const handleRecharge = useCallback((data: RechargeWalletFormData) =>
    onSubmit(data, {
      apiCall: walletApi.rechargeWallet,
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
      reset,
      defaultErrorMessage: "An unexpected error occurred while recharging the wallet.",
    }),[walletApi.rechargeWallet, onSuccess])

  return {
    isLoading,
    alert,
    register,
    errors,
    handleSubmit,
    onSubmit: handleRecharge,
    setAlert
  }
}
