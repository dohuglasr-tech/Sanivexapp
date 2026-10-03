'use client';

import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'mip', label: 'MIP' },
  { id: 'roedores', label: 'Roedores' },
  { id: 'aves', label: 'Control Aves' },
  { id: 'termitas', label: 'Termitas' },
  { id: 'sanitizacion', label: 'Sanitización' },
];

export const ScrollDots: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 p-2 rounded-full bg-slate-950/40 backdrop-blur-xl border border-white/10 shadow-2xl">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group relative flex items-center justify-center p-1.5 focus:outline-none"
            aria-label={`Navegar a ${section.label}`}
          >
            {/* Tooltip */}
            <span className="pointer-events-none absolute right-8 rounded-xl bg-slate-900/90 px-3 py-1 text-[11px] font-medium text-cyan-300 opacity-0 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1 whitespace-nowrap">
              {section.label}
            </span>

            {/* Dot Indicator */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'h-3.5 w-3.5 bg-cyan-400 shadow-[0_0_12px_#22d3ee] scale-110'
                  : 'h-2 w-2 bg-slate-600 hover:bg-slate-400 group-hover:scale-125'
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
};
