'use client';

import React from 'react';
import { HelpCircle, Mail, Globe } from 'lucide-react';

export default function HelpSupportPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#4648d4] flex items-center justify-center border border-indigo-100">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-900">Help & Support Center</h2>
            <p className="text-xs text-slate-500">Find answers to common questions or reach out to platform administrators.</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[#4648d4]" /> Contact Student Support
            </h4>
            <p className="text-slate-600 font-medium">Email: support@stxavier.edu.in • Available Mon-Fri 8:00 AM - 6:00 PM IST</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-600" /> Platform Documentation
            </h4>
            <p className="text-slate-600 font-medium">Access full student portal guides, Socratic AI user manuals, and FERPA privacy compliance resources.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
