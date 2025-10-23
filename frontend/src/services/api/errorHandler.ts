import { AxiosError } from 'axios';

export interface ApiError {
  status: 'error';
  message: string;
  code: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  retryAfter?: number;
}

export interface ErrorContext {
  operation: string;
  timestamp: number;
  retryCount?: number;
  userAgent?: string;
}

class ErrorHandlerService {
  private errorHistory: Map<string, number> = new Map();
  private readonly maxErrorsPerMinute = 10;

  private getErrorKey(error: AxiosError): string {
    const url = error.config?.url || 'unknown';
    const method = error.config?.method || 'unknown';
    return `${method}:${url}`;
  }

  private isRateLimited(error: AxiosError): boolean {
    const data = error.response?.data as any;
    return error.response?.status === 429 || 
           data?.code === 'CIRCUIT_BREAKER_OPEN';
  }

  private shouldThrottle(error: AxiosError): boolean {
    const key = this.getErrorKey(error);
    const now = Date.now();
    const minuteAgo = now - 60000;

    // Clean old entries
    for (const [errorKey, timestamp] of this.errorHistory.entries()) {
      if (timestamp < minuteAgo) {
        this.errorHistory.delete(errorKey);
      }
    }

    // Check if we've hit the rate limit
    const recentErrors = Array.from(this.errorHistory.values())
      .filter(timestamp => timestamp > minuteAgo).length;

    if (recentErrors >= this.maxErrorsPerMinute) {
      return true;
    }

    // Record this error
    this.errorHistory.set(key, now);
    return false;
  }

  private getErrorMessage(error: AxiosError): string {
    const data = error.response?.data as any;

    if (data?.errors?.length > 0) {
      return data.errors[0].message;
    }

    if (data?.message) {
      return data.message;
    }

    if (error.response?.status) {
      switch (error.response.status) {
        case 400:
          return 'Invalid request. Please check your input.';
        case 401:
          return 'You are not authorized. Please log in again.';
        case 403:
          return 'Access denied. You don\'t have permission for this action.';
        case 404:
          return 'The requested resource was not found.';
        case 429:
          return 'Too many requests. Please wait a moment and try again.';
        case 500:
          return 'Server error. Please try again later.';
        case 503:
          return 'Service temporarily unavailable. Please try again later.';
        default:
          return `Request failed with status ${error.response.status}`;
      }
    }

    if (error.request) {
      return 'Network error. Please check your connection and try again.';
    }

    return 'An unexpected error occurred. Please try again.';
  }

  private getErrorCode(error: AxiosError): string {
    const data = error.response?.data as any;
    
    if (data?.code) {
      return data.code;
    }

    if (error.response?.status) {
      return `HTTP_${error.response.status}`;
    }

    if (error.request) {
      return 'NETWORK_ERROR';
    }

    return 'UNKNOWN_ERROR';
  }

  private getRetryAfter(error: AxiosError): number | undefined {
    const data = error.response?.data as any;
    
    if (data?.retryAfter) {
      return data.retryAfter;
    }

    if (error.response?.headers?.['retry-after']) {
      return parseInt(error.response.headers['retry-after'], 10);
    }

    return undefined;
  }

  handleError(error: AxiosError, _context: ErrorContext): ApiError {
    const isThrottled = this.shouldThrottle(error);
    const isRateLimited = this.isRateLimited(error);

    // If we're being throttled due to too many errors, show a different message
    if (isThrottled && !isRateLimited) {
      return {
        status: 'error',
        message: 'Too many failed requests. Please wait a moment before trying again.',
        code: 'THROTTLED',
        retryAfter: 60 // 1 minute
      };
    }

    return {
      status: 'error',
      message: this.getErrorMessage(error),
      code: this.getErrorCode(error),
      retryAfter: this.getRetryAfter(error)
    };
  }

  shouldRetry(error: AxiosError): boolean {
    const status = error.response?.status;
    
    // Don't retry on client errors (4xx) except 429 (rate limit)
    if (status && status >= 400 && status < 500) {
      return status === 429;
    }
    
    // Retry on server errors (5xx) and network errors
    return (status && status >= 500) || !error.response;
  }

  getRetryDelay(attempt: number, baseDelay: number = 1000): number {
    // Exponential backoff with jitter
    const delay = baseDelay * Math.pow(2, attempt - 1);
    const jitter = Math.random() * 0.1 * delay;
    return Math.min(delay + jitter, 10000); // Max 10 seconds
  }
}

export const errorHandlerService = new ErrorHandlerService();
