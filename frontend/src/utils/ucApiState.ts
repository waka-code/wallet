import { useState, useCallback } from 'react';

export type AlertType = 'success' | 'error' | 'info';
export type Alert = { type: AlertType; message: string };

export function useApiState() {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<Alert | undefined>(undefined);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);

  const clearSessionId = useCallback(() => setSessionId(undefined), []);
  const resetState = useCallback((loading: boolean) => {
    setIsLoading(loading);
    setAlert(undefined);
    setSessionId(undefined);
  }, []);

  return {
    isLoading,
    setIsLoading,
    alert,
    setAlert,
    sessionId,
    setSessionId,
    clearSessionId,
    resetState
  };
}