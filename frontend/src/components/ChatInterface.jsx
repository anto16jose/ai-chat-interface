/**
 * ChatInterface.jsx
 * Main container component for the chat application.
 * Handles the overall layout and state management for the chat interface.
 * 
 * @component
 * @returns {JSX.Element} The rendered chat interface component
 */
import { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatInterface = () => {
  // State management for messages and settings
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = (text) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-semibold text-gray-800">AI Chat Interface</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Chat Area - Takes full width on mobile, 2/3 on desktop */}
        <div className="flex-1 flex flex-col h-full md:w-2/3">
          {/* Messages will go here */}
          <div className="flex-1 overflow-y-auto p-4">
            <MessageList messages={messages} />
          </div>

          {/* Input area will go here */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <MessageInput onSend={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>

        {/* Settings Panel - Hidden on mobile, 1/3 on desktop */}
        <div className="hidden md:block w-1/3 border-l border-gray-200 bg-white p-4">
          <div className="text-gray-500">Settings panel will go here</div>
        </div>
      </main>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">Loading...</div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default ChatInterface; 