'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Building2,
  Factory,
  Stethoscope,
  Home,
  AlertTriangle,
  Bug,
  Search,
  Zap,
  Clock,
  Calendar,
  CheckCircle2,
  Calculator,
} from 'lucide-react';

export interface CalculatedQuoteData {
  serviceName: string;
  mappedService: string;
  sector: string;
  need: string;
  urgency: string;
  details: string;
}

interface BudgetCalculatorProps {
  onGenerateQuote: (data: CalculatedQuoteData) => void;
}

const SECTORS = [
  { id: 'alimentos', label: 'Industrial & Alimentos', icon: Factory, desc: 'Plantas, bodegas y manufactura' },
  { id: 'clinico', label: 'Clínico & Laboratorios', icon: Stethoscope, desc: 'Hospitales, IPS y farmacéutica' },
  { id: 'comercial', label: 'Oficinas & Comercio', icon: Building2, desc: 'Sedes corporativas y locales' },
  { id: 'residencial', label: 'Hogares & Conjuntos', icon: Home, desc: 'Conjuntos y residencias' },
];

const NEEDS = [
  {
    id: 'mip',
    label: 'Manejo MIP Integral',
    mappedOption: 'Manejo Integrado de Plagas (MIP)',
    desc: 'Diagnóstico + Tratamiento + Acta digital',
    icon: ShieldCheck,
  },
  {
    id: 'roedores',
    label: 'Control de Roedores',
    mappedOption: 'Control de Roedores',
    desc: 'Erradicación y cebado georreferenciado',
    icon: AlertTriangle,
  },
  {
    id: 'insectos',
    label: 'Control de Insectos',
    mappedOption: 'Manejo Integrado de Plagas (MIP)',
    desc: 'Cucarachas, moscas y rastreros con geles',
    icon: Bug,
  },
  {
    id: 'aves',
    label: 'Control y Exclusión de Aves',
    mappedOption: 'Control de Aves',
    desc: 'Mallas UV, púas inox y disuasión óptica',
    icon: Building2,
  },
  {
    id: 'termitas',
    label: 'Control de Termitas',
    mappedOption: 'Control de Termitas',
    desc: 'Inspección termográfica no destructiva',
    icon: Search,
  },
  {
    id: 'sanitizacion',
    label: 'Sanitización y Desinfección',
    mappedOption: 'Sanitización y Desinfección',
    desc: 'Micro-nebulización en frío ULV 99.999%',
    icon: Sparkles,
  },
];

const URGENCIES = [
  { id: 'urgente', label: 'Urgencia Prioritaria < 4h', desc: 'Cuadrilla técnica en ruta inmediata', icon: Zap },
  { id: 'normal', label: 'Inspección en 24 Horas', desc: 'Visita técnica y diagnóstico programado', icon: Clock },
  { id: 'preventivo', label: 'Plan Preventivo Continuo', desc: 'Mantenimiento mensual y actas para auditorías', icon: Calendar },
];

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ onGenerateQuote }) => {
  const [selectedSector, setSelectedSector] = useState(0);
  const [selectedNeed, setSelectedNeed] = useState(0);
  const [selectedUrgency, setSelectedUrgency] = useState(1);

  const sector = SECTORS[selectedSector];
  const need = NEEDS[selectedNeed];
  const urgency = URGENCIES[selectedUrgency];

  const fullServiceTitle = `${need.label} para ${sector.label} (${urgency.label})`;
  const fullDetails = `Cotización express generada desde la Calculadora:\n- Sector: ${sector.label}\n- Servicio: ${need.label} (${need.desc})\n- Tiempo de respuesta requerido: ${urgency.label}\nPor favor confirmar disponibilidad de visita técnica y expedición de cotización formal.`;

  const handleGenerate = () => {
    onGenerateQuote({
      serviceName: fullServiceTitle,
      mappedService: need.mappedOption,
      sector: sector.label,
      need: need.label,
      urgency: urgency.label,
      details: fullDetails,
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Top Value Assurance Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#0a1524]/85 border border-cyan-500/25 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3 px-3 py-1.5 sm:border-r border-white/10">
          <div className="h-9 w-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0">
            <Calculator className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white">Cotización Inmediata</span>
            <span className="text-[11px] text-slate-400 font-light">Sin compromiso ni costo oculto</span>
          </div>
        </div>

        <div className="flex items-center gap-3 px-3 py-1.5 sm:border-r border-white/10">
          <div className="h-9 w-9 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
            <Clock className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white">Respuesta &lt; 24h</span>
            <span className="text-[11px] text-slate-400 font-light">Asignación técnica en tu ciudad</span>
          </div>
        </div>

        <div className="flex items-center gap-3 px-3 py-1.5">
          <div className="h-9 w-9 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white">Normativa INVIMA / BPM</span>
            <span className="text-[11px] text-slate-400 font-light">Actas válidas ante auditorías</span>
          </div>
        </div>
      </div>

      {/* Main 3-Click Calculator Container */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1b2b]/95 via-[#0a1522]/98 to-[#060c14]/98 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-5 sm:p-8 text-left">
        {/* Glow ambient highlight */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-blue-600/15 blur-3xl" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-[11px] font-semibold text-cyan-300 mb-2">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              <span>Cotizador Express Interactivo</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Calculadora de presupuesto en 3 clics
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-light bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            Paso guiado: Selección rápida
          </span>
        </div>

        {/* 3 Step Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
          {/* Paso 1: Sector */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-cyan-400 text-slate-950 text-[11px] font-extrabold">
                1
              </span>
              <span className="text-xs uppercase tracking-wider text-cyan-300 font-bold">
                Selecciona tu Sector
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {SECTORS.map((s, i) => {
                const Icon = s.icon;
                const isSelected = i === selectedSector;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSector(i)}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer select-none text-left ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/15 border-cyan-400 text-white shadow-[0_0_20px_rgba(97,218,251,0.2)]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center h-7 w-7 rounded-lg transition-colors shrink-0 mt-0.5 ${
                        isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-bold text-white break-words leading-tight">{s.label}</span>
                      <span className="text-[10px] text-slate-400 break-words leading-tight mt-0.5 font-light">{s.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Paso 2: Servicio Requerido */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-cyan-400 text-slate-950 text-[11px] font-extrabold">
                2
              </span>
              <span className="text-xs uppercase tracking-wider text-cyan-300 font-bold">
                Servicio Requerido
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {NEEDS.map((n, i) => {
                const Icon = n.icon;
                const isSelected = i === selectedNeed;
                return (
                  <button
                    key={n.id}
                    onClick={() => setSelectedNeed(i)}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/15 border-cyan-400 text-white shadow-[0_0_20px_rgba(97,218,251,0.2)]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center h-7 w-7 rounded-lg transition-colors shrink-0 mt-0.5 ${
                        isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-bold text-white break-words leading-tight">{n.label}</span>
                      <span className="text-[10px] text-slate-400 break-words leading-tight mt-0.5 font-light">{n.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Paso 3: Tiempo de Respuesta */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-cyan-400 text-slate-950 text-[11px] font-extrabold">
                3
              </span>
              <span className="text-xs uppercase tracking-wider text-cyan-300 font-bold">
                Tiempo de Respuesta
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {URGENCIES.map((u, i) => {
                const Icon = u.icon;
                const isSelected = i === selectedUrgency;
                return (
                  <button
                    key={u.id}
                    onClick={() => setSelectedUrgency(i)}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-500/25 to-teal-500/15 border-emerald-400 text-white shadow-[0_0_20px_rgba(52,211,153,0.2)]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center h-7 w-7 rounded-lg transition-colors shrink-0 mt-0.5 ${
                        isSelected ? 'bg-emerald-400 text-slate-950' : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-bold text-white break-words leading-tight">{u.label}</span>
                      <span className="text-[10px] text-slate-400 break-words leading-tight mt-0.5 font-light">{u.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Calculated Action Strip */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
          <div className="flex items-start sm:items-center gap-3.5 w-full md:w-auto min-w-0 flex-1">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 shadow-md mt-0.5 sm:mt-0">
              <CheckCircle2 className="h-5 w-5 text-cyan-400" />
            </div>
            <div className="flex flex-col text-left min-w-0 flex-1">
              <span className="text-xs sm:text-sm font-extrabold text-white leading-snug break-words">
                {need.label} • {sector.label}
              </span>
              <span className="text-[11px] sm:text-xs text-cyan-300 font-medium leading-snug break-words mt-0.5">
                Modalidad: {urgency.label} • Diagnóstico técnico oficial
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleGenerate}
              className="w-full sm:w-auto py-3.5 px-7 rounded-xl hero-primary-btn font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_4px_25px_rgba(97,218,251,0.4)] active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer text-white"
            >
              <span>Generar cotización ahora</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
