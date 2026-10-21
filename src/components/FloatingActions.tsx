'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp, User } from 'lucide-react';

// URL del Panel de Login / Plataforma externa (fácilmente editable cuando proporciones el link oficial)
const EXTERNAL_LOGIN_URL: string = 'https://app.sanivex.com.co';

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

  const handleLoginClick = (e: React.MouseEvent) => {
    // Si la URL es un placeholder o interna, abrimos el modal de clientes como fallback
    if (!EXTERNAL_LOGIN_URL || EXTERNAL_LOGIN_URL === '#' || EXTERNAL_LOGIN_URL.includes('sanivex.com.co')) {
      e.preventDefault();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('open-portal-modal'));
      }
    }
  };

  return (
    <aside
      aria-label="Accesos rápidos flotantes"
      className="fixed bottom-[calc(6.25rem+env(safe-area-inset-bottom,0px))] md:bottom-7 right-3.5 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto select-none"
    >
      {/* 1. Instagram Button (Entrada escalonada + Giro 3D continuo en bucle) */}
      <a
        href="https://www.instagram.com/sanivex.co"
        target="_blank"
        rel="noopener noreferrer"
        className="animate-floating-entrance-1 group relative flex h-9 w-9 sm:h-[38px] sm:w-[38px] items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-[0_3px_12px_rgba(220,39,67,0.4)] hover:shadow-[0_4px_18px_rgba(220,39,67,0.7)] border border-white/25 transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Instagram oficial @sanivex.co"
      >
        <div
          className="flex h-4 w-4 items-center justify-center animate-floating-icon-instagram"
          style={{ perspective: '400px', transformOrigin: 'center' }}
        >
          <svg
            className="h-4 w-4 fill-white transition-transform group-hover:rotate-6"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </div>

        {/* Floating Tooltip Desktop */}
        <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-xl bg-slate-900/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xl opacity-0 backdrop-blur-md border border-white/10 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1 hidden sm:inline-block">
          Instagram @sanivex.co
        </span>
      </a>

      {/* 2. Panel de Login de la Plataforma Externa (Entrada escalonada + Giro 3D continuo en bucle) */}
      <a
        href={EXTERNAL_LOGIN_URL}
        onClick={handleLoginClick}
        target="_blank"
        rel="noopener noreferrer"
        className="animate-floating-entrance-2 group relative flex h-9 w-9 sm:h-[38px] sm:w-[38px] items-center justify-center rounded-full bg-gradient-to-br from-[#0a3871] via-[#103460] to-[#071930] border border-cyan-400/50 text-cyan-200 hover:text-white shadow-[0_3px_12px_rgba(10,56,113,0.5)] hover:shadow-[0_4px_18px_rgba(97,218,251,0.5)] transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Acceso al Panel de Login de Clientes"
      >
        <div
          className="flex h-4 w-4 items-center justify-center animate-floating-icon-login"
          style={{ perspective: '400px', transformOrigin: 'center' }}
        >
          <User className="h-4 w-4 stroke-[2.2] transition-transform group-hover:scale-110" />
        </div>

        {/* Floating Tooltip Desktop */}
        <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-xl bg-slate-900/95 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 shadow-xl opacity-0 backdrop-blur-md border border-white/10 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1 hidden sm:inline-block">
          Panel de Login • Clientes
        </span>
      </a>

      {/* 3. WhatsApp Button Oficial (Entrada escalonada + Giro 3D continuo en bucle) */}
      <a
        href="https://wa.me/573009123456?text=Hola%20SANIVEX,%20deseo%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20sanidad%20ambiental."
        target="_blank"
        rel="noopener noreferrer"
        className="animate-floating-entrance-3 group relative flex h-9 w-9 sm:h-[38px] sm:w-[38px] items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_3px_12px_rgba(37,211,102,0.45)] hover:shadow-[0_4px_20px_rgba(37,211,102,0.7)] border border-white/25 transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="WhatsApp Oficial Sanivex"
      >
        <div
          className="flex h-4 w-4 items-center justify-center animate-floating-icon-whatsapp"
          style={{ perspective: '400px', transformOrigin: 'center' }}
        >
          <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </div>

        {/* Floating Tooltip Desktop */}
        <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-xl bg-slate-900/95 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 shadow-xl opacity-0 backdrop-blur-md border border-white/10 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1 hidden sm:inline-block">
          WhatsApp Oficial
        </span>
      </a>

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
