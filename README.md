# AI Chat Interface

[![University](https://img.shields.io/badge/University-IU%20International%20University-blue)](https://iu.org)
[![Course](https://img.shields.io/badge/Course-DLBCSPJWD01-green)](https://github.com/NikVince/ai-chat-interface)
[![Assignment](https://img.shields.io/badge/Assignment-Portfolio%20Project-orange)](https://github.com/NikVince/ai-chat-interface)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Phase](https://img.shields.io/badge/Development%20Phase-3%20of%203-green)](https://github.com/NikVince/ai-chat-interface)
[![Grade](https://img.shields.io/badge/Academic%20Grade-99%2F100-brightgreen)](https://github.com/NikVince/ai-chat-interface)

## 📚 Academic Context

This project was developed as part of the **Project Java and Web Development (DLBCSPJWD01)** portfolio assignment at **IU International University**. The assignment followed a structured three-phase approach designed to demonstrate comprehensive understanding of modern full-stack web development principles.

**🎓 Academic Achievement: 99/100 Grade**
This project successfully demonstrated mastery of full-stack web development, achieving the highest possible score in the course evaluation.

---

## 🏗️ Architecture Overview

```
ai-chat-interface/
├── backend/                  # Express API server
│   ├── middleware/           # Express middleware (e.g., validation)
│   ├── routes/               # API route definitions (e.g., chat.js)
│   ├── utils/                # Backend utilities (e.g., openai.js)
│   ├── test/                 # Backend test helpers and route tests
│   ├── tests/                # (empty/reserved for future tests)
│   ├── node_modules/         # Backend dependencies
│   ├── package.json          # Backend dependencies/config
│   └── server.js             # Main server file
├── frontend/                 # React + Vite + Tailwind frontend
│   ├── src/
│   │   ├── components/       # React components (ChatInterface, MessageList, etc.)
│   │   ├── hooks/            # Custom React hooks (useChat.js)
│   │   ├── utils/            # Frontend utility functions
│   │   ├── assets/           # Static assets (e.g., react.svg)
│   │   ├── test/             # Frontend test setup
│   │   ├── App.jsx           # Root component
│   │   ├── main.jsx          # Vite entry point
│   │   ├── App.css           # App-level styles (Tailwind only)
│   │   └── index.css         # Tailwind base styles
│   ├── public/               # Static public assets (favicons, manifest, etc.)
│   ├── cypress/              # E2E test setup (fixtures, support, e2e)
│   ├── dist/                 # Production build output
│   ├── node_modules/         # Frontend dependencies
│   ├── package.json          # Frontend dependencies/config
│   ├── tailwind.config.js    # Tailwind CSS config
│   ├── vite.config.js        # Vite config
│   ├── vitest.config.js      # Vitest config
│   ├── postcss.config.cjs    # PostCSS config
│   └── README.md             # Frontend-specific documentation
├── docs/                     # Project documentation (design, tests, deployment)
├── docs_assignement/         # Assignment transcript and requirements
├── docs_phase3/              # Phase 3 deliverables (abstract, screencast, etc.)
├── instructions/             # Project instructions and checklists
├── .github/                  # GitHub workflows and templates
├── .vercel/                  # Vercel deployment config
├── node_modules/             # Root dependencies (if any)
├── package.json              # Root dependencies/config
├── package-lock.json         # Root lockfile
├── vercel.json               # Vercel monorepo deployment config
├── env.example               # Example environment variables
├── LICENSE                   # License file
└── README.md                 # Main project documentation
```

- **Backend:** Node.js, Express.js. RESTful API, modular middleware, secure proxy for OpenAI, input validation, and rate limiting. All API endpoints are defined in `backend/routes/`.
- **Frontend:** React 18, Vite, Tailwind CSS. Functional components, custom hooks, mobile-first responsive design, and all UI logic in `frontend/src/`.
- **Testing:**
  - **Frontend:** Unit tests (Vitest), E2E structure (Cypress)
  - **Backend:** API and route tests (Mocha, helpers)
- **Documentation:** All design, test, and deployment docs in `/docs`. Assignment and requirements in `/docs_assignement`. Phase 3 deliverables in `/docs_phase3`.
- **Deployment:** Monorepo setup for Vercel, with configuration in `vercel.json` and `.vercel/`.

> **For the architecture diagram and detailed design choices, see [docs/design_choices_and_changes.md](docs/design_choices_and_changes.md).**

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

## 🚀 Features (Summary)

- Real-time chat interface with OpenAI integration
- Settings management (API key, model selection)
- **Demo mode** for evaluation without API key
- Responsive design (mobile-first)
- Secure API key handling (never exposed to frontend)
- Error handling and loading states
- Rate limiting and CORS protection
- **Export Chat Transcript** (dynamic frontend-backend feature)

> **For a full feature list and rationale, see [docs/design_choices_and_changes.md](docs/design_choices_and_changes.md).**

---

## 🧪 Testing (Summary)

- **Frontend:** Unit tests with Vitest & React Testing Library
  ```bash
  cd frontend
  npm run test
  ```
- **Backend:** API tests with Mocha & Sinon
  ```bash
  cd backend
  npm test
  ```
- **Manual Test Plan:** See [docs/test_cases.md](docs/test_cases.md) for comprehensive manual test cases covering all user actions, features, error cases, demo mode, settings, export, and accessibility.

---

## 🧑‍💻 Demo Mode

- **Purpose:** Allows full evaluation of the chat interface without an OpenAI API key.
- **How to Use:** Toggle "Demo Mode" in the settings panel. All chat features will work with simulated responses.
- **Note:** Demo mode always returns the same default response, regardless of the type of input message.

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

> **For full compliance details and rationale, see [docs/design_choices_and_changes.md](docs/design_choices_and_changes.md).**

---

## 📖 Documentation & Further Reading

- [Design Choices & Changes to Proposal](docs/design_choices_and_changes.md)
- [Manual Test Cases](docs/test_cases.md)
- [Vercel Deployment Guide](docs/vercel_deployment_guide.md)

---

## 📦 Submission & Finalization

- **Final submission (Phase 3) has been completed and includes:**
  - This repository (all code, docs, and installation instructions)
  - A 2-page abstract (available in `/docs_phase3`)
  - A screencast video (available in `/docs_phase3`)
  - Zipped folder structure as per assignment requirements

> **All Phase 3 deliverables have been successfully completed and submitted.**

---



---

## 📝 Academic Integrity

This project represents original work completed as part of the IU International University curriculum, achieving a 99/100 grade. All external resources, libraries, and references are properly documented and attributed according to academic standards.
