import { useCallback } from "react";
import type { ApiResponse } from "../types/api";
import { getErrorMessage } from "./getErrorMessage";
import { useApiState } from "./ucApiState";

type SubmitOptions<TData, TResponse> = {
  apiCall: (data: TData) => Promise<ApiResponse<TResponse>>;
  onSuccess?: (response: TResponse) => void;
  defaultErrorMessage?: string;
  reset?: () => void;
};

export function useSubmit<TData, TResponse>() {
  const { isLoading, setIsLoading, alert, setAlert, resetState, sessionId, setSessionId } = useApiState();

  const onSubmit = useCallback(
    async (data: TData, options: SubmitOptions<TData, TResponse>) => {
      const { apiCall, onSuccess, defaultErrorMessage, reset } = options;

      resetState(true);
      try {
        const response = await apiCall(data);

        if (response.success && response.data) {
          setAlert({ type: "success", message: response.message });

          if (reset) reset();
          if (onSuccess) onSuccess(response.data);
        } else {
          setAlert({
            type: "error",
            message: response.error || response.message,
          });
        }
      } catch (error) {
        setAlert({
          type: "error",
          message: getErrorMessage(error, defaultErrorMessage ?? "Unexpected error"),
        });
      } finally {
        setIsLoading(false);
      }
    },
    [resetState, setAlert, setIsLoading]
  );

  return { onSubmit, isLoading, alert, setAlert, sessionId, setSessionId };
}
