'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  UserPlus,
  Upload,
  Search,
  Filter,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  X,
  MoreVertical,
  RefreshCw,
  Trash2,
  UserX,
  UserCheck,
  FileSpreadsheet,
  Copy,
  Check,
  ArrowLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

export default function AdminStaffManagement() {
  const router = useRouter();

  // Instant Logout Handler
  const handleLogout = () => {
    try {
      fetch('http://localhost:5000/api/v1/auth/logout', { method: 'POST' }).catch(() => {});
    } catch (e) {
      // ignore network errors
    }
    if (typeof window !== 'undefined') {
      window.location.href = '/auth';
    }
  };

  // Active Tab State: 'directory' or 'invitations'
  const [activeTab, setActiveTab] = useState<'directory' | 'invitations'>('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals Open/Close State
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any | null>(null);
  const [actionMenuStaffId, setActionMenuStaffId] = useState<string | null>(null);

  // Form State for Adding Staff
  const [newStaff, setNewStaff] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: 'TEACHER',
    department: 'Mathematics & STEM',
    assignedClassInput: 'Grade 10-A Math, Grade 11 Calculus'
  });

  // Bulk CSV Upload State
  const [csvText, setCsvText] = useState(`firstName,lastName,email,role,department
Ananya,Rao,ananya.rao@school.edu,COUNSELOR,Student Wellness & Psychology
Vikram,Seth,v.seth@school.edu,TEACHER,Mathematics & STEM
Siddharth,Verma,s.verma@school.edu,TEACHER,Sciences & Physics`);
  const [parsedRecords, setParsedRecords] = useState<any[]>([]);

  // Staff Members State List (persisted across page navigation & reloads)
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 19a0133 (updated mobile student app)
  const [staffList, setStaffList] = useState<any[]>([
    {
      id: 'stf-201',
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
  ]);

  // Client-side initialization to prevent hydration mismatches
  useEffect(() => {
    const savedStaff = localStorage.getItem('admin_staff_list');
    if (savedStaff) {
      try {
        setStaffList(JSON.parse(savedStaff));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);
<<<<<<< HEAD
=======
  const [staffList, setStaffList] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin_staff_list');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved staff:', e);
        }
      }
    }
    return [
      {
        id: 'stf-201',
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
  });
>>>>>>> 5e40c7570fc583be88e5f85b265a451bb55ee2bf
=======
>>>>>>> 19a0133 (updated mobile student app)

  // Persist staffList to localStorage whenever updated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_staff_list', JSON.stringify(staffList));
    }
  }, [staffList]);

  // Handle Add Single Staff Form Submit
  const handleAddStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.firstName || !newStaff.email) return;

    const classesArray = newStaff.assignedClassInput
      ? newStaff.assignedClassInput.split(',').map(c => c.trim())
      : [];

    const token = 'inv_tok_' + Math.random().toString(36).substring(2, 10);
    const created = {
      id: `stf-${Date.now().toString().slice(-4)}`,
      firstName: newStaff.firstName,
      lastName: newStaff.lastName,
      name: `${newStaff.firstName} ${newStaff.lastName}`.trim(),
      email: newStaff.email,
      phoneNumber: newStaff.phoneNumber || '+91 90000 00000',
      role: newStaff.role,
      department: newStaff.department,
      assignedClasses: classesArray,
      status: 'PENDING',
      invitationToken: token,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setStaffList([created, ...staffList]);
    setIsAddStaffOpen(false);
    setNewStaff({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: 'TEACHER',
      department: 'Mathematics & STEM',
      assignedClassInput: 'Grade 10-A Math, Grade 11 Calculus'
    });
  };

  // Handle Bulk CSV Process
  const handleProcessBulkCsv = () => {
    const lines = csvText.trim().split('\n');
    if (lines.length <= 1) return;

    const newRecords: any[] = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length >= 4) {
        const token = 'inv_tok_' + Math.random().toString(36).substring(2, 10);
        newRecords.push({
          id: `stf-${Date.now().toString().slice(-4)}-${i}`,
          firstName: parts[0]?.trim(),
          lastName: parts[1]?.trim() || '',
          name: `${parts[0]?.trim()} ${parts[1]?.trim() || ''}`.trim(),
          email: parts[2]?.trim(),
          role: parts[3]?.trim().toUpperCase() || 'TEACHER',
          department: parts[4]?.trim() || 'General Education',
          phoneNumber: '+91 90000 11111',
          assignedClasses: ['General Curriculum'],
          status: 'PENDING',
          invitationToken: token,
          createdAt: new Date().toISOString().split('T')[0]
        });
      }
    }

    setStaffList([...newRecords, ...staffList]);
    setIsBulkImportOpen(false);
  };

  // Handle Status Toggle (ACTIVE / SUSPENDED)
  const handleToggleStatus = (id: string) => {
    setStaffList(staffList.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        return { ...s, status: nextStatus, invitationToken: nextStatus === 'ACTIVE' ? null : s.invitationToken };
      }
      return s;
    }));
    setActionMenuStaffId(null);
  };

  // Resend Invite Token
  const handleResendInvite = (id: string) => {
    const newToken = 'inv_tok_' + Math.random().toString(36).substring(2, 10);
    setStaffList(staffList.map(s => s.id === id ? { ...s, invitationToken: newToken, status: 'PENDING' } : s));
    setActionMenuStaffId(null);
  };

  // Delete Staff Record
  const handleDeleteStaff = (id: string) => {
    setStaffList(staffList.filter(s => s.id !== id));
    setActionMenuStaffId(null);
  };

  // Filtered List
  const filteredStaff = staffList.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.department && s.department.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = roleFilter === 'ALL' || s.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const pendingInvitations = staffList.filter(s => s.status === 'PENDING');

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-slate-800 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP HEADER & ACTION BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <Users className="w-8 h-8 text-indigo-600" /> Staff & Educator Directory
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Provision, manage roles, assign classrooms, and track invitations for teachers, counselors, and staff.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBulkImportOpen(true)}
              className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2 transition-all"
            >
              <Upload className="w-4 h-4 text-slate-500" /> Bulk Upload CSV
            </button>
            <button
              onClick={() => setIsAddStaffOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all"
            >
              <UserPlus className="w-4 h-4" /> + Add Staff Member
            </button>

            <button
              onClick={handleLogout}
              className="bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 text-xs font-semibold px-3 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </div>

        {/* 4 STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase">
              <span>Total Staff Members</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{staffList.length}</div>
            <p className="text-xs text-slate-400 font-medium">Institutional Staff Accounts</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase">
              <span>Active Teachers</span>
              <GraduationCap className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">
              {staffList.filter(s => s.role === 'TEACHER' && s.status === 'ACTIVE').length}
            </div>
            <p className="text-xs text-purple-600 font-semibold">Assigned to Active Classrooms</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase">
              <span>Active Counselors</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">
              {staffList.filter(s => s.role === 'COUNSELOR' && s.status === 'ACTIVE').length}
            </div>
            <p className="text-xs text-emerald-600 font-semibold">Student Wellness Specialists</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase">
              <span>Pending Invitations</span>
              <Mail className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-amber-600">{pendingInvitations.length}</div>
            <p className="text-xs text-amber-600 font-semibold">Awaiting Token Activation</p>
          </div>
        </div>

        {/* TAB NAVIGATION: DIRECTORY VS PENDING INVITATIONS */}
        <div className="border-b border-slate-200 flex items-center justify-between">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('directory')}
              className={`pb-4 text-sm font-extrabold tracking-wide transition-all border-b-2 ${
                activeTab === 'directory'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              All Staff Members ({staffList.length})
            </button>
            <button
              onClick={() => setActiveTab('invitations')}
              className={`pb-4 text-sm font-extrabold tracking-wide transition-all border-b-2 flex items-center gap-2 ${
                activeTab === 'invitations'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Pending Invitations ({pendingInvitations.length})
              {pendingInvitations.length > 0 && (
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  {pendingInvitations.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: ALL STAFF DIRECTORY TABLE                          */}
        {/* ========================================================= */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            {/* SEARCH & FILTERS BAR */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by staff name, email, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              {/* Filter Dropdowns */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-500">Role:</span>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
                  >
                    <option value="ALL">All Roles</option>
                    <option value="TEACHER">Teachers</option>
                    <option value="COUNSELOR">Counselors</option>
                    <option value="SCHOOL_ADMIN">School Admins</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium">
                  <span className="text-slate-500">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="ACTIVE">Active</option>
                    <option value="PENDING">Pending Invitation</option>
                    <option value="SUSPENDED">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            {/* STAFF MANAGEMENT DATA TABLE */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Staff Member</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Assigned Classes / Subjects</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredStaff.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 text-sm">
                        No staff members found matching search query or filters.
                      </td>
                    </tr>
                  ) : (
                    filteredStaff.map((staff) => (
                      <tr key={staff.id} className="hover:bg-slate-50/80 transition-all">
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-900 text-base">{staff.name}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-3 mt-0.5">
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {staff.email}</span>
                            {staff.phoneNumber && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {staff.phoneNumber}</span>}
                          </div>
                          <div className="text-[11px] font-semibold text-indigo-600 mt-1">{staff.department}</div>
                        </td>

                        <td className="py-4 px-6">
                          <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                            staff.role === 'COUNSELOR' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            staff.role === 'TEACHER' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                            'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            {staff.role}
                          </span>
                        </td>

                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {staff.assignedClasses && staff.assignedClasses.length > 0 ? (
                              staff.assignedClasses.map((cls, idx) => (
                                <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-md">
                                  {cls}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-slate-400 italic">No classes assigned</span>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            staff.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' :
                            staff.status === 'PENDING' ? 'bg-amber-50 text-amber-700' :
                            'bg-red-50 text-red-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              staff.status === 'ACTIVE' ? 'bg-emerald-500' :
                              staff.status === 'PENDING' ? 'bg-amber-500 animate-pulse' :
                              'bg-red-500'
                            }`} />
                            {staff.status}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right relative">
                          <div className="flex items-center justify-end gap-2">
                            {staff.status === 'PENDING' && (
                              <button
                                onClick={() => handleResendInvite(staff.id)}
                                className="text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1 rounded-lg flex items-center gap-1 transition-all"
                              >
                                <RefreshCw className="w-3 h-3" /> Resend Invite
                              </button>
                            )}
                            <button
                              onClick={() => handleToggleStatus(staff.id)}
                              className={`text-xs font-semibold px-3 py-1 rounded-lg border transition-all ${
                                staff.status === 'ACTIVE'
                                  ? 'border-red-200 text-red-600 hover:bg-red-50'
                                  : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                              }`}
                            >
                              {staff.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                            </button>
                            <button
                              onClick={() => handleDeleteStaff(staff.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PENDING INVITATIONS TRACKER                        */}
        {/* ========================================================= */}
        {activeTab === 'invitations' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Pending Invitation & Setup Token Tracker</h2>
              <p className="text-xs text-slate-500">Track onboarding activation tokens sent to newly provisioned staff members.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Staff Email & Name</th>
                    <th className="py-4 px-6">Role & Department</th>
                    <th className="py-4 px-6">Activation Setup Token</th>
                    <th className="py-4 px-6">Invited On</th>
                    <th className="py-4 px-6 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {pendingInvitations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 text-sm">
                        No pending staff invitations at this time. All staff accounts are active.
                      </td>
                    </tr>
                  ) : (
                    pendingInvitations.map((staff) => (
                      <tr key={staff.id} className="hover:bg-slate-50/80 transition-all">
                        <td className="py-4 px-6 font-semibold text-slate-900">
                          {staff.name}
                          <div className="text-xs text-slate-400 font-normal">{staff.email}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700">
                            {staff.role}
                          </span>
                          <div className="text-xs text-slate-500 mt-1">{staff.department}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="p-2 bg-slate-100 rounded-lg font-mono text-xs text-slate-700 inline-flex items-center gap-2">
                            <span>{staff.invitationToken || 'inv_tok_gen_active'}</span>
                            <button
                              onClick={() => navigator.clipboard.writeText(`http://localhost:3000/activate?token=${staff.invitationToken}`)}
                              className="text-indigo-600 hover:text-indigo-800"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-xs text-slate-500 font-mono">{staff.createdAt}</td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => handleResendInvite(staff.id)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm"
                          >
                            Resend Email
                          </button>
                          <button
                            onClick={() => handleDeleteStaff(staff.id)}
                            className="border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold px-3 py-1.5 rounded-lg"
                          >
                            Revoke Token
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* MODAL 1: ADD NEW STAFF MEMBER FORM                        */}
      {/* ========================================================= */}
      {isAddStaffOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-600" /> Add New Staff Member
              </h3>
              <button onClick={() => setIsAddStaffOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStaffSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Ananya"
                    value={newStaff.firstName}
                    onChange={(e) => setNewStaff({ ...newStaff, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rao"
                    value={newStaff.lastName}
                    onChange={(e) => setNewStaff({ ...newStaff, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="ananya.rao@school.edu"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={newStaff.phoneNumber}
                    onChange={(e) => setNewStaff({ ...newStaff, phoneNumber: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Role *</label>
                  <select
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white font-semibold"
                  >
                    <option value="TEACHER">TEACHER</option>
                    <option value="COUNSELOR">COUNSELOR</option>
                    <option value="SCHOOL_ADMIN">SCHOOL ADMIN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Department</label>
                  <input
                    type="text"
                    placeholder="e.g. Student Wellness"
                    value={newStaff.department}
                    onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Assigned Classes / Subjects (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="Grade 10-A Math, Grade 11 Calculus"
                  value={newStaff.assignedClassInput}
                  onChange={(e) => setNewStaff({ ...newStaff, assignedClassInput: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddStaffOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
                >
                  Send Onboarding Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: BULK CSV IMPORT                                  */}
      {/* ========================================================= */}
      {isBulkImportOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-6 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-indigo-600" /> Bulk CSV Staff Import
              </h3>
              <button onClick={() => setIsBulkImportOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Paste or preview your CSV data below. Format requires: <code>firstName,lastName,email,role,department</code>
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  CSV Data Content
                </label>
                <textarea
                  rows={6}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono leading-relaxed outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="p-3 bg-indigo-50 rounded-xl text-xs text-indigo-900 border border-indigo-100">
                💡 <strong>Tip:</strong> Automatic activation setup tokens will be generated for every valid CSV row and sent to the specified staff emails.
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsBulkImportOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleProcessBulkCsv}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
              >
                Process & Bulk Import
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
