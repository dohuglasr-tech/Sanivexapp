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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-8 sm:px-14 py-5 sm:py-6 ${
          scrolled
            ? 'bg-[#060b14]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5 sm:py-4'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Official SANIVEX Brand Logo - Scaled to match Image 1 */}
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
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
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
          <div className="flex items-center gap-4 sm:gap-5">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/5 cursor-pointer ml-1"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#060b14]/95 backdrop-blur-2xl md:hidden flex flex-col justify-center px-8">
          <nav className="flex flex-col gap-4 text-center">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#hero');
              }}
              className="text-lg font-semibold text-slate-200 hover:text-cyan-300 transition"
            >
              Inicio
            </a>

            <div className="py-2 flex flex-col gap-2 bg-slate-900/50 rounded-2xl p-3 border border-white/5">
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-1">
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
                  className="text-sm text-slate-300 hover:text-white py-1"
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
              className="text-lg font-semibold text-slate-200 hover:text-cyan-300 transition"
            >
              ¿Sanivex?
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="mt-2 w-full py-3.5 rounded-xl hero-primary-btn font-bold text-sm cursor-pointer"
            >
              Pedir un Presupuesto
            </button>

            <a
              href="tel:+573009123456"
              className="flex items-center justify-center gap-2 text-sm text-slate-300 font-medium mt-1"
            >
              <Phone className="h-4 w-4 text-cyan-400" /> Línea Directa: +57 300 912 3456
            </a>
          </nav>
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
