'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AlertTriangle, Zap, Building2, CheckCircle2, Lock } from 'lucide-react';

interface RodentsRiskInspectorProps {
  onOpenQuote?: (serviceName: string) => void;
}

const ZONES = [
  {
    id: 'electric',
    icon: Zap,
    tabLabel: 'Redes y Racks Eléctricos',
    dangerLevel: '95% Crítico',
    dangerColor: 'text-red-800 bg-red-50 border-red-200',
    title: 'Protección Mecánica de Redes y Tableros',
    subtitle: 'Mitigación Progresiva de Riesgos Eléctricos',
    threat:
      'Los roedores roen permanentemente cables de potencia y fibra óptica para desgastar sus incisivos, provocando paradas imprevistas de planta y conatos de incendio.',
    solution:
      'Instalación de barreras físicas mecánicas en pasamuros, mallas de acero inoxidable y repelentes electrostáticos en bandejas portacables.',
    imageSrc: '/images/cards/card_blindaje_roedores.jpg',
    actionLabel: 'Proteger Redes Eléctricas',
    serviceKey: 'Control de Roedores - Redes y Cables',
    badges: ['Reducción de Riesgos', 'Norma RETIE', 'Mallas Inox'],
  },
  {
    id: 'warehouse',
    icon: Building2,
    tabLabel: 'Bodegas y Materias Primas',
    dangerLevel: '90% Sanitario',
    dangerColor: 'text-amber-800 bg-amber-50 border-amber-200',
    title: 'Control Estructural en Silos y Almacenes',
    subtitle: 'Protección de Inventario y Cadena de Suministro',
    threat:
      'Contaminación por orina, heces y pelos sobre materias primas y producto empacado. Riesgo inminente de decomisos y multas sanitarias de Secretarías de Salud.',
    solution:
      'Sellado perimetral no cruento de juntas constructivas, faldones de acero en puertas de andén y estaciones de captura limpia sin riesgo de toxicidad.',
    imageSrc: '/images/cards/card_roedores.jpg',
    actionLabel: 'Proteger Bodegas de Almacenamiento',
    serviceKey: 'Control de Roedores - Bodegas e Inventario',
    badges: ['Inocuidad BPM', 'Prevención de Contaminación', 'Sellado de Andenes'],
  },
  {
    id: 'perimeter',
    icon: Lock,
    tabLabel: 'Perímetros y Alcantarillado',
    dangerLevel: '85% Invasión Externa',
    dangerColor: 'text-purple-800 bg-purple-50 border-purple-200',
    title: 'Cebado Georreferenciado y Trazabilidad QR',
    subtitle: 'Dispositivos Inviolables de Doble Seguridad',
    threat:
      'Invasión continua de Rattus norvegicus proveniente de redes de alcantarillado público, canales de desagüe y zonas verdes limítrofes.',
    solution:
      'Despliegue perimetral de cajas cebadoras inviolables de polipropileno virgen de alto impacto con cerradura de seguridad y lectura digital por código QR.',
    imageSrc: '/images/cards/card_cebo_qr.jpg',
    actionLabel: 'Ver Estaciones QR Inviolables',
    serviceKey: 'Control de Roedores - Cebado Técnico',
    badges: ['Llave Inviolable', 'Monitoreo QR 24/7', 'Protección para Mascotas'],
  },
];

export const RodentsRiskInspector: React.FC<RodentsRiskInspectorProps> = ({ onOpenQuote: _onOpenQuote }) => {
  const [selectedZone, setSelectedZone] = useState(0);
  const current = ZONES[selectedZone];

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-5">
      {/* Zone selection buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-md">
        {ZONES.map((zone, idx) => {
          const Icon = zone.icon;
          const isActive = idx === selectedZone;
          return (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(idx)}
              className={`relative flex flex-row items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 text-left cursor-pointer select-none min-w-0 w-full ${
                isActive
                  ? 'bg-white border border-red-500/30 shadow-[0_4px_15px_rgba(239,68,68,0.15)] text-slate-900'
                  : 'hover:bg-slate-200/60 border border-transparent text-slate-600'
              }`}
            >
              <div
                className={`flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-lg font-bold text-xs transition-colors shrink-0 ${
                  isActive ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-200 text-slate-700'
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col min-w-0 text-left flex-1">
                <span className="text-xs sm:text-xs font-bold text-slate-900 leading-tight break-words">
                  {zone.tabLabel}
                </span>
                <span className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 leading-tight break-words ${isActive ? 'text-red-700' : 'text-slate-500'}`}>
                  {zone.dangerLevel}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Box */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr] gap-6 items-center">
          {/* Left Details */}
          <div className="flex flex-col items-start text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-semibold mb-3 shadow-xs ${current.dangerColor}`}>
              <AlertTriangle className="h-3 w-3 shrink-0" />
              <span>Nivel de Riesgo: {current.dangerLevel}</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#09111c] tracking-tight leading-snug">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-red-600 mt-1">
              {current.subtitle}
            </p>

            {/* Threat vs Solution Comparison Box */}
            <div className="mt-4 flex flex-col gap-2.5 w-full">
              <div className="p-3 rounded-xl bg-red-50/70 border border-red-200/70 text-left">
                <span className="text-[10px] uppercase font-bold text-red-800 tracking-wider block mb-1">
                  Amenaza Común
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {current.threat}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70 text-left">
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block mb-1">
                  Solución Técnica Sanivex
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {current.solution}
                </p>
              </div>
            </div>

            {/* Badges and action */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {current.badges.map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[10px] text-slate-700 font-medium">
                  <CheckCircle2 className="h-3 w-3 text-red-600" />
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-500 font-normal">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span>Inspección técnica inicial y plan progresivo sujeto a consecutividad y seguimiento conjunto.</span>
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] font-bold text-slate-800 tracking-wider uppercase shadow-xs">
              Control Técnico Activo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
