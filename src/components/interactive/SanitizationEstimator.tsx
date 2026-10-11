'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldCheck, ArrowRight, Building2, Factory, Stethoscope, Home, CheckCircle2, Phone } from 'lucide-react';

interface SanitizationEstimatorProps {
  onOpenQuote: (serviceName: string) => void;
}

const SECTORS = [
  { id: 'alimentos', label: 'Industrial & Alimentos', icon: Factory },
  { id: 'clinico', label: 'Clínico & Laboratorios', icon: Stethoscope },
  { id: 'comercial', label: 'Oficinas & Comercio', icon: Building2 },
  { id: 'residencial', label: 'Hogares & Conjuntos', icon: Home },
];

const NEEDS = [
  { id: 'mip', label: 'Manejo MIP Integral', desc: 'Diagnóstico + Tratamiento + Acta' },
  { id: 'plagas', label: 'Roedores o Insectos', desc: 'Erradicación de choque y blindaje' },
  { id: 'sanitizacion', label: 'Sanitización Quirúrgica', desc: 'Nebulización ULV 99.999%' },
  { id: 'aves_termitas', label: 'Aves o Termitas', desc: 'Exclusión y detección no destructiva' },
];

const URGENCIES = [
  { id: 'urgente', label: 'Urgencia < 4h', desc: 'Respuesta prioritaria en ruta' },
  { id: 'normal', label: 'En 24 Horas', desc: 'Inspección técnica programada' },
  { id: 'preventivo', label: 'Plan Mensual', desc: 'Blindaje continuo con descuento' },
];

export const SanitizationEstimator: React.FC<SanitizationEstimatorProps> = ({ onOpenQuote }) => {
  const [selectedSector, setSelectedSector] = useState(0);
  const [selectedNeed, setSelectedNeed] = useState(0);
  const [selectedUrgency, setSelectedUrgency] = useState(1);

  const sector = SECTORS[selectedSector];
  const need = NEEDS[selectedNeed];
  const urgency = URGENCIES[selectedUrgency];

  const fullServiceTitle = `Presupuesto Express: ${need.label} para ${sector.label} (${urgency.label})`;

  return (
    <div className="w-full flex flex-col gap-5 max-w-5xl">
      {/* Top Biological Key Metrics Bar */}
      <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-[#091522]/80 border border-teal-500/20 backdrop-blur-xl">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4">
          <span className="text-xl sm:text-2xl font-black text-teal-300 leading-none">99.999%</span>
          <span className="text-[10px] sm:text-xs text-slate-400 font-light mt-1">Eliminación de virus y bacterias</span>
        </div>
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4 border-x border-white/10">
          <span className="text-xl sm:text-2xl font-black text-cyan-300 leading-none">&lt; 2 Horas</span>
          <span className="text-[10px] sm:text-xs text-slate-400 font-light mt-1">Reingreso seguro a las instalaciones</span>
        </div>
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4">
          <span className="text-xl sm:text-2xl font-black text-emerald-400 leading-none">INVIMA / BPM</span>
          <span className="text-[10px] sm:text-xs text-slate-400 font-light mt-1">Certificación oficial para auditorías</span>
        </div>
      </div>

      {/* Interactive 3-Click Estimator Card */}
      <div className="relative overflow-hidden rounded-3xl border border-teal-500/30 bg-gradient-to-b from-[#0b1b26]/95 to-[#061019]/98 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-5 sm:p-7 text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/30 text-[11px] font-semibold text-teal-300 mb-1.5">
              <Sparkles className="h-3 w-3 text-teal-400" />
              <span>Cotizador Express Interactivo</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Calcula tu Presupuesto en 3 Clics
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-light">
            Respuesta técnica inmediata sin compromiso.
          </span>
        </div>

        {/* 3 Step Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1: Sector */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-wider text-teal-300 font-bold">
              1. Selecciona tu Sector
            </span>
            <div className="flex flex-col gap-1.5">
              {SECTORS.map((s, i) => {
                const Icon = s.icon;
                const isSelected = i === selectedSector;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSector(i)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer select-none text-left ${
                      isSelected
                        ? 'bg-teal-500/20 border-teal-400 text-white shadow-sm'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-teal-400' : 'text-slate-400'}`} />
                    <span className="truncate">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Need */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-wider text-cyan-300 font-bold">
              2. Servicio Requerido
            </span>
            <div className="flex flex-col gap-1.5">
              {NEEDS.map((n, i) => {
                const isSelected = i === selectedNeed;
                return (
                  <button
                    key={n.id}
                    onClick={() => setSelectedNeed(i)}
                    className={`flex flex-col px-3 py-2 rounded-xl border text-left transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-sm'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xs font-semibold text-white truncate">{n.label}</span>
                    <span className="text-[10px] text-slate-400 truncate">{n.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Urgency */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
              3. Tiempo de Respuesta
            </span>
            <div className="flex flex-col gap-1.5">
              {URGENCIES.map((u, i) => {
                const isSelected = i === selectedUrgency;
                return (
                  <button
                    key={u.id}
                    onClick={() => setSelectedUrgency(i)}
                    className={`flex flex-col px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-sm'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xs font-semibold text-white truncate">{u.label}</span>
                    <span className="text-[10px] text-slate-400 truncate">{u.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Calculated Action Strip */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white">
                {need.label} para {sector.label}
              </span>
              <span className="text-[11px] text-teal-300 font-medium">
                Protocolo con acta digital oficial • {urgency.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onOpenQuote(fullServiceTitle)}
              className="w-full sm:w-auto py-3 px-6 rounded-xl hero-primary-btn font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(20,184,166,0.4)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-white"
            >
              <span>Generar Cotización Ahora</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
