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
 * - Cost calculation
 *
 * @security
 * - API key validation
 * - Error handling
 * - Environment-aware error details
 */

const OpenAI = require('openai');

// OpenAI pricing per 1K tokens (as of 2024)
const PRICING = {
  'gpt-3.5-turbo': {
    input: 0.0015,  // $0.0015 per 1K tokens
    output: 0.002   // $0.002 per 1K tokens
  },
  'gpt-4': {
    input: 0.03,    // $0.03 per 1K tokens
    output: 0.06    // $0.06 per 1K tokens
  }
};

/**
 * Calculates the cost of an API call based on token usage
 *
 * @param {string} model - The model used (gpt-3.5-turbo or gpt-4)
 * @param {number} promptTokens - Number of tokens in the prompt
 * @param {number} completionTokens - Number of tokens in the completion
 * @returns {number} Total cost in USD
 *
 * @example
 * const cost = calculateCost('gpt-3.5-turbo', 100, 50);
 * console.log(cost); // 0.00025 (USD)
 */
const calculateCost = (model, promptTokens, completionTokens) => {
  const modelPricing = PRICING[model];
  if (!modelPricing) return 0;

  const inputCost = (promptTokens / 1000) * modelPricing.input;
  const outputCost = (completionTokens / 1000) * modelPricing.output;

  return inputCost + outputCost;
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
 * @returns {Promise<Object>} Response object with content and usage
 * @throws {Error} If API call fails or key is invalid
 *
 * @example
 * try {
 *   const response = await getChatCompletion('sk-...', 'What is React?', 'gpt-3.5-turbo');
 *   console.log(response.content);
 *   console.log(response.usage);
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

    const { prompt_tokens, completion_tokens, total_tokens } = completion.usage;
    const cost = calculateCost(model, prompt_tokens, completion_tokens);

    return {
      content: completion.choices[0].message.content,
      usage: {
        promptTokens: prompt_tokens,
        completionTokens: completion_tokens,
        totalTokens: total_tokens,
        cost: cost
      }
    };
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
