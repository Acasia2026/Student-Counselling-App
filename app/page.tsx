'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Tv2,
  Users,
  BookOpen,
  Bot,
  BarChart3,
  FileSpreadsheet,
  Bell,
  Settings,
  HelpCircle,
  Search,
  Plus,
  ArrowUpRight,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Building2,
  CreditCard,
  UserCheck,
  ChevronRight,
  X,
  ShieldCheck,
  SlidersHorizontal,
  Download,
  Key,
  Database,
  Mail
} from 'lucide-react';

// --- Micro Sparkline SVG Component ---
const MicroSparkline = ({ points, color = '#4F46E5' }: { points: number[]; color?: string }) => {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const width = 120;
  const height = 28;

  const pathD = points
    .map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="sparkline-path"
      />
    </svg>
  );
};

export default function SuperadminDashboard() {
  // Navigation & Active Tab State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [chartPeriod, setChartPeriod] = useState<'7D' | '30D' | '1Y'>('30D');

  // Modals Open/Close State
  const [isAddSchoolOpen, setIsAddSchoolOpen] = useState(false);
  const [isChcModalOpen, setIsChcModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [overrideModalAlert, setOverrideModalAlert] = useState<any>(null);

  // Tenant Provisioning Form State
  const [newSchoolData, setNewSchoolData] = useState({
    name: '',
    domain: '',
    contactEmail: '',
    maxStudents: '1000',
    tier: 'PREMIUM'
  });

  // CHC Cognitive Scoring Weights State (Gf, Gv, Gwm, Gs)
  const [chcWeights, setChcWeights] = useState({
    gfWeight: 0.35,  // Fluid Reasoning
    gvWeight: 0.25,  // Visual-Spatial
    gwmWeight: 0.25, // Working Memory
    gsWeight: 0.15,  // Processing Speed
    version: 4,
    calibratedBy: 'Dr. Evelyn Vance (Chief Cognitive Scientist)'
  });

  // CBT AI Safety Guardrail Controls State
  const [aiConfig, setAiConfig] = useState({
    chatbotName: 'CBT Counselor Bot v4',
    isGuardrailActive: true,
    distressThreshold: 0.78,
    sentimentSensitivity: 0.85,
    prohibitedKeywords: 'suicide, self-harm, run away, abuse, overdose',
    systemPrompt: 'You are an empathetic, evidence-based CBT AI counselor for K-12 students. Provide supportive guidance while monitoring distress triggers. If emotional distress exceeds 0.78, escalate immediately to school counselors.'
  });

  // Dynamic School Tenants List
  const [schoolsList, setSchoolsList] = useState([
    { id: 'sch-101', name: 'St. Xavier International Academy', code: 'STX-DEL', domain: 'stxavier.edu.in', contactEmail: 'admin@stxavier.edu.in', status: 'ACTIVE', maxStudents: 2500, currentStudents: 2340, tier: 'ENTERPRISE' },
    { id: 'sch-102', name: 'Oakridge Public School', code: 'OAK-BLR', domain: 'oakridge.edu.in', contactEmail: 'principal@oakridge.edu.in', status: 'ACTIVE', maxStudents: 1500, currentStudents: 1420, tier: 'PREMIUM' },
    { id: 'sch-103', name: 'Greenwood High International', code: 'GWH-HYD', domain: 'greenwood.ac.in', contactEmail: 'info@greenwood.ac.in', status: 'ACTIVE', maxStudents: 3000, currentStudents: 2890, tier: 'ENTERPRISE' },
    { id: 'sch-104', name: 'Delhi Public School Sector 45', code: 'DPS-GGN', domain: 'dpsgurgaon.edu.in', contactEmail: 'contact@dpsgurgaon.edu.in', status: 'SUSPENDED', maxStudents: 1000, currentStudents: 980, tier: 'BASIC' },
    { id: 'sch-105', name: 'Heritage Experimental School', code: 'HES-MUM', domain: 'heritage.edu.in', contactEmail: 'admin@heritage.edu.in', status: 'ACTIVE', maxStudents: 800, currentStudents: 740, tier: 'PREMIUM' }
  ]);

  // Global Platform User Directory
  const [usersList] = useState([
    { id: 'usr-001', name: 'Dr. Evelyn Vance', email: 'evelyn.vance@platform.edu', role: 'SUPERADMIN', school: 'Global Platform', status: 'ACTIVE' },
    { id: 'usr-002', name: 'Rajesh Malhotra', email: 'principal@stxavier.edu.in', role: 'SCHOOL_ADMIN', school: 'St. Xavier International', status: 'ACTIVE' },
    { id: 'usr-003', name: 'Sunita Sharma', email: 'counselor.s@oakridge.edu.in', role: 'COUNSELOR', school: 'Oakridge Public School', status: 'ACTIVE' },
    { id: 'usr-004', name: 'Vikram Seth', email: 'v.seth@greenwood.ac.in', role: 'TEACHER', school: 'Greenwood High', status: 'ACTIVE' },
    { id: 'usr-005', name: 'Aarav Sharma', email: 'aarav.s@stxavier.edu.in', role: 'STUDENT', school: 'St. Xavier International', status: 'ACTIVE' }
  ]);

  // Subscriptions & Licenses Data
  const [subscriptionsList] = useState([
    { id: 'sub-301', school: 'St. Xavier International Academy', tier: 'ENTERPRISE', price: '₹4,50,000 / yr', status: 'ACTIVE', nextBilling: '2027-01-15', licenses: '2,500' },
    { id: 'sub-302', school: 'Oakridge Public School', tier: 'PREMIUM', price: '₹2,80,000 / yr', status: 'ACTIVE', nextBilling: '2027-03-20', licenses: '1,500' },
    { id: 'sub-303', school: 'Greenwood High International', tier: 'ENTERPRISE', price: '₹5,20,000 / yr', status: 'ACTIVE', nextBilling: '2027-05-10', licenses: '3,000' },
    { id: 'sub-304', school: 'Delhi Public School Sector 45', tier: 'BASIC', price: '₹1,20,000 / yr', status: 'PENDING_RENEWAL', nextBilling: '2026-08-30', licenses: '1,000' },
    { id: 'sub-305', school: 'Heritage Experimental School', tier: 'PREMIUM', price: '₹2,40,000 / yr', status: 'ACTIVE', nextBilling: '2026-11-12', licenses: '800' }
  ]);

  // Real-time Crisis Feed
  const [crisisAlerts, setCrisisAlerts] = useState([
    { id: 'CR-8821', studentName: 'Aarav Sharma (Gr 11)', schoolName: 'St. Xavier International', distressLevel: 'SEVERE', sentimentScore: 0.89, triggerKeywords: 'hopeless, exam burnout, can\'t cope', status: 'OPEN', timestamp: '2026-08-17 01:52' },
    { id: 'CR-8819', studentName: 'Riya Patel (Gr 9)', schoolName: 'Oakridge Public School', distressLevel: 'HIGH', sentimentScore: 0.81, triggerKeywords: 'panic attack, severe anxiety', status: 'ESCALATED', timestamp: '2026-08-17 00:40' },
    { id: 'CR-8815', studentName: 'Karan Verma (Gr 12)', schoolName: 'Greenwood High', distressLevel: 'CRITICAL', sentimentScore: 0.94, triggerKeywords: 'give up, extreme distress', status: 'OVERRIDDEN', timestamp: '2026-08-16 22:15' }
  ]);

  // FERPA Immutable Audit Logs
  const [auditLogs] = useState([
    { id: 'log-9001', timestamp: '2026-08-17 01:45:12', actorEmail: 'superadmin@platform.edu', actorRole: 'SUPERADMIN', schoolName: 'Global Platform', action: 'RECALIBRATE_CHC_WEIGHTS', category: 'COGNITIVE_STUDIO', ipAddress: '192.168.1.104' },
    { id: 'log-9002', timestamp: '2026-08-17 01:12:05', actorEmail: 'superadmin@platform.edu', actorRole: 'SUPERADMIN', schoolName: 'Oakridge Public School', action: 'SUSPEND_TENANT', category: 'TENANT_MGMT', ipAddress: '192.168.1.104' },
    { id: 'log-9003', timestamp: '2026-08-16 23:30:44', actorEmail: 'principal@stxavier.edu.in', actorRole: 'SCHOOL_ADMIN', schoolName: 'St. Xavier International', action: 'FERPA_STUDENT_EXPORT', category: 'FERPA_ACCESS', ipAddress: '103.45.12.88' },
    { id: 'log-9004', timestamp: '2026-08-16 20:15:19', actorEmail: 'superadmin@platform.edu', actorRole: 'SUPERADMIN', schoolName: 'Global Platform', action: 'PROVISION_SCHOOL', category: 'TENANT_MGMT', ipAddress: '192.168.1.104' }
  ]);

  // Handle Tenant Provisioning
  const handleCreateSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchoolData.name || !newSchoolData.domain) return;

    const created = {
      id: `sch-${Date.now().toString().slice(-4)}`,
      name: newSchoolData.name,
      code: newSchoolData.name.substring(0, 3).toUpperCase() + '-ACAD',
      domain: newSchoolData.domain,
      contactEmail: newSchoolData.contactEmail || `admin@${newSchoolData.domain}`,
      status: 'ACTIVE',
      maxStudents: parseInt(newSchoolData.maxStudents) || 1000,
      currentStudents: 0,
      tier: newSchoolData.tier
    };

    setSchoolsList([created, ...schoolsList]);
    setIsAddSchoolOpen(false);
    setNewSchoolData({ name: '', domain: '', contactEmail: '', maxStudents: '1000', tier: 'PREMIUM' });
  };

  // Toggle Tenant Suspension
  const handleToggleSchoolStatus = (id: string) => {
    setSchoolsList(schoolsList.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' };
      }
      return s;
    }));
  };

  // CHC Weight Calibration Save
  const handleSaveChcWeights = (e: React.FormEvent) => {
    e.preventDefault();
    setChcWeights(prev => ({
      ...prev,
      version: prev.version + 1,
      calibratedBy: 'Superadmin Manual Override'
    }));
    setIsChcModalOpen(false);
  };

  // AI Configuration Save
  const handleSaveAiConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAiModalOpen(false);
  };

  // Crisis Escalation Override Confirm
  const handleConfirmOverride = (alertId: string) => {
    setCrisisAlerts(crisisAlerts.map(a => a.id === alertId ? { ...a, status: 'OVERRIDDEN' } : a));
    setOverrideModalAlert(null);
  };

  // Sidebar Menu Items Config matching layout screenshot
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'schools', label: 'Schools', icon: GraduationCap },
    { id: 'subscriptions', label: 'Subscriptions', icon: Tv2 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'ai-management', label: 'AI Management', icon: Bot },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '3' },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  // Filtered lists based on search bar query
  const filteredSchools = schoolsList.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = usersList.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full bg-[#F4F6FA] overflow-hidden font-sans text-slate-800">
      {/* ========================================================= */}
      {/* LEFT SIDEBAR NAVIGATION                                   */}
      {/* ========================================================= */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between z-20 shrink-0 select-none">
        <div>
          {/* Platform Logo & Title */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-indigo-500/20">
              AI
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-slate-900 leading-tight">
                AI Learning Platform
              </h1>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                Super Admin
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${isActive
                      ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Profile */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm">
              SA
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-800 truncate">Super Admin</p>
              <p className="text-xs text-slate-400 truncate">superadmin@platform.edu</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MAIN CONTENT AREA                                         */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* TOP HEADER BAR */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          {/* Global Search Field */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search schools, users, or reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm border border-transparent focus:border-indigo-300 rounded-xl outline-none transition-all duration-200 placeholder:text-slate-400"
            />
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAddSchoolOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all duration-150"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add School</span>
            </button>

            <div className="h-5 w-px bg-slate-200" />

            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl relative transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
              <HelpCircle className="w-5 h-5" />
            </button>

            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden ring-2 ring-indigo-50">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* MAIN BODY LAYOUT */}
        <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">

          {/* ======================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW                               */}
          {/* ======================================================= */}
          {activeTab === 'dashboard' && (
            <>
              {/* Overview Header */}
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Platform Overview
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Monitor and manage your entire education platform.
                </p>
              </div>

              {/* 6 KPI METRICS OVERVIEW GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. TOTAL SCHOOLS */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <ArrowUpRight className="w-3.5 h-3.5" /> +12
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                      TOTAL SCHOOLS
                    </p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">248</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <MicroSparkline points={[220, 226, 230, 235, 239, 244, 248]} color="#4F46E5" />
                  </div>
                </div>

                {/* 2. ACTIVE STUDENTS */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className="bg-purple-50 text-purple-600 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <ArrowUpRight className="w-3.5 h-3.5" /> +8.4%
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                      ACTIVE STUDENTS
                    </p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">48,620</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <MicroSparkline points={[420, 435, 448, 460, 472, 480, 486]} color="#9333EA" />
                  </div>
                </div>

                {/* 3. ACTIVE TEACHERS */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <ArrowUpRight className="w-3.5 h-3.5" /> +6.2%
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                      ACTIVE TEACHERS
                    </p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">3,842</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <MicroSparkline points={[350, 358, 364, 371, 378, 381, 384]} color="#2563EB" />
                  </div>
                </div>

                {/* 4. ACTIVE SUBSCRIPTIONS */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                        <Tv2 className="w-5 h-5" />
                      </div>
                      <span className="bg-cyan-50 text-cyan-700 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <ArrowUpRight className="w-3.5 h-3.5" /> +9.1%
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                      ACTIVE SUBSCRIPTIONS
                    </p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">231</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <MicroSparkline points={[200, 206, 212, 218, 222, 227, 231]} color="#0891B2" />
                  </div>
                </div>

                {/* 5. MONTHLY REVENUE */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <ArrowUpRight className="w-3.5 h-3.5" /> +12.8%
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                      MONTHLY REVENUE
                    </p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">₹18.4L</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <MicroSparkline points={[14.2, 15.0, 15.8, 16.5, 17.1, 17.8, 18.4]} color="#059669" />
                  </div>
                </div>

                {/* 6. AI SESSIONS */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Bot className="w-5 h-5" />
                      </div>
                      <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <ArrowUpRight className="w-3.5 h-3.5" /> +18.5%
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                      AI SESSIONS
                    </p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">1.24M</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <MicroSparkline points={[85, 92, 99, 105, 112, 118, 124]} color="#6366F1" />
                  </div>
                </div>
              </div>

              {/* VISUAL ANALYTICS SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Platform Growth Area Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Platform Growth</h3>
                      <p className="text-xs text-slate-400">Schools, Students, and Teachers over time</p>
                    </div>

                    {/* Chart Period Filters */}
                    <div className="bg-slate-100 p-1 rounded-xl flex gap-1 text-xs font-semibold">
                      {(['7D', '30D', '1Y'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setChartPeriod(p)}
                          className={`px-3 py-1 rounded-lg transition-all ${chartPeriod === p
                              ? 'bg-white text-indigo-600 shadow-sm'
                              : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SVG Multi-Line Chart Canvas */}
                  <div className="mt-8 h-56 w-full relative flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180">
                      <line x1="0" y1="30" x2="500" y2="30" stroke="#F1F5F9" strokeDasharray="4 4" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#F1F5F9" strokeDasharray="4 4" />
                      <line x1="0" y1="130" x2="500" y2="130" stroke="#F1F5F9" strokeDasharray="4 4" />

                      <path
                        d="M 0 160 Q 125 140 250 110 T 500 40 L 500 180 L 0 180 Z"
                        fill="url(#indigoGradient)"
                        opacity="0.4"
                      />
                      <path
                        d="M 0 160 Q 125 140 250 110 T 500 40"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="3.5"
                      />

                      <path
                        d="M 0 170 Q 125 155 250 135 T 500 70"
                        fill="none"
                        stroke="#9333EA"
                        strokeWidth="2.5"
                        strokeDasharray="5 5"
                      />

                      <defs>
                        <linearGradient id="indigoGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-6 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-indigo-600" /> Total Active Students (48.6k)
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-purple-600" /> Active School Tenants (248)
                    </span>
                  </div>
                </div>

                {/* Subscription Status Gauge / Donut */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Subscription Status</h3>
                    <p className="text-xs text-slate-400">License allocation breakdown</p>
                  </div>

                  <div className="my-6 flex flex-col items-center justify-center relative">
                    <svg className="w-48 h-36" viewBox="0 0 160 100">
                      <path
                        d="M 20 90 A 60 60 0 0 1 140 90"
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="16"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 20 90 A 60 60 0 0 1 130 50"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="16"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute bottom-2 text-center">
                      <span className="text-3xl font-extrabold text-slate-900">231</span>
                      <p className="text-[11px] font-semibold text-slate-400">Active Paid Licenses</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-600 font-medium">Active Enterprise & Premium</span>
                      <span className="font-bold text-slate-900">231 (93.1%)</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-600 font-medium">Pending Renewal</span>
                      <span className="font-bold text-amber-600">12 (4.8%)</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-600 font-medium">Expired Accounts</span>
                      <span className="font-bold text-red-600">5 (2.1%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* REAL-TIME SAFETY & CRISIS HIGHLIGHTS */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Crisis Safety Monitor</h3>
                      <p className="text-xs text-slate-400">High-distress CBT chatbot triggers requiring attention</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    View All Safety Feeds <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {crisisAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{alert.studentName}</span>
                          <span className="text-xs text-slate-400">({alert.schoolName})</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${alert.distressLevel === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                              alert.distressLevel === 'SEVERE' ? 'bg-orange-100 text-orange-700' :
                                'bg-amber-100 text-amber-700'
                            }`}>
                            {alert.distressLevel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Trigger Keywords: <span className="font-mono text-slate-700">{alert.triggerKeywords}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono text-slate-400">{alert.timestamp}</span>
                        {alert.status === 'OPEN' ? (
                          <button
                            onClick={() => setOverrideModalAlert(alert)}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all"
                          >
                            Manual Safety Override
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-lg">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {alert.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ======================================================= */}
          {/* TAB 2: TENANT SCHOOL MANAGEMENT                         */}
          {/* ======================================================= */}
          {activeTab === 'schools' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Tenant School Management</h2>
                  <p className="text-sm text-slate-500">Provision, monitor, and set student limits across all institutional tenants.</p>
                </div>
                <button
                  onClick={() => setIsAddSchoolOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 w-fit"
                >
                  <Plus className="w-4 h-4" /> Provision New School
                </button>
              </div>

              {/* Schools Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3.5 px-6">School Name</th>
                      <th className="py-3.5 px-6">Tenant Code & Domain</th>
                      <th className="py-3.5 px-6">Tier</th>
                      <th className="py-3.5 px-6">Active Students</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredSchools.map((school) => (
                      <tr key={school.id} className="hover:bg-slate-50/80 transition-all">
                        <td className="py-4 px-6 font-semibold text-slate-900">
                          {school.name}
                          <div className="text-xs font-normal text-slate-400">{school.contactEmail}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {school.code}
                          </span>
                          <div className="text-xs text-indigo-600 font-medium mt-0.5">{school.domain}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${school.tier === 'ENTERPRISE' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                              school.tier === 'PREMIUM' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                                'bg-slate-100 text-slate-700'
                            }`}>
                            {school.tier}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-slate-800">
                            {school.currentStudents} / <span className="text-slate-400">{school.maxStudents}</span>
                          </div>
                          <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                            <div
                              className="bg-indigo-600 h-full rounded-full"
                              style={{ width: `${Math.min(100, (school.currentStudents / school.maxStudents) * 100)}%` }}
                            />
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${school.status === 'ACTIVE'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-red-50 text-red-700'
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${school.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                            {school.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => handleToggleSchoolStatus(school.id)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${school.status === 'ACTIVE'
                                ? 'border-red-200 text-red-600 hover:bg-red-50'
                                : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                              }`}
                          >
                            {school.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 3: SUBSCRIPTIONS MODULE                             */}
          {/* ======================================================= */}
          {activeTab === 'subscriptions' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Subscription & License Management</h2>
                <p className="text-sm text-slate-500">Monitor institutional subscription tiers, billing cycles, and active licenses.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-bold text-slate-400 uppercase">ENTERPRISE TIERS</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">112 Schools</div>
                  <p className="text-xs text-emerald-600 font-semibold mt-2">Unlimited Cognitive Assessments</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-bold text-slate-400 uppercase">PREMIUM TIERS</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">119 Schools</div>
                  <p className="text-xs text-indigo-600 font-semibold mt-2">Up to 2,000 Students / Tenant</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-bold text-slate-400 uppercase">BASIC TIERS</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">17 Schools</div>
                  <p className="text-xs text-amber-600 font-semibold mt-2">Up to 500 Students / Tenant</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3.5 px-6">School Institution</th>
                      <th className="py-3.5 px-6">Tier</th>
                      <th className="py-3.5 px-6">Annual Billing</th>
                      <th className="py-3.5 px-6">Allocated Licenses</th>
                      <th className="py-3.5 px-6">Next Renewal</th>
                      <th className="py-3.5 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {subscriptionsList.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/80 transition-all">
                        <td className="py-4 px-6 font-semibold text-slate-900">{sub.school}</td>
                        <td className="py-4 px-6">
                          <span className="font-bold text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg">
                            {sub.tier}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-mono font-semibold text-slate-800">{sub.price}</td>
                        <td className="py-4 px-6 font-semibold text-slate-700">{sub.licenses}</td>
                        <td className="py-4 px-6 text-xs text-slate-500 font-mono">{sub.nextBilling}</td>
                        <td className="py-4 px-6">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${sub.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                            {sub.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 4: USERS DIRECTORY                                  */}
          {/* ======================================================= */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Global User Directory</h2>
                <p className="text-sm text-slate-500">Cross-tenant user registry spanning Admins, Teachers, Counselors, and Students.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3.5 px-6">User Name & Email</th>
                      <th className="py-3.5 px-6">Role</th>
                      <th className="py-3.5 px-6">Associated Institution</th>
                      <th className="py-3.5 px-6">Account Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-all">
                        <td className="py-4 px-6 font-semibold text-slate-900">
                          {u.name}
                          <div className="text-xs font-normal text-slate-400">{u.email}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${u.role === 'SUPERADMIN' ? 'bg-purple-100 text-purple-800' :
                              u.role === 'SCHOOL_ADMIN' ? 'bg-blue-100 text-blue-800' :
                                u.role === 'COUNSELOR' ? 'bg-emerald-100 text-emerald-800' :
                                  'bg-slate-100 text-slate-700'
                            }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-700 font-medium">{u.school}</td>
                        <td className="py-4 px-6">
                          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                            {u.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 5: CURRICULUM & CHC COGNITIVE STUDIO                */}
          {/* ======================================================= */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">CHC Cognitive Domain Calibrator</h2>
                  <p className="text-sm text-slate-500">
                    Configure Woodcock-Johnson / Cattell-Horn-Carroll (CHC) cognitive factor weights (Gf, Gv, Gwm, Gs) for intelligence profiling.
                  </p>
                </div>
                <button
                  onClick={() => setIsChcModalOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Calibrate Scoring Weights
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Gf Domain</div>
                  <h3 className="text-xl font-extrabold text-slate-900">Fluid Reasoning</h3>
                  <p className="text-xs text-slate-500">Novel problem solving, inductive & deductive logic matrices.</p>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="text-xs text-slate-400 font-medium">Scoring Weight</span>
                    <span className="text-2xl font-extrabold text-indigo-600">{(chcWeights.gfWeight * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                  <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">Gv Domain</div>
                  <h3 className="text-xl font-extrabold text-slate-900">Visual-Spatial</h3>
                  <p className="text-xs text-slate-500">3D spatial rotation, pattern completion & mental manipulation.</p>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="text-xs text-slate-400 font-medium">Scoring Weight</span>
                    <span className="text-2xl font-extrabold text-purple-600">{(chcWeights.gvWeight * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                  <div className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Gwm Domain</div>
                  <h3 className="text-xl font-extrabold text-slate-900">Working Memory</h3>
                  <p className="text-xs text-slate-500">Short-term retention, dual n-back task capacity & mental control.</p>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="text-xs text-slate-400 font-medium">Scoring Weight</span>
                    <span className="text-2xl font-extrabold text-cyan-600">{(chcWeights.gwmWeight * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Gs Domain</div>
                  <h3 className="text-xl font-extrabold text-slate-900">Processing Speed</h3>
                  <p className="text-xs text-slate-500">Perceptual speed under time pressure & rapid cognitive fluency.</p>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="text-xs text-slate-400 font-medium">Scoring Weight</span>
                    <span className="text-2xl font-extrabold text-emerald-600">{(chcWeights.gsWeight * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex items-center justify-between text-xs text-indigo-900">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>Active Model Calibration Version: <strong>v{chcWeights.version}.0</strong></span>
                </div>
                <span>Calibrated By: <strong>{chcWeights.calibratedBy}</strong></span>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 6: AI MANAGEMENT & CBT GUARDRAILS                    */}
          {/* ======================================================= */}
          {activeTab === 'ai-management' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">AI Safety & Guardrail Controls</h2>
                  <p className="text-sm text-slate-500">Configure CBT bot guardrails, distress threshold score limits, and prohibited prompt rules.</p>
                </div>
                <button
                  onClick={() => setIsAiModalOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2"
                >
                  <Bot className="w-4 h-4" /> Edit AI Configuration
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-base">Guardrail Status</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Active Safety Layer</span>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                      ENABLED
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <p className="text-xs text-slate-400">Distress Escalation Threshold</p>
                    <p className="text-2xl font-extrabold text-slate-900">{aiConfig.distressThreshold}</p>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full" style={{ width: `${aiConfig.distressThreshold * 100}%` }} />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-base">System Prompt & Policy Template</h3>
                  <div className="p-4 bg-slate-50 rounded-xl font-mono text-xs text-slate-700 border border-slate-200 leading-relaxed">
                    {aiConfig.systemPrompt}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Prohibited Distress Trigger Keywords</h4>
                    <p className="text-xs font-mono text-slate-700 bg-red-50 text-red-800 p-2.5 rounded-lg border border-red-100">
                      {aiConfig.prohibitedKeywords}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 7: ANALYTICS                                        */}
          {/* ======================================================= */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Advanced Platform Analytics</h2>
                <p className="text-sm text-slate-500">Cross-tenant student engagement metrics, AI counseling session duration, and cognitive progression tracking.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-bold text-slate-400 uppercase">Avg Session Duration</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">18.4 mins</div>
                  <p className="text-xs text-indigo-600 font-semibold mt-2">+1.2 mins vs last month</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-bold text-slate-400 uppercase">Cognitive Assessments Completed</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">142,890</div>
                  <p className="text-xs text-emerald-600 font-semibold mt-2">+14.2% completion rate</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-bold text-slate-400 uppercase">Counselor Intervention Rate</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">2.4%</div>
                  <p className="text-xs text-slate-500 font-semibold mt-2">Well within target safety threshold</p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 8: REPORTS & COMPLIANCE LOGS                         */}
          {/* ======================================================= */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Institutional Compliance Reports</h2>
                  <p className="text-sm text-slate-500">Export FERPA/COPPA compliance data, cognitive profiling audits, and school health summaries.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2">
                  <Download className="w-4 h-4" /> Export All Compliance CSV
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3.5 px-6">Timestamp</th>
                      <th className="py-3.5 px-6">Actor Email</th>
                      <th className="py-3.5 px-6">Category</th>
                      <th className="py-3.5 px-6">Action Performed</th>
                      <th className="py-3.5 px-6">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition-all font-mono text-xs">
                        <td className="py-4 px-6 text-slate-500">{log.timestamp}</td>
                        <td className="py-4 px-6 font-semibold text-slate-900">{log.actorEmail}</td>
                        <td className="py-4 px-6">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-sans font-semibold text-[11px]">
                            {log.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-indigo-600 font-semibold font-sans">{log.action}</td>
                        <td className="py-4 px-6 text-slate-400">{log.ipAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 9: NOTIFICATIONS & SAFETY FEED                       */}
          {/* ======================================================= */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Real-Time Safety & SOS Alert Feed</h2>
                <p className="text-sm text-slate-500">Live monitoring of high-distress CBT chatbot triggers across all school tenants.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                {crisisAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{alert.studentName}</span>
                        <span className="text-xs text-slate-400">({alert.schoolName})</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${alert.distressLevel === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                            alert.distressLevel === 'SEVERE' ? 'bg-orange-100 text-orange-700' :
                              'bg-amber-100 text-amber-700'
                          }`}>
                          {alert.distressLevel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Trigger Keywords: <span className="font-mono text-slate-700">{alert.triggerKeywords}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono text-slate-400">{alert.timestamp}</span>
                      {alert.status === 'OPEN' ? (
                        <button
                          onClick={() => setOverrideModalAlert(alert)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all"
                        >
                          Manual Safety Override
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {alert.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 10: SETTINGS                                        */}
          {/* ======================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Platform Settings & API Keys</h2>
                <p className="text-sm text-slate-500">Global system configuration, master API keys, and multi-tenant security headers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <Key className="w-5 h-5 text-indigo-600" /> Master Superadmin API Key
                  </div>
                  <div className="p-3 bg-slate-100 rounded-xl font-mono text-xs text-slate-700 flex justify-between items-center">
                    <span>pk_live_superadmin_master_99410022</span>
                    <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">Copy</button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <Database className="w-5 h-5 text-indigo-600" /> PostgreSQL Multi-Tenant DB Status
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" /> Connection Healthy (Prisma Client v5.10)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 11: SUPPORT                                         */}
          {/* ======================================================= */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Institutional Support & Tickets</h2>
                <p className="text-sm text-slate-500">Priority support channels for school administrators and lead counselors.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">24/7 Superadmin Support Hotline</h3>
                    <p className="text-xs text-slate-500">Direct escalation line: support@platform.edu</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: PROVISION NEW SCHOOL TENANT                      */}
      {/* ========================================================= */}
      {isAddSchoolOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-slate-900">Provision New School Tenant</h3>
              <button onClick={() => setIsAddSchoolOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSchool} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  School Institution Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stanford International School"
                  value={newSchoolData.name}
                  onChange={(e) => setNewSchoolData({ ...newSchoolData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Domain Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="stanford.edu.in"
                    value={newSchoolData.domain}
                    onChange={(e) => setNewSchoolData({ ...newSchoolData, domain: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Max Student Limit
                  </label>
                  <input
                    type="number"
                    required
                    value={newSchoolData.maxStudents}
                    onChange={(e) => setNewSchoolData({ ...newSchoolData, maxStudents: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  License Tier
                </label>
                <select
                  value={newSchoolData.tier}
                  onChange={(e) => setNewSchoolData({ ...newSchoolData, tier: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white"
                >
                  <option value="BASIC">BASIC (Up to 500 Students)</option>
                  <option value="PREMIUM">PREMIUM (Up to 2,000 Students)</option>
                  <option value="ENTERPRISE">ENTERPRISE (Unlimited Access)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddSchoolOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
                >
                  Provision School Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: RE-CALIBRATE CHC SCORING WEIGHTS                */}
      {/* ========================================================= */}
      {isChcModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-slate-900">Calibrate CHC Cognitive Weights</h3>
              <button onClick={() => setIsChcModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveChcWeights} className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Fluid Reasoning (Gf)</span>
                  <span className="text-indigo-600 font-mono">{(chcWeights.gfWeight * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.50"
                  step="0.05"
                  value={chcWeights.gfWeight}
                  onChange={(e) => setChcWeights({ ...chcWeights, gfWeight: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Visual-Spatial (Gv)</span>
                  <span className="text-purple-600 font-mono">{(chcWeights.gvWeight * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.50"
                  step="0.05"
                  value={chcWeights.gvWeight}
                  onChange={(e) => setChcWeights({ ...chcWeights, gvWeight: parseFloat(e.target.value) })}
                  className="w-full accent-purple-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Working Memory (Gwm)</span>
                  <span className="text-cyan-600 font-mono">{(chcWeights.gwmWeight * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.50"
                  step="0.05"
                  value={chcWeights.gwmWeight}
                  onChange={(e) => setChcWeights({ ...chcWeights, gwmWeight: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Processing Speed (Gs)</span>
                  <span className="text-emerald-600 font-mono">{(chcWeights.gsWeight * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.50"
                  step="0.05"
                  value={chcWeights.gsWeight}
                  onChange={(e) => setChcWeights({ ...chcWeights, gsWeight: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs flex justify-between font-bold">
                <span>Total Calculated Weight:</span>
                <span className={
                  Math.abs((chcWeights.gfWeight + chcWeights.gvWeight + chcWeights.gwmWeight + chcWeights.gsWeight) - 1.0) < 0.01
                    ? 'text-emerald-600'
                    : 'text-red-600'
                }>
                  {((chcWeights.gfWeight + chcWeights.gvWeight + chcWeights.gwmWeight + chcWeights.gsWeight) * 100).toFixed(0)}%
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsChcModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
                >
                  Save Calibration Version v{chcWeights.version + 1}.0
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: EDIT AI GUARDRAIL CONFIGURATION                   */}
      {/* ========================================================= */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-slate-900">Edit CBT AI Guardrail Controls</h3>
              <button onClick={() => setIsAiModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAiConfig} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Chatbot Name
                </label>
                <input
                  type="text"
                  required
                  value={aiConfig.chatbotName}
                  onChange={(e) => setAiConfig({ ...aiConfig, chatbotName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Distress Trigger Threshold Score</span>
                  <span className="text-red-600 font-mono">{aiConfig.distressThreshold}</span>
                </div>
                <input
                  type="range"
                  min="0.50"
                  max="0.95"
                  step="0.01"
                  value={aiConfig.distressThreshold}
                  onChange={(e) => setAiConfig({ ...aiConfig, distressThreshold: parseFloat(e.target.value) })}
                  className="w-full accent-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Prohibited Trigger Keywords
                </label>
                <input
                  type="text"
                  value={aiConfig.prohibitedKeywords}
                  onChange={(e) => setAiConfig({ ...aiConfig, prohibitedKeywords: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  System Prompt Template
                </label>
                <textarea
                  rows={4}
                  value={aiConfig.systemPrompt}
                  onChange={(e) => setAiConfig({ ...aiConfig, systemPrompt: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono leading-relaxed outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
                >
                  Save Guardrail Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: MANUAL CRISIS OVERRIDE CONFIRMATION               */}
      {/* ========================================================= */}
      {overrideModalAlert && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-extrabold text-slate-900">Confirm Crisis Safety Override</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              You are overriding real-time safety alert <strong>{overrideModalAlert.id}</strong> for student{' '}
              <strong>{overrideModalAlert.studentName}</strong>. This action will log a FERPA audit trail entry and mark the crisis feed item as verified by Superadmin.
            </p>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setOverrideModalAlert(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmOverride(overrideModalAlert.id)}
                className="px-5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md"
              >
                Confirm Manual Override
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
