'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator, Atom, BookOpen, Languages, Globe, ArrowRight } from 'lucide-react';

export default function SubjectLibraryPage() {
  const subjects = [
    { name: 'Mathematics', chapters: 12, mastery: 78, icon: Calculator, gradient: 'from-blue-600 to-indigo-600' },
    { name: 'Science', chapters: 10, mastery: 86, icon: Atom, gradient: 'from-emerald-600 to-teal-600' },
    { name: 'English', chapters: 8, mastery: 92, icon: BookOpen, gradient: 'from-orange-500 to-amber-600' },
    { name: 'Hindi', chapters: 9, mastery: 74, icon: Languages, gradient: 'from-amber-600 to-yellow-600' },
    { name: 'Social Science', chapters: 11, mastery: 81, icon: Globe, gradient: 'from-purple-600 to-pink-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-2xl text-slate-900">Subject Library (Core K-12 Curriculum)</h2>
          <p className="text-xs text-slate-500 mt-1">Select a subject to view its full structural tree, concepts, and mastery status.</p>
        </div>
        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Grade 8-A • CBSE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {subjects.map((sub, i) => {
          const IconComp = sub.icon;
          return (
            <Link
              key={i}
              href={`/student/learn/curriculum?subject=${encodeURIComponent(sub.name)}`}
              className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 cursor-pointer group"
            >
              <div className={`h-24 p-4 bg-gradient-to-br ${sub.gradient} flex items-center justify-between`}>
                <IconComp className="w-8 h-8 text-white group-hover:scale-110 transition" />
                <span className="text-xs font-bold bg-white/90 px-2.5 py-1 rounded-full text-slate-900 shadow-2xs">{sub.mastery}%</span>
              </div>
              <div className="p-4 space-y-2">
                <h4 className="font-heading font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition flex items-center justify-between">
                  {sub.name} <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition" />
                </h4>
                <p className="text-xs text-slate-500">{sub.chapters} Structural Chapters</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#4648d4] h-full rounded-full" style={{ width: `${sub.mastery}%` }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
