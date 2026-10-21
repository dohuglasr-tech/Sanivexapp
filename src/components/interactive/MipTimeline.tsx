'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

interface MipTimelineProps {
  onOpenQuote?: (serviceName: string) => void;
}

const PHASES = [
  {
    id: '01',
    badge: 'Fase 01 • Diagnóstico',
    badgeVariant: 'blue',
    title: 'Evaluación y Mapeo Digital',
    subtitle: 'Inspección No Destructiva de Puntos Ciegos',
    description:
      'Inspección termográfica y mapeo digital de vulnerabilidades estructurales para neutralizar riesgos antes de que se manifiesten.',
    metric: '100% Mapeo',
    metricLabel: 'Puntos ciegos identificados',
    deliverables: ['Mapeo de accesos críticos', 'Análisis de vectores en el área', 'Plan de intervención sin paro de planta'],
    imageSrc: '/images/hero_technician.jpg',
    actionLabel: 'Consultar Diagnóstico Inicial',
    serviceKey: 'MIP - Fase Diagnóstico',
  },
  {
    id: '02',
    badge: 'Fase 02 • Monitoreo',
    badgeVariant: 'amber',
    title: 'Conservación Activa y Monitoreo',
    subtitle: 'Protección de Infraestructura y Redes Críticas',
    description:
      'Blindaje continuo de bandejas eléctricas y maquinaria pesada con dispositivos de captura digital y trazabilidad preventiva.',
    metric: '0% Paradas',
    metricLabel: 'En líneas de producción',
    deliverables: ['Cebado técnico inviolable', 'Monitoreo preventivo 24/7', 'Protección de racks y tableros'],
    imageSrc: '/images/cards/card_blindaje_roedores.jpg',
    actionLabel: 'Conocer Tecnología de Monitoreo',
    serviceKey: 'MIP - Fase Monitoreo',
  },
  {
    id: '03',
    badge: 'Fase 03 • Normatividad',
    badgeVariant: 'emerald',
    title: 'Blindaje Sanitario y Certificación',
    subtitle: 'Cumplimiento Estricto BPM, HACCP & INVIMA',
    description:
      'Garantía de aprobación ante Secretarías de Salud mediante actas técnicas digitales, fichas técnicas y protocolos biorracionales certificados.',
    metric: '100% Auditoría',
    metricLabel: 'Aprobación INVIMA & BPM',
    deliverables: ['Actas digitales al instante', 'Fichas técnicas con código QR', 'Certificado oficial de sanidad ambiental'],
    imageSrc: '/images/sanitization_clean.jpg',
    actionLabel: 'Solicitar Auditoría Sanitaria',
    serviceKey: 'MIP - Fase Normatividad',
  },
];

export const MipTimeline: React.FC<MipTimelineProps> = ({ onOpenQuote: _onOpenQuote }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = PHASES[activeIdx];

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-5">
      {/* Interactive Step Navigator / Liquid Timeline Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-[#0b1422]/80 border border-white/10 backdrop-blur-xl shadow-xl">
        {PHASES.map((phase, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={phase.id}
              onClick={() => setActiveIdx(idx)}
              className={`relative flex flex-row items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 text-left cursor-pointer select-none min-w-0 w-full ${
                isActive
                  ? 'bg-gradient-to-r from-[#172b44] to-[#122238] border border-cyan-400/40 shadow-[0_0_25px_rgba(97,218,251,0.2)] text-white'
                  : 'hover:bg-white/5 border border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-lg font-black text-xs transition-colors shrink-0 ${
                  isActive ? 'bg-cyan-500 text-white shadow-md' : 'bg-white/10 text-slate-300'
                }`}
              >
                {phase.id}
              </div>
              <div className="flex flex-col min-w-0 text-left flex-1">
                <span className="text-xs sm:text-xs font-bold text-white leading-tight break-words">
                  {phase.title}
                </span>
                <span className={`text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold mt-0.5 leading-tight break-words ${isActive ? 'text-cyan-300' : 'text-slate-400'}`}>
                  {idx === 0 ? 'Fase 01 • Diagnóstico' : idx === 1 ? 'Fase 02 • Monitoreo' : 'Fase 03 • Blindaje'}
                </span>
              </div>
              {isActive && (
                <div className="hidden lg:flex ml-auto items-center">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic Interactive Stage Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-[#0f1d2e]/90 to-[#0a1320]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-5 sm:p-7 transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr] gap-6 items-center">
          {/* Left info column */}
          <div className="flex flex-col items-start text-left">
            {/* Badge pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-[11px] font-semibold text-cyan-300 mb-3">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              <span>{current.badge}</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-cyan-200/80 mt-1">
              {current.subtitle}
            </p>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-xl">
              {current.description}
            </p>

            {/* Metric highlight box */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-2.5 px-3.5 sm:px-4 rounded-xl bg-white/5 border border-white/10 w-full max-w-md">
              <div className="flex flex-col shrink-0">
                <span className="text-xl sm:text-2xl font-black text-cyan-300 tracking-tight leading-none break-words">
                  {current.metric}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-normal break-words">
                  {current.metricLabel}
                </span>
              </div>
              <div className="h-8 w-px bg-white/10 hidden sm:block ml-auto mr-2" />
              <div className="flex flex-col gap-1 text-[11px] text-slate-300 min-w-0 flex-1">
                {current.deliverables.slice(0, 2).map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300 min-w-0">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Guarantee and protocol notice */}
            <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-400 font-light">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span>Respuesta técnica en &lt; 24h con acta digital preliminar de inspección.</span>
            </div>
          </div>

          {/* Right Image Feature with Ambient Ring */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
            <Image
              src={current.imageSrc}
              alt={current.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient wash */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1320] via-transparent to-transparent opacity-80" />
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0a1320]/80 backdrop-blur-md border border-white/20 text-[10px] font-bold text-slate-200 tracking-wider uppercase">
              Fase {current.id} en Acción
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
