'use client';

import React, { useState, useEffect } from 'react';
import { User, Save } from 'lucide-react';

export default function ProfileSettingsPage() {
  const [student, setStudent] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@stxavier.edu.in',
    grade: 8,
    section: 'A',
    schoolName: 'St. Xavier International Academy',
    board: 'CBSE',
    preferredLanguage: 'English',
    learningStyle: 'Visual',
    aiPersona: 'Socratic Mentor',
    dailyGoalMinutes: 30
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('active_user_session');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed.name || parsed.email) {
            setStudent(prev => ({
              ...prev,
              name: parsed.name || prev.name,
              email: parsed.email || prev.email,
              schoolName: parsed.schoolName || prev.schoolName
            }));
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('active_user_session', JSON.stringify(student));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#4648d4] flex items-center justify-center border border-indigo-100">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-900">Student Profile Settings</h2>
            <p className="text-xs text-slate-500">Manage your personal information, grade level, and learning preferences.</p>
          </div>
        </div>

        <div className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={student.name}
              onChange={e => setStudent({ ...student, name: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#4648d4]"
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={student.email}
              onChange={e => setStudent({ ...student, email: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#4648d4]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 mb-1">Grade Level</label>
              <input
                type="number"
                value={student.grade}
                onChange={e => setStudent({ ...student, grade: parseInt(e.target.value) || 8 })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#4648d4]"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1">Board</label>
              <input
                type="text"
                value={student.board}
                onChange={e => setStudent({ ...student, board: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#4648d4]"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 mb-1">School Name</label>
            <input
              type="text"
              value={student.schoolName}
              onChange={e => setStudent({ ...student, schoolName: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#4648d4]"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 bg-[#4648d4] hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> {saved ? 'Settings Saved! ✓' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
