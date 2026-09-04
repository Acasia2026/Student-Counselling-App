'use client';

import React from 'react';
import { Award, Zap, Flame, Bot, CheckCircle } from 'lucide-react';

export default function AchievementsPage() {
  const badges = [
    { name: 'Quick Learner', category: 'Speed', rarity: 'Common', icon: Zap, unlocked: true },
    { name: '7-Day Streak', category: 'Consistency', rarity: 'Uncommon', icon: Flame, unlocked: true },
    { name: 'Math Master', category: 'Academics', rarity: 'Rare', icon: Award, unlocked: true },
    { name: 'AI Tutor Explorer', category: 'Engagement', rarity: 'Common', icon: Bot, unlocked: true },
    { name: 'Perfect Diagnostic', category: 'Assessment', rarity: 'Epic', icon: CheckCircle, unlocked: false }
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-6 shadow-sm">
        <h2 className="font-heading font-bold text-2xl text-slate-900 flex items-center gap-2">
          <Award className="w-6 h-6 text-[#4648d4]" /> Gamification & Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {badges.map((b, idx) => {
            const IconComp = b.icon;
            return (
              <div key={idx} className={`p-5 rounded-2xl border flex items-center gap-4 ${b.unlocked ? 'bg-indigo-50/50 border-indigo-200' : 'bg-slate-50 border-slate-200 opacity-50'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${b.unlocked ? 'bg-[#4648d4] text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">{b.name}</h4>
                  <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-100">{b.category} • {b.rarity}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
