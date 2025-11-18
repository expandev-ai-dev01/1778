import { Router } from 'express';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import { createTaskSchema } from '@/services/task/taskValidation';
import * as taskController from '@/api/v1/internal/task/controller';

const router = Router();

// This will create the route: POST /api/v1/internal/task
router.post('/task', validationMiddleware(createTaskSchema), taskController.postHandler);

// Other internal routes can be added here

export default router;
