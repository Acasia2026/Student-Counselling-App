import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Superadmin Control Center | AI Student Counseling & Cognitive Profiling Platform',
  description: 'Executive Superadmin Operations, Tenant Management, CHC Cognitive Domain Studio, CBT Guardrail Controls, and FERPA Audit System.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 min-h-screen antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
