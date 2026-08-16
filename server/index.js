require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const superadminRoutes = require('./routes/superadmin');

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// 1. Helmet HTTP Security Headers
app.use(helmet({
  contentSecurityPolicy: false, // CSP managed at edge / Next.js
  crossOriginResourcePolicy: { policy: 'same-site' }
}));

// 2. Strict CORS Configuration
app.use(cors({
  origin: [CORS_ORIGIN, 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-superadmin-key', 'x-demo-role'],
  credentials: true
}));

// 3. Request Body Parsing Controls (Prevent Payload Flooding)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 4. Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    service: 'Multi-Tenant Student Counseling Superadmin Engine',
    timestamp: new Date().toISOString()
  });
});

// 5. Mount RBAC Protected Superadmin Routes
app.use('/api/v1/superadmin', superadminRoutes);

// 6. 404 Fallback Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

// 7. Global Error Sanitization Handler (Prevents leakage of internal stack traces in production)
app.use((err, req, res, next) => {
  console.error('[UNHANDLED ERROR]', err);
  const isDev = (process.env.NODE_ENV || 'development') === 'development';
  res.status(500).json({
    error: 'Internal Server Error',
    message: isDev ? err.message : 'An unexpected error occurred. Please contact system administrator.'
  });
});

app.listen(PORT, () => {
  console.log(`🔒 Secure Superadmin Engine running on port ${PORT}`);
  console.log(`🛡️  RBAC Enforced: ONLY role === 'SUPERADMIN' permitted on /api/v1/superadmin/*`);
  console.log(`🌐 CORS restricted to: ${CORS_ORIGIN}`);
});

module.exports = app;
