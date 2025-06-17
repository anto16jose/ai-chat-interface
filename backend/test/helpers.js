const assert = require('assert');
const sinon = require('sinon');
const request = require('supertest');

// Mock OpenAI responses
const mockOpenAIResponses = {
  success: {
    choices: [{
      message: {
        role: 'assistant',
        content: 'This is a test response'
      }
    }],
    usage: {
      prompt_tokens: 10,
      completion_tokens: 20,
      total_tokens: 30
    }
  },
  error: new Error('OpenAI API Error'),
  rateLimit: {
    status: 429,
    message: 'Rate limit exceeded'
  }
};

// Mock environment variables
const mockEnv = {
  PORT: 3000,
  NODE_ENV: 'test',
  OPENAI_API_KEY: 'sk-test-key-1234567890abcdefghijklmnopqrstuvwxyz',
  RATE_LIMIT_WINDOW_MS: 900000,
  RATE_LIMIT_MAX_REQUESTS: 100
};

// Helper to create test server
const createTestServer = (app) => {
  // Not used anymore, but kept for compatibility
  return null;
};

// Helper to mock OpenAI client
const mockOpenAIClient = (response = mockOpenAIResponses.success) => {
  const openAIStub = {
    chat: {
      completions: {
        create: sinon.stub().resolves(response)
      }
    },
    models: {
      list: sinon.stub().resolves({ data: [] })
    }
  };
  return openAIStub;
};

// Helper to validate API response
const validateAPIResponse = (res, expectedStatus, expectedData = null) => {
  assert.strictEqual(res.status, expectedStatus, `Expected status ${expectedStatus}, got ${res.status}`);
  
  if (expectedData) {
    for (const [key, value] of Object.entries(expectedData)) {
      assert.deepStrictEqual(res.body[key], value, `Expected ${key} to be ${JSON.stringify(value)}, got ${JSON.stringify(res.body[key])}`);
    }
  }
};

// Helper to make requests using supertest (works directly with Express apps)
const makeRequest = async (app, method, path, data = null, headers = {}) => {
  let req = request(app)[method.toLowerCase()](path);
  
  // Set headers
  Object.entries(headers).forEach(([key, value]) => {
    req = req.set(key, value);
  });
  
  // Set default content type if not provided
  if (!headers['Content-Type']) {
    req = req.set('Content-Type', 'application/json');
  }
  
  // Send data if provided
  if (data) {
    req = req.send(data);
  }
  
  const response = await req;
  
  return {
    status: response.status,
    data: response.body,
    headers: response.headers
  };
};

module.exports = {
  assert,
  mockOpenAIResponses,
  mockEnv,
  createTestServer,
  mockOpenAIClient,
  validateAPIResponse,
  makeRequest
}; 