const express = require('express');
const router = express.Router();
const requireSchoolAdmin = require('../middleware/requireSchoolAdmin');
const crypto = require('crypto');

// Enforce requireSchoolAdmin middleware on ALL /api/v1/admin/staff/* endpoints
router.use(requireSchoolAdmin);

// In-Memory Mock Staff Store (backed by schoolId isolation)
let mockStaffDirectory = [
  {
    id: 'stf-201',
    schoolId: 'sch-101',
    firstName: 'Dr. Ananya',
    lastName: 'Rao',
    name: 'Dr. Ananya Rao',
    email: 'ananya.rao@stxavier.edu.in',
    phoneNumber: '+91 98765 43210',
    role: 'COUNSELOR',
    department: 'Student Wellness & Psychology',
    assignedClasses: ['Grade 10 Mental Health', 'Grade 12 Career Guidance'],
    status: 'ACTIVE',
    invitationToken: null,
    createdAt: '2025-02-10'
  },
  {
    id: 'stf-202',
    schoolId: 'sch-101',
    firstName: 'Vikram',
    lastName: 'Seth',
    name: 'Vikram Seth',
    email: 'v.seth@stxavier.edu.in',
    phoneNumber: '+91 98123 45678',
    role: 'TEACHER',
    department: 'Mathematics & STEM',
    assignedClasses: ['Grade 11-A Calculus', 'Grade 10-B Algebra'],
    status: 'ACTIVE',
    invitationToken: null,
    createdAt: '2025-03-15'
  },
  {
    id: 'stf-203',
    schoolId: 'sch-101',
    firstName: 'Meera',
    lastName: 'Deshmukh',
    name: 'Meera Deshmukh',
    email: 'meera.d@stxavier.edu.in',
    phoneNumber: '+91 97111 22233',
    role: 'COUNSELOR',
    department: 'Special Educational Needs (SEN)',
    assignedClasses: ['CHC Cognitive Profiling', 'Behavioral Support'],
    status: 'PENDING',
    invitationToken: 'inv_tok_998124_sec',
    createdAt: '2026-08-14'
  },
  {
    id: 'stf-204',
    schoolId: 'sch-101',
    firstName: 'Sunil',
    lastName: 'Kapoor',
    name: 'Sunil Kapoor',
    email: 'sunil.k@stxavier.edu.in',
    phoneNumber: '+91 96543 21098',
    role: 'TEACHER',
    department: 'Sciences & Physics',
    assignedClasses: ['Grade 12-Physics AP', 'Grade 9-Gen Science'],
    status: 'SUSPENDED',
    invitationToken: null,
    createdAt: '2025-06-01'
  },
  {
    id: 'stf-205',
    schoolId: 'sch-101',
    firstName: 'Pooja',
    lastName: 'Nair',
    name: 'Pooja Nair',
    email: 'pooja.nair@stxavier.edu.in',
    phoneNumber: '+91 98999 88877',
    role: 'TEACHER',
    department: 'Humanities & English',
    assignedClasses: ['Grade 10-A English Lit'],
    status: 'PENDING',
    invitationToken: 'inv_tok_443211_sec',
    createdAt: '2026-08-16'
  }
];

// -------------------------------------------------------------
// 1. GET /api/v1/admin/staff -> List all staff members for tenant
// -------------------------------------------------------------
router.get('/', (req, res) => {
  const { search, role, status } = req.query;
  const schoolId = req.user.schoolId || 'sch-101';

  let filtered = mockStaffDirectory.filter(s => s.schoolId === schoolId);

  if (search) {
    const q = search.toString().toLowerCase();
    filtered = filtered.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      (s.department && s.department.toLowerCase().includes(q))
    );
  }

  if (role && role !== 'ALL') {
    filtered = filtered.filter(s => s.role === role);
  }

  if (status && status !== 'ALL') {
    filtered = filtered.filter(s => s.status === status);
  }

  res.json({
    schoolId,
    total: filtered.length,
    pendingInvitesCount: filtered.filter(s => s.status === 'PENDING').length,
    staff: filtered
  });
});

// -------------------------------------------------------------
// 2. POST /api/v1/admin/staff -> Create single staff member
// -------------------------------------------------------------
router.post('/', (req, res) => {
  const { firstName, lastName, email, phoneNumber, role, department, assignedClasses } = req.body;

  if (!firstName || !lastName || !email || !role) {
    return res.status(400).json({ error: 'Missing required staff fields: firstName, lastName, email, role.' });
  }

  // Check duplicate email
  const existing = mockStaffDirectory.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: `Staff account with email ${email} already exists.` });
  }

  const invitationToken = 'inv_tok_' + crypto.randomBytes(8).toString('hex');
  const newStaff = {
    id: `stf-${Date.now().toString().slice(-4)}`,
    schoolId: req.user.schoolId || 'sch-101',
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email,
    phoneNumber: phoneNumber || '',
    role,
    department: department || 'General Education',
    assignedClasses: assignedClasses || [],
    status: 'PENDING',
    invitationToken,
    createdAt: new Date().toISOString().split('T')[0]
  };

  mockStaffDirectory.unshift(newStaff);

  res.status(201).json({
    message: `Staff member ${newStaff.name} created successfully. Activation email sent.`,
    staff: newStaff,
    activationUrl: `http://localhost:3000/activate?token=${invitationToken}`
  });
});

// -------------------------------------------------------------
// 3. POST /api/v1/admin/staff/bulk -> Bulk import staff from CSV
// -------------------------------------------------------------
router.post('/bulk', (req, res) => {
  const { records } = req.body; // Array of { firstName, lastName, email, role, department }

  if (!Array.isArray(records) || records.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty bulk import records payload.' });
  }

  const inserted = [];
  const errors = [];

  records.forEach((rec, index) => {
    if (!rec.email || !rec.firstName || !rec.role) {
      errors.push(`Row ${index + 1}: Missing required fields.`);
      return;
    }

    const existing = mockStaffDirectory.find(s => s.email.toLowerCase() === rec.email.toLowerCase());
    if (existing) {
      errors.push(`Row ${index + 1}: Email ${rec.email} already exists.`);
      return;
    }

    const token = 'inv_tok_' + crypto.randomBytes(8).toString('hex');
    const created = {
      id: `stf-${Date.now().toString().slice(-4)}-${index}`,
      schoolId: req.user.schoolId || 'sch-101',
      firstName: rec.firstName,
      lastName: rec.lastName || '',
      name: `${rec.firstName} ${rec.lastName || ''}`.trim(),
      email: rec.email,
      phoneNumber: rec.phoneNumber || '',
      role: rec.role.toUpperCase(),
      department: rec.department || 'General Education',
      assignedClasses: rec.assignedClasses || [],
      status: 'PENDING',
      invitationToken: token,
      createdAt: new Date().toISOString().split('T')[0]
    };

    mockStaffDirectory.unshift(created);
    inserted.push(created);
  });

  res.status(200).json({
    message: `Bulk import completed: ${inserted.length} accounts provisioned.`,
    insertedCount: inserted.length,
    errorCount: errors.length,
    inserted,
    errors
  });
});

// -------------------------------------------------------------
// 4. PATCH /api/v1/admin/staff/:id/status -> Update status
// -------------------------------------------------------------
router.patch('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['ACTIVE', 'PENDING', 'SUSPENDED'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be ACTIVE, PENDING, or SUSPENDED.' });
  }

  const staff = mockStaffDirectory.find(s => s.id === id);
  if (!staff) {
    return res.status(404).json({ error: 'Staff member not found.' });
  }

  staff.status = status;
  if (status === 'ACTIVE') {
    staff.invitationToken = null;
  }

  res.json({
    message: `Status for ${staff.name} updated to ${status}.`,
    staff
  });
});

// -------------------------------------------------------------
// 5. POST /api/v1/admin/staff/:id/resend-invite -> Resend email
// -------------------------------------------------------------
router.post('/:id/resend-invite', (req, res) => {
  const { id } = req.params;
  const staff = mockStaffDirectory.find(s => s.id === id);

  if (!staff) {
    return res.status(404).json({ error: 'Staff member not found.' });
  }

  staff.invitationToken = 'inv_tok_' + crypto.randomBytes(8).toString('hex');

  res.json({
    message: `Activation invitation email re-sent to ${staff.email}.`,
    invitationToken: staff.invitationToken,
    activationUrl: `http://localhost:3000/activate?token=${staff.invitationToken}`
  });
});

// -------------------------------------------------------------
// 6. DELETE /api/v1/admin/staff/:id -> Remove staff record
// -------------------------------------------------------------
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = mockStaffDirectory.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Staff member not found.' });
  }

  const removed = mockStaffDirectory.splice(index, 1)[0];

  res.json({
    message: `Staff member ${removed.name} removed successfully.`,
    removed
  });
});

module.exports = router;
