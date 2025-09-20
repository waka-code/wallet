export function getErrorMessage(error: unknown, fallbackMessage: string = 'An error occurred'): string {
  return typeof error === 'object' && error !== null && 'message' in error
    ? String((error as { message?: unknown }).message)
    : fallbackMessage;
}