'use client';

import React, { useState } from 'react';
import { Zap, HelpCircle, CheckCircle2, Award } from 'lucide-react';

export default function AdaptiveQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showHint, setShowHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const sampleQuiz = [
    {
      question: 'Which of the following is a rational number between 1/3 and 1/2?',
      options: ['5/12', '2/3', '1/5', '7/12'],
      correct: 0,
      hint: 'Find a common denominator for 1/3 and 1/2 (e.g. 12).'
    },
    {
      question: 'Solve for x: 3x - 5 = 2x + 10',
      options: ['x = 5', 'x = 15', 'x = 10', 'x = -15'],
      correct: 1,
      hint: 'Subtract 2x from both sides and add 5 to both sides.'
    },
    {
      question: 'What is the factorized form of x² - 9?',
      options: ['(x - 3)²', '(x - 3)(x + 3)', '(x + 3)²', '(x² - 3)'],
      correct: 1,
      hint: 'Apply standard identity a² - b² = (a - b)(a + b).'
    }
  ];

  const handleNext = () => {
    if (currentQuestion < sampleQuiz.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowHint(false);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
              Adaptive Practice Engine
            </span>
            <h2 className="font-heading font-bold text-2xl text-slate-900 mt-1">Mathematics Practice Quiz</h2>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Question {currentQuestion + 1} of {sampleQuiz.length}
          </span>
        </div>

        {!quizFinished ? (
          <div className="space-y-6 py-2">
            <h3 className="font-heading font-bold text-base text-slate-900">
              {sampleQuiz[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {sampleQuiz[currentQuestion].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: idx }))}
                  className={`w-full p-4 rounded-2xl border text-left text-xs font-semibold transition ${selectedAnswers[currentQuestion] === idx ? 'bg-indigo-50 border-[#4648d4] text-[#4648d4] shadow-xs' : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'}`}
                >
                  {String.fromCharCode(65 + idx)}. {opt}
                </button>
              ))}
            </div>

            {showHint && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1">💡 Concept Hint:</span>
                <p>{sampleQuiz[currentQuestion].hint}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4 text-amber-500" /> {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="px-6 py-2.5 rounded-xl bg-[#4648d4] hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition disabled:opacity-50"
              >
                {currentQuestion === sampleQuiz.length - 1 ? 'Submit Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            <Award className="w-12 h-12 text-[#4648d4] mx-auto" />
            <h3 className="font-heading text-2xl font-bold text-slate-900">Quiz Completed! 🎉</h3>
            <p className="text-xs text-emerald-700 font-bold bg-emerald-50 p-3 rounded-2xl max-w-md mx-auto">
              Accuracy: 100% • Earned +45 XP
            </p>
            <button
              onClick={() => {
                setQuizFinished(false);
                setCurrentQuestion(0);
                setSelectedAnswers({});
              }}
              className="px-6 py-2.5 rounded-xl bg-[#4648d4] text-white text-xs font-bold shadow-md"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
