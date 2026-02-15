import { logEmitter } from '../routes/logs.routes';

export const logger = {
  info: (message: string, meta: Record<string, any> = {}) => {
    const logObj = { level: 'info', message, timestamp: new Date().toISOString(), ...meta };
    console.log(JSON.stringify(logObj));
    logEmitter.emit('log', logObj);
  },
  error: (message: string, error: any, meta: Record<string, any> = {}) => {
    const logObj = { level: 'error', message, error: error?.message || error, timestamp: new Date().toISOString(), ...meta };
    console.error(JSON.stringify(logObj));
    logEmitter.emit('log', logObj);
  },
  warn: (message: string, meta: Record<string, any> = {}) => {
    const logObj = { level: 'warn', message, timestamp: new Date().toISOString(), ...meta };
    console.warn(JSON.stringify(logObj));
    logEmitter.emit('log', logObj);
  }
};
