import { Request, Response, NextFunction } from 'express';

interface CircuitBreakerState {
  failures: number;
  lastFailureTime: number;
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
}

class CircuitBreaker {
  private failures: Map<string, CircuitBreakerState> = new Map();
  private readonly failureThreshold: number;
  private readonly timeout: number;
  private readonly retryTimeout: number;

  constructor(
    failureThreshold: number = 10, 
    timeout: number = 60000, 
    retryTimeout: number = 10000 
  ) {
    this.failureThreshold = failureThreshold;
    this.timeout = timeout;
    this.retryTimeout = retryTimeout;
  }

  private getKey(req: Request): string {
    return `${req.method}:${req.path}`;
  }

  private getState(key: string): CircuitBreakerState {
    if (!this.failures.has(key)) {
      this.failures.set(key, {
        failures: 0,
        lastFailureTime: 0,
        state: 'CLOSED'
      });
    }
    return this.failures.get(key)!;
  }

  private updateState(key: string, success: boolean): void {
    const state = this.getState(key);
    const now = Date.now();

    if (success) {
      state.failures = 0;
      state.state = 'CLOSED';
    } else {
      state.failures++;
      state.lastFailureTime = now;

      if (state.failures >= this.failureThreshold) {
        state.state = 'OPEN';
      }
    }

    this.failures.set(key, state);
  }

  private shouldAllowRequest(key: string): boolean {
    const state = this.getState(key);
    const now = Date.now();

    switch (state.state) {
      case 'CLOSED':
        return true;
      
      case 'OPEN':
        if (now - state.lastFailureTime > this.retryTimeout) {
          state.state = 'HALF_OPEN';
          this.failures.set(key, state);
          return true;
        }
        return false;
      
      case 'HALF_OPEN':
        return true;
      
      default:
        return true;
    }
  }

  middleware = () => {
    return (req: Request, res: Response, next: NextFunction) => {
      const key = this.getKey(req);
      
      if (!this.shouldAllowRequest(key)) {
        return res.status(503).json({
          status: 'error',
          message: 'Service temporarily unavailable. Please try again later.',
          code: 'CIRCUIT_BREAKER_OPEN',
          retryAfter: Math.ceil(this.retryTimeout / 1000)
        });
      }

      const originalSend = res.send;
      res.send = function(data) {
        const success = res.statusCode < 400;
        circuitBreaker.updateState(key, success);
        return originalSend.call(this, data);
      };

      next();
    };
  };
}

const circuitBreaker = new CircuitBreaker();

export { circuitBreaker };
