'use client';

import React, { useState } from 'react';
import { Sparkles, Bot } from 'lucide-react';

export default function AIQuizGeneratorPage() {
  const [topic, setTopic] = useState('Algebraic Expressions');
  const [difficulty, setDifficulty] = useState('Adaptive');
  const [generated, setGenerated] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#4648d4] flex items-center justify-center border border-indigo-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-900">AI Quiz Generator</h2>
            <p className="text-xs text-slate-500">Generate customized diagnostic quizzes for any topic or grade level.</p>
          </div>
        </div>

        <div className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-700 mb-1">Target Subject / Topic</label>
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#4648d4]"
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Difficulty Mode</label>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#4648d4]"
            >
              <option value="Adaptive">Adaptive (AI Dynamic Scaling)</option>
              <option value="Easy">Easy (Foundational Concepts)</option>
              <option value="Medium">Medium (Standard Grade Level)</option>
              <option value="Hard">Hard (Challenge Questions)</option>
            </select>
          </div>

          <button
            onClick={() => setGenerated(true)}
            className="w-full py-3 bg-[#4648d4] hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Generate AI Practice Quiz
          </button>
        </div>

        {generated && (
          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-xs text-indigo-900 space-y-2">
            <span className="font-bold flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-[#4648d4]" /> AI Quiz Ready!
            </span>
            <p>Generated 5 tailored questions for <span className="font-bold">{topic}</span> ({difficulty} Mode).</p>
          </div>
        )}
      </div>
    </div>
  );
}
