'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function WeaknessMatrixPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
        <h2 className="font-heading font-bold text-2xl text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-rose-500" /> Weakness Detection Matrix
        </h2>
        <p className="text-xs text-slate-500">Automated diagnostic detection of concept gaps and low accuracy topics.</p>

        <div className="space-y-3">
          {[
            { subject: 'Mathematics', topic: 'Quadratic Equations & Polynomials', accuracy: '52%', status: 'Needs Immediate Practice', severity: 'HIGH' },
            { subject: 'Science', topic: 'Chemical Reactions & Stoichiometry', accuracy: '61%', status: 'Review Recommended', severity: 'MEDIUM' },
            { subject: 'Hindi', topic: 'Vyakaran - Samas & Sandhi', accuracy: '58%', status: 'Needs Practice', severity: 'MEDIUM' }
          ].map((w, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200 flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700">{w.subject}</span>
                <h4 className="font-heading font-bold text-sm text-slate-900">{w.topic}</h4>
                <p className="text-xs text-slate-500">Historical Accuracy: {w.accuracy} • Severity: {w.severity}</p>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-white px-3 py-1 rounded-full border border-rose-200">{w.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
