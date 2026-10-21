'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const checkScroll = () => {
      const scrollEl = document.getElementById('main-scroll');
      const containerScroll = scrollEl ? scrollEl.scrollTop : 0;
      const windowScroll =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const currentScroll = Math.max(containerScroll, windowScroll);

      setShowScrollTop(currentScroll > 250);

      // Calcular porcentaje de scroll para el anillo interactivo
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    document.addEventListener('scroll', checkScroll, { passive: true });
    const scrollEl = document.getElementById('main-scroll');
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScroll, { passive: true });
    }
    checkScroll();

    return () => {
      window.removeEventListener('scroll', checkScroll);
      document.removeEventListener('scroll', checkScroll);
      if (scrollEl) scrollEl.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const scrollToTop = () => {
    const scrollEl = document.getElementById('main-scroll');
    if (scrollEl && scrollEl.scrollTop > 0) {
      scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Volver arriba flotante"
      className="fixed bottom-[calc(6.25rem+env(safe-area-inset-bottom,0px))] md:bottom-7 right-3.5 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none select-none"
    >

      {/* 4. Scroll to Top Button (Animación suave de entrada/salida + Anillo de progreso de scroll + Chevron bounce) */}
      <div
        className={`transition-all duration-300 ease-out transform ${
          showScrollTop
            ? 'opacity-100 scale-100 translate-y-0 h-8 w-8 sm:h-[34px] sm:w-[34px] pointer-events-auto'
            : 'opacity-0 scale-50 translate-y-2 h-0 w-8 sm:w-[34px] pointer-events-none overflow-hidden'
        }`}
      >
        <button
          onClick={scrollToTop}
          className="group relative flex h-8 w-8 sm:h-[34px] sm:w-[34px] items-center justify-center rounded-full bg-slate-900/90 hover:bg-[#1a2d48] border border-cyan-400/40 hover:border-cyan-400/70 text-slate-200 hover:text-cyan-300 shadow-[0_3px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_16px_rgba(56,189,248,0.4)] transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          aria-label="Volver arriba"
        >
          {/* Anillo Circular SVG con progreso de scroll */}
          <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="url(#floatingScrollGradient)"
              strokeWidth="2.2"
              strokeDasharray="94.25"
              strokeDashoffset={94.25 - (scrollProgress / 100) * 94.25}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />
            <defs>
              <linearGradient id="floatingScrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
          </svg>

          {/* Icono Chevron con micro-rebote continuo */}
          <ChevronUp className="h-3.5 w-3.5 stroke-[2.5] animate-chevron-bounce text-cyan-200 group-hover:text-cyan-300 transition-colors" />

          {/* Floating Tooltip Desktop con porcentaje de scroll */}
          <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-xl bg-slate-900/95 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 shadow-xl opacity-0 backdrop-blur-md border border-white/10 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1 hidden sm:inline-block">
            Volver arriba ({Math.round(scrollProgress)}%)
          </span>
        </button>
      </div>
    </aside>
  );
};
