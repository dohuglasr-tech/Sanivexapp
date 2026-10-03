'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp, MessageCircle } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/573009123456?text=Hola%20SANIVEX,%20deseo%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20sanidad%20ambiental."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 p-3 sm:px-4 sm:py-3 text-slate-950 font-bold shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] transition-all transform hover:scale-105"
        aria-label="Contactar por WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-50"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
        </span>
        <MessageCircle className="h-5 w-5 fill-slate-950 stroke-none" />
        <span className="hidden sm:inline text-xs font-extrabold tracking-wide">
          Atención Inmediata
        </span>
      </a>

      {/* Blue Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-1 animate-in fade-in"
          aria-label="Volver arriba"
        >
          <ChevronUp className="h-5 w-5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
};
