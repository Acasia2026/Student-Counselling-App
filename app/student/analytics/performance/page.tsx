'use client';

import React from 'react';
import { BarChart3, Award, Zap } from 'lucide-react';

export default function PerformanceDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="font-heading font-bold text-2xl text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[#4648d4]" /> Performance Analytics Dashboard
            </h2>
            <p className="text-xs text-slate-500 mt-1">Cognitive profiling & academic accuracy analytics.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: 'Overall Accuracy', value: '84.5%', label: 'Across all subjects' },
            { title: 'Reasoning Ability', value: '82.0%', label: 'CHC Fluid Reasoning' },
            { title: 'Processing Speed', value: '84.0%', label: 'Speed Index' },
            { title: 'Working Memory', value: '79.0%', label: 'Retention Score' }
          ].map((stat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{stat.title}</span>
              <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
              <p className="text-[10px] text-indigo-600 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
