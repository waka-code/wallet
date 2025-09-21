import { zodResolver } from '@hookform/resolvers/zod';
import { getBalanceSchema, type GetBalanceFormData } from '../../schemas/validationSchemas';
import { walletApi } from '../../services/walletApi';
import type { BalanceResponse } from '../../types/api';
import type { GetBalanceProps } from '../wallet/GetBalance'
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { useSubmit } from '../../utils/ucSubmit';

function ucGetBalance({ onBalanceRetrieved }: GetBalanceProps) {
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const { alert, onSubmit, isLoading, setAlert } = useSubmit<GetBalanceFormData, BalanceResponse>();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<GetBalanceFormData>({
    resolver: zodResolver(getBalanceSchema)
  });

  const handleGetBalance = useCallback((data: GetBalanceFormData) =>
    onSubmit(data, {
      apiCall: walletApi.getBalance,
      onSuccess: (res) => {
        setBalance(res.balance);
        if (onBalanceRetrieved) onBalanceRetrieved(res.balance);
      },
      defaultErrorMessage: "An unexpected error occurred while fetching the balance.",
    }), [walletApi.getBalance, onBalanceRetrieved])

  return {
    isLoading,
    alert,
    balance,
    register,
    handleSubmit,
    errors,
    setAlert,
    onSubmit: handleGetBalance
  }
}

export default ucGetBalance