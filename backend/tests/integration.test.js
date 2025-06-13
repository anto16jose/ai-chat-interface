/**
 * integration.test.js
 * Integration tests for full stack functionality.
 */
const axios = require('axios');
const { expect } = require('chai');

const API_URL = 'http://localhost:3000/api';
const TEST_API_KEY = process.env.TEST_OPENAI_API_KEY || 'sk-test-key';

describe('Full Stack Integration Tests', () => {
  // Test backend server is running
  describe('Server Health', () => {
    it('should return 404 for non-existent endpoint', async () => {
      try {
        await axios.get(`${API_URL}/nonexistent`);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.equal(404);
      }
    });
  });

  // Test API key validation
  describe('API Key Validation', () => {
    it('should reject invalid API key format', async () => {
      try {
        await axios.post(`${API_URL}/validate-key`, { apiKey: 'invalid-key' });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.equal(400);
      }
    });

    it('should validate API key format', async () => {
      const response = await axios.post(`${API_URL}/validate-key`, {
        apiKey: TEST_API_KEY
      });
      expect(response.data).to.have.property('valid');
    });
  });

  // Test chat functionality
  describe('Chat Functionality', () => {
    it('should handle demo mode', async () => {
      const response = await axios.post(`${API_URL}/chat`, {
        message: 'Hello, this is a test',
        model: 'gpt-3.5-turbo',
        demoMode: true
      });
      expect(response.data).to.have.property('content');
      expect(response.data.content).to.include('Demo Mode');
    });

    it('should reject invalid chat request', async () => {
      try {
        await axios.post(`${API_URL}/chat`, {
          message: '', // Empty message
          model: 'gpt-3.5-turbo'
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.equal(400);
      }
    });

    it('should reject invalid model', async () => {
      try {
        await axios.post(`${API_URL}/chat`, {
          message: 'Test message',
          model: 'invalid-model'
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.equal(400);
      }
    });
  });

  // Test models endpoint
  describe('Models Endpoint', () => {
    it('should return available models', async () => {
      const response = await axios.get(`${API_URL}/models`);
      expect(response.data).to.have.property('models');
      expect(response.data.models).to.be.an('array');
      expect(response.data.models).to.have.lengthOf(2);
      expect(response.data.models[0]).to.have.property('id');
      expect(response.data.models[0]).to.have.property('name');
    });
  });
}); 