'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Sparkles, Feather } from 'lucide-react';

interface BirdsShowcaseProps {
  onOpenQuote?: (serviceName: string) => void;
}

const SYSTEMS = [
  {
    id: 'mallas',
    title: 'Mallas de Alta Tenacidad UV',
    subtitle: '100% Hermetismo Mecánico Invisible',
    badge: 'Máxima Protección Estructural',
    badgeVariant: 'blue',
    description:
      'Redes de polietileno virgen de alta densidad tratadas contra rayos UV, sujetas con guayas perimetrales en acero inox 316. Bloquean cerchas y marquesinas sin afectar la ventilación ni la iluminación natural.',
    features: ['Invisibles a media distancia', 'Cero afectación de flujo de aire', 'Garantía extendida de 5 años'],
    metric: '100% Exclusión',
    metricDesc: 'Bloqueo físico total sin daño',
    imageSrc: '/images/cards/card_mallas_aves.jpg',
    actionLabel: 'Cotizar Mallas Industriales',
    serviceKey: 'Control de Aves - Mallas',
  },
  {
    id: 'puas',
    title: 'Púas Quirúrgicas Antiposamiento',
    subtitle: 'Acero Inoxidable Grado 316 sobre Policarbonato',
    badge: 'Bienestar Animal Garantizado',
    badgeVariant: 'teal',
    description:
      'Varillas con puntas romas redondeadas montadas sobre bases flexibles con protección UV. Disuaden mecánicamente el posamiento y la anidación en cornisas, letreros corporativos y canales.',
    features: ['Puntas romas no dañinas', 'Cero corrosión en intemperie', 'Adaptables a cualquier perfil arquitectónico'],
    metric: '0% Posamiento',
    metricDesc: 'En cornisas y marquesinas',
    imageSrc: '/images/cards/card_puas_aves.jpg',
    actionLabel: 'Solicitar Púas Quirúrgicas',
    serviceKey: 'Control de Aves - Púas y Postes',
  },
  {
    id: 'laser',
    title: 'Disuasión Láser Automatizada',
    subtitle: 'Sistemas Ópticos de Barrido Perimetral',
    badge: 'Bio-tecnología de Última Generación',
    badgeVariant: 'purple',
    description:
      'Sistemas automatizados de haces de luz verde de longitud de onda específica que las aves perciben como una amenaza física inminente. Ideal para hangares, centros logísticos y silos de granos.',
    features: ['Patrón aleatorio no habituable', 'Cobertura perimetral de miles de m²', 'Silencioso y de bajo consumo'],
    metric: '24/7 Cobertura',
    metricDesc: 'En naves de gran volumen',
    imageSrc: '/images/cards/card_laser_aves.jpg',
    actionLabel: 'Ver Tecnología Láser',
    serviceKey: 'Control de Aves - Sistemas Ópticos',
  },
];

export const BirdsShowcase: React.FC<BirdsShowcaseProps> = ({ onOpenQuote: _onOpenQuote }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = SYSTEMS[activeIdx];

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-5">
      {/* System Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-[#0c1624]/80 border border-white/10 backdrop-blur-xl">
        {SYSTEMS.map((system, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={system.id}
              onClick={() => setActiveIdx(idx)}
              className={`relative flex flex-row items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 text-left cursor-pointer select-none min-w-0 w-full ${
                isActive
                  ? 'bg-gradient-to-r from-[#14283f] to-[#0f1f33] border border-cyan-400/40 shadow-[0_0_25px_rgba(97,218,251,0.2)] text-white'
                  : 'hover:bg-white/5 border border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-lg transition-colors shrink-0 ${
                  isActive ? 'bg-cyan-500 text-white shadow-md font-bold' : 'bg-white/10 text-slate-300'
                }`}
              >
                <Feather className="h-4 w-4" />
              </div>
              <div className="flex flex-col min-w-0 text-left flex-1">
                <span className="text-xs sm:text-xs font-bold text-white leading-tight break-words">
                  {system.title}
                </span>
                <span className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 leading-tight break-words ${isActive ? 'text-cyan-300' : 'text-slate-400'}`}>
                  {system.metric}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Showcase Stage Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-[#101d2d]/90 to-[#0b1420]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr] gap-6 items-center">
          {/* Left info column */}
          <div className="flex flex-col items-start text-left">
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

            {/* Feature Bullets + Metric Box */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 w-full max-w-md">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-cyan-300 tracking-tight leading-none">
                  {current.metric}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-normal">
                  {current.metricDesc}
                </span>
              </div>
              <div className="h-8 w-px bg-white/10 hidden sm:block ml-auto mr-2" />
              <div className="flex flex-col gap-1 text-[11px] text-slate-300">
                {current.features.slice(0, 2).map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300 truncate">
                    <CheckCircle2 className="h-3 w-3 text-cyan-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-400 font-light">
              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span>Sistemas de exclusión ética no cruenta con garantía de durabilidad estructural.</span>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
            <Image
              src={current.imageSrc}
              alt={current.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1420] via-transparent to-transparent opacity-80" />
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0b1420]/80 backdrop-blur-md border border-white/20 text-[10px] font-bold text-slate-200 tracking-wider uppercase">
              Exclusión Ética
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
