/**
 * @file chat.js
 * @description API routes for chat functionality.
 * Handles message processing, API key validation, and model information.
 *
 * @module routes/chat
 * @requires express
 * @requires ../middleware/validation
 * @requires ../utils/openai
 *
 * @features
 * - Chat message processing
 * - API key validation
 * - Model information
 * - Demo mode support
 *
 * @security
 * - Input validation
 * - Error handling
 * - Environment-aware error details
 */
const express = require('express');
const router = express.Router();
const { validateChatRequest, validateKeyRequest } = require('../middleware/validation');
const { validateApiKey, getChatCompletion, getDemoResponse } = require('../utils/openai');

/**
 * POST /api/chat
 * Send a message and get AI response
 *
 * @route POST /api/chat
 * @description Process a chat message and return AI response
 *
 * @body {Object} request.body
 * @body {string} request.body.message - The user's message to process
 * @body {string} request.body.model - The OpenAI model to use (gpt-3.5-turbo or gpt-4)
 * @body {string} [request.body.apiKey] - OpenAI API key (required if demoMode is false)
 * @body {boolean} [request.body.demoMode] - Whether to use demo responses
 *
 * @returns {Object} JSON response
 * @returns {string} response.content - The AI's response message
 * @returns {Object} [response.usage] - Token usage and cost information
 * @returns {Object} [response.error] - Error details (development only)
 *
 * @throws {400} Bad Request - Invalid request format
 * @throws {500} Server Error - OpenAI API error or processing failure
 *
 * @example
 * // Request
 * POST /api/chat
 * {
 *   "message": "What is React?",
 *   "model": "gpt-3.5-turbo",
 *   "apiKey": "sk-...",
 *   "demoMode": false
 * }
 *
 * // Response
 * {
 *   "content": "React is a JavaScript library for building user interfaces...",
 *   "usage": {
 *     "promptTokens": 10,
 *     "completionTokens": 50,
 *     "totalTokens": 60,
 *     "cost": 0.00025
 *   }
 * }
 */
router.post('/chat', validateChatRequest, async (req, res) => {
  try {
    const { message, model, apiKey, demoMode } = req.body;

    // Handle demo mode
    if (demoMode) {
      const response = await getDemoResponse(message, model);
      return res.json({
        content: response,
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0,
          cost: 0
        }
      });
    }

    // Get real AI response
    const { content, usage } = await getChatCompletion(apiKey, message, model);
    res.json({ content, usage });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * POST /api/validate-key
 * Validate OpenAI API key
 *
 * @route POST /api/validate-key
 * @description Validate an OpenAI API key by making a test request
 *
 * @body {Object} request.body
 * @body {string} request.body.apiKey - OpenAI API key to validate
 *
 * @returns {Object} JSON response
 * @returns {boolean} response.valid - Whether the API key is valid
 * @returns {Object} [response.error] - Error details (development only)
 *
 * @throws {400} Bad Request - Invalid request format
 * @throws {500} Server Error - Validation process failure
 *
 * @example
 * // Request
 * POST /api/validate-key
 * {
 *   "apiKey": "sk-..."
 * }
 *
 * // Response
 * {
 *   "valid": true
 * }
 */
router.post('/validate-key', validateKeyRequest, async (req, res) => {
  try {
    const { apiKey } = req.body;
    const isValid = await validateApiKey(apiKey);
    res.json({ valid: isValid });
  } catch (error) {
    console.error('Key validation error:', error);
    res.status(500).json({
      error: 'Failed to validate API key',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/models
 * Get available OpenAI models
 *
 * @route GET /api/models
 * @description Retrieve list of available OpenAI models
 *
 * @returns {Object} JSON response
 * @returns {Array<Object>} response.models - List of available models
 * @returns {string} response.models[].id - Model identifier
 * @returns {string} response.models[].name - Human-readable model name
 *
 * @example
 * // Response
 * {
 *   "models": [
 *     { "id": "gpt-3.5-turbo", "name": "GPT-3.5 Turbo" },
 *     { "id": "gpt-4", "name": "GPT-4" }
 *   ]
 * }
 */
router.get('/models', (req, res) => {
  res.json({
    models: [
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
      { id: 'gpt-4', name: 'GPT-4' }
    ]
  });
});

module.exports = router;
