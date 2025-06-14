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
  // Use the chat hook for state management and API communication
  const {
    messages,
    isLoading,
    error,
    apiKey,
    model,
    demoMode,
    setApiKey,
    setModel,
    setDemoMode,
    sendMessage,
    clearChat,
    clearError,
    toggleDemoMode,
    validateKeyWithBackend
  } = useChat();

  // Local UI state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handle API key change with validation
  const handleApiKeyChange = async (newKey) => {
    setApiKey(newKey);
    if (newKey && !demoMode) {
      await validateKeyWithBackend(newKey);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white shadow-sm px-4 py-3 md:px-8 md:py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">AI Chat Interface</h1>
        {/* Settings button for mobile */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors duration-200"
          aria-label="Open settings"
          onClick={() => setDrawerOpen(true)}
        >
          <Cog6ToothIcon className="h-6 w-6 text-gray-700" />
        </button>
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
            <MessageInput onSend={sendMessage} isLoading={isLoading} />
          </div>
        </section>

        {/* Settings Panel - Desktop sidebar */}
        <aside className="hidden md:flex md:flex-col md:w-1/3 border-l border-gray-100 bg-gray-50 p-6">
          <SettingsPanel
            apiKey={apiKey}
            onApiKeyChange={handleApiKeyChange}
            model={model}
            onModelChange={setModel}
            demoMode={demoMode}
            onDemoModeToggle={toggleDemoMode}
          />
        </aside>
      </main>

      {/* Mobile Settings Drawer */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          drawerOpen ? 'bg-opacity-30' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-label="Close settings drawer"
        tabIndex={-1}
      />
      <div
        className={`fixed top-0 right-0 h-full w-11/12 max-w-xs bg-white shadow-lg z-50 flex flex-col p-6 transition-transform duration-300 transform ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
          <button
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors duration-200"
            aria-label="Close settings"
            onClick={() => setDrawerOpen(false)}
          >
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <SettingsPanel
          apiKey={apiKey}
          onApiKeyChange={handleApiKeyChange}
          model={model}
          onModelChange={setModel}
          demoMode={demoMode}
          onDemoModeToggle={toggleDemoMode}
        />
      </div>

      {/* Loading and Error States */}
      {isLoading && <LoadingOverlay />}
      {error && <ErrorMessage message={error} onDismiss={clearError} />}
    </div>
  );
};

export default ChatInterface;
