import { zodResolver } from '@hookform/resolvers/zod';
import { getBalanceSchema, type GetBalanceFormData } from '../../schemas/validationSchemas';
import { walletApi } from '../../services/walletApi';
import type { ApiResponse, BalanceResponse} from '../../types/api';
import type { GetBalanceProps } from '../wallet/GetBalance'
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { useApiState } from '../../utils/ucApiState';
import { getErrorMessage } from '../../utils/getErrorMessage';

function ucGetBalance({ onBalanceRetrieved }: GetBalanceProps) {
 const [balance, setBalance] = useState<number | undefined>(undefined);

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
  formState: { errors }
 } = useForm<GetBalanceFormData>({
  resolver: zodResolver(getBalanceSchema)
 });

 const onSubmit = useCallback(async (data: GetBalanceFormData) => {
  resetState(true);
  setBalance(undefined);

  try {
   const response: ApiResponse<BalanceResponse> = await walletApi.getBalance(data);

   if (response.success && response.data) {
    setBalance(response.data.balance);
    setAlert({
     type: 'success',
     message: response.message
    });
    if (onBalanceRetrieved) {
     onBalanceRetrieved(response.data.balance);
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
    message: getErrorMessage(error, 'An unexpected error occurred while fetching the balance.')
   });
  } finally {
   setIsLoading(false);
  }
 }, [onBalanceRetrieved, resetState, setAlert, setIsLoading]);

 return {
  isLoading,
  alert,
  balance,
  register,
  handleSubmit,
  errors,
  setAlert,
  onSubmit
 }
}

export default ucGetBalance