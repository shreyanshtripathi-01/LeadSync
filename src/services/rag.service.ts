import { logger } from '../utils/logger';

export class RAGService {
  // In a production scenario, this would connect to Pinecone or Qdrant
  // For zero-budget development, we mock the vector search over an in-memory knowledge base
  // or a simple file-based retrieval.

  private mockKnowledgeBase = [
    "Our business hours are Monday to Friday, 9 AM to 6 PM.",
    "We offer a 30-day money-back guarantee on all software subscriptions.",
    "To reset your password, visit the login page and click 'Forgot Password'.",
    "Pricing starts at $49/month for the basic tier and $99/month for premium."
  ];

  public async retrieveContext(query: string): Promise<string> {
    logger.info('Retrieving context for query', { query });
    
    try {
      // Simulate vector search latency
      await new Promise(resolve => setTimeout(resolve, 300));

      // Simple keyword matching for the mock
      const lowerQuery = query.toLowerCase();
      const matchedDocs = this.mockKnowledgeBase.filter(doc => 
        lowerQuery.split(' ').some(word => word.length > 3 && doc.toLowerCase().includes(word))
      );

      if (matchedDocs.length > 0) {
        return matchedDocs.join('\n');
      }

      return "General company information.";
    } catch (error) {
      logger.error('Failed to retrieve context', error);
      return '';
    }
  }
}

export const ragService = new RAGService();
