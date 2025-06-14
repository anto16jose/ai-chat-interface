/**
 * @file MessageInput.jsx
 * @description User input component for sending chat messages.
 * Implements a responsive textarea with character limit, loading states,
 * and keyboard shortcuts (Enter to send, Shift+Enter for new line).
 *
 * @component MessageInput
 * @requires React
 *
 * @features
 * - Responsive textarea with auto-resize
 * - Character limit with counter
 * - Enter/Shift+Enter handling
 * - Loading state support
 * - Error message display
 * - Send button with disabled states
 *
 * @props
 * @param {Function} onSend - Callback function when message is sent
 * @param {boolean} isLoading - Whether input should be disabled
 * @param {number} [maxLength=500] - Maximum character limit
 *
 * @state
 * @param {string} input - Current input value
 * @param {string} error - Error message if any
 *
 * @example
 * ```jsx
 * <MessageInput
 *   onSend={(message) => console.log(message)}
 *   isLoading={false}
 *   maxLength={500}
 * />
 * ```
 */
import { useState } from 'react';

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
);

const MessageInput = ({ onSend, isLoading, maxLength = 500 }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setInput(e.target.value);
      setError('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!input.trim()) {
      setError('Message cannot be empty.');
      return;
    }
    if (onSend) {
      onSend(input.trim());
      setInput('');
      setError('');
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="relative">
        <textarea
          className={`w-full min-h-[44px] max-h-32 resize-y rounded-xl border p-3 pr-20 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
            isLoading
              ? 'border-gray-200 bg-gray-50 text-gray-500'
              : 'border-gray-300 bg-white text-text-primary'
          }`}
          placeholder={isLoading ? 'Processing your message...' : 'Type your message...'}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          maxLength={maxLength}
        />
        <button
          className={`absolute bottom-3 right-3 px-4 py-1.5 rounded-lg font-semibold shadow transition-all duration-200 flex items-center justify-center min-w-[80px] ${
            isLoading
              ? 'bg-blue-300 cursor-not-allowed'
              : !input.trim()
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }`}
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          aria-label={isLoading ? 'Sending message...' : 'Send message'}
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <span className="text-white">Send</span>
          )}
        </button>
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span className={`transition-colors duration-200 ${
          input.length === maxLength ? 'text-red-500' : 'text-gray-400'
        }`}>
          {input.length}/{maxLength} characters
        </span>
        {error && (
          <span className="text-red-500 font-medium animate-fade-in">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
