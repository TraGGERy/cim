'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface TashaAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showBadge?: boolean;
  showOnline?: boolean;
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

export default function TashaAvatar({
  size = 'md',
  showBadge = true,
  showOnline = true,
  className = '',
  onClick,
}: TashaAvatarProps) {
  const [imgSrc, setImgSrc] = useState('/avatars/tasha.png');
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (imgSrc === '/avatars/tasha.png') {
      setImgSrc('/avatars/tasha.jpg');
    } else if (imgSrc === '/avatars/tasha.jpg') {
      setImgSrc('/avatars/tasha.svg');
    } else {
      setHasError(true);
    }
  };

  const dim = dimensionMap[size];

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex shrink-0 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      title="Tasha Aka • CIM Level 6 Candidate"
    >
      <div
        className={`${sizeClasses[size]} rounded-2xl overflow-hidden ring-2 ring-emerald-500/40 shadow-md shadow-emerald-950/40 bg-gradient-to-tr from-slate-900 to-emerald-950 flex items-center justify-center relative`}
      >
        {!hasError ? (
          <img
            src={imgSrc}
            alt="Tasha Aka - CIM Level 6 Candidate"
            width={dim}
            height={dim}
            onError={handleError}
            className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-bold text-white">
            TA
          </div>
        )}
      </div>

      {/* Active Scholar / Online Indicator */}
      {showOnline && (
        <span
          className={`absolute bottom-0 right-0 rounded-full border-2 border-slate-950 bg-emerald-400 ${
            size === 'xs' || size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'
          } shadow-sm animate-pulse`}
          title="Active Candidate"
        />
      )}

      {/* Candidate Badge */}
      {showBadge && (size === 'lg' || size === 'xl' || size === '2xl') && (
        <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-emerald-900/90 border border-emerald-400/60 text-[9px] font-mono font-bold text-emerald-200 tracking-wider shadow">
          L6
        </span>
      )}
    </div>
  );
}
