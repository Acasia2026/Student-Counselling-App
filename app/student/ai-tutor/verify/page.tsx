'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Send } from 'lucide-react';

export default function UnderstandingCheckPage() {
  const [explanation, setExplanation] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const checkUnderstanding = () => {
    if (!explanation) return;
    setFeedback('Excellent explanation! You accurately identified that isolating the variable requires applying inverse operations on both sides.');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-900">Understanding Check (Feynman Technique)</h2>
            <p className="text-xs text-slate-500">Explain a concept in your own words to verify deep conceptual mastery.</p>
          </div>
        </div>

        <div className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-700 mb-1">Explain: How do you solve 3x + 5 = 20?</label>
            <textarea
              rows={4}
              value={explanation}
              onChange={e => setExplanation(e.target.value)}
              placeholder="First subtract 5 from both sides to get 3x = 15, then divide by 3..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#4648d4]"
            />
          </div>

          <button
            onClick={checkUnderstanding}
            className="w-full py-3 bg-[#4648d4] hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Evaluate My Explanation
          </button>
        </div>

        {feedback && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
            <span className="font-bold flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-emerald-600" /> AI Feedback:
            </span>
            <p className="leading-relaxed">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}
