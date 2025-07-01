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
import { Cog6ToothIcon, XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
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
  // Use the unified chat hook for all state and handlers
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
    clearError,
    toggleDemoMode,
    demoUsage
  } = useChat();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handler for sending a message
  const handleSend = (content) => {
    sendMessage(content);
  };

  // Calculate real and demo session costs
  const realCost = messages
    .filter(m => m.role === 'assistant' && m.usage && typeof m.usage.cost === 'number' && m.demo === false)
    .reduce((sum, m) => sum + m.usage.cost, 0);
  const demoCost = messages
    .filter(m => m.role === 'assistant' && m.usage && typeof m.usage.cost === 'number' && m.demo === true)
    .reduce((sum, m) => sum + m.usage.cost, 0);

  // SettingsPanel props
  const settingsPanelProps = {
    apiKey,
    onApiKeyChange: setApiKey,
    model,
    onModelChange: setModel,
    demoMode,
    onDemoModeToggle: toggleDemoMode,
    realCost,
    demoCost
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col md:flex-row">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex md:flex-col md:w-80 bg-white border-r border-gray-200 shadow-lg h-screen p-6 fixed top-0 left-0 z-30">
        <h2 className="text-xl font-bold text-blue-700 mb-6 tracking-tight">Settings</h2>
        <SettingsPanel {...settingsPanelProps} />
      </aside>
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full md:ml-80">
        {/* Header Bar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 w-full z-40">
          <span className="text-2xl font-bold text-blue-700 tracking-tight">GPT Chat</span>
          <div className="flex items-center space-x-2">
            {/* Export Chat button */}
            <button
              className="p-2 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={async () => {
                try {
                  const res = await fetch('/api/export');
                  const blob = await res.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'chat.txt';
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);
                } catch (err) {
                  alert('Failed to export chat.');
                }
              }}
              aria-label="Export chat transcript"
              title="Export chat transcript"
            >
              <ArrowDownTrayIcon className="h-7 w-7 text-blue-600" />
            </button>
            {/* Settings button (mobile) */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open settings"
            >
              <Cog6ToothIcon className="h-7 w-7 text-blue-600" />
            </button>
          </div>
        </header>
        {/* Chat area */}
        <main className="flex-1 flex flex-col justify-between bg-gradient-to-br from-white to-blue-50 pt-[72px] md:pt-[72px]">
          <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
            <MessageList messages={messages} isLoading={isLoading} />
          </div>
          <div className="px-4 pb-6 md:px-8 md:pb-8">
            <MessageInput onSend={handleSend} isLoading={isLoading} />
          </div>
        </main>
        {/* Error message (floating) */}
        {error && (
          <div className="fixed bottom-6 right-6 z-50 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg cursor-pointer animate-fade-in"
            onClick={clearError}
            role="alert"
          >
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>
      {/* Settings Drawer (Mobile) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          ></div>
          {/* Drawer panel */}
          <aside 
            className="relative ml-auto w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col animate-slide-in p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close settings"
            >
              <XMarkIcon className="h-6 w-6 text-blue-600" />
            </button>
            <h2 id="settings-title" className="text-xl font-bold text-blue-700 mb-6 mt-6 tracking-tight">Settings</h2>
            <SettingsPanel {...settingsPanelProps} />
          </aside>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
