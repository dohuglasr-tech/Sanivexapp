'use client';

import React, { useState } from 'react';
import {
  Award,
  Activity,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Target,
  Leaf,
  Calendar,
  ShieldCheck,
  Clock,
} from 'lucide-react';

interface AboutSanivexProps {
  onOpenQuote: (serviceName: string) => void;
}

const PILLARS = [
  {
    id: 'normativo',
    title: 'Cumplimiento Normativo Internacional',
    short: 'Normatividad',
    icon: Award,
    description:
      'Implementación de estándares BPM (Buenas Prácticas de Manufactura), HACCP (Análisis de Peligros y Puntos Críticos de Control), AIB International y BRC.',
    tags: ['BPM', 'HACCP', 'AIB International', 'BRC'],
    color: 'from-sky-500/20 to-blue-600/10',
    borderColor: 'border-sky-500/40',
    badgeText: 'Auditorías 100% Aprobadas',
  },
  {
    id: 'insumos',
    title: 'Insumos de Grado Sanitario',
    short: 'Insumos Grado Sanitario',
    icon: Leaf,
    description:
      'Utilización exclusiva de rodenticidas e insecticidas avanzados, aprobados por el Ministerio de Salud y diseñados para generar el menor impacto ambiental posible.',
    tags: ['MinSalud', 'Biorracionales', 'Bajo Impacto', 'Seguridad Humana'],
    color: 'from-emerald-500/20 to-teal-600/10',
    borderColor: 'border-emerald-500/40',
    badgeText: 'Aprobado Ministerio de Salud',
  },
  {
    id: 'analitica',
    title: 'Gestión Documental y Analítica',
    short: 'Plataforma & Analítica',
    icon: Activity,
    description:
      'Plataforma tecnológica con acceso 24/7 a trazabilidad de servicios, mapas de calor, análisis de tendencias y verificación de planes de acción.',
    tags: ['Acceso 24/7', 'Mapas de Calor', 'Tendencias', 'Trazabilidad Digital'],
    color: 'from-cyan-500/20 to-sky-600/10',
    borderColor: 'border-cyan-500/40',
    badgeText: 'Portal en Tiempo Real',
  },
];

export const AboutSanivex: React.FC<AboutSanivexProps> = ({ onOpenQuote }) => {
  const [activePillar, setActivePillar] = useState<number>(0);
  const current = PILLARS[activePillar];

  return (
    <div className="w-full flex flex-col justify-center max-w-7xl mx-auto py-2">
      {/* Top Header Section */}
      <div className="flex flex-col gap-1.5 mb-3 sm:mb-4 text-left">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-[11px] font-semibold text-[#61dafb] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            ¿Quiénes somos?
          </div>
          <span className="text-white/20 text-xs hidden sm:inline">•</span>
          <span className="text-slate-400 text-xs font-semibold tracking-wider uppercase hidden sm:inline">
            Perfil Institucional & Respaldo
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          SOBRE SANIVEX
        </h2>
      </div>

      {/* Main Grid: Left Narrative & Pillars | Right Diagnostic Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        {/* Left Column (col-span-7): Corporate Manifesto + Pillars */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4 bg-[#0a1220]/70 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl overflow-hidden relative group text-left">
          {/* Subtle Ambient glow inside card */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-sky-500/10 blur-[90px] pointer-events-none" />

          {/* Statement Paragraphs */}
          <div className="flex flex-col gap-2.5 relative z-10">
            <p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed font-normal">
              Es una compañía especializada en <span className="text-white font-semibold">Sanidad Ambiental y Control Integrado de Plagas (MIP)</span>, dedicada a la protección integral de entornos corporativos, industriales, comerciales y residenciales.
            </p>

            <p className="text-xs sm:text-[13px] text-slate-300/80 leading-relaxed font-light">
              Diseñamos ecosistemas de protección preventivos, inteligentes y personalizados, garantizando la continuidad operativa y la bioseguridad en cada espacio.
            </p>

            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-950/60 to-[#0e1d33]/60 border border-cyan-500/25 text-xs sm:text-[12.5px] leading-relaxed">
              <span className="font-bold text-white tracking-wide">Tu operación segura, nuestra razón de ser</span>
              <span className="text-slate-300">, nos posicionamos como un aliado estratégico que combina precisión técnica, conciencia biológica y tecnología de vanguardia.</span>
            </div>
          </div>

          {/* Subsection: Máximos Estándares y Respaldo Técnico */}
          <div className="flex flex-col gap-2.5 relative z-10 pt-3 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-cyan-400" />
                Máximos Estándares y Respaldo Técnico
              </h3>
              <span className="text-[10px] text-cyan-300 font-medium">
                Protocolos Internacionales
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-300/80 leading-relaxed font-light">
              Cada especialista de <strong className="text-white font-semibold">SANIVEX</strong> opera bajo estrictos protocolos internacionales y capacitación técnica continua, garantizando un servicio de alta eficiencia adaptado a los marcos normativos más rigurosos:
            </p>

            {/* Interactive Pillar Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                const isSelected = idx === activePillar;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActivePillar(idx)}
                    className={`flex items-center gap-1.5 sm:gap-2 p-2.5 rounded-xl transition-all text-left cursor-pointer select-none border ${
                      isSelected
                        ? 'bg-sky-500/20 border-cyan-400/60 text-white shadow-[0_0_15px_rgba(97,218,251,0.2)]'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="text-[10px] sm:text-[11px] font-semibold truncate">
                      {pillar.short}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Detail Box */}
            <div className="p-3.5 rounded-xl bg-[#070e1a]/90 border border-white/10 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span className="text-xs sm:text-[13px] font-bold text-white">
                    {current.title}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-medium shrink-0">
                  {current.badgeText}
                </span>
              </div>

              <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-light">
                {current.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9.5px] sm:text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (col-span-5): Executive Diagnostic Action Card */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-gradient-to-br from-[#1c2a3e] via-[#152336] to-[#0e1928] border border-cyan-500/30 p-5 sm:p-6 rounded-2xl shadow-2xl relative overflow-hidden text-left">
          {/* Glossy top highlight */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Diagnóstico Técnico
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Atención Activa
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Iniciemos el proyecto.
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-300/90 leading-relaxed font-light">
              El primer paso es un diagnóstico integral de tu operación. Evaluamos tus instalaciones y diseñamos un ecosistema de protección preventivo a la medida de tu sector.
            </p>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-col gap-2 py-2 border-y border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span>Protocolos certificados bajo normas BPM, HACCP & INVIMA</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Respuesta técnica y visita diagnóstica en menos de 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-400 shrink-0" />
              <span>Cero paros en líneas productivas ni afectación al personal</span>
            </div>
          </div>

          {/* Manager Contact Details with Clickable links */}
          <div className="p-3 rounded-xl bg-[#09111e]/85 border border-white/10 flex flex-col gap-1.5 text-xs text-slate-300">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <span>Fernando Fernández</span>
              <span className="text-slate-500">—</span>
              <span className="text-cyan-300 font-medium">Gerente Comercial & Operativo</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-300 pt-0.5">
              <a
                href="tel:+573103387722"
                className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <Phone className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span>(+57) 310 338 7722</span>
              </a>
              <span className="text-white/20 hidden sm:inline">•</span>
              <a
                href="mailto:ventas@sanivex.com.co"
                className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <Mail className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span>ventas@sanivex.com.co</span>
              </a>
            </div>
          </div>

          {/* Diagnostic Button */}
          <button
            onClick={() => onOpenQuote('Diagnóstico Integral de Operación - Sobre Sanivex')}
            className="w-full py-3.5 px-4 rounded-xl hero-primary-btn font-extrabold text-xs sm:text-[13px] tracking-wider uppercase transition-all shadow-[0_4px_25px_rgba(97,218,251,0.35)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-white"
          >
            <span>AGENDA TU DIAGNÓSTICO</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
