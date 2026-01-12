import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  whatsappVerifyToken: process.env.WHATSAPP_VERIFY_TOKEN || 'your_verify_token_here',
  whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/leadsync',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
};
