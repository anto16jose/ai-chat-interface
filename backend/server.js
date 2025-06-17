/**
 * @file server.js
 * @description Main Express server for the AI Chat Interface backend.
 * Handles API endpoints, middleware, and security features.
 *
 * @module server
 * @requires dotenv
 * @requires express
 * @requires cors
 * @requires helmet
 * @requires express-rate-limit
 *
 * @features
 * - Security middleware (CORS, Helmet, Rate Limiting)
 * - Request logging (development only)
 * - Error handling
 * - Graceful shutdown
 *
 * @security
 * - CORS protection with specific origin
 * - Helmet security headers
 * - Rate limiting per IP
 * - Request size limiting
 * - Error message sanitization
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Import routes
const chatRoutes = require('./routes/chat');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173', // Vite default port
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null, // Vercel deployment
    process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : null // Vercel preview deployments
  ].filter(Boolean), // Remove null values
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting configuration
// Prevents abuse by limiting requests per IP address
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Body parsing with size limit
// Prevents large payload attacks
app.use(express.json({ limit: '1mb' })); // Limit payload size

// Request logging (development only)
// Provides detailed request information for debugging
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// API Routes
app.use('/api', chatRoutes);

// Global error handling middleware
// Provides consistent error responses and logging
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : err.message
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown handlers
// Ensures proper cleanup on unexpected errors

// Handle uncaught exceptions
// Prevents server from hanging on unhandled errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
// Prevents server from hanging on unhandled promises
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = app; // For testing purposes
