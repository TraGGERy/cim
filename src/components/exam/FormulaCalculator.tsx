'use client';

import React, { useState } from 'react';
import { Calculator, X, Sparkles } from 'lucide-react';
import { CIM_FORMULAS, FormulaDefinition } from '../../lib/formulas';

interface FormulaCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FormulaCalculator({ isOpen, onClose }: FormulaCalculatorProps) {
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>('romi');
  const [inputs, setInputs] = useState<Record<string, number>>({
    R: 320000,
    M: 40,
    C: 80000
  });

  if (!isOpen) return null;

  const currentFormula = CIM_FORMULAS.find(f => f.id === selectedFormulaId) || CIM_FORMULAS[0];
  const calculation = currentFormula.calculate(inputs);

  const handleFormulaChange = (f: FormulaDefinition) => {
    setSelectedFormulaId(f.id);
    const initialInputs: Record<string, number> = {};
    if (f.id === 'romi') {
      initialInputs['R'] = 320000;
      initialInputs['M'] = 40;
      initialInputs['C'] = 80000;
    } else if (f.id === 'cac') {
      initialInputs['S'] = 45000;
      initialInputs['N'] = 1500;
    } else if (f.id === 'clv') {
      initialInputs['ARPU'] = 600;
      initialInputs['M'] = 80;
      initialInputs['Ch'] = 4;
    } else if (f.id === 'breakeven') {
      initialInputs['F'] = 60000;
      initialInputs['P'] = 120;
      initialInputs['V'] = 70;
    } else if (f.id === 'variance') {
      initialInputs['B'] = 100000;
      initialInputs['A'] = 115000;
    }
    setInputs(initialInputs);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">CIM Commercial Formulas & Calculator</h3>
              <p className="text-xs text-slate-400">Interactive calculation engine for Level 6 financial metrics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formula Tabs */}
        <div className="flex overflow-x-auto gap-1.5 p-3 bg-slate-950/40 border-b border-slate-800 no-scrollbar">
          {CIM_FORMULAS.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFormulaChange(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFormulaId === f.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.name.split('(')[0]}
            </button>
          ))}
        </div>

        {/* Calculator Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-base font-bold text-white">{currentFormula.name}</h4>
              <span className="text-xs font-mono text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800">
                {currentFormula.cimLearningOutcome}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">{currentFormula.explanation}</p>
            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-emerald-400 border border-slate-800">
              {currentFormula.equation}
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentFormula.variables.map((v) => (
              <div key={v.symbol} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <label className="block text-xs font-medium text-slate-300 mb-1 truncate" title={v.name}>
                  {v.name} ({v.symbol})
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-xs font-mono text-slate-500">{v.unit}</span>
                  <input
                    type="number"
                    value={inputs[v.symbol] !== undefined ? inputs[v.symbol] : ''}
                    onChange={(e) => setInputs({ ...inputs, [v.symbol]: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-7 pr-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block truncate">{v.description}</span>
              </div>
            ))}
          </div>

          {/* Calculation Steps & Result */}
          <div className="p-4 bg-gradient-to-br from-slate-950 to-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Step-by-Step Derivation
              </span>
              <div className="text-right">
                <span className="text-xs text-slate-400 mr-2">Calculated Result:</span>
                <span className="text-lg font-mono font-bold text-emerald-400">
                  {calculation.result} {calculation.unit}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 font-mono text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              {calculation.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
}
