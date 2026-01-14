import { Request, Response } from 'express';
import { config } from '../config';
import { logger } from '../utils/logger';
import { ragService } from '../services/rag.service';
import { llmService } from '../services/llm.service';
import { whatsappService } from '../services/whatsapp.service';

export const verifyWebhook = (req: Request, res: Response): void => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === config.whatsappVerifyToken) {
      logger.info('Webhook verified successfully');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
};

export const receiveMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;

    if (body.object) {
      if (
        body.entry &&
        body.entry[0].changes &&
        body.entry[0].changes[0] &&
        body.entry[0].changes[0].value.messages &&
        body.entry[0].changes[0].value.messages[0]
      ) {
        const value = body.entry[0].changes[0].value;
        const phoneNumberId = value.metadata.phone_number_id;
        const from = value.messages[0].from;
        const msgBody = value.messages[0].text.body;

        logger.info('Received message', { from, message: msgBody });

        // Acknowledge receipt immediately to avoid Meta retries (Idempotency best practice)
        res.sendStatus(200);

        // 1. Retrieve Context (RAG)
        const context = await ragService.retrieveContext(msgBody);

        // 2. Generate LLM Response
        const responseText = await llmService.generateResponse(msgBody, context);

        // 3. Send back via WhatsApp
        await whatsappService.sendMessage(from, responseText, phoneNumberId);
        
        return;
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    logger.error('Error processing webhook', error);
    if (!res.headersSent) {
      res.sendStatus(500);
    }
  }
};
