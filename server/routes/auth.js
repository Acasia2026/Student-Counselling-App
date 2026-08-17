const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-cbt-counseling-key-2026';

// Helper: Secure Password Hashing using Node.js crypto pbkdf2
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

// Helper: Verify Password Hash
function verifyPassword(password, storedPasswordHash) {
  if (!storedPasswordHash || !storedPasswordHash.includes(':')) return false;
  const [salt, originalHash] = storedPasswordHash.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === originalHash;
}

// Mock User Database Store (Synced with Prisma Schema)
const usersStore = [
  {
    id: 'usr-001',
    name: 'Dr. Evelyn Vance',
    email: 'superadmin@platform.edu',
    passwordHash: hashPassword('SuperAdmin#2026'),
    role: 'SUPERADMIN',
    schoolId: null,
    schoolName: 'Global Platform',
    status: 'ACTIVE',
    isVerified: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-002',
    name: 'Rajesh Malhotra',
    email: 'admin@stxavier.edu.in',
    passwordHash: hashPassword('SchoolAdmin#2026'),
    role: 'SCHOOL_ADMIN',
    schoolId: 'sch-101',
    schoolName: 'St. Xavier International Academy',
    status: 'ACTIVE',
    isVerified: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-003',
    name: 'Vikram Seth',
    email: 'teacher@stxavier.edu.in',
    passwordHash: hashPassword('TeacherPass#2026'),
    role: 'TEACHER',
    schoolId: 'sch-101',
    schoolName: 'St. Xavier International Academy',
    status: 'ACTIVE',
    isVerified: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-004',
    name: 'Aarav Sharma',
    email: 'student@stxavier.edu.in',
    passwordHash: hashPassword('StudentPass#2026'),
    role: 'STUDENT',
    schoolId: 'sch-101',
    schoolName: 'St. Xavier International Academy',
    status: 'ACTIVE',
    isVerified: true,
    parentConsent: true,
    createdAt: new Date().toISOString()
  }
];

// Helper: Get Role-Based Redirection Target
function getRedirectPath(role) {
  switch (role) {
    case 'SUPERADMIN':
      return '/';
    case 'SCHOOL_ADMIN':
      return '/admin/dashboard';
    case 'TEACHER':
      return '/teacher/classes';
    case 'STUDENT':
      return '/student/brain-lab';
    default:
      return '/';
  }
}

// -------------------------------------------------------------
// 1. POST /api/v1/auth/signup
// -------------------------------------------------------------
router.post('/signup', (req, res) => {
  try {
    const { name, email, password, role, schoolCode, parentConsent } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

    const selectedRole = role || 'STUDENT';

    // Security restriction: Public signup for Admin roles is prohibited
    if (['SUPERADMIN', 'SCHOOL_ADMIN'].includes(selectedRole)) {
      return res.status(403).json({
        error: 'Public registration for Admin roles is disabled. School Admin accounts are provisioned exclusively by Superadmin.'
      });
    }

    // Mandatory COPPA/FERPA check for Students
    if (selectedRole === 'STUDENT' && !parentConsent) {
      return res.status(400).json({ error: 'Parental / Guardian COPPA consent is required for student accounts.' });
    }

    // Check duplicate email
    const existing = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ error: 'An account with this email address already exists.' });
    }

    const newUser = {
      id: `usr-${Date.now().toString().slice(-6)}`,
      name,
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
      role: selectedRole,
      schoolId: schoolCode ? `sch-${schoolCode}` : 'sch-101',
      schoolName: schoolCode ? `School (${schoolCode})` : 'St. Xavier International Academy',
      status: 'ACTIVE',
      isVerified: true,
      parentConsent: Boolean(parentConsent),
      createdAt: new Date().toISOString()
    };

    usersStore.push(newUser);

    // Issue JWT Token
    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role, schoolId: newUser.schoolId, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set HTTP-Only Cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    const redirectUrl = getRedirectPath(newUser.role);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        schoolId: newUser.schoolId,
        schoolName: newUser.schoolName
      },
      redirectTo: redirectUrl
    });
  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ error: 'Internal Server Error during registration.' });
  }
});

// -------------------------------------------------------------
// 2. POST /api/v1/auth/login
// -------------------------------------------------------------
router.post('/login', (req, res) => {
  try {
    const { email, password, portalType } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ error: 'Invalid email or password credentials.' });
    }

    if (user.status === 'SUSPENDED') {
      return res.status(403).json({ error: 'Your account has been suspended. Please contact your administrator.' });
    }

    // Role portal validation
    if (portalType === 'ADMIN' && !['SUPERADMIN', 'SCHOOL_ADMIN'].includes(user.role)) {
      return res.status(403).json({ error: 'Access denied: Admin credentials required for this portal.' });
    }

    // Update last login
    user.lastLogin = new Date().toISOString();

    // Issue JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role, schoolId: user.schoolId, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set HTTP-Only Cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    const redirectUrl = getRedirectPath(user.role);

    return res.json({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId,
        schoolName: user.schoolName
      },
      redirectTo: redirectUrl
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ error: 'Internal Server Error during authentication.' });
  }
});

// -------------------------------------------------------------
// 3. POST /api/v1/auth/logout
// -------------------------------------------------------------
router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, path: '/' });
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// -------------------------------------------------------------
// 4. POST /api/v1/auth/forgot-password
// -------------------------------------------------------------
router.post('/forgot-password', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email address is required.' });

    const user = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
    const resetToken = crypto.randomBytes(32).toString('hex');
    if (user) {
      user.resetToken = resetToken;
      user.resetTokenExpires = new Date(Date.now() + 3600000).toISOString();
    }

    return res.json({
      success: true,
      message: 'If an account exists with that email, a password reset link has been dispatched.',
      demoToken: resetToken
    });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return res.status(500).json({ error: 'Failed to process request.' });
  }
});

// -------------------------------------------------------------
// 5. GET /api/v1/auth/me
// -------------------------------------------------------------
router.get('/me', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.token;
    const token = (authHeader && authHeader.startsWith('Bearer ')) ? authHeader.split(' ')[1] : cookieToken;

    if (!token) {
      return res.status(401).json({ authenticated: false, error: 'No authorization token provided.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = usersStore.find(u => u.id === decoded.userId);

    if (!user) {
      return res.status(404).json({ authenticated: false, error: 'User not found.' });
    }

    return res.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId,
        schoolName: user.schoolName
      }
    });
  } catch (error) {
    return res.status(401).json({ authenticated: false, error: 'Invalid or expired session token.' });
  }
});

module.exports = router;
