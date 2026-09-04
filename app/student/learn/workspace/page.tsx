'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, Bot } from 'lucide-react';

export default function MultiFormatViewerPage() {
  const searchParams = useSearchParams();
  const conceptParam = searchParams.get('concept') || 'Solving Linear Equations with Variable Terms';
  const [activeFormatTab, setActiveFormatTab] = useState<'Interactive' | 'Video' | 'Text' | 'Quiz'>('Interactive');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
            Multi-Format Learning Viewer
          </span>
          <h2 className="font-heading font-bold text-2xl text-slate-900 mt-1">{conceptParam}</h2>
          <p className="text-xs text-slate-500 mt-0.5">Grade 8 Mathematics • Step-by-Step Multi-Modal Learning Workspace</p>
        </div>

        <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-xl shrink-0">
          {(['Interactive', 'Video', 'Text', 'Quiz'] as const).map(fmt => (
            <button
              key={fmt}
              onClick={() => setActiveFormatTab(fmt)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${activeFormatTab === fmt ? 'bg-[#4648d4] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl border border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-indigo-300">
              {activeFormatTab === 'Interactive' && 'Interactive Socratic Step-by-Step Solver Canvas'}
              {activeFormatTab === 'Video' && '1080p Concept Explainer Video'}
              {activeFormatTab === 'Text' && 'Complete Textbook Notes, Formulas & Examples'}
              {activeFormatTab === 'Quiz' && 'Adaptive Practice Quiz'}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-heading font-bold text-xl text-white">{conceptParam}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Multi-modal content viewer pre-loaded with step-by-step interactive algebra tiles, video tutorials, and solved examples aligned with CBSE learning outcomes.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
          <div className="flex justify-between text-xs text-slate-300 font-medium">
            <span>Concept Mastery Goal</span>
            <span className="font-bold text-emerald-400">85% Target Mastery</span>
          </div>
          <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: '85%' }} />
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400">Estimated Duration: 15 Mins</span>
            <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5">
              <Bot className="w-4 h-4" /> Ask Socratic AI Tutor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
