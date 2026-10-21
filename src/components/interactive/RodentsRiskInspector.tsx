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
    dangerColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    title: 'Blindaje de Redes, Cableados y Tableros',
    subtitle: 'Prevención Total de Cortocircuitos e Incendios',
    threat:
      'Los roedores roen permanentemente cables de potencia y fibra óptica para desgastar sus incisivos, provocando paradas imprevistas de planta y conatos de incendio.',
    solution:
      'Instalación de barreras físicas mecánicas en pasamuros, mallas de acero inoxidable y repelentes electrostáticos en bandejas portacables.',
    imageSrc: '/images/cards/card_blindaje_roedores.jpg',
    actionLabel: 'Blindar Redes Eléctricas',
    serviceKey: 'Control de Roedores - Redes y Cables',
    badges: ['Cero Cortocircuitos', 'Norma RETIE', 'Mallas Inox'],
  },
  {
    id: 'warehouse',
    icon: Building2,
    tabLabel: 'Bodegas y Materias Primas',
    dangerLevel: '90% Sanitario',
    dangerColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    title: 'Control Estructural en Silos y Almacenes',
    subtitle: 'Protección de Inventario y Cadena de Suministro',
    threat:
      'Contaminación por orina, heces y pelos sobre materias primas y producto empacado. Riesgo inminente de decomisos y multas sanitarias de Secretarías de Salud.',
    solution:
      'Sellado perimetral no cruento de juntas constructivas, faldones de acero en puertas de andén y estaciones de captura limpia sin riesgo de toxicidad.',
    imageSrc: '/images/cards/card_roedores.jpg',
    actionLabel: 'Proteger Bodegas de Almacenamiento',
    serviceKey: 'Control de Roedores - Bodegas e Inventario',
    badges: ['Inocuidad BPM', 'Cero Contaminación', 'Sellado de Andenes'],
  },
  {
    id: 'perimeter',
    icon: Lock,
    tabLabel: 'Perímetros y Alcantarillado',
    dangerLevel: '85% Invasión Externa',
    dangerColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    title: 'Cebado Georreferenciado y Trazabilidad QR',
    subtitle: 'Dispositivos Inviolables de Doble Seguridad',
    threat:
      'Invasión continua de Rattus norvegicus proveniente de redes de alcantarillado público, canales de desagüe y zonas verdes limítrofes.',
    solution:
      'Despliegue perimetral de cajas cebadoras inviolables de polipropileno virgen de alto impacto con cerradura de seguridad y lectura digital por código QR.',
    imageSrc: '/images/cards/card_cebo_qr.jpg',
    actionLabel: 'Ver Estaciones QR Inviolables',
    serviceKey: 'Control de Roedores - Cebado Técnico',
    badges: ['Llave Inviolable', 'Monitoreo QR 24/7', 'Cero Acceso a Mascotas'],
  },
];

export const RodentsRiskInspector: React.FC<RodentsRiskInspectorProps> = ({ onOpenQuote: _onOpenQuote }) => {
  const [selectedZone, setSelectedZone] = useState(0);
  const current = ZONES[selectedZone];

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-5">
      {/* Zone selection buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-[#0d1624]/80 border border-white/10 backdrop-blur-xl">
        {ZONES.map((zone, idx) => {
          const Icon = zone.icon;
          const isActive = idx === selectedZone;
          return (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(idx)}
              className={`relative flex flex-row items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 text-left cursor-pointer select-none min-w-0 w-full ${
                isActive
                  ? 'bg-gradient-to-r from-[#2a1215] to-[#1e1017] border border-red-500/40 shadow-[0_0_25px_rgba(239,68,68,0.2)] text-white'
                  : 'hover:bg-white/5 border border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-lg transition-colors shrink-0 ${
                  isActive ? 'bg-red-500 text-white shadow-md font-bold' : 'bg-white/10 text-slate-300'
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col min-w-0 text-left flex-1">
                <span className="text-xs sm:text-xs font-bold text-white leading-tight break-words">
                  {zone.tabLabel}
                </span>
                <span className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 leading-tight break-words ${isActive ? 'text-red-300' : 'text-slate-400'}`}>
                  {zone.dangerLevel}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Box */}
      <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-[#181119]/90 to-[#0e0e15]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr] gap-6 items-center">
          {/* Left Details */}
          <div className="flex flex-col items-start text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-semibold mb-3 ${current.dangerColor}`}>
              <AlertTriangle className="h-3 w-3 shrink-0" />
              <span>Nivel de Riesgo: {current.dangerLevel}</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-red-200/80 mt-1">
              {current.subtitle}
            </p>

            {/* Threat vs Solution Comparison Box */}
            <div className="mt-4 flex flex-col gap-2.5 w-full">
              <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/20 text-left">
                <span className="text-[10px] uppercase font-bold text-red-300 tracking-wider block mb-1">
                  Amenaza Común
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {current.threat}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-left">
                <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider block mb-1">
                  Solución Técnica Sanivex
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {current.solution}
                </p>
              </div>
            </div>

            {/* Badges and action */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {current.badges.map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">
                  <CheckCircle2 className="h-3 w-3 text-red-400" />
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-400 font-light">
              <CheckCircle2 className="h-3.5 w-3.5 text-red-400 shrink-0" />
              <span>Inspección técnica y diagnóstico estructural en menos de 24 horas.</span>
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e15] via-transparent to-transparent opacity-80" />
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0e0e15]/80 backdrop-blur-md border border-white/20 text-[10px] font-bold text-slate-200 tracking-wider uppercase">
              Blindaje Activo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
