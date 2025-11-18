import dotenv from 'dotenv';

dotenv.config();

export const config = {
  api: {
    port: parseInt(process.env.PORT || '3000', 10),
    version: process.env.API_VERSION || 'v1',
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? process.env.CORS_ORIGINS?.split(',') || []
          : ['http://localhost:5173', 'http://localhost:3001'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
      maxAge: 86400, // 24 hours
    },
  },
  // Database configuration can be added here when needed
  // database: {
  //   server: process.env.DB_SERVER || 'localhost',
  //   port: parseInt(process.env.DB_PORT || '1433', 10),
  //   user: process.env.DB_USER || '',
  //   password: process.env.DB_PASSWORD || '',
  //   database: process.env.DB_NAME || '',
  //   options: {
  //     encrypt: process.env.DB_ENCRYPT === 'true',
  //     trustServerCertificate: process.env.NODE_ENV !== 'production',
  //   },
  // },
};
