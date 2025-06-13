/**
 * useChat.js
 * Custom hook for managing chat state and API communication.
 * Handles messages, settings, loading states, and API interactions.
 * 
 * @returns {Object} Chat interface state and functions
 */
import { useState, useCallback } from 'react';
import axios from 'axios';

// API endpoint configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Custom hook for chat functionality
 * @returns {Object} Chat state and functions
 */
const useChat = () => {
  // Message state
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Settings state
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [demoMode, setDemoMode] = useState(false);

  // Clear error state
  const clearError = useCallback(() => setError(null), []);

  // Clear chat history
  const clearChat = useCallback(() => {
    setMessages([]);
    clearError();
  }, [clearError]);

  // Toggle demo mode
  const toggleDemoMode = useCallback(() => {
    setDemoMode(prev => !prev);
    // Clear API key when entering demo mode
    if (!demoMode) {
      setApiKey('');
    }
    clearError();
  }, [demoMode, clearError]);

  // Validate API key format
  const validateApiKey = useCallback((key) => {
    return /^sk-[A-Za-z0-9]{20,}$/.test(key);
  }, []);

  // Send message to API
  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;

    // Add user message immediately
    const userMessage = { role: 'user', content: content.trim() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    clearError();

    try {
      if (demoMode) {
        // Simulate API delay in demo mode
        await new Promise(resolve => setTimeout(resolve, 1000));
        const demoResponse = {
          role: 'assistant',
          content: `This is a demo response. In the full version, this would be a response from ${model}.`
        };
        setMessages(prev => [...prev, demoResponse]);
      } else {
        if (!apiKey || !validateApiKey(apiKey)) {
          throw new Error('Please enter a valid OpenAI API key');
        }

        const response = await axios.post(`${API_BASE_URL}/chat`, {
          message: content.trim(),
          model,
          apiKey
        });

        const assistantMessage = {
          role: 'assistant',
          content: response.data.content
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to send message';
      setError(errorMessage);
      // Add error message to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${errorMessage}`,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, model, demoMode, validateApiKey, clearError]);

  // Validate API key with backend
  const validateKeyWithBackend = useCallback(async (key) => {
    if (!key || !validateApiKey(key)) return false;
    
    try {
      const response = await axios.post(`${API_BASE_URL}/validate-key`, { apiKey: key });
      return response.data.valid;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to validate API key');
      return false;
    }
  }, [validateApiKey]);

  return {
    // State
    messages,
    isLoading,
    error,
    apiKey,
    model,
    demoMode,

    // State setters
    setApiKey,
    setModel,
    setDemoMode,

    // Functions
    sendMessage,
    clearChat,
    clearError,
    toggleDemoMode,
    validateKeyWithBackend
  };
};

export default useChat; 