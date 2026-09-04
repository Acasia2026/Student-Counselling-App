'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Target, Clock, Zap, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function PersonalizedDailyPlanPage() {
  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      title: 'Mathematics: Rational Numbers Properties & Exercises',
      subject: 'Mathematics',
      durationMins: 15,
      xp: 30,
      priority: 'HIGH',
      completed: false,
      href: '/student/learn/curriculum?subject=Mathematics',
      color: 'border-l-blue-500 bg-blue-50/40 text-blue-700'
    },
    {
      id: 'task-2',
      title: 'Science: Crop Production Soil Tilling Diagnostic',
      subject: 'Science',
      durationMins: 20,
      xp: 40,
      priority: 'MEDIUM',
      completed: false,
      href: '/student/learn/curriculum?subject=Science',
      color: 'border-l-emerald-500 bg-emerald-50/40 text-emerald-700'
    },
    {
      id: 'task-3',
      title: 'English: Noun Clause Practice & Grammar Quiz',
      subject: 'English',
      durationMins: 10,
      xp: 25,
      priority: 'HIGH',
      completed: false,
      href: '/student/practice/quiz',
      color: 'border-l-orange-500 bg-orange-50/40 text-orange-700'
    },
    {
      id: 'task-4',
      title: 'Socratic AI Tutor Check: Factoring Quadratic Expressions',
      subject: 'Mathematics (Remedial)',
      durationMins: 15,
      xp: 35,
      priority: 'CRITICAL',
      completed: false,
      href: '/student/ai-tutor/whiteboard',
      color: 'border-l-rose-500 bg-rose-50/40 text-rose-700'
    }
  ]);

  const toggleComplete = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalMins = tasks.reduce((acc, t) => acc + t.durationMins, 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
            AI Adaptive Learning Queue
          </span>
          <h2 className="font-heading font-bold text-2xl text-slate-900 mt-1">Personalized Daily Study Plan</h2>
          <p className="text-xs text-slate-500">Dynamically generated & balanced across core subjects based on priority metrics.</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-center">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Target Duration</span>
            <div className="text-xl font-extrabold text-[#4648d4] mt-0.5">{totalMins} Mins</div>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-center">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Completed</span>
            <div className="text-xl font-extrabold text-emerald-700 mt-0.5">{completedCount} / {tasks.length}</div>
          </div>
        </div>
      </div>

      {/* Task Queue List */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#4648d4]" /> Today's Task Queue
          </h3>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI Balanced
          </span>
        </div>

        <div className="space-y-3">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border-l-4 border border-slate-200/80 ${task.color} transition flex items-center justify-between gap-4 shadow-2xs ${task.completed ? 'opacity-60 bg-slate-50' : ''}`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center transition ${task.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-300'}`}
                >
                  {task.completed && <CheckCircle2 className="w-4 h-4" />}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${task.priority === 'CRITICAL' ? 'text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md' : 'text-slate-600 bg-white px-2 py-0.5 rounded-md border'}`}>
                      {task.priority} Priority
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {task.durationMins} Mins
                    </span>
                  </div>
                  <h4 className={`font-heading font-semibold text-sm text-slate-900 mt-1 ${task.completed ? 'line-through text-slate-400' : ''}`}>
                    {task.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  +{task.xp} XP
                </span>
                <Link
                  href={task.href}
                  className="px-4 py-2 rounded-xl bg-white text-indigo-700 text-xs font-bold border border-indigo-200 shadow-2xs hover:bg-indigo-50 transition flex items-center gap-1"
                >
                  Start Task <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
