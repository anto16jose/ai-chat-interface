/**
 * App.jsx
 * Root component of the application.
 * 
 * @component
 * @returns {JSX.Element} The rendered application
 */
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ChatInterface />
    </div>
  );
}

export default App;
