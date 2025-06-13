const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;

chai.use(chaiHttp);

// Mock OpenAI responses
const mockOpenAIResponses = {
  success: {
    choices: [{
      message: {
        role: 'assistant',
        content: 'This is a test response'
      }
    }]
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
  OPENAI_API_KEY: 'test-api-key',
  RATE_LIMIT_WINDOW_MS: 900000,
  RATE_LIMIT_MAX_REQUESTS: 100
};

// Helper to create test server
const createTestServer = (app) => {
  return chai.request(app).keepOpen();
};

// Helper to mock OpenAI client
const mockOpenAIClient = (response = mockOpenAIResponses.success) => {
  const openAIStub = {
    chat: {
      completions: {
        create: sinon.stub().resolves(response)
      }
    }
  };
  return openAIStub;
};

// Helper to validate API response
const validateAPIResponse = (res, status, data) => {
  expect(res).to.have.status(status);
  if (data) {
    expect(res.body).to.deep.include(data);
  }
};

module.exports = {
  expect,
  mockOpenAIResponses,
  mockEnv,
  createTestServer,
  mockOpenAIClient,
  validateAPIResponse
}; 