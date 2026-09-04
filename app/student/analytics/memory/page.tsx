'use client';

import React from 'react';
import { Brain, Bot } from 'lucide-react';

export default function AIMemoryLogPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
        <h2 className="font-heading font-bold text-2xl text-slate-900 flex items-center gap-2">
          <Brain className="w-6 h-6 text-[#4648d4]" /> AI Learning Memory Log
        </h2>
        <p className="text-xs text-slate-500">Long-term memory context retained by your Socratic AI Tutor across past study sessions.</p>

        <div className="space-y-3">
          {[
            { date: '2026-08-25', memory: 'Student understands linear equations but requires additional practice with rational coefficients.' },
            { date: '2026-08-22', memory: 'Responds best to Socratic visual algebra tile representations rather than abstract text proofs.' },
            { date: '2026-08-18', memory: 'Completed Crop Production chapter with 95% accuracy on initial diagnostic.' }
          ].map((m, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100 space-y-1">
              <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-100">{m.date}</span>
              <p className="text-xs text-slate-700 font-medium">{m.memory}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
