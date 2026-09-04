'use client';

import React from 'react';
import { Tv2, Video, Hand } from 'lucide-react';

export default function LiveClassroomPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100">
              Live Session Active
            </span>
            <h2 className="font-heading font-bold text-2xl text-slate-900 mt-1">Live Classroom - Grade 8 Mathematics</h2>
            <p className="text-xs text-slate-500">Instructor: Vikram Seth • Topic: Algebraic Identities & Expansion</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5">
            <Hand className="w-4 h-4" /> Raise Hand
          </button>
        </div>

        <div className="rounded-3xl bg-slate-900 text-white p-8 space-y-4 min-h-[350px] flex flex-col justify-between shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
              <Video className="w-4 h-4 animate-pulse" /> LIVE STREAM
            </span>
            <span className="text-xs text-slate-400">32 Students Attending</span>
          </div>

          <div className="text-center py-12 space-y-2">
            <Tv2 className="w-16 h-16 text-indigo-400 mx-auto" />
            <h3 className="font-heading text-lg font-bold">Interactive Live Video Feed</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">Streaming 1080p live classroom feed with real-time AI transcription & doubt resolution.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
