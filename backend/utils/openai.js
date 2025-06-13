/**
 * openai.js
 * Utility functions for OpenAI API communication and demo mode.
 */
const OpenAI = require('openai');

// Demo responses for different scenarios
const DEMO_RESPONSES = {
  coding: [
    "Here's how you can implement that in JavaScript:\n```javascript\nconst example = () => {\n  console.log('Hello, World!');\n};\n```",
    "For that React component, you'll want to use the `useState` hook:\n```jsx\nconst [state, setState] = useState(initialValue);\n```",
    "To handle that API request, you can use async/await:\n```javascript\nasync function fetchData() {\n  const response = await fetch(url);\n  const data = await response.json();\n  return data;\n}\n```"
  ],
  general: [
    "That's an interesting question! Let me explain...",
    "Based on my understanding, there are a few key points to consider...",
    "Here's what you need to know about that topic..."
  ],
  error: [
    "I apologize, but I'm having trouble processing that request.",
    "I'm not sure I understand. Could you rephrase that?",
    "I'm currently in demo mode, so I can't access real-time data."
  ]
};

/**
 * Creates an OpenAI client instance
 * @param {string} apiKey - OpenAI API key
 * @returns {OpenAI} OpenAI client instance
 */
const createOpenAIClient = (apiKey) => {
  return new OpenAI({ apiKey });
};

/**
 * Validates an OpenAI API key by making a test request
 * @param {string} apiKey - OpenAI API key to validate
 * @returns {Promise<boolean>} Whether the key is valid
 */
const validateApiKey = async (apiKey) => {
  try {
    const openai = createOpenAIClient(apiKey);
    await openai.models.list(); // Simple API call to test key
    return true;
  } catch (error) {
    console.error('API key validation error:', error.message);
    return false;
  }
};

/**
 * Gets a chat completion from OpenAI
 * @param {string} apiKey - OpenAI API key
 * @param {string} message - User message
 * @param {string} model - Model to use
 * @returns {Promise<string>} AI response
 */
const getChatCompletion = async (apiKey, message, model) => {
  try {
    const openai = createOpenAIClient(apiKey);
    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: message }],
      max_tokens: 1000,
      temperature: 0.7
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    throw new Error(
      error.response?.data?.error?.message || 
      'Failed to get response from OpenAI'
    );
  }
};

/**
 * Gets a demo response based on the message content
 * @param {string} message - User message
 * @param {string} model - Selected model (for response context)
 * @returns {Promise<string>} Demo response
 */
const getDemoResponse = async (message, model) => {
  if (demoMode) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Determine response type based on message content
    let responseType = 'general';
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('code') || 
        lowerMessage.includes('function') || 
        lowerMessage.includes('implement')) {
      responseType = 'coding';
    } else if (lowerMessage.includes('error') || 
               lowerMessage.includes('problem') || 
               lowerMessage.includes('issue')) {
      responseType = 'error';
    }

    // Get random response from appropriate category
    const responses = DEMO_RESPONSES[responseType];
    let response = responses[Math.floor(Math.random() * responses.length)];

    // Update the general demo response to clarify API key requirement
    if (responseType === 'general') {
      response = "Demo mode is enabled. To communicate directly with OpenAI's API and receive real responses, please provide your own API key in the settings. Demo mode is only for testing the chat interface UI.";
    }

    // Add model context to response
    return `[Demo Mode - ${model}]\n${response}`;
  }
};

module.exports = {
  validateApiKey,
  getChatCompletion,
  getDemoResponse
}; 