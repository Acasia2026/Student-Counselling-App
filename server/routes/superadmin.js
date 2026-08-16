const express = require('express');
const router = express.Router();
const requireSuperadmin = require('../middleware/requireSuperadmin');

// Enforce requireSuperadmin middleware on ALL /api/v1/superadmin/* endpoints
router.use(requireSuperadmin);

// -------------------------------------------------------------
// 1. KPI METRICS OVERVIEW
// -------------------------------------------------------------
router.get('/kpis', (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    metrics: [
      {
        id: 'total_schools',
        title: 'TOTAL SCHOOLS',
        value: '248',
        rawNumeric: 248,
        growth: '+12',
        growthType: 'numeric',
        trend: 'up',
        sparkline: [220, 226, 230, 235, 239, 244, 248]
      },
      {
        id: 'active_students',
        title: 'ACTIVE STUDENTS',
        value: '48,620',
        rawNumeric: 48620,
        growth: '+8.4%',
        growthType: 'percentage',
        trend: 'up',
        sparkline: [42000, 43500, 44800, 46000, 47200, 48000, 48620]
      },
      {
        id: 'active_teachers',
        title: 'ACTIVE TEACHERS',
        value: '3,842',
        rawNumeric: 3842,
        growth: '+6.2%',
        growthType: 'percentage',
        trend: 'up',
        sparkline: [3500, 3580, 3640, 3710, 3780, 3810, 3842]
      },
      {
        id: 'active_subscriptions',
        title: 'ACTIVE SUBSCRIPTIONS',
        value: '231',
        rawNumeric: 231,
        growth: '+9.1%',
        growthType: 'percentage',
        trend: 'up',
        sparkline: [200, 206, 212, 218, 222, 227, 231]
      },
      {
        id: 'monthly_revenue',
        title: 'MONTHLY REVENUE',
        value: '₹18.4L',
        rawNumeric: 1840000,
        growth: '+12.8%',
        growthType: 'percentage',
        trend: 'up',
        sparkline: [14.2, 15.0, 15.8, 16.5, 17.1, 17.8, 18.4]
      },
      {
        id: 'ai_sessions',
        title: 'AI SESSIONS',
        value: '1.24M',
        rawNumeric: 1240000,
        growth: '+18.5%',
        growthType: 'percentage',
        trend: 'up',
        sparkline: [0.85, 0.92, 0.99, 1.05, 1.12, 1.18, 1.24]
      }
    ]
  });
});

// -------------------------------------------------------------
// 2. VISUAL ANALYTICS: PLATFORM GROWTH CHART DATA
// -------------------------------------------------------------
router.get('/analytics/growth', (req, res) => {
  const period = req.query.period || '30D';
  
  let datasets = [];
  if (period === '7D') {
    datasets = [
      { date: 'Mon', schools: 242, students: 46800, teachers: 3720 },
      { date: 'Tue', schools: 243, students: 47100, teachers: 3750 },
      { date: 'Wed', schools: 244, students: 47500, teachers: 3780 },
      { date: 'Thu', schools: 245, students: 47900, teachers: 3800 },
      { date: 'Fri', schools: 246, students: 48200, teachers: 3820 },
      { date: 'Sat', schools: 247, students: 48450, teachers: 3835 },
      { date: 'Sun', schools: 248, students: 48620, teachers: 3842 }
    ];
  } else if (period === '1Y') {
    datasets = [
      { date: 'Jan', schools: 180, students: 32000, teachers: 2400 },
      { date: 'Mar', schools: 195, students: 36000, teachers: 2750 },
      { date: 'May', schools: 210, students: 40000, teachers: 3100 },
      { date: 'Jul', schools: 225, students: 43500, teachers: 3450 },
      { date: 'Sep', schools: 236, students: 46000, teachers: 3680 },
      { date: 'Nov', schools: 244, students: 47800, teachers: 3800 },
      { date: 'Dec', schools: 248, students: 48620, teachers: 3842 }
    ];
  } else {
    // Default 30D
    datasets = [
      { date: 'Week 1', schools: 236, students: 45200, teachers: 3610 },
      { date: 'Week 2', schools: 240, students: 46300, teachers: 3690 },
      { date: 'Week 3', schools: 244, students: 47500, teachers: 3760 },
      { date: 'Week 4', schools: 248, students: 48620, teachers: 3842 }
    ];
  }

  res.json({
    period,
    data: datasets
  });
});

// -------------------------------------------------------------
// 3. SUBSCRIPTION STATUS GAUGE / DONUT DATA
// -------------------------------------------------------------
router.get('/analytics/subscriptions', (req, res) => {
  res.json({
    totalLicenses: 248,
    activePaid: 231,
    pendingRenewal: 12,
    expired: 5,
    distribution: [
      { status: 'Active Subscriptions', count: 231, color: '#4F46E5', percentage: 93.1 },
      { status: 'Pending Renewal', count: 12, color: '#F59E0B', percentage: 4.8 },
      { status: 'Expired Licenses', count: 5, color: '#EF4444', percentage: 2.1 }
    ]
  });
});

// -------------------------------------------------------------
// 4. TENANT MANAGEMENT: SCHOOLS API
// -------------------------------------------------------------
let mockSchools = [
  { id: 'sch-101', name: 'St. Xavier International Academy', code: 'STX-DEL', domain: 'stxavier.edu.in', contactEmail: 'admin@stxavier.edu.in', status: 'ACTIVE', maxStudents: 2500, currentStudents: 2340, tier: 'ENTERPRISE', createdAt: '2025-01-15' },
  { id: 'sch-102', name: 'Oakridge Public School', code: 'OAK-BLR', domain: 'oakridge.edu.in', contactEmail: 'principal@oakridge.edu.in', status: 'ACTIVE', maxStudents: 1500, currentStudents: 1420, tier: 'PREMIUM', createdAt: '2025-03-20' },
  { id: 'sch-103', name: 'Greenwood High International', code: 'GWH-HYD', domain: 'greenwood.ac.in', contactEmail: 'info@greenwood.ac.in', status: 'ACTIVE', maxStudents: 3000, currentStudents: 2890, tier: 'ENTERPRISE', createdAt: '2025-05-10' },
  { id: 'sch-104', name: 'Delhi Public School Sector 45', code: 'DPS-GGN', domain: 'dpsgurgaon.edu.in', contactEmail: 'contact@dpsgurgaon.edu.in', status: 'SUSPENDED', maxStudents: 1000, currentStudents: 980, tier: 'BASIC', createdAt: '2025-08-01' },
  { id: 'sch-105', name: 'Heritage Experimental School', code: 'HES-MUM', domain: 'heritage.edu.in', contactEmail: 'admin@heritage.edu.in', status: 'ACTIVE', maxStudents: 800, currentStudents: 740, tier: 'PREMIUM', createdAt: '2025-11-12' }
];

router.get('/schools', (req, res) => {
  res.json({
    total: mockSchools.length,
    schools: mockSchools
  });
});

router.post('/schools', (req, res) => {
  const { name, domain, contactEmail, maxStudents, tier } = req.body;
  if (!name || !domain || !contactEmail) {
    return res.status(400).json({ error: 'Missing required school provisioning fields.' });
  }

  const newSchool = {
    id: `sch-${Date.now()}`,
    name,
    code: name.substring(0, 3).toUpperCase() + '-' + Math.floor(100 + Math.random() * 900),
    domain,
    contactEmail,
    status: 'ACTIVE',
    maxStudents: parseInt(maxStudents) || 500,
    currentStudents: 0,
    tier: tier || 'PREMIUM',
    createdAt: new Date().toISOString().split('T')[0]
  };

  mockSchools.unshift(newSchool);
  res.status(201).json({
    message: 'School tenant successfully provisioned.',
    school: newSchool
  });
});

router.put('/schools/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, maxStudents } = req.body;

  const school = mockSchools.find(s => s.id === id);
  if (!school) {
    return res.status(404).json({ error: 'School tenant not found.' });
  }

  if (status) school.status = status;
  if (maxStudents) school.maxStudents = parseInt(maxStudents);

  res.json({
    message: `School tenant ${school.name} updated successfully.`,
    school
  });
});

// -------------------------------------------------------------
// 5. CHC COGNITIVE STUDIO CALIBRATION (Gf, Gv, Gwm, Gs)
// -------------------------------------------------------------
let chcWeights = {
  version: 3,
  gfWeight: 0.35, // Fluid Reasoning
  gvWeight: 0.25, // Visual-Spatial Processing
  gwmWeight: 0.25, // Working Memory
  gsWeight: 0.15, // Processing Speed
  calibratedBy: 'Dr. Evelyn Vance (Chief Cognitive Neuroscientist)',
  lastUpdated: new Date().toISOString()
};

router.get('/chc-studio', (req, res) => {
  res.json(chcWeights);
});

router.put('/chc-studio', (req, res) => {
  const { gfWeight, gvWeight, gwmWeight, gsWeight } = req.body;
  const total = parseFloat(gfWeight) + parseFloat(gvWeight) + parseFloat(gwmWeight) + parseFloat(gsWeight);

  if (Math.abs(total - 1.0) > 0.01) {
    return res.status(400).json({ error: 'Domain weights must sum up to exactly 1.00 (100%).' });
  }

  chcWeights = {
    version: chcWeights.version + 1,
    gfWeight: parseFloat(gfWeight),
    gvWeight: parseFloat(gvWeight),
    gwmWeight: parseFloat(gwmWeight),
    gsWeight: parseFloat(gsWeight),
    calibratedBy: req.user.name || 'SUPERADMIN',
    lastUpdated: new Date().toISOString()
  };

  res.json({
    message: 'CHC Cognitive Scoring Weights successfully re-calibrated.',
    weights: chcWeights
  });
});

// -------------------------------------------------------------
// 6. AI MANAGEMENT & CBT CHATBOT GUARDRAILS
// -------------------------------------------------------------
let aiConfig = {
  chatbotName: 'CBT Student Counselor Bot v4',
  isGuardrailActive: true,
  distressThreshold: 0.78,
  sentimentSensitivity: 0.85,
  maxTokenLimit: 1024,
  prohibitedKeywords: 'suicide, self-harm, run away, abuse, overdose, lethal',
  systemPromptTemplate: 'You are an empathetic, evidence-based CBT AI counselor for K-12 students. Provide supportive guidance while monitoring distress triggers. If emotional distress exceeds 0.78, escalate immediately to school counselors.'
};

router.get('/ai-config', (req, res) => {
  res.json(aiConfig);
});

router.put('/ai-config', (req, res) => {
  aiConfig = { ...aiConfig, ...req.body, updatedAt: new Date().toISOString() };
  res.json({
    message: 'CBT AI Guardrail and Distress Safety configurations updated.',
    config: aiConfig
  });
});

// -------------------------------------------------------------
// 7. FERPA IMMUTABLE AUDIT LOGS
// -------------------------------------------------------------
const mockAuditLogs = [
  { id: 'log-9001', timestamp: '2026-08-17 01:45:12', actorEmail: 'superadmin@platform.edu', actorRole: 'SUPERADMIN', schoolName: 'Global Platform', action: 'RECALIBRATE_CHC_WEIGHTS', category: 'COGNITIVE_STUDIO', ipAddress: '192.168.1.104', details: 'Updated Gf weight to 0.35 and Gs to 0.15' },
  { id: 'log-9002', timestamp: '2026-08-17 01:12:05', actorEmail: 'superadmin@platform.edu', actorRole: 'SUPERADMIN', schoolName: 'Oakridge Public School', action: 'SUSPEND_TENANT', category: 'TENANT_MGMT', ipAddress: '192.168.1.104', details: 'Suspended school ID sch-104 due to billing inquiry' },
  { id: 'log-9003', timestamp: '2026-08-16 23:30:44', actorEmail: 'principal@stxavier.edu.in', actorRole: 'SCHOOL_ADMIN', schoolName: 'St. Xavier International', action: 'FERPA_STUDENT_EXPORT', category: 'FERPA_ACCESS', ipAddress: '103.45.12.88', details: 'Exported student psychological evaluation report #9941' },
  { id: 'log-9004', timestamp: '2026-08-16 20:15:19', actorEmail: 'superadmin@platform.edu', actorRole: 'SUPERADMIN', schoolName: 'Global Platform', action: 'PROVISION_SCHOOL', category: 'TENANT_MGMT', ipAddress: '192.168.1.104', details: 'Provisioned new tenant: Heritage Experimental School' },
  { id: 'log-9005', timestamp: '2026-08-16 18:02:50', actorEmail: 'counselor.vance@greenwood.ac.in', actorRole: 'COUNSELOR', schoolName: 'Greenwood High', action: 'MANUAL_CRISIS_OVERRIDE', category: 'AI_SAFETY', ipAddress: '49.207.19.11', details: 'Manually resolved SOS Alert #CR-402 with counselor intervention' }
];

router.get('/audit-logs', (req, res) => {
  res.json({
    total: mockAuditLogs.length,
    logs: mockAuditLogs
  });
});

// -------------------------------------------------------------
// 8. CRISIS ESCALATION MONITOR (SOS REAL-TIME FEED)
// -------------------------------------------------------------
let crisisFeed = [
  { id: 'CR-8821', studentName: 'Aarav Sharma (Gr 11)', schoolName: 'St. Xavier International', distressLevel: 'SEVERE', sentimentScore: 0.89, triggerKeywords: 'hopeless, can\'t cope, self-harm', transcriptSnippet: 'Student: "I feel completely overwhelmed by exams and hopeless..." Bot: "I am alerting your school counselor right now to support you."', status: 'OPEN', timestamp: '2026-08-17 01:52:10' },
  { id: 'CR-8819', studentName: 'Riya Patel (Gr 9)', schoolName: 'Oakridge Public School', distressLevel: 'HIGH', sentimentScore: 0.81, triggerKeywords: 'panic attack, severe anxiety', transcriptSnippet: 'Student: "I can\'t breathe, severe panic attack..." Bot: "Deep breathing exercises started. Alert sent to Counselor Office."', status: 'ESCALATED_TO_HUMAN', timestamp: '2026-08-17 00:40:15' },
  { id: 'CR-8815', studentName: 'Karan Verma (Gr 12)', schoolName: 'Greenwood High', distressLevel: 'CRITICAL', sentimentScore: 0.94, triggerKeywords: 'give up, overdose', transcriptSnippet: 'Student: "I just want to give up completely..." Bot: "SOS Safety Protocol Engaged."', status: 'OVERRIDDEN', timestamp: '2026-08-16 22:15:00' }
];

router.get('/crisis-escalations', (req, res) => {
  res.json({
    activeAlerts: crisisFeed.filter(c => c.status === 'OPEN').length,
    escalations: crisisFeed
  });
});

router.put('/crisis-escalations/:id/override', (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  const alert = crisisFeed.find(c => c.id === id);
  if (!alert) {
    return res.status(404).json({ error: 'Crisis escalation record not found.' });
  }

  alert.status = 'OVERRIDDEN';
  alert.overrideReason = reason || 'Superadmin manual safety intervention verified with school administration.';

  res.json({
    message: `Crisis alert ${id} manually overridden and status updated.`,
    alert
  });
});

module.exports = router;
