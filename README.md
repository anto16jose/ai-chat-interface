# AI Chat Interface

[![University](https://img.shields.io/badge/University-IU%20International%20University-blue)](https://iu.org)
[![Course](https://img.shields.io/badge/Course-DLBCSPJWD01-green)](https://github.com/NikVince/ai-chat-interface)
[![Assignment](https://img.shields.io/badge/Assignment-Portfolio%20Project-orange)](https://github.com/NikVince/ai-chat-interface)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Phase](https://img.shields.io/badge/Development%20Phase-2%20of%203-yellow)](https://github.com/NikVince/ai-chat-interface)

## 📚 Academic Context

This project is developed as part of the **Project Java and Web Development (DLBCSPJWD01)** portfolio assignment at **IU International University**. The assignment follows a structured three-phase approach designed to demonstrate comprehensive understanding of modern full-stack web development principles.

---

## 🏗️ Architecture Overview

```
ai-chat-interface/
├── frontend/                 # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── hooks/           # Custom React hooks  
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Root component
│   │   └── main.jsx         # Vite entry point
├── backend/                 # Express API server
│   ├── routes/              # API route definitions
│   ├── middleware/          # Express middleware
│   ├── utils/               # Backend utilities
│   └── server.js            # Main server file
├── docs/                    # Documentation
├── instructions/            # Project instructions (READ ONLY)
└── README.md               # Main project documentation
```

- **Frontend:** React 18, Vite, Tailwind CSS. All UI is mobile-first and responsive. Components are functional and use hooks for state management.
- **Backend:** Node.js, Express.js. RESTful API with security middleware (CORS, Helmet, rate limiting, input validation). Never exposes API keys to frontend.
- **Integration:** Frontend communicates with backend via REST API. Backend proxies requests to OpenAI securely.
- **Demo Mode:** All chat features work without an API key for evaluation.

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- OpenAI API key (optional, demo mode available)

### Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/NikVince/ai-chat-interface.git
   cd ai-chat-interface
   ```
2. Install dependencies:
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Create environment files:
   ```bash
   # In backend directory
   cp .env.example .env
   # Edit .env with your configuration
   ```
4. Start development servers:
   ```bash
   # From root directory
   npm run dev
   ```
5. Access the application:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

### Environment Variables
Create a `.env` file in the backend directory with:
```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## 🚀 Features

- Real-time chat interface with OpenAI integration
- Settings management (API key, model selection)
- **Demo mode** for evaluation without API key
- Responsive design (mobile-first)
- Secure API key handling (never exposed to frontend)
- Error handling and loading states
- Rate limiting and CORS protection
- **Export Chat Transcript:** Users can export their current chat session as a downloadable text file. This feature demonstrates dynamic frontend-backend interaction: the frontend requests the transcript from the backend, which generates the file in real time. This satisfies the assignment's requirement for a second dynamic aspect (beyond chat and settings).

---

## 🧪 Testing

### How to Run Tests

#### Frontend
- Uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/):
  ```bash
  cd frontend
  npm run test
  ```
- **Coverage:**
  - Main chat interface (`ChatInterface.jsx`) is tested for rendering, message submission, error handling, and settings toggling.
  - No direct tests for all other components or hooks yet.
  - No E2E (Cypress) tests present.

#### Backend
- Uses [Mocha](https://mochajs.org/) and [Sinon](https://sinonjs.org/):
  ```bash
  cd backend
  npm test
  ```
- **Coverage:**
  - API endpoints (`/api/chat`, `/api/validate-key`, `/api/models`) are tested for success, error, and validation scenarios.
  - No direct tests for all middleware/utilities in isolation.

#### Summary
- **Strengths:** Core chat flow and error handling are tested for both frontend and backend.
- **Limitations:** No full coverage for all components, hooks, or edge cases. No E2E tests. For academic/portfolio purposes, this is sufficient, but more tests are recommended for production.

---

## 🧑‍💻 Demo Mode

- **Purpose:** Allows full evaluation of the chat interface without an OpenAI API key.
- **How to Use:** Toggle "Demo Mode" in the settings panel. All chat features will work with simulated responses.
- **Scenarios Covered:**
  - Coding help
  - General knowledge
  - Error handling
  - Different conversation flows
- **Note:** Demo mode is critical for assignment evaluation and is available on first launch.

---

## ✅ Assignment Compliance Checklist

- [x] Two dynamic aspects: Real-time chat + **Export Chat transcript** (frontend-backend communication)
- [x] Responsive design: Mobile-first with Tailwind CSS
- [x] Frontend-backend communication: RESTful API
- [x] Functioning application: NOT mockups - actually works
- [x] Demo mode: Tutors can evaluate without API keys
- [x] GitHub repository: Professional, complete, public
- [x] Security: API keys never exposed to frontend
- [x] Documentation: JSDoc, README, architecture
- [x] Error handling: User-friendly messages, loading states
- [x] Quality gates: All core requirements tested and documented

---

## 📖 Known Limitations & Future Improvements

- Add more unit and integration tests (components, hooks, backend utilities)
- Implement E2E tests (Cypress)
- Add error boundaries for all React components
- Auto-save settings and chat history (session-based)
- Improve accessibility (a11y) and ARIA labels
- Add TypeScript types for stricter type safety
- Polish UI/UX for edge cases and animations
- Expand documentation (user guide, deployment)

---

## 🤝 Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change. Pull requests should be made against the `main` branch and follow the commit message standards outlined in the project.

---

## 📝 Academic Integrity

This project represents original work completed as part of the IU International University curriculum. All external resources, libraries, and references are properly documented and attributed according to academic standards.

---

## 📄 Design Choices & Changes to Proposal

For a detailed record of the initial project proposal, all design choices, and explicit documentation of any changes made in response to feedback, please see:

[docs/design_choices_and_changes.md](docs/design_choices_and_changes.md)

This file fulfills academic requirements for transparency and traceability of project evolution across all phases.
