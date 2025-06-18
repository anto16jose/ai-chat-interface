/**
 * @file MessageList.jsx
 * @description Displays the list of chat messages with user/assistant styling.
 * Implements responsive design with different message bubble styles for user and assistant.
 * Handles empty state and provides a clean interface for message display.
 *
 * @component MessageList
 * @requires React
 *
 * @features
 * - Responsive message bubbles
 * - Different styling for user vs assistant messages
 * - Empty state handling
 * - Auto-scroll to latest message
 * - Smooth animations for new messages
 *
 * @props
 * @param {Array<Object>} messages - Array of message objects
 * @param {string} messages[].role - Message role ('user' or 'assistant')
 * @param {string} messages[].content - Message content text
 * @param {boolean} isLoading - Whether a message is being loaded
 *
 * @example
 * ```jsx
 * <MessageList messages={[
 *   { role: 'user', content: 'Hello!' },
 *   { role: 'assistant', content: 'Hi there!' }
 * ]} isLoading={false} />
 * ```
 */
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const renderUserMessage = (content) =>
  content.split(/(\s+)/).map((word, idx) =>
    word.length > 20
      ? <span key={idx} className="break-all">{word}</span>
      : word
  );

const MessageBubble = ({ message, index }) => {
  const isUser = message.role === 'user';
  const animationDelay = index * 100; // Stagger animations

  return (
    <div
      className={`max-w-[85%] md:max-w-[70%] min-w-[4rem] px-4 py-2 rounded-2xl shadow text-base md:text-sm break-words
        transform transition-all duration-300 animate-bounce-in
        ${isUser
          ? 'self-end bg-blue-100 text-blue-900 border border-blue-200'
          : 'self-start bg-gray-100 text-gray-800 border border-gray-200'
        }`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div>
        {isUser
          ? <span className="inline-block break-words">{renderUserMessage(message.content)}</span>
          : <ReactMarkdown>{message.content}</ReactMarkdown>
        }
      </div>
      {message.usage && (
        <div className="mt-2 text-xs opacity-75">
          <div>Tokens: {message.usage.totalTokens} (prompt: {message.usage.promptTokens}, completion: {message.usage.completionTokens})</div>
          <div>Cost: ${typeof message.usage.cost === 'number' ? message.usage.cost.toFixed(6) : 'N/A'}</div>
        </div>
      )}
    </div>
  );
};

const EmptyState = () => (
  <div className="h-full flex flex-col items-center justify-center text-gray-400 text-base md:text-sm space-y-2 animate-fade-in">
    <svg
      className="w-12 h-12 text-gray-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
    <p>No messages yet. Start a conversation!</p>
  </div>
);

const MessageList = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current && typeof messagesEndRef.current.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!messages.length) {
    return <EmptyState />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-4 ${
              message.role === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <MessageBubble message={message} index={index} />
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
