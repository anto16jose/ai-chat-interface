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
    <div className="flex flex-col gap-1 w-full">
      <div className="relative">
        <textarea
          className="w-full min-h-[44px] max-h-32 resize-y rounded-xl border border-gray-300 p-3 pr-20 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 transition"
          placeholder="Type your message..."
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          maxLength={maxLength}
        />
        <button
          className="absolute bottom-3 right-3 bg-blue-600 text-white px-4 py-1.5 rounded-lg font-semibold shadow hover:bg-blue-700 disabled:bg-blue-300 transition"
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span className="text-gray-400">{input.length}/{maxLength} characters</span>
        {error && <span className="text-red-500 font-medium">{error}</span>}
      </div>
    </div>
  );
};

export default MessageInput; 