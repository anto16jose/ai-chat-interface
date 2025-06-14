/**
 * @file ChatInterface.jsx
 * @description Main container component for the AI Chat Interface application.
 * Handles layout, state management, and integration of all chat UI components.
 * Implements responsive design with mobile-first approach using Tailwind CSS.
 *
 * @component ChatInterface
 * @requires React
 * @requires MessageList
 * @requires MessageInput
 * @requires SettingsPanel
 * @requires useChat
 *
 * @features
 * - Responsive layout (mobile: stack, desktop: sidebar)
 * - Settings panel (mobile: drawer, desktop: sidebar)
 * - Real-time chat interface
 * - Loading and error states
 * - Demo mode support
 *
 * @state
 * - drawerOpen: boolean - Controls mobile settings drawer visibility
 *
 * @props
 * None - Uses useChat hook for state management
 *
 * @example
 * ```jsx
 * <ChatInterface />
 * ```
 */
import { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import SettingsPanel from './SettingsPanel';
import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useChat from '../hooks/useChat';

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
);

const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
    <div className="bg-white px-8 py-6 rounded-xl shadow-2xl flex flex-col items-center space-y-4">
      <LoadingSpinner />
      <p className="text-lg font-medium text-gray-700">Processing your request...</p>
    </div>
  </div>
);

const ErrorMessage = ({ message, onDismiss }) => (
  <div
    className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg z-50 cursor-pointer transform transition-all duration-300 hover:scale-105"
    onClick={onDismiss}
    role="alert"
  >
    <div className="flex items-center space-x-2">
      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
      <p>{message}</p>
    </div>
  </div>
);

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({
    apiKey: '',
    model: 'gpt-3.5-turbo',
    demoMode: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          model: settings.model,
          apiKey: settings.apiKey,
          demoMode: settings.demoMode
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.content,
        usage: data.usage
      }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>
      {error && (
        <div className="p-4 bg-red-100 text-red-700">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
      <SettingsPanel settings={settings} onSettingsChange={setSettings} />
    </div>
  );
};

export default ChatInterface;
