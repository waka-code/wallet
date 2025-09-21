import { zodResolver } from '@hookform/resolvers/zod';
import { registerClientSchema, type RegisterClientFormData } from '../../schemas/validationSchemas';
import type { RegisterClientProps } from '../wallet/RegisterClient'
import { useForm } from 'react-hook-form';
import { walletApi } from '../../services/walletApi';
import type { Client } from '../../types/api';
import { useSubmit } from '../../utils/ucSubmit';
import { useCallback } from 'react';

function ucRegisterClient({ onSuccess }: RegisterClientProps) {
  const { alert, onSubmit, isLoading, setAlert } = useSubmit<RegisterClientFormData, Client>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterClientFormData>({
    resolver: zodResolver(registerClientSchema)
  });

  const handleRegisterClient = useCallback((data: RegisterClientFormData) =>
    onSubmit(data, {
      apiCall: walletApi.registerClient,
      onSuccess: (client) => {
        if (onSuccess) onSuccess(client);
      },
      reset,
      defaultErrorMessage: "Failed to register client",
    }), [walletApi.registerClient, onSuccess])

  return {
    isLoading,
    alert,
    register,
    handleSubmit,
    errors,
    onSubmit: handleRegisterClient,
    setAlert
  }
}

export default ucRegisterClient