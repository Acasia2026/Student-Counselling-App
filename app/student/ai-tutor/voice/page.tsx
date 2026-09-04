'use client';

import React, { useState } from 'react';
import { Mic, Bot, Sparkles } from 'lucide-react';

export default function VoiceAIModePage() {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    { sender: 'ai', text: 'Hello Aarav! I am listening. Speak any math or science question aloud!' }
  ]);

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'user', text: 'How do I solve linear equations with fractions?' },
          { sender: 'ai', text: 'Multiply all terms by the least common denominator to clear fractions first!' }
        ]);
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
              Socratic AI Audio Companion
            </span>
            <h2 className="font-heading font-bold text-2xl text-slate-900 mt-1">Voice AI Learning Mode</h2>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${isListening ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>
            {isListening ? 'Listening...' : 'Mic Ready'}
          </span>
        </div>

        {/* Voice Animation & Mic Launcher */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-6">
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            {isListening && <div className="absolute inset-0 bg-indigo-500/40 rounded-full animate-ping" />}
            <button
              onClick={toggleVoice}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition ${isListening ? 'bg-rose-600 text-white scale-110' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
            >
              <Mic className="w-8 h-8" />
            </button>
          </div>
          <p className="text-xs text-slate-300">
            {isListening ? 'Listening to your question... Speak clearly into your microphone.' : 'Click the microphone button to start voice conversation.'}
          </p>
        </div>

        {/* Voice Conversation Transcript */}
        <div className="space-y-3 pt-2">
          {messages.map((m, idx) => (
            <div key={idx} className={`p-4 rounded-2xl text-xs font-medium ${m.sender === 'user' ? 'bg-indigo-600 text-white ml-auto max-w-md' : 'bg-slate-100 text-slate-800 border border-slate-200/80 mr-auto max-w-md'}`}>
              <span className="font-bold block text-[10px] opacity-75 mb-1">{m.sender === 'user' ? 'You (Voice)' : 'Socratic AI Companion'}</span>
              {m.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
