"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ragService = exports.RAGService = void 0;
const logger_1 = require("../utils/logger");
class RAGService {
    // In a production scenario, this would connect to Pinecone or Qdrant
    // For zero-budget development, we mock the vector search over an in-memory knowledge base
    // or a simple file-based retrieval.
    mockKnowledgeBase = [
        "Our business hours are Monday to Friday, 9 AM to 6 PM.",
        "We offer a 30-day money-back guarantee on all software subscriptions.",
        "To reset your password, visit the login page and click 'Forgot Password'.",
        "Pricing starts at $49/month for the basic tier and $99/month for premium."
    ];
    async retrieveContext(query) {
        logger_1.logger.info('Retrieving context for query', { query });
        try {
            // Simulate vector search latency
            await new Promise(resolve => setTimeout(resolve, 300));
            // Simple keyword matching for the mock
            const lowerQuery = query.toLowerCase();
            const matchedDocs = this.mockKnowledgeBase.filter(doc => lowerQuery.split(' ').some(word => word.length > 3 && doc.toLowerCase().includes(word)));
            if (matchedDocs.length > 0) {
                return matchedDocs.join('\n');
            }
            return "General company information.";
        }
        catch (error) {
            logger_1.logger.error('Failed to retrieve context', error);
            return '';
        }
    }
}
exports.RAGService = RAGService;
exports.ragService = new RAGService();
//# sourceMappingURL=rag.service.js.map