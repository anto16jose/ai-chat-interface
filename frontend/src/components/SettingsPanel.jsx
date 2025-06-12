/**
 * SettingsPanel.jsx
 * Panel for API key input, model selection, and demo mode toggle.
 * Responsive: sidebar on desktop, drawer on mobile.
 *
 * @component
 * @param {Object} props
 * @param {string} props.apiKey - Current API key
 * @param {function} props.onApiKeyChange - Handler for API key change
 * @param {string} props.model - Current model
 * @param {function} props.onModelChange - Handler for model change
 * @param {boolean} props.demoMode - Demo mode enabled
 * @param {function} props.onDemoModeToggle - Handler for demo mode toggle
 * @returns {JSX.Element}
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
}) => {
  const [showKey, setShowKey] = useState(false);
  const [keyError, setKeyError] = useState('');

  const handleKeyChange = (e) => {
    const value = e.target.value;
    onApiKeyChange(value);
    if (value && !/^sk-[A-Za-z0-9]{20,}$/.test(value)) {
      setKeyError('Invalid API key format.');
    } else {
      setKeyError('');
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto md:mx-0">
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">OpenAI API Key</label>
        <div className="relative flex items-center">
          <input
            type={showKey ? 'text' : 'password'}
            className="w-full rounded-lg border border-gray-300 p-2 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:bg-gray-100"
            placeholder="sk-..."
            value={apiKey}
            onChange={handleKeyChange}
            autoComplete="off"
            disabled={demoMode}
          />
          <button
            type="button"
            className="absolute right-2 text-xs text-primary-600 hover:underline font-semibold"
            onClick={() => setShowKey((v) => !v)}
            tabIndex={-1}
          >
            {showKey ? 'Hide' : 'Show'}
          </button>
        </div>
        {keyError && <div className="text-xs text-red-500 mt-1 font-medium">{keyError}</div>}
        {demoMode && <div className="text-xs text-primary-600 mt-1 font-medium">Demo mode enabled: API key disabled</div>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Model</label>
        <select
          className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:bg-gray-100"
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
        <label className="font-semibold text-xs text-gray-600">Demo Mode</label>
        <button
          type="button"
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 outline-none ring-2 ring-primary-200 ${demoMode ? 'bg-primary-500' : 'bg-gray-300'}`}
          onClick={onDemoModeToggle}
          aria-pressed={demoMode}
        >
          <span
            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${demoMode ? 'translate-x-6' : ''}`}
          />
        </button>
        <span className="text-xs text-gray-400">(Try the app without an API key)</span>
      </div>
    </div>
  );
};

export default SettingsPanel; 