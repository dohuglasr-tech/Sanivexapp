'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ShieldCheck,
  Award,
  Activity,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
  Target,
  Cpu,
  Leaf,
  Calendar,
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
    <div className="w-full h-full flex flex-col justify-between max-w-7xl mx-auto py-2 lg:py-0">
      {/* Top Header Section */}
      <div className="flex flex-col gap-1.5 mb-2 sm:mb-3">
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

      {/* Main Grid: Left Narrative & Pillars | Right Diagnostic Card & Specialists Lineup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-stretch flex-1 min-h-0">
        {/* Left Column (col-span-7): Corporate Manifesto + Pillars */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-3 bg-[#0a1220]/70 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
          {/* Subtle Ambient glow inside card */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-sky-500/10 blur-[90px] pointer-events-none" />

          {/* Statement Paragraphs */}
          <div className="flex flex-col gap-2 sm:gap-2.5 relative z-10">
            <p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed font-normal">
              Es una compañía especializada en <span className="text-white font-semibold">Sanidad Ambiental y Control Integrado de Plagas (MIP)</span>, dedicada a la protección integral de entornos corporativos, industriales, comerciales y residenciales.
            </p>

            <p className="text-xs sm:text-[13px] text-slate-300/80 leading-relaxed font-light hidden sm:block">
              Diseñamos ecosistemas de protección preventivos, inteligentes y personalizados, garantizando la continuidad operativa y la bioseguridad en cada espacio.
            </p>

            <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-blue-950/60 to-[#0e1d33]/60 border border-cyan-500/25 text-xs sm:text-[12.5px] leading-relaxed">
              <span className="font-bold text-white tracking-wide">Tu operación segura, nuestra razón de ser</span>
              <span className="text-slate-300">, nos posicionamos como un aliado estratégico que combina precisión técnica, conciencia biológica y tecnología de vanguardia.</span>
            </div>
          </div>

          {/* Subsection: Máximos Estándares y Respaldo Técnico */}
          <div className="flex flex-col gap-2 relative z-10 pt-2 border-t border-white/10">
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
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1">
              {PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                const isSelected = idx === activePillar;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActivePillar(idx)}
                    className={`flex items-center gap-1.5 sm:gap-2 p-2 rounded-xl transition-all text-left cursor-pointer select-none border ${
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
            <div className="p-3 rounded-xl bg-[#070e1a]/90 border border-white/10 flex flex-col gap-2">
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

        {/* Right Column (col-span-5): Diagnostic Action Card + Technicians Lineup */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3 h-full">
          {/* Executive Diagnostic Action Card (Exact Flyer Match) */}
          <div className="rounded-2xl bg-gradient-to-br from-[#1c2a3e] via-[#152336] to-[#0e1928] border border-cyan-500/30 p-4 sm:p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between gap-3">
            {/* Glossy top highlight */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Diagnóstico Técnico
                </span>
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" title="Especialistas Disponibles" />
              </div>

              <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-white tracking-tight">
                Iniciemos el proyecto.
              </h3>
              <p className="text-xs text-slate-300/90 leading-snug font-light mt-0.5">
                El primer paso es un diagnóstico integral de tu operación.
              </p>
            </div>

            {/* Manager Contact Details with Clickable links */}
            <div className="p-2.5 rounded-xl bg-[#09111e]/80 border border-white/10 flex flex-col gap-1 text-[11px] sm:text-xs text-slate-300">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <span>Fernando Fernández</span>
                <span className="text-slate-500">—</span>
                <span className="text-cyan-300 font-medium">Gerente</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-300 pt-0.5">
                <a
                  href="tel:+573103387722"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Phone className="h-3 w-3 text-cyan-400 shrink-0" />
                  <span>(+57) 310 338 7722</span>
                </a>
                <span className="text-white/20 hidden sm:inline">•</span>
                <a
                  href="mailto:ventas@sanivex.com.co"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Mail className="h-3 w-3 text-cyan-400 shrink-0" />
                  <span>ventas@sanivex.com.co</span>
                </a>
              </div>
            </div>

            {/* Diagnostic Button */}
            <button
              onClick={() => onOpenQuote('Diagnóstico Integral de Operación - Sobre Sanivex')}
              className="w-full py-3 px-4 rounded-xl hero-primary-btn font-extrabold text-xs sm:text-[13px] tracking-wider uppercase transition-all shadow-[0_4px_25px_rgba(97,218,251,0.35)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-white"
            >
              <span>AGENDA TU DIAGNÓSTICO</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Technicians Lineup Card with Ambient Backlight */}
          <div className="flex-1 rounded-2xl bg-[#0a1220]/60 border border-white/10 p-3 sm:p-4 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group">
            {/* Radial backlight for the technicians */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(97,218,251,0.18)_0%,rgba(10,56,113,0.15)_45%,transparent_75%)] pointer-events-none" />

            <div className="flex items-center justify-between relative z-10 mb-1">
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-cyan-400" />
                Equipo Técnico Certificado
              </span>
              <span className="text-[10px] text-slate-400">
                7 Especialistas Multidisciplinarios
              </span>
            </div>

            {/* Transparent Team Lineup Image */}
            <div className="relative w-full aspect-[450/240] sm:aspect-[450/220] flex items-end justify-center overflow-hidden my-auto z-10">
              <Image
                src="/images/Propias/sanivex_team_transparent.webp"
                alt="Equipo de Especialistas Sanivex - Sanidad Ambiental y Control de Plagas"
                fill
                quality={98}
                className="object-contain object-bottom drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] filter contrast-[1.05]"
              />
            </div>

            {/* Badges bar under the team */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[10.5px] text-slate-400 relative z-10">
              <span className="flex items-center gap-1 text-slate-300">
                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                Dotación & EPP Normativo
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <CheckCircle2 className="h-3 w-3 text-cyan-400 shrink-0" />
                Cobertura Nacional 24/7
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Official Footer Bar Matching Flyer */}
      <footer className="w-full pt-3 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-400 gap-2 sm:gap-3 relative z-10 mt-2 sm:mt-3">
        {/* Left: Brand name */}
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-white tracking-widest text-xs sm:text-sm">
            SANIVEX
          </span>
          <span className="text-white/20">•</span>
          <span className="text-slate-300 font-medium text-[11px]">
            Sanidad Ambiental & MIP
          </span>
        </div>

        {/* Middle: National Coverage */}
        <div className="hidden md:flex items-center gap-2 text-slate-400 text-[11px]">
          <span className="text-slate-300">Bogotá D.C.</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-300">Medellín</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-300">Cali</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-300">Barranquilla</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-300">Bucaramanga</span>
        </div>

        {/* Right: Official domain link */}
        <div className="flex items-center gap-2">
          <a
            href="https://www.sanivex.com.co"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold tracking-widest text-slate-200 hover:text-cyan-300 transition-colors uppercase text-[11px] sm:text-xs"
          >
            WWW.SANIVEX.COM.CO
          </a>
        </div>
      </footer>
    </div>
  );
};
