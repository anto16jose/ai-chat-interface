const { expect, mockOpenAIResponses, mockEnv, createTestServer, mockOpenAIClient, validateAPIResponse } = require('../helpers');
const app = require('../../server');
const sinon = require('sinon');

describe('Chat API Endpoints', () => {
  let server;
  let openAIStub;

  beforeEach(() => {
    server = createTestServer(app);
    openAIStub = mockOpenAIClient();
    // Replace OpenAI client with stub
    sinon.stub(require('../../utils/openai'), 'getOpenAIClient').returns(openAIStub);
  });

  afterEach(() => {
    server.close();
    sinon.restore();
  });

  describe('POST /api/chat', () => {
    const validRequest = {
      messages: [{ role: 'user', content: 'Hello' }],
      model: 'gpt-3.5-turbo'
    };

    it('should successfully process a chat request', async () => {
      const res = await server
        .post('/api/chat')
        .set('Content-Type', 'application/json')
        .send(validRequest);

      validateAPIResponse(res, 200, {
        message: {
          role: 'assistant',
          content: 'This is a test response'
        }
      });
    });

    it('should handle OpenAI API errors', async () => {
      openAIStub.chat.completions.create.rejects(mockOpenAIResponses.error);

      const res = await server
        .post('/api/chat')
        .set('Content-Type', 'application/json')
        .send(validRequest);

      validateAPIResponse(res, 500, {
        error: 'Failed to get response from OpenAI'
      });
    });

    it('should handle rate limiting', async () => {
      openAIStub.chat.completions.create.rejects(mockOpenAIResponses.rateLimit);

      const res = await server
        .post('/api/chat')
        .set('Content-Type', 'application/json')
        .send(validRequest);

      validateAPIResponse(res, 429, {
        error: 'Rate limit exceeded'
      });
    });

    it('should validate request body', async () => {
      const invalidRequests = [
        {}, // Empty body
        { messages: [] }, // Empty messages
        { messages: [{ role: 'invalid', content: 'Hello' }] }, // Invalid role
        { messages: [{ role: 'user' }] } // Missing content
      ];

      for (const invalidRequest of invalidRequests) {
        const res = await server
          .post('/api/chat')
          .set('Content-Type', 'application/json')
          .send(invalidRequest);

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
      }
    });

    it('should respect rate limiting', async () => {
      const requests = Array(101).fill(validRequest); // Exceed rate limit
      
      for (let i = 0; i < requests.length; i++) {
        const res = await server
          .post('/api/chat')
          .set('Content-Type', 'application/json')
          .send(validRequest);

        if (i === requests.length - 1) {
          expect(res).to.have.status(429);
          expect(res.body).to.have.property('error');
        }
      }
    });
  });

  describe('POST /api/validate-key', () => {
    it('should validate a correct API key', async () => {
      const res = await server
        .post('/api/validate-key')
        .set('Content-Type', 'application/json')
        .send({ apiKey: mockEnv.OPENAI_API_KEY });

      validateAPIResponse(res, 200, {
        valid: true,
        message: 'API key is valid'
      });
    });

    it('should reject an invalid API key', async () => {
      openAIStub.chat.completions.create.rejects(new Error('Invalid API key'));

      const res = await server
        .post('/api/validate-key')
        .set('Content-Type', 'application/json')
        .send({ apiKey: 'invalid-key' });

      validateAPIResponse(res, 400, {
        valid: false,
        message: 'Invalid API key'
      });
    });
  });

  describe('GET /api/models', () => {
    it('should return available models', async () => {
      const res = await server.get('/api/models');

      validateAPIResponse(res, 200, {
        models: [
          { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
          { id: 'gpt-4', name: 'GPT-4' }
        ]
      });
    });
  });
}); 