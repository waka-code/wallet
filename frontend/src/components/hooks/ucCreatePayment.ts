import { useCallback } from 'react';
import type { CreatePaymentProps } from '../wallet/CreatePayment'
import { createPaymentSchema, type CreatePaymentFormData } from '../../schemas/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { ApiResponse, PaymentSessionResponse } from '../../types/api';
import { walletApi } from '../../services/walletApi';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { useApiState } from '../../utils/ucApiState';

function ucCreatePayment({ onPaymentCreated }: CreatePaymentProps) {
  const {
    isLoading,
    setIsLoading,
    alert,
    setAlert,
    sessionId,
    setSessionId,
    resetState
  } = useApiState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreatePaymentFormData>({
    resolver: zodResolver(createPaymentSchema)
  });

  const onSubmit = useCallback(async (data: CreatePaymentFormData) => {
    resetState(true);

    try {
      const response: ApiResponse<PaymentSessionResponse> = await walletApi.createPayment(data);
      console.log('Create Payment Response:', response);
      if (response.success && response.data) {
        setSessionId(response.data.sessionId);
        setAlert({
          type: 'info',
          message: response.message
        });
        reset();
        if (onPaymentCreated) {
          onPaymentCreated(response.data.sessionId);
        }
      } else {
        setAlert({
          type: 'error',
          message: response.error || response.message
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: getErrorMessage(error, 'Failed to create payment session. Please try again.')
      });
    } finally {
      //  setIsLoading(false);
    }
  }, [onPaymentCreated, reset]);

  return {
    isLoading,
    alert,
    sessionId,
    register,
    handleSubmit,
    errors,
    setAlert,
    onSubmit
  };
}

export default ucCreatePayment