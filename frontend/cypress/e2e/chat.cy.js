describe('Chat Interface E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('completes a full chat interaction', () => {
    // Check initial state
    cy.get('[data-testid="chat-input"]').should('be.visible');
    cy.get('[data-testid="send-button"]').should('be.visible');
    cy.get('[data-testid="settings-button"]').should('be.visible');

    // Open settings and configure API key
    cy.get('[data-testid="settings-button"]').click();
    cy.get('[data-testid="api-key-input"]').type('test-api-key');
    cy.get('[data-testid="save-settings"]').click();

    // Send a message
    cy.get('[data-testid="chat-input"]').type('Hello, AI!');
    cy.get('[data-testid="send-button"]').click();

    // Verify message appears in chat
    cy.get('[data-testid="message-list"]')
      .should('contain', 'Hello, AI!')
      .and('contain', 'assistant'); // Should contain AI response

    // Verify message input is cleared
    cy.get('[data-testid="chat-input"]').should('have.value', '');
  });

  it('handles demo mode correctly', () => {
    // Enable demo mode
    cy.get('[data-testid="settings-button"]').click();
    cy.get('[data-testid="demo-mode-toggle"]').click();
    cy.get('[data-testid="save-settings"]').click();

    // Send message in demo mode
    cy.get('[data-testid="chat-input"]').type('Demo mode test');
    cy.get('[data-testid="send-button"]').click();

    // Verify demo response
    cy.get('[data-testid="message-list"]')
      .should('contain', 'Demo mode test')
      .and('contain', '[Demo Mode]'); // Should indicate demo response
  });

  it('handles errors gracefully', () => {
    // Try to send message without API key
    cy.get('[data-testid="chat-input"]').type('Test without API key');
    cy.get('[data-testid="send-button"]').click();

    // Should show error message
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'API key');
  });

  it('maintains chat history during session', () => {
    // Send multiple messages
    const messages = ['First message', 'Second message', 'Third message'];
    
    messages.forEach(message => {
      cy.get('[data-testid="chat-input"]').type(message);
      cy.get('[data-testid="send-button"]').click();
    });

    // Verify all messages are in history
    messages.forEach(message => {
      cy.get('[data-testid="message-list"]').should('contain', message);
    });
  });
}); 