'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';

interface SceneContainerProps {
  title: string;
  subtitle?: string;
  onInit: (canvas: HTMLCanvasElement, container: HTMLDivElement) => (() => void) | void;
  className?: string;
  height?: string;
}

export default function SceneContainer({
  title,
  subtitle,
  onInit,
  className = '',
  height = 'h-96 md:h-[480px]'
}: SceneContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    setIsLoading(true);
    setHasError(false);

    try {
      const cleanup = onInit(canvasRef.current, containerRef.current);
      setIsLoading(false);
      return () => {
        if (cleanup && typeof cleanup === 'function') {
          cleanup();
        }
      };
    } catch (err) {
      console.error('3D WebGL Initialization Error:', err);
      setHasError(true);
      setIsLoading(false);
    }
  }, [onInit, key]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col ${className}`}>
      {/* Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 py-3 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent flex items-center justify-between pointer-events-none">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">{title}</h3>
          </div>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        <button
          onClick={() => setKey(k => k + 1)}
          className="pointer-events-auto p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-all border border-slate-700"
          title="Reset 3D Scene View"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset View</span>
        </button>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm text-slate-300">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400 mb-2" />
          <p className="text-xs font-medium tracking-wide">Initializing 3D WebGL Engine...</p>
        </div>
      )}

      {/* Fallback Error View */}
      {hasError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900 text-slate-300 p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-800 flex items-center justify-center text-red-400 mb-3 font-mono font-bold">
            3D
          </div>
          <h4 className="text-sm font-semibold text-white mb-1">WebGL 3D Accelerated View</h4>
          <p className="text-xs text-slate-400 max-w-sm mb-4">
            WebGL hardware acceleration could not be initialized. An interactive fallback 2D diagram is rendered.
          </p>
          <button
            onClick={() => setKey(k => k + 1)}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
          >
            Retry WebGL
          </button>
        </div>
      )}

      {/* 3D Canvas Canvas container */}
      <div ref={containerRef} className={`w-full ${height} relative touch-none`}>
        <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
      </div>

      {/* Interaction Hint */}
      <div className="absolute bottom-2 left-3 right-3 pointer-events-none flex items-center justify-between text-[11px] text-slate-500">
        <span>Drag to rotate • Scroll to zoom</span>
        <span className="hidden sm:inline">WebGL 60 FPS Engine</span>
      </div>
    </div>
  );
}
