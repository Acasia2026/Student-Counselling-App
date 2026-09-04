'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, Bot, Zap, Sparkles } from 'lucide-react';

export default function WeaknessAlertsPage() {
  const alerts = [
    {
      id: 'alt-1',
      subject: 'Mathematics',
      topic: 'Algebraic Expressions & Factoring Trinomials',
      accuracy: 52,
      recentAttempts: 3,
      severity: 'CRITICAL',
      recommendation: 'Socratic Step-by-Step AI Whiteboard Review Recommended.',
      href: '/student/practice/quiz?topic=Algebraic+Expressions',
      color: 'border-rose-200 bg-gradient-to-br from-rose-50 via-white to-orange-50/40 text-rose-900',
      badgeColor: 'bg-rose-600 text-white'
    },
    {
      id: 'alt-2',
      subject: 'Science',
      topic: 'Pathogens & Vaccine Mechanism Diagnostics',
      accuracy: 61,
      recentAttempts: 4,
      severity: 'HIGH',
      recommendation: '1080p Concept Explainer Video & Flashcard Review Recommended.',
      href: '/student/learn/workspace?concept=Pathogens+%26+Vaccine+Mechanisms',
      color: 'border-amber-200 bg-gradient-to-br from-amber-50 via-white to-yellow-50/40 text-amber-900',
      badgeColor: 'bg-amber-500 text-white'
    },
    {
      id: 'alt-3',
      subject: 'Hindi',
      topic: 'Vyakaran - Samas & Sandhi Rules',
      accuracy: 58,
      recentAttempts: 2,
      severity: 'MEDIUM',
      recommendation: 'Adaptive Practice Quiz & Instant Concept Hints Recommended.',
      href: '/student/practice/hints',
      color: 'border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50/40 text-orange-900',
      badgeColor: 'bg-orange-500 text-white'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-2 shadow-sm">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-rose-500" />
          <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">AI Automated Warning System</span>
        </div>
        <h2 className="font-heading font-bold text-2xl text-slate-900">Weakness Alerts & Remedial Hub</h2>
        <p className="text-xs text-slate-500">Automated diagnostic alerts identifying concepts with accuracy below 65% requiring immediate attention.</p>
      </div>

      {/* Alerts Cards Grid */}
      <div className="space-y-4">
        {alerts.map(alt => (
          <div key={alt.id} className={`rounded-3xl border p-6 space-y-4 shadow-sm ${alt.color}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-2xs ${alt.badgeColor}`}>
                  {alt.severity} WARNING
                </span>
                <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-md border border-slate-200/80">
                  {alt.subject}
                </span>
              </div>
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80">
                {alt.accuracy}% Historical Accuracy ({alt.recentAttempts} Quizzes)
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-heading font-bold text-xl text-slate-900">{alt.topic}</h3>
              <p className="text-xs text-slate-600 leading-relaxed flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-indigo-600 shrink-0" /> <span className="font-semibold text-indigo-900">{alt.recommendation}</span>
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Diagnostic System ID: {alt.id}</span>
              <Link
                href={alt.href}
                className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-200 transition flex items-center gap-1.5"
              >
                Start Remedial Practice <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
