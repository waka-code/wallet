import { useCallback, useEffect, useState } from 'react'
import type { ApiResponse, ConfirmPaymentResponse } from '../../types/api';
import { confirmPaymentSchema, type ConfirmPaymentFormData } from '../../schemas/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { walletApi } from '../../services/walletApi';
import type { ConfirmPaymentProps } from '../wallet/ConfirmPayment';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { useApiState } from '../../utils/ucApiState';

export function ucConfirmPayment({ initialSessionId, onPaymentConfirmed }: ConfirmPaymentProps) {
 const [paymentResult, setPaymentResult] = useState<ConfirmPaymentResponse | undefined>(undefined);

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

 const onSubmit = useCallback(async (data: ConfirmPaymentFormData) => {
  resetState(true);
  setPaymentResult(undefined);

  try {
   const response: ApiResponse<ConfirmPaymentResponse> = await walletApi.confirmPayment(data);

   if (response.success && response.data) {
    setPaymentResult(response.data);
    setAlert({
     type: 'success',
     message: response.message
    });
    reset();
    if (onPaymentConfirmed) {
     onPaymentConfirmed(response.data.newBalance);
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
    message: getErrorMessage(error, 'Failed to confirm payment')});
  } finally {
   setIsLoading(false);
  }
 }, [onPaymentConfirmed, reset]);

 return {
  isLoading,
  alert,
  paymentResult,
  handleSubmit,
  register,
  errors,
  onSubmit,
  setAlert
 }
}
