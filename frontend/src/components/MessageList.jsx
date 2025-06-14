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
 * - Auto-scroll to latest message (future implementation)
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
const MessageList = ({ messages = [] }) => {
  if (!messages.length) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-base md:text-sm">
        No messages yet. Start a conversation!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-[85%] md:max-w-[70%] px-4 py-2 rounded-2xl shadow text-base md:text-sm whitespace-pre-line break-words
            ${msg.role === 'user' ? 'self-end bg-blue-100 text-blue-900 border border-blue-200' : 'self-start bg-gray-100 text-gray-800 border border-gray-200'}`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
