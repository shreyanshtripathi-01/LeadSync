import express from 'express';
import { config } from './config';
import webhookRoutes from './routes/webhook.routes';
import { streamLogs } from './routes/logs.routes';
import path from 'path';

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/webhook', webhookRoutes);
app.get('/api/logs', streamLogs);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
