import { ResponseStatus } from '../constants/responseStatus';

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type ID = string;

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  status: typeof ResponseStatus.SUCCESS | typeof ResponseStatus.ERROR;
  message?: string;
  data?: T;
  errors?: any[];
}

export interface ErrorResponse {
  status: typeof ResponseStatus.ERROR;
  message: string;
  code: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
