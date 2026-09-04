'use client';

import React from 'react';
import { Gamepad2, Trophy, Sparkles } from 'lucide-react';

export default function EducationalGamesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-2xl text-slate-900 flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-[#4648d4]" /> Educational Games Hub
          </h2>
          <p className="text-xs text-slate-500 mt-1">Gamified K-12 micro-games for rapid recall and math fluency.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Math Sprint Speed Challenge', category: 'Arithmetic & Equations', xp: '+50 XP', color: 'from-blue-600 to-indigo-600' },
          { name: 'Chemical Element Matcher', category: 'Science & Chemistry', xp: '+40 XP', color: 'from-emerald-600 to-teal-600' },
          { name: 'Grammar & Vocabulary Quest', category: 'English Language Arts', xp: '+35 XP', color: 'from-orange-500 to-amber-600' }
        ].map((game, idx) => (
          <div key={idx} className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition">
            <div className={`h-28 p-5 bg-gradient-to-br ${game.color} text-white flex flex-col justify-between`}>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md self-start border border-white/20">
                {game.category}
              </span>
              <h3 className="font-heading font-bold text-base">{game.name}</h3>
            </div>
            <div className="p-5 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">{game.xp}</span>
              <button className="px-4 py-2 rounded-xl bg-[#4648d4] text-white text-xs font-bold shadow-sm">Play Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
