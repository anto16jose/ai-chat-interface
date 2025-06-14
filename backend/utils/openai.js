/**
 * @file openai.js
 * @description Utility functions for OpenAI API communication and demo mode.
 * Handles both real OpenAI API calls and demo mode responses for evaluation.
 *
 * @module utils/openai
 * @requires openai
 *
 * @features
 * - OpenAI API integration
 * - API key validation
 * - Chat completion generation
 * - Demo mode responses
 *
 * @security
 * - API key validation
 * - Error handling
 * - Environment-aware error details
 */

const OpenAI = require('openai');

/**
 * Demo response templates for different conversation scenarios.
 * Used when demo mode is enabled to simulate AI responses without an API key.
 * Provides realistic responses for evaluation purposes.
 *
 * @constant {Object} DEMO_RESPONSES
 * @property {string[]} coding - Responses for programming-related queries
 * @property {string[]} general - Responses for general knowledge questions
 * @property {string[]} error - Responses for error scenarios or unclear queries
 *
 * @example
 * // Coding response
 * "Here's how you can implement that in JavaScript:\n```javascript\nconst example = () => {\n  console.log('Hello, World!');\n};\n```"
 *
 * // General response
 * "That's an interesting question! Let me explain..."
 *
 * // Error response
 * "I apologize, but I'm having trouble processing that request."
 */
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
 * Initializes the OpenAI SDK with the provided API key
 *
 * @param {string} apiKey - OpenAI API key
 * @returns {OpenAI} OpenAI client instance
 *
 * @example
 * const client = createOpenAIClient('sk-...');
 */
const createOpenAIClient = (apiKey) => {
  return new OpenAI({ apiKey });
};

/**
 * Validates an OpenAI API key by making a test request
 * Attempts to list models to verify key validity
 *
 * @param {string} apiKey - OpenAI API key to validate
 * @returns {Promise<boolean>} Whether the key is valid
 *
 * @example
 * const isValid = await validateApiKey('sk-...');
 * if (isValid) {
 *   console.log('API key is valid');
 * }
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
 * Gets a chat completion from OpenAI API
 * Sends a message to the specified model and returns the response
 *
 * @param {string} apiKey - OpenAI API key
 * @param {string} message - User message to send to the AI
 * @param {string} model - Model to use (gpt-3.5-turbo or gpt-4)
 * @returns {Promise<string>} AI response content
 * @throws {Error} If API call fails or key is invalid
 *
 * @example
 * try {
 *   const response = await getChatCompletion('sk-...', 'What is React?', 'gpt-3.5-turbo');
 *   console.log(response);
 * } catch (error) {
 *   console.error('Failed to get response:', error.message);
 * }
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
 * Generates a simple demo response based on the selected model.
 * Simulates API delay and returns appropriate demo response.
 *
 * @param {string} message - User message (ignored in demo mode)
 * @param {string} model - Selected model (gpt-3.5-turbo or gpt-4)
 * @returns {Promise<string>} Demo response string
 *
 * @example
 * const response = await getDemoResponse('What is React?', 'gpt-3.5-turbo');
 * console.log(response);
 * // Output: "This is a demo response. In the full version, this would be a response from gpt-3.5-turbo."
 */
const getDemoResponse = async (message, model) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  if (model === 'gpt-4') {
    return 'This is a demo response. In the full version, this would be a response from gpt-4.';
  }
  return 'This is a demo response. In the full version, this would be a response from gpt-3.5-turbo.';
};

module.exports = {
  validateApiKey,
  getChatCompletion,
  getDemoResponse
};
