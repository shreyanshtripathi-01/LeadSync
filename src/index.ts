import express from 'express';
import { config } from './config';
import webhookRoutes from './routes/webhook.routes';

const app = express();

app.use(express.json());

app.use('/api/webhook', webhookRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
