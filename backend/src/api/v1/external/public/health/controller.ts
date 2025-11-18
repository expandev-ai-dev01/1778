import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/responses/apiResponse';

/**
 * @api {get} /api/v1/external/public/health Health Check
 * @apiName GetHealth
 * @apiGroup Health
 * @apiVersion 1.0.0
 *
 * @apiDescription Checks the health of the API.
 *
 * @apiSuccess {Boolean} success Indicates if the request was successful.
 * @apiSuccess {Object} data The response data.
 * @apiSuccess {String} data.status The health status.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {
 *         "status": "API is up and running"
 *       }
 *     }
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.status(200).json(successResponse({ status: 'API is up and running' }));
  } catch (error) {
    next(error);
  }
}
