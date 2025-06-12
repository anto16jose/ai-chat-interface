/**
 * ChatInterface.jsx
 * Main container for the AI Chat Interface app.
 * Handles layout, state, and integration of all chat UI components.
 */
import { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import SettingsPanel from './SettingsPanel';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [demoMode, setDemoMode] = useState(false);

  const handleSendMessage = (text) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white shadow-sm px-4 py-3 md:px-8 md:py-4 border-b border-gray-200">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">AI Chat Interface</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:flex-row md:items-stretch max-w-5xl w-full mx-auto md:mt-8 md:rounded-xl md:shadow-lg md:bg-white md:overflow-hidden">
        {/* Chat Area - Mobile: full, Desktop: 2/3 */}
        <section className="flex-1 flex flex-col h-full md:w-2/3 bg-white md:bg-transparent">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-2 py-4 sm:px-4 md:px-6">
            <MessageList messages={messages} />
          </div>
          {/* Input */}
          <div className="border-t border-gray-200 px-2 py-3 sm:px-4 md:px-6 bg-white">
            <MessageInput onSend={handleSendMessage} isLoading={isLoading} />
          </div>
        </section>

        {/* Settings Panel - Mobile: hidden, Desktop: sidebar */}
        <aside className="hidden md:flex md:flex-col md:w-1/3 border-l border-gray-100 bg-gray-50 p-6">
          <SettingsPanel
            apiKey={apiKey}
            onApiKeyChange={setApiKey}
            model={model}
            onModelChange={setModel}
            demoMode={demoMode}
            onDemoModeToggle={() => setDemoMode((v) => !v)}
          />
        </aside>
      </main>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg text-lg font-medium">Loading...</div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg z-50">
          {error}
        </div>
      )}
    </div>
  );
};

export default ChatInterface; 