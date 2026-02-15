import axios from 'axios';
import { config } from '../config';
import { logger } from '../utils/logger';

export class LLMService {
  private readonly apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

  public async generateResponse(prompt: string, context: string): Promise<string> {
    try {
      if (!config.openRouterApiKey) {
        logger.warn('OpenRouter API Key missing. Simulating LLM response.');
        return `Simulated AI response based on context: ${context.substring(0, 20)}...`;
      }

      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'baidu/cobuddy:free',
          messages: [
            {
              role: 'system',
              content: `You are a helpful customer support agent. Use the following business context to answer the user's question. If the answer is not in the context, politely let them know.\n\nContext:\n${context}`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          reasoning: { enabled: true }
        },
        {
          headers: {
            Authorization: `Bearer ${config.openRouterApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const generatedText = response.data?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
      logger.info('Generated LLM response successfully');
      
      return generatedText;
    } catch (error: any) {
      const details = error.response?.data || error.message;
      logger.error('Failed to generate LLM response', error, { details });
      return 'We are experiencing high traffic right now. Please try again later.';
    }
  }
}

export const llmService = new LLMService();
