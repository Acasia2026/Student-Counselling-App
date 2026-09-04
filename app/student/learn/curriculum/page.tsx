'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  Play,
  CheckCircle2,
  Clock,
  Lock,
  BookOpen
} from 'lucide-react';

export default function CurriculumHierarchyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const subjectParam = searchParams.get('subject') || 'Mathematics';
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>(subjectParam);
  const [isSubjectLoading, setIsSubjectLoading] = useState<boolean>(false);
  const [aggregatedSubjectData, setAggregatedSubjectData] = useState<any>(null);
  const [expandedChapters, setExpandedChapters] = useState<{ [key: string]: boolean }>({ 'chap-1': true, 'chap-2': true });
  const [expandedTopics, setExpandedTopics] = useState<{ [key: string]: boolean }>({ 'top-1-1': true, 'top-2-1': true });

  useEffect(() => {
    fetchSubjectCurriculum(selectedSubjectKey);
  }, [selectedSubjectKey]);

  const fetchSubjectCurriculum = async (subjectName: string) => {
    setIsSubjectLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/student/curriculum?subjectKey=${encodeURIComponent(subjectName)}&grade=${encodeURIComponent('Grade 8-A')}&studentId=aarav.sharma@stxavier.edu.in`
      );
      const res = await response.json();
      if (res.success && res.data) {
        setAggregatedSubjectData(res.data);
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      // Demo Resilience Fallback Data
      const mockChaptersMap: { [key: string]: any[] } = {
        Mathematics: [
          {
            id: 'chap-1',
            number: 1,
            title: 'Rational Numbers',
            topics: [
              {
                id: 'top-1-1',
                title: 'Properties of Rational Numbers',
                mastery: 90,
                completed: true,
                concepts: [
                  { id: 'cnc-1-1-1', title: 'Closure & Commutative Properties', description: 'Fundamental laws of addition and multiplication for rational numbers.', prerequisites: [], completed: true, mastery: 95, estimatedMins: 10 },
                  { id: 'cnc-1-1-2', title: 'Associative & Distributive Laws', description: 'Grouping terms and distributing multiplication over addition.', prerequisites: ['cnc-1-1-1'], completed: true, mastery: 88, estimatedMins: 12 },
                  { id: 'cnc-1-1-3', title: 'Additive & Multiplicative Inverse', description: 'Identifying identity elements (0 & 1) and reciprocal inverses.', prerequisites: ['cnc-1-1-2'], completed: true, mastery: 85, estimatedMins: 15 }
                ]
              },
              {
                id: 'top-1-2',
                title: 'Representation on Number Line',
                mastery: 85,
                completed: true,
                concepts: [
                  { id: 'top-1-2-1', title: 'Plotting Positive & Negative Rationals', description: 'Subdividing unit intervals on a horizontal number axis.', prerequisites: ['cnc-1-1-3'], completed: true, mastery: 90, estimatedMins: 10 },
                  { id: 'top-1-2-2', title: 'Density Property & Mean Method', description: 'Finding infinitely many rational numbers between any two given numbers.', prerequisites: ['top-1-2-1'], completed: true, mastery: 80, estimatedMins: 15 }
                ]
              }
            ]
          },
          {
            id: 'chap-2',
            number: 2,
            title: 'Linear Equations in One Variable',
            topics: [
              {
                id: 'top-2-1',
                title: 'Solving Linear Equations',
                mastery: 75,
                completed: true,
                concepts: [
                  { id: 'cnc-2-1-1', title: 'Equations with Variable on One Side', description: 'Isolating variables using basic arithmetic balancing operations.', prerequisites: ['top-1-2-2'], completed: true, mastery: 85, estimatedMins: 12 },
                  { id: 'cnc-2-1-2', title: 'Equations with Variable Terms on Both Sides', description: 'Collecting like terms across equal sign via transposition.', prerequisites: ['cnc-2-1-1'], completed: false, mastery: 65, estimatedMins: 15 },
                  { id: 'cnc-2-1-3', title: 'Equations Reducible to Linear Form', description: 'Cross-multiplication techniques for rational algebraic expressions.', prerequisites: ['cnc-2-1-2'], completed: false, mastery: 40, estimatedMins: 20 }
                ]
              }
            ]
          }
        ],
        Science: [
          {
            id: 'chap-s1',
            number: 1,
            title: 'Crop Production and Management',
            topics: [
              {
                id: 'top-s1-1',
                title: 'Agricultural Practices',
                mastery: 95,
                completed: true,
                concepts: [
                  { id: 'cnc-s1-1-1', title: 'Soil Preparation & Tilling', description: 'Loosening soil and nutrient turnover using ploughs.', prerequisites: [], completed: true, mastery: 98, estimatedMins: 10 }
                ]
              }
            ]
          }
        ]
      };

      const chapters = mockChaptersMap[subjectName] || mockChaptersMap['Mathematics'];
      setAggregatedSubjectData({
        subjectKey: subjectName,
        grade: 'Grade 8-A',
        mastery: subjectName === 'Science' ? 86 : 78,
        activeChapter: chapters[1] || chapters[0],
        activeTopic: chapters[1]?.topics[0] || chapters[0]?.topics[0],
        totalChapters: chapters.length,
        totalTopics: chapters.reduce((acc, ch) => acc + ch.topics.length, 0),
        completedConceptIds: ['cnc-1-1-1', 'cnc-1-1-2', 'cnc-1-1-3', 'top-1-2-1', 'top-1-2-2', 'cnc-2-1-1'],
        chapters
      });
    } finally {
      setIsSubjectLoading(false);
    }
  };

  const evaluateConceptStatus = (concept: any, completedIds: string[] = []) => {
    if (concept.completed) return 'COMPLETED';
    const reqs = concept.prerequisites || [];
    if (reqs.length === 0) return 'UNLOCKED';
    const allMet = reqs.every((reqId: string) => (completedIds || []).includes(reqId));
    return allMet ? 'UNLOCKED' : 'LOCKED';
  };

  return (
    <div className="space-y-6">
      {/* Subject Quick-Selection Switcher Tabs */}
      <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs overflow-x-auto">
        {['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'].map(sName => (
          <button
            key={sName}
            onClick={() => setSelectedSubjectKey(sName)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${selectedSubjectKey === sName ? 'bg-[#4648d4] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {sName}
          </button>
        ))}
      </div>

      {isSubjectLoading && (
        <div className="rounded-3xl bg-white border border-slate-200/80 p-12 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <h3 className="font-heading text-lg font-bold text-slate-900">Loading {selectedSubjectKey} Curriculum</h3>
        </div>
      )}

      {!isSubjectLoading && aggregatedSubjectData && (
        <div className="space-y-6">
          {/* Subject Mastery Overview Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 md:p-8 space-y-6 shadow-xl border border-indigo-900/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
                  {aggregatedSubjectData.grade} • Active Subject
                </span>
                <h2 className="font-heading text-3xl font-extrabold">{aggregatedSubjectData.subjectKey} Structural Tree</h2>
                <p className="text-xs text-slate-300">Granular chapters, topics, and concept prerequisite evaluation engine.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-center shrink-0 min-w-[200px]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-200">Overall Subject Mastery</span>
                <div className="text-3xl font-extrabold text-white mt-1">{aggregatedSubjectData.mastery}%</div>
                <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${aggregatedSubjectData.mastery}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum Hierarchy Accordion */}
          <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#4648d4]" /> Multi-Level Curriculum Hierarchy
              </h3>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                Prerequisite Engine Evaluated
              </span>
            </div>

            <div className="space-y-4">
              {aggregatedSubjectData.chapters.map((chap: any, idx: number) => {
                const isChapExpanded = expandedChapters[chap.id] ?? true;
                return (
                  <div key={chap.id || idx} className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50/40">
                    <div
                      onClick={() => setExpandedChapters(prev => ({ ...prev, [chap.id]: !isChapExpanded }))}
                      className="p-4 bg-white border-b border-slate-200/80 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                          Ch {chap.number}
                        </div>
                        <h4 className="font-heading font-bold text-sm text-slate-900">{chap.title}</h4>
                      </div>
                      {isChapExpanded ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                    </div>

                    {isChapExpanded && (
                      <div className="p-4 space-y-4">
                        {chap.topics.map((top: any, tIdx: number) => {
                          const isTopExpanded = expandedTopics[top.id] ?? true;
                          const concepts = top.concepts || [];

                          return (
                            <div key={top.id || tIdx} className="rounded-xl border border-slate-200/80 bg-white overflow-hidden">
                              <div
                                onClick={() => setExpandedTopics(prev => ({ ...prev, [top.id]: !isTopExpanded }))}
                                className="p-3.5 bg-slate-50/70 border-b border-slate-200/80 flex items-center justify-between cursor-pointer hover:bg-slate-100/60 transition"
                              >
                                <div className="flex items-center gap-3">
                                  {top.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Clock className="w-5 h-5 text-amber-500" />}
                                  <h5 className="font-heading font-bold text-xs text-slate-900">Topic {chap.number}.{tIdx + 1}: {top.title}</h5>
                                </div>
                                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                                  {top.mastery}% Mastery
                                </span>
                              </div>

                              {isTopExpanded && (
                                <div className="p-3 space-y-2 divide-y divide-slate-100">
                                  {concepts.map((cnc: any, cIdx: number) => {
                                    const status = evaluateConceptStatus(cnc, aggregatedSubjectData.completedConceptIds || []);
                                    return (
                                      <div key={cnc.id || cIdx} className="pt-2.5 first:pt-0 p-3 rounded-xl flex items-center justify-between gap-3 hover:bg-slate-50">
                                        <div>
                                          <h6 className="font-heading font-bold text-xs text-slate-900">{cnc.title}</h6>
                                          <p className="text-[11px] text-slate-500">{cnc.description}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          {status === 'LOCKED' ? (
                                            <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-400 text-xs font-bold flex items-center gap-1 border border-slate-200">
                                              <Lock className="w-3.5 h-3.5" /> Locked
                                            </span>
                                          ) : (
                                            <Link
                                              href={`/student/learn/workspace?concept=${encodeURIComponent(cnc.title)}`}
                                              className="px-3.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-[#4648d4] text-xs font-bold border border-indigo-200/60 transition flex items-center gap-1"
                                            >
                                              <Play className="w-3.5 h-3.5 fill-current" /> Start Concept
                                            </Link>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
