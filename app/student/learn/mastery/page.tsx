'use client';

import React from 'react';

export default function TopicMasteryTrackerPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
        <h2 className="font-heading font-bold text-2xl text-slate-900">Topic Mastery Tracker</h2>
        <p className="text-xs text-slate-500">Real-time mastery scores aggregated from your historical quiz submissions and practice sessions.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex justify-between items-center shadow-2xs">
            <div>
              <h4 className="font-bold text-sm text-slate-900">Rational Numbers</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Grade 8 Mathematics</p>
            </div>
            <span className="font-bold text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-200">90% Mastered</span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 flex justify-between items-center shadow-2xs">
            <div>
              <h4 className="font-bold text-sm text-slate-900">Standard Identities</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Grade 8 Mathematics</p>
            </div>
            <span className="font-bold text-amber-800 bg-white px-3 py-1 rounded-full border border-amber-200">72% In Progress</span>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 flex justify-between items-center shadow-2xs">
            <div>
              <h4 className="font-bold text-sm text-slate-900">Factoring Quadratics</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Grade 8 Mathematics</p>
            </div>
            <span className="font-bold text-rose-700 bg-white px-3 py-1 rounded-full border border-rose-200">52% Needs Practice</span>
          </div>
        </div>
      </div>
    </div>
  );
}
