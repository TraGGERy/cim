'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Share2, Compass, Cpu } from 'lucide-react';
import AttributionCanvas from '../../components/3d/AttributionCanvas';
import Matrix3DCanvas from '../../components/3d/Matrix3DCanvas';
import Resource5MCanvas from '../../components/3d/Resource5MCanvas';

export default function Visual3DLabPage() {
  const [activeTab, setActiveTab] = useState<'attribution' | 'matrix' | 'resources'>('attribution');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <Home className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white uppercase tracking-wider">
                3D Interactive WebGL Learning Lab
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                Three.js 60 FPS
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Spatial Conceptualization of Complex CIM Marketing Models</p>
          </div>
        </div>

        {/* 3D Lab Tabs */}
        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('attribution')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'attribution'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Marketing Attribution</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'matrix'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">3D Strategic Space</span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'resources'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">5Ms Resource Sim</span>
          </button>
        </div>
      </header>

      {/* Main 3D Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {activeTab === 'attribution' && <AttributionCanvas />}
        {activeTab === 'matrix' && <Matrix3DCanvas />}
        {activeTab === 'resources' && <Resource5MCanvas />}
      </main>
    </div>
  );
}
