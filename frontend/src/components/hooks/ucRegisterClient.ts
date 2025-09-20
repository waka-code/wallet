import { zodResolver } from '@hookform/resolvers/zod';
import { registerClientSchema, type RegisterClientFormData } from '../../schemas/validationSchemas';
import type { RegisterClientProps } from '../wallet/RegisterClient'
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { walletApi } from '../../services/walletApi';
import type { ApiResponse, Client } from '../../types/api';
import { useApiState } from '../../utils/ucApiState';

function ucRegisterClient({ onSuccess }: RegisterClientProps) {
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
 } = useForm<RegisterClientFormData>({
  resolver: zodResolver(registerClientSchema)
 });

 const onSubmit = useCallback(async (data: RegisterClientFormData) => {
  resetState(true);

  try {
   const response: ApiResponse<Client> = await walletApi.registerClient(data);

   if (response.success) {
    setAlert({
     type: 'success',
     message: response.message
    });
    reset();
    if (onSuccess && response.data) {
     onSuccess(response.data);
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
    message: error.message || 'Failed to register client'
   });
  } finally {
   setIsLoading(false);
  }
 }, [onSuccess, resetState, setAlert, setIsLoading]);

 return {
  isLoading,
  alert,
  register,
  handleSubmit,
  errors,
  onSubmit,
  setAlert
 }
}

export default ucRegisterClient