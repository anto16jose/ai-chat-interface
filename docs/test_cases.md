# Manual Test Cases for AI Chat Interface

This document provides a comprehensive set of manual test cases for the AI Chat Interface. Each test case describes a user action and the expected result, covering all features, edge cases, and assignment requirements.

---

## Initial Load & Layout

| Action | Expected Result |
|--------|----------------|
| Open the application in a browser | The chat interface loads, showing an empty message list and a visible settings button. |
| Resize browser to mobile width | Layout adapts to mobile view (stacked layout, settings as drawer). |
| Resize browser to desktop width | Layout adapts to desktop view (sidebar layout, settings as sidebar). |

---

## Settings Management

| Action | Expected Result |
|--------|----------------|
| Open settings panel | Settings panel appears (drawer on mobile, sidebar on desktop). |
| Enter a valid OpenAI API key | Key is accepted for chat. |
| Select 'GPT-3.5-turbo' model | Model is set; subsequent chats use GPT-3.5-turbo. |
| Select 'GPT-4' model | Model is set; subsequent chats use GPT-4. |
| Toggle 'Demo Mode' ON | Demo mode is enabled; chat works without API key. |
| Toggle 'Demo Mode' OFF | Demo mode is disabled; API key is required for chat. |
| Close settings panel | Settings panel disappears; main chat interface is visible. |

---

## Chat Functionality

| Action | Expected Result |
|--------|----------------|
| Enter a message and click 'Send' | Message appears in chat; loading indicator shows; response appears after a short delay. |
| Press 'Enter' in message input | Message is sent (unless Shift+Enter is held for newline). |
| Press 'Shift+Enter' in message input | New line is added to the message input. |
| Submit empty message | Send button is disabled or error shown; message is not sent. |
| Attempt to write more than 500 characters in the message input | Input is restricted to 500 characters; cannot exceed limit. |

---

## Message List

| Action | Expected Result |
|--------|----------------|
| Send multiple messages | All messages appear in order; chat auto-scrolls to latest message. |
| Open chat with no messages | Empty state is shown (e.g., 'No messages yet'). |
| Send/receive messages with markdown (e.g., code blocks) | Markdown is rendered correctly in message bubbles. |

---

## Demo Mode

| Action | Expected Result |
|--------|----------------|
| Enable demo mode and send a message | Simulated default response is shown; no API key required. |

> **Note:** Demo mode always returns the default response, regardless of prompt type.

---

## Export Chat Transcript

| Action | Expected Result |
|--------|----------------|
| Send several messages, then click 'Export Chat' | Download prompt appears; exported file contains full chat transcript. |
| Export chat with no messages | Exported file is an empty .txt file. |

---

## Security & Privacy

| Action | Expected Result |
|--------|----------------|
| Inspect network requests | API key is never sent to frontend or exposed in network tab. |

---

## Responsive Design

| Action | Expected Result |
|--------|----------------|
| Test all features on mobile viewport | All features work; layout is mobile-friendly. |
| Test all features on desktop viewport | All features work; layout is desktop-friendly. |

---

## Edge Cases

| Action | Expected Result |
|--------|----------------|
| Open/close settings repeatedly | No UI glitches or errors. |
| Switch models during active chat | New model is used for subsequent messages. |
| Toggle demo mode during active chat | Demo mode is enabled/disabled immediately; chat continues to work. |

---

**Instructions:**
- Perform each action and verify the expected result.
- Report any deviations or bugs for correction.
- This checklist ensures full coverage of all user-facing features, error handling, and assignment requirements. 