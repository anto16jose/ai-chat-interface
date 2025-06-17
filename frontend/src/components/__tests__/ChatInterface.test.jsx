import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatInterface from '../ChatInterface';
import { server, http, HttpResponse } from '../../test/setup';

describe('ChatInterface', () => {
  const mockMessages = [
    { role: 'user', content: 'Hello' },
    { role: 'assistant', content: 'Hi there!' }
  ];

  it('renders chat interface with initial state', () => {
    render(<ChatInterface />);
    
    // Check for essential UI elements
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
  });

  it('handles message submission', async () => {
    const user = userEvent.setup();
    server.use(
      http.post('/api/chat', () => {
        return HttpResponse.json({ 
          message: { role: 'assistant', content: 'Test response' }
        });
      })
    );

    render(<ChatInterface />);

    // Enable demo mode
    const settingsButton = screen.getByRole('button', { name: /settings/i });
    await user.click(settingsButton);
    const demoToggle = screen.getByLabelText(/demo mode/i);
    await user.click(demoToggle);
    // Close settings panel (if needed)
    if (screen.queryByRole('dialog')) {
      const closeButton = screen.getByRole('button', { name: /close settings/i });
      await user.click(closeButton);
    }

    const input = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button', { name: /send/i });

    await user.type(input, 'Test message');
    await user.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
    // Match the actual demo response string
    expect(await screen.findByText(/This is a demo response\. In the full version, this would be a response from gpt-3\.5-turbo\./i)).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    const user = userEvent.setup();
    server.use(
      http.post('/api/chat', () => {
        return HttpResponse.json({ error: 'API Error' }, { status: 500 });
      })
    );

    render(<ChatInterface />);
    
    const input = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button', { name: /send/i });

    await user.type(input, 'Test message');
    await user.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('toggles settings panel', async () => {
    const user = userEvent.setup();
    render(<ChatInterface />);
    
    const settingsButton = screen.getByRole('button', { name: /settings/i });
    await user.click(settingsButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('OpenAI API Key')).toBeInTheDocument();
    expect(screen.getByLabelText(/model/i)).toBeInTheDocument();
  });
}); 