'use client';

import React, { useState } from 'react';
import {
  Award,
  Activity,
  Phone,
  Mail,
  CheckCircle2,
  Target,
  Leaf,
  Calendar,
  ShieldCheck,
  Clock,
} from 'lucide-react';

interface AboutSanivexProps {
  onOpenQuote?: (serviceName: string) => void;
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
    badgeText: 'Acompañamiento en Auditorías',
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

export const AboutSanivex: React.FC<AboutSanivexProps> = ({ onOpenQuote: _onOpenQuote }) => {
  const [activePillar, setActivePillar] = useState<number>(0);
  const current = PILLARS[activePillar];

  return (
    <div className="w-full flex flex-col justify-center max-w-7xl mx-auto py-2">
      {/* Top Header Section */}
      <div className="flex flex-col gap-1.5 mb-3 sm:mb-4 text-left">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-[11px] font-semibold text-white backdrop-blur-md shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300"></span>
            </span>
            ¿Quiénes somos?
          </div>
          <span className="text-white/30 text-xs hidden sm:inline">•</span>
          <span className="text-slate-200 text-xs font-semibold tracking-wider uppercase hidden sm:inline">
            Perfil Institucional & Respaldo
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
          SOBRE SANIVEX
        </h2>
      </div>

      {/* Main Grid: Left Narrative & Pillars | Right Diagnostic Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        {/* Left Column (col-span-7): Corporate Manifesto + Pillars */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4 bg-[#091526]/85 border border-white/20 rounded-2xl p-5 sm:p-6 backdrop-blur-2xl shadow-[0_25px_60px_rgba(10,20,35,0.4)] overflow-hidden relative group text-left">
          {/* Subtle Ambient glow inside card */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-sky-500/10 blur-[90px] pointer-events-none" />

          {/* Statement Paragraphs */}
          <div className="flex flex-col gap-2.5 relative z-10">
            <p className="text-xs sm:text-[13px] text-slate-100 leading-relaxed font-normal">
              Es una compañía especializada en <span className="text-white font-semibold underline decoration-cyan-400/40 underline-offset-2">Sanidad Ambiental y Control Integrado de Plagas (MIP)</span>, dedicada a la protección integral de entornos corporativos, industriales, comerciales y residenciales.
            </p>

            <p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed font-light">
              Diseñamos ecosistemas de protección preventivos, inteligentes y personalizados, garantizando la continuidad operativa y la bioseguridad en cada espacio.
            </p>

            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-950/90 to-[#0e1d33]/90 border border-cyan-400/35 text-xs sm:text-[12.5px] leading-relaxed shadow-sm">
              <span className="font-bold text-white tracking-wide">Tu operación segura, nuestra razón de ser</span>
              <span className="text-slate-200">, nos posicionamos como un aliado estratégico que combina precisión técnica, conciencia biológica y tecnología de vanguardia.</span>
            </div>
          </div>

          {/* Subsection: Máximos Estándares y Respaldo Técnico */}
          <div className="flex flex-col gap-2.5 relative z-10 pt-3 border-t border-white/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-cyan-300" />
                Máximos Estándares y Respaldo Técnico
              </h3>
              <span className="text-[10px] text-cyan-200 font-semibold">
                Protocolos Internacionales
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-200/90 leading-relaxed font-light">
              Cada especialista de <strong className="text-white font-semibold">SANIVEX</strong> opera bajo estrictos protocolos internacionales y capacitación técnica continua, garantizando un servicio de alta eficiencia adaptado a los marcos normativos más rigurosos:
            </p>

            {/* Interactive Pillar Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                const isSelected = idx === activePillar;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActivePillar(idx)}
                    className={`flex items-center gap-2.5 sm:gap-2 px-3 py-2.5 rounded-xl transition-all text-left cursor-pointer select-none border min-w-0 w-full ${
                      isSelected
                        ? 'bg-sky-500/30 border-cyan-300 text-white shadow-[0_0_15px_rgba(97,218,251,0.25)]'
                        : 'bg-white/10 border-white/10 text-slate-200 hover:text-white hover:bg-white/15'
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-cyan-300' : 'text-slate-300'}`} />
                    <span className="text-xs sm:text-[11px] font-semibold leading-snug break-words flex-1 min-w-0">
                      {pillar.short}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Detail Box */}
            <div className="p-3.5 rounded-xl bg-[#060e1a]/95 border border-white/15 flex flex-col gap-2 shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 shrink-0" />
                  <span className="text-xs sm:text-[13px] font-bold text-white break-words">
                    {current.title}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 font-semibold shrink-0 self-start sm:self-auto">
                  {current.badgeText}
                </span>
              </div>

              <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed font-light">
                {current.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9.5px] sm:text-[10px] px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-slate-200 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (col-span-5): Executive Diagnostic Action Card */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-gradient-to-br from-[#122338]/95 via-[#0e1c2e]/95 to-[#091523]/95 border border-cyan-400/40 p-5 sm:p-6 rounded-2xl shadow-[0_25px_60px_rgba(10,20,35,0.4)] relative overflow-hidden text-left">
          {/* Glossy top highlight */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
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
            <p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed font-light">
              El primer paso es un diagnóstico integral de tu operación. Evaluamos tus instalaciones y diseñamos un plan de control progresivo, donde la consecutividad de las visitas y el seguimiento conjunto garantizan resultados sostenibles.
            </p>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-col gap-2 py-2 border-y border-white/15 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-300 shrink-0" />
              <span>Protocolos certificados bajo normas BPM, HACCP & INVIMA</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Respuesta técnica y visita diagnóstica oportuna</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-300 shrink-0" />
              <span>Mínimo impacto operativo: servicios adaptados a tus turnos de trabajo</span>
            </div>
          </div>

          {/* Manager Contact Details with Clickable links */}
          <div className="p-3 rounded-xl bg-[#07111e]/90 border border-white/15 flex flex-col gap-1.5 text-xs text-slate-200">
            <div className="font-semibold text-white flex flex-wrap items-center gap-1.5 break-words">
              <span>Fernando Fernández</span>
              <span className="text-slate-400">—</span>
              <span className="text-cyan-300 font-medium break-words">Gerente Comercial & Operativo</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-200 pt-0.5">
              <a
                href="tel:+573103387722"
                className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <Phone className="h-3.5 w-3.5 text-cyan-300 shrink-0" />
                <span>(+57) 310 338 7722</span>
              </a>
              <span className="text-white/30 hidden sm:inline">•</span>
              <a
                href="mailto:ventas@sanivex.com.co"
                className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <Mail className="h-3.5 w-3.5 text-cyan-300 shrink-0" />
                <span>ventas@sanivex.com.co</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
