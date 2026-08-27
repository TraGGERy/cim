'use client';

import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface ExamTimerProps {
  durationMinutes: number;
  onTimeExpired: () => void;
  isActive: boolean;
  onTick?: (secondsRemaining: number) => void;
}

export default function ExamTimer({
  durationMinutes,
  onTimeExpired,
  isActive,
  onTick
}: ExamTimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(durationMinutes * 60);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeExpired();
          return 0;
        }
        const next = prev - 1;
        if (onTick) onTick(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeExpired, onTick]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const isUrgent = secondsRemaining <= 300; // <= 5 mins
  const isWarning = secondsRemaining <= 900 && !isUrgent; // <= 15 mins

  return (
    <div
      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-sm font-bold border transition-all ${
        isUrgent
          ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
          : isWarning
          ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
          : 'bg-slate-900 text-slate-200 border-slate-800'
      }`}
    >
      {isUrgent ? <AlertTriangle className="w-4 h-4 text-red-400" /> : <Clock className="w-4 h-4 text-blue-400" />}
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      <span className="text-[10px] text-slate-400 uppercase font-sans font-semibold tracking-wider">Remaining</span>
    </div>
  );
}
