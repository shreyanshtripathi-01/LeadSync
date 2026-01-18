import axios from 'axios';
import { config } from '../config';
import { logger } from '../utils/logger';

export class WhatsAppService {
  private readonly baseUrl = 'https://graph.facebook.com/v18.0';

  public async sendMessage(to: string, text: string, phoneNumberId: string): Promise<boolean> {
    try {
      if (!config.whatsappAccessToken) {
        logger.warn('WhatsApp access token is missing. Simulating message send.', { to, text });
        return true;
      }

      const url = `${this.baseUrl}/${phoneNumberId}/messages`;
      
      await axios.post(
        url,
        {
          messaging_product: 'whatsapp',
          to: to,
          type: 'text',
          text: { body: text },
        },
        {
          headers: {
            Authorization: `Bearer ${config.whatsappAccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      logger.info('WhatsApp message sent successfully', { to });
      return true;
    } catch (error) {
      logger.error('Failed to send WhatsApp message', error, { to });
      return false;
    }
  }
}

export const whatsappService = new WhatsAppService();
