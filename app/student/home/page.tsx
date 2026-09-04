'use client';

import React from 'react';
import Link from 'next/link';
import { Target, AlertTriangle, ArrowRight, Sparkles, BookOpen, Zap, Bot, Clock } from 'lucide-react';

export default function StudentHomePage() {
  return (
    <div className="space-y-6">
      {/* Welcome & XP Tracker Banner */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-[#4648d4] text-xs font-bold uppercase tracking-wider border border-indigo-200/60">
            EduQuest Active Quest Tracker
          </span>
          <h3 className="font-heading text-2xl font-bold text-slate-900">Welcome Back, Aarav! 👋</h3>
          <p className="text-xs text-slate-500">Daily Study Goal: 30 Mins • 80 XP needed for Level 9</p>
        </div>
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="56" cy="56" r="45" stroke="#eceef0" strokeWidth="10" fill="transparent" />
            <circle
              cx="56"
              cy="56"
              r="45"
              stroke="#4648d4"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={282.7}
              strokeDashoffset={282.7 - (282.7 * (420 / 500))}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-heading text-xl font-bold text-slate-900">420</span>
            <span className="text-[10px] text-slate-400 font-semibold">/ 500 XP</span>
          </div>
        </div>
      </div>

      {/* Personalized Daily Plan Overview Card */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#4648d4]" /> Personalized Daily Study Plan
          </h3>
          <Link
            href="/student/home/plan"
            className="text-xs font-bold text-[#4648d4] bg-indigo-50 hover:bg-indigo-100 px-3.5 py-1.5 rounded-full border border-indigo-100 transition flex items-center gap-1"
          >
            View Full Queue (4 Tasks) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {[
            { title: 'Maths: Rational Numbers Properties & Exercises', subject: 'Mathematics (15 min)', xp: '+30 XP', href: '/student/learn/curriculum?subject=Mathematics', color: 'border-l-blue-500 bg-blue-50/30' },
            { title: 'Science: Crop Production Soil Tilling Diagnostic', subject: 'Science (20 min)', xp: '+40 XP', href: '/student/learn/curriculum?subject=Science', color: 'border-l-emerald-500 bg-emerald-50/30' },
            { title: 'English: Grammar & Noun Clause Quiz', subject: 'English (10 min)', xp: '+25 XP', href: '/student/practice/quiz', color: 'border-l-orange-500 bg-orange-50/30' }
          ].map((t, i) => (
            <div key={i} className={`p-4 rounded-2xl border-l-4 border border-slate-200/80 ${t.color} flex items-center justify-between shadow-2xs`}>
              <div>
                <h4 className="font-heading font-semibold text-sm text-slate-900">{t.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{t.subject}</p>
              </div>
              <Link href={t.href} className="px-3.5 py-1.5 rounded-xl bg-white text-indigo-700 text-xs font-bold border border-indigo-200 shadow-2xs hover:bg-indigo-50 transition">
                {t.xp} • Start
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Weakness Alert Card */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-50 via-white to-orange-50/40 border border-rose-200/80 p-6 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">AI Weakness Alert Warning</span>
          </div>
          <Link
            href="/student/home/alerts"
            className="text-xs font-bold text-rose-700 bg-rose-100/80 hover:bg-rose-200 px-3.5 py-1.5 rounded-full border border-rose-200 transition flex items-center gap-1"
          >
            All Weakness Alerts (3 Active) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <h3 className="font-heading font-bold text-xl text-slate-900">Algebraic Expressions & Factoring Review Needed</h3>
        <p className="text-xs text-slate-600">52% Accuracy on past 3 quizzes. Socratic practice recommended.</p>
        <Link
          href="/student/practice/quiz?topic=Algebraic+Expressions"
          className="inline-block px-5 py-2.5 rounded-2xl bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-200 hover:bg-rose-700 transition"
        >
          Start Immediate Practice
        </Link>
      </div>
    </div>
  );
}
