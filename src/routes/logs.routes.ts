import { Request, Response } from 'express';
import { EventEmitter } from 'events';

// Global event emitter for logs
export const logEmitter = new EventEmitter();

export const streamLogs = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const onLog = (logData: any) => {
    res.write(`data: ${JSON.stringify(logData)}\n\n`);
  };

  logEmitter.on('log', onLog);

  req.on('close', () => {
    logEmitter.removeListener('log', onLog);
  });
};
