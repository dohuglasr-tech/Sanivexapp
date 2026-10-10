'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Search,
  User,
  ChevronDown,
  Menu,
  X,
  Phone,
  ArrowRight,
} from 'lucide-react';

interface NavbarProps {
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSegment, setActiveSegment] = useState<'residencial' | 'comercial'>('residencial');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceItems = [
    { label: 'Manejo Integrado de Plagas (MIP)', href: '#mip', desc: 'Protocolo preventivo y normativo' },
    { label: 'Control de Roedores', href: '#roedores', desc: 'Exclusión y cebado técnico perimetral' },
    { label: 'Control de Insectos', href: '#insectos', desc: 'Fumigación de rastreros y voladores' },
    { label: 'Control de Aves', href: '#aves', desc: 'Sistemas disuasorios y redes mecánicas' },
    { label: 'Termitas y Xilófagos', href: '#termitas', desc: 'Inyección profunda y barrera química' },
    { label: 'Sanitización Ambiental', href: '#sanitizacion', desc: 'Nebulización contra virus y bacterias' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setSearchModalOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredServices = serviceItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#060b14]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'bg-[#060b14]/90 backdrop-blur-md md:bg-transparent md:border-b-0 border-b border-white/10 md:border-transparent'
        }`}
      >
        {/* ================================================================= */}
        {/* MOBILE SANIVEX NAVBAR (Tabs + Dark Glass Header + Brand Logo)     */}
        {/* ================================================================= */}
        <div className="flex md:hidden flex-col w-full">
          {/* Top Segmented Tab Switcher */}
          <div className="flex w-full bg-[#060b14] border-b border-white/10">
            <button
              onClick={() => setActiveSegment('residencial')}
              className={`relative flex-1 py-2 text-center text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeSegment === 'residencial'
                  ? 'bg-cyan-500/15 text-cyan-300 border-b-2 border-cyan-400'
                  : 'bg-transparent text-slate-400 hover:text-white'
              }`}
            >
              <span>Residencial</span>
            </button>
            <button
              onClick={() => setActiveSegment('comercial')}
              className={`relative flex-1 py-2 text-center text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeSegment === 'comercial'
                  ? 'bg-cyan-500/15 text-cyan-300 border-b-2 border-cyan-400'
                  : 'bg-transparent text-slate-400 hover:text-white'
              }`}
            >
              <span>Comercial</span>
            </button>
          </div>

          {/* Dark Glass Header Bar */}
          <div className="relative flex items-center justify-between px-5 py-3 bg-[#060b14]/95 backdrop-blur-xl border-b border-white/10">
            <div className="w-16" /> {/* Balance spacer */}

            {/* Centered Brand Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#hero');
              }}
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer"
            >
              <Image
                src="/logos/logo-white.webp"
                alt="SANIVEX"
                width={130}
                height={26}
                priority
                className="h-5.5 w-auto object-contain"
              />
            </a>

            {/* Right Mobile Actions: WhatsApp Icon + 3-Stripes Hamburger Menu */}
            <div className="flex items-center gap-3.5 z-10 text-white">
              <a
                href="https://wa.me/573009123456?text=Hola%20SANIVEX,%20deseo%20comunicarme%20para%20un%20servicio%20de%20sanidad."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors p-1"
                aria-label="Contactar por WhatsApp"
                title="WhatsApp"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-200 hover:text-cyan-400 transition-colors p-1 cursor-pointer"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="h-6 w-6 stroke-[2]" /> : <Menu className="h-6 w-6 stroke-[2]" />}
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* DESKTOP NAVBAR (Preserved Cinematic Dark Bar)                      */}
        {/* ================================================================= */}
        <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between px-8 sm:px-14 py-4 sm:py-6">
          {/* Official SANIVEX Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <Image
              src="/logos/logo-white.webp"
              alt="SANIVEX"
              width={115}
              height={22}
              priority
              className="h-4.5 sm:h-5 w-auto object-contain transition-opacity group-hover:opacity-85"
            />
          </a>

          {/* Desktop Center Navigation Links */}
          <nav className="flex items-center gap-6 lg:gap-8">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#hero');
              }}
              className="text-xs sm:text-[13px] font-normal text-slate-300/90 hover:text-white transition-colors cursor-pointer"
            >
              Inicio
            </a>

            {/* Dropdown for Servicios */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-normal text-slate-300/90 hover:text-white transition-colors cursor-pointer py-1"
                aria-haspopup="true"
                aria-expanded={servicesDropdownOpen}
              >
                <span>Servicios</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 text-slate-400 ${
                    servicesDropdownOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 z-50">
                  <div className="rounded-2xl bg-[#0a1322]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-2">
                    {serviceItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(item.href);
                        }}
                        className="flex flex-col px-3.5 py-2.5 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                      >
                        <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {item.desc}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              href="#mip"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#mip');
              }}
              className="text-xs sm:text-[13px] font-normal text-slate-300/90 hover:text-white transition-colors cursor-pointer"
            >
              ¿Sanivex?
            </a>

            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                onOpenQuote();
              }}
              className="text-xs sm:text-[13px] font-normal text-slate-300/90 hover:text-white transition-colors cursor-pointer"
            >
              Contactanos
            </a>
          </nav>

          {/* Desktop Right Action Icons: Search & User */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="text-slate-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
              aria-label="Buscar servicios o vectores"
              title="Buscar en Sanivex"
            >
              <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2]" />
            </button>

            <button
              onClick={() => setUserModalOpen(true)}
              className="text-slate-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
              aria-label="Portal de Clientes"
              title="Portal de Clientes"
            >
              <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#060b14]/98 backdrop-blur-3xl md:hidden flex flex-col justify-center px-6 py-16 animate-in fade-in duration-200">
          <div className="flex flex-col gap-4 text-center max-w-sm mx-auto w-full">
            {/* Quick search input */}
            <div
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchModalOpen(true);
              }}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-400 text-xs cursor-pointer"
            >
              <Search className="h-4 w-4 text-cyan-400" />
              <span>Buscar plagas o servicios...</span>
            </div>

            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#hero');
              }}
              className="text-sm font-semibold text-slate-200 hover:text-cyan-300 transition py-1"
            >
              Inicio
            </a>

            <div className="py-2 flex flex-col gap-1 bg-slate-900/50 rounded-2xl p-3 border border-white/5 text-left">
              <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold mb-1 px-1">
                Servicios Especializados
              </span>
              {serviceItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className="text-xs text-slate-300 hover:text-white py-1 px-1 rounded hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <a
              href="#mip"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#mip');
              }}
              className="text-sm font-semibold text-slate-200 hover:text-cyan-300 transition py-1"
            >
              ¿Sanivex?
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setUserModalOpen(true);
              }}
              className="text-xs text-slate-300 hover:text-white py-2.5 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10"
            >
              <User className="h-3.5 w-3.5 text-cyan-400" />
              <span>Portal de Clientes (Actas / NIT)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 rounded-xl hero-primary-btn font-bold text-xs cursor-pointer shadow-lg mt-1"
            >
              Pedir un Presupuesto Gratuito
            </button>

            <a
              href="tel:+573009123456"
              className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium pt-1"
            >
              <Phone className="h-3.5 w-3.5 text-cyan-400" /> Línea: +57 300 912 3456
            </a>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-24 px-4"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-[#0a1322] border border-white/15 p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Search className="h-5 w-5 text-cyan-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar servicio, plaga (roedores, insectos, aves)..."
                className="bg-transparent border-none outline-none text-white w-full text-sm placeholder:text-slate-500"
                autoFocus
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-white/5"
              >
                ESC
              </button>
            </div>

            <div className="mt-4 max-h-72 overflow-y-auto flex flex-col gap-2">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <button
                    key={service.label}
                    onClick={() => handleLinkClick(service.href)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300">
                        {service.label}
                      </div>
                      <div className="text-xs text-slate-400">{service.desc}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))
              ) : (
                <div className="text-center py-6 text-sm text-slate-400">
                  No se encontraron resultados para &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* User / Client Portal Modal */}
      {userModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setUserModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-[#0a1322] border border-white/15 p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setUserModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center p-2">
                <Image
                  src="/logos/icon-white.webp"
                  alt="Icono Sanivex"
                  width={24}
                  height={24}
                  className="h-6 w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Portal de Clientes Sanivex</h3>
                <p className="text-xs text-slate-400">Consulta de actas y certificados de sanidad</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Ingresa el NIT de tu empresa o el código de tu acta técnica de servicio para consultar trazabilidad, cronogramas y certificaciones sanitarias vigentes.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  NIT o Documento
                </label>
                <input
                  type="text"
                  placeholder="Ej: 900.123.456-7"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Código de Acta Técnica / Servicio
                </label>
                <input
                  type="text"
                  placeholder="Ej: SNX-2026-9812"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                />
              </div>

              <button
                onClick={() => {
                  alert('Consultando base de datos de certificados Sanivex...');
                }}
                className="w-full py-3 rounded-xl hero-primary-btn font-bold text-xs mt-2"
              >
                Consultar Certificado de Sanidad
              </button>

              <div className="text-center pt-2">
                <a
                  href="https://wa.me/573009123456?text=Hola%20Sanivex,%20requiero%20asistencia%20con%20mi%20acta%20técnica%20de%20servicio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  ¿Necesitas ayuda con tu servicio? Contactar soporte directo vía WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
