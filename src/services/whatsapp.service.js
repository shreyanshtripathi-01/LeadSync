"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsappService = exports.WhatsAppService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
class WhatsAppService {
    baseUrl = 'https://graph.facebook.com/v18.0';
    async sendMessage(to, text, phoneNumberId) {
        try {
            if (!config_1.config.whatsappAccessToken) {
                logger_1.logger.warn('WhatsApp access token is missing. Simulating message send.', { to, text });
                return true;
            }
            const url = `${this.baseUrl}/${phoneNumberId}/messages`;
            await axios_1.default.post(url, {
                messaging_product: 'whatsapp',
                to: to,
                type: 'text',
                text: { body: text },
            }, {
                headers: {
                    Authorization: `Bearer ${config_1.config.whatsappAccessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            logger_1.logger.info('WhatsApp message sent successfully', { to });
            return true;
        }
        catch (error) {
            logger_1.logger.error('Failed to send WhatsApp message', error, { to });
            return false;
        }
    }
}
exports.WhatsAppService = WhatsAppService;
exports.whatsappService = new WhatsAppService();
//# sourceMappingURL=whatsapp.service.js.map