interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

interface RetryableRequest {
  request: () => Promise<any>;
  config?: Partial<RetryConfig>;
}

class RetryService {
  private defaultConfig: RetryConfig = {
    maxRetries: 1, 
    baseDelay: 2000, 
    maxDelay: 5000, 
    backoffMultiplier: 2
  };

  private isRetryableError(error: any): boolean {
    // Don't retry on client errors (4xx) except 429 (rate limit)
    if (error.response?.status >= 400 && error.response?.status < 500) {
      return error.response?.status === 429; // Rate limit
    }
    
    // Retry on server errors (5xx) and network errors
    return error.response?.status >= 500 || !error.response;
  }

  private calculateDelay(attempt: number, config: RetryConfig): number {
    const delay = config.baseDelay * Math.pow(config.backoffMultiplier, attempt - 1);
    return Math.min(delay, config.maxDelay);
  }

  async execute<T>({ request, config = {} }: RetryableRequest): Promise<T> {
    const finalConfig = { ...this.defaultConfig, ...config };
    let lastError: any;

    for (let attempt = 1; attempt <= finalConfig.maxRetries + 1; attempt++) {
      try {
        const result = await request();
        return result;
      } catch (error) {
        lastError = error;

        // Don't retry if it's the last attempt or error is not retryable
        if (attempt === finalConfig.maxRetries + 1 || !this.isRetryableError(error)) {
          throw error;
        }

        // Calculate delay with jitter to avoid thundering herd
        const baseDelay = this.calculateDelay(attempt, finalConfig);
        const jitter = Math.random() * 0.1 * baseDelay; 
        const delay = baseDelay + jitter;

        console.warn(`Request failed (attempt ${attempt}/${finalConfig.maxRetries + 1}), retrying in ${Math.round(delay)}ms:`, (error as Error).message);
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }
}

export const retryService = new RetryService();
