import { AppError } from './AppError';

export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export class ValidationError extends AppError {
  constructor(
    message: string = 'Validation failed',
    public readonly errors?: ValidationErrorDetail[]
  ) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}
