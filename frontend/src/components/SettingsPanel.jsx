/**
 * @file SettingsPanel.jsx
 * @description Settings panel component for managing API key, model selection, and demo mode.
 * Implements responsive design with form validation and secure API key handling.
 *
 * @component SettingsPanel
 * @requires React
 *
 * @features
 * - API key input with show/hide toggle
 * - Model selection dropdown (GPT-3.5-turbo, GPT-4)
 * - Demo mode toggle switch
 * - Real-time API key validation
 * - Responsive layout
 *
 * @props
 * @param {string} apiKey - Current OpenAI API key
 * @param {Function} onApiKeyChange - Handler for API key changes
 * @param {string} model - Currently selected model
 * @param {Function} onModelChange - Handler for model changes
 * @param {boolean} demoMode - Whether demo mode is enabled
 * @param {Function} onDemoModeToggle - Handler for demo mode toggle
 * @param {number} realCost - Total session cost
 * @param {number} demoCost - Demo session cost
 *
 * @state
 * @param {boolean} showKey - Whether to show API key in plain text
 * @param {string} keyError - API key validation error message
 *
 * @example
 * ```jsx
 * <SettingsPanel
 *   apiKey="sk-..."
 *   onApiKeyChange={(key) => console.log(key)}
 *   model="gpt-3.5-turbo"
 *   onModelChange={(model) => console.log(model)}
 *   demoMode={false}
 *   onDemoModeToggle={() => console.log('Toggle demo mode')}
 *   realCost={0}
 *   demoCost={0}
 * />
 * ```
 */
import { useState } from 'react';

const MODELS = [
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'gpt-4', label: 'GPT-4' },
];

const SettingsPanel = ({
  apiKey = '',
  onApiKeyChange = () => {},
  model = 'gpt-3.5-turbo',
  onModelChange = () => {},
  demoMode = false,
  onDemoModeToggle = () => {},
  realCost = 0,
  demoCost = 0,
}) => {
  const [showKey, setShowKey] = useState(false);
  const [keyError, setKeyError] = useState('');

  const handleKeyChange = (e) => {
    const value = e.target.value;
    onApiKeyChange(value);
    if (value && !/^sk-[a-zA-Z0-9-_]{20,}$/.test(value)) {
      setKeyError('Invalid API key format.');
    } else {
      setKeyError('');
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto md:mx-0">
      <div>
        <label htmlFor="api-key-input" className="block text-xs font-semibold text-gray-600 mb-1">OpenAI API Key</label>
        <div className="relative flex items-center">
          <input
            id="api-key-input"
            type={showKey ? 'text' : 'password'}
            className="w-full rounded-lg border border-gray-300 p-2 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 text-text-primary placeholder-text-primary placeholder:text-text-primary"
            placeholder="sk-..."
            value={apiKey}
            onChange={handleKeyChange}
            autoComplete="off"
            disabled={demoMode}
          />
          <button
            type="button"
            className="absolute right-2 text-xs text-blue-600 hover:underline font-semibold"
            onClick={() => setShowKey((v) => !v)}
            tabIndex={-1}
          >
            {showKey ? 'Hide' : 'Show'}
          </button>
        </div>
        {keyError && <div className="text-xs text-red-500 mt-1 font-medium">{keyError}</div>}
        {demoMode && <div className="text-xs text-blue-600 mt-1 font-medium">Demo mode enabled: API key disabled</div>}
      </div>

      <div>
        <label htmlFor="model-select" className="block text-xs font-semibold text-gray-600 mb-1">Model</label>
        <select
          id="model-select"
          className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 text-text-primary"
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
          disabled={demoMode}
        >
          {MODELS.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <label htmlFor="demo-mode-toggle" className="font-semibold text-xs text-gray-600">Demo Mode</label>
        <button
          id="demo-mode-toggle"
          type="button"
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 outline-none ring-2 ring-blue-200 ${demoMode ? 'bg-blue-500' : 'bg-gray-300'}`}
          onClick={onDemoModeToggle}
          aria-pressed={demoMode}
        >
          <span
            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${demoMode ? 'translate-x-6' : ''}`}
          />
        </button>
        <span className="text-xs text-gray-400">(Try the app without an API key)</span>
      </div>

      <div className="mt-4 text-xs text-gray-700 font-semibold">
        Real API session cost: <span className="text-blue-700">${realCost.toFixed(6)}</span>
      </div>
      <div className="mt-1 text-xs text-gray-700 font-semibold">
        Demo session cost: <span className="text-blue-700">${demoCost.toFixed(6)}</span>
      </div>
    </div>
  );
};

export default SettingsPanel;
