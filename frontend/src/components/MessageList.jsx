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
 *
 * @example
 * ```jsx
 * <MessageList messages={[
 *   { role: 'user', content: 'Hello!' },
 *   { role: 'assistant', content: 'Hi there!' }
 * ]} />
 * ```
 */
import { useEffect, useRef } from 'react';

const MessageBubble = ({ message, index }) => {
  const isUser = message.role === 'user';
  const animationDelay = index * 100; // Stagger animations

  return (
    <div
      className={`max-w-[85%] md:max-w-[70%] px-4 py-2 rounded-2xl shadow text-base md:text-sm whitespace-pre-line break-words
        transform transition-all duration-300 animate-bounce-in
        ${isUser
          ? 'self-end bg-blue-100 text-blue-900 border border-blue-200'
          : 'self-start bg-gray-100 text-gray-800 border border-gray-200'
        }`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {message.content}
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

const MessageList = ({ messages = [] }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!messages.length) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} index={idx} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
