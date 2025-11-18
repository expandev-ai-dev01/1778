import { Router } from 'express';
import * as healthController from '@/api/v1/external/public/health/controller';

const router = Router();

// This will create the route: /api/v1/external/public/health
router.get('/public/health', healthController.getHandler);

// Other public routes can be added here

export default router;
