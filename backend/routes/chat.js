/**
 * chat.js
 * API routes for chat functionality.
 * Handles message processing, API key validation, and model information.
 */
const express = require('express');
const router = express.Router();
const { validateChatRequest, validateKeyRequest } = require('../middleware/validation');
const { validateApiKey, getChatCompletion, getDemoResponse } = require('../utils/openai');

/**
 * POST /api/chat
 * Send a message and get AI response
 * 
 * Request body:
 * @param {string} message - The user's message to process
 * @param {string} model - The OpenAI model to use (gpt-3.5-turbo or gpt-4)
 * @param {string} apiKey - OpenAI API key (required if demoMode is false)
 * @param {boolean} demoMode - Whether to use demo responses
 * 
 * Response:
 * @returns {Object} JSON response
 * @returns {string} response.content - The AI's response message
 * @returns {Object} [response.error] - Error details (development only)
 * 
 * @throws {400} Bad Request - Invalid request format
 * @throws {500} Server Error - OpenAI API error or processing failure
 */
router.post('/chat', validateChatRequest, async (req, res) => {
  try {
    const { message, model, apiKey, demoMode } = req.body;

    // Handle demo mode
    if (demoMode) {
      const response = await getDemoResponse(message, model);
      return res.json({ content: response });
    }

    // Get real AI response
    const content = await getChatCompletion(apiKey, message, model);
    res.json({ content });
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
 * Request body:
 * @param {string} apiKey - OpenAI API key to validate
 * 
 * Response:
 * @returns {Object} JSON response
 * @returns {boolean} response.valid - Whether the API key is valid
 * @returns {Object} [response.error] - Error details (development only)
 * 
 * @throws {400} Bad Request - Invalid request format
 * @throws {500} Server Error - Validation process failure
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
 * Response:
 * @returns {Object} JSON response
 * @returns {Array<Object>} response.models - List of available models
 * @returns {string} response.models[].id - Model identifier
 * @returns {string} response.models[].name - Human-readable model name
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