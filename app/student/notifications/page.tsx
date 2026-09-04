'use client';

import React from 'react';
import { Bell, Sparkles } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
        <h2 className="font-heading font-bold text-2xl text-slate-900 flex items-center gap-2">
          <Bell className="w-6 h-6 text-[#4648d4]" /> Notifications & Alerts
        </h2>

        <div className="space-y-3">
          {[
            { title: 'Live Maths Class Starting', time: '10 Mins Ago', text: 'Live session on Algebraic Identities is about to start.' },
            { title: 'Weakness Practice Recommended', time: '2 Hours Ago', text: 'AI Tutor detected lower accuracy on Factoring Trinomials.' },
            { title: 'New Badge Unlocked!', time: '1 Day Ago', text: 'Earned the 7-Day Streak Consistency Badge (+50 XP).' }
          ].map((n, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex justify-between items-center">
                <h4 className="font-heading font-bold text-xs text-slate-900">{n.title}</h4>
                <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">{n.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
