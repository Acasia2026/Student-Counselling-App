'use client';

import React from 'react';
import { Bot, Sparkles, Sliders } from 'lucide-react';

export default function InteractiveWhiteboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
            Interactive Step-by-Step Solver
          </span>
          <h2 className="font-heading font-bold text-2xl text-slate-900 mt-1">Interactive AI Whiteboard</h2>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5">
          <Sliders className="w-4 h-4" /> Canvas Tools
        </button>
      </div>

      <div className="rounded-3xl bg-slate-900 border border-slate-800 text-white p-8 space-y-6 min-h-[450px] shadow-xl flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="font-heading font-bold text-sm text-indigo-300">Whiteboard Canvas — Algebra Tiles & Solved Steps</span>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
            Socratic AI Active
          </span>
        </div>

        <div className="space-y-4 my-auto">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 max-w-xl space-y-2">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Step 1: Expand binomial expressions</span>
            <p className="font-mono text-sm text-amber-300">(x + 3)(x + 5) = x² + 5x + 3x + 15</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 max-w-xl space-y-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Step 2: Combine like terms</span>
            <p className="font-mono text-sm text-emerald-300 font-bold">= x² + 8x + 15</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">Use canvas tools to draw or write equations interactively.</span>
          <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition flex items-center gap-2">
            <Bot className="w-4 h-4" /> Ask Tutor for Step Explanation
          </button>
        </div>
      </div>
    </div>
  );
}
