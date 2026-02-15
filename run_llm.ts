import { llmService } from './src/services/llm.service';

async function test() {
  const result = await llmService.generateResponse('hi', 'Business context here...');
  console.log('Result:', result);
}
test();
