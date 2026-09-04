'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Zap,
  Bot,
  BarChart3,
  Tv2,
  Bell,
  User,
  HelpCircle,
  Flame,
  Award,
  ChevronRight,
  ChevronDown,
  Search,
  Brain,
  Sliders,
  Sparkles,
  Lock
} from 'lucide-react';

export default function StudentLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    home: true,
    learn: true,
    practice: true,
    tutor: true,
    analytics: true,
    liveclass: true
  });

  const [student, setStudent] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@stxavier.edu.in',
    grade: 8,
    section: 'A',
    schoolName: 'St. Xavier International Academy',
    board: 'CBSE',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    level: 8,
    xp: 420,
    xpToNextLevel: 500,
    streakDays: 7
  });

  // Restore Active User Session if logged in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('active_user_session');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed.name || parsed.email) {
            setStudent(prev => ({
              ...prev,
              name: parsed.name || prev.name,
              email: parsed.email || prev.email,
              schoolName: parsed.schoolName || prev.schoolName
            }));
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  // Sidebar Menu Config with Dedicated 1-to-1 Page Routes
  const sidebarStructure = [
    {
      id: 'home',
      label: 'Home Workspace',
      icon: LayoutDashboard,
      baseRoute: '/student/home',
      subFeatures: [
        { id: 'daily-target', label: 'Daily Target & XP', href: '/student/home' },
        { id: 'daily-plan', label: 'Personalized Daily Plan', href: '/student/home/plan' },
        { id: 'weakness-alerts', label: 'Weakness Alerts', href: '/student/home/alerts' }
      ]
    },
    {
      id: 'learn',
      label: 'Learn Workspace',
      icon: BookOpen,
      baseRoute: '/student/learn',
      subFeatures: [
        { id: 'subject-library', label: 'Subject Library', href: '/student/learn/subjects' },
        { id: 'curriculum-hierarchy', label: 'Curriculum Hierarchy', href: '/student/learn/curriculum' },
        { id: 'multi-format', label: 'Multi-Format Viewer', href: '/student/learn/workspace' },
        { id: 'mastery-tracker', label: 'Topic Mastery Tracker', href: '/student/learn/mastery' }
      ]
    },
    {
      id: 'practice',
      label: 'Practice & Quizzes',
      icon: Zap,
      baseRoute: '/student/practice',
      subFeatures: [
        { id: 'adaptive-quiz', label: 'Adaptive Quiz Engine', href: '/student/practice/quiz' },
        { id: 'quiz-generator', label: 'AI Quiz Generator', href: '/student/practice/generator' },
        { id: 'educational-games', label: 'Educational Games Hub', href: '/student/practice/games' },
        { id: 'concept-hints', label: 'Instant Concept Hints', href: '/student/practice/hints' }
      ]
    },
    {
      id: 'tutor',
      label: 'AI Companion & Tutor',
      icon: Bot,
      baseRoute: '/student/ai-tutor',
      baseRouteMatch: '/student/ai-tutor',
      subFeatures: [
        { id: 'voice-ai', label: 'Voice AI Mode', href: '/student/ai-tutor/voice' },
        { id: 'interactive-whiteboard', label: 'Interactive Whiteboard', href: '/student/ai-tutor/whiteboard' },
        { id: 'persona-selector', label: 'Persona Switcher', href: '/student/ai-tutor/persona' },
        { id: 'understanding-check', label: 'Understanding Check', href: '/student/ai-tutor/verify' }
      ]
    },
    {
      id: 'analytics',
      label: 'Progress & Analytics',
      icon: BarChart3,
      baseRoute: '/student/analytics',
      subFeatures: [
        { id: 'performance-graphs', label: 'Performance Dashboard', href: '/student/analytics/performance' },
        { id: 'weakness-matrix', label: 'Weakness Matrix', href: '/student/analytics/weakness' },
        { id: 'gamification-hub', label: 'Gamification & Badges', href: '/student/analytics/achievements' },
        { id: 'ai-memory', label: 'AI Memory Log', href: '/student/analytics/memory' }
      ]
    },
    {
      id: 'liveclass',
      label: 'Live Class & Assignments',
      icon: Tv2,
      baseRoute: '/student/classroom',
      subFeatures: [
        { id: 'assignment-tracker', label: 'Assignment Tracker', href: '/student/classroom/assignments' },
        { id: 'live-classroom', label: 'Live Classroom View', href: '/student/classroom/live' },
        { id: 'class-assistant', label: 'AI Class Notes Assistant', href: '/student/classroom/notes' }
      ]
    }
  ];

  // Helper to Generate Dynamic Route Breadcrumbs
  const getBreadcrumbs = () => {
    if (pathname.includes('/student/home/plan')) {
      return ['Home Workspace', 'Personalized Daily Plan'];
    }
    if (pathname.includes('/student/home/alerts')) {
      return ['Home Workspace', 'Weakness Alerts'];
    }
    if (pathname.includes('/student/learn/curriculum')) {
      return ['Home', 'Learn Workspace', 'Curriculum Hierarchy'];
    }
    if (pathname.includes('/student/learn/subjects')) {
      return ['Home', 'Learn Workspace', 'Subject Library'];
    }
    if (pathname.includes('/student/learn/workspace')) {
      return ['Home', 'Learn Workspace', 'Multi-Format Viewer'];
    }
    if (pathname.includes('/student/learn/mastery')) {
      return ['Home', 'Learn Workspace', 'Topic Mastery Tracker'];
    }
    if (pathname.includes('/student/practice/quiz')) {
      return ['Home', 'Practice & Quizzes', 'Adaptive Quiz Engine'];
    }
    if (pathname.includes('/student/practice/generator')) {
      return ['Home', 'Practice & Quizzes', 'AI Quiz Generator'];
    }
    if (pathname.includes('/student/practice/games')) {
      return ['Home', 'Practice & Quizzes', 'Educational Games Hub'];
    }
    if (pathname.includes('/student/practice/hints')) {
      return ['Home', 'Practice & Quizzes', 'Instant Concept Hints'];
    }
    if (pathname.includes('/student/ai-tutor/voice')) {
      return ['Home', 'AI Companion', 'Voice AI Mode'];
    }
    if (pathname.includes('/student/ai-tutor/whiteboard')) {
      return ['Home', 'AI Companion', 'Interactive Whiteboard'];
    }
    if (pathname.includes('/student/ai-tutor/persona')) {
      return ['Home', 'AI Companion', 'Persona Switcher'];
    }
    if (pathname.includes('/student/ai-tutor/verify')) {
      return ['Home', 'AI Companion', 'Understanding Check'];
    }
    if (pathname.includes('/student/analytics/performance')) {
      return ['Home', 'Progress & Analytics', 'Performance Dashboard'];
    }
    if (pathname.includes('/student/analytics/weakness')) {
      return ['Home', 'Progress & Analytics', 'Weakness Matrix'];
    }
    if (pathname.includes('/student/analytics/achievements')) {
      return ['Home', 'Progress & Analytics', 'Gamification & Badges'];
    }
    if (pathname.includes('/student/analytics/memory')) {
      return ['Home', 'Progress & Analytics', 'AI Memory Log'];
    }
    if (pathname.includes('/student/classroom/assignments')) {
      return ['Home', 'Live Class', 'Assignment Tracker'];
    }
    if (pathname.includes('/student/classroom/live')) {
      return ['Home', 'Live Class', 'Live Classroom View'];
    }
    if (pathname.includes('/student/classroom/notes')) {
      return ['Home', 'Live Class', 'AI Class Notes Assistant'];
    }
    if (pathname.includes('/student/notifications')) {
      return ['Home', 'Notifications'];
    }
    if (pathname.includes('/student/profile')) {
      return ['Home', 'Profile Settings'];
    }
    if (pathname.includes('/student/support')) {
      return ['Home', 'Help & Support'];
    }
    return ['Home', 'Student Dashboard'];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f9fb] text-[#191c1e] font-sans antialiased">
      {/* ------------------------------------------------------------- */}
      {/* FIXED PERSISTENT LEFT SIDEBAR NAVIGATION                      */}
      {/* ------------------------------------------------------------- */}
      <aside
        className={`${
          sidebarCollapsed ? 'w-20' : 'w-72'
        } transition-all duration-300 bg-white border-r border-slate-200/80 flex flex-col justify-between z-30 shadow-sm shrink-0`}
      >
        <div className="overflow-y-auto flex-1">
          {/* Logo & Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/80 sticky top-0 bg-white z-10">
            {!sidebarCollapsed && (
              <Link href="/student/home" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#4648d4] via-[#6063ee] to-indigo-500 flex items-center justify-center shadow-md shadow-indigo-200">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-heading font-bold text-base text-slate-900 tracking-tight">
                    EduQuest AI
                  </h1>
                  <p className="text-[10px] text-[#4648d4] font-bold tracking-wider uppercase">Student Portal</p>
                </div>
              </Link>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition mx-auto"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>

          {/* Student Profile Widget */}
          {!sidebarCollapsed && (
            <div className="p-4 border-b border-slate-200/80 bg-indigo-50/40">
              <div className="flex items-center gap-3">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-10 h-10 rounded-2xl object-cover ring-2 ring-indigo-400/40"
                />
                <div className="overflow-hidden">
                  <h2 className="font-heading font-semibold text-sm truncate text-slate-900">{student.name}</h2>
                  <p className="text-xs text-indigo-700 font-medium truncate">Grade {student.grade}-{student.section} • {student.board}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-semibold bg-white p-2 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="flex items-center gap-1 text-amber-600">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" /> {student.streakDays} Day Streak
                </span>
                <span className="text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                  Lvl {student.level}
                </span>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <div className="p-3 space-y-2">
            {sidebarStructure.map(sec => {
              const IconComponent = sec.icon;
              const isSectionActive = pathname.startsWith(sec.baseRoute);
              const isExpanded = expandedSections[sec.id] ?? true;

              return (
                <div key={sec.id} className="space-y-1">
                  <div
                    onClick={() => toggleSection(sec.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition ${
                      isSectionActive
                        ? 'bg-indigo-50/80 text-[#4648d4] font-bold border border-indigo-200/60'
                        : 'hover:bg-slate-100 text-slate-700 font-semibold'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-5 h-5 ${isSectionActive ? 'text-[#4648d4]' : 'text-slate-500'}`} />
                      {!sidebarCollapsed && <span className="text-xs tracking-tight">{sec.label}</span>}
                    </div>
                    {!sidebarCollapsed && (
                      isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>

                  {!sidebarCollapsed && isExpanded && (
                    <div className="pl-9 space-y-1 border-l-2 border-slate-100 ml-5 py-1">
                      {sec.subFeatures.map(sub => {
                        const isSubActive = pathname === sub.href;

                        return (
                          <Link
                            key={sub.id}
                            href={sub.href}
                            className={`block p-2 rounded-xl text-xs font-semibold transition ${
                              isSubActive
                                ? 'bg-[#4648d4] text-white shadow-sm font-bold'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Persistent Bottom Sidebar Footer Links */}
        {!sidebarCollapsed && (
          <div className="p-3 border-t border-slate-200/80 bg-slate-50/80 space-y-1">
            <Link
              href="/student/notifications"
              className={`flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold transition ${pathname === '/student/notifications' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200/60'}`}
            >
              <Bell className="w-4 h-4" /> Notifications
            </Link>
            <Link
              href="/student/profile"
              className={`flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold transition ${pathname === '/student/profile' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200/60'}`}
            >
              <User className="w-4 h-4" /> Profile Settings
            </Link>
            <Link
              href="/student/support"
              className={`flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold transition ${pathname === '/student/support' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200/60'}`}
            >
              <HelpCircle className="w-4 h-4" /> Help & Support
            </Link>
          </div>
        )}
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* MAIN VIEWPORT WITH PERSISTENT HEADER & DYNAMIC CANVAS         */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* PERSISTENT HEADER UTILITY BAR */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-2xs">
          {/* Active Route Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 overflow-hidden">
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                <span className={idx === breadcrumbs.length - 1 ? 'font-bold text-[#4648d4] bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 truncate' : 'text-slate-500 truncate'}>
                  {b}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Global Search & Student Status Indicators */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search subjects, topics, or AI lessons..."
                className="pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 text-xs rounded-xl w-64 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4648d4] transition"
              />
            </div>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <span className="hidden sm:flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                <Award className="w-4 h-4 text-[#4648d4]" /> Level {student.level}
              </span>
              <span className="hidden sm:flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <Zap className="w-4 h-4 text-emerald-500 fill-emerald-500" /> {student.xp} XP
              </span>
              <Link href="/student/notifications" className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition">
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 bg-rose-500 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white" />
              </Link>
            </div>
          </div>
        </header>

        {/* DYNAMIC PAGE CANVAS */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
