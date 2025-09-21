import { useCallback, useEffect, useState } from 'react'
import type { ConfirmPaymentResponse } from '../../types/api';
import { confirmPaymentSchema, type ConfirmPaymentFormData } from '../../schemas/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { walletApi } from '../../services/walletApi';
import type { ConfirmPaymentProps } from '../wallet/ConfirmPayment';
import { useSubmit } from '../../utils/ucSubmit';

export function ucConfirmPayment({ initialSessionId, onPaymentConfirmed }: ConfirmPaymentProps) {
  const [paymentResult, setPaymentResult] = useState<ConfirmPaymentResponse | undefined>(undefined);
  const { alert, onSubmit, isLoading, setAlert } = useSubmit<ConfirmPaymentFormData, ConfirmPaymentResponse>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ConfirmPaymentFormData>({
    resolver: zodResolver(confirmPaymentSchema),
    defaultValues: {
      sessionId: initialSessionId
    }
  });

  useEffect(() => {
    if (initialSessionId) {
      setValue('sessionId', initialSessionId);
    }
  }, [initialSessionId, setValue]);

  const handleConfirmPayment = useCallback((data: ConfirmPaymentFormData) =>
    onSubmit(data, {
      apiCall: walletApi.confirmPayment,
      onSuccess: (client) => {
        setPaymentResult(client);
        if (onPaymentConfirmed) onPaymentConfirmed(client.newBalance);
      },
      reset,
      defaultErrorMessage: "Failed to confirm payment",
    }), [onPaymentConfirmed, walletApi.confirmPayment])

  return {
    isLoading,
    alert,
    paymentResult,
    handleSubmit,
    register,
    errors,
    onSubmit: handleConfirmPayment,
    setAlert
  }
}
