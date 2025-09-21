import type { CreatePaymentProps } from '../wallet/CreatePayment'
import { createPaymentSchema, type CreatePaymentFormData } from '../../schemas/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { PaymentSessionResponse } from '../../types/api';
import { walletApi } from '../../services/walletApi';
import { useSubmit } from '../../utils/ucSubmit';
import { useCallback } from 'react';

function ucCreatePayment({ onPaymentCreated }: CreatePaymentProps) {
  const { alert, onSubmit, isLoading, setAlert, sessionId, setSessionId } = useSubmit<CreatePaymentFormData, PaymentSessionResponse>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreatePaymentFormData>({
    resolver: zodResolver(createPaymentSchema)
  });

  const handleCreatePayment = useCallback((data: CreatePaymentFormData) =>
    onSubmit(data, {
      apiCall: walletApi.createPayment,
      onSuccess: (res) => {
        setSessionId(res.sessionId);
        if (onPaymentCreated) onPaymentCreated(res.sessionId);
      },
      reset,
      defaultErrorMessage: "An unexpected error occurred while creating the payment.",
    }),[walletApi.createPayment, onPaymentCreated]);

  return {
    isLoading,
    alert,
    sessionId,
    register,
    handleSubmit,
    errors,
    setAlert,
    onSubmit: handleCreatePayment
  };
}

export default ucCreatePayment