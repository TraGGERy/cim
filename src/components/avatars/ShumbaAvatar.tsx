'use client';

import React, { useState } from 'react';

export interface ShumbaAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showBadge?: boolean;
  showMentorShield?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
  '2xl': 'w-28 h-28 text-2xl',
};

const dimensionMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
  '2xl': 112,
};

export default function ShumbaAvatar({
  size = 'md',
  showBadge = true,
  showMentorShield = true,
  className = '',
  onClick,
}: ShumbaAvatarProps) {
  const [imgSrc, setImgSrc] = useState('/avatars/shumba.png');
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (imgSrc === '/avatars/shumba.png') {
      setImgSrc('/avatars/shumba.jpg');
    } else if (imgSrc === '/avatars/shumba.jpg') {
      setImgSrc('/avatars/shumba.svg');
    } else {
      setHasError(true);
    }
  };

  const dim = dimensionMap[size];

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex shrink-0 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      title="Tutor Shumba • Senior CIM Chartered Marketer & Chief Examiner"
    >
      <div
        className={`${sizeClasses[size]} rounded-2xl overflow-hidden ring-2 ring-amber-500/50 shadow-md shadow-amber-950/40 bg-gradient-to-tr from-slate-900 to-amber-950 flex items-center justify-center relative`}
      >
        {!hasError ? (
          <img
            src={imgSrc}
            alt="Tutor Shumba - Senior CIM Chartered Marketer & Examiner"
            width={dim}
            height={dim}
            onError={handleError}
            className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-amber-600 to-indigo-700 flex items-center justify-center font-bold text-white">
            TS
          </div>
        )}
      </div>

      {/* Verified Examiner / Shield Indicator */}
      {showMentorShield && (
        <span
          className={`absolute bottom-0 right-0 rounded-full border-2 border-slate-950 bg-amber-400 ${
            size === 'xs' || size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'
          } shadow-sm`}
          title="Verified CIM Chief Examiner"
        />
      )}

      {/* Chief Examiner Badge */}
      {showBadge && (size === 'lg' || size === 'xl' || size === '2xl') && (
        <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-amber-950/90 border border-amber-400/70 text-[9px] font-mono font-bold text-amber-200 tracking-wider shadow">
          TUTOR
        </span>
      )}
    </div>
  );
}
