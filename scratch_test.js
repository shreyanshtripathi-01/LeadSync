const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

async function test() {
  const context = "Business context here...";
  const prompt = "hi";
  
  try {
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
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log("SUCCESS:", response.data);
  } catch (error) {
    console.log("ERROR STATUS:", error.response ? error.response.status : error.message);
    if (error.response) console.log(error.response.data);
  }
}
test();
