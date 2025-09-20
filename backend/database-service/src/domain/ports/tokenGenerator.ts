export interface TokenGenerator {
  generateSixDigitToken(): string;
  generateSessionId(): string;
}
