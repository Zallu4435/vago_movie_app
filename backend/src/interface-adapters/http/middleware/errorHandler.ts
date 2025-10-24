import { Request, Response, NextFunction } from 'express';
import { AppError } from '@shared/errors/AppError';
import { DomainError } from '@domain/errors/DomainError';
import { ValidationError } from '@shared/errors/ValidationError';
import { DuplicateFavoriteError } from '@domain/errors/DuplicateFavoriteError';

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
      status: 'error',
      message: err.message,
      code: err.code,
      ...(err instanceof ValidationError && { errors: err.errors }),
    });
  }

  // Handle domain errors
  if (err instanceof DuplicateFavoriteError) {
    return res.status(409).json({
      status: 'error',
      message: err.message,
      code: 'DUPLICATE_FAVORITE',
    });
  }

  if (err instanceof DomainError) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
      code: 'DOMAIN_ERROR',
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    code: 'INTERNAL_SERVER_ERROR',
  });
};
