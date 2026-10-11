'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ShieldAlert, ArrowRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';

interface TermitesRadarProps {
  onOpenQuote: (serviceName: string) => void;
}

const LEVELS = [
  {
    id: '01',
    level: 'Nivel 01 • Detección',
    title: 'Diagnóstico Acústico y Termografía',
    subtitle: 'Localización No Destructiva de Puntos Críticos',
    badge: 'Cero Perforaciones Innecesarias',
    description:
      'Utilizamos termografía infrarroja y sensores bio-acústicos de alta sensibilidad para detectar la actividad xilófaga oculta en el interior de vigas, marcos, entrepisos y cielorrasos sin alterar la estética arquitectónica.',
    method: 'Sensores acústicos + Termografía FLIR',
    accuracy: '100% Precisión milimétrica',
    deliverable: 'Mapa térmico de actividad xilófaga',
    imageSrc: '/images/cards/card_termitas_diagnostico.jpg',
    actionLabel: 'Solicitar Diagnóstico No Destructivo',
    serviceKey: 'Termitas - Prevención y Diagnóstico',
  },
  {
    id: '02',
    level: 'Nivel 02 • Blindaje',
    title: 'Inyección y Sales de Boro',
    subtitle: 'Tratamiento Preventivo de Vigas y Cimientos',
    badge: 'Protección Estructural de Por Vida',
    description:
      'Impregnación a presión de sales de boro micro-ionizadas en elementos estructurales de madera y creación de barrera química en juntas de dilatación y cimentación para cortar los túneles de avance.',
    method: 'Inyección a presión + Sellado con polímeros',
    accuracy: 'Protección profunda de albura y duramen',
    deliverable: 'Barrera química perimetral certificada',
    imageSrc: '/images/cards/card_termitas_blindaje.jpg',
    actionLabel: 'Blindar Estructuras de Madera',
    serviceKey: 'Termitas - Elementos Estructurales',
  },
  {
    id: '03',
    level: 'Nivel 03 • Erradicación',
    title: 'Sistemas de Cebado IGR Sub-suelo',
    subtitle: 'Colapso Total de la Reina y el Termitero',
    badge: 'Erradicación Biológica Definitiva',
    description:
      'Despliegue de estaciones de monitoreo subterráneo con reguladores de crecimiento de insectos (IGR). Las termitas obreras transportan el principio activo al nido, impidiendo la muda y extinguiendo la colonia.',
    method: 'Inhibidores de síntesis de quitina (IGR)',
    accuracy: 'Eliminación completa de la reina',
    deliverable: 'Certificado de erradicación total',
    imageSrc: '/images/termite_macro.jpg',
    actionLabel: 'Erradicar Colonias Subterráneas',
    serviceKey: 'Termitas - Erradicación',
  },
];

export const TermitesRadar: React.FC<TermitesRadarProps> = ({ onOpenQuote }) => {
  const [activeLevel, setActiveLevel] = useState(0);
  const current = LEVELS[activeLevel];

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-5">
      {/* Light-themed level selector */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-md">
        {LEVELS.map((item, idx) => {
          const isActive = idx === activeLevel;
          return (
            <button
              key={item.id}
              onClick={() => setActiveLevel(idx)}
              className={`relative flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 px-2 sm:px-4 py-2 sm:py-3 rounded-xl transition-all duration-300 text-left cursor-pointer select-none ${
                isActive
                  ? 'bg-white border border-amber-500/30 shadow-[0_4px_15px_rgba(217,119,6,0.15)] text-slate-900'
                  : 'hover:bg-slate-200/60 border border-transparent text-slate-600'
              }`}
            >
              <div
                className={`flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-lg font-bold text-xs transition-colors shrink-0 ${
                  isActive ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {item.id}
              </div>
              <div className="flex flex-col min-w-0 text-center sm:text-left">
                <span className="text-[10px] sm:text-xs font-bold text-slate-900 truncate">
                  {item.title.split(' ')[0]} {item.title.split(' ')[1] || ''}
                </span>
                <span className={`text-[9px] sm:text-[10px] font-semibold truncate ${isActive ? 'text-amber-700' : 'text-slate-500'}`}>
                  {item.level.split('•')[1]?.trim() || ''}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Light Stage Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr] gap-6 items-center">
          {/* Left info column */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-semibold text-amber-800 mb-3 shadow-xs">
              <Sparkles className="h-3 w-3 text-amber-600" />
              <span>{current.badge}</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#09111c] tracking-tight leading-snug">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-amber-700 mt-1">
              {current.subtitle}
            </p>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-xl">
              {current.description}
            </p>

            {/* Technical specs pill */}
            <div className="mt-4 grid grid-cols-2 gap-2.5 w-full max-w-md">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">Método</span>
                <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">{current.method}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60">
                <span className="text-[10px] text-amber-700 uppercase tracking-wider block font-medium">Entregable</span>
                <span className="text-xs font-bold text-amber-900 mt-0.5 block truncate">{current.deliverable}</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-5 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onOpenQuote(current.serviceKey)}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#09111c] hover:bg-[#142235] font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_4px_18px_rgba(9,17,28,0.25)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-white"
              >
                <span>{current.actionLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="text-[11px] text-slate-500 font-normal">
                Inspección no invasiva para residencias y empresas.
              </span>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square w-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg group">
            <Image
              src={current.imageSrc}
              alt={current.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] font-bold text-slate-800 tracking-wider uppercase shadow-xs">
              {current.level.split('•')[0]?.trim()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
