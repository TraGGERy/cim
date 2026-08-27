'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Zap, Clock, X } from 'lucide-react';
import { InterruptChallenge } from '../../types/cim';
import FeedbackCard from './FeedbackCard';
import { recordInterruptResult } from '../../lib/storage';

interface InterruptionModalProps {
  challenge: InterruptChallenge;
  isOpen: boolean;
  onClose: () => void;
  onAnswered?: (isCorrect: boolean) => void;
}

export default function InterruptionModal({
  challenge,
  isOpen,
  onClose,
  onAnswered
}: InterruptionModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimitSeconds || 45);

  const handleSubmit = useCallback((optionId: string) => {
    setSelectedOption(optionId);
    setIsSubmitted(true);
    const correct = optionId === challenge.correctAnswer;
    recordInterruptResult(correct);
    if (onAnswered) onAnswered(correct);
  }, [challenge, onAnswered]);

  useEffect(() => {
    if (!isOpen || isSubmitted) return;
    setTimeLeft(challenge.timeLimitSeconds || 45);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!isSubmitted) {
            handleSubmit('');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isSubmitted, challenge, handleSubmit]);

  if (!isOpen) return null;

  const isCorrect = selectedOption === challenge.correctAnswer;

  const handleNext = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Alert Bar */}
        <div className="px-6 py-3.5 bg-gradient-to-r from-amber-950/60 via-slate-950/90 to-amber-950/60 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse">
              <Zap className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                Active Recall Interception
              </span>
              <span className="text-[10px] text-slate-400 block">{challenge.loReference}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-amber-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          <div>
            <h3 className="text-base font-bold text-white mb-2">{challenge.title}</h3>
            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
              <strong className="text-amber-400">Scenario:</strong> {challenge.context}
            </div>
            <p className="text-xs font-semibold text-slate-100">{challenge.prompt}</p>
          </div>

          {/* Options (if not submitted) */}
          {!isSubmitted ? (
            <div className="space-y-2.5">
              {challenge.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSubmit(opt.id)}
                  className="w-full text-left p-3.5 rounded-xl bg-slate-950/60 hover:bg-blue-950/40 border border-slate-800 hover:border-blue-500/60 text-xs text-slate-200 transition-all flex items-center gap-3 group"
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-800 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors">
                    {opt.id}
                  </span>
                  <span className="leading-snug">{opt.text}</span>
                </button>
              ))}
            </div>
          ) : (
            <FeedbackCard
              isCorrect={isCorrect}
              explanation={challenge.explanation}
              loReference={challenge.loReference}
              onNext={handleNext}
            />
          )}
        </div>
      </div>
    </div>
  );
}
