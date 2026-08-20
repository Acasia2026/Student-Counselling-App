'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  Tv,
  CalendarDays,
  UserCheck,
  Brain,
  BarChart3,
  Megaphone,
  School,
  FileSpreadsheet,
  Settings,
  Search,
  Plus,
  Bell,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Trash2,
  Edit2,
  CheckCircle,
  X,
  Sparkles,
  Info,
  Calendar,
  Clock,
  Video,
  Mic,
  MicOff,
  VideoOff,
  ScreenShare,
  MessageSquare,
  ClipboardList,
  FolderLock,
  Download,
  Share2,
  LogOut,
  LayoutGrid,
  List,
  Sliders,
  Check,
  RefreshCw,
  PlusCircle,
  FileText
} from 'lucide-react';

// --- Micro Sparkline Component ---
const DashboardSparkline = ({ points, color = '#4F46E5' }: { points: number[]; color?: string }) => {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const width = 100;
  const height = 24;

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
      />
    </svg>
  );
};

// --- Custom SVG Dynamic Line Chart ---
const PerformanceLineChart = ({
  period,
  cls,
  sub,
  hoveredPoint,
  setHoveredPoint,
  loading
}: {
  period: string;
  cls: string;
  sub: string;
  hoveredPoint: number | null;
  setHoveredPoint: (idx: number | null) => void;
  loading: boolean;
}) => {
  // Generate data based on selected filters
  const getChartData = (pd: string, classVal: string, subjVal: string) => {
    let base = 75;
    if (classVal === 'Grade 7') base = 72;
    else if (classVal === 'Grade 8') base = 78;
    else if (classVal === 'Grade 12') base = 82;

    if (subjVal === 'Mathematics') base -= 4;
    else if (subjVal === 'Physics') base += 2;

    if (pd === '7D') {
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [base - 2, base - 1, base + 1, base, base + 2, base + 1, base + 1.6]
      };
    }
    if (pd === '3M') {
      return {
        labels: ['June', 'July', 'August'],
        values: [base - 4, base - 1, base + 2.6]
      };
    }
    if (pd === '6M') {
      return {
        labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        values: [base - 6, base - 4, base - 2, base, base + 2, base + 2.6]
      };
    }
    if (pd === '1Y') {
      return {
        labels: ['Sep', 'Nov', 'Jan', 'Mar', 'May', 'Jul', 'Aug'],
        values: [base - 10, base - 7, base - 4, base - 2, base + 1, base + 3, base + 3.6]
      };
    }
    // Default 30D
    return {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      values: [base - 3, base - 1, base + 1.5, base + 3.6]
    };
  };

  const data = getChartData(period, cls, sub);
  const minVal = Math.min(...data.values) - 4;
  const maxVal = Math.max(...data.values) + 4;
  const range = maxVal - minVal || 1;
  
  const width = 600;
  const height = 240;
  const paddingLeft = 45;
  const paddingRight = 25;
  const paddingTop = 25;
  const paddingBottom = 35;
  
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const points = data.values.map((val, idx) => {
    const x = paddingLeft + (idx / (data.values.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((val - minVal) / range) * chartHeight;
    return { x, y, val };
  });

  const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  // Create filled area path
  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`
    : '';

  if (loading) {
    return (
      <div className="w-full h-[240px] bg-slate-50/50 rounded-2xl flex items-center justify-center animate-pulse border border-slate-100">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Syncing Data Models...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[500px] h-[240px] overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid Lines & Y Axis Labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = paddingTop + ratio * chartHeight;
            const val = (maxVal - ratio * range).toFixed(1);
            return (
              <g key={idx}>
                <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#F1F5F9" strokeWidth="1.5" />
                <text x={paddingLeft - 10} y={y + 3.5} textAnchor="end" className="text-[9px] fill-slate-400 font-bold font-mono">{val}%</text>
              </g>
            );
          })}

          {/* Horizontal X Axis Labels */}
          {points.map((p, idx) => (
            <text key={idx} x={p.x} y={height - 12} textAnchor="middle" className="text-[10px] fill-slate-400 font-bold">{data.labels[idx]}</text>
          ))}

          {/* Area Fill */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Stroke Path */}
          <path d={pathD} fill="none" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Vertical indicator line on hover */}
          {hoveredPoint !== null && points[hoveredPoint] && (
            <line 
              x1={points[hoveredPoint].x} 
              y1={paddingTop} 
              x2={points[hoveredPoint].x} 
              y2={paddingTop + chartHeight} 
              stroke="#CBD5E1" 
              strokeWidth="1.5" 
              strokeDasharray="3 3" 
            />
          )}

          {/* Interactive Circle Dots */}
          {points.map((p, idx) => (
            <g 
              key={idx} 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(idx)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle cx={p.x} cy={p.y} r={hoveredPoint === idx ? 6 : 4} fill={hoveredPoint === idx ? "#7C3AED" : "#4F46E5"} stroke="#FFFFFF" strokeWidth="2" />
              <circle cx={p.x} cy={p.y} r="12" fill="transparent" />
            </g>
          ))}
        </svg>
      </div>

      {/* Dynamic Hover Tooltip inside HTML overlay */}
      {hoveredPoint !== null && points[hoveredPoint] && (
        <div 
          className="absolute z-20 bg-slate-900 text-white px-3 py-2 rounded-xl shadow-xl text-left border border-slate-800 animate-fadeIn pointer-events-none"
          style={{
            left: `${(points[hoveredPoint].x / width) * 100}%`,
            top: `${(points[hoveredPoint].y / height) * 100 - 25}%`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{data.labels[hoveredPoint]}</div>
          <div className="text-xs font-extrabold text-white mt-0.5">{points[hoveredPoint].val.toFixed(1)}% Avg Score</div>
          <div className="text-[9px] text-[#10B981] font-bold mt-0.5">+5.8% vs last month</div>
        </div>
      )}
    </div>
  );
};

export default function SchoolAdminDashboard() {
  const router = useRouter();

  // Collapsible Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Redirection checks or mock login loading state
  const [currentSchool, setCurrentSchool] = useState({
    name: 'St. Xavier International Academy',
    logo: '🏫',
    address: 'Plot 4, Institutional Area, Vasant Kunj, New Delhi',
    board: 'CBSE / IB Curriculum',
    academicYear: '2026 - 2027',
    counselor: 'Dr. Evelyn Vance'
  });

  // Navigation tabs
  // Parent item matching sidebar design rules
  const [activeMenu, setActiveMenu] = useState('dashboard'); // 'dashboard', 'academic', 'users', 'learning', 'liveClass', 'attendance', 'aiIntelligence', 'analytics', 'communication', 'reports', 'settings'
  const [activeSubMenu, setActiveSubMenu] = useState('overview'); // varies per section

  // Modals & overlay controller
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [showPageHeaderCreate, setShowPageHeaderCreate] = useState(false);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2026-2027');
  const [classesSearch, setClassesSearch] = useState('');
  const [classesFilterTeacher, setClassesFilterTeacher] = useState('ALL');
  const [classesFilterStatus, setClassesFilterStatus] = useState('ALL');
  const [classesViewMode, setClassesViewMode] = useState<'list' | 'grid'>('list');
  const [expandedClasses, setExpandedClasses] = useState<string[]>([]);
  const [selectedClassForView, setSelectedClassForView] = useState<any | null>(null);
  const [classDetailsTab, setClassDetailsTab] = useState('overview');
  const [bulkSelectedSections, setBulkSelectedSections] = useState<string[]>([]);
  const [newClassForm, setNewClassForm] = useState({ academicYear: '2026-2027', name: '', code: '', status: 'Active' });
  const [newSectionForm, setNewSectionForm] = useState({ classId: '', name: '', code: '', classTeacher: '', maxStudents: '45', room: '', status: 'Active' });
  const [assignTeacherForm, setAssignTeacherForm] = useState({ classId: '', sectionId: '', teacherName: '' });
  const [selectedSubjectForView, setSelectedSubjectForView] = useState<any | null>(null);
  const [subjectDetailsTab, setSubjectDetailsTab] = useState('overview');
  const [subjectsViewMode, setSubjectsViewMode] = useState<'list' | 'grid'>('list');
  const [subjectsSearch, setSubjectsSearch] = useState('');
  const [subjectsFilterClass, setSubjectsFilterClass] = useState('ALL');
  const [subjectsFilterTeacher, setSubjectsFilterTeacher] = useState('ALL');
  const [subjectsFilterStatus, setSubjectsFilterStatus] = useState('ALL');
  const [bulkSelectedSubjects, setBulkSelectedSubjects] = useState<string[]>([]);
  const [newSubjectForm, setNewSubjectForm] = useState({ name: '', code: '', type: 'Core', description: '', status: 'Active' });
  const [assignSubjectForm, setAssignSubjectForm] = useState({ subjectId: '', academicYear: '2026-2027', classes: [] as string[], sections: [] as string[], teacherName: '' });
  const [assignSubjectTeacherForm, setAssignSubjectTeacherForm] = useState({ subjectId: '', classId: '', sectionId: '', teacherName: '', academicYear: '2026-2027' });
  const [subjectPerformancePeriod, setSubjectPerformancePeriod] = useState('30D');
  const [chartPeriod, setChartPeriod] = useState('30D');
  const [chartClass, setChartClass] = useState('ALL');
  const [chartSubject, setChartSubject] = useState('ALL');
  const [hoveredChartPoint, setHoveredChartPoint] = useState<number | null>(null);
  const [chartLoading, setChartLoading] = useState(false);
  const [currentModal, setCurrentModal] = useState<string | null>(null); // 'createStudent', 'createTeacher', 'createClass', 'createAssignment', 'createQuiz', 'scheduleClass', 'sendAnnouncement'
  const [notificationToast, setNotificationToast] = useState<{message: string, type: 'success' | 'error' | 'warning'} | null>(null);
  const [overrideModalAlert, setOverrideModalAlert] = useState<{message: string, action: () => void} | null>(null);
  const [curriculumBoard, setCurriculumBoard] = useState('CBSE');
  const [curriculumClass, setCurriculumClass] = useState('8');
  const [curriculumSubject, setCurriculumSubject] = useState('Mathematics');
  const [curriculumSearch, setCurriculumSearch] = useState('');
  const [curriculumFilterType, setCurriculumFilterType] = useState('ALL');
  const [curriculumFilterStatus, setCurriculumFilterStatus] = useState('ALL');
  const [expandedChapters, setExpandedChapters] = useState<string[]>(['CHAP-01']);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['TOP-01']);
  const [selectedChapterOrTopicForView, setSelectedChapterOrTopicForView] = useState<any | null>(null);
  const [newChapterForm, setNewChapterForm] = useState({ name: '', number: '', description: '', learningTime: '5 hours', status: 'Draft' });
  const [newTopicForm, setNewTopicForm] = useState({ chapterId: '', name: '', number: '', description: '', learningObjective: '', learningTime: '45 minutes', status: 'Draft' });
  const [newContentForm, setNewContentForm] = useState({ class: '8', subject: 'Mathematics', chapterId: '', topicId: '', contentType: 'Lesson', title: '', description: '', learningObjective: '', duration: '15 min', contentUrl: '', file: null as File | null });
  const [curriculumAiInput, setCurriculumAiInput] = useState({ class: '8', subject: 'Mathematics', chapter: '', topic: '', difficulty: 'Medium', learningObjective: '', questionsCount: '10', type: 'Quiz' });
  const [curriculumAiOutput, setCurriculumAiOutput] = useState<any | null>(null);
  const [importCurriculumStep, setImportCurriculumStep] = useState(1);
  const [curriculumVersion, setCurriculumVersion] = useState('2026-2027');

  // ── Academic Calendar ────────────────────────────────────────────────────────
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'list'>('month');
  const [calendarYear, setCalendarYear] = useState(2026);
  const [calendarMonth, setCalendarMonth] = useState(7); // 0-indexed: 7 = August
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState<any | null>(null);
  const [calendarSearch, setCalendarSearch] = useState('');
  const [calendarFilterType, setCalendarFilterType] = useState('ALL');
  const [calendarFilterClass, setCalendarFilterClass] = useState('ALL');
  const [calendarFilterStatus, setCalendarFilterStatus] = useState('ALL');
  const [calendarConflictAlert, setCalendarConflictAlert] = useState<string | null>(null);
  const [showAcademicYearSettings, setShowAcademicYearSettings] = useState(false);
  const [newEventForm, setNewEventForm] = useState({
    name: '', type: 'Academic', date: '', startTime: '', endTime: '', description: '',
    location: '', organizer: 'School Admin', audience: 'Entire School', class: '',
    section: '', subject: '', teacher: '', status: 'Draft', notifySend: false
  });
  const [calendarEventsList, setCalendarEventsList] = useState<any[]>([
    { id: 'EVT-001', name: 'Independence Day Holiday', type: 'Holiday', date: '2026-08-15', startTime: '', endTime: '', description: 'National holiday. School closed.', location: 'School', organizer: 'School Admin', audience: 'Entire School', class: '', section: '', subject: '', teacher: '', status: 'Published' },
    { id: 'EVT-002', name: 'Mathematics Unit Test', type: 'Test', date: '2026-08-10', startTime: '10:00', endTime: '11:30', description: 'Unit Test covering Rational Numbers.', location: 'Room 204', organizer: 'School Admin', audience: 'Specific Class', class: 'Class 8', section: 'A', subject: 'Mathematics', teacher: 'Mr. Ramesh', status: 'Published' },
    { id: 'EVT-003', name: 'Parent-Teacher Meeting', type: 'Parent Meeting', date: '2026-08-20', startTime: '09:00', endTime: '12:00', description: 'Mid-term parent-teacher interaction session.', location: 'School Hall', organizer: 'School Admin', audience: 'Entire School', class: '', section: '', subject: '', teacher: '', status: 'Published' },
    { id: 'EVT-004', name: 'Science Examination', type: 'Exam', date: '2026-08-25', startTime: '09:00', endTime: '11:00', description: 'Term 1 Science Exam for Class 9.', location: 'Room 101', organizer: 'School Admin', audience: 'Specific Class', class: 'Class 9', section: 'A, B', subject: 'Science', teacher: 'Ms. Priya', status: 'Published' },
    { id: 'EVT-005', name: 'Assignment Deadline – English', type: 'Assignment Deadline', date: '2026-08-28', startTime: '23:59', endTime: '', description: 'Final submission for English prose assignment.', location: '', organizer: 'Ms. Kavita', audience: 'Specific Class', class: 'Class 7', section: 'B', subject: 'English', teacher: 'Ms. Kavita', status: 'Published' },
    { id: 'EVT-006', name: 'Live Mathematics Class', type: 'Live Class', date: '2026-08-30', startTime: '11:00', endTime: '12:00', description: 'Interactive live session on Linear Equations.', location: 'Online', organizer: 'Mr. Ramesh', audience: 'Specific Class', class: 'Class 8', section: 'A', subject: 'Mathematics', teacher: 'Mr. Ramesh', status: 'Published' },
    { id: 'EVT-007', name: 'Annual Sports Day', type: 'School Event', date: '2026-08-05', startTime: '08:00', endTime: '17:00', description: 'Annual inter-house sports competition.', location: 'School Ground', organizer: 'Sports Department', audience: 'Entire School', class: '', section: '', subject: '', teacher: '', status: 'Published' },
    { id: 'EVT-008', name: 'Admission Open Day', type: 'Admission', date: '2026-08-18', startTime: '10:00', endTime: '16:00', description: 'Open day for new admissions 2026-27.', location: 'Admin Block', organizer: 'School Admin', audience: 'Parents', class: '', section: '', subject: '', teacher: '', status: 'Published' },
  ]);

  const [curriculumDataList, setCurriculumDataList] = useState<any[]>([
    {
      id: 'CHAP-01',
      number: '1',
      name: 'Rational Numbers',
      topicsCount: 15,
      learningTime: '5 hours',
      description: 'Understanding rational numbers, properties and operations.',
      status: 'Published',
      topics: [
        {
          id: 'TOP-01',
          number: '1.1',
          name: 'Number Line Representation',
          completionStatus: 'Completed',
          status: 'Published',
          description: 'Learn how to represent rational numbers on a number line.',
          learningObjective: 'Locate rational numbers accurately on a horizontal scale.',
          learningTime: '45 mins',
          content: [
            { id: 'CNT-01', title: 'Introduction to Rational Numbers', type: 'Lesson', duration: '15 min', createdBy: 'School Admin', status: 'Published', lastUpdated: '2026-08-10' },
            { id: 'CNT-02', title: 'Number Line Interactive Exercise', type: 'Interactive Activity', duration: '20 min', createdBy: 'Teacher', status: 'Published', lastUpdated: '2026-08-12' },
            { id: 'CNT-03', title: 'Plotting Numbers Practice Quiz', type: 'Quiz', duration: '10 questions', createdBy: 'AI Generated', status: 'Review Required', lastUpdated: '2026-08-18' }
          ]
        },
        {
          id: 'TOP-02',
          number: '1.2',
          name: 'Properties of Rational Numbers',
          completionStatus: 'In Progress',
          status: 'Published',
          description: 'Commutative, associative, and distributive properties.',
          learningObjective: 'Apply mathematical rules to simplify rational equations.',
          learningTime: '60 mins',
          content: [
            { id: 'CNT-04', title: 'Rational Properties PDF Guide', type: 'PDF', duration: '10 pages', createdBy: 'School Admin', status: 'Published', lastUpdated: '2026-08-08' }
          ]
        }
      ]
    },
    {
      id: 'CHAP-02',
      number: '2',
      name: 'Linear Equations',
      topicsCount: 12,
      learningTime: '8 hours',
      description: 'Solving linear equations in one variable and word problems.',
      status: 'Draft',
      topics: [
        {
          id: 'TOP-03',
          number: '2.1',
          name: 'Introduction to Variables',
          completionStatus: 'Not Started',
          status: 'Draft',
          description: 'Basics of algebraic expressions and equality.',
          learningObjective: 'Formulate single-variable linear equations from statement situations.',
          learningTime: '40 mins',
          content: []
        }
      ]
    }
  ]);

  // Trigger toast timer helper
  const triggerToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setNotificationToast({ message, type });
    setTimeout(() => setNotificationToast(null), 3000);
  };

  // State Management for Students
  const [studentsList, setStudentsList] = useState([
    { id: 'STU-001', name: 'Aarav Sharma', admissionNo: 'ADM-2025-091', class: 'Grade 7', section: 'A', parent: 'Rajesh Sharma', attendance: 94.2, performance: 62.0, status: 'ACTIVE', admissionYear: '2025', gender: 'Male' },
    { id: 'STU-002', name: 'Kabir Mehta', admissionNo: 'ADM-2025-112', class: 'Grade 8', section: 'B', parent: 'Alok Mehta', attendance: 91.8, performance: 88.5, status: 'ACTIVE', admissionYear: '2025', gender: 'Male' },
    { id: 'STU-003', name: 'Riya Patel', admissionNo: 'ADM-2026-004', class: 'Grade 9', section: 'A', parent: 'Meera Patel', attendance: 96.0, performance: 81.0, status: 'ACTIVE', admissionYear: '2026', gender: 'Female' },
    { id: 'STU-004', name: 'Karan Verma', admissionNo: 'ADM-2024-342', class: 'Grade 12', section: 'A', parent: 'Sanjay Verma', attendance: 88.4, performance: 54.2, status: 'ACTIVE', admissionYear: '2024', gender: 'Male' },
    { id: 'STU-005', name: 'Ananya Roy', admissionNo: 'ADM-2025-055', class: 'Grade 7', section: 'B', parent: 'Dilip Roy', attendance: 95.1, performance: 92.0, status: 'ACTIVE', admissionYear: '2025', gender: 'Female' },
    { id: 'STU-006', name: 'Zoya Khan', admissionNo: 'ADM-2026-092', class: 'Grade 7', section: 'A', parent: 'Tariq Khan', attendance: 78.4, performance: 74.0, status: 'ACTIVE', admissionYear: '2026', gender: 'Female' }
  ]);

  // Student filtering states
  const [studentSearch, setStudentSearch] = useState('');
  const [studentFilterClass, setStudentFilterClass] = useState('ALL');
  const [studentFilterSection, setStudentFilterSection] = useState('ALL');
  const [studentFilterGender, setStudentFilterGender] = useState('ALL');
  const [studentFilterStatus, setStudentFilterStatus] = useState('ALL');
  const [studentFilterYear, setStudentFilterYear] = useState('ALL');

  // Add Student state variables
  const [newStudentForm, setNewStudentForm] = useState({
    fullName: '', dob: '', gender: 'Male', profilePhoto: '',
    admissionNumber: '', class: 'Grade 7', section: 'A', rollNumber: '', admissionYear: '2026',
    parentName: '', parentEmail: '', parentPhone: '',
    email: '', username: '', tempPassword: ''
  });

  // State Management for Teachers
  const [teachersList, setTeachersList] = useState([
    { id: 'TCH-101', name: 'Vikram Seth', empId: 'EMP-9021', email: 'v.seth@stxavier.edu.in', classes: ['Grade 11-A', 'Grade 10-B'], subjects: ['Mathematics', 'Calculus'], studentsCount: 65, status: 'ACTIVE', lastActive: 'Today' },
    { id: 'TCH-102', name: 'Sunita Sharma', empId: 'EMP-9022', email: 's.sharma@stxavier.edu.in', classes: ['Grade 7-A', 'Grade 8-B'], subjects: ['Mathematics', 'Algebra'], studentsCount: 72, status: 'ACTIVE', lastActive: '10m ago' },
    { id: 'TCH-103', name: 'Dr. Ananya Rao', empId: 'EMP-9023', email: 'a.rao@stxavier.edu.in', classes: ['Grade 12-A', 'Grade 12-B'], subjects: ['Physics', 'Science'], studentsCount: 58, status: 'ACTIVE', lastActive: 'Yesterday' },
    { id: 'TCH-104', name: 'Amit Sen', empId: 'EMP-9024', email: 'a.sen@stxavier.edu.in', classes: ['Grade 9-A'], subjects: ['English Literature'], studentsCount: 30, status: 'INACTIVE', lastActive: '5 days ago' }
  ]);

  // Add Teacher state variables
  const [newTeacherForm, setNewTeacherForm] = useState({
    fullName: '', email: '', phone: '', employeeId: '', department: 'Mathematics & STEM',
    joiningDate: '2026-08-20', classes: 'Grade 7-A', subjects: 'Mathematics', role: 'Teacher',
    permissionTemplate: 'Standard Teacher'
  });

  // Parents State
  const [parentsList, setParentsList] = useState([
    { id: 'PR-901', name: 'Rajesh Sharma', student: 'Aarav Sharma', class: 'Grade 7A', email: 'rajesh.sharma@gmail.com', phone: '+91 98123 45678', status: 'ACTIVE', lastActive: 'Today' },
    { id: 'PR-902', name: 'Alok Mehta', student: 'Kabir Mehta', class: 'Grade 8B', email: 'alok.mehta@yahoo.com', phone: '+91 97112 33445', status: 'ACTIVE', lastActive: '2h ago' },
    { id: 'PR-903', name: 'Meera Patel', student: 'Riya Patel', class: 'Grade 9A', email: 'meera.patel@gmail.com', phone: '+91 98765 09876', status: 'ACTIVE', lastActive: 'Yesterday' }
  ]);

  // Class List
  const [classesList, setClassesList] = useState<any[]>([
    {
      id: 'CLS-001',
      name: 'Class 6',
      code: 'CLASS-06',
      totalStudents: 120,
      classTeacher: 'Rahul Sharma',
      avgPerf: 79,
      attendance: 93,
      status: 'Active',
      academicYear: '2026-2027',
      sections: [
        { id: 'SEC-001', name: 'Section A', code: '6-A', students: 42, classTeacher: 'Rahul Sharma', performance: 82, attendance: 94, room: '101', status: 'Active' },
        { id: 'SEC-002', name: 'Section B', code: '6-B', students: 38, classTeacher: 'Priya Mehta', performance: 78, attendance: 91, room: '102', status: 'Active' },
        { id: 'SEC-003', name: 'Section C', code: '6-C', students: 40, classTeacher: 'Amit Kumar', performance: 76, attendance: 92, room: '103', status: 'Active' }
      ],
      subjects: [
        { name: 'Mathematics', teacher: 'Rahul Sharma', sections: ['A', 'B', 'C'] },
        { name: 'Science', teacher: 'Priya Mehta', sections: ['A', 'B'] },
        { name: 'English', teacher: 'Amit Kumar', sections: ['A', 'B', 'C'] }
      ]
    },
    {
      id: 'CLS-002',
      name: 'Class 7',
      code: 'CLASS-07',
      totalStudents: 80,
      classTeacher: 'Sunita Sharma',
      avgPerf: 72.8,
      attendance: 91.2,
      status: 'Active',
      academicYear: '2026-2027',
      sections: [
        { id: 'SEC-004', name: 'Section A', code: '7-A', students: 40, classTeacher: 'Sunita Sharma', performance: 74, attendance: 92, room: '201', status: 'Active' },
        { id: 'SEC-005', name: 'Section B', code: '7-B', students: 40, classTeacher: 'Vikram Seth', performance: 71.6, attendance: 90.4, room: '202', status: 'Active' }
      ],
      subjects: [
        { name: 'Algebra', teacher: 'Sunita Sharma', sections: ['A', 'B'] },
        { name: 'English', teacher: 'Amit Kumar', sections: ['A'] },
        { name: 'Science', teacher: 'Priya Mehta', sections: ['A', 'B'] }
      ]
    },
    {
      id: 'CLS-003',
      name: 'Class 8',
      code: 'CLASS-08',
      totalStudents: 120,
      classTeacher: 'Preeti Malhotra',
      avgPerf: 82,
      attendance: 93,
      status: 'Active',
      academicYear: '2026-2027',
      sections: [
        { id: 'SEC-006', name: 'Section A', code: '8-A', students: 45, classTeacher: 'Preeti Malhotra', performance: 84, attendance: 94, room: '301', status: 'Active' },
        { id: 'SEC-007', name: 'Section B', code: '8-B', students: 40, classTeacher: 'Sunita Sharma', performance: 81, attendance: 93, room: '302', status: 'Active' },
        { id: 'SEC-008', name: 'Section C', code: '8-C', students: 35, classTeacher: 'Vikram Seth', performance: 79, attendance: 91, room: '303', status: 'Active' }
      ],
      subjects: [
        { name: 'Mathematics', teacher: 'Preeti Malhotra', sections: ['A', 'B', 'C'] },
        { name: 'Social Studies', teacher: 'Amit Kumar', sections: ['A', 'B', 'C'] }
      ]
    }
  ]);

  // Subjects List
  const [subjectsList, setSubjectsList] = useState<any[]>([
    {
      id: 'SUB-01',
      name: 'Mathematics',
      code: 'MATH-001',
      classes: 'Classes 6–10',
      teachersCount: 8,
      teachers: ['Rahul Sharma', 'Preeti Malhotra', 'Sunita Sharma', 'Vikram Seth'],
      chapters: 15,
      topicsCount: 84,
      resourcesCount: 246,
      students: 620,
      performance: 78,
      attendance: 93,
      status: 'Active',
      type: 'Core',
      description: 'Mathematics curriculum for Classes 6–10 covering calculus, algebra, and geometry.',
      chaptersList: [
        { name: 'Chapter 1: Number Systems', topics: 8 },
        { name: 'Chapter 2: Algebra', topics: 6 },
        { name: 'Chapter 3: Geometry', topics: 7 }
      ],
      classesList: [
        { name: 'Class 8', sections: 'A, B, C', teacher: 'Preeti Malhotra', students: 120, performance: 82, attendance: 93, status: 'Active' },
        { name: 'Class 7', sections: 'A, B', teacher: 'Sunita Sharma', students: 80, performance: 74, attendance: 92, status: 'Active' },
        { name: 'Class 6', sections: 'A, B, C', teacher: 'Rahul Sharma', students: 120, performance: 82, attendance: 94, status: 'Active' }
      ]
    },
    {
      id: 'SUB-02',
      name: 'Science',
      code: 'SCI-001',
      classes: 'Classes 6–10',
      teachersCount: 7,
      teachers: ['Priya Mehta', 'Dr. Ananya Rao', 'Sunil Kapoor'],
      chapters: 12,
      topicsCount: 64,
      resourcesCount: 180,
      students: 580,
      performance: 81,
      attendance: 92,
      status: 'Active',
      type: 'Core',
      description: 'General Science curriculum including basic physics, chemistry, and biology.',
      chaptersList: [
        { name: 'Chapter 1: Physics AP', topics: 10 },
        { name: 'Chapter 2: Organic Chemistry', topics: 8 },
        { name: 'Chapter 3: Genetics', topics: 6 }
      ],
      classesList: [
        { name: 'Class 7', sections: 'A, B', teacher: 'Priya Mehta', students: 80, performance: 78, attendance: 91, status: 'Active' },
        { name: 'Class 6', sections: 'A, B', teacher: 'Priya Mehta', students: 80, performance: 76, attendance: 92, status: 'Active' }
      ]
    },
    {
      id: 'SUB-03',
      name: 'English',
      code: 'ENG-001',
      classes: 'Classes 1–10',
      teachersCount: 9,
      teachers: ['Amit Kumar', 'Pooja Nair', 'Amit Sen'],
      chapters: 18,
      topicsCount: 96,
      resourcesCount: 310,
      students: 920,
      performance: 84,
      attendance: 94,
      status: 'Active',
      type: 'Language',
      description: 'English Grammar, Literature, and Creative Writing courses.',
      chaptersList: [
        { name: 'Chapter 1: Prose Analysis', topics: 12 },
        { name: 'Chapter 2: Grammar & Syntax', topics: 9 },
        { name: 'Chapter 3: Creative Writing', topics: 8 }
      ],
      classesList: [
        { name: 'Class 6', sections: 'A, B, C', teacher: 'Amit Kumar', students: 120, performance: 80, attendance: 93, status: 'Active' }
      ]
    }
  ]);

  // Assignments List
  const [assignmentsList, setAssignmentsList] = useState([
    { id: 'ASM-01', title: 'Algebra Equations Homework', subject: 'Mathematics', class: 'Grade 7A', teacher: 'Sunita Sharma', createdDate: '2026-08-15', dueDate: '2026-08-22', submissionRate: 74, avgScore: 68, status: 'PUBLISHED' },
    { id: 'ASM-02', title: 'Motion & Mechanics Lab', subject: 'Physics', class: 'Grade 12A', teacher: 'Dr. Ananya Rao', createdDate: '2026-08-18', dueDate: '2026-08-25', submissionRate: 92, avgScore: 82, status: 'PUBLISHED' },
    { id: 'ASM-03', title: 'English Prose Writing', subject: 'English', class: 'Grade 9A', teacher: 'Amit Sen', createdDate: '2026-08-10', dueDate: '2026-08-17', submissionRate: 100, avgScore: 78, status: 'CLOSED' }
  ]);

  // Add Assignment state
  const [newAssignmentForm, setNewAssignmentForm] = useState({
    title: '', subject: 'Mathematics', class: 'Grade 7A', teacher: 'Sunita Sharma', dueDate: '2026-08-26'
  });

  // Quizzes State
  const [quizzesList, setQuizzesList] = useState([
    { id: 'QZ-01', title: 'Quadratic Equations Mini Test', subject: 'Mathematics', class: 'Grade 8A', questionsCount: 15, attempts: 28, avgScore: 71.4, status: 'ACTIVE' },
    { id: 'QZ-02', title: 'Cell Biology Quick Assessment', subject: 'Science', class: 'Grade 7B', questionsCount: 10, attempts: 32, avgScore: 82.5, status: 'ACTIVE' }
  ]);

  // AI Quiz Generator Input State
  const [aiQuizInput, setAiQuizInput] = useState({
    class: 'Grade 7', subject: 'Mathematics', chapter: 'Algebra', topic: 'Linear Equations',
    difficulty: 'Medium', questionCount: 10, questionType: 'Multiple Choice'
  });
  
  // Generated AI quiz results layout
  const [generatedAiQuiz, setGeneratedAiQuiz] = useState<any[] | null>(null);

  // Live Classrooms State
  const [liveClasses, setLiveClasses] = useState([
    { id: 'LIV-01', class: 'Grade 7', section: 'A', subject: 'Mathematics', teacher: 'Sunita Sharma', topic: 'Solving Linear Inequalities', date: '2026-08-20', startTime: '15:00', duration: 45, description: 'Live demonstration of plotting algebraic inequalities on number lines.', status: 'SCHEDULED' },
    { id: 'LIV-02', class: 'Grade 12', section: 'A', subject: 'Physics', teacher: 'Dr. Ananya Rao', topic: 'Electromagnetic Induction', date: '2026-08-20', startTime: '16:30', duration: 60, description: 'Faradays law and Faraday cage simulation.', status: 'SCHEDULED' }
  ]);

  // Live Classroom Scheduling Form
  const [newLiveClassForm, setNewLiveClassForm] = useState({
    class: 'Grade 7', section: 'A', subject: 'Mathematics', teacher: 'Sunita Sharma', topic: '',
    date: '2026-08-20', startTime: '15:00', duration: '45', description: ''
  });

  // Live Class Active View
  const [activeLiveClassSession, setActiveLiveClassSession] = useState<any | null>(null);
  const [liveClassChat, setLiveClassChat] = useState<{sender: string, text: string, time: string}[]>([
    { sender: 'Teacher (Sunita)', text: 'Welcome students, please confirm if my screen is visible.', time: '15:01' },
    { sender: 'Aarav Sharma', text: 'Yes maam, it is visible.', time: '15:02' }
  ]);
  const [liveClassChatInput, setLiveClassChatInput] = useState('');
  const [raisedHands, setRaisedHands] = useState<string[]>([]);
  const [liveSessionRole, setLiveSessionRole] = useState<'teacher' | 'student'>('teacher');
  const [classWhiteboardPaths, setClassWhiteboardPaths] = useState<string[]>([]);
  const [isWhiteboardActive, setIsWhiteboardActive] = useState(false);

  // AI Live Class Post-Summary Data (Mocked from analysis)
  const [selectedPostClassSummary, setSelectedPostClassSummary] = useState<any | null>(null);

  // AI Insights State
  const [aiInsights, setAiInsights] = useState([
    { category: 'distress', text: '4 students showed increased test-anxiety indicators in Algebra practice session.', status: 'attention' },
    { category: 'improvement', text: 'Grade 8B Mathematics average score improved by 14% this month.', status: 'success' },
    { category: 'difficulty', text: 'Algebra is currently the most difficult topic across Grades 7-9 based on chatbot analytics.', status: 'warning' },
    { category: 'engagement', text: '42 students completed personalized revision recommendations today.', status: 'success' }
  ]);

  // AI Student recommendations detail
  const [selectedStudentRec, setSelectedStudentRec] = useState<string | null>(null);

  // AI Content Assistant Editor
  const [aiContentInput, setAiContentInput] = useState({
    type: 'Lesson Plan', topic: 'Quadratic Equations', grade: 'Grade 8', notes: 'Include visual models'
  });
  const [generatedAiContent, setGeneratedAiContent] = useState<string | null>(null);

  // Attendance Register (Daily/Weekly/Monthly)
  const [attendanceDate, setAttendanceDate] = useState('2026-08-20');
  const [attendanceClass, setAttendanceClass] = useState('Grade 7');
  const [attendanceSection, setAttendanceSection] = useState('A');
  const [attendanceList, setAttendanceList] = useState<Record<string, 'Present' | 'Absent' | 'Late' | 'Leave'>>({
    'STU-001': 'Present',
    'STU-005': 'Present',
    'STU-006': 'Absent'
  });

  // Announcements List
  const [announcements, setAnnouncements] = useState([
    { id: 'AN-01', title: 'Mid-term Cognitive Profiling Assessment Schedule', message: 'The cognitive studio testing using WJ IV factors begins on Tuesday. All class teachers must share the scheduling details.', audience: 'Teachers & Parents', scheduleDate: '2026-08-21', attachments: 'Schedule_PDF.pdf' },
    { id: 'AN-02', title: 'Independence Day Assembly Highlights', message: 'Thank you students, teachers, and parents for making the platform celebration a grand success.', audience: 'Entire School', scheduleDate: '2026-08-16', attachments: '' }
  ]);

  // New Announcement form
  const [newAnnouncementForm, setNewAnnouncementForm] = useState({
    title: '', message: '', audience: 'Entire School', schedule: '', attachments: ''
  });

  // Roles & Permissions matrix
  const [rolesList, setRolesList] = useState([
    { name: 'School Admin', description: 'Full school configuration and oversight', custom: false },
    { name: 'Teacher', description: 'Standard teaching and grading control', custom: false },
    { name: 'Class Teacher', description: 'Assigned classroom management & analytics', custom: false },
    { name: 'Subject Teacher', description: 'Curriculum publishing & quiz inputs', custom: false },
    { name: 'Counsellor', description: 'Distress logs & CHC profiling calibration access', custom: false },
    { name: 'Content Manager', description: 'Manages library content and lesson plans', custom: false }
  ]);
  const [selectedRoleForPermissions, setSelectedRoleForPermissions] = useState('Teacher');
  const [permissionsMatrix, setPermissionsMatrix] = useState<Record<string, Record<string, boolean>>>({
    'Teacher': {
      'View Students': true, 'Create Student': false, 'Edit Student': false, 'Deactivate Student': false,
      'View Teachers': true, 'Create Teacher': false, 'Edit Teacher': false, 'Deactivate Teacher': false,
      'View Classes': true, 'Create Classes': false, 'Manage Sections': false,
      'Create Assignment': true, 'Edit Assignment': true, 'Publish Assignment': true, 'View Submissions': true,
      'Create Quiz': true, 'AI Generate Quiz': true, 'Publish Quiz': true,
      'View Attendance': true, 'Mark Attendance': true,
      'Create Live Class': true, 'Start Live Class': true,
      'View Student Analytics': true, 'Use AI Tools': true, 'Generate Learning Content': true
    },
    'School Admin': {
      'View Students': true, 'Create Student': true, 'Edit Student': true, 'Deactivate Student': true,
      'View Teachers': true, 'Create Teacher': true, 'Edit Teacher': true, 'Deactivate Teacher': true,
      'View Classes': true, 'Create Classes': true, 'Manage Sections': true,
      'Create Assignment': true, 'Edit Assignment': true, 'Publish Assignment': true, 'View Submissions': true,
      'Create Quiz': true, 'AI Generate Quiz': true, 'Publish Quiz': true,
      'View Attendance': true, 'Mark Attendance': true,
      'Create Live Class': true, 'Start Live Class': true,
      'View Student Analytics': true, 'Use AI Tools': true, 'Generate Learning Content': true
    }
  });

  // Settings State variables
  const [settingsForm, setSettingsForm] = useState({
    schoolName: 'St. Xavier International Academy',
    address: 'Plot 4, Institutional Area, Vasant Kunj, New Delhi',
    academicYear: '2026 - 2027',
    board: 'CBSE Board',
    aiSensitivity: 0.78,
    recordLiveClasses: true,
    notificationEmails: true,
    securityIsolation: true
  });

  // Time filter state for analytics
  const [analyticsPeriod, setAnalyticsPeriod] = useState('30D');

  // Attention Required Alerts
  const [attentionAlerts, setAttentionAlerts] = useState([
    { id: 'AL-01', text: 'Class 7B mathematics performance has dropped by 11% this week.', type: 'error', linkTab: 'analytics', linkSub: 'class' },
    { id: 'AL-02', text: '24 students have pending math homework assignments due tomorrow.', type: 'warning', linkTab: 'learning', linkSub: 'assignments' },
    { id: 'AL-03', text: '12 students have not logged in for 7 days.', type: 'error', linkTab: 'users', linkSub: 'students' },
    { id: 'AL-04', text: '3 teachers have not published their weekly assignments.', type: 'warning', linkTab: 'learning', linkSub: 'assignments' },
    { id: 'AL-05', text: '8 students require additional practice in Algebra.', type: 'info', linkTab: 'aiIntelligence', linkSub: 'recommendations' }
  ]);

  // Bulk operations variables
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // --- Handlers ---
  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentForm.fullName || !newStudentForm.admissionNumber) {
      triggerToast('Please fill out all required fields.', 'error');
      return;
    }
    const newStudent = {
      id: `STU-00${studentsList.length + 1}`,
      name: newStudentForm.fullName,
      admissionNo: newStudentForm.admissionNumber,
      class: newStudentForm.class,
      section: newStudentForm.section,
      parent: newStudentForm.parentName,
      attendance: 100.0,
      performance: 0.0, // Newly added
      status: 'ACTIVE',
      admissionYear: newStudentForm.admissionYear,
      gender: newStudentForm.gender
    };
    setStudentsList([...studentsList, newStudent]);
    setCurrentModal(null);
    triggerToast(`Student ${newStudent.name} successfully registered.`);
    // Reset Form
    setNewStudentForm({
      fullName: '', dob: '', gender: 'Male', profilePhoto: '',
      admissionNumber: '', class: 'Grade 7', section: 'A', rollNumber: '', admissionYear: '2026',
      parentName: '', parentEmail: '', parentPhone: '',
      email: '', username: '', tempPassword: ''
    });
  };

  const handleAddTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherForm.fullName || !newTeacherForm.employeeId) {
      triggerToast('Required fields are missing.', 'error');
      return;
    }
    const newTeacher = {
      id: `TCH-${teachersList.length + 101}`,
      name: newTeacherForm.fullName,
      empId: newTeacherForm.employeeId,
      email: newTeacherForm.email,
      classes: [newTeacherForm.classes],
      subjects: [newTeacherForm.subjects],
      studentsCount: 30,
      status: 'ACTIVE',
      lastActive: 'Just registered'
    };
    setTeachersList([...teachersList, newTeacher]);
    setCurrentModal(null);
    triggerToast(`Teacher ${newTeacher.name} successfully created.`);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssignmentForm.title) return;
    const newAssignment = {
      id: `ASM-${assignmentsList.length + 1}`,
      title: newAssignmentForm.title,
      subject: newAssignmentForm.subject,
      class: newAssignmentForm.class,
      teacher: newAssignmentForm.teacher,
      createdDate: new Date().toISOString().split('T')[0],
      dueDate: newAssignmentForm.dueDate,
      submissionRate: 0,
      avgScore: 0,
      status: 'PUBLISHED'
    };
    setAssignmentsList([newAssignment, ...assignmentsList]);
    setCurrentModal(null);
    triggerToast('Assignment published to students.');
  };

  const handleScheduleLiveClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLiveClassForm.topic) return;
    const newSession = {
      id: `LIV-${liveClasses.length + 1}`,
      class: newLiveClassForm.class,
      section: newLiveClassForm.section,
      subject: newLiveClassForm.subject,
      teacher: newLiveClassForm.teacher,
      topic: newLiveClassForm.topic,
      date: newLiveClassForm.date,
      startTime: newLiveClassForm.startTime,
      duration: parseInt(newLiveClassForm.duration),
      description: newLiveClassForm.description,
      status: 'SCHEDULED'
    };
    setLiveClasses([...liveClasses, newSession]);
    setCurrentModal(null);
    triggerToast('Live class successfully scheduled.');
  };

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncementForm.title || !newAnnouncementForm.message) return;
    const newAnn = {
      id: `AN-${announcements.length + 1}`,
      title: newAnnouncementForm.title,
      message: newAnnouncementForm.message,
      audience: newAnnouncementForm.audience,
      scheduleDate: newAnnouncementForm.schedule || new Date().toISOString().split('T')[0],
      attachments: newAnnouncementForm.attachments
    };
    setAnnouncements([newAnn, ...announcements]);
    setCurrentModal(null);
    triggerToast('Announcement published successfully.');
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassForm.name) return;
    const newClass = {
      id: `CLS-${String(classesList.length + 1).padStart(3, '0')}`,
      name: `Class ${newClassForm.name}`,
      code: newClassForm.code || `CLASS-${newClassForm.name.padStart(2, '0')}`,
      totalStudents: 0,
      classTeacher: 'Unassigned',
      avgPerf: 0,
      attendance: 0,
      status: newClassForm.status,
      academicYear: newClassForm.academicYear,
      sections: [],
      subjects: []
    };
    setClassesList([...classesList, newClass]);
    setCurrentModal(null);
    setNewClassForm({ academicYear: '2026-2027', name: '', code: '', status: 'Active' });
    triggerToast(`Class ${newClassForm.name} created successfully. Now add sections.`);
  };

  const handleCreateSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionForm.name || !newSectionForm.classId) return;
    setClassesList(classesList.map(cls => {
      if (cls.id === newSectionForm.classId) {
        const newSec = {
          id: `SEC-${String(cls.sections.length + 10).padStart(3, '0')}`,
          name: `Section ${newSectionForm.name}`,
          code: newSectionForm.code || `${cls.name.replace('Class ', '')}-${newSectionForm.name}`,
          students: 0,
          classTeacher: newSectionForm.classTeacher || 'Unassigned',
          performance: 0,
          attendance: 0,
          room: newSectionForm.room || 'TBD',
          status: newSectionForm.status
        };
        const updatedSections = [...cls.sections, newSec];
        return {
          ...cls,
          sections: updatedSections,
          totalStudents: cls.totalStudents + newSec.students
        };
      }
      return cls;
    }));
    setCurrentModal(null);
    setNewSectionForm({ classId: '', name: '', code: '', classTeacher: '', maxStudents: '45', room: '', status: 'Active' });
    triggerToast(`Section ${newSectionForm.name} added successfully.`);
  };

  const handleAssignClassTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTeacherForm.classId || !assignTeacherForm.sectionId || !assignTeacherForm.teacherName) return;
    setClassesList(classesList.map(cls => {
      if (cls.id === assignTeacherForm.classId) {
        const updatedSections = cls.sections.map((sec: any) => {
          if (sec.id === assignTeacherForm.sectionId) {
            return { ...sec, classTeacher: assignTeacherForm.teacherName };
          }
          return sec;
        });
        const isPrimary = assignTeacherForm.sectionId === cls.sections[0]?.id;
        return {
          ...cls,
          sections: updatedSections,
          classTeacher: isPrimary ? assignTeacherForm.teacherName : cls.classTeacher
        };
      }
      return cls;
    }));
    setCurrentModal(null);
    setAssignTeacherForm({ classId: '', sectionId: '', teacherName: '' });
    triggerToast(`Teacher assigned as Class Teacher successfully.`);
  };

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectForm.name || !newSubjectForm.code) return;
    const newSub = {
      id: `SUB-${String(subjectsList.length + 1).padStart(2, '0')}`,
      name: newSubjectForm.name,
      code: newSubjectForm.code,
      classes: 'Unassigned',
      teachersCount: 0,
      teachers: [],
      chapters: 0,
      topicsCount: 0,
      resourcesCount: 0,
      students: 0,
      performance: 0,
      attendance: 0,
      status: newSubjectForm.status,
      type: newSubjectForm.type,
      description: newSubjectForm.description,
      chaptersList: [],
      classesList: []
    };
    setSubjectsList([...subjectsList, newSub]);
    setCurrentModal(null);
    setNewSubjectForm({ name: '', code: '', type: 'Core', description: '', status: 'Active' });
    triggerToast(`Subject ${newSubjectForm.name} created successfully. Now assign to classes.`);
  };

  const handleAssignSubjectToClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignSubjectForm.subjectId || !assignSubjectForm.teacherName) return;
    setSubjectsList(subjectsList.map(sub => {
      if (sub.id === assignSubjectForm.subjectId) {
        const classNames = assignSubjectForm.classes.join(', ');
        const sectionNames = assignSubjectForm.sections.join(', ');
        const newClassAssign = assignSubjectForm.classes.map(clsName => ({
          name: clsName,
          sections: sectionNames,
          teacher: assignSubjectForm.teacherName,
          students: 120, // default mock student count
          performance: 75,
          attendance: 92,
          status: 'Active'
        }));
        
        // Add assigned teacher if not exists
        const updatedTeachers = sub.teachers.includes(assignSubjectForm.teacherName)
          ? sub.teachers
          : [...sub.teachers, assignSubjectForm.teacherName];

        return {
          ...sub,
          classes: sub.classes === 'Unassigned' ? classNames : `${sub.classes}, ${classNames}`,
          teachersCount: updatedTeachers.length,
          teachers: updatedTeachers,
          students: sub.students + (assignSubjectForm.classes.length * 120),
          classesList: [...sub.classesList, ...newClassAssign]
        };
      }
      return sub;
    }));
    setCurrentModal(null);
    triggerToast(`Subject successfully assigned to Class ${assignSubjectForm.classes.join(', ')}.`);
    setAssignSubjectForm({ subjectId: '', academicYear: '2026-2027', classes: [], sections: [], teacherName: '' });
  };

  const handleAssignTeacherToSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignSubjectTeacherForm.subjectId || !assignSubjectTeacherForm.classId || !assignSubjectTeacherForm.teacherName) return;
    
    // Check if another teacher is already assigned to this subject, class, and section
    const targetSub = subjectsList.find(s => s.id === assignSubjectTeacherForm.subjectId);
    if (targetSub) {
      const classItem = targetSub.classesList.find((c: any) => c.name === assignSubjectTeacherForm.classId);
      if (classItem && classItem.sections.includes(assignSubjectTeacherForm.sectionId) && classItem.teacher !== 'Unassigned' && classItem.teacher !== assignSubjectTeacherForm.teacherName) {
        // Teacher already assigned alert override warning
        if (!overrideModalAlert) {
          setOverrideModalAlert({
            message: `Teacher ${classItem.teacher} is already assigned to this class and section. Do you want to replace them with ${assignSubjectTeacherForm.teacherName}?`,
            action: () => {
              setOverrideModalAlert(null);
              // Run actual replacement logic
              executeTeacherReplacement();
            }
          });
          return;
        }
      }
    }
    
    executeTeacherReplacement();

    function executeTeacherReplacement() {
      setSubjectsList(subjectsList.map(sub => {
        if (sub.id === assignSubjectTeacherForm.subjectId) {
          const updatedClasses = sub.classesList.map((c: any) => {
            if (c.name === assignSubjectTeacherForm.classId) {
              return { ...c, teacher: assignSubjectTeacherForm.teacherName };
            }
            return c;
          });
          const updatedTeachers = sub.teachers.includes(assignSubjectTeacherForm.teacherName)
            ? sub.teachers
            : [...sub.teachers, assignSubjectTeacherForm.teacherName];
          return {
            ...sub,
            teachers: updatedTeachers,
            teachersCount: updatedTeachers.length,
            classesList: updatedClasses
          };
        }
        return sub;
      }));
      setCurrentModal(null);
      setAssignSubjectTeacherForm({ subjectId: '', classId: '', sectionId: '', teacherName: '', academicYear: '2026-2027' });
      triggerToast(`Teacher assigned successfully.`);
    }
  };

  const handleCreateChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterForm.name || !newChapterForm.number) return;
    const newChap = {
      id: `CHAP-${String(curriculumDataList.length + 1).padStart(2, '0')}`,
      number: newChapterForm.number,
      name: newChapterForm.name,
      topicsCount: 0,
      learningTime: newChapterForm.learningTime,
      description: newChapterForm.description,
      status: newChapterForm.status,
      topics: []
    };
    setCurriculumDataList([...curriculumDataList, newChap]);
    setCurrentModal(null);
    setNewChapterForm({ name: '', number: '', description: '', learningTime: '5 hours', status: 'Draft' });
    triggerToast(`Chapter ${newChapterForm.number} created successfully.`);
  };

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicForm.name || !newTopicForm.number || !newTopicForm.chapterId) return;
    setCurriculumDataList(curriculumDataList.map(chap => {
      if (chap.id === newTopicForm.chapterId) {
        const newTop = {
          id: `TOP-${String(chap.topics.length + 10).padStart(2, '0')}`,
          number: `${chap.number}.${newTopicForm.number}`,
          name: newTopicForm.name,
          completionStatus: 'Not Started',
          status: newTopicForm.status,
          description: newTopicForm.description,
          learningObjective: newTopicForm.learningObjective,
          learningTime: newTopicForm.learningTime,
          content: []
        };
        return {
          ...chap,
          topicsCount: chap.topicsCount + 1,
          topics: [...chap.topics, newTop]
        };
      }
      return chap;
    }));
    setCurrentModal(null);
    setNewTopicForm({ chapterId: '', name: '', number: '', description: '', learningObjective: '', learningTime: '45 minutes', status: 'Draft' });
    triggerToast(`Topic ${newTopicForm.name} added successfully.`);
  };

  const handleCreateContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContentForm.title || !newContentForm.chapterId || !newContentForm.topicId) return;
    setCurriculumDataList(curriculumDataList.map(chap => {
      if (chap.id === newContentForm.chapterId) {
        const updatedTopics = chap.topics.map((t: any) => {
          if (t.id === newContentForm.topicId) {
            const newRes = {
              id: `CNT-${String(t.content.length + 20).padStart(2, '0')}`,
              title: newContentForm.title,
              type: newContentForm.contentType,
              duration: newContentForm.duration,
              createdBy: 'School Admin',
              status: 'Published',
              lastUpdated: new Date().toISOString().split('T')[0]
            };
            return {
              ...t,
              content: [...t.content, newRes]
            };
          }
          return t;
        });
        return { ...chap, topics: updatedTopics };
      }
      return chap;
    }));
    setCurrentModal(null);
    setNewContentForm({ class: '8', subject: 'Mathematics', chapterId: '', topicId: '', contentType: 'Lesson', title: '', description: '', learningObjective: '', duration: '15 min', contentUrl: '', file: null });
    triggerToast('Learning content uploaded successfully.');
  };

  const handleCurriculumAiGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!curriculumAiInput.topic) return;
    setChartLoading(true);
    setTimeout(() => {
      setChartLoading(false);
      setCurriculumAiOutput({
        title: `${curriculumAiInput.topic} AI Generated Practice Quiz`,
        type: 'Quiz',
        questionsCount: curriculumAiInput.questionsCount,
        difficulty: curriculumAiInput.difficulty,
        objective: curriculumAiInput.learningObjective || 'Practice conceptual validation.',
        status: 'Review Required',
        questions: [
          { q: 'Question 1: Simplify the expression mapping rational coordinates...', a: 'A' },
          { q: 'Question 2: Apply properties of closure on rational multiplication...', a: 'C' }
        ]
      });
      triggerToast('AI Content Draft generated. Please review.');
    }, 1500);
  };

  const handleApproveCurriculumAiContent = (chapterId: string, topicId: string) => {
    if (!curriculumAiOutput) return;
    setCurriculumDataList(curriculumDataList.map(chap => {
      if (chap.id === chapterId) {
        const updatedTopics = chap.topics.map((t: any) => {
          if (t.id === topicId) {
            const newRes = {
              id: `CNT-${String(t.content.length + 30).padStart(2, '0')}`,
              title: curriculumAiOutput.title,
              type: curriculumAiOutput.type,
              duration: `${curriculumAiOutput.questionsCount} questions`,
              createdBy: 'AI Generated',
              status: 'Published',
              lastUpdated: new Date().toISOString().split('T')[0]
            };
            return {
              ...t,
              content: [...t.content, newRes]
            };
          }
          return t;
        });
        return { ...chap, topics: updatedTopics };
      }
      return chap;
    }));
    setCurriculumAiOutput(null);
    setCurrentModal(null);
    triggerToast('AI generated content approved and published.');
  };

  const handleToggleStudentSelection = (id: string) => {
    if (selectedStudentIds.includes(id)) {
      setSelectedStudentIds(selectedStudentIds.filter(sid => sid !== id));
    } else {
      setSelectedStudentIds([...selectedStudentIds, id]);
    }
  };

  // ── Calendar Helpers ─────────────────────────────────────────────────────────
  const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const getCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();
    const days: { date: number; month: 'prev' | 'current' | 'next'; fullDate: string }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = daysInPrev - i;
      const m = month - 1 < 0 ? 11 : month - 1;
      const y = month - 1 < 0 ? year - 1 : year;
      days.push({ date: d, month: 'prev', fullDate: `${y}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}` });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ date: d, month: 'current', fullDate: `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}` });
    }
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const m = month + 1 > 11 ? 0 : month + 1;
      const y = month + 1 > 11 ? year + 1 : year;
      days.push({ date: d, month: 'next', fullDate: `${y}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}` });
    }
    return days;
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'Holiday': return 'bg-red-100 text-red-700 border-red-200';
      case 'Exam': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Test': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Parent Meeting': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Live Class': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'Assignment Deadline': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'School Event': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Result': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'Admission': return 'bg-sky-100 text-sky-700 border-sky-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getEventDot = (type: string) => {
    switch (type) {
      case 'Holiday': return 'bg-red-500';
      case 'Exam': return 'bg-purple-500';
      case 'Test': return 'bg-indigo-500';
      case 'Parent Meeting': return 'bg-amber-500';
      case 'Live Class': return 'bg-cyan-500';
      case 'Assignment Deadline': return 'bg-orange-500';
      case 'School Event': return 'bg-emerald-500';
      default: return 'bg-slate-400';
    }
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventForm.name || !newEventForm.date) return;
    // Basic conflict check: same teacher, same time, same date
    const conflict = calendarEventsList.find(ev =>
      ev.teacher && ev.teacher === newEventForm.teacher &&
      ev.date === newEventForm.date &&
      ev.startTime === newEventForm.startTime &&
      ev.id !== (selectedCalendarEvent?.id || '')
    );
    if (conflict) {
      setCalendarConflictAlert(`Scheduling conflict: ${newEventForm.teacher} is already assigned to "${conflict.name}" at ${conflict.startTime} on ${newEventForm.date}.`);
      return;
    }
    const newEv = {
      id: `EVT-${String(calendarEventsList.length + 1).padStart(3, '0')}`,
      ...newEventForm
    };
    setCalendarEventsList([...calendarEventsList, newEv]);
    setCurrentModal(null);
    setNewEventForm({ name: '', type: 'Academic', date: '', startTime: '', endTime: '', description: '', location: '', organizer: 'School Admin', audience: 'Entire School', class: '', section: '', subject: '', teacher: '', status: 'Draft', notifySend: false });
    triggerToast(`Event "${newEv.name}" created successfully.`);
  };

  const calendarNavPrev = () => {
    if (calendarMonth === 0) { setCalendarMonth(11); setCalendarYear(calendarYear - 1); }
    else setCalendarMonth(calendarMonth - 1);
  };
  const calendarNavNext = () => {
    if (calendarMonth === 11) { setCalendarMonth(0); setCalendarYear(calendarYear + 1); }
    else setCalendarMonth(calendarMonth + 1);
  };
  const calendarNavToday = () => { setCalendarMonth(new Date().getMonth()); setCalendarYear(new Date().getFullYear()); };

  const filteredCalendarEvents = calendarEventsList.filter(ev => {
    const matchSearch = ev.name.toLowerCase().includes(calendarSearch.toLowerCase()) || ev.description.toLowerCase().includes(calendarSearch.toLowerCase());
    const matchType = calendarFilterType === 'ALL' || ev.type === calendarFilterType;
    const matchClass = calendarFilterClass === 'ALL' || ev.class === calendarFilterClass;
    const matchStatus = calendarFilterStatus === 'ALL' || ev.status === calendarFilterStatus;
    return matchSearch && matchType && matchClass && matchStatus;
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const todayEvents = filteredCalendarEvents.filter(ev => ev.date === todayStr);
  const upcomingEvents = filteredCalendarEvents.filter(ev => ev.date >= todayStr).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 8);

  const handleBulkDeactivate = () => {
    setStudentsList(studentsList.map(s => {
      if (selectedStudentIds.includes(s.id)) {
        return { ...s, status: 'INACTIVE' };
      }
      return s;
    }));
    setSelectedStudentIds([]);
    triggerToast('Selected student profiles deactivated.');
  };

  const handleBulkNotify = () => {
    triggerToast(`Sent alert notification to ${selectedStudentIds.length} students/parents.`);
    setSelectedStudentIds([]);
  };

  const handleAiQuizGenerate = () => {
    triggerToast('AI generating questions based on CHC factor performance weightage...');
    setTimeout(() => {
      setGeneratedAiQuiz([
        { q: 'Solve the equation for x: 3x + 7 = 22', options: ['x = 3', 'x = 5', 'x = 4', 'x = 6'], correct: 'x = 5', exp: 'Subtract 7 from both sides to get 3x = 15, then divide by 3.' },
        { q: 'What is the coefficient of x in the expression 4x^2 - 12x + 9?', options: ['4', '9', '-12', '12'], correct: '-12', exp: 'The term containing x is -12x, so the coefficient is -12.' },
        { q: 'Which value of x makes the equation 5(x - 2) = 20 true?', options: ['x = 4', 'x = 6', 'x = 8', 'x = 5'], correct: 'x = 6', exp: 'Divide both sides by 5 to get x - 2 = 4, then add 2.' }
      ]);
      triggerToast('AI Quiz successfully generated.');
    }, 1500);
  };

  const handleApproveGeneratedQuiz = () => {
    if (!generatedAiQuiz) return;
    const newQuiz = {
      id: `QZ-${quizzesList.length + 1}`,
      title: `${aiQuizInput.topic} AI Assessment`,
      subject: aiQuizInput.subject,
      class: `${aiQuizInput.class}A`,
      questionsCount: generatedAiQuiz.length,
      attempts: 0,
      avgScore: 0,
      status: 'ACTIVE'
    };
    setQuizzesList([newQuiz, ...quizzesList]);
    setGeneratedAiQuiz(null);
    triggerToast('AI generated quiz approved and published.');
  };

  const handleAiContentGenerate = () => {
    triggerToast('AI synthesizing content parameters...');
    setTimeout(() => {
      setGeneratedAiContent(`### Lesson Plan: ${aiContentInput.topic} (${aiContentInput.grade})
**Objective:** Provide evidence-based cognitive strategies matching CHC visual-spatial weights.
**Introduction (10 minutes):** Visual representation of x-y axes and equations.
**Main Content (20 minutes):**
1. Step-by-step resolution mapping visual formulas.
2. Formulate real-world representations.
**Conclusion & Assessment (15 minutes):** 3-question formative assessment matching the AI Recommendation guidelines.`);
      triggerToast('AI Assistant generated content.');
    }, 1000);
  };

  const handleApproveContent = () => {
    setGeneratedAiContent(null);
    triggerToast('AI content approved and saved to Study Materials library.');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('School settings successfully saved to secure isolated schema.');
  };

  const handleSavePermissions = () => {
    triggerToast(`Custom permissions updated for the ${selectedRoleForPermissions} role.`);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/auth';
    }
  };

  // Filtering Students
  const filteredStudents = studentsList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.admissionNo.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesClass = studentFilterClass === 'ALL' || s.class === studentFilterClass;
    const matchesSection = studentFilterSection === 'ALL' || s.section === studentFilterSection;
    const matchesGender = studentFilterGender === 'ALL' || s.gender === studentFilterGender;
    const matchesStatus = studentFilterStatus === 'ALL' || s.status === studentFilterStatus;
    const matchesYear = studentFilterYear === 'ALL' || s.admissionYear === studentFilterYear;
    return matchesSearch && matchesClass && matchesSection && matchesGender && matchesStatus && matchesYear;
  });

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-[#0F172A] overflow-hidden font-sans">
      
      {/* --- NOTIFICATION TOAST --- */}
      {notificationToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 shadow-xl rounded-2xl animate-bounce">
          {notificationToast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
          {notificationToast.type === 'error' && <X className="w-5 h-5 text-red-500" />}
          <span className="text-xs font-bold text-slate-800">{notificationToast.message}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* LEFT SIDEBAR                                              */}
      {/* ========================================================= */}
      <aside className={`bg-white border-r border-slate-200/80 flex flex-col justify-between z-20 shrink-0 select-none transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div>
          {/* Logo & School Name */}
          <div className="p-5 flex items-center gap-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-[#4F46E5] shrink-0 shadow-sm">
              <School className="w-4.5 h-4.5" />
            </div>
            {!sidebarCollapsed && (
              <div className="overflow-hidden">
                <h1 className="font-extrabold text-sm text-slate-900 truncate">{currentSchool.name}</h1>
                <p className="text-[10px] text-[#4F46E5] font-bold uppercase tracking-wider">{currentSchool.board}</p>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[75vh]">
            {/* 1. Dashboard Overview */}
            <button
              onClick={() => { setActiveMenu('dashboard'); setActiveSubMenu('overview'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeMenu === 'dashboard' ? 'bg-indigo-50/70 text-[#4F46E5]' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Dashboard Overview</span>}
            </button>

            {/* 2. Academic Section */}
            <div className="space-y-1">
              <button
                onClick={() => { setActiveMenu('academic'); setActiveSubMenu('classes'); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeMenu === 'academic' ? 'bg-indigo-50/70 text-[#4F46E5]' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && (
                  <div className="flex justify-between items-center w-full">
                    <span>Academics</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
              {activeMenu === 'academic' && !sidebarCollapsed && (
                <div className="pl-8 space-y-1">
                  <button onClick={() => setActiveSubMenu('classes')} className={`w-full text-left py-1.5 text-[11px] font-semibold ${activeSubMenu === 'classes' ? 'text-[#4F46E5]' : 'text-slate-500 hover:text-slate-800'}`}>Classes & Sections</button>
                  <button onClick={() => setActiveSubMenu('subjects')} className={`w-full text-left py-1.5 text-[11px] font-semibold ${activeSubMenu === 'subjects' ? 'text-[#4F46E5]' : 'text-slate-500 hover:text-slate-800'}`}>Subjects & Syllabus</button>
                  <button onClick={() => setActiveSubMenu('curriculum')} className={`w-full text-left py-1.5 text-[11px] font-semibold ${activeSubMenu === 'curriculum' ? 'text-[#4F46E5]' : 'text-slate-500 hover:text-slate-800'}`}>Curriculum Management</button>
                  <button onClick={() => setActiveSubMenu('calendar')} className={`w-full text-left py-1.5 text-[11px] font-semibold ${activeSubMenu === 'calendar' ? 'text-[#4F46E5]' : 'text-slate-500 hover:text-slate-800'}`}>Academic Calendar</button>
                </div>
              )}
            </div>

            {/* 3. Users Section */}
            <div className="space-y-1">
              <button
                onClick={() => { setActiveMenu('users'); setActiveSubMenu('students'); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeMenu === 'users' ? 'bg-indigo-50/70 text-[#4F46E5]' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && (
                  <div className="flex justify-between items-center w-full">
                    <span>User Management</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
              {activeMenu === 'users' && !sidebarCollapsed && (
                <div className="pl-8 space-y-1">
                  <button onClick={() => setActiveSubMenu('students')} className={`w-full text-left py-1.5 text-[11px] font-semibold ${activeSubMenu === 'students' ? 'text-[#4F46E5]' : 'text-slate-500 hover:text-slate-800'}`}>Students</button>
                  <button onClick={() => setActiveSubMenu('teachers')} className={`w-full text-left py-1.5 text-[11px] font-semibold ${activeSubMenu === 'teachers' ? 'text-[#4F46E5]' : 'text-slate-500 hover:text-slate-800'}`}>Teachers</button>
                  <button onClick={() => setActiveSubMenu('parents')} className={`w-full text-left py-1.5 text-[11px] font-semibold ${activeSubMenu === 'parents' ? 'text-[#4F46E5]' : 'text-slate-500 hover:text-slate-800'}`}>Parents</button>
                  <button onClick={() => setActiveSubMenu('roles')} className={`w-full text-left py-1.5 text-[11px] font-semibold ${activeSubMenu === 'roles' ? 'text-[#4F46E5]' : 'text-slate-500 hover:text-slate-800'}`}>Roles & Permissions</button>
                </div>
              )}
            </div>

            {/* 4. Learning Section */}
            <div className="space-y-1">
              <button
                onClick={() => { setActiveMenu('learning'); setActiveSubMenu('assignments'); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeMenu === 'learning' ? 'bg-indigo-50/70 text-[#4F46E5]' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <ClipboardList className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && (
                  <div className="flex justify-between items-center w-full">
                    <span>Digital Learning</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
              {activeMenu === 'learning' && !sidebarCollapsed && (
                <div className="pl-8 space-y-1">
                  <button onClick={() => setActiveSubMenu('assignments')} className={`w-full text-left py-1.5 text-[11px] font-semibold ${activeSubMenu === 'assignments' ? 'text-[#4F46E5]' : 'text-slate-500 hover:text-slate-800'}`}>Assignments</button>
                  <button onClick={() => setActiveSubMenu('quizzes')} className={`w-full text-left py-1.5 text-[11px] font-semibold ${activeSubMenu === 'quizzes' ? 'text-[#4F46E5]' : 'text-slate-500 hover:text-slate-800'}`}>Quizzes & Banks</button>
                </div>
              )}
            </div>

            {/* 5. Live Classroom */}
            <button
              onClick={() => { setActiveMenu('liveClass'); setActiveSubMenu('classroom'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeMenu === 'liveClass' ? 'bg-indigo-50/70 text-[#4F46E5]' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Tv className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Live Classroom</span>}
            </button>

            {/* 6. Attendance */}
            <button
              onClick={() => { setActiveMenu('attendance'); setActiveSubMenu('overview'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeMenu === 'attendance' ? 'bg-indigo-50/70 text-[#4F46E5]' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <UserCheck className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Attendance Logs</span>}
            </button>

            {/* 7. AI Intelligence */}
            <div className="space-y-1">
              <button
                onClick={() => { setActiveMenu('aiIntelligence'); setActiveSubMenu('insights'); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeMenu === 'aiIntelligence' ? 'bg-indigo-50/70 text-[#4F46E5]' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Brain className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && (
                  <div className="flex justify-between items-center w-full">
                    <span>AI Intelligence</span>
                    <Sparkles className="w-3 h-3 text-cyan-500 animate-pulse" />
                  </div>
                )}
              </button>
              {activeMenu === 'aiIntelligence' && !sidebarCollapsed && (
                <div className="pl-8 space-y-1">
                  <button onClick={() => setActiveSubMenu('insights')} className={`w-full text-left py-1.5 text-[11px] font-semibold ${activeSubMenu === 'insights' ? 'text-[#4F46E5]' : 'text-slate-500 hover:text-slate-800'}`}>AI Insights Board</button>
                  <button onClick={() => setActiveSubMenu('quizGenerator')} className={`w-full text-left py-1.5 text-[11px] font-semibold ${activeSubMenu === 'quizGenerator' ? 'text-[#4F46E5]' : 'text-slate-500 hover:text-slate-800'}`}>AI Quiz Generator</button>
                  <button onClick={() => setActiveSubMenu('contentAssistant')} className={`w-full text-left py-1.5 text-[11px] font-semibold ${activeSubMenu === 'contentAssistant' ? 'text-[#4F46E5]' : 'text-slate-500 hover:text-slate-800'}`}>AI Lesson Planner</button>
                  <button onClick={() => setActiveSubMenu('recommendations')} className={`w-full text-left py-1.5 text-[11px] font-semibold ${activeSubMenu === 'recommendations' ? 'text-[#4F46E5]' : 'text-slate-500 hover:text-slate-800'}`}>Student Recommendations</button>
                </div>
              )}
            </div>

            {/* 8. Analytics */}
            <button
              onClick={() => { setActiveMenu('analytics'); setActiveSubMenu('overview'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeMenu === 'analytics' ? 'bg-indigo-50/70 text-[#4F46E5]' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Advanced Analytics</span>}
            </button>

            {/* 9. Communication */}
            <button
              onClick={() => { setActiveMenu('communication'); setActiveSubMenu('overview'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeMenu === 'communication' ? 'bg-indigo-50/70 text-[#4F46E5]' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Megaphone className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Announcements</span>}
            </button>

            {/* 10. Reports */}
            <button
              onClick={() => { setActiveMenu('reports'); setActiveSubMenu('overview'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeMenu === 'reports' ? 'bg-indigo-50/70 text-[#4F46E5]' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Compliance Reports</span>}
            </button>

            {/* 11. Settings */}
            <button
              onClick={() => { setActiveMenu('settings'); setActiveSubMenu('profile'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeMenu === 'settings' ? 'bg-indigo-50/70 text-[#4F46E5]' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>School Settings</span>}
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Profile */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-extrabold text-xs shrink-0">
              SA
            </div>
            {!sidebarCollapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-extrabold text-slate-800 truncate">School Admin</p>
                <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
                </span>
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <button onClick={handleLogout} className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MAIN CONTENT REGION                                       */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* --- HEADER --- */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          
          <div className="flex items-center gap-3">
            {/* Sidebar toggle button */}
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg">
              <Sliders className="w-4 h-4" />
            </button>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Global Search students, classes, settings..."
                className="w-full pl-9 pr-4 py-2 bg-slate-100/70 border border-transparent rounded-xl text-xs outline-none focus:border-indigo-400 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Quick Action Button */}
            <div className="relative">
              <button
                onClick={() => setShowQuickCreate(!showQuickCreate)}
                className="bg-[#4F46E5] hover:bg-[#7C3AED] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create</span>
              </button>
              {showQuickCreate && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-30 py-2">
                  <button onClick={() => { setShowQuickCreate(false); setCurrentModal('createStudent'); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-[#4F46E5]">Create Student</button>
                  <button onClick={() => { setShowQuickCreate(false); setCurrentModal('createTeacher'); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-[#4F46E5]">Create Teacher</button>
                  <button onClick={() => { setShowQuickCreate(false); setCurrentModal('createAssignment'); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-[#4F46E5]">Create Assignment</button>
                  <button onClick={() => { setShowQuickCreate(false); setCurrentSubmenuAndTab('aiIntelligence', 'quizGenerator'); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-[#4F46E5]">AI Quiz Generator</button>
                  <button onClick={() => { setShowQuickCreate(false); setCurrentModal('scheduleClass'); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-[#4F46E5]">Schedule Live Class</button>
                  <button onClick={() => { setShowQuickCreate(false); setCurrentModal('sendAnnouncement'); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-[#4F46E5]">Send Announcement</button>
                </div>
              )}
            </div>

            <button className="p-2 text-slate-400 hover:text-[#4F46E5] relative rounded-xl">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>

            <button className="p-2 text-slate-400 hover:text-[#4F46E5] rounded-xl">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* --- MAIN ROUTED BODY --- */}
        <main className="p-8 max-w-7xl w-full mx-auto space-y-8 animate-fadeIn">
          
          {/* ======================================================= */}
          {/* TAB 1: OVERVIEW DASHBOARD                               */}
          {/* ======================================================= */}
          {activeMenu === 'dashboard' && activeSubMenu === 'overview' && (
            <div className="space-y-8">
              
              {/* ========================================================= */}
              {/* PAGE HEADER                                               */}
              {/* ========================================================= */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">Good Morning, School Admin</h2>
                  <p className="text-slate-500 text-xs mt-1">Here's what's happening across your school today.</p>
                </div>
                <div className="flex items-center gap-3 self-stretch md:self-auto">
                  <div className="bg-white border border-slate-200/80 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2 shadow-sm font-mono shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>20 August 2026</span>
                  </div>
                  
                  {/* Page Header Dropdown Create Button */}
                  <div className="relative flex-1 md:flex-none">
                    <button
                      onClick={() => setShowPageHeaderCreate(!showPageHeaderCreate)}
                      className="w-full bg-[#4F46E5] hover:bg-[#7C3AED] text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Create</span>
                      <ChevronDown className="w-3 h-3 text-white/80" />
                    </button>
                    {showPageHeaderCreate && (
                      <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200/60 rounded-2xl shadow-2xl z-30 py-2.5 animate-fadeIn">
                        <button onClick={() => { setShowPageHeaderCreate(false); setCurrentModal('createStudent'); }} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50/70 hover:text-[#4F46E5] transition-colors">Create Student</button>
                        <button onClick={() => { setShowPageHeaderCreate(false); setCurrentModal('createTeacher'); }} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50/70 hover:text-[#4F46E5] transition-colors">Create Teacher</button>
                        <button onClick={() => { setShowPageHeaderCreate(false); triggerToast('Class creation wizard loaded.'); }} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50/70 hover:text-[#4F46E5] transition-colors">Create Class</button>
                        <button onClick={() => { setShowPageHeaderCreate(false); setCurrentModal('createAssignment'); }} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50/70 hover:text-[#4F46E5] transition-colors">Create Assignment</button>
                        <button onClick={() => { setShowPageHeaderCreate(false); setCurrentSubmenuAndTab('aiIntelligence', 'quizGenerator'); }} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50/70 hover:text-[#4F46E5] transition-colors">Create Quiz</button>
                        <button onClick={() => { setShowPageHeaderCreate(false); setCurrentModal('scheduleClass'); }} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50/70 hover:text-[#4F46E5] transition-colors">Schedule Live Class</button>
                        <button onClick={() => { setShowPageHeaderCreate(false); setCurrentModal('sendAnnouncement'); }} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50/70 hover:text-[#4F46E5] transition-colors">Send Announcement</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 1 — PRIMARY KPI CARDS                             */}
              {/* ========================================================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* KPI Card 1: Students */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Students</span>
                      <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">2,840</h4>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4F46E5]">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      <TrendingUp className="w-3 h-3" /> +8.2% <span className="text-slate-400 font-normal ml-0.5">vs last month</span>
                    </span>
                    <DashboardSparkline points={[2600, 2650, 2680, 2720, 2800, 2840]} color="#4F46E5" />
                  </div>
                </div>

                {/* KPI Card 2: Teachers */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Teachers</span>
                      <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">164</h4>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-[#7C3AED]">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      <TrendingUp className="w-3 h-3" /> +4.1% <span className="text-slate-400 font-normal ml-0.5">vs last month</span>
                    </span>
                    <DashboardSparkline points={[158, 159, 160, 161, 163, 164]} color="#7C3AED" />
                  </div>
                </div>

                {/* KPI Card 3: Today's Attendance */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Today's Attendance</span>
                      <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">92.4%</h4>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <UserCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      <TrendingUp className="w-3 h-3" /> +2.4% <span className="text-slate-400 font-normal ml-0.5">vs yesterday</span>
                    </span>
                    <DashboardSparkline points={[89, 90.5, 91.0, 89.8, 91.5, 92.4]} color="#10B981" />
                  </div>
                </div>

                {/* KPI Card 4: Average Performance */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Average Performance</span>
                      <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">78.6%</h4>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                      <Brain className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      <TrendingUp className="w-3 h-3" /> +5.8% <span className="text-slate-400 font-normal ml-0.5">vs last month</span>
                    </span>
                    <DashboardSparkline points={[68, 71, 73, 75, 77, 78.6]} color="#06B6D4" />
                  </div>
                </div>

              </div>

              {/* ========================================================= */}
              {/* SECTION 2 & 3 — STUDENT PERFORMANCE & ATTENDANCE          */}
              {/* ========================================================= */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Section 2: Student Performance Chart */}
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-sm font-extrabold text-[#0F172A] tracking-tight">Student Performance</h3>
                      <p className="text-[10px] text-slate-400 font-medium">Average academic performance across the school.</p>
                    </div>
                    
                    {/* Filters */}
                    <div className="flex flex-wrap gap-2 items-center">
                      {/* Period Filter */}
                      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                        {['7D', '30D', '3M', '6M', '1Y'].map(pd => (
                          <button
                            key={pd}
                            onClick={() => {
                              setChartLoading(true);
                              setChartPeriod(pd);
                              setTimeout(() => setChartLoading(false), 250);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition-all ${
                              chartPeriod === pd ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'
                            }`}
                          >
                            {pd}
                          </button>
                        ))}
                      </div>
                      
                      {/* Class Filter */}
                      <select
                        value={chartClass}
                        onChange={(e) => {
                          setChartLoading(true);
                          setChartClass(e.target.value);
                          setTimeout(() => setChartLoading(false), 250);
                        }}
                        className="py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold"
                      >
                        <option value="ALL">All Classes</option>
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                        <option value="Grade 12">Grade 12</option>
                      </select>

                      {/* Subject Filter */}
                      <select
                        value={chartSubject}
                        onChange={(e) => {
                          setChartLoading(true);
                          setChartSubject(e.target.value);
                          setTimeout(() => setChartLoading(false), 250);
                        }}
                        className="py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold"
                      >
                        <option value="ALL">All Subjects</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="Science">Science</option>
                      </select>
                    </div>
                  </div>

                  {/* Summary Metric display */}
                  <div className="flex items-center gap-3">
                    <h4 className="text-3xl font-black text-slate-900 tracking-tight">78.6%</h4>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +5.8% improvement
                    </span>
                  </div>

                  {/* Area Chart view */}
                  <div className="flex-1 mt-4">
                    <PerformanceLineChart
                      period={chartPeriod}
                      cls={chartClass}
                      sub={chartSubject}
                      hoveredPoint={hoveredChartPoint}
                      setHoveredPoint={setHoveredChartPoint}
                      loading={chartLoading}
                    />
                  </div>
                </div>

                {/* Section 3: Attendance Overview Donut */}
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-[360px] lg:h-auto">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Attendance Overview</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Daily registration status ratios.</p>
                  </div>

                  <div className="flex-1 flex flex-col justify-center items-center py-4">
                    {/* SVG circular donut segment layout */}
                    <div className="relative">
                      <svg width="140" height="140" viewBox="0 0 42 42" className="transform -rotate-90">
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F1F5F9" strokeWidth="3" />
                        {/* Present: 92.4% (green) */}
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10B981" strokeWidth="3" strokeDasharray="92.4 7.6" strokeDashoffset="0" />
                        {/* Absent: 4.8% (red) */}
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#EF4444" strokeWidth="3" strokeDasharray="4.8 95.2" strokeDashoffset="-92.4" />
                        {/* Late: 2.8% (orange) */}
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F59E0B" strokeWidth="3" strokeDasharray="2.8 97.2" strokeDashoffset="-97.2" />
                      </svg>
                      {/* Center labels */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center font-bold">
                        <span className="text-2xl font-black text-slate-900">92.4%</span>
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">Present</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>92.4%</span>
                        </div>
                        <span className="text-[9px] text-slate-400 uppercase">Present</span>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800">
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          <span>4.8%</span>
                        </div>
                        <span className="text-[9px] text-slate-400 uppercase">Absent</span>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <span>2.8%</span>
                        </div>
                        <span className="text-[9px] text-slate-400 uppercase">Late</span>
                      </div>
                    </div>
                    <div className="text-center text-[10px] text-emerald-600 font-bold bg-emerald-50 py-1.5 rounded-xl mt-2 border border-emerald-100/50">
                      +2.4% compared to last month
                    </div>
                  </div>
                </div>

              </div>

              {/* ========================================================= */}
              {/* SECTION 4 & 5 — AI INSIGHTS & UPCOMING LIVE CLASSES       */}
              {/* ========================================================= */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Section 4: AI Insights Panel */}
                <div className="bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/20 p-6 rounded-2xl border border-indigo-150/40 shadow-sm flex flex-col justify-between space-y-5">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-indigo-50">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center text-[#4F46E5] shadow-sm">
                          <Brain className="w-4 h-4 text-[#7C3AED] animate-pulse" />
                        </div>
                        <div>
                          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">AI Insights</h3>
                          <p className="text-[9px] text-slate-400 font-semibold">AI-generated observations from your school's learning data.</p>
                        </div>
                      </div>
                      <Sparkles className="w-4 h-4 text-amber-500" />
                    </div>

                    <div className="space-y-3.5 mt-4">
                      {/* Insight 1 */}
                      <div className="bg-white border border-slate-100 rounded-xl p-3.5 flex items-start justify-between shadow-sm hover:shadow transition-shadow">
                        <div className="space-y-1 max-w-[280px]">
                          <strong className="text-xs font-bold text-slate-800 block">Mathematics Performance</strong>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Class 7B average score dropped by 11% this week.</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span className="bg-red-50 text-red-700 text-[9px] font-bold px-2 py-0.5 rounded">Needs Attention</span>
                          <button onClick={() => { setActiveMenu('analytics'); setActiveSubMenu('class'); }} className="text-[10px] text-[#4F46E5] hover:underline font-bold">View details</button>
                        </div>
                      </div>

                      {/* Insight 2 */}
                      <div className="bg-white border border-slate-100 rounded-xl p-3.5 flex items-start justify-between shadow-sm hover:shadow transition-shadow">
                        <div className="space-y-1 max-w-[280px]">
                          <strong className="text-xs font-bold text-slate-800 block">Algebra</strong>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Algebra is currently the most difficult topic across Classes 7–9.</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span className="bg-indigo-50 text-[#7C3AED] text-[9px] font-bold px-2 py-0.5 rounded">Learning Gap</span>
                          <button onClick={() => { setActiveMenu('aiIntelligence'); setActiveSubMenu('insights'); }} className="text-[10px] text-[#4F46E5] hover:underline font-bold">View details</button>
                        </div>
                      </div>

                      {/* Insight 3 */}
                      <div className="bg-white border border-slate-100 rounded-xl p-3.5 flex items-start justify-between shadow-sm hover:shadow transition-shadow">
                        <div className="space-y-1 max-w-[280px]">
                          <strong className="text-xs font-bold text-slate-800 block">Student Engagement</strong>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">24 students have had no learning activity in the last 7 days.</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span className="bg-red-50 text-red-700 text-[9px] font-bold px-2 py-0.5 rounded">Needs Attention</span>
                          <button onClick={() => { setActiveMenu('users'); setActiveSubMenu('students'); }} className="text-[10px] text-[#4F46E5] hover:underline font-bold">View details</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => { setActiveMenu('aiIntelligence'); setActiveSubMenu('insights'); }}
                    className="w-full py-2.5 border border-indigo-150 text-indigo-700 font-extrabold text-xs rounded-xl hover:bg-indigo-50/50 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>View All AI Insights</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Section 5: Upcoming Live Classes */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-5">
                  <div>
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Upcoming Live Classes</h3>
                        <p className="text-[9px] text-slate-400 font-semibold">Real-time scheduled virtual learning slots.</p>
                      </div>
                      <span className="bg-indigo-50 text-[#4F46E5] text-[10px] font-bold px-2 py-0.5 rounded-full">12 scheduled today</span>
                    </div>

                    <div className="space-y-3 mt-4">
                      {[
                        { time: '10:00 AM', subject: 'Mathematics', classRoom: 'Class 8A', teacherName: 'Rahul Sharma' },
                        { time: '11:30 AM', subject: 'Science', classRoom: 'Class 7B', teacherName: 'Priya Mehta' },
                        { time: '02:00 PM', subject: 'English', classRoom: 'Class 9A', teacherName: 'Amit Kumar' }
                      ].map((live, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50/50 border border-slate-100 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="bg-indigo-50 px-2.5 py-1.5 rounded-lg text-center shrink-0">
                              <span className="text-[10px] font-extrabold text-[#4F46E5] block font-mono">{live.time}</span>
                            </div>
                            <div>
                              <strong className="text-xs font-bold text-slate-800 block">{live.subject}</strong>
                              <span className="text-[10px] text-slate-400 font-semibold block">{live.classRoom} • {live.teacherName}</span>
                            </div>
                          </div>
                          <span className="bg-indigo-100 text-[#4F46E5] text-[9px] font-extrabold px-2 py-0.5 rounded-lg">Upcoming</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => { setActiveMenu('liveClass'); }}
                    className="w-full py-2.5 bg-indigo-650 hover:bg-[#4F46E5] bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Tv className="w-3.5 h-3.5" />
                    <span>View Live Classroom</span>
                  </button>
                </div>

              </div>

              {/* ========================================================= */}
              {/* SECTION 6, 7 & 8 — ASSIGNMENTS, CLASS PERF & ACTIVITY      */}
              {/* ========================================================= */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Section 6: Assignment Overview */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-[340px]">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 border-b pb-3 border-slate-100 tracking-tight">Assignment Overview</h3>
                    
                    <div className="space-y-4 mt-4">
                      {/* Segmented Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-bold text-slate-500">
                          <span>Completion Ratio</span>
                          <span className="text-slate-800">72% Completed</span>
                        </div>
                        <div className="flex h-3 w-full rounded-full overflow-hidden bg-slate-100">
                          <div className="bg-emerald-500 h-full" style={{ width: '72%' }} title="Completed (72%)" />
                          <div className="bg-amber-500 h-full" style={{ width: '18%' }} title="Pending (18%)" />
                          <div className="bg-red-500 h-full" style={{ width: '10%' }} title="Late (10%)" />
                        </div>
                      </div>

                      <div className="space-y-2 text-xs font-semibold text-slate-600">
                        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-emerald-500 rounded" /> <span>Completed (72%)</span></div></div>
                        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-amber-500 rounded" /> <span>Pending (18%)</span></div></div>
                        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-red-500 rounded" /> <span>Late (10%)</span></div></div>
                      </div>

                      <div className="border-t pt-3 space-y-1 text-[11px] text-slate-500">
                        <div>Pending Reviews: <strong className="text-slate-700">34 assignments pending</strong></div>
                        <div>Average Submission Rate: <strong className="text-[#4F46E5] font-bold">82%</strong></div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => { setActiveMenu('learning'); setActiveSubMenu('assignments'); }}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    View Assignments
                  </button>
                </div>

                {/* Section 7: Class Performance */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-[340px]">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 border-b pb-3 border-slate-100 tracking-tight">Class Performance</h3>
                    
                    <div className="space-y-3.5 mt-4">
                      {[
                        { name: 'Class 8A', score: 84, needsAttention: false },
                        { name: 'Class 9A', score: 81, needsAttention: false },
                        { name: 'Class 6A', score: 79, needsAttention: false },
                        { name: 'Class 7A', score: 76, needsAttention: false },
                        { name: 'Class 7B', score: 69, needsAttention: true }
                      ].map((clsItem, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-700 font-bold">{clsItem.name}</span>
                            <span className={clsItem.needsAttention ? 'text-red-500 font-black flex items-center gap-1' : 'text-slate-800 font-black'}>
                              {clsItem.score}% {clsItem.needsAttention && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 inline shrink-0" />}
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${clsItem.needsAttention ? 'bg-amber-500' : clsItem.score >= 80 ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${clsItem.score}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => { setActiveMenu('analytics'); }}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    View Analytics
                  </button>
                </div>

                {/* Section 8: Recent Activity */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-[340px]">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 border-b pb-3 border-slate-100 tracking-tight">Recent Activity</h3>
                    
                    <div className="space-y-3 mt-4 max-h-[200px] overflow-y-auto pr-1">
                      {[
                        { time: '10m ago', text: 'New student added', sub: 'Class 8A', icon: 'UserPlus' },
                        { time: '24m ago', text: 'Mathematics quiz published', sub: 'Class 7B', icon: 'BookOpen' },
                        { time: '1h ago', text: 'Live class completed', sub: 'Science — Class 9A', icon: 'Tv' },
                        { time: '2h ago', text: 'Teacher account created', sub: 'Rahul Sharma', icon: 'UserPlus' },
                        { time: '3h ago', text: 'Assignment published', sub: 'English — Class 9A', icon: 'FileText' }
                      ].map((act, i) => (
                        <div key={i} className="flex gap-2.5 items-start text-xs border-l-2 border-slate-100 pl-3.5 pb-2 last:pb-0 relative">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 border border-white absolute -left-[6px] top-1" />
                          <div className="flex-1 space-y-0.5">
                            <div className="flex justify-between items-center text-slate-400">
                              <span className="text-[10px] font-bold">{act.time}</span>
                            </div>
                            <span className="text-slate-800 font-bold block leading-snug">{act.text}</span>
                            <span className="text-[10px] text-slate-400 block">{act.sub}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => triggerToast('Recent activity log generated.')}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    View Activity
                  </button>
                </div>

              </div>

              {/* ========================================================= */}
              {/* SECTION 9 — QUICK ACTIONS                                 */}
              {/* ========================================================= */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                  <button onClick={() => setCurrentModal('createStudent')} className="p-3 bg-slate-50/50 hover:bg-indigo-50 hover:text-[#4F46E5] border border-slate-100 rounded-xl text-center space-y-1.5 transition-colors group">
                    <PlusCircle className="w-5 h-5 text-slate-400 group-hover:text-[#4F46E5] mx-auto" />
                    <span className="text-[10px] font-bold block">Add Student</span>
                  </button>
                  <button onClick={() => setCurrentModal('createTeacher')} className="p-3 bg-slate-50/50 hover:bg-indigo-50 hover:text-[#4F46E5] border border-slate-100 rounded-xl text-center space-y-1.5 transition-colors group">
                    <PlusCircle className="w-5 h-5 text-slate-400 group-hover:text-[#4F46E5] mx-auto" />
                    <span className="text-[10px] font-bold block">Add Teacher</span>
                  </button>
                  <button onClick={() => setCurrentModal('createAssignment')} className="p-3 bg-slate-50/50 hover:bg-indigo-50 hover:text-[#4F46E5] border border-slate-100 rounded-xl text-center space-y-1.5 transition-colors group">
                    <FileText className="w-5 h-5 text-slate-400 group-hover:text-[#4F46E5] mx-auto" />
                    <span className="text-[10px] font-bold block">Create Assignment</span>
                  </button>
                  <button onClick={() => setCurrentSubmenuAndTab('aiIntelligence', 'quizGenerator')} className="p-3 bg-slate-50/50 hover:bg-indigo-50 hover:text-[#4F46E5] border border-slate-100 rounded-xl text-center space-y-1.5 transition-colors group">
                    <Sparkles className="w-5 h-5 text-slate-400 group-hover:text-[#4F46E5] mx-auto" />
                    <span className="text-[10px] font-bold block">Create Quiz</span>
                  </button>
                  <button onClick={() => setCurrentModal('scheduleClass')} className="p-3 bg-slate-50/50 hover:bg-indigo-50 hover:text-[#4F46E5] border border-slate-100 rounded-xl text-center space-y-1.5 transition-colors group">
                    <Tv className="w-5 h-5 text-slate-400 group-hover:text-[#4F46E5] mx-auto" />
                    <span className="text-[10px] font-bold block">Schedule Class</span>
                  </button>
                  <button onClick={() => setCurrentModal('sendAnnouncement')} className="p-3 bg-slate-50/50 hover:bg-indigo-50 hover:text-[#4F46E5] border border-slate-100 rounded-xl text-center space-y-1.5 transition-colors group">
                    <Megaphone className="w-5 h-5 text-slate-400 group-hover:text-[#4F46E5] mx-auto" />
                    <span className="text-[10px] font-bold block">Send Notice</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================= */}
          {/* USER MANAGEMENT TABS                                    */}
          {/* ======================================================= */}
          {activeMenu === 'users' && activeSubMenu === 'students' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Student Directory</h2>
                  <p className="text-slate-500 text-xs">Manage enrolled school student directories and profiles.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => triggerToast('Student profile exports generated (PDF/CSV).')} className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2">
                    <Download className="w-4 h-4" /> Import / Export
                  </button>
                  <button onClick={() => setCurrentModal('createStudent')} className="bg-[#4F46E5] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Student
                  </button>
                </div>
              </div>

              {/* Student Filter Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-1 sm:grid-cols-6 gap-3">
                <div className="relative sm:col-span-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, admission no..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-400"
                  />
                </div>
                <div>
                  <select value={studentFilterClass} onChange={(e) => setStudentFilterClass(e.target.value)} className="w-full py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold">
                    <option value="ALL">All Classes</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <select value={studentFilterSection} onChange={(e) => setStudentFilterSection(e.target.value)} className="w-full py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold">
                    <option value="ALL">All Sections</option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                  </select>
                </div>
                <div>
                  <select value={studentFilterStatus} onChange={(e) => setStudentFilterStatus(e.target.value)} className="w-full py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold">
                    <option value="ALL">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
                <div>
                  <select value={studentFilterYear} onChange={(e) => setStudentFilterYear(e.target.value)} className="w-full py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold">
                    <option value="ALL">All Years</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
              </div>

              {/* Bulk Actions Header */}
              {selectedStudentIds.length > 0 && (
                <div className="bg-indigo-50 border border-indigo-100 px-4 py-3 rounded-2xl flex items-center justify-between animate-fadeIn">
                  <span className="text-xs font-bold text-indigo-800">{selectedStudentIds.length} students selected</span>
                  <div className="flex gap-2">
                    <button onClick={handleBulkNotify} className="bg-[#4F46E5] text-white text-xs font-bold px-3 py-1.5 rounded-lg">Send Notification</button>
                    <button onClick={handleBulkDeactivate} className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Deactivate Profile</button>
                  </div>
                </div>
              )}

              {/* Student Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                        <th className="p-4 w-12 text-center">
                          <input
                            type="checkbox"
                            checked={selectedStudentIds.length === filteredStudents.length && filteredStudents.length > 0}
                            onChange={() => {
                              if (selectedStudentIds.length === filteredStudents.length) {
                                setSelectedStudentIds([]);
                              } else {
                                setSelectedStudentIds(filteredStudents.map(s => s.id));
                              }
                            }}
                            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 accent-indigo-600"
                          />
                        </th>
                        <th className="p-4">Student Name</th>
                        <th className="p-4">Admission Number</th>
                        <th className="p-4">Class</th>
                        <th className="p-4">Parent</th>
                        <th className="p-4">Attendance</th>
                        <th className="p-4">Avg Score</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredStudents.map(student => (
                        <tr key={student.id} className="hover:bg-slate-50/50">
                          <td className="p-4 text-center">
                            <input
                              type="checkbox"
                              checked={selectedStudentIds.includes(student.id)}
                              onChange={() => handleToggleStudentSelection(student.id)}
                              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 accent-indigo-600"
                            />
                          </td>
                          <td className="p-4 font-bold text-slate-900">{student.name}</td>
                          <td className="p-4 font-mono text-slate-500">{student.admissionNo}</td>
                          <td className="p-4 font-semibold">{student.class} - {student.section}</td>
                          <td className="p-4 text-slate-500">{student.parent}</td>
                          <td className="p-4 font-bold text-slate-700">{student.attendance}%</td>
                          <td className="p-4">
                            <span className={`font-bold px-2 py-0.5 rounded ${
                              student.performance < 65 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                            }`}>{student.performance}%</span>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              student.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${student.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                              {student.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setSelectedStudentRec(student.name);
                                setActiveMenu('aiIntelligence');
                                setActiveSubMenu('recommendations');
                              }}
                              className="text-[#4F46E5] hover:underline font-bold"
                            >
                              View Insight
                            </button>
                            <button
                              onClick={() => {
                                setStudentsList(studentsList.map(s => s.id === student.id ? { ...s, status: s.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : s));
                                triggerToast('Student status toggled.');
                              }}
                              className="text-slate-400 hover:text-red-500"
                            >
                              Toggle
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {activeMenu === 'users' && activeSubMenu === 'teachers' && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Educator Directory</h2>
                  <p className="text-slate-500 text-xs">Assign subjects, manage class teachers, and review roles.</p>
                </div>
                <button onClick={() => setCurrentModal('createTeacher')} className="bg-[#4F46E5] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Teacher
                </button>
              </div>

              {/* Teacher list table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                      <th className="p-4">Teacher Name</th>
                      <th className="p-4">Employee ID</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Assigned Classes</th>
                      <th className="p-4">Subjects</th>
                      <th className="p-4">Active Students</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {teachersList.map(tch => (
                      <tr key={tch.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-slate-900">{tch.name}</td>
                        <td className="p-4 font-mono">{tch.empId}</td>
                        <td className="p-4 text-slate-500">{tch.email}</td>
                        <td className="p-4">
                          <div className="flex gap-1.5 flex-wrap">
                            {tch.classes.map((cls, i) => <span key={i} className="bg-slate-100 px-2 py-0.5 rounded">{cls}</span>)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1.5 flex-wrap">
                            {tch.subjects.map((sub, i) => <span key={i} className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">{sub}</span>)}
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-slate-700">{tch.studentsCount} Students</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            tch.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${tch.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                            {tch.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setSelectedRoleForPermissions('Teacher');
                              setActiveMenu('users');
                              setActiveSubMenu('roles');
                            }}
                            className="text-[#4F46E5] hover:underline font-bold"
                          >
                            Permissions
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {activeMenu === 'users' && activeSubMenu === 'parents' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Parent Accounts</h2>
                <p className="text-slate-500 text-xs">Verify associated student dependencies. Parents only access their own children's information.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                      <th className="p-4">Parent Name</th>
                      <th className="p-4">Student Name</th>
                      <th className="p-4">Class Room</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Phone Number</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {parentsList.map(pr => (
                      <tr key={pr.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-slate-900">{pr.name}</td>
                        <td className="p-4 font-semibold text-[#4F46E5]">{pr.student}</td>
                        <td className="p-4">{pr.class}</td>
                        <td className="p-4 text-slate-500">{pr.email}</td>
                        <td className="p-4 text-slate-400">{pr.phone}</td>
                        <td className="p-4">
                          <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">{pr.status}</span>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => triggerToast(`Contact email verification sent to ${pr.email}`)} className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">Ping Parent</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeMenu === 'users' && activeSubMenu === 'roles' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Roles directory */}
              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <h3 className="text-sm font-extrabold text-slate-900">Platform Roles</h3>
                  <button onClick={() => triggerToast('Custom role builder added to settings.')} className="text-xs font-bold text-[#4F46E5] flex items-center gap-1"><Plus className="w-3 h-3" /> Custom</button>
                </div>
                <div className="space-y-2">
                  {rolesList.map((rl, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedRoleForPermissions(rl.name)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                        selectedRoleForPermissions === rl.name ? 'border-[#4F46E5] bg-indigo-50/40 font-bold' : 'border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-slate-800">{rl.name}</div>
                      <p className="text-[10px] text-slate-400 font-normal mt-0.5">{rl.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Permissions Editor */}
              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">System Permissions: <span className="text-[#4F46E5]">{selectedRoleForPermissions}</span></h3>
                    <p className="text-[10px] text-slate-400">Configure strict access controls for school-level isolates.</p>
                  </div>
                  <button onClick={handleSavePermissions} className="bg-[#4F46E5] text-white text-xs font-bold px-4 py-2 rounded-xl">Save Setup</button>
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                  {[
                    { cat: 'Student Management', list: ['View Students', 'Create Student', 'Edit Student', 'Deactivate Student'] },
                    { cat: 'Teacher Management', list: ['View Teachers', 'Create Teacher', 'Edit Teacher', 'Deactivate Teacher'] },
                    { cat: 'Academic Management', list: ['View Classes', 'Create Classes', 'Manage Sections'] },
                    { cat: 'Assignments', list: ['Create Assignment', 'Edit Assignment', 'Publish Assignment', 'View Submissions'] },
                    { cat: 'Quizzes', list: ['Create Quiz', 'AI Generate Quiz', 'Publish Quiz'] },
                    { cat: 'Attendance', list: ['View Attendance', 'Mark Attendance'] },
                    { cat: 'Live Classroom', list: ['Create Live Class', 'Start Live Class'] },
                    { cat: 'Analytics', list: ['View Student Analytics', 'View Class Analytics'] },
                    { cat: 'AI Settings', list: ['Use AI Tools', 'Generate Learning Content'] }
                  ].map((catObj, i) => (
                    <div key={i} className="border border-slate-100 rounded-2xl p-4 space-y-3">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{catObj.cat}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {catObj.list.map((perm, idx) => {
                          const isChecked = permissionsMatrix[selectedRoleForPermissions]?.[perm] || false;
                          return (
                            <label key={idx} className="flex items-center gap-2 text-xs text-slate-600 font-semibold cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  const updated = { ...permissionsMatrix };
                                  if (!updated[selectedRoleForPermissions]) updated[selectedRoleForPermissions] = {};
                                  updated[selectedRoleForPermissions][perm] = e.target.checked;
                                  setPermissionsMatrix(updated);
                                }}
                                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 accent-indigo-600"
                              />
                              <span>{perm}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ======================================================= */}
          {/* ACADEMICS TABS                                          */}
          {/* ======================================================= */}
          {activeMenu === 'academic' && activeSubMenu === 'classes' && (
            <div className="space-y-6">
              
              {/* ========================================================= */}
              {/* PAGE HEADER                                               */}
              {/* ========================================================= */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">Classes & Sections</h2>
                  <p className="text-slate-500 text-xs">Manage your school's academic structure, classes and sections.</p>
                </div>
                <div className="flex items-center gap-3 self-stretch md:self-auto">
                  <select
                    value={selectedAcademicYear}
                    onChange={(e) => setSelectedAcademicYear(e.target.value)}
                    className="py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 shadow-sm"
                  >
                    <option value="2026-2027">Academic Year: 2026–2027</option>
                    <option value="2025-2026">Academic Year: 2025–2026</option>
                  </select>
                  <button
                    onClick={() => triggerToast('Academics structure import template downloaded.')}
                    className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Import Structure</span>
                  </button>
                  <button
                    onClick={() => setCurrentModal('createClass')}
                    className="bg-[#4F46E5] hover:bg-[#7C3AED] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Create Class</span>
                  </button>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SUMMARY CARDS                                             */}
              {/* ========================================================= */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Total Classes', value: '10', detail: 'Primary & Secondary', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
                  { label: 'Total Sections', value: '28', detail: 'A, B and C standard groups', icon: LayoutGrid, color: 'text-purple-600 bg-purple-50' },
                  { label: 'Total Students', value: '2,840', detail: 'Active enrollment count', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
                  { label: 'Average Class Performance', value: '78.6%', detail: 'Passing benchmark metric', icon: Brain, color: 'text-cyan-600 bg-cyan-50' }
                ].map((card, idx) => {
                  const IconComp = card.icon;
                  return (
                    <div key={idx} className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.color}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{card.label}</span>
                        <h4 className="text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">{card.value}</h4>
                        <span className="text-[9px] text-slate-400 block font-medium">{card.detail}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ========================================================= */}
              {/* SEARCH & FILTERS TOOLBAR                                  */}
              {/* ========================================================= */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row justify-between gap-3 items-center">
                <div className="relative w-full md:w-80 shrink-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search class or section..."
                    value={classesSearch}
                    onChange={(e) => setClassesSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-400 focus:bg-white"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2.5 items-center w-full md:w-auto justify-end">
                  <select
                    value={classesFilterTeacher}
                    onChange={(e) => setClassesFilterTeacher(e.target.value)}
                    className="py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-600 outline-none"
                  >
                    <option value="ALL">All Class Teachers</option>
                    <option value="Rahul Sharma">Rahul Sharma</option>
                    <option value="Priya Mehta">Priya Mehta</option>
                    <option value="Sunita Sharma">Sunita Sharma</option>
                    <option value="Preeti Malhotra">Preeti Malhotra</option>
                  </select>
                  
                  <select
                    value={classesFilterStatus}
                    onChange={(e) => setClassesFilterStatus(e.target.value)}
                    className="py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-600 outline-none"
                  >
                    <option value="ALL">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

                  {/* List / Grid View Toggles */}
                  <div className="flex bg-slate-100 p-0.5 rounded-xl border">
                    <button
                      onClick={() => setClassesViewMode('list')}
                      className={`p-1.5 rounded-lg transition-all ${classesViewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                      title="List View"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setClassesViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-all ${classesViewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                      title="Grid View"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* BULK ACTION BAR                                           */}
              {/* ========================================================= */}
              {bulkSelectedSections.length > 0 && (
                <div className="bg-indigo-50 border border-indigo-100 px-5 py-3 rounded-2xl flex items-center justify-between animate-fadeIn shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] animate-pulse" />
                    <span className="text-xs font-extrabold text-indigo-900">{bulkSelectedSections.length} sections selected</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setCurrentModal('assignClassTeacher'); setAssignTeacherForm({ ...assignTeacherForm, sectionId: bulkSelectedSections[0] }); }} className="bg-white border border-slate-200 text-slate-700 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Assign Teacher</button>
                    <button onClick={() => triggerToast('Migrating students configuration.')} className="bg-white border border-slate-200 text-slate-700 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Move Students</button>
                    <button onClick={() => { setClassesList(classesList.map(cls => ({ ...cls, sections: cls.sections.map((s: any) => bulkSelectedSections.includes(s.id) ? { ...s, status: 'Active' } : s) }))); setBulkSelectedSections([]); triggerToast('Status marked Active.'); }} className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors">Mark Active</button>
                    <button onClick={() => { setBulkSelectedSections([]); }} className="text-xs text-slate-400 hover:text-slate-600 font-semibold px-2">Cancel</button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* CLASSES AND SECTIONS DIRECTORY                            */}
              {/* ========================================================= */}
              {classesList.filter(c => {
                const matchesSearch = c.name.toLowerCase().includes(classesSearch.toLowerCase()) || c.code.toLowerCase().includes(classesSearch.toLowerCase());
                const matchesTeacher = classesFilterTeacher === 'ALL' || c.classTeacher === classesFilterTeacher || c.sections.some((s: any) => s.classTeacher === classesFilterTeacher);
                const matchesStatus = classesFilterStatus === 'ALL' || c.status === classesFilterStatus;
                return matchesSearch && matchesTeacher && matchesStatus;
              }).length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-md mx-auto space-y-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-[#4F46E5] mx-auto">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-900">No classes created yet.</h4>
                    <p className="text-xs text-slate-400">Create your first class to start building your school's academic structure.</p>
                  </div>
                  <button onClick={() => setCurrentModal('createClass')} className="bg-[#4F46E5] text-white text-xs font-bold px-4 py-2 rounded-xl shadow">+ Create Class</button>
                </div>
              ) : classesViewMode === 'grid' ? (
                /* Grid Layout Rendering */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classesList.filter(c => {
                    const matchesSearch = c.name.toLowerCase().includes(classesSearch.toLowerCase()) || c.code.toLowerCase().includes(classesSearch.toLowerCase());
                    const matchesTeacher = classesFilterTeacher === 'ALL' || c.classTeacher === classesFilterTeacher || c.sections.some((s: any) => s.classTeacher === classesFilterTeacher);
                    const matchesStatus = classesFilterStatus === 'ALL' || c.status === classesFilterStatus;
                    return matchesSearch && matchesTeacher && matchesStatus;
                  }).map(cls => (
                    <div key={cls.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all overflow-hidden">
                      <div className="p-5 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-base font-extrabold text-slate-900">{cls.name}</h3>
                            <span className="text-[10px] text-indigo-600 font-extrabold font-mono tracking-wider bg-indigo-50 px-2 py-0.5 rounded mt-1.5 inline-block">{cls.code}</span>
                          </div>
                          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">{cls.totalStudents} Enrolled</span>
                        </div>

                        <div className="space-y-2.5 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
                          <div className="flex justify-between"><span>Mentor:</span> <strong className="text-slate-800">{cls.classTeacher}</strong></div>
                          <div className="flex justify-between"><span>Performance:</span> <strong className="text-indigo-600 font-bold">{cls.avgPerf}% Avg</strong></div>
                          <div className="flex justify-between"><span>Attendance:</span> <strong className="text-emerald-600 font-bold">{cls.attendance}%</strong></div>
                          <div className="flex justify-between"><span>Status:</span> <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${cls.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>{cls.status}</span></div>
                        </div>

                        {/* List of short sections */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {cls.sections.map((sec: any) => (
                            <span key={sec.id} className="bg-slate-50 border border-slate-200/60 text-slate-600 text-[10px] font-extrabold px-2.5 py-1 rounded-lg">
                              Section {sec.name.replace('Section ', '')} ({sec.students})
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-50/50 p-4 border-t border-slate-150/50 flex justify-end gap-2 shrink-0">
                        <button
                          onClick={() => { setSelectedClassForView(cls); setClassDetailsTab('overview'); }}
                          className="text-xs font-bold text-[#4F46E5] bg-indigo-50/80 px-3.5 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                          View Class
                        </button>
                        <button
                          onClick={() => { setExpandedClasses(expandedClasses.includes(cls.id) ? expandedClasses.filter(id => id !== cls.id) : [...expandedClasses, cls.id]); }}
                          className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
                        >
                          <span>Manage</span>
                          <ChevronDown className={`w-3 h-3 transition-transform ${expandedClasses.includes(cls.id) ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      {/* Expandable structure in Grid card */}
                      {expandedClasses.includes(cls.id) && (
                        <div className="border-t border-slate-100 bg-slate-50/40 p-4 space-y-3 animate-fadeIn">
                          <div className="flex justify-between items-center pb-1">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sections Layout</span>
                            <button
                              onClick={() => { setCurrentModal('createSection'); setNewSectionForm({ ...newSectionForm, classId: cls.id }); }}
                              className="text-[10px] text-[#4F46E5] font-extrabold hover:underline flex items-center gap-0.5"
                            >
                              <Plus className="w-2.5 h-2.5" /> Add Section
                            </button>
                          </div>
                          
                          {cls.sections.length === 0 ? (
                            <div className="text-center py-4 text-xs text-slate-400 bg-white border border-dashed rounded-xl">No sections added.</div>
                          ) : (
                            cls.sections.map((sec: any) => (
                              <div key={sec.id} className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm space-y-2">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={bulkSelectedSections.includes(sec.id)}
                                      onChange={() => setBulkSelectedSections(bulkSelectedSections.includes(sec.id) ? bulkSelectedSections.filter(id => id !== sec.id) : [...bulkSelectedSections, sec.id])}
                                      className="rounded border-slate-300 text-indigo-650"
                                    />
                                    <strong className="text-xs font-extrabold text-slate-800">{sec.name}</strong>
                                  </div>
                                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${sec.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>{sec.status}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] font-semibold text-slate-500">
                                  <div>Students: <strong className="text-slate-700">{sec.students}</strong></div>
                                  <div>Mentor: <strong className="text-slate-700">{sec.classTeacher}</strong></div>
                                  <div>Perf: <strong className="text-indigo-600">{sec.performance}%</strong></div>
                                  <div>Room: <strong className="text-slate-700">{sec.room}</strong></div>
                                </div>
                                <div className="pt-2 border-t flex justify-end gap-2 text-[10px] font-bold">
                                  <button onClick={() => { setSelectedClassForView(cls); setClassDetailsTab('students'); }} className="text-[#4F46E5] hover:underline">Manage Students</button>
                                  <button onClick={() => triggerToast(`Editing Section ${sec.code} config.`)} className="text-slate-500 hover:underline">Edit</button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* List Layout Rendering (Expandable Rows) */
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="p-4 pl-6 w-10"></th>
                          <th className="p-4">Class</th>
                          <th className="p-4">Code</th>
                          <th className="p-4">Sections</th>
                          <th className="p-4">Students</th>
                          <th className="p-4">Class Mentor</th>
                          <th className="p-4">Performance</th>
                          <th className="p-4">Attendance</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 pr-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {classesList.filter(c => {
                          const matchesSearch = c.name.toLowerCase().includes(classesSearch.toLowerCase()) || c.code.toLowerCase().includes(classesSearch.toLowerCase());
                          const matchesTeacher = classesFilterTeacher === 'ALL' || c.classTeacher === classesFilterTeacher || c.sections.some((s: any) => s.classTeacher === classesFilterTeacher);
                          const matchesStatus = classesFilterStatus === 'ALL' || c.status === classesFilterStatus;
                          return matchesSearch && matchesTeacher && matchesStatus;
                        }).map(cls => {
                          const isExpanded = expandedClasses.includes(cls.id);
                          return (
                            <React.Fragment key={cls.id}>
                              {/* Main Class Row */}
                              <tr className={`border-b border-slate-100 hover:bg-slate-50/50 text-xs font-semibold text-slate-700 transition-colors ${isExpanded ? 'bg-slate-50/30' : ''}`}>
                                <td className="p-4 pl-6 text-center">
                                  <button
                                    onClick={() => setExpandedClasses(isExpanded ? expandedClasses.filter(id => id !== cls.id) : [...expandedClasses, cls.id])}
                                    className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700"
                                  >
                                    <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                  </button>
                                </td>
                                <td className="p-4">
                                  <strong className="text-slate-900 font-extrabold block text-sm">{cls.name}</strong>
                                  <span className="text-[10px] text-slate-400 mt-0.5 block">{cls.academicYear}</span>
                                </td>
                                <td className="p-4 font-mono font-bold text-[11px] text-slate-500">{cls.code}</td>
                                <td className="p-4">
                                  <div className="flex gap-1">
                                    {cls.sections.map((sec: any) => (
                                      <span key={sec.id} className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded">
                                        {sec.name.replace('Section ', '')}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="p-4 font-bold text-slate-800">{cls.totalStudents} Enrolled</td>
                                <td className="p-4 text-slate-600">{cls.classTeacher}</td>
                                <td className="p-4 text-indigo-600 font-extrabold">{cls.avgPerf}%</td>
                                <td className="p-4 text-emerald-600 font-extrabold">{cls.attendance}%</td>
                                <td className="p-4">
                                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${cls.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>{cls.status}</span>
                                </td>
                                <td className="p-4 pr-6 text-right space-x-2">
                                  <button onClick={() => { setSelectedClassForView(cls); setClassDetailsTab('overview'); }} className="text-[#4F46E5] hover:underline font-bold">View Class</button>
                                  <span className="text-slate-200">|</span>
                                  <button onClick={() => triggerToast(`Editing ${cls.name} parameters.`)} className="text-slate-400 hover:text-slate-600">Edit</button>
                                </td>
                              </tr>

                              {/* Expanded Sections Sub-rows */}
                              {isExpanded && (
                                <tr className="bg-slate-50/30 border-b border-slate-100">
                                  <td colSpan={10} className="p-4 pl-16 pr-6">
                                    <div className="bg-white rounded-xl border border-slate-200/70 shadow-inner p-4 space-y-4">
                                      <div className="flex justify-between items-center border-b pb-2">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sections in {cls.name}</h4>
                                        <button
                                          onClick={() => { setCurrentModal('createSection'); setNewSectionForm({ ...newSectionForm, classId: cls.id }); }}
                                          className="bg-indigo-50 text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                                        >
                                          <Plus className="w-3 h-3" />
                                          <span>Add Section</span>
                                        </button>
                                      </div>

                                      {cls.sections.length === 0 ? (
                                        <div className="text-center py-6 text-xs text-slate-400">No sections added. Click "+ Add Section" to build structure.</div>
                                      ) : (
                                        <div className="overflow-x-auto">
                                          <table className="w-full text-left text-xs border-collapse">
                                            <thead>
                                              <tr className="border-b border-slate-150 text-[10px] font-bold text-slate-400 uppercase">
                                                <th className="p-2 w-8"></th>
                                                <th className="p-2">Section Name</th>
                                                <th className="p-2">Section Code</th>
                                                <th className="p-2">Class Teacher</th>
                                                <th className="p-2">Students</th>
                                                <th className="p-2">Room</th>
                                                <th className="p-2">Performance</th>
                                                <th className="p-2">Attendance</th>
                                                <th className="p-2">Status</th>
                                                <th className="p-2 text-right">Actions</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {cls.sections.map((sec: any) => (
                                                <tr key={sec.id} className="border-b border-slate-100/60 hover:bg-slate-50/40 text-slate-600 font-semibold">
                                                  <td className="p-2">
                                                    <input
                                                      type="checkbox"
                                                      checked={bulkSelectedSections.includes(sec.id)}
                                                      onChange={() => setBulkSelectedSections(bulkSelectedSections.includes(sec.id) ? bulkSelectedSections.filter(id => id !== sec.id) : [...bulkSelectedSections, sec.id])}
                                                      className="rounded border-slate-300 text-indigo-650"
                                                    />
                                                  </td>
                                                  <td className="p-2 text-slate-900 font-extrabold">{sec.name}</td>
                                                  <td className="p-2 font-mono text-[10px] font-bold text-slate-400">{sec.code}</td>
                                                  <td className="p-2">{sec.classTeacher}</td>
                                                  <td className="p-2 font-bold text-slate-700">{sec.students} Students</td>
                                                  <td className="p-2 font-mono font-bold text-slate-500">{sec.room}</td>
                                                  <td className="p-2 text-indigo-600 font-bold">{sec.performance}%</td>
                                                  <td className="p-2 text-emerald-600 font-bold">{sec.attendance}%</td>
                                                  <td className="p-2">
                                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${sec.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>{sec.status}</span>
                                                  </td>
                                                  <td className="p-2 text-right space-x-3 font-bold">
                                                    <button onClick={() => { setSelectedClassForView(cls); setClassDetailsTab('students'); }} className="text-[#4F46E5] hover:underline">Manage Students</button>
                                                    <button onClick={() => triggerToast(`Edit Section ${sec.name}`)} className="text-slate-400 hover:text-slate-600">Edit</button>
                                                  </td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* CLASS DETAILS SIDE DRAWER                                 */}
              {/* ========================================================= */}
              {selectedClassForView && (
                <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm flex justify-end animate-fadeIn">
                  {/* Click outside to close */}
                  <div className="absolute inset-0" onClick={() => setSelectedClassForView(null)} />
                  
                  <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between z-50 animate-slideLeft">
                    
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-extrabold text-slate-900">{selectedClassForView.name} Details</h3>
                          <span className="text-[10px] font-bold bg-indigo-50 text-[#4F46E5] px-2 py-0.5 rounded">{selectedClassForView.code}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 font-semibold">Academic Year: {selectedClassForView.academicYear} • {selectedClassForView.totalStudents} Enrolled Students</p>
                      </div>
                      <button onClick={() => setSelectedClassForView(null)} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quick Stats Banner inside drawer */}
                    <div className="bg-indigo-50/50 px-6 py-3 border-b grid grid-cols-3 gap-3 text-center shrink-0">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Total Sections</span>
                        <strong className="block text-sm font-extrabold text-slate-800">{selectedClassForView.sections.length}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Avg Performance</span>
                        <strong className="block text-sm font-extrabold text-indigo-700">{selectedClassForView.avgPerf}%</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Attendance</span>
                        <strong className="block text-sm font-extrabold text-emerald-700">{selectedClassForView.attendance}%</strong>
                      </div>
                    </div>

                    {/* Tabs navigation */}
                    <div className="px-6 border-b flex gap-4 overflow-x-auto text-xs font-bold text-slate-400 shrink-0">
                      {['overview', 'students', 'teachers', 'subjects', 'attendance', 'performance', 'assignments'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setClassDetailsTab(tab)}
                          className={`py-3 capitalize border-b-2 transition-all ${classDetailsTab === tab ? 'border-[#4F46E5] text-[#4F46E5]' : 'border-transparent hover:text-slate-700'}`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Scrollable tab content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      
                      {/* Drawer Tab 1: Overview */}
                      {classDetailsTab === 'overview' && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-xl border">
                              <span className="text-[10px] text-slate-400 uppercase font-bold">Class Mentor</span>
                              <strong className="block text-slate-800 mt-1">{selectedClassForView.classTeacher}</strong>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border">
                              <span className="text-[10px] text-slate-400 uppercase font-bold">Assigned Subjects</span>
                              <strong className="block text-slate-800 mt-1">{selectedClassForView.subjects.length} Subjects</strong>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl border p-4 space-y-4">
                            <div>
                              <strong className="text-xs font-bold text-slate-800 block">Class Performance Trends</strong>
                              <span className="text-[10px] text-slate-400">Monthly average scoring curves.</span>
                            </div>
                            {/* Static mini performance trend line graph */}
                            <div className="flex justify-center border-t pt-4">
                              <svg viewBox="0 0 400 120" className="w-full h-32 overflow-visible">
                                <defs>
                                  <linearGradient id="drawerChartGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
                                  </linearGradient>
                                </defs>
                                <line x1="10" y1="90" x2="390" y2="90" stroke="#E2E8F0" strokeDasharray="3 3" />
                                <line x1="10" y1="50" x2="390" y2="50" stroke="#E2E8F0" strokeDasharray="3 3" />
                                <line x1="10" y1="10" x2="390" y2="10" stroke="#E2E8F0" strokeDasharray="3 3" />
                                <path d="M 20 85 L 100 80 L 180 72 L 260 55 L 340 30" fill="none" stroke="#4F46E5" strokeWidth="2.5" />
                                <path d="M 20 85 L 100 80 L 180 72 L 260 55 L 340 30 L 340 110 L 20 110 Z" fill="url(#drawerChartGrad)" />
                                {[
                                  { x: 20, y: 85, l: 'Mar: 65%' },
                                  { x: 100, y: 80, l: 'Apr: 68%' },
                                  { x: 180, y: 72, l: 'May: 73%' },
                                  { x: 260, y: 55, l: 'Jun: 77%' },
                                  { x: 340, y: 30, l: 'Aug: 82%' }
                                ].map((pt, i) => (
                                  <g key={i}>
                                    <circle cx={pt.x} cy={pt.y} r="3.5" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="1.5" />
                                    <text x={pt.x} y={pt.y - 8} textAnchor="middle" className="text-[9px] fill-slate-500 font-bold font-mono">{pt.l}</text>
                                  </g>
                                ))}
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Drawer Tab 2: Students */}
                      {classDetailsTab === 'students' && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-500">Student Directory</span>
                            <div className="flex gap-2">
                              <button onClick={() => triggerToast('Bulk student roster upload loaded.')} className="text-[10px] font-bold border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">Import Students</button>
                              <button onClick={() => { setSelectedClassForView(null); setCurrentModal('createStudent'); }} className="text-[10px] font-bold bg-[#4F46E5] text-white px-3 py-1.5 rounded-lg hover:bg-indigo-600">+ Add Student</button>
                            </div>
                          </div>

                          <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-400 uppercase">
                                  <th className="p-3">Student Name</th>
                                  <th className="p-3">Adm No.</th>
                                  <th className="p-3">Sec</th>
                                  <th className="p-3">Attendance</th>
                                  <th className="p-3">Avg Score</th>
                                  <th className="p-3 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { name: 'Aarav Sharma', adm: 'ADM-9021', sec: 'A', attendance: '94%', score: '82%', status: 'Active' },
                                  { name: 'Kabir Mehta', adm: 'ADM-9022', sec: 'B', attendance: '91%', score: '78%', status: 'Active' },
                                  { name: 'Riya Patel', adm: 'ADM-9023', sec: 'A', attendance: '92%', score: '80%', status: 'Active' }
                                ].map((stu, idx) => (
                                  <tr key={idx} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 font-semibold text-slate-600">
                                    <td className="p-3 font-extrabold text-slate-900">{stu.name}</td>
                                    <td className="p-3 font-mono text-slate-400 font-bold">{stu.adm}</td>
                                    <td className="p-3"><span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded">{stu.sec}</span></td>
                                    <td className="p-3 text-emerald-600 font-bold">{stu.attendance}</td>
                                    <td className="p-3 text-indigo-650 font-bold">{stu.score}</td>
                                    <td className="p-3 text-right">
                                      <button onClick={() => triggerToast(`Profile navigation for ${stu.name}`)} className="text-[#4F46E5] hover:underline font-bold mr-3">View</button>
                                      <button onClick={() => triggerToast(`Re-assigning section for ${stu.name}`)} className="text-slate-400 hover:text-slate-600">Move</button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Drawer Tab 3: Teachers */}
                      {classDetailsTab === 'teachers' && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-500">Class Instructor logs</span>
                            <button onClick={() => { setSelectedClassForView(null); setCurrentModal('assignClassTeacher'); }} className="text-[10px] font-bold bg-[#4F46E5] text-white px-3 py-1.5 rounded-lg hover:bg-indigo-600">+ Assign Teacher</button>
                          </div>

                          <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-400 uppercase">
                                  <th className="p-3">Teacher</th>
                                  <th className="p-3">Subject</th>
                                  <th className="p-3">Sections</th>
                                  <th className="p-3">Status</th>
                                  <th className="p-3 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { name: 'Rahul Sharma', sub: 'Mathematics', sec: 'A, B, C', status: 'Active' },
                                  { name: 'Priya Mehta', sub: 'Science', sec: 'A, B', status: 'Active' }
                                ].map((tch, idx) => (
                                  <tr key={idx} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 font-semibold text-slate-600">
                                    <td className="p-3 font-extrabold text-slate-900">{tch.name}</td>
                                    <td className="p-3 text-slate-600">{tch.sub}</td>
                                    <td className="p-3 font-mono font-bold text-slate-500">{tch.sec}</td>
                                    <td className="p-3"><span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded">{tch.status}</span></td>
                                    <td className="p-3 text-right font-bold">
                                      <button onClick={() => triggerToast(`Modifying teacher role assignment.`)} className="text-slate-400 hover:text-slate-600 mr-3">Edit</button>
                                      <button onClick={() => triggerToast(`Teacher assignment removed.`)} className="text-red-500 hover:underline">Remove</button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Drawer Tab 4: Subjects */}
                      {classDetailsTab === 'subjects' && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-500">Assigned Subject Parameters</span>
                            <button onClick={() => triggerToast('Assigned subjects editor.')} className="text-[10px] font-bold bg-[#4F46E5] text-white px-3 py-1.5 rounded-lg hover:bg-indigo-600">+ Assign Subject</button>
                          </div>

                          <div className="grid grid-cols-1 gap-3">
                            {selectedClassForView.subjects.length === 0 ? (
                              <div className="text-center py-6 text-xs text-slate-400">No subjects assigned.</div>
                            ) : (
                              selectedClassForView.subjects.map((subj: any, i: number) => (
                                <div key={i} className="bg-slate-50/60 p-4 border rounded-xl flex justify-between items-center shadow-sm">
                                  <div>
                                    <strong className="text-xs font-extrabold text-slate-800 block">{subj.name}</strong>
                                    <span className="text-[10px] text-slate-400 font-semibold block">Teacher: {subj.teacher}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="bg-indigo-50 text-indigo-700 text-[9px] font-bold px-2 py-1 rounded-md">Sections: {subj.sections.join(', ')}</span>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}

                      {/* Drawer Tab 5: Attendance */}
                      {classDetailsTab === 'attendance' && (
                        <div className="space-y-5">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-500">Attendance Distribution</span>
                            <select className="py-1 px-2 bg-slate-50 border rounded-lg text-[10px] font-bold outline-none">
                              <option>This Month</option>
                              <option>This Week</option>
                              <option>Today</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-3 gap-3 text-center text-xs">
                            <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                              <span className="text-[9px] text-emerald-600 font-bold block uppercase">Present</span>
                              <strong className="text-lg font-black text-emerald-700 mt-1 block">93%</strong>
                            </div>
                            <div className="bg-red-50/50 p-3 rounded-xl border border-red-100">
                              <span className="text-[9px] text-red-500 font-bold block uppercase">Absent</span>
                              <strong className="text-lg font-black text-red-700 mt-1 block">4%</strong>
                            </div>
                            <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                              <span className="text-[9px] text-amber-500 font-bold block uppercase">Late</span>
                              <strong className="text-lg font-black text-amber-700 mt-1 block">3%</strong>
                            </div>
                          </div>

                          <div className="border p-4 rounded-xl space-y-3">
                            <strong className="text-xs font-bold text-slate-800 block">Attendance History Chart</strong>
                            <div className="h-20 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 text-[10px] font-bold uppercase tracking-wider">[ Attendance Trend Sparkline ]</div>
                          </div>
                        </div>
                      )}

                      {/* Drawer Tab 6: Performance */}
                      {classDetailsTab === 'performance' && (
                        <div className="space-y-4">
                          <span className="text-xs font-bold text-slate-500 block">Subject-wise Scores breakdown</span>

                          <div className="space-y-3">
                            {[
                              { subName: 'Mathematics', score: 84, top: true },
                              { subName: 'Science', score: 81, top: false },
                              { subName: 'English', score: 78, top: false },
                              { subName: 'Social Science', score: 68, attentionNeeded: true }
                            ].map((subItem, idx) => (
                              <div key={idx} className="space-y-1 bg-white border p-3 rounded-xl shadow-sm">
                                <div className="flex justify-between text-xs font-semibold">
                                  <strong className="text-slate-800">{subItem.subName}</strong>
                                  <span className={subItem.attentionNeeded ? 'text-red-500 font-bold' : 'text-slate-800 font-bold'}>{subItem.score}% Average</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                  <div className={`h-full ${subItem.attentionNeeded ? 'bg-amber-500' : 'bg-indigo-650 bg-indigo-600'}`} style={{ width: `${subItem.score}%` }} />
                                </div>
                                <div className="flex justify-between text-[9px] font-bold mt-1">
                                  {subItem.top && <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Top Performing Subject</span>}
                                  {subItem.attentionNeeded && <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded">Requires Intervention</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Drawer Tab 7: Assignments */}
                      {classDetailsTab === 'assignments' && (
                        <div className="space-y-4">
                          <span className="text-xs font-bold text-slate-500 block">Class Active Assignments</span>

                          <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-400 uppercase">
                                  <th className="p-3">Assignment</th>
                                  <th className="p-3">Subject</th>
                                  <th className="p-3">Due Date</th>
                                  <th className="p-3">Sub. Rate</th>
                                  <th className="p-3 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { title: 'Algebra Equations Homework', sub: 'Mathematics', due: '2026-08-22', rate: '74%' },
                                  { title: 'Motion AP Lab Project', sub: 'Science', due: '2026-08-25', rate: '92%' }
                                ].map((ass, idx) => (
                                  <tr key={idx} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 font-semibold text-slate-600">
                                    <td className="p-3 font-extrabold text-slate-900">{ass.title}</td>
                                    <td className="p-3 text-slate-500">{ass.sub}</td>
                                    <td className="p-3 font-mono text-[10px] font-bold">{ass.due}</td>
                                    <td className="p-3 text-indigo-700 font-bold">{ass.rate} Sub</td>
                                    <td className="p-3 text-right font-bold">
                                      <button onClick={() => triggerToast(`Opening assignment details.`)} className="text-[#4F46E5] hover:underline">View</button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t bg-slate-50 flex justify-end gap-2 shrink-0">
                      <button onClick={() => setSelectedClassForView(null)} className="px-4 py-2 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors">Close Overview</button>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* MODAL: CREATE CLASS                                       */}
              {/* ========================================================= */}
              {currentModal === 'createClass' && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center animate-fadeIn p-4">
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full max-w-md overflow-hidden animate-zoomIn">
                    <div className="p-5 border-b flex justify-between items-center bg-slate-50">
                      <h3 className="text-sm font-extrabold text-slate-900">Create Academic Class</h3>
                      <button onClick={() => setCurrentModal(null)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X className="w-4 h-4" /></button>
                    </div>
                    
                    <form onSubmit={handleCreateClass} className="p-5 space-y-4 text-xs font-semibold text-slate-700">
                      <div>
                        <label className="block mb-1">Academic Year</label>
                        <select
                          value={newClassForm.academicYear}
                          onChange={(e) => setNewClassForm({ ...newClassForm, academicYear: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="2026-2027">2026–2027</option>
                          <option value="2025-2026">2025–2026</option>
                        </select>
                      </div>

                      <div>
                        <label className="block mb-1">Class Name / Standard Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 8"
                          value={newClassForm.name}
                          onChange={(e) => setNewClassForm({ ...newClassForm, name: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Class Code (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. CLASS-08"
                          value={newClassForm.code}
                          onChange={(e) => setNewClassForm({ ...newClassForm, code: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Initial Status</label>
                        <select
                          value={newClassForm.status}
                          onChange={(e) => setNewClassForm({ ...newClassForm, status: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>

                      <div className="pt-4 border-t flex justify-end gap-2">
                        <button type="button" onClick={() => setCurrentModal(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
                        <button type="submit" className="bg-[#4F46E5] hover:bg-[#7C3AED] text-white px-5 py-2 rounded-xl shadow-md transition-colors">Create Class</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* MODAL: CREATE SECTION                                     */}
              {/* ========================================================= */}
              {currentModal === 'createSection' && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center animate-fadeIn p-4">
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full max-w-md overflow-hidden animate-zoomIn">
                    <div className="p-5 border-b flex justify-between items-center bg-slate-50">
                      <h3 className="text-sm font-extrabold text-slate-900">Add Section standard</h3>
                      <button onClick={() => setCurrentModal(null)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X className="w-4 h-4" /></button>
                    </div>
                    
                    <form onSubmit={handleCreateSection} className="p-5 space-y-4 text-xs font-semibold text-slate-700">
                      <div>
                        <label className="block mb-1">Target Class *</label>
                        <select
                          required
                          value={newSectionForm.classId}
                          onChange={(e) => setNewSectionForm({ ...newSectionForm, classId: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="">Select Target Class...</option>
                          {classesList.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block mb-1">Section Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. A"
                          value={newSectionForm.name}
                          onChange={(e) => setNewSectionForm({ ...newSectionForm, name: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Section Code (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. 8-A"
                          value={newSectionForm.code}
                          onChange={(e) => setNewSectionForm({ ...newSectionForm, code: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Class Teacher Assignment</label>
                        <select
                          value={newSectionForm.classTeacher}
                          onChange={(e) => setNewSectionForm({ ...newSectionForm, classTeacher: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="">Select Mentor Teacher...</option>
                          <option value="Rahul Sharma">Rahul Sharma</option>
                          <option value="Priya Mehta">Priya Mehta</option>
                          <option value="Sunita Sharma">Sunita Sharma</option>
                          <option value="Preeti Malhotra">Preeti Malhotra</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block mb-1">Max Students</label>
                          <input
                            type="number"
                            value={newSectionForm.maxStudents}
                            onChange={(e) => setNewSectionForm({ ...newSectionForm, maxStudents: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Room Number</label>
                          <input
                            type="text"
                            placeholder="e.g. 204"
                            value={newSectionForm.room}
                            onChange={(e) => setNewSectionForm({ ...newSectionForm, room: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t flex justify-end gap-2">
                        <button type="button" onClick={() => setCurrentModal(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
                        <button type="submit" className="bg-[#4F46E5] hover:bg-[#7C3AED] text-white px-5 py-2 rounded-xl shadow-md transition-colors">Add Section</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* MODAL: ASSIGN CLASS TEACHER                               */}
              {/* ========================================================= */}
              {currentModal === 'assignClassTeacher' && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center animate-fadeIn p-4">
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full max-w-md overflow-hidden animate-zoomIn">
                    <div className="p-5 border-b flex justify-between items-center bg-slate-50">
                      <h3 className="text-sm font-extrabold text-slate-900 font-sans">Assign Class Teacher</h3>
                      <button onClick={() => setCurrentModal(null)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X className="w-4 h-4" /></button>
                    </div>
                    
                    <form onSubmit={handleAssignClassTeacher} className="p-5 space-y-4 text-xs font-semibold text-slate-700">
                      <div>
                        <label className="block mb-1">Select Class *</label>
                        <select
                          required
                          value={assignTeacherForm.classId}
                          onChange={(e) => setAssignTeacherForm({ ...assignTeacherForm, classId: e.target.value, sectionId: '' })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="">Select Target Class...</option>
                          {classesList.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block mb-1">Select Section *</label>
                        <select
                          required
                          value={assignTeacherForm.sectionId}
                          onChange={(e) => setAssignTeacherForm({ ...assignTeacherForm, sectionId: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                          disabled={!assignTeacherForm.classId}
                        >
                          <option value="">Select Section...</option>
                          {classesList.find(c => c.id === assignTeacherForm.classId)?.sections.map((s: any) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block mb-1">Confirm Mentor Teacher *</label>
                        <select
                          required
                          value={assignTeacherForm.teacherName}
                          onChange={(e) => setAssignTeacherForm({ ...assignTeacherForm, teacherName: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="">Select Teacher...</option>
                          <option value="Rahul Sharma">Rahul Sharma</option>
                          <option value="Priya Mehta">Priya Mehta</option>
                          <option value="Sunita Sharma">Sunita Sharma</option>
                          <option value="Preeti Malhotra">Preeti Malhotra</option>
                          <option value="Vikram Seth">Vikram Seth</option>
                        </select>
                      </div>

                      <div className="pt-4 border-t flex justify-end gap-2">
                        <button type="button" onClick={() => setCurrentModal(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
                        <button type="submit" className="bg-[#4F46E5] hover:bg-[#7C3AED] text-white px-5 py-2 rounded-xl shadow-md transition-colors font-bold">Confirm Assignment</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {activeMenu === 'academic' && activeSubMenu === 'subjects' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* ========================================================= */}
              {/* PAGE HEADER                                               */}
              {/* ========================================================= */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">Subjects Directory</h2>
                  <p className="text-slate-500 text-xs mt-1">Manage academic subjects, syllabus indexes, assignments, and teachers.</p>
                </div>
                <div className="flex items-center gap-3 self-stretch md:self-auto">
                  <button
                    onClick={() => triggerToast('Subjects configuration sheet downloaded.')}
                    className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Import Subjects</span>
                  </button>
                  <button
                    onClick={() => setCurrentModal('addSubject')}
                    className="bg-[#4F46E5] hover:bg-[#7C3AED] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Subject</span>
                  </button>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SUMMARY CARDS                                             */}
              {/* ========================================================= */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Total Subjects', value: '18', detail: 'Offered across terms', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
                  { label: 'Active Subjects', value: '17', detail: 'Currently active', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
                  { label: 'Assigned Teachers', value: '42', detail: 'Subject coordinators', icon: Users, color: 'text-purple-600 bg-purple-50' },
                  { label: 'Classes Covered', value: '10', detail: 'Primary & Secondary', icon: School, color: 'text-cyan-600 bg-cyan-50' }
                ].map((card, idx) => {
                  const IconComp = card.icon;
                  return (
                    <div key={idx} className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.color}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{card.label}</span>
                        <h4 className="text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">{card.value}</h4>
                        <span className="text-[9px] text-slate-400 block font-medium">{card.detail}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ========================================================= */}
              {/* SEARCH & FILTERS TOOLBAR                                  */}
              {/* ========================================================= */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row justify-between gap-3 items-center">
                <div className="relative w-full md:w-80 shrink-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search subject..."
                    value={subjectsSearch}
                    onChange={(e) => setSubjectsSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-400 focus:bg-white"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2.5 items-center w-full md:w-auto justify-end">
                  <select
                    value={subjectsFilterClass}
                    onChange={(e) => setSubjectsFilterClass(e.target.value)}
                    className="py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-600 outline-none animate-fadeIn"
                  >
                    <option value="ALL">All Classes</option>
                    <option value="Classes 6–10">Classes 6–10</option>
                    <option value="Classes 1–10">Classes 1–10</option>
                  </select>

                  <select
                    value={subjectsFilterTeacher}
                    onChange={(e) => setSubjectsFilterTeacher(e.target.value)}
                    className="py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-600 outline-none"
                  >
                    <option value="ALL">All Teachers</option>
                    <option value="Rahul Sharma">Rahul Sharma</option>
                    <option value="Priya Mehta">Priya Mehta</option>
                    <option value="Sunita Sharma">Sunita Sharma</option>
                  </select>
                  
                  <select
                    value={subjectsFilterStatus}
                    onChange={(e) => setSubjectsFilterStatus(e.target.value)}
                    className="py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-600 outline-none"
                  >
                    <option value="ALL">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

                  {/* List / Grid View Toggles */}
                  <div className="flex bg-slate-100 p-0.5 rounded-xl border">
                    <button
                      onClick={() => setSubjectsViewMode('list')}
                      className={`p-1.5 rounded-lg transition-all ${subjectsViewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                      title="List View"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setSubjectsViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-all ${subjectsViewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                      title="Grid View"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* BULK ACTION BAR                                           */}
              {/* ========================================================= */}
              {bulkSelectedSubjects.length > 0 && (
                <div className="bg-indigo-50 border border-indigo-100 px-5 py-3 rounded-2xl flex items-center justify-between animate-fadeIn shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] animate-pulse" />
                    <span className="text-xs font-extrabold text-indigo-900">{bulkSelectedSubjects.length} subjects selected</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setSubjectsList(subjectsList.map(s => bulkSelectedSubjects.includes(s.id) ? { ...s, status: 'Active' } : s)); setBulkSelectedSubjects([]); triggerToast('Selected subjects activated.'); }} className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors">Activate</button>
                    <button onClick={() => { setSubjectsList(subjectsList.map(s => bulkSelectedSubjects.includes(s.id) ? { ...s, status: 'Inactive' } : s)); setBulkSelectedSubjects([]); triggerToast('Selected subjects deactivated.'); }} className="bg-amber-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-amber-700 transition-colors">Deactivate</button>
                    <button onClick={() => { setBulkSelectedSubjects([]); }} className="text-xs text-slate-400 hover:text-slate-600 font-semibold px-2">Cancel</button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* SUBJECT LAYOUT VIEWS                                      */}
              {/* ========================================================= */}
              {subjectsList.filter(s => {
                const matchesSearch = s.name.toLowerCase().includes(subjectsSearch.toLowerCase()) || s.code.toLowerCase().includes(subjectsSearch.toLowerCase());
                const matchesClass = subjectsFilterClass === 'ALL' || s.classes === subjectsFilterClass;
                const matchesTeacher = subjectsFilterTeacher === 'ALL' || s.teachers.includes(subjectsFilterTeacher);
                const matchesStatus = subjectsFilterStatus === 'ALL' || s.status === subjectsFilterStatus;
                return matchesSearch && matchesClass && matchesTeacher && matchesStatus;
              }).length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-[#4F46E5] mx-auto">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-900">No subjects found.</h4>
                    <p className="text-xs text-slate-400">Create your first subject to start building your school's academic structure.</p>
                  </div>
                  <button onClick={() => setCurrentModal('addSubject')} className="bg-[#4F46E5] text-white text-xs font-bold px-4 py-2 rounded-xl shadow">+ Add Subject</button>
                </div>
              ) : subjectsViewMode === 'grid' ? (
                /* Grid View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                  {subjectsList.filter(s => {
                    const matchesSearch = s.name.toLowerCase().includes(subjectsSearch.toLowerCase()) || s.code.toLowerCase().includes(subjectsSearch.toLowerCase());
                    const matchesClass = subjectsFilterClass === 'ALL' || s.classes === subjectsFilterClass;
                    const matchesTeacher = subjectsFilterTeacher === 'ALL' || s.teachers.includes(subjectsFilterTeacher);
                    const matchesStatus = subjectsFilterStatus === 'ALL' || s.status === subjectsFilterStatus;
                    return matchesSearch && matchesClass && matchesTeacher && matchesStatus;
                  }).map(sub => (
                    <div key={sub.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all overflow-hidden">
                      <div className="p-5 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-base font-extrabold text-slate-900 font-sans tracking-tight">{sub.name}</h3>
                            <span className="text-[10px] text-indigo-650 bg-indigo-50 font-bold font-mono px-2 py-0.5 rounded block mt-1.5 w-max">{sub.code}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${sub.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>{sub.status}</span>
                        </div>

                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{sub.description}</p>

                        <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
                          <div>Classes: <strong className="text-slate-800 block">{sub.classes}</strong></div>
                          <div>Teachers: <strong className="text-slate-800 block">{sub.teachersCount} Assigned</strong></div>
                          <div>Chapters: <strong className="text-slate-800 block">{sub.chapters} Active</strong></div>
                          <div>Performance: <strong className="text-[#7C3AED] block">{sub.performance}% Avg</strong></div>
                        </div>
                      </div>

                      <div className="bg-slate-50/50 p-4 border-t border-slate-150/50 flex justify-end gap-2 shrink-0">
                        <button
                          onClick={() => { setSelectedSubjectForView(sub); setSubjectDetailsTab('overview'); }}
                          className="text-xs font-bold text-[#4F46E5] bg-indigo-50/80 px-3.5 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => triggerToast(`Editing Subject ${sub.code} values.`)}
                          className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* List View (Table Layout) */
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-fadeIn">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="p-4 pl-6 w-10">
                            <input
                              type="checkbox"
                              onChange={(e) => setBulkSelectedSubjects(e.target.checked ? subjectsList.map(s => s.id) : [])}
                              className="rounded border-slate-300 text-indigo-650"
                            />
                          </th>
                          <th className="p-4">Subject</th>
                          <th className="p-4">Subject Code</th>
                          <th className="p-4">Classes Assigned</th>
                          <th className="p-4">Teachers</th>
                          <th className="p-4">Chapters</th>
                          <th className="p-4">Total Students</th>
                          <th className="p-4">Performance</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 pr-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjectsList.filter(s => {
                          const matchesSearch = s.name.toLowerCase().includes(subjectsSearch.toLowerCase()) || s.code.toLowerCase().includes(subjectsSearch.toLowerCase());
                          const matchesClass = subjectsFilterClass === 'ALL' || s.classes === subjectsFilterClass;
                          const matchesTeacher = subjectsFilterTeacher === 'ALL' || s.teachers.includes(subjectsFilterTeacher);
                          const matchesStatus = subjectsFilterStatus === 'ALL' || s.status === subjectsFilterStatus;
                          return matchesSearch && matchesClass && matchesTeacher && matchesStatus;
                        }).map(sub => (
                          <tr key={sub.id} className="border-b border-slate-100 hover:bg-slate-50/50 text-xs font-semibold text-slate-700 transition-colors">
                            <td className="p-4 pl-6 text-center">
                              <input
                                type="checkbox"
                                checked={bulkSelectedSubjects.includes(sub.id)}
                                onChange={() => setBulkSelectedSubjects(bulkSelectedSubjects.includes(sub.id) ? bulkSelectedSubjects.filter(id => id !== sub.id) : [...bulkSelectedSubjects, sub.id])}
                                className="rounded border-slate-300 text-indigo-650"
                              />
                            </td>
                            <td className="p-4">
                              <strong className="text-slate-900 font-extrabold block text-sm">{sub.name}</strong>
                              <span className="text-[10px] text-slate-400 mt-0.5 block">{sub.type}</span>
                            </td>
                            <td className="p-4 font-mono font-bold text-[11px] text-slate-500">{sub.code}</td>
                            <td className="p-4 font-bold text-slate-800">{sub.classes}</td>
                            <td className="p-4 text-slate-600">{sub.teachersCount} Teachers</td>
                            <td className="p-4 text-slate-500">{sub.chapters} Chapters</td>
                            <td className="p-4 font-bold text-slate-700">{sub.students} Students</td>
                            <td className="p-4 text-[#7C3AED] font-extrabold">{sub.performance}% Avg</td>
                            <td className="p-4">
                              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${sub.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>{sub.status}</span>
                            </td>
                            <td className="p-4 pr-6 text-right space-x-3">
                              <button onClick={() => { setSelectedSubjectForView(sub); setSubjectDetailsTab('overview'); }} className="text-[#4F46E5] hover:underline font-bold">View</button>
                              <button onClick={() => triggerToast(`Edit Subject ${sub.name}`)} className="text-slate-400 hover:text-slate-600">Edit</button>
                              <button
                                onClick={() => { setSubjectsList(subjectsList.map(s => s.id === sub.id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s)); triggerToast('Subject status toggled.'); }}
                                className="text-red-500 hover:underline"
                              >
                                {sub.status === 'Active' ? 'Deactivate' : 'Activate'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* SUBJECT DETAILS SIDE DRAWER                               */}
              {/* ========================================================= */}
              {selectedSubjectForView && (
                <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm flex justify-end animate-fadeIn">
                  {/* Click outside to close */}
                  <div className="absolute inset-0" onClick={() => setSelectedSubjectForView(null)} />
                  
                  <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between z-50 animate-slideLeft">
                    
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-extrabold text-slate-900">{selectedSubjectForView.name} Details</h3>
                          <span className="text-[10px] font-bold bg-indigo-50 text-[#4F46E5] px-2 py-0.5 rounded">{selectedSubjectForView.code}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 font-semibold">Subject Type: {selectedSubjectForView.type} • {selectedSubjectForView.description}</p>
                      </div>
                      <button onClick={() => setSelectedSubjectForView(null)} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quick Stats Banner inside drawer */}
                    <div className="bg-indigo-50/50 px-6 py-3 border-b grid grid-cols-4 gap-2.5 text-center shrink-0">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Total Students</span>
                        <strong className="block text-sm font-extrabold text-slate-800">{selectedSubjectForView.students}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Teachers</span>
                        <strong className="block text-sm font-extrabold text-slate-800">{selectedSubjectForView.teachersCount}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Avg Performance</span>
                        <strong className="block text-sm font-extrabold text-indigo-700">{selectedSubjectForView.performance}%</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Attendance</span>
                        <strong className="block text-sm font-extrabold text-emerald-700">{selectedSubjectForView.attendance}%</strong>
                      </div>
                    </div>

                    {/* Tabs navigation */}
                    <div className="px-6 border-b flex gap-4 overflow-x-auto text-xs font-bold text-slate-400 shrink-0">
                      {['overview', 'classes', 'teachers', 'curriculum', 'performance'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setSubjectDetailsTab(tab)}
                          className={`py-3 capitalize border-b-2 transition-all ${subjectDetailsTab === tab ? 'border-[#4F46E5] text-[#4F46E5]' : 'border-transparent hover:text-slate-700'}`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Scrollable drawer tab content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      
                      {/* Drawer Tab 1: Overview */}
                      {subjectDetailsTab === 'overview' && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-slate-50 p-4 rounded-xl border text-center">
                              <span className="text-[9px] text-slate-400 uppercase font-bold">Total Classes</span>
                              <strong className="block text-slate-800 text-sm font-extrabold mt-1">10 Classes</strong>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border text-center">
                              <span className="text-[9px] text-slate-400 uppercase font-bold">Total Sections</span>
                              <strong className="block text-slate-800 text-sm font-extrabold mt-1">28 Sections</strong>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border text-center">
                              <span className="text-[9px] text-slate-400 uppercase font-bold">Chapters</span>
                              <strong className="block text-slate-800 text-sm font-extrabold mt-1">{selectedSubjectForView.chapters} Chapters</strong>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border text-center">
                              <span className="text-[9px] text-slate-400 uppercase font-bold">Topics</span>
                              <strong className="block text-slate-800 text-sm font-extrabold mt-1">{selectedSubjectForView.topicsCount} Topics</strong>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl border p-4 space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b">
                              <div>
                                <strong className="text-xs font-bold text-slate-800 block">Subject Performance</strong>
                                <span className="text-[10px] text-slate-400 font-medium">Average scoring trend over time.</span>
                              </div>
                              <select
                                value={subjectPerformancePeriod}
                                onChange={(e) => setSubjectPerformancePeriod(e.target.value)}
                                className="py-1 px-2 border rounded-lg text-[10px] font-bold outline-none bg-slate-50"
                              >
                                <option value="30D">30 Days</option>
                                <option value="7D">7 Days</option>
                                <option value="3M">3 Months</option>
                                <option value="6M">6 Months</option>
                                <option value="1Y">1 Year</option>
                              </select>
                            </div>

                            {/* Custom SVG Performance Chart */}
                            <div className="flex justify-center pt-4">
                              <svg viewBox="0 0 400 130" className="w-full h-36 overflow-visible">
                                <defs>
                                  <linearGradient id="subjChartGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.12" />
                                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                                  </linearGradient>
                                </defs>
                                <line x1="10" y1="100" x2="390" y2="100" stroke="#F1F5F9" strokeWidth="1.5" />
                                <line x1="10" y1="60" x2="390" y2="60" stroke="#F1F5F9" strokeWidth="1.5" />
                                <line x1="10" y1="20" x2="390" y2="20" stroke="#F1F5F9" strokeWidth="1.5" />
                                <path d="M 20 90 L 110 82 L 200 68 L 290 54 L 380 40" fill="none" stroke="#7C3AED" strokeWidth="2.5" />
                                <path d="M 20 90 L 110 82 L 200 68 L 290 54 L 380 40 L 380 120 L 20 120 Z" fill="url(#subjChartGrad)" />
                                {[
                                  { x: 20, y: 90, l: 'W1: 72%' },
                                  { x: 110, y: 82, l: 'W2: 74%' },
                                  { x: 200, y: 68, l: 'W3: 77%' },
                                  { x: 290, y: 54, l: 'W4: 80%' },
                                  { x: 380, y: 40, l: 'Avg: 78%' }
                                ].map((pt, i) => (
                                  <g key={i}>
                                    <circle cx={pt.x} cy={pt.y} r="4" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="1.5" />
                                    <text x={pt.x} y={pt.y - 8} textAnchor="middle" className="text-[9px] fill-slate-500 font-extrabold font-mono">{pt.l}</text>
                                  </g>
                                ))}
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Drawer Tab 2: Classes */}
                      {subjectDetailsTab === 'classes' && (
                        <div className="space-y-4">
                          <span className="text-xs font-bold text-slate-500 block">Classes where {selectedSubjectForView.name} is assigned</span>

                          <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-400 uppercase">
                                  <th className="p-3">Class</th>
                                  <th className="p-3">Sections</th>
                                  <th className="p-3">Teacher</th>
                                  <th className="p-3">Students</th>
                                  <th className="p-3">Average score</th>
                                  <th className="p-3">Attendance</th>
                                  <th className="p-3 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedSubjectForView.classesList.length === 0 ? (
                                  <tr><td colSpan={7} className="p-4 text-center text-slate-400 font-semibold">No classes assigned yet.</td></tr>
                                ) : (
                                  selectedSubjectForView.classesList.map((cAssign: any, idx: number) => (
                                    <tr key={idx} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 font-semibold text-slate-600">
                                      <td className="p-3 font-extrabold text-slate-900">{cAssign.name}</td>
                                      <td className="p-3 font-mono font-bold text-slate-500">{cAssign.sections}</td>
                                      <td className="p-3">{cAssign.teacher}</td>
                                      <td className="p-3 font-bold text-slate-700">{cAssign.students} Students</td>
                                      <td className="p-3 text-indigo-650 font-bold">{cAssign.performance}%</td>
                                      <td className="p-3 text-emerald-600 font-bold">{cAssign.attendance}%</td>
                                      <td className="p-3 text-right font-bold">
                                        <button onClick={() => triggerToast('Modifying class details.')} className="text-[#4F46E5] hover:underline mr-3">Edit</button>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Drawer Tab 3: Teachers */}
                      {subjectDetailsTab === 'teachers' && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-500">Teachers teaching {selectedSubjectForView.name}</span>
                            <button
                              onClick={() => { setAssignSubjectTeacherForm({ ...assignSubjectTeacherForm, subjectId: selectedSubjectForView.id }); setCurrentModal('assignSubjectTeacher'); }}
                              className="text-[10px] font-bold bg-[#4F46E5] text-white px-3 py-1.5 rounded-lg hover:bg-indigo-600 shadow-sm"
                            >
                              + Assign Teacher
                            </button>
                          </div>

                          <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-400 uppercase">
                                  <th className="p-3">Teacher</th>
                                  <th className="p-3">Classes</th>
                                  <th className="p-3">Sections</th>
                                  <th className="p-3">Status</th>
                                  <th className="p-3 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedSubjectForView.classesList.map((tchAssign: any, idx: number) => (
                                  <tr key={idx} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 font-semibold text-slate-600">
                                    <td className="p-3 font-extrabold text-slate-900">{tchAssign.teacher}</td>
                                    <td className="p-3 font-bold text-slate-700">{tchAssign.name}</td>
                                    <td className="p-3 font-mono font-bold text-slate-500">{tchAssign.sections}</td>
                                    <td className="p-3"><span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded">Active</span></td>
                                    <td className="p-3 text-right font-bold">
                                      <button onClick={() => triggerToast('Modifying teacher assignment.')} className="text-slate-400 hover:text-slate-600 mr-3">Edit</button>
                                      <button
                                        onClick={() => {
                                          setSubjectsList(subjectsList.map(sub => {
                                            if (sub.id === selectedSubjectForView.id) {
                                              return {
                                                ...sub,
                                                classesList: sub.classesList.filter((c: any) => c.teacher !== tchAssign.teacher)
                                              };
                                            }
                                            return sub;
                                          }));
                                          triggerToast('Teacher assignment removed.');
                                        }}
                                        className="text-red-500 hover:underline"
                                      >
                                        Remove
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Drawer Tab 4: Curriculum */}
                      {subjectDetailsTab === 'curriculum' && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-b pb-3">
                            <div>
                              <strong className="text-xs font-bold text-slate-800 block">Curriculum Syllabus Overview</strong>
                              <span className="text-[10px] text-slate-400 font-semibold">{selectedSubjectForView.chapters} Chapters • {selectedSubjectForView.topicsCount} Topics • {selectedSubjectForView.resourcesCount} Resources</span>
                            </div>
                            <button
                              onClick={() => { setSelectedSubjectForView(null); setActiveMenu('academic'); setActiveSubMenu('subjects'); triggerToast('Redirecting to Curriculum management...'); }}
                              className="bg-indigo-50 hover:bg-indigo-100 text-[#4F46E5] text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <span>View Curriculum</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="space-y-2.5">
                            {selectedSubjectForView.chaptersList.map((chap: any, idx: number) => (
                              <div key={idx} className="bg-slate-50 p-3.5 border rounded-xl flex justify-between items-center">
                                <div>
                                  <strong className="text-xs font-bold text-slate-800 block">{chap.name}</strong>
                                  <span className="text-[10px] text-slate-400 font-medium">{chap.topics} Conceptual topics mapped</span>
                                </div>
                                <span className="text-[10px] text-[#4F46E5] font-bold">Standard Syllabus</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Drawer Tab 5: Performance */}
                      {subjectDetailsTab === 'performance' && (
                        <div className="space-y-6">
                          
                          {/* Subject performance metrics */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
                            <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                              <span className="text-[9px] text-[#4F46E5] font-bold block uppercase">Average Score</span>
                              <strong className="text-lg font-black text-indigo-700 mt-1 block">78%</strong>
                            </div>
                            <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                              <span className="text-[9px] text-emerald-600 font-bold block uppercase">Improvement</span>
                              <strong className="text-lg font-black text-emerald-700 mt-1 block">+6.4%</strong>
                            </div>
                            <div className="bg-cyan-50/50 p-3 rounded-xl border border-cyan-100">
                              <span className="text-[9px] text-cyan-500 font-bold block uppercase">Quiz Performance</span>
                              <strong className="text-lg font-black text-cyan-700 mt-1 block">81%</strong>
                            </div>
                            <div className="bg-purple-50/50 p-3 rounded-xl border border-purple-100">
                              <span className="text-[9px] text-purple-600 font-bold block uppercase">Assignment Perf</span>
                              <strong className="text-lg font-black text-purple-700 mt-1 block">76%</strong>
                            </div>
                          </div>

                          {/* Top performing classes vs attention needed */}
                          <div className="bg-white border rounded-xl p-4.5 space-y-4 shadow-sm">
                            <strong className="text-xs font-bold text-slate-800 block">Class-wise Performance Benchmark</strong>
                            
                            <div className="space-y-3">
                              {[
                                { name: 'Class 8A', score: 84, status: 'Top Performing' },
                                { name: 'Class 9A', score: 82, status: 'On Track' },
                                { name: 'Class 7B', score: 68, status: 'Requires Intervention', attention: true }
                              ].map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-xs font-semibold p-2.5 bg-slate-50/60 rounded-xl border">
                                  <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${item.attention ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                                    <strong className="text-slate-800">{item.name}</strong>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <strong className={item.attention ? 'text-amber-600' : 'text-slate-700'}>{item.score}% score</strong>
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.attention ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{item.status}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* AI Subject Insights */}
                          <div className="bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/20 border border-indigo-100 rounded-xl p-4.5 space-y-3.5 shadow-sm">
                            <div className="flex items-center justify-between border-b pb-2 border-indigo-50">
                              <div className="flex items-center gap-2">
                                <Brain className="w-4 h-4 text-[#7C3AED] animate-pulse" />
                                <strong className="text-xs font-bold text-slate-800">AI Subject Insights</strong>
                              </div>
                              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            </div>

                            <div className="space-y-2.5 text-[11px] text-slate-500 font-semibold leading-relaxed">
                              <p className="bg-white p-2.5 border rounded-xl flex items-start gap-2 shadow-sm"><span className="text-amber-500 font-bold">•</span> <span>Algebra is currently the weakest topic in Class 7.</span></p>
                              <p className="bg-white p-2.5 border rounded-xl flex items-start gap-2 shadow-sm"><span className="text-emerald-500 font-bold">•</span> <span>Class 8 students improved Mathematics performance by 9% this month.</span></p>
                              <p className="bg-white p-2.5 border rounded-xl flex items-start gap-2 shadow-sm"><span className="text-amber-500 font-bold">•</span> <span>Students are showing lower performance in Geometry compared to other Mathematics topics.</span></p>
                            </div>
                          </div>

                        </div>
                      )}

                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t bg-slate-50 flex justify-end gap-2 shrink-0">
                      <button onClick={() => setSelectedSubjectForView(null)} className="px-4 py-2 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors shadow-sm">Close Drawer</button>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* MODAL: CREATE SUBJECT                                     */}
              {/* ========================================================= */}
              {currentModal === 'addSubject' && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center animate-fadeIn p-4">
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full max-w-md overflow-hidden animate-zoomIn">
                    <div className="p-5 border-b flex justify-between items-center bg-slate-50">
                      <h3 className="text-sm font-extrabold text-slate-900 font-sans">Create Academic Subject</h3>
                      <button onClick={() => setCurrentModal(null)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X className="w-4 h-4" /></button>
                    </div>
                    
                    <form onSubmit={handleCreateSubject} className="p-5 space-y-4 text-xs font-semibold text-slate-700">
                      <div>
                        <label className="block mb-1">Subject Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mathematics"
                          value={newSubjectForm.name}
                          onChange={(e) => setNewSubjectForm({ ...newSubjectForm, name: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Subject Code *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. MATH-001"
                          value={newSubjectForm.code}
                          onChange={(e) => setNewSubjectForm({ ...newSubjectForm, code: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Subject Type</label>
                        <select
                          value={newSubjectForm.type}
                          onChange={(e) => setNewSubjectForm({ ...newSubjectForm, type: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Core">Core</option>
                          <option value="Elective">Elective</option>
                          <option value="Language">Language</option>
                          <option value="Skill">Skill</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block mb-1">Description / Syllabus Scope</label>
                        <textarea
                          placeholder="Provide details about the subject curriculum..."
                          value={newSubjectForm.description}
                          onChange={(e) => setNewSubjectForm({ ...newSubjectForm, description: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl h-20 outline-none focus:border-indigo-400"
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Initial Status</label>
                        <select
                          value={newSubjectForm.status}
                          onChange={(e) => setNewSubjectForm({ ...newSubjectForm, status: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>

                      <div className="pt-4 border-t flex justify-end gap-2">
                        <button type="button" onClick={() => setCurrentModal(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
                        <button type="submit" className="bg-[#4F46E5] hover:bg-[#7C3AED] text-white px-5 py-2 rounded-xl shadow-md transition-colors">Create Subject</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* MODAL: ASSIGN TEACHER TO SUBJECT (CONFLIC CHECK TRIGGER)  */}
              {/* ========================================================= */}
              {currentModal === 'assignSubjectTeacher' && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center animate-fadeIn p-4">
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full max-w-md overflow-hidden animate-zoomIn">
                    <div className="p-5 border-b flex justify-between items-center bg-slate-50">
                      <h3 className="text-sm font-extrabold text-slate-900 font-sans">Assign Subject Teacher</h3>
                      <button onClick={() => setCurrentModal(null)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X className="w-4 h-4" /></button>
                    </div>
                    
                    <form onSubmit={handleAssignTeacherToSubject} className="p-5 space-y-4 text-xs font-semibold text-slate-700">
                      <div>
                        <label className="block mb-1">Academic Year</label>
                        <select
                          value={assignSubjectTeacherForm.academicYear}
                          onChange={(e) => setAssignSubjectTeacherForm({ ...assignSubjectTeacherForm, academicYear: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="2026-2027">2026–2027</option>
                          <option value="2025-2026">2025–2026</option>
                        </select>
                      </div>

                      <div>
                        <label className="block mb-1">Select Subject *</label>
                        <select
                          required
                          value={assignSubjectTeacherForm.subjectId}
                          onChange={(e) => setAssignSubjectTeacherForm({ ...assignSubjectTeacherForm, subjectId: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="">Choose Subject...</option>
                          {subjectsList.map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block mb-1">Class Level *</label>
                          <select
                            required
                            value={assignSubjectTeacherForm.classId}
                            onChange={(e) => setAssignSubjectTeacherForm({ ...assignSubjectTeacherForm, classId: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                          >
                            <option value="">Select Class...</option>
                            <option value="Class 6">Class 6</option>
                            <option value="Class 7">Class 7</option>
                            <option value="Class 8">Class 8</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-1">Section *</label>
                          <select
                            required
                            value={assignSubjectTeacherForm.sectionId}
                            onChange={(e) => setAssignSubjectTeacherForm({ ...assignSubjectTeacherForm, sectionId: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                          >
                            <option value="">Select Sec...</option>
                            <option value="A">Section A</option>
                            <option value="B">Section B</option>
                            <option value="C">Section C</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1">Instructor / Teacher *</label>
                        <select
                          required
                          value={assignSubjectTeacherForm.teacherName}
                          onChange={(e) => setAssignSubjectTeacherForm({ ...assignSubjectTeacherForm, teacherName: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="">Select Teacher...</option>
                          <option value="Rahul Sharma">Rahul Sharma</option>
                          <option value="Priya Mehta">Priya Mehta</option>
                          <option value="Sunita Sharma">Sunita Sharma</option>
                          <option value="Preeti Malhotra">Preeti Malhotra</option>
                          <option value="Vikram Seth">Vikram Seth</option>
                        </select>
                      </div>

                      {/* Conflict alert warning prompt replacement */}
                      {overrideModalAlert && (
                        <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex gap-2.5 animate-fadeIn">
                          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                          <div className="space-y-2">
                            <p className="text-[10px] text-red-800 leading-normal">{overrideModalAlert.message}</p>
                            <button
                              type="button"
                              onClick={overrideModalAlert.action}
                              className="bg-red-600 text-white font-bold text-[9px] px-3 py-1.5 rounded-lg shadow-sm hover:bg-red-700 transition-colors"
                            >
                              Yes, Replace Teacher
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => { setCurrentModal(null); setOverrideModalAlert(null); }}
                          className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="bg-[#4F46E5] hover:bg-[#7C3AED] text-white px-5 py-2 rounded-xl shadow-md transition-colors font-bold">Assign Teacher</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {activeMenu === 'academic' && activeSubMenu === 'curriculum' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* ========================================================= */}
              {/* PAGE HEADER                                               */}
              {/* ========================================================= */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">Curriculum Manager</h2>
                  <p className="text-slate-500 text-xs mt-1">Manage your school's curriculum, chapters, topics and learning resources.</p>
                </div>
                <div className="flex items-center gap-3 self-stretch md:self-auto">
                  <div className="bg-white border border-slate-200/80 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2 shadow-sm font-mono shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Academic Year: {curriculumVersion}</span>
                  </div>
                  <button
                    onClick={() => setCurrentModal('importCurriculum')}
                    className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Import Curriculum</span>
                  </button>
                  <button
                    onClick={() => { setCurrentModal('addContent'); }}
                    className="bg-[#4F46E5] hover:bg-[#7C3AED] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 shrink-0 animate-pulse"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Content</span>
                  </button>
                </div>
              </div>

              {/* ========================================================= */}
              {/* CURRICULUM HIERARCHY SELECTOR                             */}
              {/* ========================================================= */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-3.5 items-end">
                <div>
                  <label className="block mb-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">Board</label>
                  <select
                    value={curriculumBoard}
                    onChange={(e) => setCurriculumBoard(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
                  >
                    <option value="CBSE">CBSE Board</option>
                    <option value="ICSE">ICSE Board</option>
                    <option value="IB">IB curriculum</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">Class Level</label>
                  <select
                    value={curriculumClass}
                    onChange={(e) => setCurriculumClass(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
                  >
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">Subject Mapping</label>
                  <select
                    value={curriculumSubject}
                    onChange={(e) => setCurriculumSubject(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                  </select>
                </div>
                <div className="flex items-center gap-3.5 h-10 px-1 justify-between sm:justify-start">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Status</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-1.5 inline-block">Published</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Academic Year</span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded mt-1.5 inline-block">{curriculumVersion}</span>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* CURRICULUM SUMMARY CARDS                                  */}
              {/* ========================================================= */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Total Chapters', value: '15', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
                  { label: 'Total Topics', value: '84', icon: LayoutGrid, color: 'text-purple-600 bg-purple-50' },
                  { label: 'Learning Resources', value: '246', icon: FileSpreadsheet, color: 'text-cyan-600 bg-cyan-50' },
                  { label: 'Published Content', value: '218', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' }
                ].map((card, idx) => {
                  const IconComp = card.icon;
                  return (
                    <div key={idx} className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.color}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-sans">{card.label}</span>
                        <h4 className="text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">{card.value}</h4>
                        <span className="text-[9px] text-slate-400 block font-medium">Mapped in AI Tutor</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ========================================================= */}
              {/* EXPLORER & AI CONTENT ASSISTANT                           */}
              {/* ========================================================= */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* primary Curriculum Explorer Tree */}
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 font-sans tracking-tight">Curriculum Explorer</h3>
                      <p className="text-[10px] text-slate-400 font-medium">Structured syllabus hierarchy mapping RAG metadata.</p>
                    </div>
                    
                    <div className="relative w-48 sm:w-64">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search chapters, topics..."
                        value={curriculumSearch}
                        onChange={(e) => setCurriculumSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] outline-none font-semibold focus:bg-white focus:border-indigo-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {curriculumDataList.filter(c => {
                      const matchesSearch = c.name.toLowerCase().includes(curriculumSearch.toLowerCase()) || c.topics.some((t: any) => t.name.toLowerCase().includes(curriculumSearch.toLowerCase()));
                      return matchesSearch;
                    }).map(chap => {
                      const isChapExpanded = expandedChapters.includes(chap.id);
                      return (
                        <div key={chap.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                          {/* Chapter Header Row */}
                          <div className={`p-4 flex items-center justify-between transition-colors ${isChapExpanded ? 'bg-slate-50/70 border-b' : 'bg-white'}`}>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setExpandedChapters(isChapExpanded ? expandedChapters.filter(id => id !== chap.id) : [...expandedChapters, chap.id])}
                                className="p-1 hover:bg-slate-250/60 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700"
                              >
                                <ChevronRight className={`w-4 h-4 transition-transform ${isChapExpanded ? 'rotate-90' : ''}`} />
                              </button>
                              <div>
                                <div className="flex items-center gap-2">
                                  <strong className="text-xs font-bold text-slate-900 block font-sans">Chapter {chap.number}: {chap.name}</strong>
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${chap.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{chap.status}</span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-semibold">{chap.topicsCount} Topics • Estimated duration: {chap.learningTime}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => { setSelectedChapterOrTopicForView(chap); }}
                                className="text-[10px] font-bold text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded-lg hover:bg-indigo-100 transition-colors"
                              >
                                View Details
                              </button>
                              
                              <select
                                onChange={(e) => {
                                  if (e.target.value === 'addTopic') {
                                    setNewTopicForm({ ...newTopicForm, chapterId: chap.id });
                                    setCurrentModal('createTopic');
                                  } else {
                                    triggerToast(`Action ${e.target.value} triggered.`);
                                  }
                                  e.target.value = '';
                                }}
                                className="py-1 px-2 border rounded-lg text-[10px] outline-none font-bold text-slate-500 bg-white"
                              >
                                <option value="">Actions</option>
                                <option value="addTopic">+ Add Topic</option>
                                <option value="edit">Edit Chapter</option>
                                <option value="reorder">Reorder</option>
                                <option value="archive">Archive</option>
                              </select>
                            </div>
                          </div>

                          {/* Expanded Topics inside Chapter */}
                          {isChapExpanded && (
                            <div className="bg-white/40 p-4 space-y-3.5 pl-9 relative">
                              {/* vertical tree styling line */}
                              <div className="absolute left-6.5 left-[26px] top-4 bottom-8 w-0.5 bg-slate-100" />
                              
                              {chap.topics.length === 0 ? (
                                <div className="text-center py-4 text-xs text-slate-400">No topics added to this chapter yet.</div>
                              ) : (
                                chap.topics.map((topic: any) => {
                                  const isTopicExpanded = expandedTopics.includes(topic.id);
                                  return (
                                    <div key={topic.id} className="space-y-3 relative">
                                      {/* horizontal node line */}
                                      <div className="absolute -left-[16px] top-3.5 w-4 h-0.5 bg-slate-100" />
                                      
                                      {/* Topic Row Header */}
                                      <div className="flex items-center justify-between bg-slate-50/50 p-2.5 rounded-xl border border-slate-200/50 shadow-sm">
                                        <div className="flex items-center gap-2">
                                          <button
                                            onClick={() => setExpandedTopics(isTopicExpanded ? expandedTopics.filter(id => id !== topic.id) : [...expandedTopics, topic.id])}
                                            className="p-0.5 hover:bg-slate-200 rounded-md text-slate-400 hover:text-slate-700"
                                          >
                                            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isTopicExpanded ? 'rotate-90' : ''}`} />
                                          </button>
                                          <div>
                                            <strong className="text-xs font-bold text-slate-800 block">Topic {topic.number}: {topic.name}</strong>
                                            <span className="text-[9px] text-slate-400 font-semibold">{topic.content.length} Learning Resources • {topic.completionStatus}</span>
                                          </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${topic.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>{topic.status}</span>
                                          
                                          <select
                                            onChange={(e) => {
                                              if (e.target.value === 'addContent') {
                                                setNewContentForm({ ...newContentForm, chapterId: chap.id, topicId: topic.id });
                                                setCurrentModal('addContent');
                                              } else {
                                                triggerToast(`Action ${e.target.value} triggered.`);
                                              }
                                              e.target.value = '';
                                            }}
                                            className="py-1 px-2 border rounded-lg text-[9px] outline-none font-bold text-slate-500 bg-white"
                                          >
                                            <option value="">Manage</option>
                                            <option value="addContent">+ Add Content</option>
                                            <option value="edit">Edit Topic</option>
                                            <option value="archive">Archive</option>
                                          </select>
                                        </div>
                                      </div>

                                      {/* Expanded Learning Resources List */}
                                      {isTopicExpanded && (
                                        <div className="pl-6 space-y-2 relative">
                                          <div className="absolute left-[6px] top-0 bottom-4 w-0.5 bg-slate-100" />
                                          
                                          {topic.content.length === 0 ? (
                                            <div className="text-[10px] text-slate-400 py-2 pl-4">No learning content available. Click &quot;Manage &rarr; + Add Content&quot; to upload.</div>
                                          ) : (
                                            topic.content.map((res: any) => (
                                              <div key={res.id} className="flex justify-between items-center bg-white p-2 border rounded-lg shadow-sm text-xs relative">
                                                <div className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-3.5 h-0.5 bg-slate-100" />
                                                
                                                <div className="flex items-center gap-2.5 pl-1.5">
                                                  <span className={`px-2 py-0.5 rounded-[6px] text-[9px] font-extrabold font-mono ${
                                                    res.type === 'Quiz' ? 'bg-purple-50 text-[#7C3AED]' : res.type === 'PDF' ? 'bg-red-50 text-red-700' : 'bg-cyan-50 text-cyan-600'
                                                  }`}>{res.type}</span>
                                                  <div>
                                                    <strong className="text-slate-800 font-extrabold block text-[11px] leading-tight">{res.title}</strong>
                                                    <span className="text-[9px] text-slate-400 font-medium">Duration: {res.duration} • Uploaded: {res.lastUpdated}</span>
                                                  </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-3 shrink-0 pr-2">
                                                  {res.createdBy === 'AI Generated' && res.status === 'Review Required' ? (
                                                    <div className="flex items-center gap-1.5">
                                                      <span className="bg-purple-100 text-[#7C3AED] text-[9px] font-extrabold px-1.5 py-0.5 rounded">AI Generated</span>
                                                      <span className="bg-red-50 text-red-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded">Review Required</span>
                                                      <button onClick={() => { setCurriculumAiOutput({ title: res.title, type: res.type, questionsCount: '10', difficulty: 'Medium', objective: 'Practice Rational Numbers' }); handleApproveCurriculumAiContent(chap.id, topic.id); }} className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-1 rounded-md shadow-sm hover:bg-emerald-700 transition-colors">Approve</button>
                                                    </div>
                                                  ) : (
                                                    <span className="text-[10px] text-slate-400 font-semibold">{res.createdBy}</span>
                                                  )}
                                                  <button onClick={() => triggerToast(`Archiving content item.`)} className="text-slate-450 text-slate-400 hover:text-red-500 font-bold text-[10px]">Archive</button>
                                                </div>
                                              </div>
                                            ))
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    <button
                      onClick={() => setCurrentModal('createChapter')}
                      className="w-full py-3.5 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 border-dashed text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 mt-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add Chapter</span>
                    </button>
                  </div>
                </div>

                {/* Right side AI Content Assistant and progress */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* AI Content Assistant Card */}
                  <div className="bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/20 p-5 rounded-2xl border border-indigo-150/40 shadow-sm flex flex-col justify-between space-y-5">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-indigo-50">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center text-[#4F46E5] shadow-sm">
                            <Brain className="w-4 h-4 text-[#7C3AED] animate-pulse" />
                          </div>
                          <div>
                            <h3 className="text-xs font-extrabold text-slate-900 tracking-tight">AI Content Assistant</h3>
                            <p className="text-[9px] text-slate-400 font-semibold">Generate RAG-ready lesson drafts and quizzes.</p>
                          </div>
                        </div>
                        <Sparkles className="w-4 h-4 text-amber-500" />
                      </div>

                      <form onSubmit={handleCurriculumAiGenerate} className="space-y-3.5 mt-4 text-xs font-semibold text-slate-700">
                        <div>
                          <label className="block mb-1 text-[9px] text-slate-400 uppercase font-bold">Topic Theme / Input *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Operations on Rational Numbers"
                            value={curriculumAiInput.topic}
                            onChange={(e) => setCurriculumAiInput({ ...curriculumAiInput, topic: e.target.value })}
                            className="w-full p-2 bg-white border border-slate-200 rounded-xl"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block mb-1 text-[9px] text-slate-400 uppercase font-bold">Type</label>
                            <select
                              value={curriculumAiInput.type}
                              onChange={(e) => setCurriculumAiInput({ ...curriculumAiInput, type: e.target.value })}
                              className="w-full p-2 bg-white border border-slate-200 rounded-xl"
                            >
                              <option value="Quiz">Practice Quiz</option>
                              <option value="Lesson">Lesson Explanation</option>
                              <option value="Notes">Revision Notes</option>
                            </select>
                          </div>
                          <div>
                            <label className="block mb-1 text-[9px] text-slate-400 uppercase font-bold">Difficulty</label>
                            <select
                              value={curriculumAiInput.difficulty}
                              onChange={(e) => setCurriculumAiInput({ ...curriculumAiInput, difficulty: e.target.value })}
                              className="w-full p-2 bg-white border border-slate-200 rounded-xl"
                            >
                              <option value="Easy">Easy</option>
                              <option value="Medium">Medium</option>
                              <option value="Hard">Hard</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block mb-1 text-[9px] text-slate-400 uppercase font-bold">Questions Count</label>
                          <input
                            type="number"
                            value={curriculumAiInput.questionsCount}
                            onChange={(e) => setCurriculumAiInput({ ...curriculumAiInput, questionsCount: e.target.value })}
                            className="w-full p-2 bg-white border border-slate-200 rounded-xl font-mono"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-indigo-650 hover:bg-[#4F46E5] bg-indigo-650 text-white font-extrabold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Brain className="w-3.5 h-3.5" />
                          <span>Generate with AI</span>
                        </button>
                      </form>
                    </div>

                    {/* AI Generated Output Draft Block */}
                    {curriculumAiOutput && (
                      <div className="bg-white border border-purple-100 rounded-xl p-3.5 space-y-3 shadow-inner animate-fadeIn">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-[#7C3AED] font-extrabold uppercase tracking-wide">Generated Draft Output</span>
                          <span className="bg-amber-50 text-amber-600 text-[9px] font-extrabold px-1.5 py-0.5 rounded">Review Required</span>
                        </div>
                        <div className="space-y-1.5">
                          <strong className="text-xs font-bold text-slate-800 block leading-snug">{curriculumAiOutput.title}</strong>
                          <p className="text-[10px] text-slate-400 leading-normal">objective: {curriculumAiOutput.objective} • Difficulty: {curriculumAiOutput.difficulty}</p>
                          <div className="text-[9px] font-mono text-slate-500 bg-slate-50 p-2 rounded border max-h-[80px] overflow-y-auto">
                            {curriculumAiOutput.questions.map((q: any, i: number) => (
                              <div key={i} className="mb-2 last:mb-0">
                                <strong>{q.q}</strong>
                                <span className="block text-[8px] text-indigo-600">Correct option: {q.a}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t flex justify-end gap-2 text-[10px] font-bold">
                          <button onClick={() => setCurriculumAiOutput(null)} className="text-slate-400 hover:text-slate-600 px-1">Discard</button>
                          <button
                            onClick={() => handleApproveCurriculumAiContent(curriculumDataList[0].id, curriculumDataList[0].topics[0].id)}
                            className="bg-emerald-600 text-white px-3 py-1 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                          >
                            Approve & Publish
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Curriculum Progress & analytics */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                    <h3 className="text-xs font-extrabold text-slate-900 border-b pb-2 border-slate-100 tracking-tight">Curriculum Progress</h3>
                    
                    <div className="space-y-4 text-xs font-semibold text-slate-600">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-bold text-slate-500">
                          <span>Syllabus Status</span>
                          <span className="text-slate-800">88% Published</span>
                        </div>
                        <div className="flex h-3 w-full rounded-full overflow-hidden bg-slate-100">
                          <div className="bg-emerald-500 h-full" style={{ width: '88%' }} title="Published (88%)" />
                          <div className="bg-amber-500 h-full" style={{ width: '7%' }} title="Under Review (7%)" />
                          <div className="bg-slate-350 bg-slate-300 h-full" style={{ width: '5%' }} title="Draft (5%)" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-2">
                        <div className="bg-emerald-50 p-2 rounded-xl">
                          <span className="text-emerald-700 block font-bold">Published</span>
                          <strong className="block text-sm text-slate-800 mt-1">218 Items</strong>
                        </div>
                        <div className="bg-amber-50 p-2 rounded-xl">
                          <span className="text-amber-700 block font-bold">In Review</span>
                          <strong className="block text-sm text-slate-800 mt-1">16 Items</strong>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl">
                          <span className="text-slate-600 block font-bold">Drafts</span>
                          <strong className="block text-sm text-slate-800 mt-1">12 Items</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* ========================================================= */}
              {/* CURRICULUM DETAIL PANEL DRAWER                            */}
              {/* ========================================================= */}
              {selectedChapterOrTopicForView && (
                <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm flex justify-end animate-fadeIn">
                  <div className="absolute inset-0" onClick={() => setSelectedChapterOrTopicForView(null)} />
                  <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-50 animate-slideLeft p-6 space-y-6">
                    <div className="flex justify-between items-start border-b pb-4 bg-slate-50/50 -m-6 p-6">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">Chapter Detail Panel</h3>
                        <p className="text-[10px] text-slate-400 font-semibold mt-1">Class {curriculumClass} • {curriculumSubject}</p>
                      </div>
                      <button onClick={() => setSelectedChapterOrTopicForView(null)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X className="w-5 h-5" /></button>
                    </div>

                    <div className="flex-1 space-y-5 text-xs font-semibold text-slate-600 pt-6">
                      <div className="bg-slate-50 p-4 rounded-xl border space-y-1.5">
                        <span className="text-[9px] text-slate-400 uppercase font-bold block">Chapter Standard Name</span>
                        <strong className="text-slate-800 text-sm block">Chapter {selectedChapterOrTopicForView.number}: {selectedChapterOrTopicForView.name}</strong>
                        <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{selectedChapterOrTopicForView.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-3 rounded-xl border text-center">
                          <span className="text-[9px] text-slate-400 uppercase font-bold">Topics count</span>
                          <strong className="block text-slate-800 text-sm mt-1">{selectedChapterOrTopicForView.topics?.length || 0} Topics</strong>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border text-center">
                          <span className="text-[9px] text-slate-400 uppercase font-bold">Duration</span>
                          <strong className="block text-slate-800 text-sm mt-1">{selectedChapterOrTopicForView.learningTime}</strong>
                        </div>
                      </div>

                      <div className="bg-white border rounded-xl p-4.5 space-y-3.5 shadow-sm">
                        <strong className="text-xs font-bold text-slate-800 block">AI Subject Processing Index</strong>
                        <div className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                          This chapter metadata is indexed for RAG vector tutor queries. Quiz generation is active for this structural scope.
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t flex justify-end gap-2 bg-slate-50/50 -m-6 p-4">
                      <button onClick={() => setSelectedChapterOrTopicForView(null)} className="px-4 py-2 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors">Close details</button>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* MODAL: CREATE CHAPTER                                     */}
              {/* ========================================================= */}
              {currentModal === 'createChapter' && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center animate-fadeIn p-4">
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full max-w-md overflow-hidden animate-zoomIn">
                    <div className="p-5 border-b flex justify-between items-center bg-slate-50">
                      <h3 className="text-sm font-extrabold text-slate-900 font-sans">Add Curriculum Chapter</h3>
                      <button onClick={() => setCurrentModal(null)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X className="w-4 h-4" /></button>
                    </div>
                    
                    <form onSubmit={handleCreateChapter} className="p-5 space-y-4 text-xs font-semibold text-slate-700">
                      <div className="grid grid-cols-4 gap-3">
                        <div className="col-span-1">
                          <label className="block mb-1">Ch. No. *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 4"
                            value={newChapterForm.number}
                            onChange={(e) => setNewChapterForm({ ...newChapterForm, number: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center"
                          />
                        </div>
                        <div className="col-span-3">
                          <label className="block mb-1">Chapter Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Understanding Quadrilaterals"
                            value={newChapterForm.name}
                            onChange={(e) => setNewChapterForm({ ...newChapterForm, name: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1">Description</label>
                        <textarea
                          placeholder="Brief description about the chapter topics..."
                          value={newChapterForm.description}
                          onChange={(e) => setNewChapterForm({ ...newChapterForm, description: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl h-20 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block mb-1">Estimated Learning Time</label>
                          <input
                            type="text"
                            placeholder="e.g. 5 hours"
                            value={newChapterForm.learningTime}
                            onChange={(e) => setNewChapterForm({ ...newChapterForm, learningTime: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Status</label>
                          <select
                            value={newChapterForm.status}
                            onChange={(e) => setNewChapterForm({ ...newChapterForm, status: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                          >
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-4 border-t flex justify-end gap-2">
                        <button type="button" onClick={() => setCurrentModal(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
                        <button type="submit" className="bg-[#4F46E5] text-white px-5 py-2 rounded-xl shadow-md hover:bg-indigo-600 transition-colors">Add Chapter</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* MODAL: CREATE TOPIC                                       */}
              {/* ========================================================= */}
              {currentModal === 'createTopic' && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center animate-fadeIn p-4">
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full max-w-md overflow-hidden animate-zoomIn">
                    <div className="p-5 border-b flex justify-between items-center bg-slate-50">
                      <h3 className="text-sm font-extrabold text-slate-900 font-sans">Add Topic standard</h3>
                      <button onClick={() => setCurrentModal(null)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X className="w-4 h-4" /></button>
                    </div>
                    
                    <form onSubmit={handleCreateTopic} className="p-5 space-y-4 text-xs font-semibold text-slate-700">
                      <div className="grid grid-cols-4 gap-3">
                        <div className="col-span-1">
                          <label className="block mb-1">Topic No. *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 1"
                            value={newTopicForm.number}
                            onChange={(e) => setNewTopicForm({ ...newTopicForm, number: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center"
                          />
                        </div>
                        <div className="col-span-3">
                          <label className="block mb-1">Topic Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Properties of operations"
                            value={newTopicForm.name}
                            onChange={(e) => setNewTopicForm({ ...newTopicForm, name: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1">Learning Objective</label>
                        <input
                          type="text"
                          placeholder="What will the student learn..."
                          value={newTopicForm.learningObjective}
                          onChange={(e) => setNewTopicForm({ ...newTopicForm, learningObjective: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Description</label>
                        <textarea
                          placeholder="Brief description about this topic..."
                          value={newTopicForm.description}
                          onChange={(e) => setNewTopicForm({ ...newTopicForm, description: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl h-20 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block mb-1">Estimated duration</label>
                          <input
                            type="text"
                            placeholder="e.g. 45 minutes"
                            value={newTopicForm.learningTime}
                            onChange={(e) => setNewTopicForm({ ...newTopicForm, learningTime: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Status</label>
                          <select
                            value={newTopicForm.status}
                            onChange={(e) => setNewTopicForm({ ...newTopicForm, status: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                          >
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-4 border-t flex justify-end gap-2">
                        <button type="button" onClick={() => setCurrentModal(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
                        <button type="submit" className="bg-[#4F46E5] text-white px-5 py-2 rounded-xl shadow-md hover:bg-indigo-600 transition-colors">Add Topic</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* MODAL: ADD LEARNING CONTENT                               */}
              {/* ========================================================= */}
              {currentModal === 'addContent' && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center animate-fadeIn p-4">
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full max-w-md overflow-hidden animate-zoomIn">
                    <div className="p-5 border-b flex justify-between items-center bg-slate-50">
                      <h3 className="text-sm font-extrabold text-slate-900 font-sans">Add Learning Content</h3>
                      <button onClick={() => setCurrentModal(null)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X className="w-4 h-4" /></button>
                    </div>
                    
                    <form onSubmit={handleCreateContent} className="p-5 space-y-4 text-xs font-semibold text-slate-700">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block mb-1">Select Chapter *</label>
                          <select
                            required
                            value={newContentForm.chapterId}
                            onChange={(e) => setNewContentForm({ ...newContentForm, chapterId: e.target.value, topicId: '' })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                          >
                            <option value="">Choose Chapter...</option>
                            {curriculumDataList.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block mb-1">Select Topic *</label>
                          <select
                            required
                            value={newContentForm.topicId}
                            onChange={(e) => setNewContentForm({ ...newContentForm, topicId: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                            disabled={!newContentForm.chapterId}
                          >
                            <option value="">Choose Topic...</option>
                            {curriculumDataList.find(c => c.id === newContentForm.chapterId)?.topics.map((t: any) => (
                              <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block mb-1">Content Type</label>
                          <select
                            value={newContentForm.contentType}
                            onChange={(e) => setNewContentForm({ ...newContentForm, contentType: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                          >
                            <option value="Lesson">Lesson Video</option>
                            <option value="PDF">PDF document</option>
                            <option value="Interactive Activity">Interactive activity</option>
                            <option value="Quiz">Practice Quiz</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-1">Duration / Scale</label>
                          <input
                            type="text"
                            placeholder="e.g. 15 min"
                            value={newContentForm.duration}
                            onChange={(e) => setNewContentForm({ ...newContentForm, duration: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1">Content Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rational Numbers introductory lesson"
                          value={newContentForm.title}
                          onChange={(e) => setNewContentForm({ ...newContentForm, title: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 font-extrabold text-[#4F46E5] flex items-center gap-1.5 cursor-pointer bg-indigo-50 border border-dashed border-indigo-200 p-4 rounded-xl text-center justify-center hover:bg-indigo-100 transition-colors">
                          <Download className="w-4 h-4" />
                          <span>Click to Upload File (PDF / MP4)</span>
                          <input type="file" className="hidden" onChange={(e) => setNewContentForm({ ...newContentForm, file: e.target.files ? e.target.files[0] : null })} />
                        </label>
                        {newContentForm.file && <span className="block mt-1 text-[10px] text-slate-500 font-mono">Selected: {newContentForm.file.name}</span>}
                      </div>

                      <div className="pt-4 border-t flex justify-end gap-2">
                        <button type="button" onClick={() => setCurrentModal(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
                        <button type="submit" className="bg-[#4F46E5] text-white px-5 py-2 rounded-xl shadow-md hover:bg-indigo-600 transition-colors">Publish Content</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* MODAL: IMPORT CURRICULUM WIZARD                           */}
              {/* ========================================================= */}
              {currentModal === 'importCurriculum' && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center animate-fadeIn p-4">
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full max-w-md overflow-hidden animate-zoomIn">
                    <div className="p-5 border-b flex justify-between items-center bg-slate-50">
                      <h3 className="text-sm font-extrabold text-slate-900 font-sans">Import Curriculum Wizard</h3>
                      <button onClick={() => { setCurrentModal(null); setImportCurriculumStep(1); }} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X className="w-4 h-4" /></button>
                    </div>
                    
                    <div className="p-5 space-y-4 text-xs font-semibold text-slate-700">
                      {/* step indicator bar */}
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 border-b pb-3">
                        <span className={importCurriculumStep >= 1 ? 'text-[#4F46E5]' : ''}>1. Upload</span>
                        <span className={importCurriculumStep >= 2 ? 'text-[#4F46E5]' : ''}>2. Map Fields</span>
                        <span className={importCurriculumStep >= 3 ? 'text-[#4F46E5]' : ''}>3. Preview</span>
                      </div>

                      {importCurriculumStep === 1 && (
                        <div className="space-y-4">
                          <p className="text-[11px] text-slate-500 font-medium">Upload your structured syllabus files (CSV / Excel).</p>
                          <label className="block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                            <Download className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <span className="block text-[11px] text-slate-600">Select file to parse</span>
                            <input type="file" className="hidden" onChange={() => setImportCurriculumStep(2)} />
                          </label>
                        </div>
                      )}

                      {importCurriculumStep === 2 && (
                        <div className="space-y-3.5">
                          <p className="text-[11px] text-slate-500 font-medium">Map database columns to academic taxonomy keys.</p>
                          <div className="space-y-2.5">
                            <div className="flex justify-between items-center"><span className="text-[10px] text-slate-400">Chapter Title Map</span> <strong>Mapped to col_2</strong></div>
                            <div className="flex justify-between items-center"><span className="text-[10px] text-slate-400">Topic Objective Map</span> <strong>Mapped to col_5</strong></div>
                          </div>
                          
                          <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                            <span className="text-[9px] text-red-800">Warning: 3 topics are missing chapter mappings in dataset.</span>
                          </div>

                          <div className="pt-4 border-t flex justify-end gap-2">
                            <button type="button" onClick={() => setImportCurriculumStep(1)} className="px-3 py-1.5 text-slate-500">Back</button>
                            <button type="button" onClick={() => setImportCurriculumStep(3)} className="bg-[#4F46E5] text-white px-4 py-1.5 rounded-lg shadow-sm">Preview</button>
                          </div>
                        </div>
                      )}

                      {importCurriculumStep === 3 && (
                        <div className="space-y-4">
                          <p className="text-[11px] text-slate-500 font-medium">Verify structural parsed outline preview before importing.</p>
                          <div className="bg-slate-50 p-3 rounded-lg border max-h-[120px] overflow-y-auto font-mono text-[9px]">
                            <div>[Parsed OUTLINE: 4 Chapters, 24 topics loaded.]</div>
                          </div>

                          <div className="pt-4 border-t flex justify-end gap-2">
                            <button type="button" onClick={() => setImportCurriculumStep(2)} className="px-3 py-1.5 text-slate-500">Back</button>
                            <button
                              type="button"
                              onClick={() => {
                                setCurrentModal(null);
                                setImportCurriculumStep(1);
                                triggerToast('Academic Curriculum imported successfully.');
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg shadow-sm"
                            >
                              Final Import
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
          {/* ============================================================ */}
          {/* ACADEMIC CALENDAR                                             */}
          {/* ============================================================ */}
          {activeMenu === 'academic' && activeSubMenu === 'calendar' && (() => {
            const calDays = getCalendarDays(calendarYear, calendarMonth);
            const EVENT_TYPES = ['Academic','Exam','Test','Holiday','School Event','Parent Meeting','Assignment Deadline','Live Class','Result','Admission','Other'];
            return (
              <div className="space-y-5 animate-fadeIn">

                {/* ── Page Header ──────────────────────────────────────── */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">Academic Calendar</h2>
                    <p className="text-slate-500 text-xs mt-1">Manage your school&apos;s academic schedule, events, exams and important dates.</p>
                  </div>
                  <div className="flex items-center gap-3 self-stretch md:self-auto flex-wrap">
                    <select className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl shadow-sm shrink-0">
                      <option>2026–2027</option>
                      <option>2025–2026</option>
                    </select>
                    <button onClick={() => setShowAcademicYearSettings(true)} className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm shrink-0">
                      <Settings className="w-3.5 h-3.5" />
                      <span>Academic Year Settings</span>
                    </button>
                    <button onClick={() => { setCurrentModal('createEvent'); }} className="bg-[#4F46E5] hover:bg-[#7C3AED] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 shrink-0">
                      <Plus className="w-4 h-4" />
                      <span>+ Create Event</span>
                    </button>
                  </div>
                </div>

                {/* ── AI Conflict Alert Banner ─────────────────────────── */}
                {calendarConflictAlert && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 animate-fadeIn">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <strong className="text-xs font-extrabold text-amber-800 block">Scheduling Conflict Detected</strong>
                      <p className="text-[10px] text-amber-700 mt-0.5">{calendarConflictAlert}</p>
                    </div>
                    <button onClick={() => setCalendarConflictAlert(null)} className="text-amber-500 hover:text-amber-700 text-[10px] font-bold shrink-0">Dismiss</button>
                  </div>
                )}

                {/* ── Summary Cards ────────────────────────────────────── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Academic Year', value: '2026–2027', sub: 'Active', icon: GraduationCap, color: 'text-indigo-600 bg-indigo-50' },
                    { label: 'Current Term', value: 'Term 1', sub: 'Apr – Sep 2026', icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
                    { label: 'Upcoming Events', value: String(upcomingEvents.length), sub: 'in next 30 days', icon: CalendarDays, color: 'text-cyan-600 bg-cyan-50' },
                    { label: 'Upcoming Exams', value: String(filteredCalendarEvents.filter(e => (e.type === 'Exam' || e.type === 'Test') && e.date >= todayStr).length), sub: 'scheduled', icon: FileSpreadsheet, color: 'text-emerald-600 bg-emerald-50' },
                  ].map((c, i) => {
                    const IC = c.icon;
                    return (
                      <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${c.color}`}><IC className="w-5 h-5" /></div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{c.label}</span>
                          <h4 className="text-lg font-extrabold text-slate-900 tracking-tight mt-0.5">{c.value}</h4>
                          <span className="text-[9px] text-slate-400 font-medium">{c.sub}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ── Main Layout: Calendar + Side Panel ───────────────── */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">

                  {/* ── Left: Calendar ─────────────────────────────────── */}
                  <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">

                    {/* Calendar Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-100 bg-slate-50/50">
                      <div className="flex items-center gap-2">
                        <button onClick={calendarNavPrev} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500"><ChevronLeft className="w-4 h-4" /></button>
                        <button onClick={calendarNavToday} className="px-3 py-1 text-[10px] font-bold border border-slate-200 rounded-lg bg-white hover:bg-slate-50">Today</button>
                        <button onClick={calendarNavNext} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500"><ChevronRight className="w-4 h-4" /></button>
                        <h3 className="text-sm font-extrabold text-slate-900 ml-1 font-sans">{MONTH_NAMES[calendarMonth]} {calendarYear}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Search */}
                        <div className="relative hidden sm:block">
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input type="text" placeholder="Search events..." value={calendarSearch} onChange={e => setCalendarSearch(e.target.value)} className="pl-8 pr-3 py-1.5 text-[10px] bg-white border border-slate-200 rounded-xl outline-none w-44 focus:border-indigo-400" />
                        </div>
                        {/* Type Filter */}
                        <select value={calendarFilterType} onChange={e => setCalendarFilterType(e.target.value)} className="text-[10px] font-bold border border-slate-200 rounded-xl py-1.5 px-2 bg-white outline-none">
                          <option value="ALL">All Types</option>
                          {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        {/* View Toggle */}
                        <div className="flex rounded-xl border border-slate-200 overflow-hidden">
                          {(['month','week','list'] as const).map(v => (
                            <button key={v} onClick={() => setCalendarView(v)} className={`px-3 py-1.5 text-[10px] font-bold transition-colors capitalize ${calendarView === v ? 'bg-[#4F46E5] text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>{v}</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* ── Month View ─────────────────────────────────── */}
                    {calendarView === 'month' && (
                      <div className="p-4">
                        {/* Day headers */}
                        <div className="grid grid-cols-7 mb-2">
                          {DAY_NAMES.map(d => (
                            <div key={d} className="text-center text-[9px] font-extrabold text-slate-400 uppercase tracking-wider py-1">{d}</div>
                          ))}
                        </div>
                        {/* Day cells */}
                        <div className="grid grid-cols-7 gap-1">
                          {calDays.map((day, idx) => {
                            const dayEvents = filteredCalendarEvents.filter(ev => ev.date === day.fullDate);
                            const isToday = day.fullDate === todayStr;
                            const isCurrent = day.month === 'current';
                            return (
                              <div key={idx} className={`min-h-[80px] rounded-xl p-1.5 border transition-all cursor-default ${isCurrent ? 'border-slate-200/80 bg-white hover:bg-slate-50/70' : 'border-transparent bg-slate-50/30'} ${isToday ? 'border-[#4F46E5] ring-1 ring-[#4F46E5]/20' : ''}`}>
                                <div className={`text-[11px] font-extrabold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-[#4F46E5] text-white' : isCurrent ? 'text-slate-700' : 'text-slate-300'}`}>{day.date}</div>
                                <div className="space-y-0.5">
                                  {dayEvents.slice(0, 2).map(ev => (
                                    <button key={ev.id} onClick={() => setSelectedCalendarEvent(ev)} className={`w-full text-left text-[8px] font-bold px-1.5 py-0.5 rounded-[5px] truncate border ${getEventColor(ev.type)} hover:opacity-80 transition-opacity`}>{ev.name}</button>
                                  ))}
                                  {dayEvents.length > 2 && <span className="text-[8px] text-slate-400 font-bold pl-1">+{dayEvents.length - 2} more</span>}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* ── Week View ──────────────────────────────────── */}
                    {calendarView === 'week' && (() => {
                      const today = new Date(calendarYear, calendarMonth, 1);
                      const weekStart = new Date(today);
                      weekStart.setDate(today.getDate() - today.getDay());
                      const weekDays = Array.from({length: 7}, (_, i) => {
                        const d = new Date(weekStart);
                        d.setDate(weekStart.getDate() + i);
                        return { label: DAY_NAMES[i], date: d.getDate(), fullDate: d.toISOString().split('T')[0] };
                      });
                      const hours = Array.from({length: 12}, (_, i) => `${String(i + 7).padStart(2,'0')}:00`);
                      return (
                        <div className="p-4 overflow-x-auto">
                          <div className="min-w-[600px]">
                            {/* Week header */}
                            <div className="grid grid-cols-8 mb-2 border-b border-slate-100 pb-2">
                              <div className="text-[9px] text-slate-400 font-bold text-center">Time</div>
                              {weekDays.map(d => (
                                <div key={d.fullDate} className={`text-center ${d.fullDate === todayStr ? 'text-[#4F46E5]' : 'text-slate-600'}`}>
                                  <div className="text-[9px] font-bold uppercase">{d.label}</div>
                                  <div className={`text-sm font-extrabold ${d.fullDate === todayStr ? 'bg-[#4F46E5] text-white w-7 h-7 rounded-full flex items-center justify-center mx-auto' : ''}`}>{d.date}</div>
                                </div>
                              ))}
                            </div>
                            {/* Time slots */}
                            {hours.map(hour => (
                              <div key={hour} className="grid grid-cols-8 border-b border-slate-50 min-h-[44px]">
                                <div className="text-[9px] text-slate-400 font-mono pt-1 pr-2 text-right">{hour}</div>
                                {weekDays.map(d => {
                                  const slotEvs = filteredCalendarEvents.filter(ev => ev.date === d.fullDate && ev.startTime && ev.startTime.startsWith(hour.slice(0,2)));
                                  return (
                                    <div key={d.fullDate} className="border-l border-slate-100 px-0.5 py-0.5 space-y-0.5">
                                      {slotEvs.map(ev => (
                                        <button key={ev.id} onClick={() => setSelectedCalendarEvent(ev)} className={`w-full text-left text-[8px] font-bold px-1 py-0.5 rounded border truncate ${getEventColor(ev.type)}`}>{ev.name}</button>
                                      ))}
                                    </div>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* ── List View ──────────────────────────────────── */}
                    {calendarView === 'list' && (
                      <div className="p-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="border-b border-slate-100">
                                {['Date','Event','Type','Class','Subject','Teacher','Audience','Status','Actions'].map(h => (
                                  <th key={h} className="text-left text-[9px] font-extrabold text-slate-400 uppercase tracking-wider pb-2 pr-3 whitespace-nowrap">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {filteredCalendarEvents.sort((a,b) => a.date.localeCompare(b.date)).map(ev => (
                                <tr key={ev.id} className="hover:bg-slate-50/70 transition-colors">
                                  <td className="py-2.5 pr-3 text-slate-600 font-mono text-[10px] whitespace-nowrap">{ev.date}</td>
                                  <td className="py-2.5 pr-3 font-bold text-slate-800 max-w-[140px] truncate">{ev.name}</td>
                                  <td className="py-2.5 pr-3">
                                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border ${getEventColor(ev.type)}`}>{ev.type}</span>
                                  </td>
                                  <td className="py-2.5 pr-3 text-slate-500">{ev.class || '—'}</td>
                                  <td className="py-2.5 pr-3 text-slate-500">{ev.subject || '—'}</td>
                                  <td className="py-2.5 pr-3 text-slate-500">{ev.teacher || '—'}</td>
                                  <td className="py-2.5 pr-3 text-slate-500">{ev.audience}</td>
                                  <td className="py-2.5 pr-3">
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${ev.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{ev.status}</span>
                                  </td>
                                  <td className="py-2.5">
                                    <button onClick={() => setSelectedCalendarEvent(ev)} className="text-[#4F46E5] text-[9px] font-bold hover:underline">View</button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {filteredCalendarEvents.length === 0 && (
                            <div className="text-center py-10">
                              <CalendarDays className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                              <p className="text-sm font-bold text-slate-400">No academic events scheduled yet.</p>
                              <button onClick={() => setCurrentModal('createEvent')} className="mt-3 bg-[#4F46E5] text-white text-xs font-bold px-4 py-2 rounded-xl shadow">+ Create Event</button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Legend */}
                    {calendarView === 'month' && (
                      <div className="px-5 py-2.5 border-t flex flex-wrap gap-x-4 gap-y-1.5">
                        {[
                          { type: 'Holiday', dot: 'bg-red-500' }, { type: 'Exam', dot: 'bg-purple-500' }, { type: 'Test', dot: 'bg-indigo-500' },
                          { type: 'Parent Meeting', dot: 'bg-amber-500' }, { type: 'Live Class', dot: 'bg-cyan-500' },
                          { type: 'Assignment Deadline', dot: 'bg-orange-500' }, { type: 'School Event', dot: 'bg-emerald-500' },
                        ].map(l => (
                          <div key={l.type} className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${l.dot}`} />
                            <span className="text-[9px] text-slate-500 font-semibold">{l.type}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ── Right Panel ──────────────────────────────────────── */}
                  <div className="xl:col-span-4 space-y-4">

                    {/* Today's Schedule */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
                      <h3 className="text-xs font-extrabold text-slate-900 border-b border-slate-100 pb-3 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        Today&apos;s Schedule
                      </h3>
                      {todayEvents.length === 0 ? (
                        <p className="text-[11px] text-slate-400 font-medium text-center py-3">No events scheduled for today.</p>
                      ) : (
                        <div className="space-y-2.5">
                          {todayEvents.map(ev => (
                            <button key={ev.id} onClick={() => setSelectedCalendarEvent(ev)} className="w-full text-left flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${getEventDot(ev.type)}`} />
                              <div className="flex-1 min-w-0">
                                <strong className="text-[11px] font-extrabold text-slate-800 block truncate">{ev.name}</strong>
                                <span className="text-[9px] text-slate-400">{ev.startTime || 'All day'} {ev.class ? `• ${ev.class}` : ''}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
                      <h3 className="text-xs font-extrabold text-slate-900 border-b border-slate-100 pb-3 mb-3">Upcoming Events</h3>
                      {upcomingEvents.length === 0 ? (
                        <p className="text-[11px] text-slate-400 font-medium text-center py-3">No upcoming events.</p>
                      ) : (
                        <div className="space-y-2">
                          {upcomingEvents.map(ev => (
                            <button key={ev.id} onClick={() => setSelectedCalendarEvent(ev)} className="w-full text-left flex items-start gap-3 group">
                              <div className="shrink-0 text-center w-9">
                                <div className="text-[9px] font-bold text-slate-400 uppercase">{new Date(ev.date + 'T00:00:00').toLocaleString('en',{month:'short'})}</div>
                                <div className="text-sm font-extrabold text-slate-800 leading-tight">{new Date(ev.date + 'T00:00:00').getDate()}</div>
                              </div>
                              <div className={`flex-1 min-w-0 border-l-2 pl-3 ${getEventDot(ev.type).replace('bg-','border-')}`}>
                                <strong className="text-[11px] font-extrabold text-slate-800 block truncate group-hover:text-[#4F46E5] transition-colors">{ev.name}</strong>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className={`text-[8px] font-bold px-1 py-0.5 rounded border ${getEventColor(ev.type)}`}>{ev.type}</span>
                                  {ev.class && <span className="text-[9px] text-slate-400">{ev.class}</span>}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* AI Schedule Assistant */}
                    <div className="bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/20 rounded-2xl border border-indigo-100/60 shadow-sm p-5">
                      <div className="flex items-center justify-between mb-3 border-b border-indigo-50 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <Brain className="w-3.5 h-3.5 text-[#7C3AED] animate-pulse" />
                          </div>
                          <div>
                            <h3 className="text-xs font-extrabold text-slate-900">AI Schedule Assistant</h3>
                            <p className="text-[9px] text-slate-400">Detect conflicts & suggest schedules.</p>
                          </div>
                        </div>
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="space-y-2.5 text-[10px]">
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-2.5 flex gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-amber-800 block">Possible Conflict Detected</strong>
                            <span className="text-amber-700">Mr. Ramesh has Math Unit Test & Live Class on Aug 10 & 30 — check teacher availability.</span>
                          </div>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-2.5 flex gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                          <span className="text-indigo-700">Suggest spreading Unit Tests across Aug 10–20 for balanced student load.</span>
                        </div>
                      </div>
                      <button onClick={() => triggerToast('AI conflict analysis initiated. Review suggestions before applying.')} className="w-full mt-3 py-2 bg-[#4F46E5] hover:bg-indigo-600 text-white text-[10px] font-extrabold rounded-xl shadow-sm flex items-center justify-center gap-1.5">
                        <Brain className="w-3 h-3" />
                        Run AI Conflict Check
                      </button>
                    </div>

                    {/* Exam Schedule mini-table */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
                      <h3 className="text-xs font-extrabold text-slate-900 border-b border-slate-100 pb-3 mb-3 flex justify-between items-center">
                        <span>Exam Schedule</span>
                        <button onClick={() => triggerToast('Full exam schedule view coming soon.')} className="text-[9px] text-[#4F46E5] font-bold hover:underline">View all</button>
                      </h3>
                      <div className="space-y-2.5">
                        {filteredCalendarEvents.filter(ev => ev.type === 'Exam' || ev.type === 'Test').map(ev => (
                          <div key={ev.id} className="flex items-center justify-between text-[10px]">
                            <div>
                              <strong className="text-slate-800 block font-extrabold">{ev.name}</strong>
                              <span className="text-slate-400">{ev.class} • {ev.date} {ev.startTime ? `• ${ev.startTime}` : ''}</span>
                            </div>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getEventColor(ev.type)}`}>{ev.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Event Detail Drawer ───────────────────────────────── */}
                {selectedCalendarEvent && (
                  <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm flex justify-end animate-fadeIn">
                    <div className="absolute inset-0" onClick={() => setSelectedCalendarEvent(null)} />
                    <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-50 overflow-y-auto">
                      {/* Drawer Header */}
                      <div className={`p-6 border-b flex justify-between items-start ${getEventColor(selectedCalendarEvent.type).replace('border-','border-b-').split(' ')[0]} bg-opacity-30`} style={{background: 'linear-gradient(to right, #f8fafc, #f8fafc)'}}>
                        <div>
                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded border ${getEventColor(selectedCalendarEvent.type)} mb-2 inline-block`}>{selectedCalendarEvent.type}</span>
                          <h3 className="text-base font-extrabold text-slate-900 leading-snug">{selectedCalendarEvent.name}</h3>
                          <p className="text-[10px] text-slate-400 mt-1 font-semibold">{selectedCalendarEvent.date} {selectedCalendarEvent.startTime ? `• ${selectedCalendarEvent.startTime}` : ''}{selectedCalendarEvent.endTime ? ` – ${selectedCalendarEvent.endTime}` : ''}</p>
                        </div>
                        <button onClick={() => setSelectedCalendarEvent(null)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X className="w-5 h-5" /></button>
                      </div>

                      {/* Drawer Body */}
                      <div className="flex-1 p-6 space-y-4 text-xs font-semibold text-slate-600">
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: 'Organizer', value: selectedCalendarEvent.organizer },
                            { label: 'Audience', value: selectedCalendarEvent.audience },
                            { label: 'Class', value: selectedCalendarEvent.class || '—' },
                            { label: 'Section', value: selectedCalendarEvent.section || '—' },
                            { label: 'Subject', value: selectedCalendarEvent.subject || '—' },
                            { label: 'Teacher', value: selectedCalendarEvent.teacher || '—' },
                            { label: 'Location', value: selectedCalendarEvent.location || '—' },
                            { label: 'Status', value: selectedCalendarEvent.status },
                          ].map(item => (
                            <div key={item.label} className="bg-slate-50 p-2.5 rounded-xl border">
                              <span className="text-[9px] text-slate-400 uppercase font-bold block">{item.label}</span>
                              <strong className="text-slate-800 text-xs block mt-0.5">{item.value}</strong>
                            </div>
                          ))}
                        </div>

                        {selectedCalendarEvent.description && (
                          <div className="bg-slate-50 p-3 rounded-xl border">
                            <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Description</span>
                            <p className="text-[10px] text-slate-600 leading-relaxed">{selectedCalendarEvent.description}</p>
                          </div>
                        )}

                        {/* Type-specific Actions */}
                        {selectedCalendarEvent.type === 'Live Class' && (
                          <button onClick={() => triggerToast('Opening Live Classroom...')} className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow">
                            <Video className="w-4 h-4" />
                            Open Live Classroom
                          </button>
                        )}
                        {(selectedCalendarEvent.type === 'Exam' || selectedCalendarEvent.type === 'Test') && (
                          <button onClick={() => triggerToast('Opening exam details...')} className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow">
                            <FileSpreadsheet className="w-4 h-4" />
                            View Exam
                          </button>
                        )}
                        {selectedCalendarEvent.type === 'Assignment Deadline' && (
                          <button onClick={() => triggerToast('Opening assignment...')} className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow">
                            <ClipboardList className="w-4 h-4" />
                            View Assignment
                          </button>
                        )}
                      </div>

                      {/* Drawer Footer Actions */}
                      <div className="p-5 border-t bg-slate-50/50 flex gap-2 justify-between">
                        <div className="flex gap-2">
                          <button onClick={() => triggerToast('Edit event functionality coming soon.')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-[10px]">Edit</button>
                          <button onClick={() => triggerToast('Event duplicated.')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-[10px]">Duplicate</button>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setCalendarEventsList(calendarEventsList.filter(e => e.id !== selectedCalendarEvent.id)); setSelectedCalendarEvent(null); triggerToast('Event cancelled.', 'warning'); }} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-[10px]">Cancel Event</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Create Event Modal ────────────────────────────────── */}
                {currentModal === 'createEvent' && (
                  <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full max-w-lg overflow-hidden animate-zoomIn max-h-[92vh] flex flex-col">
                      <div className="p-5 border-b flex justify-between items-center bg-slate-50 shrink-0">
                        <h3 className="text-sm font-extrabold text-slate-900 font-sans">Create Academic Event</h3>
                        <button onClick={() => setCurrentModal(null)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X className="w-4 h-4" /></button>
                      </div>

                      <form onSubmit={handleCreateEvent} className="overflow-y-auto p-5 space-y-4 text-xs font-semibold text-slate-700 flex-1">

                        {/* Conflict Banner inside modal */}
                        {calendarConflictAlert && (
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                            <div>
                              <strong className="text-amber-800 text-[10px] block">Scheduling Conflict</strong>
                              <p className="text-[9px] text-amber-700 mt-0.5">{calendarConflictAlert}</p>
                            </div>
                            <button type="button" onClick={() => setCalendarConflictAlert(null)} className="ml-auto text-amber-500 text-[9px] font-bold shrink-0">Clear</button>
                          </div>
                        )}

                        <div>
                          <label className="block mb-1">Event Name *</label>
                          <input required value={newEventForm.name} onChange={e => setNewEventForm({...newEventForm, name: e.target.value})} placeholder="e.g. Mathematics Unit Test" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-400" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block mb-1">Event Type</label>
                            <select value={newEventForm.type} onChange={e => setNewEventForm({...newEventForm, type: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                              {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block mb-1">Date *</label>
                            <input required type="date" value={newEventForm.date} onChange={e => setNewEventForm({...newEventForm, date: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block mb-1">Start Time</label>
                            <input type="time" value={newEventForm.startTime} onChange={e => setNewEventForm({...newEventForm, startTime: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                          </div>
                          <div>
                            <label className="block mb-1">End Time</label>
                            <input type="time" value={newEventForm.endTime} onChange={e => setNewEventForm({...newEventForm, endTime: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                          </div>
                        </div>

                        <div>
                          <label className="block mb-1">Audience</label>
                          <select value={newEventForm.audience} onChange={e => setNewEventForm({...newEventForm, audience: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                            {['Entire School','Specific Class','Specific Section','Teachers','Students','Parents'].map(a => <option key={a} value={a}>{a}</option>)}
                          </select>
                        </div>

                        {(newEventForm.audience === 'Specific Class' || newEventForm.audience === 'Specific Section') && (
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block mb-1">Class</label>
                              <select value={newEventForm.class} onChange={e => setNewEventForm({...newEventForm, class: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                                <option value="">Select Class</option>
                                {['Class 6','Class 7','Class 8','Class 9','Class 10'].map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="block mb-1">Section</label>
                              <input value={newEventForm.section} onChange={e => setNewEventForm({...newEventForm, section: e.target.value})} placeholder="e.g. A, B" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                            </div>
                          </div>
                        )}

                        {/* Exam-specific fields */}
                        {(newEventForm.type === 'Exam' || newEventForm.type === 'Test') && (
                          <div className="grid grid-cols-2 gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                            <div>
                              <label className="block mb-1 text-purple-700">Subject</label>
                              <input value={newEventForm.subject} onChange={e => setNewEventForm({...newEventForm, subject: e.target.value})} placeholder="e.g. Mathematics" className="w-full p-2.5 bg-white border border-purple-200 rounded-xl outline-none" />
                            </div>
                            <div>
                              <label className="block mb-1 text-purple-700">Location / Room</label>
                              <input value={newEventForm.location} onChange={e => setNewEventForm({...newEventForm, location: e.target.value})} placeholder="e.g. Room 204" className="w-full p-2.5 bg-white border border-purple-200 rounded-xl outline-none" />
                            </div>
                          </div>
                        )}

                        {/* Live Class specific */}
                        {newEventForm.type === 'Live Class' && (
                          <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-100 space-y-2.5">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block mb-1 text-cyan-700">Subject</label>
                                <input value={newEventForm.subject} onChange={e => setNewEventForm({...newEventForm, subject: e.target.value})} placeholder="e.g. Mathematics" className="w-full p-2.5 bg-white border border-cyan-200 rounded-xl outline-none" />
                              </div>
                              <div>
                                <label className="block mb-1 text-cyan-700">Teacher</label>
                                <input value={newEventForm.teacher} onChange={e => setNewEventForm({...newEventForm, teacher: e.target.value})} placeholder="e.g. Mr. Ramesh" className="w-full p-2.5 bg-white border border-cyan-200 rounded-xl outline-none" />
                              </div>
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="block mb-1">Description</label>
                          <textarea value={newEventForm.description} onChange={e => setNewEventForm({...newEventForm, description: e.target.value})} rows={2} placeholder="Event details..." className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block mb-1">Location</label>
                            <input value={newEventForm.location} onChange={e => setNewEventForm({...newEventForm, location: e.target.value})} placeholder="e.g. Room 204 / Online" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                          </div>
                          <div>
                            <label className="block mb-1">Status</label>
                            <select value={newEventForm.status} onChange={e => setNewEventForm({...newEventForm, status: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                              <option value="Draft">Save as Draft</option>
                              <option value="Published">Publish</option>
                            </select>
                          </div>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={newEventForm.notifySend} onChange={e => setNewEventForm({...newEventForm, notifySend: e.target.checked})} className="rounded" />
                          <span className="text-[10px] text-slate-600">Send notification to audience after publishing</span>
                        </label>

                        <div className="pt-4 border-t flex justify-end gap-2">
                          <button type="button" onClick={() => { setCurrentModal(null); setCalendarConflictAlert(null); }} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
                          <button type="submit" onClick={() => setNewEventForm(f => ({...f, status: 'Draft'}))} className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50">Save Draft</button>
                          <button type="submit" onClick={() => setNewEventForm(f => ({...f, status: 'Published'}))} className="bg-[#4F46E5] hover:bg-[#7C3AED] text-white px-5 py-2 rounded-xl shadow-md font-bold">Publish Event</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* ── Academic Year Settings Drawer ─────────────────────── */}
                {showAcademicYearSettings && (
                  <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm flex justify-end animate-fadeIn">
                    <div className="absolute inset-0" onClick={() => setShowAcademicYearSettings(false)} />
                    <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-50 overflow-y-auto">
                      <div className="p-6 border-b bg-slate-50 flex justify-between items-center shrink-0">
                        <h3 className="text-sm font-extrabold text-slate-900">Academic Year Settings</h3>
                        <button onClick={() => setShowAcademicYearSettings(false)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X className="w-5 h-5" /></button>
                      </div>
                      <div className="p-6 flex-1 space-y-6 text-xs font-semibold text-slate-700">
                        {/* Active Academic Year */}
                        <div className="space-y-3">
                          <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider border-b pb-2">Academic Years</h4>
                          {[
                            { year: '2026–2027', start: '1 Apr 2026', end: '31 Mar 2027', status: 'Active' },
                            { year: '2025–2026', start: '1 Apr 2025', end: '31 Mar 2026', status: 'Archived' },
                          ].map(y => (
                            <div key={y.year} className="bg-slate-50 border rounded-xl p-3.5 flex justify-between items-center">
                              <div>
                                <strong className="text-slate-800 text-sm block">{y.year}</strong>
                                <span className="text-[9px] text-slate-400">{y.start} – {y.end}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${y.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>{y.status}</span>
                                <button onClick={() => triggerToast(`Editing year ${y.year}`)} className="text-[9px] text-[#4F46E5] font-bold hover:underline">Edit</button>
                              </div>
                            </div>
                          ))}
                          <button onClick={() => triggerToast('New academic year creation panel coming soon.')} className="w-full py-2 border-2 border-dashed border-slate-200 text-slate-500 text-[10px] font-bold rounded-xl hover:bg-slate-50">+ Create Academic Year</button>
                        </div>

                        {/* Terms */}
                        <div className="space-y-3">
                          <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider border-b pb-2">Terms / Semesters</h4>
                          {[
                            { term: 'Term 1', start: 'Apr 1', end: 'Sep 30', status: 'Active' },
                            { term: 'Term 2', start: 'Oct 1', end: 'Mar 31', status: 'Upcoming' },
                          ].map(t => (
                            <div key={t.term} className="bg-slate-50 border rounded-xl p-3 flex justify-between items-center">
                              <div>
                                <strong className="text-slate-800 block">{t.term}</strong>
                                <span className="text-[9px] text-slate-400">{t.start} – {t.end}</span>
                              </div>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${t.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>{t.status}</span>
                            </div>
                          ))}
                        </div>

                        {/* Holidays quick list */}
                        <div className="space-y-3">
                          <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider border-b pb-2 flex justify-between items-center">
                            <span>Holidays</span>
                            <button onClick={() => triggerToast('Holiday management panel coming soon.')} className="text-[#4F46E5] font-bold text-[9px]">Manage</button>
                          </h4>
                          {calendarEventsList.filter(e => e.type === 'Holiday').map(h => (
                            <div key={h.id} className="flex justify-between items-center text-[10px]">
                              <strong className="text-slate-700">{h.name}</strong>
                              <span className="text-slate-400 font-mono">{h.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })()}

          {activeMenu === 'learning' && activeSubMenu === 'assignments' && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Academic Homework & Assignments</h2>
                  <p className="text-slate-500 text-xs">Observe real-time homework submission stats and average grades.</p>
                </div>
                <button onClick={() => setCurrentModal('createAssignment')} className="bg-[#4F46E5] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Create Assignment
                </button>
              </div>

              {/* Stats card */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Completed Submissions', value: '82.4%', color: 'border-emerald-200' },
                  { name: 'Pending Review', value: '45 Student files', color: 'border-amber-200' },
                  { name: 'Late Submissions', value: '6%', color: 'border-red-200' },
                  { name: 'Overall Class Average', value: '74.2%', color: 'border-indigo-200' }
                ].map((st, i) => (
                  <div key={i} className={`bg-white p-4 rounded-xl border ${st.color} shadow-sm text-center`}>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{st.name}</p>
                    <h4 className="text-lg font-extrabold text-slate-900 mt-1">{st.value}</h4>
                  </div>
                ))}
              </div>

              {/* Assignment Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                      <th className="p-4">Assignment Topic</th>
                      <th className="p-4">Subject</th>
                      <th className="p-4">Class</th>
                      <th className="p-4">Teacher</th>
                      <th className="p-4">Created Date</th>
                      <th className="p-4">Due Date</th>
                      <th className="p-4">Submission Rate</th>
                      <th className="p-4">Average Grade</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {assignmentsList.map(asm => (
                      <tr key={asm.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-slate-900">{asm.title}</td>
                        <td className="p-4">{asm.subject}</td>
                        <td className="p-4 font-semibold">{asm.class}</td>
                        <td className="p-4 text-slate-500">{asm.teacher}</td>
                        <td className="p-4 font-mono">{asm.createdDate}</td>
                        <td className="p-4 font-mono text-red-600 font-semibold">{asm.dueDate}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{asm.submissionRate}%</span>
                            <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-[#4F46E5] h-full" style={{ width: `${asm.submissionRate}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-bold text-slate-700">{asm.avgScore > 0 ? `${asm.avgScore}%` : 'N/A'}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            asm.status === 'PUBLISHED' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-500'
                          }`}>{asm.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {activeMenu === 'learning' && activeSubMenu === 'quizzes' && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Assessment & Quiz Control</h2>
                  <p className="text-slate-500 text-xs">Generate quizzes, edit question libraries, and publish results.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setActiveMenu('aiIntelligence'); setActiveSubMenu('quizGenerator'); }} className="bg-[#7C3AED] hover:bg-[#4F46E5] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" /> AI Generate Quiz
                  </button>
                  <button onClick={() => triggerToast('Direct manual Quiz creator opened.')} className="bg-[#4F46E5] text-white text-xs font-bold px-4 py-2 rounded-xl">Create Quiz</button>
                </div>
              </div>

              {/* Quiz List Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                      <th className="p-4">Quiz Title</th>
                      <th className="p-4">Subject</th>
                      <th className="p-4">Class</th>
                      <th className="p-4">Questions Count</th>
                      <th className="p-4">Attempts Submitted</th>
                      <th className="p-4">Average Score</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {quizzesList.map(qz => (
                      <tr key={qz.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-slate-900">{qz.title}</td>
                        <td className="p-4">{qz.subject}</td>
                        <td className="p-4 font-semibold">{qz.class}</td>
                        <td className="p-4 font-mono font-bold text-slate-700">{qz.questionsCount} MCQs</td>
                        <td className="p-4 font-semibold">{qz.attempts} Students</td>
                        <td className="p-4 font-bold text-[#4F46E5]">{qz.avgScore > 0 ? `${qz.avgScore}%` : 'N/A'}</td>
                        <td className="p-4">
                          <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">{qz.status}</span>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => triggerToast(`Exporting metrics for ${qz.title}`)} className="text-[#4F46E5] font-bold hover:underline">Export Results</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ======================================================= */}
          {/* LIVE CLASSROOM SECTION                                  */}
          {/* ======================================================= */}
          {activeMenu === 'liveClass' && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Virtual Classrooms</h2>
                  <p className="text-slate-500 text-xs">Schedule or inspect Zoom/Meet sessions running natively on the school dashboard.</p>
                </div>
                <button onClick={() => setCurrentModal('scheduleClass')} className="bg-[#4F46E5] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Schedule Live Session
                </button>
              </div>

              {/* Active Session simulation layout */}
              {activeLiveClassSession ? (
                <div className="bg-slate-900 text-white rounded-3xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
                  
                  {/* Left Column: Video Arena */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="bg-slate-950 aspect-video rounded-2xl relative overflow-hidden flex flex-col justify-center items-center border border-slate-800">
                      
                      {/* Video placeholders */}
                      <div className="absolute inset-0 bg-slate-950 flex justify-center items-center">
                        {liveSessionRole === 'teacher' ? (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900">
                            {isWhiteboardActive ? (
                              <div className="w-full h-full bg-white text-slate-950 p-6 flex flex-col justify-between">
                                <div className="flex justify-between border-b pb-2">
                                  <span className="text-xs font-bold text-slate-800">Interactive Canvas Whiteboard</span>
                                  <button onClick={() => setIsWhiteboardActive(false)} className="text-red-500 text-xs font-bold">Close Board</button>
                                </div>
                                <div className="flex-1 flex justify-center items-center text-slate-300 italic border border-dashed rounded-xl my-3">
                                  [ Canvas drawing whiteboard simulated ]
                                </div>
                                <div className="flex gap-2">
                                  <button onClick={() => triggerToast('Pen tool active')} className="bg-slate-100 hover:bg-slate-200 px-3 py-1 text-xs font-semibold rounded">Pen</button>
                                  <button onClick={() => triggerToast('Eraser tool active')} className="bg-slate-100 hover:bg-slate-200 px-3 py-1 text-xs font-semibold rounded">Eraser</button>
                                  <button onClick={() => setClassWhiteboardPaths([])} className="bg-red-50 text-red-600 px-3 py-1 text-xs font-semibold rounded">Clear Board</button>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center space-y-3">
                                <div className="w-16 h-16 rounded-full bg-indigo-600/30 flex items-center justify-center text-white mx-auto animate-pulse">
                                  <Video className="w-8 h-8" />
                                </div>
                                <p className="text-sm font-bold">Conducting Live Session: {activeLiveClassSession.topic}</p>
                                <p className="text-xs text-slate-400">Class: {activeLiveClassSession.class} • Presenter: {activeLiveClassSession.teacher}</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-sm font-bold">Connecting to virtual feed...</p>
                          </div>
                        )}
                      </div>

                      {/* Participant Count HUD */}
                      <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-xl text-[10px] font-bold tracking-wider">
                        Live Room • 32 Active Students
                      </div>
                    </div>

                    {/* Bottom Controls Bar */}
                    <div className="flex justify-center items-center gap-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                      <button onClick={() => triggerToast('Microphone toggled')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-200">
                        <Mic className="w-4 h-4" />
                      </button>
                      <button onClick={() => triggerToast('Video stream toggled')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-200">
                        <Video className="w-4 h-4" />
                      </button>
                      <button onClick={() => triggerToast('Sharing screen to classroom')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-200">
                        <ScreenShare className="w-4 h-4" />
                      </button>
                      <button onClick={() => setIsWhiteboardActive(true)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-bold rounded-xl">
                        Whiteboard
                      </button>
                      <button onClick={() => triggerToast('Recording class started')} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-xs font-bold rounded-xl">
                        Record
                      </button>
                      <button
                        onClick={() => {
                          const summaryData = {
                            topic: activeLiveClassSession.topic,
                            summary: 'Today\'s lesson covered key mechanics of the topic. Main visual formulas were displayed, followed by student practice questions.',
                            concepts: ['CHC Visual Alignment', 'Variable Equations', 'Graph Plotting'],
                            homework: 'Complete practice worksheet 4.2 in algebra portal.',
                            revisionNeeded: ['Zoya Khan', 'Aarav Sharma']
                          };
                          setSelectedPostClassSummary(summaryData);
                          setActiveLiveClassSession(null);
                          triggerToast('Session concluded. AI post-class analysis summary compiled.');
                        }}
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-xs font-bold rounded-xl"
                      >
                        End Class
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Chat & Room parameters */}
                  <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between h-[360px] lg:h-[450px]">
                    <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                      <div className="border-b border-slate-800 pb-2">
                        <h4 className="text-xs font-bold text-slate-200">In-Call Room Chat</h4>
                      </div>
                      <div className="space-y-3 text-[11px]">
                        {liveClassChat.map((msg, i) => (
                          <div key={i} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                            <div className="flex justify-between font-bold text-[#7C3AED] mb-1">
                              <span>{msg.sender}</span>
                              <span className="text-slate-500 font-mono">{msg.time}</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">{msg.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!liveClassChatInput) return;
                        setLiveClassChat([...liveClassChat, { sender: 'Teacher (Sunita)', text: liveClassChatInput, time: '15:03' }]);
                        setLiveClassChatInput('');
                      }}
                      className="mt-3 flex gap-2"
                    >
                      <input
                        type="text"
                        placeholder="Type room message..."
                        value={liveClassChatInput}
                        onChange={(e) => setLiveClassChatInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-800 text-xs rounded-xl px-3 py-2 outline-none text-white focus:border-indigo-500"
                      />
                      <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-xs font-bold px-3 rounded-xl">Send</button>
                    </form>
                  </div>

                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* AI Post Class Summary results display if available */}
                  {selectedPostClassSummary && (
                    <div className="bg-[#F8FAFC] border border-[#7C3AED]/30 rounded-3xl p-6 space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <Brain className="w-5 h-5 text-[#7C3AED]" />
                        <h3 className="text-sm font-extrabold text-slate-800">AI Live Class Analysis Summary</h3>
                        <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">AI Output compiled</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                        <div className="space-y-3">
                          <div>
                            <span className="text-slate-400 block font-bold">Topic Analyzed:</span>
                            <span className="text-sm font-extrabold text-slate-800">{selectedPostClassSummary.topic}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-bold">AI Class Summary:</span>
                            <p className="text-slate-600 leading-relaxed mt-1">{selectedPostClassSummary.summary}</p>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-bold">Key Concepts Explored:</span>
                            <div className="flex gap-2 mt-1">
                              {selectedPostClassSummary.concepts.map((cp: string, i: number) => <span key={i} className="bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-700">{cp}</span>)}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <span className="text-slate-400 block font-bold">Recommended Homework:</span>
                            <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded font-bold mt-1 inline-block">{selectedPostClassSummary.homework}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-bold">Students Requiring Review (AI Indicators):</span>
                            <div className="flex gap-2 mt-1">
                              {selectedPostClassSummary.revisionNeeded.map((st: string, i: number) => (
                                <span key={i} className="bg-red-50 border border-red-200 text-red-700 px-2 py-1 rounded font-semibold flex items-center gap-1.5">
                                  <AlertTriangle className="w-3.5 h-3.5" /> {st}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="pt-2">
                            <button
                              onClick={() => {
                                setAiQuizInput({
                                  class: 'Grade 7', subject: 'Mathematics', chapter: 'Algebra', topic: selectedPostClassSummary.topic,
                                  difficulty: 'Adaptive', questionCount: 10, questionType: 'Multiple Choice'
                                });
                                setActiveMenu('aiIntelligence');
                                setActiveSubMenu('quizGenerator');
                                handleAiQuizGenerate();
                              }}
                              className="bg-[#7C3AED] text-white font-bold px-4 py-2 rounded-xl flex items-center gap-2"
                            >
                              <Sparkles className="w-4 h-4" /> AI Generate Revision Quiz for Students
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Scheduled Live Classrooms Cards list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {liveClasses.map(session => (
                      <div key={session.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <span className="bg-indigo-50 text-[#4F46E5] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{session.subject}</span>
                            <h3 className="text-base font-extrabold text-slate-900 mt-1">{session.topic}</h3>
                          </div>
                          <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <Video className="w-3.5 h-3.5" /> Scheduled
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed">{session.description}</p>

                        <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                          <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> <span>{session.date}</span></div>
                          <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> <span>{session.startTime} ({session.duration} min)</span></div>
                          <div className="col-span-2">Presenter: <strong className="text-slate-800">{session.teacher}</strong></div>
                        </div>

                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => {
                              setActiveLiveClassSession(session);
                              setLiveSessionRole('teacher');
                            }}
                            className="bg-[#4F46E5] hover:bg-[#7C3AED] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
                          >
                            Start Session
                          </button>
                          <button
                            onClick={() => {
                              setActiveLiveClassSession(session);
                              setLiveSessionRole('student');
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl"
                          >
                            Simulate Student View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          )}

          {/* ======================================================= */}
          {/* ATTENDANCE PANEL                                        */}
          {/* ======================================================= */}
          {activeMenu === 'attendance' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Attendance Registry</h2>
                  <p className="text-slate-500 text-xs">Verify daily presence register and submit bulk updates.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => triggerToast('Attendance register successfully saved for Grade 7A.')} className="bg-[#4F46E5] text-white text-xs font-bold px-4 py-2 rounded-xl">Save Daily Register</button>
                </div>
              </div>

              {/* Selector filters */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-3 items-center">
                  <div>
                    <label className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider mb-1">Target Date</label>
                    <input
                      type="date"
                      value={attendanceDate}
                      onChange={(e) => setAttendanceDate(e.target.value)}
                      className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider mb-1">Target Grade</label>
                    <select value={attendanceClass} onChange={(e) => setAttendanceClass(e.target.value)} className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold">
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider mb-1">Target Section</label>
                    <select value={attendanceSection} onChange={(e) => setAttendanceSection(e.target.value)} className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold">
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => {
                    const updated = { ...attendanceList };
                    studentsList.forEach(s => updated[s.id] = 'Present');
                    setAttendanceList(updated);
                    triggerToast('Marked all students as Present.');
                  }} className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">Mark All Present</button>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                      <th className="p-4">Student Profile</th>
                      <th className="p-4">Admission number</th>
                      <th className="p-4">Average attendance rate</th>
                      <th className="p-4">Daily Status</th>
                      <th className="p-4 text-right">Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {studentsList.filter(s => s.class === attendanceClass).map(st => {
                      const currentStatus = attendanceList[st.id] || 'Present';
                      return (
                        <tr key={st.id} className="hover:bg-slate-50/50">
                          <td className="p-4 font-bold text-slate-900">{st.name}</td>
                          <td className="p-4 font-mono">{st.admissionNo}</td>
                          <td className="p-4 font-semibold text-slate-700">{st.attendance}%</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              currentStatus === 'Present' ? 'bg-emerald-50 text-emerald-700' :
                              currentStatus === 'Absent' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                            }`}>{currentStatus}</span>
                          </td>
                          <td className="p-4 text-right flex justify-end gap-1.5">
                            {['Present', 'Absent', 'Late', 'Leave'].map(stVal => (
                              <button
                                key={stVal}
                                onClick={() => {
                                  setAttendanceList({ ...attendanceList, [st.id]: stVal as any });
                                  triggerToast(`Marked ${st.name} as ${stVal}.`);
                                }}
                                className={`px-2 py-1 border text-[10px] font-bold rounded-lg transition-all ${
                                  currentStatus === stVal ? 'bg-indigo-600 text-white border-transparent' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                {stVal}
                              </button>
                            ))}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ======================================================= */}
          {/* AI INTELLIGENCE TABS                                    */}
          {/* ======================================================= */}
          {activeMenu === 'aiIntelligence' && activeSubMenu === 'insights' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">AI Intelligence & Insights</h2>
                <p className="text-slate-500 text-xs">Verify AI recommendations and early cognitive alert metrics.</p>
              </div>

              {/* Alert list cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiInsights.map((insight, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#7C3AED] shrink-0">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-slate-700 leading-relaxed">{insight.text}</p>
                      <div className="flex gap-2">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          insight.status === 'attention' ? 'bg-red-50 text-red-700' :
                          insight.status === 'warning' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                        }`}>{insight.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900">Platform Cognitive Performance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl space-y-1">
                    <span className="text-slate-400 block">Identified Subject Impediment:</span>
                    <strong className="text-sm text-slate-800">Algebra Formula Parsing</strong>
                    <p className="text-[10px] text-slate-400 mt-1">Cross-analyzed with 24 WJ-IV scoring indicators.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl space-y-1">
                    <span className="text-slate-400 block">Average Growth Delta:</span>
                    <strong className="text-sm text-emerald-600">+14% Improvement Index</strong>
                    <p className="text-[10px] text-slate-400 mt-1">Reflects active student engagement scores.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl space-y-1">
                    <span className="text-slate-400 block">AI Intervention Efficacy:</span>
                    <strong className="text-sm text-indigo-600">88.5% Accuracy Threshold</strong>
                    <p className="text-[10px] text-slate-400 mt-1">Assisted recommendations approved by teachers.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeMenu === 'aiIntelligence' && activeSubMenu === 'quizGenerator' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Parameters Setup */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#7C3AED]" />
                  <h3 className="text-sm font-extrabold text-slate-900">AI Quiz Generator Setup</h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Target Class</label>
                    <select value={aiQuizInput.class} onChange={(e) => setAiQuizInput({ ...aiQuizInput, class: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold">
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Subject</label>
                    <select value={aiQuizInput.subject} onChange={(e) => setAiQuizInput({ ...aiQuizInput, subject: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold">
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Chapter</label>
                      <input type="text" value={aiQuizInput.chapter} onChange={(e) => setAiQuizInput({ ...aiQuizInput, chapter: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Topic</label>
                      <input type="text" value={aiQuizInput.topic} onChange={(e) => setAiQuizInput({ ...aiQuizInput, topic: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Difficulty</label>
                      <select value={aiQuizInput.difficulty} onChange={(e) => setAiQuizInput({ ...aiQuizInput, difficulty: e.target.value })} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold">
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Adaptive">Adaptive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Question Count</label>
                      <input type="number" value={aiQuizInput.questionCount} onChange={(e) => setAiQuizInput({ ...aiQuizInput, questionCount: parseInt(e.target.value) })} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-semibold" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Question Type</label>
                      <select value={aiQuizInput.questionType} onChange={(e) => setAiQuizInput({ ...aiQuizInput, questionType: e.target.value })} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold">
                        <option value="Multiple Choice">MCQ</option>
                        <option value="True / False">True/False</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={handleAiQuizGenerate} className="w-full py-3 bg-[#7C3AED] hover:bg-[#4F46E5] text-white font-bold rounded-xl shadow flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" /> Generate Quiz Questions
                  </button>
                </div>
              </div>

              {/* Output Preview */}
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <h3 className="text-sm font-extrabold text-slate-900">Generated Questions Preview</h3>
                  {generatedAiQuiz && (
                    <button onClick={handleApproveGeneratedQuiz} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl">Approve & Publish</button>
                  )}
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                  {generatedAiQuiz ? (
                    generatedAiQuiz.map((item, i) => (
                      <div key={i} className="border border-slate-100 p-4 rounded-xl space-y-2 text-xs">
                        <div className="font-bold text-slate-800">Q{i + 1}. {item.q}</div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {item.options.map((opt: string, idx: number) => (
                            <span key={idx} className={`p-2 rounded-lg border text-center ${item.correct === opt ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>{opt}</span>
                          ))}
                        </div>
                        <p className="text-[10px] text-slate-400 italic mt-2">Explanation: {item.exp}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-slate-400 text-xs italic">
                      Configure parameters and click generate to trigger AI modeling.
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {activeMenu === 'aiIntelligence' && activeSubMenu === 'contentAssistant' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5"><Brain className="w-5 h-5 text-[#7C3AED]" /> AI Content Assistant</h3>
                </div>
                
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Content Category</label>
                    <select value={aiContentInput.type} onChange={(e) => setAiContentInput({ ...aiContentInput, type: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold">
                      <option value="Lesson Plan">Lesson Plan</option>
                      <option value="Study Material">Study Material</option>
                      <option value="Practice Questions">Practice Questions</option>
                      <option value="Revision Notes">Revision Notes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Target Topic</label>
                    <input type="text" value={aiContentInput.topic} onChange={(e) => setAiContentInput({ ...aiContentInput, topic: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Grade Level</label>
                      <select value={aiContentInput.grade} onChange={(e) => setAiContentInput({ ...aiContentInput, grade: e.target.value })} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold">
                        <option value="Grade 6">Grade 6</option>
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Context Notes</label>
                    <textarea value={aiContentInput.notes} onChange={(e) => setAiContentInput({ ...aiContentInput, notes: e.target.value })} rows={3} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-semibold" />
                  </div>
                  <button onClick={handleAiContentGenerate} className="w-full py-3 bg-[#4F46E5] text-white font-bold rounded-xl shadow">Generate Curriculum Draft</button>
                </div>
              </div>

              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <h3 className="text-sm font-extrabold text-slate-900 font-sans">Synthesized Lesson & Study Draft</h3>
                  {generatedAiContent && (
                    <button onClick={handleApproveContent} className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl">Approve Content Draft</button>
                  )}
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-mono text-xs leading-relaxed max-h-[50vh] overflow-y-auto">
                  {generatedAiContent ? (
                    <pre className="whitespace-pre-wrap">{generatedAiContent}</pre>
                  ) : (
                    <div className="text-center py-12 text-slate-400 italic">
                      Generate a draft to display results here. Human review is recommended.
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {activeMenu === 'aiIntelligence' && activeSubMenu === 'recommendations' && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Student Learning Profiles</h2>
                  <p className="text-slate-500 text-xs">Observe automated AI student cognitive recommendations.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {studentsList.map(st => (
                  <div key={st.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 hover:shadow-md transition-all">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">{st.name}</h4>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{st.class}A</span>
                      </div>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Score: {st.performance}%</span>
                    </div>

                    <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 text-[11px] text-indigo-900 leading-relaxed font-semibold">
                      💡 <strong>AI Rec:</strong> {
                        st.performance < 65 ? 'Additional Algebra practice recommended. Consider assigning medium-difficulty Algebra questions.' : 'Assigned advanced problem solving topics.'
                      }
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button onClick={() => triggerToast(`Assigned Algebra revision worksheets to ${st.name}`)} className="bg-[#4F46E5] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm">Assign Practice</button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ======================================================= */}
          {/* ADVANCED ANALYTICS SECTION                              */}
          {/* ======================================================= */}
          {activeMenu === 'analytics' && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Academic Analytics Center</h2>
                  <p className="text-slate-500 text-xs">Select data models to view student, class, and engagement indexes.</p>
                </div>
              </div>

              {/* Selector Tabs */}
              <div className="flex gap-3 bg-slate-100 p-1 rounded-xl w-max">
                {['student', 'class', 'engagement'].map(sub => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubMenu(sub)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                      activeSubMenu === sub ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {sub} Analytics
                  </button>
                ))}
              </div>

              {/* Render Selected Analytics */}
              {activeSubMenu === 'student' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 animate-fadeIn">
                  <h3 className="text-sm font-extrabold text-slate-800">Grade Index Distribution</h3>
                  <div className="h-64 bg-slate-50 border border-dashed rounded-xl flex items-center justify-center text-slate-400 text-xs italic">
                    [ Student Performance Distribution Scatter Plot ]
                  </div>
                </div>
              )}

              {activeSubMenu === 'class' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 animate-fadeIn">
                  <h3 className="text-sm font-extrabold text-slate-800">Class Performance Benchmark</h3>
                  <div className="h-64 bg-slate-50 border border-dashed rounded-xl flex items-center justify-center text-slate-400 text-xs italic">
                    [ Class-wise comparative bar charts ]
                  </div>
                </div>
              )}

              {activeSubMenu === 'engagement' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 animate-fadeIn">
                  <h3 className="text-sm font-extrabold text-slate-800">Active Learning Engagement</h3>
                  <div className="grid grid-cols-3 gap-6 text-center text-xs">
                    <div className="bg-slate-50 p-4 rounded-xl"><span className="text-slate-400 block font-bold">Daily Active:</span> <strong className="text-lg text-slate-850">2,416 Students</strong></div>
                    <div className="bg-slate-50 p-4 rounded-xl"><span className="text-slate-400 block font-bold">Weekly Active:</span> <strong className="text-lg text-slate-850">2,680 Students</strong></div>
                    <div className="bg-slate-50 p-4 rounded-xl"><span className="text-slate-400 block font-bold">Monthly Active:</span> <strong className="text-lg text-slate-850">2,810 Students</strong></div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================= */}
          {/* ANNOUNCEMENTS SECTION                                   */}
          {/* ======================================================= */}
          {activeMenu === 'communication' && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">School Announcements</h2>
                  <p className="text-slate-500 text-xs">Broadcast notices to the entire school, teachers, students, or parents.</p>
                </div>
                <button onClick={() => setCurrentModal('sendAnnouncement')} className="bg-[#4F46E5] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Send Announcement
                </button>
              </div>

              <div className="space-y-4">
                {announcements.map(ann => (
                  <div key={ann.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-extrabold text-slate-900">{ann.title}</h3>
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">{ann.audience}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{ann.message}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-50 text-[10px] text-slate-400">
                      <span>Scheduled: <strong>{ann.scheduleDate}</strong></span>
                      {ann.attachments && <span className="text-[#4F46E5] font-semibold">{ann.attachments}</span>}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ======================================================= */}
          {/* COMPLIANCE & REPORTS                                    */}
          {/* ======================================================= */}
          {activeMenu === 'reports' && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Reports & Transcripts</h2>
                  <p className="text-slate-500 text-xs">Download school performance, attendance, and AI metrics reports in CSV/Excel/PDF.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  'Student Performance Report', 'Daily Attendance Sheet', 'Teacher Activity Index',
                  'AI Usage & Diagnostics', 'Virtual Classroom Recordings', 'Cognitive Profiling Outcomes'
                ].map((rep, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">{rep}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Generated automatically on daily schedule.</p>
                    </div>
                    <div className="mt-4 flex gap-2 justify-end">
                      <button onClick={() => triggerToast(`Exporting ${rep} as PDF...`)} className="bg-red-50 text-red-600 text-[10px] font-bold px-3 py-1.5 rounded-lg">PDF</button>
                      <button onClick={() => triggerToast(`Exporting ${rep} as CSV...`)} className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-3 py-1.5 rounded-lg">CSV</button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ======================================================= */}
          {/* SCHOOL SETTINGS PANEL                                   */}
          {/* ======================================================= */}
          {activeMenu === 'settings' && (
            <form onSubmit={handleSaveSettings} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              
              <div className="border-b pb-4">
                <h2 className="text-xl font-extrabold text-slate-900">School Profile & Parameters</h2>
                <p className="text-slate-500 text-xs">Adjust configuration for your institutional tenant isolate.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block mb-1">School Name</label>
                  <input type="text" value={settingsForm.schoolName} onChange={(e) => setSettingsForm({ ...settingsForm, schoolName: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block mb-1">Campus Address</label>
                  <input type="text" value={settingsForm.address} onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block mb-1">Academic Board Affiliation</label>
                  <input type="text" value={settingsForm.board} onChange={(e) => setSettingsForm({ ...settingsForm, board: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block mb-1">Active Academic Year</label>
                  <input type="text" value={settingsForm.academicYear} onChange={(e) => setSettingsForm({ ...settingsForm, academicYear: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">AI & Classroom Parameters</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={settingsForm.recordLiveClasses} onChange={(e) => setSettingsForm({ ...settingsForm, recordLiveClasses: e.target.checked })} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 accent-indigo-600" />
                    <span>Auto-record Virtual Live Classroom sessions</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={settingsForm.notificationEmails} onChange={(e) => setSettingsForm({ ...settingsForm, notificationEmails: e.target.checked })} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 accent-indigo-600" />
                    <span>Send daily summary notification emails to parents</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end">
                <button type="submit" className="bg-[#4F46E5] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md">Save Settings</button>
              </div>

            </form>
          )}

        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL SYSTEM                                              */}
      {/* ========================================================= */}
      {currentModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 border border-slate-100 max-h-[85vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">
                {currentModal === 'createStudent' && 'Register New Student Profile'}
                {currentModal === 'createTeacher' && 'Onboard New Teacher Account'}
                {currentModal === 'createAssignment' && 'Publish New Assignment'}
                {currentModal === 'scheduleClass' && 'Schedule Virtual Live Session'}
                {currentModal === 'sendAnnouncement' && 'Publish Broadcast Notice'}
              </h3>
              <button onClick={() => setCurrentModal(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Forms */}
            {currentModal === 'createStudent' && (
              <form onSubmit={handleAddStudentSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
                <div className="border-b pb-2"><h4 className="text-slate-800 font-bold uppercase tracking-wider text-[10px]">Personal Information</h4></div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1">Full Name *</label>
                    <input type="text" required value={newStudentForm.fullName} onChange={(e) => setNewStudentForm({ ...newStudentForm, fullName: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block mb-1">Gender</label>
                    <select value={newStudentForm.gender} onChange={(e) => setNewStudentForm({ ...newStudentForm, gender: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="border-b pb-2 pt-2"><h4 className="text-slate-800 font-bold uppercase tracking-wider text-[10px]">Academic parameters</h4></div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1">Admission Number *</label>
                    <input type="text" required value={newStudentForm.admissionNumber} onChange={(e) => setNewStudentForm({ ...newStudentForm, admissionNumber: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block mb-1">Class Level</label>
                    <select value={newStudentForm.class} onChange={(e) => setNewStudentForm({ ...newStudentForm, class: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                    </select>
                  </div>
                </div>

                <div className="border-b pb-2 pt-2"><h4 className="text-slate-800 font-bold uppercase tracking-wider text-[10px]">Parent Verification</h4></div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1">Parent Full Name *</label>
                    <input type="text" required value={newStudentForm.parentName} onChange={(e) => setNewStudentForm({ ...newStudentForm, parentName: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block mb-1">Parent Contact Email</label>
                    <input type="email" value={newStudentForm.parentEmail} onChange={(e) => setNewStudentForm({ ...newStudentForm, parentEmail: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button type="button" onClick={() => setCurrentModal(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
                  <button type="submit" className="bg-[#4F46E5] text-white px-5 py-2 rounded-xl shadow-md">Register Student</button>
                </div>
              </form>
            )}

            {currentModal === 'createTeacher' && (
              <form onSubmit={handleAddTeacherSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1">Teacher Full Name *</label>
                    <input type="text" required value={newTeacherForm.fullName} onChange={(e) => setNewTeacherForm({ ...newTeacherForm, fullName: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block mb-1">Employee ID *</label>
                    <input type="text" required value={newTeacherForm.employeeId} onChange={(e) => setNewTeacherForm({ ...newTeacherForm, employeeId: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1">Corporate Email</label>
                    <input type="email" value={newTeacherForm.email} onChange={(e) => setNewTeacherForm({ ...newTeacherForm, email: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block mb-1">Assigned Class Room</label>
                    <input type="text" value={newTeacherForm.classes} onChange={(e) => setNewTeacherForm({ ...newTeacherForm, classes: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button type="button" onClick={() => setCurrentModal(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
                  <button type="submit" className="bg-[#4F46E5] text-white px-5 py-2 rounded-xl shadow-md">Create Account</button>
                </div>
              </form>
            )}

            {currentModal === 'createAssignment' && (
              <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block mb-1">Assignment Title *</label>
                  <input type="text" required value={newAssignmentForm.title} onChange={(e) => setNewAssignmentForm({ ...newAssignmentForm, title: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1">Target Class</label>
                    <input type="text" value={newAssignmentForm.class} onChange={(e) => setNewAssignmentForm({ ...newAssignmentForm, class: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block mb-1">Due Date</label>
                    <input type="date" value={newAssignmentForm.dueDate} onChange={(e) => setNewAssignmentForm({ ...newAssignmentForm, dueDate: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button type="button" onClick={() => setCurrentModal(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
                  <button type="submit" className="bg-[#4F46E5] text-white px-5 py-2 rounded-xl shadow-md font-sans">Publish Assignment</button>
                </div>
              </form>
            )}

            {currentModal === 'scheduleClass' && (
              <form onSubmit={handleScheduleLiveClass} className="space-y-4 text-xs font-semibold text-[#0F172A]">
                <div>
                  <label className="block mb-1">Class Topic / Chapter Topic *</label>
                  <input type="text" required value={newLiveClassForm.topic} onChange={(e) => setNewLiveClassForm({ ...newLiveClassForm, topic: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block mb-1">Target Class</label>
                    <select value={newLiveClassForm.class} onChange={(e) => setNewLiveClassForm({ ...newLiveClassForm, class: e.target.value })} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg">
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 12">Grade 12</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1">Section</label>
                    <select value={newLiveClassForm.section} onChange={(e) => setNewLiveClassForm({ ...newLiveClassForm, section: e.target.value })} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg">
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1">Duration (Min)</label>
                    <input type="number" value={newLiveClassForm.duration} onChange={(e) => setNewLiveClassForm({ ...newLiveClassForm, duration: e.target.value })} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block mb-1">Brief Description</label>
                  <textarea value={newLiveClassForm.description} onChange={(e) => setNewLiveClassForm({ ...newLiveClassForm, description: e.target.value })} rows={2} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                </div>

                <div className="pt-4 border-t flex justify-end gap-2">
                  <button type="button" onClick={() => setCurrentModal(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
                  <button type="submit" className="bg-[#4F46E5] text-white px-5 py-2 rounded-xl shadow-md">Schedule Session</button>
                </div>
              </form>
            )}

            {currentModal === 'sendAnnouncement' && (
              <form onSubmit={handleSendAnnouncement} className="space-y-4 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block mb-1">Notice Title *</label>
                  <input type="text" required value={newAnnouncementForm.title} onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, title: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
                <div>
                  <label className="block mb-1">Audience Broadcast</label>
                  <select value={newAnnouncementForm.audience} onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, audience: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <option value="Entire School">Entire School</option>
                    <option value="Teachers only">Teachers only</option>
                    <option value="Parents only">Parents only</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Broadcast Message *</label>
                  <textarea required value={newAnnouncementForm.message} onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, message: e.target.value })} rows={4} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button type="button" onClick={() => setCurrentModal(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
                  <button type="submit" className="bg-[#4F46E5] text-white px-5 py-2 rounded-xl shadow-md">Broadcast Notice</button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );

  // Helper function to handle quick menu jumps
  function setCurrentSubmenuAndTab(menu: string, submenu: string) {
    setActiveMenu(menu);
    setActiveSubMenu(submenu);
  }
}
