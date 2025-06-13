/**
 * validation.js
 * Middleware for request validation and sanitization.
 */

/**
 * Validates the OpenAI API key format
 * @param {string} key - The API key to validate
 * @returns {boolean} Whether the key is valid
 */
const isValidApiKey = (key) => {
  return typeof key === 'string' && /^sk-[a-zA-Z0-9-_]{20,}$/.test(key);
};

/**
 * Validates the chat message request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateChatRequest = (req, res, next) => {
  const { message, model, apiKey } = req.body;

  // Check required fields
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required and must be a string' });
  }

  // Validate message length
  if (message.length > 4000) {
    return res.status(400).json({ error: 'Message is too long (max 4000 characters)' });
  }

  // Validate model
  if (!model || !['gpt-3.5-turbo', 'gpt-4'].includes(model)) {
    return res.status(400).json({ error: 'Invalid model selected' });
  }

  // Validate API key if not in demo mode
  if (!req.body.demoMode && (!apiKey || !isValidApiKey(apiKey))) {
    return res.status(400).json({ error: 'Invalid API key format' });
  }

  // Sanitize message (basic XSS prevention)
  req.body.message = message
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();

  next();
};

/**
 * Validates the API key validation request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateKeyRequest = (req, res, next) => {
  const { apiKey } = req.body;

  if (!apiKey || !isValidApiKey(apiKey)) {
    return res.status(400).json({ error: 'Invalid API key format' });
  }

  next();
};

module.exports = {
  validateChatRequest,
  validateKeyRequest,
  isValidApiKey
}; 