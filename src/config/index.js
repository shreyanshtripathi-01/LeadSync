"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 3000,
    whatsappVerifyToken: process.env.WHATSAPP_VERIFY_TOKEN || 'your_verify_token_here',
    whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/leadsync',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
};
//# sourceMappingURL=index.js.map