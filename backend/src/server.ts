import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { config } from '@/config';
import { errorMiddleware } from '@/middleware/errorMiddleware';
import { notFoundMiddleware } from '@/middleware/notFoundMiddleware';
import apiRoutes from '@/routes';

dotenv.config();

const app: Application = express();

// Security & Core Middleware
app.use(helmet());
app.use(cors(config.api.cors));

// Request Processing Middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health Check Endpoint (unversioned)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API Routes (versioned)
app.use('/api', apiRoutes);

// 404 Not Found Handler
app.use(notFoundMiddleware);

// Global Error Handling Middleware
app.use(errorMiddleware);

const server = app.listen(config.api.port, () => {
  console.log(`Server running on port ${config.api.port} in ${process.env.NODE_ENV} mode`);
});

// Graceful Shutdown
const signals = ['SIGTERM', 'SIGINT'];

function gracefulShutdown(signal: string) {
  process.on(signal, () => {
    console.log(`\n${signal} received, closing server gracefully.`);
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  });
}

signals.forEach(gracefulShutdown);

export default app;
