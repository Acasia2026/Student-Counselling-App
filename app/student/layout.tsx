import type { Metadata } from 'next';
import StudentLayoutClient from './StudentLayoutClient';

export const metadata: Metadata = {
  title: 'Empathetic Mentor AI | Student Portal',
  description: 'K-12 AI-Powered Adaptive Learning Platform & Personal Companion for Grades 1-10.',
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudentLayoutClient>{children}</StudentLayoutClient>;
}
