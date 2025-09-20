import { useCallback } from 'react';
import type { ApiResponse } from '../types/api';
import { useApiState } from './ucApiState';
import { getErrorMessage } from './getErrorMessage';

interface ApiOperationOptions<TData, TResponse> {
  apiCall: (data: TData) => Promise<ApiResponse<TResponse>>;
  onSuccess?: (response: TResponse) => void;
  reset?: () => void;
  defaultErrorMessage: string;
}

export function ucApiOperation<TData, TResponse>({
  apiCall,
  onSuccess,
  reset,
  defaultErrorMessage
}: ApiOperationOptions<TData, TResponse>) {
  const {
    isLoading,
    setIsLoading,
    alert,
    setAlert,
    resetState
  } = useApiState();

  const executeOperation = useCallback(async (data: TData) => {
    resetState(true);

    try {
      const response: ApiResponse<TResponse> = await apiCall(data);

      if (response.success) {
        setAlert({
          type: 'success',
          message: response.message
        });
        
        if (reset) {
          reset();
        }
        
        if (onSuccess && response.data) {
          onSuccess(response.data);
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
        message: getErrorMessage(error, defaultErrorMessage)
      });
    } finally {
      setIsLoading(false);
    }
  }, [apiCall, onSuccess, reset, defaultErrorMessage, resetState, setAlert, setIsLoading]);

  return {
    isLoading,
    alert,
    setAlert,
    executeOperation
  };
}