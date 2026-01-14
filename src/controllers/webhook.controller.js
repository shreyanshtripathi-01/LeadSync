"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveMessage = exports.verifyWebhook = void 0;
const express_1 = require("express");
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
const rag_service_1 = require("../services/rag.service");
const llm_service_1 = require("../services/llm.service");
const whatsapp_service_1 = require("../services/whatsapp.service");
const verifyWebhook = (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode && token) {
        if (mode === 'subscribe' && token === config_1.config.whatsappVerifyToken) {
            logger_1.logger.info('Webhook verified successfully');
            res.status(200).send(challenge);
        }
        else {
            res.sendStatus(403);
        }
    }
    else {
        res.sendStatus(400);
    }
};
exports.verifyWebhook = verifyWebhook;
const receiveMessage = async (req, res) => {
    try {
        const body = req.body;
        if (body.object) {
            if (body.entry &&
                body.entry[0].changes &&
                body.entry[0].changes[0] &&
                body.entry[0].changes[0].value.messages &&
                body.entry[0].changes[0].value.messages[0]) {
                const value = body.entry[0].changes[0].value;
                const phoneNumberId = value.metadata.phone_number_id;
                const from = value.messages[0].from;
                const msgBody = value.messages[0].text.body;
                logger_1.logger.info('Received message', { from, message: msgBody });
                // Acknowledge receipt immediately to avoid Meta retries (Idempotency best practice)
                res.sendStatus(200);
                // 1. Retrieve Context (RAG)
                const context = await rag_service_1.ragService.retrieveContext(msgBody);
                // 2. Generate LLM Response
                const responseText = await llm_service_1.llmService.generateResponse(msgBody, context);
                // 3. Send back via WhatsApp
                await whatsapp_service_1.whatsappService.sendMessage(from, responseText, phoneNumberId);
                return;
            }
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (error) {
        logger_1.logger.error('Error processing webhook', error);
        if (!res.headersSent) {
            res.sendStatus(500);
        }
    }
};
exports.receiveMessage = receiveMessage;
//# sourceMappingURL=webhook.controller.js.map