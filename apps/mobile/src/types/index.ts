export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'counselor' | 'admin';
  tenantId?: string;
  institutionName?: string;
  grade?: string;
  avatarUrl?: string;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  type: 'quiz' | 'tutor' | 'assignment' | 'achievement';
  score?: number;
  durationMinutes?: number;
}

export interface DashboardData {
  totalLearningTime: number;
  quizzesCompleted: number;
  currentStreak: number;
  masteryScore: number;
  recentActivities: Activity[];
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  totalChapters: number;
  completedChapters: number;
  color: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  totalQuestions: number;
  questions: QuizQuestion[];
}

export interface WeaknessTopic {
  id: string;
  subject: string;
  topic: string;
  accuracy: number;
  recommendedAction: string;
  severity: 'low' | 'medium' | 'high';
}
