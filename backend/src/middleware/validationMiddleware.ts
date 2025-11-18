import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { errorResponse } from '@/utils/responses/apiResponse';

export function validationMiddleware(schema: z.ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetails = error.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        }));
        res
          .status(400)
          .json(errorResponse('ValidationError', 'Invalid request data.', errorDetails));
      } else {
        next(error);
      }
    }
  };
}
