'use client';

import React from 'react';
import { Bot, Sparkles, FileText } from 'lucide-react';

export default function AIClassNotesPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
        <h2 className="font-heading font-bold text-2xl text-slate-900 flex items-center gap-2">
          <Bot className="w-6 h-6 text-[#4648d4]" /> AI Class Notes Assistant
        </h2>
        <p className="text-xs text-slate-500">Automated summaries & key takeaways generated during live lectures.</p>

        <div className="space-y-3">
          {[
            { title: 'Mathematics: Linear Equations Lecture Summary', date: 'Yesterday', summary: 'Covers transposition rules, variables on both sides, and cross-multiplication shortcuts.' },
            { title: 'Science: Crop Management & Soil Fertility', date: '3 Days Ago', summary: 'Highlights NPK fertilizers, organic manure benefits, and drip irrigation advantages.' }
          ].map((n, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-sm text-slate-900">{n.title}</h4>
                <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-100">{n.date}</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">{n.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
