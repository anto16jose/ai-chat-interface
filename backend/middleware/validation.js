/**
 * @file validation.js
 * @description Middleware for request validation and sanitization.
 * Provides input validation and sanitization for API endpoints.
 *
 * @module middleware/validation
 *
 * @features
 * - API key format validation
 * - Chat request validation
 * - Input sanitization
 * - XSS prevention
 *
 * @security
 * - Input validation
 * - XSS protection
 * - Request size limits
 */

/**
 * Validates the OpenAI API key format
 * Ensures the key follows OpenAI's format: sk- followed by alphanumeric characters
 *
 * @param {string} key - The API key to validate
 * @returns {boolean} Whether the key is valid
 *
 * @example
 * isValidApiKey('sk-1234567890abcdefghijklmnopqrstuvwxyz') // true
 * isValidApiKey('invalid-key') // false
 */
const isValidApiKey = (key) => {
  return typeof key === 'string' && /^sk-[a-zA-Z0-9-_]{20,}$/.test(key);
};

/**
 * Validates the chat message request
 * Ensures all required fields are present and properly formatted
 * Sanitizes input to prevent XSS attacks
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 *
 * @throws {400} Bad Request - If validation fails
 *
 * @example
 * // Valid request
 * {
 *   "message": "Hello, AI!",
 *   "model": "gpt-3.5-turbo",
 *   "apiKey": "sk-...",
 *   "demoMode": false
 * }
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
  // Replace < and > with HTML entities to prevent script injection
  req.body.message = message
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();

  next();
};

/**
 * Validates the API key validation request
 * Ensures the API key is present and properly formatted
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 *
 * @throws {400} Bad Request - If validation fails
 *
 * @example
 * // Valid request
 * {
 *   "apiKey": "sk-..."
 * }
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
