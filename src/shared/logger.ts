import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDirectory = path.join(process.cwd(), 'logs', 'winston');

// Create the log directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const getCurrentDateTime = () => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
  return `${formattedDate} at ${formattedTime}`;
};

export const successLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.printf(({ level, message }) => {
      const currentDateTime = getCurrentDateTime();
      return `${currentDateTime} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(logDirectory, 'success', 'success-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
    }),
  ],
});

export const errorLogger = createLogger({
  level: 'error',
  format: format.combine(
    format.printf(({ level, message }) => {
      const currentDateTime = getCurrentDateTime();
      return `${currentDateTime} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(logDirectory, 'error', 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    }),
  ],
});
