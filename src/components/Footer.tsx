'use client';

import React from 'react';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';

interface FooterProps {
  onOpenQuote: (serviceName?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote }) => {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-7xl mx-auto py-2 lg:py-0">
      {/* Top Pre-Footer Banner: Call to Action de Alta Conversión */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0c182b] via-[#10223d] to-[#0c182b] border border-cyan-500/30 p-4 sm:p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 mb-4 sm:mb-6">
        {/* Glow ambient accent */}
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center md:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-[11px] font-semibold text-cyan-300 mb-2">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            Bioseguridad & Diagnóstico Sin Costo
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-tight leading-tight">
            ¿Listo para blindar tu empresa con los más altos estándares?
          </h3>
          <p className="mt-1 text-xs sm:text-[13px] text-slate-300/85 font-light leading-relaxed">
            Atención prioritaria para industrias, plantas de alimentos, centros logísticos y hogares con actas de inspección certificadas.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={() => onOpenQuote('Diagnóstico General desde Footer')}
            className="w-full sm:w-auto py-3 px-5 sm:px-6 rounded-xl hero-primary-btn font-extrabold text-xs sm:text-[13px] tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(97,218,251,0.35)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-white"
          >
            <span>SOLICITAR DIAGNÓSTICO</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <a
            href="tel:+573009123456"
            className="w-full sm:w-auto py-3 px-4 rounded-xl hero-secondary-btn font-bold text-xs sm:text-[13px] tracking-wide uppercase transition-all border border-[#5c7090]/40 bg-[#0e1726]/90 hover:bg-[#152338] text-slate-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone className="h-3.5 w-3.5 text-cyan-400" />
            <span>300-912-3456</span>
          </a>
        </div>
      </div>

      {/* 4 Main Columns: Responsive for Mobile (1 col), Tablet (2 cols), Desktop (4 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 flex-1 min-h-0 text-left">
        {/* Columna 1 (lg:col-span-4): Marca & Respaldo Institucional */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#0a3871] to-[#122238] border border-cyan-400/40 flex items-center justify-center p-1.5 shadow-md">
                <Image
                  src="/logos/icon-white.webp"
                  alt="Sanivex Isotipo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-lg sm:text-xl font-extrabold text-white tracking-widest">
                SANIVEX
              </span>
            </div>

            <p className="text-xs sm:text-[12.5px] text-slate-300/85 leading-relaxed font-light mb-3">
              Compañía líder en Sanidad Ambiental y Manejo Integrado de Plagas (MIP). Ecosistemas de bioseguridad inteligentes para la continuidad operativa de tu negocio.
            </p>

            <div className="p-2.5 rounded-xl bg-[#09111e]/90 border border-white/10 text-[11px] sm:text-xs text-slate-300">
              <span className="font-bold text-white block mb-0.5">
                Tu operación segura, nuestra razón de ser.
              </span>
              <span className="text-slate-400 font-light">
                Precisión técnica, conciencia biológica y tecnología de vanguardia.
              </span>
            </div>
          </div>

          {/* Badges de Certificaciones Normativas */}
          <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              INVIMA & MinSalud
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300">
              <Award className="h-3 w-3 text-cyan-400" />
              BPM & HACCP
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300">
              <FileCheck2 className="h-3 w-3 text-sky-400" />
              AIB & BRC
            </span>
          </div>
        </div>

        {/* Columna 2 (lg:col-span-3): Servicios Especializados */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Servicios Especializados
          </h4>

          <ul className="flex flex-col gap-1 text-xs text-slate-300/90 font-light">
            {[
              { label: 'Manejo Integrado de Plagas (MIP)', href: '#mip' },
              { label: 'Control Avanzado de Roedores', href: '#roedores' },
              { label: 'Control Integral de Insectos', href: '#insectos' },
              { label: 'Exclusión y Manejo de Aves', href: '#aves' },
              { label: 'Control de Termitas & Xilófagos', href: '#termitas' },
              { label: 'Sanitización Quirúrgica & ULV', href: '#sanitizacion' },
              { label: 'Perfil Institucional ¿Sanivex?', href: '#sanivex' },
            ].map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNav(item.href)}
                  className="hover:text-cyan-300 hover:translate-x-1 transition-all text-left flex items-center gap-1.5 py-0.5 cursor-pointer w-full group"
                >
                  <span className="text-[10px] text-slate-500 group-hover:text-cyan-400">→</span>
                  <span className="truncate">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3 (lg:col-span-2): Cobertura Nacional */}
        <div className="lg:col-span-2 flex flex-col gap-2">
          <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <MapPin className="h-3.5 w-3.5 text-cyan-400" />
            Sedes Nacionales
          </h4>

          <div className="flex flex-col gap-1.5 text-xs text-slate-300 font-light">
            {[
              { city: 'Bogotá D.C.', tag: 'Sede Principal' },
              { city: 'Medellín', tag: 'Valle de Aburrá' },
              { city: 'Cali', tag: 'Valle del Cauca' },
              { city: 'Barranquilla', tag: 'Región Caribe' },
              { city: 'Bucaramanga', tag: 'Santanderes' },
            ].map((sede) => (
              <div key={sede.city} className="flex flex-col">
                <span className="font-medium text-slate-200 text-xs">{sede.city}</span>
                <span className="text-[10px] text-slate-400">{sede.tag}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-2 flex items-center gap-1.5 text-[11px] text-cyan-300 font-medium">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span>Emergencias 24/7 en Planta</span>
          </div>
        </div>

        {/* Columna 4 (lg:col-span-3): Contacto Directo & Gerencia */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Phone className="h-3.5 w-3.5 text-cyan-400" />
            Canales de Contacto
          </h4>

          <div className="flex flex-col gap-2 text-xs text-slate-300">
            {/* Gerencia Comercial */}
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">
                Gerencia Comercial & Operativa
              </span>
              <span className="font-semibold text-white">Fernando Fernández</span>
              <a
                href="tel:+573103387722"
                className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-[11.5px]"
              >
                <Phone className="h-3 w-3 text-cyan-400 shrink-0" />
                <span>(+57) 310 338 7722</span>
              </a>
              <a
                href="mailto:ventas@sanivex.com.co"
                className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-[11.5px]"
              >
                <Mail className="h-3 w-3 text-cyan-400 shrink-0" />
                <span>ventas@sanivex.com.co</span>
              </a>
            </div>

            {/* Central Telefónica */}
            <div className="flex flex-col gap-1 text-[11.5px]">
              <a
                href="tel:+573009123456"
                className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300"
              >
                <Phone className="h-3 w-3 text-slate-400 shrink-0" />
                <span>Línea Nacional: 300-912-3456</span>
              </a>
              <a
                href="https://wa.me/573009123456"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-emerald-400 font-medium"
              >
                <MessageCircle className="h-3 w-3 shrink-0" />
                <span>Chat de WhatsApp Oficial</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright, NIT, Habeas Data & Oficial Web */}
      <div className="w-full pt-3 sm:pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-400 gap-2 sm:gap-4 relative z-10 mt-3 sm:mt-4">
        {/* Left: Copyright & NIT */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-center md:text-left">
          <span className="font-bold text-slate-200">
            &copy; {new Date().getFullYear()} SANIVEX SAS.
          </span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="text-slate-400">NIT 901.482.195-3</span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span>Todos los derechos reservados.</span>
        </div>

        {/* Center: Legal compliance */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400 text-[10.5px] sm:text-[11px]">
          <span className="hover:text-slate-200 transition-colors cursor-default">
            Habeas Data (Ley 1581)
          </span>
          <span className="text-white/20">•</span>
          <span className="hover:text-slate-200 transition-colors cursor-default">
            Actas Sanitarias en Línea
          </span>
          <span className="text-white/20">•</span>
          <span className="hover:text-slate-200 transition-colors cursor-default">
            Resolución MinSalud
          </span>
        </div>

        {/* Right: Official domain link */}
        <div className="flex items-center gap-2">
          <a
            href="https://www.sanivex.com.co"
            target="_blank"
            rel="noopener noreferrer"
            className="font-extrabold tracking-widest text-slate-200 hover:text-cyan-300 transition-colors uppercase text-xs"
          >
            WWW.SANIVEX.COM.CO
          </a>
        </div>
      </div>
    </div>
  );
};
