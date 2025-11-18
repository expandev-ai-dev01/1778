import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '@/utils/responses/apiResponse';
import { logger } from '@/utils/logger/logger';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
  logger.error('An unexpected error occurred', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Avoid sending stack trace in production
  const errorDetails = process.env.NODE_ENV === 'development' ? err.stack : undefined;

  res
    .status(500)
    .json(errorResponse('InternalServerError', 'An unexpected error occurred.', errorDetails));
}
