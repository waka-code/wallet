export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  code: number;
  requestId?: string;
  timestamp?: string;
}

export const createSuccessResponse = <T>(
  data: T,
  message: string = 'Operation completed successfully',
  code: number = 200,
  requestId?: string
): ApiResponse<T> => ({
  success: true,
  message,
  data,
  code,
  requestId,
  timestamp: new Date().toISOString()
});

export const createErrorResponse = (
  message: string,
  error?: string,
  code: number = 400,
  requestId?: string
): ApiResponse => ({
  success: false,
  message,
  error,
  code,
  requestId,
  timestamp: new Date().toISOString()
});
