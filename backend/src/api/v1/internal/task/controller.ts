import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/responses/apiResponse';
import { createTask } from '@/services/task/taskService';
import { TaskCreatePayload } from '@/services/task/taskTypes';

/**
 * @api {post} /api/v1/internal/task Create Task
 * @apiName CreateTask
 * @apiGroup Task
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new task for the authenticated user.
 *
 * @apiBody {String} title The title of the task (max 150 chars).
 * @apiBody {String} [description] The description of the task (max 1000 chars).
 * @apiBody {String} [due_date] The due date in ISO 8601 format (e.g., "2024-12-31T23:59:59.000Z"). Must not be in the past.
 * @apiBody {String="Baixa","Média","Alta"} [priority="Média"] The priority of the task.
 *
 * @apiSuccess {Boolean} success Indicates if the request was successful.
 * @apiSuccess {Object} data The created task object.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "success": true,
 *       "data": {
 *         "taskId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
 *         "userId": "user-123-abc",
 *         "title": "My First Task",
 *         "description": "This is a detailed description.",
 *         "dueDate": "2024-12-31T23:59:59.000Z",
 *         "priority": "Alta",
 *         "status": "Pendente",
 *         "createdAt": "2024-05-21T10:00:00.000Z"
 *       }
 *     }
 *
 * @apiError (400 Bad Request) {Object} ValidationError The request body is invalid.
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // In a real application, userId would come from an authentication middleware.
    const mockUserId = 'user-123-abc';

    const payload: TaskCreatePayload = {
      userId: mockUserId,
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.due_date,
      priority: req.body.priority,
    };

    const createdTask = await createTask(payload);

    res.status(201).json(successResponse(createdTask));
  } catch (error) {
    next(error);
  }
}
