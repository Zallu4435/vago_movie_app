import { Request, Response, NextFunction } from 'express';
import { AppError } from '@shared/errors/AppError';
import { DomainError } from '@domain/errors/DomainError';
import { ValidationError } from '@shared/errors/ValidationError';
import { DuplicateFavoriteError } from '@domain/errors/DuplicateFavoriteError';
import { HttpStatus } from '@shared/constants/httpStatus';
import { ResponseStatus } from '@shared/constants/responseStatus';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  // Handle known application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: ResponseStatus.ERROR,
      message: err.message,
      code: err.code,
      ...(err instanceof ValidationError && { errors: err.errors }),
    });
  }

  // Handle domain errors
  if (err instanceof DuplicateFavoriteError) {
    return res.status(HttpStatus.CONFLICT).json({
      status: ResponseStatus.ERROR,
      message: err.message,
      code: 'DUPLICATE_FAVORITE',
    });
  }

  if (err instanceof DomainError) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: ResponseStatus.ERROR,
      message: err.message,
      code: 'DOMAIN_ERROR',
    });
  }

  // Handle unknown errors
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    status: ResponseStatus.ERROR,
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    code: 'INTERNAL_SERVER_ERROR',
  });
};
