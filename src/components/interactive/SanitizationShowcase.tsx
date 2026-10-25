'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Stethoscope, Factory, CheckCircle2, ShieldCheck, Wind } from 'lucide-react';

interface SanitizationShowcaseProps {
  onOpenQuote?: (serviceName: string) => void;
}

const TREATMENTS = [
  {
    id: 'ulv',
    icon: Wind,
    tabLabel: 'Micro-Nebulización ULV',
    level: 'Amplio Espectro',
    levelColor: 'text-teal-300 bg-teal-500/10 border-teal-500/30',
    title: 'Micro-Nebulización ULV en Frío',
    subtitle: 'Desinfección Ambiental de Ultra Bajo Volumen',
    threat:
      'Dispersión y acumulación de bacterias, hongos patógenos y virus aerosolizados en ductos de aire acondicionado, salas de reuniones y zonas comunes cerradas.',
    solution:
      'Generación de niebla fría con micro-gotas calibradas de 10 a 30 micras. Cobertura tridimensional sin condensación que protege equipos electrónicos y documentación.',
    techMethod: 'Nebulizador ULV en Frío',
    reentryTime: '< 2 Horas',
    imageSrc: '/images/sanitization_clean.jpg',
    serviceKey: 'Sanitización - Micro-Nebulización ULV en Frío',
    badges: ['Gotas 10-30μm', 'Baja Humedad en Racks', 'Norma INVIMA & MinSalud'],
  },
  {
    id: 'quirurgica',
    icon: Stethoscope,
    tabLabel: 'Desinfección Quirúrgica',
    level: 'Grado Hospitalario',
    levelColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
    title: 'Desinfección Quirúrgica de Alto Nivel',
    subtitle: 'Protocolos Asépticos en Salas Blancas y Plantas',
    threat:
      'Riesgo crítico de contaminación cruzada microbiana en laboratorios farmacéuticos, centrales de mezclas y líneas de empaque de alimentos perecederos.',
    solution:
      'Aplicación focalizada de amonios cuaternarios de 5ta generación y peróxido acelerado. Acción residual antimicrobiana con certificación para auditorías HACCP/BPM.',
    techMethod: 'Aspersión Quirúrgica & Frotado',
    reentryTime: 'Reingreso Inmediato',
    imageSrc: '/images/hero_technician.jpg',
    serviceKey: 'Sanitización - Desinfección Quirúrgica de Alto Nivel',
    badges: ['5ta Generación', 'Aprobado INVIMA', 'No Corrosivo'],
  },
  {
    id: 'termonebulizacion',
    icon: Factory,
    tabLabel: 'Termonebulización Masiva',
    level: 'Espacios Industriales',
    levelColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
    title: 'Termonebulización de Grandes Espacios',
    subtitle: 'Penetración Profunda en Alturas y Bodegas',
    threat:
      'Inaccesibilidad manual para desinfectar techumbres, estructuras superiores, silos y áreas de almacenamiento con más de 8 metros de altura libre.',
    solution:
      'Propulsión de niebla térmica de máxima densidad y suspensión prolongada. Penetración capilar en juntas estructurales y rincones inaccesibles de la infraestructura.',
    techMethod: 'Termonebulizador Industrial',
    reentryTime: '< 3 Horas',
    imageSrc: '/images/cards/card_blindaje_roedores.jpg',
    serviceKey: 'Sanitización - Termonebulización Masiva',
    badges: ['Alta Penetración', 'Grandes Alturas', 'Acta Digital Certificada'],
  },
];

export const SanitizationShowcase: React.FC<SanitizationShowcaseProps> = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = TREATMENTS[selectedIdx];

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-5">
      {/* Treatment selection buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-[#0c1624]/90 border border-white/20 backdrop-blur-2xl shadow-2xl">
        {TREATMENTS.map((treatment, idx) => {
          const Icon = treatment.icon;
          const isActive = idx === selectedIdx;
          return (
            <button
              key={treatment.id}
              onClick={() => setSelectedIdx(idx)}
              className={`relative flex flex-row items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 text-left cursor-pointer select-none min-w-0 w-full ${
                isActive
                  ? 'bg-gradient-to-r from-[#0d2a2f] to-[#0a1e24] border border-teal-500/50 shadow-[0_0_25px_rgba(20,184,166,0.25)] text-white'
                  : 'hover:bg-white/10 border border-transparent text-slate-300 hover:text-white'
              }`}
            >
              <div
                className={`flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-lg transition-colors shrink-0 ${
                  isActive ? 'bg-teal-400 text-slate-950 shadow-md font-bold' : 'bg-white/10 text-slate-300'
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col min-w-0 text-left flex-1">
                <span className="text-xs sm:text-xs font-bold text-white leading-tight break-words">
                  {treatment.tabLabel}
                </span>
                <span className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 leading-tight break-words ${isActive ? 'text-teal-300' : 'text-slate-400'}`}>
                  {treatment.level}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Box - Homologado con las demás secciones */}
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-[#0e1d27]/95 to-[#071219]/98 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.65)] p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr] gap-6 items-center">
          {/* Left Details */}
          <div className="flex flex-col items-start text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-semibold mb-3 shadow-xs ${current.levelColor}`}>
              <Sparkles className="h-3 w-3 shrink-0" />
              <span>Nivel: {current.level}</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-teal-300 mt-1">
              {current.subtitle}
            </p>

            {/* Threat vs Solution Comparison Box */}
            <div className="mt-4 flex flex-col gap-2.5 w-full">
              <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/30 text-left shadow-sm">
                <span className="text-[10px] uppercase font-bold text-teal-300 tracking-wider block mb-1">
                  Vulnerabilidad Sanitaria
                </span>
                <p className="text-xs text-slate-200/90 leading-relaxed font-normal">
                  {current.threat}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-left shadow-sm">
                <span className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider block mb-1">
                  Protocolo Técnico Sanivex
                </span>
                <p className="text-xs text-slate-200/90 leading-relaxed font-normal">
                  {current.solution}
                </p>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="mt-4 grid grid-cols-1 min-[380px]:grid-cols-2 gap-2 sm:gap-2.5 w-full max-w-md">
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#061219]/90 border border-white/15 min-w-0 flex flex-col justify-center shadow-inner">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Método</span>
                <span className="text-xs font-semibold text-slate-200 mt-1 block leading-snug break-words">{current.techMethod}</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#061219]/90 border border-white/15 min-w-0 flex flex-col justify-center shadow-inner">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Tiempo Reingreso</span>
                <span className="text-xs font-semibold text-teal-300 mt-1 block leading-snug break-words">{current.reentryTime}</span>
              </div>
            </div>

            {/* Badges bar - Sin botón de cotización individual */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {current.badges.map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-[10px] text-slate-200 font-medium">
                  <CheckCircle2 className="h-3 w-3 text-teal-400" />
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400 font-light">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-400 shrink-0" />
              <span>La inocuidad sostenida requiere planes de desinfección periódicos y protocolos de limpieza rutinaria.</span>
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#081219] via-transparent to-transparent opacity-80" />
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#081219]/80 backdrop-blur-md border border-white/20 text-[10px] font-bold text-slate-200 tracking-wider uppercase">
              Bioseguridad Grado Quirúrgico
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
