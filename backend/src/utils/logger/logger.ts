/**
 * @summary
 * A simple logger utility for the application.
 * In a real-world scenario, this would be replaced with a more robust logging library like Winston or Pino.
 */

const log = (level: string, message: string, meta?: object) => {
  const timestamp = new Date().toISOString();
  const logObject = {
    timestamp,
    level,
    message,
    ...meta,
  };
  console.log(JSON.stringify(logObject));
};

export const logger = {
  info: (message: string, meta?: object) => log('info', message, meta),
  warn: (message: string, meta?: object) => log('warn', message, meta),
  error: (message: string, meta?: object) => log('error', message, meta),
  debug: (message: string, meta?: object) => {
    if (process.env.NODE_ENV === 'development') {
      log('debug', message, meta);
    }
  },
};
