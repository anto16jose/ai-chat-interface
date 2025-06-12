/**
 * MessageList.jsx
 * Displays the list of chat messages with user/assistant styling.
 * Handles empty state and auto-scroll (future).
 *
 * @component
 * @param {Object} props
 * @param {Array} props.messages - Array of message objects {role, content}
 * @returns {JSX.Element}
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