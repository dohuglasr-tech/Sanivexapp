'use client';

import React from 'react';
import { Calculator, ChevronDown } from 'lucide-react';

export const ServicesDivider: React.FC = () => {
  return (
    <div className="relative w-full py-12 sm:py-16 lg:py-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle background gradient shift */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1522] via-[#09111c] to-[#0a1524] pointer-events-none" />

      {/* Caustic horizontal separator lines */}
      <div className="relative w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
        <div className="w-full flex items-center justify-center gap-4">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-cyan-400/60" />
          
          <div className="relative group inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-[#0a1524]/90 border border-cyan-400/40 shadow-[0_0_30px_rgba(97,218,251,0.25)] text-cyan-300 text-xs sm:text-[13px] font-semibold tracking-wide backdrop-blur-2xl transition-all hover:scale-105">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <Calculator className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-white font-bold">Diagnóstico & Presupuesto Express</span>
            <ChevronDown className="h-3.5 w-3.5 text-cyan-400 animate-bounce" />
          </div>

          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-cyan-500/30 to-cyan-400/60" />
        </div>

        <p className="mt-4 text-center text-xs sm:text-[13px] text-slate-400 max-w-lg font-light leading-relaxed">
          Diseña tu plan de protección a la medida. Selecciona tu sector y obtén una propuesta técnica inmediata sin compromiso.
        </p>
      </div>
    </div>
  );
};
