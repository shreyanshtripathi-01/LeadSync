"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controller_1 = require("../controllers/webhook.controller");
const router = (0, express_1.Router)();
router.get('/', webhook_controller_1.verifyWebhook);
router.post('/', webhook_controller_1.receiveMessage);
exports.default = router;
//# sourceMappingURL=webhook.routes.js.map