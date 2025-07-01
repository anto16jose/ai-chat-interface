# Design Choices & Changes to Proposal

## Initial Proposal (Phase 1)

This conceptual design document presents an **AI Chat Interface** application targeting developers, students, and professionals who require secure AI assistance while maintaining complete data privacy and API cost control. The application provides a ChatGPT-like interface where users supply their own OpenAI API keys, ensuring conversations never pass through third-party services.

**Technical Architecture:**
- **Frontend:** React 18 with Vite, Tailwind CSS for responsive design
- **Backend:** Node.js with Express
- **Security:** Secure proxy pattern—API keys handled only by the backend, never exposed to frontend or stored permanently

**Dynamic Aspects:**
1. **Real-time Chat Interface:** Interactive messaging, markdown rendering, responsive adaptation
2. **Settings Management:** API key validation with real-time feedback, model selection (GPT-3.5-turbo/GPT-4), demo mode toggle

**Demo Mode:** Enables tutor evaluation without requiring actual API keys, ensuring the application is fully functional for assessment.

This architecture satisfies all portfolio requirements: frontend-backend communication, responsive design, dynamic functionality, and professional security practices.

---

## Changes Based on Phase 1 Feedback

**Feedback Summary:**
- Architecture diagram should follow a standard notation (C4 model recommended)
- Dynamic aspects must include frontend-backend communication (not just frontend interactivity)

**Actions Taken:**
- The architecture diagram was revised to better align with the C4 container diagram style, clarifying system boundaries and communication flows.
- Explicitly ensured and documented that both dynamic aspects (chat and settings management) involve frontend-backend communication, not just frontend state changes.

---

## Changes Based on Phase 2 Feedback

**Feedback Summary:**
- No backlinks allowed in C4 diagrams
- Design choices are sufficient, but changes to the proposal must be explicitly stated
- Settings management is not considered a dynamic aspect unless it communicates with the backend
- Provide test cases and data
- Presentation filename and screencast improvements suggested

**Actions Taken:**
- Reviewed and updated the architecture diagram to remove any backlinks, ensuring compliance with C4 standards
- This document was created to explicitly state changes to the proposal, as required
- Clarified in documentation that settings management includes backend communication (API key validation endpoint)
- Added/expanded test cases and data in the project documentation and test files
- Updated presentation filename and included suggestions for screencast improvements in project notes

---

## Changes to Proposal: (Explicit Statement)

All changes made were in response to feedback regarding documentation clarity, diagram standards, and explicit communication of dynamic aspects. No fundamental changes were made to the core technical or functional proposal. The initial concept, architecture, and feature set remain as originally proposed, with improvements in documentation and compliance with academic standards.

**If further changes are made in the future, they will be documented in this section.** 