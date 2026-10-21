'use client';

import React, { useEffect, useState } from 'react';
import {
  Home,
  ShieldCheck,
  Bug,
  Sparkles,
  Calculator,
  Award,
  Phone,
} from 'lucide-react';

// Custom Crisp Pest & Category SVG Icons for High-End Navigation Representation
const RatIcon: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Body & head of rodent with whiskers and tail */}
    <path d="M19 13c1.5-1.5 2-4 1-6s-3.5-1.5-5 0c-2.5-1.5-6-1.5-8.5.5C3.5 10 3 13.5 4 16c1 2.5 3 4 6 4 3 0 6-2 7.5-4.5" />
    <path d="M18 5.5c.5-1 1.5-1.5 2.5-1s1 2 .5 3" />
    <circle cx="16" cy="8" r="1" fill="currentColor" />
    <path d="M4 16c-1.5 1-2.5 3-2 5" />
    <path d="M19 11l3-1M19 13l3.5 1" />
  </svg>
);

const BirdIcon: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Clean aerodynamic bird profile */}
    <path d="M16 7h.01" />
    <path d="M3.4 18c3.6 1.8 8.6 1.3 11.6-1.7 3-3 3-8 1-11.3l-2.4 2.4c-.6.6-1.5.8-2.3.5L8.5 6.5C7 5 5 4.5 3.5 5.2 2 6 1.5 7.8 2.2 9.5l1.6 3.8c.4 1 .3 2.1-.3 3L3.4 18z" />
    <path d="M19 3l3 2-3 2" />
  </svg>
);

const TermiteIcon: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Xylophagous termite silhouette with mandibles */}
    <ellipse cx="12" cy="15" rx="4" ry="6" />
    <circle cx="12" cy="7" r="3" />
    <path d="M10 4l-2-2M14 4l2-2" />
    <path d="M8 13l-4-2M16 13l4-2M8 17l-4 2M16 17l4 2" />
  </svg>
);

interface NavSection {
  id: string;
  label: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  activeColor: string;
  glowColor: string;
}

const sections: NavSection[] = [
  {
    id: 'hero',
    label: 'Inicio',
    category: 'Presentación',
    icon: Home,
    activeColor: 'bg-white text-slate-950',
    glowColor: 'rgba(255, 255, 255, 0.4)',
  },
  {
    id: 'mip',
    label: 'Protocolo MIP',
    category: 'Ciclo Metodológico',
    icon: ShieldCheck,
    activeColor: 'bg-[#5c7090] text-white',
    glowColor: 'rgba(92, 112, 144, 0.5)',
  },
  {
    id: 'roedores',
    label: 'Control de Roedores',
    category: 'Vectores Sanitarios',
    icon: RatIcon,
    activeColor: 'bg-red-500 text-white',
    glowColor: 'rgba(239, 68, 68, 0.5)',
  },
  {
    id: 'insectos',
    label: 'Control de Insectos',
    category: 'Rastreros & Voladores',
    icon: Bug,
    activeColor: 'bg-emerald-500 text-slate-950',
    glowColor: 'rgba(16, 185, 129, 0.5)',
  },
  {
    id: 'aves',
    label: 'Manejo de Aves',
    category: 'Exclusión Estructural',
    icon: BirdIcon,
    activeColor: 'bg-sky-400 text-slate-950',
    glowColor: 'rgba(56, 189, 248, 0.5)',
  },
  {
    id: 'termitas',
    label: 'Control de Termitas',
    category: 'Detección No Invasiva',
    icon: TermiteIcon,
    activeColor: 'bg-amber-400 text-slate-950',
    glowColor: 'rgba(251, 191, 36, 0.5)',
  },
  {
    id: 'sanitizacion',
    label: 'Sanitización Quirúrgica',
    category: 'Desinfección ULV',
    icon: Sparkles,
    activeColor: 'bg-teal-400 text-slate-950',
    glowColor: 'rgba(45, 212, 191, 0.5)',
  },
  {
    id: 'calculadora',
    label: 'Calculadora 3 Clics',
    category: 'Cotizador Express',
    icon: Calculator,
    activeColor: 'bg-cyan-400 text-slate-950',
    glowColor: 'rgba(97, 218, 251, 0.5)',
  },
  {
    id: 'sanivex',
    label: '¿Quiénes Somos?',
    category: 'Estándares Sanivex',
    icon: Award,
    activeColor: 'bg-blue-500 text-white',
    glowColor: 'rgba(59, 130, 246, 0.5)',
  },
  {
    id: 'contacto',
    label: 'Contacto & Sedes',
    category: 'Atención Nacional',
    icon: Phone,
    activeColor: 'bg-emerald-400 text-slate-950',
    glowColor: 'rgba(52, 211, 153, 0.5)',
  },
];

export const ScrollDots: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLightSection, setIsLightSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const middleY = window.innerHeight * 0.45;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= middleY && rect.bottom >= middleY) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      // Detectar si el dock pasa por encima de una sección clara (data-theme="light")
      const lightElements = document.querySelectorAll('[data-theme="light"]');
      const dockMiddleY = window.innerHeight * 0.5;
      let isLight = false;
      lightElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= dockMiddleY && rect.bottom >= dockMiddleY) {
          isLight = true;
        }
      });
      setIsLightSection(isLight);
    };

    const scrollEl = document.getElementById('main-scroll');
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      aria-label="Navegación rápida de servicios y secciones"
      className={`fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-1.5 p-2 rounded-full backdrop-blur-2xl transition-all duration-300 select-none ${
        isLightSection
          ? 'liquid-glass-dock-vertical-light'
          : 'liquid-glass-dock-vertical'
      }`}
    >
      {/* Top Specular Caustic Highlight Line */}
      <div className="pointer-events-none absolute inset-x-2.5 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full" />

      {sections.map((section) => {
        const isActive = activeSection === section.id;
        const IconComponent = section.icon;

        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group relative flex items-center justify-center focus:outline-none cursor-pointer"
            aria-label={`Ir a ${section.label}`}
          >
            {/* Liquid Glass Tooltip on left */}
            <div
              className={`pointer-events-none absolute right-12 rounded-xl px-3 py-1.5 opacity-0 backdrop-blur-xl border transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1 whitespace-nowrap flex flex-col items-start z-50 shadow-2xl ${
                isLightSection
                  ? 'bg-white/95 border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.15)] text-slate-800'
                  : 'bg-[#060e1c]/95 border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)] text-white'
              }`}
            >
              <span
                className={`text-[9.5px] uppercase font-bold tracking-wider ${
                  isLightSection ? 'text-[#0a3871]' : 'text-cyan-300'
                }`}
              >
                {section.category}
              </span>
              <span className="text-xs font-semibold">
                {section.label}
              </span>
            </div>

            {/* Circular Parameterized Icon Dock Item */}
            <div
              style={{
                boxShadow: isActive ? `0 0 16px ${section.glowColor}` : 'none',
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                isActive
                  ? `${section.activeColor} scale-110 shadow-lg`
                  : isLightSection
                  ? 'bg-slate-200/50 text-[#0a3871]/70 hover:text-[#0a3871] hover:bg-slate-300/80 hover:scale-105 active:scale-95'
                  : 'bg-white/[0.04] text-slate-300/80 hover:text-white hover:bg-white/15 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95'
              }`}
            >
              <IconComponent className="h-4 w-4" />
            </div>
          </button>
        );
      })}
    </aside>
  );
};
