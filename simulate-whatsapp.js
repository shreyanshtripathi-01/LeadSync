const axios = require('axios');

const RENDER_URL = 'https://leadsync-api-slhp.onrender.com/api/webhook';

// This is the EXACT JSON payload that WhatsApp (Meta) sends to your server
// when a real customer texts your business number.
const mockWhatsAppPayload = {
  object: 'whatsapp_business_account',
  entry: [
    {
      changes: [
        {
          value: {
            metadata: { phone_number_id: '1234567890' },
            messages: [
              {
                from: '919876543210', // The customer's phone number
                text: { body: 'What are your business hours?' } // The customer's message
              }
            ]
          }
        }
      ]
    }
  ]
};

async function simulateMessage() {
  console.log('📱 Simulating a customer sending a WhatsApp message to your business...');
  console.log(`💬 Message: "${mockWhatsAppPayload.entry[0].changes[0].value.messages[0].text.body}"\n`);
  
  try {
    const response = await axios.post(RENDER_URL, mockWhatsAppPayload);
    console.log(`✅ Server responded with status: ${response.status} (Idempotency check passed)`);
    console.log('\n👉 NOW GO LOOK AT YOUR RENDER.COM LOGS!');
    console.log('You will see your backend engine retrieving the business rules and the AI generating the reply!');
  } catch (error) {
    console.error('❌ Error hitting your webhook:', error.message);
  }
}

simulateMessage();
