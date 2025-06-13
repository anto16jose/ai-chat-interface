import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInterface } from '../ChatInterface';
import { server } from '../../test/setup';
import { rest } from 'msw';

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
      rest.post('/api/chat', (req, res, ctx) => {
        return res(ctx.json({ 
          message: { role: 'assistant', content: 'Test response' }
        }));
      })
    );

    render(<ChatInterface />);
    
    const input = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button', { name: /send/i });

    await user.type(input, 'Test message');
    await user.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
      expect(screen.getByText('Test response')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    const user = userEvent.setup();
    server.use(
      rest.post('/api/chat', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'API Error' }));
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
    expect(screen.getByLabelText(/api key/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/model/i)).toBeInTheDocument();
  });

  it('validates API key input', async () => {
    const user = userEvent.setup();
    server.use(
      rest.post('/api/validate-key', (req, res, ctx) => {
        const { apiKey } = req.body;
        return res(ctx.json({ 
          valid: apiKey === 'valid-key',
          message: apiKey === 'valid-key' ? 'Valid key' : 'Invalid key'
        }));
      })
    );

    render(<ChatInterface />);
    
    // Open settings
    const settingsButton = screen.getByRole('button', { name: /settings/i });
    await user.click(settingsButton);

    const apiKeyInput = screen.getByLabelText(/api key/i);
    const saveButton = screen.getByRole('button', { name: /save/i });

    // Test invalid key
    await user.type(apiKeyInput, 'invalid-key');
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid key/i)).toBeInTheDocument();
    });

    // Test valid key
    await user.clear(apiKeyInput);
    await user.type(apiKeyInput, 'valid-key');
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/valid key/i)).toBeInTheDocument();
    });
  });
}); 