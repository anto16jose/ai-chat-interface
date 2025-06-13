/**
 * chat.js
 * API routes for chat functionality.
 */
const express = require('express');
const router = express.Router();
const { validateChatRequest, validateKeyRequest } = require('../middleware/validation');
const { validateApiKey, getChatCompletion, getDemoResponse } = require('../utils/openai');

/**
 * POST /api/chat
 * Send a message and get AI response
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