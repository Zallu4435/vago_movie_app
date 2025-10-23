export interface ApiResponse<T = any> {
    status: 'success' | 'error';
    message?: string;
    data?: T;
  }
  
  export interface ApiError {
    status: 'error';
    message: string;
    code: string;
    errors?: Array<{
      field: string;
      message: string;
    }>;
  }
  