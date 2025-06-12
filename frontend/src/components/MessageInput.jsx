/**
 * MessageInput.jsx
 * User input area for sending chat messages.
 * Handles Enter/Shift+Enter, character limit, loading, and error states.
 *
 * @component
 * @param {Object} props
 * @param {function} props.onSend - Function to call with message string
 * @param {boolean} props.isLoading - Whether input should be disabled
 * @param {number} [props.maxLength=500] - Character limit
 * @returns {JSX.Element}
 */
import { useState } from 'react';

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
    <div className="flex flex-col gap-2">
      <div className="relative">
        <textarea
          className="w-full min-h-[48px] max-h-32 resize-y rounded-md border border-gray-300 p-2 pr-20 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          placeholder="Type your message..."
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          maxLength={maxLength}
        />
        <button
          className="absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded disabled:bg-blue-300"
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{input.length}/{maxLength} characters</span>
        {error && <span className="text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default MessageInput; 