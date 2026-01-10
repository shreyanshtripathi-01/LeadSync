# LeadSync

LeadSync is a backend service built with Node.js and TypeScript. It functions as a WhatsApp CRM integration aimed at helping small businesses manage customer interactions and handle queries automatically.

## Key Features

- Webhook Processing: Handles Meta Graph API webhooks with idempotency to ensure messages are processed exactly once, avoiding duplicate responses when Meta retries failed deliveries.
- RAG Integration: Uses a retrieval-augmented generation approach to fetch business context before passing queries to the language model. This helps keep responses grounded in actual business rules.
- LLM Integration: Uses a language model to parse customer queries, extract necessary information, and generate appropriate replies.
- Observability: Includes a JSON-based logging setup to track API latency, failures, and application state.
- Deployment: Includes Dockerfile and render.yaml for deployment.

## Tech Stack
- Node.js, Express, TypeScript
- Meta WhatsApp Graph API
- OpenRouter API

## Architecture Overview

1. Webhook Receiver: The application receives incoming WhatsApp messages via a webhook from the Meta API and immediately responds with a 200 OK to prevent retry loops.
2. Context Retrieval: It searches a simulated knowledge base to find business rules relevant to the incoming query.
3. Generation: The user message and retrieved context are sent to the LLM to generate a response.
4. Dispatch: The generated response is sent back to the user via the Meta Graph API.

## Running Locally

1. Install dependencies:
   npm install

2. Create a .env file with the following variables:
   PORT=3000
   WHATSAPP_VERIFY_TOKEN=your_token
   WHATSAPP_ACCESS_TOKEN=your_token
   OPENROUTER_API_KEY=your_token

3. Start the server:
   npm run dev

4. Verify it's running by checking the health endpoint:
   http://localhost:3000/health
