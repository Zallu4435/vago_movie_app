import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../../../shared/errors/NotFoundError';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Route ${req.originalUrl} not found`));
};
