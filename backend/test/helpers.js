const assert = require('assert');
const sinon = require('sinon');

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
      assert.deepStrictEqual(res.data[key], value, `Expected ${key} to be ${JSON.stringify(value)}, got ${JSON.stringify(res.data[key])}`);
    }
  }
};

// Helper to make HTTP requests using Node's built-in http module
const makeRequest = async (app, method, path, data = null, headers = {}) => {
  const http = require('http');
  
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : '';
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const responseData = body ? JSON.parse(body) : {};
          resolve({
            status: res.statusCode,
            data: responseData,
            headers: res.headers
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: body,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
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