'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Check } from 'lucide-react';

export default function PersonaSwitcherPage() {
  const [selectedPersona, setSelectedPersona] = useState('Socratic Mentor');

  const personas = [
    { title: 'Socratic Mentor', desc: 'Asks guiding questions to help you derive answers independently.', tag: 'Recommended' },
    { title: 'Friendly Learning Buddy', desc: 'Encouraging, informal tone with high enthusiasm and positive feedback.', tag: 'Popular' },
    { title: 'Academic Specialist', desc: 'Strict, textbook-standard technical explanations and rigorous terminology.', tag: 'Advanced' }
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#4648d4] flex items-center justify-center border border-indigo-100">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-900">AI Tutor Persona Switcher</h2>
            <p className="text-xs text-slate-500">Customize the communication style and teaching methodology of your AI tutor.</p>
          </div>
        </div>

        <div className="space-y-3">
          {personas.map((p, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPersona(p.title)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${selectedPersona === p.title ? 'bg-indigo-50/80 border-[#4648d4] shadow-xs' : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100'}`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-sm text-slate-900">{p.title}</h4>
                  <span className="text-[10px] font-bold text-indigo-700 bg-white px-2.5 py-0.5 rounded-full border border-indigo-200">
                    {p.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{p.desc}</p>
              </div>

              {selectedPersona === p.title && (
                <div className="w-6 h-6 rounded-full bg-[#4648d4] text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
