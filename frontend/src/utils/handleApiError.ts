import { AxiosError } from "axios";

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError && error.response) {
    return error.response.data;
  }
  throw new Error('Network error: Unable to connect to server');
};
