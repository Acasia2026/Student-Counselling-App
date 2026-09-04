'use client';

import React, { useState } from 'react';
import { HelpCircle, Lightbulb, Bot } from 'lucide-react';

export default function ConceptHintsPage() {
  const [query, setQuery] = useState('Factoring trinomials with leading coefficients');
  const [hint, setHint] = useState<string | null>(null);

  const getHint = () => {
    setHint('Look for two numbers whose product equals (a × c) and whose sum equals b. Split the middle term accordingly.');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-900">Instant Concept Hints Workspace</h2>
            <p className="text-xs text-slate-500">Get step-by-step guidance without spoiling full solutions.</p>
          </div>
        </div>

        <div className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-700 mb-1">What concept or problem are you stuck on?</label>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#4648d4]"
            />
          </div>

          <button
            onClick={getHint}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <Lightbulb className="w-4 h-4" /> Request Socratic Hint
          </button>
        </div>

        {hint && (
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
            <span className="font-bold flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-amber-600" /> Socratic Tutor Guidance:
            </span>
            <p className="leading-relaxed">{hint}</p>
          </div>
        )}
      </div>
    </div>
  );
}
