'use client';

import React from 'react';
import { Tv2, Clock, CheckCircle2 } from 'lucide-react';

export default function AssignmentTrackerPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
        <h2 className="font-heading font-bold text-2xl text-slate-900 flex items-center gap-2">
          <Tv2 className="w-6 h-6 text-[#4648d4]" /> Assignment Tracker
        </h2>
        <p className="text-xs text-slate-500">School assignments submitted by your teachers.</p>

        <div className="space-y-3">
          {[
            { title: 'Mathematics: Chapter 2 Exercise 2.3 Homework', due: 'Tomorrow, 5:00 PM', status: 'Pending', color: 'border-l-amber-500 bg-amber-50/40' },
            { title: 'Science: Microorganisms Lab Report Submission', due: '2 Days Left', status: 'Pending', color: 'border-l-indigo-500 bg-indigo-50/40' },
            { title: 'English: Honeydew Chapter 1 Essay', due: 'Completed', status: 'Submitted', color: 'border-l-emerald-500 bg-emerald-50/40' }
          ].map((a, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border-l-4 border border-slate-200/80 ${a.color} flex items-center justify-between shadow-2xs`}>
              <div>
                <h4 className="font-heading font-semibold text-sm text-slate-900">{a.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">Due: {a.due}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${a.status === 'Submitted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
