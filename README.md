# AI Chat Interface

[![University](https://img.shields.io/badge/University-IU%20International%20University-blue)](https://iu.org)
[![Course](https://img.shields.io/badge/Course-DLBCSPJWD01-green)](https://github.com/NikVince/ai-chat-interface)
[![Assignment](https://img.shields.io/badge/Assignment-Portfolio%20Project-orange)](https://github.com/NikVince/ai-chat-interface)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Phase](https://img.shields.io/badge/Development%20Phase-2%20of%203-yellow)](https://github.com/NikVince/ai-chat-interface)

## 📚 Academic Context

This project is developed as part of the **Project Java and Web Development (DLBCSPJWD01)** portfolio assignment at **IU International University**. The assignment follows a structured three-phase approach designed to demonstrate comprehensive understanding of modern full-stack web development principles.

### 🎯 Assignment Overview

**Student:** Nikolas Daniel Vincenti  
**Course:** DLBCSPJWD01 - Project Java and Web Development  
**Assignment Type:** Portfolio Project (3 Phases)  
**Academic Year:** 2025  

### 📋 Project Scope

The assignment requires developing a **functioning web application** that demonstrates:

- **Frontend Development**: Responsive user interface using modern frameworks
- **Backend Integration**: Server-side communication and API handling
- **Dynamic Functionality**: Interactive features and real-time user interaction
- **Security Implementation**: Best practices for secure web development
- **Documentation**: Professional code documentation and architecture explanation

## 🔍 Project Concept

### Privacy-First AI Chat Interface

This application addresses the growing need for **secure AI assistance** while maintaining complete user privacy and cost transparency. Unlike traditional AI chat services, users provide their own OpenAI API keys, ensuring:

- ✅ **Complete Privacy**: No conversations stored on third-party servers
- ✅ **Cost Control**: Direct API usage with transparent pricing
- ✅ **Security**: API keys handled through secure proxy patterns
- ✅ **Flexibility**: Model selection (GPT-3.5-turbo, GPT-4) based on user needs

### 🎯 Target Audience

- **Developers** seeking coding assistance with privacy guarantees
- **Students** requiring educational support without data concerns  
- **Professionals** needing AI-powered content creation with cost control

## 🏗️ Technical Requirements

### Core Technologies
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Integration**: OpenAI API
- **Security**: Secure API proxy implementation

### Assignment Criteria
- ✅ **Two Dynamic Aspects**: Real-time chat + Settings management
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✅ **Frontend-Backend Communication**: RESTful API integration
- ✅ **Code Documentation**: Professional development standards
- ✅ **Architecture Documentation**: Technical decision explanations

## 📚 Learning Objectives

This project demonstrates mastery of:

### Technical Skills
- **Modern React Development**: Functional components, hooks, state management
- **Backend API Design**: Express.js routing, middleware, security implementation
- **Full-Stack Integration**: Frontend-backend communication patterns
- **Security Best Practices**: API key handling, input validation, rate limiting
- **Responsive Web Design**: Mobile-first development with utility frameworks

### Professional Skills
- **Project Planning**: Three-phase development methodology
- **Documentation**: Technical writing and code documentation
- **Version Control**: Git workflow and GitHub repository management
- **Presentation**: Technical communication and demo preparation

## 🚀 Development Phases

### Phase 1: Conception ✅
- **Deliverable**: 1-page conceptual design document
- **Focus**: Architecture planning, technology selection, user requirements
- **Status**: Completed

### Phase 2: Development & Presentation 🔄
- **Deliverable**: 10-slide presentation + GitHub repository + 2-min demo
- **Focus**: Core implementation, documentation, working prototype
- **Status**: In Progress (MVP Complete)
  - ✅ Core chat functionality implemented
  - ✅ Settings management working
  - ✅ Demo mode available for evaluation
  - ✅ Responsive design implemented
  - 🔄 Documentation in progress
  - 🔄 Presentation materials pending
  - 🔄 Final testing and polish needed

### Phase 3: Finalization 📋
- **Deliverable**: 2-page abstract + final submission + complete documentation
- **Focus**: Optimization, final testing, comprehensive documentation
- **Status**: Pending

## 🎓 Educational Value

This project serves as a **capstone experience** integrating knowledge from multiple areas:

- **Software Engineering**: Architecture design, code organization, testing
- **Web Technologies**: Modern framework usage, responsive design, API integration
- **Security**: Authentication patterns, secure communication, data protection
- **Project Management**: Agile methodology, documentation, presentation skills

## 📝 Academic Evaluation

The project is evaluated based on:
- **Problem Solving** (10%): Clear scope and technical approach
- **Methodology** (20%): Architecture decisions and technology choices  
- **Implementation Quality** (40%): Code quality, documentation, functionality
- **Creativity** (20%): Solution originality and objective fulfillment
- **Formal Requirements** (10%): Submission compliance and documentation

## 🤝 Academic Integrity

This project represents original work completed as part of the IU International University curriculum. All external resources, libraries, and references are properly documented and attributed according to academic standards.

---

**Note**: This README will be updated throughout the development phases to include implementation details, setup instructions, and deployment guidelines as the project progresses.

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
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend && npm install
   
   # Install backend dependencies
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
   - Frontend: http://localhost:5173 (or next available port)
   - Backend: http://localhost:3000

### Environment Variables
Create a `.env` file in the backend directory with:
```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🎯 Current Features

### Core Functionality
- ✅ Real-time chat interface with OpenAI integration
- ✅ Settings management (API key, model selection)
- ✅ Demo mode for evaluation without API key
- ✅ Responsive design (mobile-first)
- ✅ Secure API key handling

### Technical Implementation
- ✅ React functional components with hooks
- ✅ Express backend with security middleware
- ✅ RESTful API communication
- ✅ Error handling and loading states
- ✅ Rate limiting and CORS protection

### User Experience
- ✅ Mobile-first responsive design
- ✅ Intuitive chat interface
- ✅ Settings persistence
- ✅ Clear error messages
- ✅ Loading state indicators

## 📝 Documentation Status

### Completed
- ✅ Component documentation (JSDoc)
- ✅ API endpoint documentation
- ✅ Security implementation notes
- ✅ Basic README structure

### In Progress
- 🔄 Comprehensive installation guide
- 🔄 Architecture documentation
- 🔄 API documentation
- 🔄 Presentation materials

### Pending
- 📋 Final technical abstract
- 📋 Deployment guide
- 📋 Testing documentation
- 📋 User guide

<!-- Trigger static-only Vercel redeploy after vercel.json rename -->
# Test commit to trigger CI/CD pipeline

# Second test commit after reconnecting to GitHub
