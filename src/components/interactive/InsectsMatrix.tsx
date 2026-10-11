'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Bug, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Clock, Zap } from 'lucide-react';

interface InsectsMatrixProps {
  onOpenQuote: (serviceName: string) => void;
}

const SPECIMENS = [
  {
    id: 'cucarachas',
    name: 'Cucarachas',
    scientific: 'Blattella germanica / Periplaneta',
    badge: 'Muy común en gastronomía',
    badgeVariant: 'amber',
    subtitle: 'Micro-geles de Efecto Cascada',
    description:
      'Erradicación selectiva mediante geles biorracionales apetentes de última generación. Los individuos contaminados retornan al nido y eliminan la colonia por efecto dominó, sin necesidad de suspender operaciones.',
    techMethod: 'Geles termo-estables + Aspersión focalizada',
    reentryTime: 'Reingreso Inmediato (Cero Olores)',
    effectiveness: '99.7% Erradicación en 48h',
    imageSrc: '/images/cards/card_cucarachas.jpg',
    actionLabel: 'Solicitar Tratamiento para Cucarachas',
    serviceKey: 'Control de Insectos - Cucarachas',
  },
  {
    id: 'chinches',
    name: 'Chinches de Cama',
    scientific: 'Cimex lectularius',
    badge: 'Alta complejidad hotelera',
    badgeVariant: 'purple',
    subtitle: 'Choque Térmico + Micro-encapsulado',
    description:
      'Protocolo profundo que combina choque térmico con vapor seco sobrecalentado a 180°C para destruir huevos y ninfas, complementado con producto micro-encapsulado en zócalos y molduras.',
    techMethod: 'Vapor seco > 180°C + Aspersión residual',
    reentryTime: '< 3 horas para reocupación de habitaciones',
    effectiveness: '100% Destrucción de huevos',
    imageSrc: '/images/cards/card_chinches.jpg',
    actionLabel: 'Solicitar Tratamiento para Chinches',
    serviceKey: 'Control de Insectos - Chinches',
  },
  {
    id: 'voladores',
    name: 'Moscas y Voladores',
    scientific: 'Musca domestica & Dípteros',
    badge: 'Normatividad BPM & Inocuidad',
    badgeVariant: 'emerald',
    subtitle: 'Lámparas Atrapainsectos UV Inastillables',
    description:
      'Dispositivos con tubos UV con protección inastillable (shatterproof) y láminas adhesivas con feromonas de atracción. Cero fragmentación ni electrocución cerca de áreas de procesamiento.',
    techMethod: 'Atracción UV + Adhesivo de alta retención',
    reentryTime: 'Operación continua 24/7',
    effectiveness: 'Monitoreo y conteo semanal',
    imageSrc: '/images/cards/card_voladores.jpg',
    actionLabel: 'Instalar Lámparas UV Industriales',
    serviceKey: 'Control de Insectos - Voladores',
  },
];

export const InsectsMatrix: React.FC<InsectsMatrixProps> = ({ onOpenQuote }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = SPECIMENS[selectedIdx];

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-5">
      {/* Specimen chips bar */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-[#0e1927]/80 border border-white/10 backdrop-blur-xl">
        {SPECIMENS.map((specimen, idx) => {
          const isActive = idx === selectedIdx;
          return (
            <button
              key={specimen.id}
              onClick={() => setSelectedIdx(idx)}
              className={`relative flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 px-2 sm:px-4 py-2 sm:py-3 rounded-xl transition-all duration-300 text-left cursor-pointer select-none ${
                isActive
                  ? 'bg-gradient-to-r from-[#0d2a23] to-[#0a1e1b] border border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.2)] text-white'
                  : 'hover:bg-white/5 border border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-lg transition-colors shrink-0 ${
                  isActive ? 'bg-emerald-500 text-white shadow-md' : 'bg-white/10 text-slate-300'
                }`}
              >
                <Bug className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col min-w-0 text-center sm:text-left">
                <span className="text-[10px] sm:text-xs font-bold text-white truncate">
                  {specimen.name}
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 italic truncate hidden sm:block">
                  {specimen.scientific}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Specimen Display Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-[#0e1d1b]/90 to-[#091414]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr] gap-6 items-center">
          {/* Left Details */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[11px] font-semibold text-emerald-300 mb-3">
              <Sparkles className="h-3 w-3 text-emerald-400" />
              <span>{current.badge}</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {current.name} • <span className="text-emerald-400 font-light text-lg sm:text-xl">{current.subtitle}</span>
            </h3>
            <span className="text-xs text-slate-400 italic font-mono mt-0.5">
              Clasificación: {current.scientific}
            </span>

            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-xl">
              {current.description}
            </p>

            {/* Quick Specs Grid */}
            <div className="mt-4 grid grid-cols-2 gap-2.5 w-full max-w-md">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Método Técnico</span>
                <span className="text-xs font-semibold text-slate-200 mt-0.5 block truncate">{current.techMethod}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Tiempo Reingreso</span>
                <span className="text-xs font-semibold text-emerald-300 mt-0.5 block truncate">{current.reentryTime}</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-5 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onOpenQuote(current.serviceKey)}
                className="w-full sm:w-auto py-3 px-6 rounded-xl hero-primary-btn font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-white"
              >
                <span>{current.actionLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="text-[11px] text-slate-400 font-light">
                Certificado oficial INVIMA incluido.
              </span>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
            <Image
              src={current.imageSrc}
              alt={current.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091414] via-transparent to-transparent opacity-80" />
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#091414]/80 backdrop-blur-md border border-white/20 text-[10px] font-bold text-slate-200 tracking-wider uppercase">
              Control Biorracional
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
