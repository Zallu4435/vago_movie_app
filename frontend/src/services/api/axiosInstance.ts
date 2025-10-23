import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '@utils/constants';
import { errorHandlerService } from './errorHandler';
import { retryService } from './retryService';

// Extend AxiosRequestConfig to include metadata
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: { startTime: number };
  }
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: Date.now() };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with enhanced error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const context = {
      operation: `${error.config?.method?.toUpperCase()} ${error.config?.url}`,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    };

    const apiError = errorHandlerService.handleError(error, context);
    
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: apiError.message,
      code: apiError.code,
      retryAfter: apiError.retryAfter
    });

    const enhancedError = new Error(apiError.message);
    (enhancedError as any).apiError = apiError;
    (enhancedError as any).originalError = error;
    
    return Promise.reject(enhancedError);
  }
);

// Enhanced request method with retry logic
export const makeRequest = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  try {
    return await retryService.execute({
      request: requestFn,
      config: {
        maxRetries: 3,
        baseDelay: 1000,
        maxDelay: 10000
      }
    });
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;
