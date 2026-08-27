'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home } from 'lucide-react';
import { CIM_FORMULAS } from '../../lib/formulas';
import { CIM_COMMAND_VERBS } from '../../lib/modulesData';
import FormulaCalculator from '../../components/exam/FormulaCalculator';

export default function ReferenceHubPage() {
  const [showCalculator, setShowCalculator] = useState(false);

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
                CIM Level 6 Reference Center
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                Official Standards
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Printable Reference Cards, Formulas & Command Verbs</p>
          </div>
        </div>

        <button
          onClick={() => setShowCalculator(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Launch Calculator</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Section 1: Financial & Commercial Formulas */}
        <section id="formulas" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">1. Commercial & Financial Formulas</h2>
              <p className="text-xs text-slate-400">Essential equations for Commercial Intelligence LO 1.1, LO 2.1 & LO 3.2</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CIM_FORMULAS.map((f) => (
              <div key={f.id} className="glass-panel p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{f.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                    {f.category}
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-emerald-400 border border-slate-800">
                  {f.equation}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{f.explanation}</p>
                <div className="text-[11px] text-slate-500 font-mono">{f.cimLearningOutcome}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Command Verbs Master List */}
        <section id="command-verbs" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">2. Level 6 Command Verbs Master List</h2>
              <p className="text-xs text-slate-400">Official definitions from CIM Specification 2024 V1.1 (Pages 14–17)</p>
            </div>
          </div>

          <div className="glass-panel overflow-hidden border border-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-blue-400 uppercase font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Command Verb</th>
                    <th className="p-3.5">Standard Definition</th>
                    <th className="p-3.5">Level 6 Cognitive Expectation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {CIM_COMMAND_VERBS.map((verb) => (
                    <tr key={verb.verb} className="hover:bg-slate-900/50">
                      <td className="p-3.5 font-bold text-purple-400 font-mono whitespace-nowrap">{verb.verb}</td>
                      <td className="p-3.5 leading-relaxed">{verb.definition}</td>
                      <td className="p-3.5 leading-relaxed text-slate-400">{verb.level6Expectation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Strategic Frameworks Blueprint */}
        <section id="frameworks" className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">3. Strategic Frameworks Blueprint</h2>
            <p className="text-xs text-slate-400">Core planning architectures for Strategy & Planning (SP-L6-2024)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-panel p-5 space-y-2">
              <h4 className="text-sm font-bold text-white">SOSTAC® Planning Framework</h4>
              <p className="text-xs text-slate-400">
                <strong>Situation</strong> (Where are we?), <strong>Objectives</strong> (Where to?), <strong>Strategy</strong> (How?), <strong>Tactics</strong> (7Ps mix), <strong>Action</strong> (5Ms & Gantt), <strong>Control</strong> (KPIs & PDCA).
              </p>
            </div>

            <div className="glass-panel p-5 space-y-2">
              <h4 className="text-sm font-bold text-white">SFA Matrix (Option Appraisal)</h4>
              <p className="text-xs text-slate-400">
                <strong>Suitability</strong> (Solves audit issues?), <strong>Feasibility</strong> (Within 5Ms resources & capital?), <strong>Acceptability</strong> (ROMI, risk-reward satisfactory to stakeholders?).
              </p>
            </div>

            <div className="glass-panel p-5 space-y-2">
              <h4 className="text-sm font-bold text-white">TOWS Strategic Synthesis</h4>
              <p className="text-xs text-slate-400">
                <strong>SO</strong> (Maxi-Maxi: Strengths for Opportunities), <strong>ST</strong> (Maxi-Mini: Strengths against Threats), <strong>WO</strong> (Mini-Maxi: Overcoming Weaknesses), <strong>WT</strong> (Mini-Mini: Defensive containment).
              </p>
            </div>

            <div className="glass-panel p-5 space-y-2">
              <h4 className="text-sm font-bold text-white">5Ms Resource Audit</h4>
              <p className="text-xs text-slate-400">
                <strong>Men</strong> (Human skills & team capacity), <strong>Money</strong> (Budget & capital), <strong>Materials</strong> (MarTech & creative assets), <strong>Minutes</strong> (Time schedule), <strong>Measurements</strong> (KPIs & analytics).
              </p>
            </div>
          </div>
        </section>
      </main>

      <FormulaCalculator isOpen={showCalculator} onClose={() => setShowCalculator(false)} />
    </div>
  );
}
