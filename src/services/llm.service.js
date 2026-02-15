"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.llmService = exports.LLMService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
class LLMService {
    apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
    async generateResponse(prompt, context) {
        try {
            if (!config_1.config.openRouterApiKey) {
                logger_1.logger.warn('OpenRouter API Key missing. Simulating LLM response.');
                return `Simulated AI response based on context: ${context.substring(0, 20)}...`;
            }
            const response = await axios_1.default.post(this.apiUrl, {
                model: 'meta-llama/llama-3-8b-instruct:free',
                messages: [
                    {
                        role: 'system',
                        content: `You are a helpful customer support agent. Use the following business context to answer the user's question. If the answer is not in the context, politely let them know.\n\nContext:\n${context}`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${config_1.config.openRouterApiKey}`,
                    'Content-Type': 'application/json',
                }
            });
            const generatedText = response.data?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
            logger_1.logger.info('Generated LLM response successfully');
            return generatedText;
        }
        catch (error) {
            logger_1.logger.error('Failed to generate LLM response', error);
            return 'We are experiencing high traffic right now. Please try again later.';
        }
    }
}
exports.LLMService = LLMService;
exports.llmService = new LLMService();
//# sourceMappingURL=llm.service.js.map