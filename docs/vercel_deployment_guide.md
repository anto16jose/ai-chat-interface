# AI Chat Interface - Vercel Monorepo Deployment Guide

## Project Context

### Current Project State
- **Phase**: 2 (Development & Presentation)
- **Status**: Core functionality implemented, ready for deployment
- **Repository**: GitHub repository with full-stack React + Express application
- **Deployment Strategy**: **Monorepo** (recommended for academic projects)

### Technical Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express.js + OpenAI SDK
- **Testing**: Vitest (Frontend), Mocha (Backend), Cypress (E2E)
- **Development**: Node.js, npm, concurrently

### Current Implementation Status
1. **Frontend (✅ Complete)**
   - ChatInterface component with responsive design
   - MessageList with proper styling and auto-scroll
   - MessageInput with validation and submission
   - SettingsPanel with API key and model selection
   - Demo mode implementation
   - State management with custom hooks
   - API integration utilities

2. **Backend (✅ Complete)**
   - Express server with security middleware
   - API endpoints for chat, validation, and models
   - OpenAI integration with proper error handling
   - Demo mode responses
   - Rate limiting and CORS protection

## Why Monorepo Deployment?

### Advantages for Your Project:
1. **Simplified Management**: Single repository, single deployment pipeline
2. **Cost Effective**: One Vercel project instead of two
3. **Easier Environment Variables**: Centralized configuration
4. **Better for Academic Projects**: Simpler for evaluation and demonstration
5. **Your Current Setup**: Your `vercel.json` is already configured for monorepo deployment

## Current Vercel Configuration Analysis

Your existing `vercel.json` is correctly configured for monorepo deployment:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/$1"
    }
  ]
}
```

This configuration:
- Builds frontend from `frontend/package.json` using Vite
- Serves backend API from `backend/server.js`
- Routes `/api/*` requests to backend
- Routes all other requests to frontend

## Pre-Deployment Checklist

### 1. Code Preparation
- [ ] All code is committed to GitHub
- [ ] No sensitive data in code (API keys, etc.)
- [ ] Environment variables are properly configured
- [ ] Frontend API URL is set to relative path or environment variable
- [ ] Backend CORS is configured for production

### 2. Environment Variables Needed
Create these in Vercel dashboard after deployment:

**Frontend Environment Variables:**
```
VITE_API_URL=https://your-vercel-domain.vercel.app/api
```

**Backend Environment Variables:**
```
NODE_ENV=production
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

### 3. Required Updates Before Deployment

#### Update Frontend API Configuration
Your frontend currently uses `http://localhost:3000/api` as fallback. For production, update `frontend/src/hooks/useChat.js`:

```javascript
// Change this line:
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// To this (for production):
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
```

#### Update Backend CORS Configuration
Your backend CORS is already configured to use environment variables, which is perfect.

## Step-by-Step Deployment Process

### Step 1: Prepare Your Repository
1. **Ensure all code is committed:**
   ```bash
   git add .
   git commit -m "feat: prepare for Vercel deployment"
   git push origin main
   ```

2. **Verify your repository is public** (required for Vercel free tier)

### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Complete email verification

### Step 3: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)
1. **Import Project:**
   - Click "New Project" in Vercel dashboard
   - Select "Import Git Repository"
   - Choose your `ai-chat-interface` repository
   - Click "Import"

2. **Configure Project Settings:**
   - **Framework Preset**: Select "Other" (since it's a monorepo)
   - **Root Directory**: Leave as `/` (root)
   - **Build Command**: Leave empty (Vercel will use your `vercel.json`)
   - **Output Directory**: Leave empty (Vercel will use your `vercel.json`)
   - **Install Command**: `npm run install:all`

3. **Set Environment Variables:**
   - Click "Environment Variables" section
   - Add the following variables:
     ```
     VITE_API_URL = https://your-project-name.vercel.app/api
     NODE_ENV = production
     FRONTEND_URL = https://your-project-name.vercel.app
     ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (usually 2-3 minutes)

#### Option B: Deploy via Vercel CLI
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow prompts:**
   - Link to existing project or create new
   - Confirm settings
   - Set environment variables when prompted

### Step 4: Post-Deployment Configuration

#### Update Environment Variables
After deployment, update the `VITE_API_URL` with your actual domain:

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Update `VITE_API_URL` to your actual domain:
   ```
   VITE_API_URL = https://your-actual-domain.vercel.app/api
   ```
4. Redeploy the project

#### Verify Deployment
1. **Test Frontend:**
   - Visit your Vercel URL
   - Verify the chat interface loads
   - Test responsive design

2. **Test Backend:**
   - Visit `https://your-domain.vercel.app/api/chat`
   - Should return a 404 or error (not a connection error)

3. **Test Demo Mode:**
   - Enable demo mode in settings
   - Send a test message
   - Verify demo response works

4. **Test API Integration:**
   - Enter a valid OpenAI API key
   - Send a test message
   - Verify real API integration works

## Vercel Dashboard Actions Required

### 1. Project Settings
- **Domain**: Your project will get a `.vercel.app` domain
- **Custom Domain**: Optional - you can add a custom domain later
- **Team**: Ensure you're in the correct team/account

### 2. Environment Variables
Navigate to **Settings** → **Environment Variables** and add:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_API_URL` | `https://your-domain.vercel.app/api` | Production |
| `NODE_ENV` | `production` | Production |
| `FRONTEND_URL` | `https://your-domain.vercel.app` | Production |

### 3. Build Settings
- **Framework Preset**: Other
- **Build Command**: (leave empty - uses vercel.json)
- **Output Directory**: (leave empty - uses vercel.json)
- **Install Command**: `npm run install:all`

### 4. Functions Settings
- **Node.js Version**: 18.x (recommended)
- **Max Duration**: 10 seconds (default)
- **Memory**: 1024 MB (default)

### 5. Security Settings
- **Password Protection**: Disabled (for public access)
- **CORS**: Already configured in your backend

## Testing Your Deployment

### 1. Basic Functionality Tests
- [ ] Frontend loads without errors
- [ ] Responsive design works on mobile
- [ ] Settings panel opens and closes
- [ ] Demo mode toggle works
- [ ] API key input accepts valid keys

### 2. Chat Functionality Tests
- [ ] Demo mode sends responses
- [ ] Real API mode works with valid key
- [ ] Error handling displays properly
- [ ] Message history persists during session
- [ ] Clear chat functionality works

### 3. API Endpoint Tests
- [ ] `/api/chat` responds correctly
- [ ] `/api/validate-key` validates keys
- [ ] Rate limiting works
- [ ] CORS headers are present
- [ ] Security headers are set

### 4. Performance Tests
- [ ] Page loads within 3 seconds
- [ ] API responses are under 5 seconds
- [ ] No console errors
- [ ] Mobile performance is acceptable

## Troubleshooting Common Issues

### 1. Build Failures
**Problem**: Build fails during deployment
**Solution**:
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify `npm run install:all` works locally

### 2. API Connection Issues
**Problem**: Frontend can't connect to backend
**Solution**:
- Verify `VITE_API_URL` environment variable is set correctly
- Check that backend routes are working
- Ensure CORS is configured properly

### 3. Environment Variables Not Working
**Problem**: Environment variables not accessible
**Solution**:
- Redeploy after setting environment variables
- Check variable names match exactly
- Verify environment (Production/Preview) is correct

### 4. CORS Errors
**Problem**: Browser shows CORS errors
**Solution**:
- Verify `FRONTEND_URL` environment variable is set
- Check backend CORS configuration
- Ensure frontend and backend are on same domain

## Assignment Requirements Compliance

### Critical Features Verified:
- [x] Two dynamic aspects (Chat + Settings)
- [x] Responsive design
- [x] Frontend-backend communication
- [x] Working application (not mockups)
- [x] Demo mode for evaluation
- [x] GitHub repository
- [x] Documentation

### Presentation Requirements:
- [x] Live demo capability
- [x] Demo mode for evaluators
- [x] Responsive design showcase
- [x] Security measures explanation
- [x] Architecture overview

## Next Steps After Deployment

### 1. Documentation Updates
- [ ] Update README.md with deployment URL
- [ ] Add deployment instructions
- [ ] Document environment variables
- [ ] Create user guide

### 2. Testing & Validation
- [ ] Run all tests in production environment
- [ ] Verify demo mode works for evaluators
- [ ] Test error scenarios
- [ ] Check responsive design on various devices

### 3. Presentation Preparation
- [ ] Prepare live demo script
- [ ] Document security measures
- [ ] Create architecture slides
- [ ] Record demo video

### 4. Monitoring Setup
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking
- [ ] Monitor API usage
- [ ] Track performance metrics

## Support Resources

### Vercel Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Guide](https://vercel.com/docs/cli)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)

### Project Resources
- [GitHub Repository](your-repo-url)
- [Project README](README.md)
- [Development Guide](instructions/)

### Contact & Support
- Vercel Support: [support.vercel.com](https://support.vercel.com)
- GitHub Issues: Use your repository's issue tracker
- Project Documentation: Check `docs/` directory

---

**Note**: This deployment guide is specifically tailored for your AI Chat Interface project and assumes monorepo deployment. For separate frontend/backend deployments, refer to Vercel's official documentation for more complex setups. 