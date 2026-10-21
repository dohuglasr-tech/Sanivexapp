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
  ShieldCheck,
  Bug,
  Sparkles,
  Award,
  MapPin,
  ChevronRight,
} from 'lucide-react';

// Custom Crisp Pest & Category SVG Icons for Liquid Glass Dropdown
const RatIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 13c1.5-1.5 2-4 1-6s-3.5-1.5-5 0c-2.5-1.5-6-1.5-8.5.5C3.5 10 3 13.5 4 16c1 2.5 3 4 6 4 3 0 6-2 7.5-4.5" />
    <path d="M18 5.5c.5-1 1.5-1.5 2.5-1s1 2 .5 3" />
    <circle cx="16" cy="8" r="1" fill="currentColor" />
    <path d="M4 16c-1.5 1-2.5 3-2 5" />
    <path d="M19 11l3-1M19 13l3.5 1" />
  </svg>
);

const BirdIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 7h.01" />
    <path d="M3.4 18c3.6 1.8 8.6 1.3 11.6-1.7 3-3 3-8 1-11.3l-2.4 2.4c-.6.6-1.5.8-2.3.5L8.5 6.5C7 5 5 4.5 3.5 5.2 2 6 1.5 7.8 2.2 9.5l1.6 3.8c.4 1 .3 2.1-.3 3L3.4 18z" />
    <path d="M19 3l3 2-3 2" />
  </svg>
);

const TermiteIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="15" rx="4" ry="6" />
    <circle cx="12" cy="7" r="3" />
    <path d="M10 4l-2-2M14 4l2-2" />
    <path d="M8 13l-4-2M16 13l4-2M8 17l-4 2M16 17l4 2" />
  </svg>
);

interface NavbarProps {
  onOpenQuote: () => void;
}

interface BrandLogoProps {
  isLightSection: boolean;
  onNavigate: () => void;
  isMobile?: boolean;
}

const BrandLogoInteractive: React.FC<BrandLogoProps> = ({ isLightSection, onNavigate }) => {
  return (
    <a
      href="#hero"
      onClick={(e) => {
        e.preventDefault();
        onNavigate();
      }}
      className="group/brand flex items-center cursor-pointer relative z-10 py-1 transition-opacity hover:opacity-95 shrink-0"
      aria-label="SANIVEX - Inicio"
      title="SANIVEX - Soluciones Profesionales en Sanidad Ambiental"
    >
      {/* Permanent Brand Icon (Isolated PNG symbol with GPU 3D Y-axis spin) */}
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{ perspective: '500px' }}
      >
        <div className="flex items-center justify-center animate-brand-logo-icon">
          <Image
            src={isLightSection ? '/logos/brand-icon-prop-dark.webp' : '/logos/brand-icon-prop-white.webp'}
            alt="Sanivex Icono"
            width={24}
            height={24}
            priority
            className="h-5 sm:h-5.5 w-auto object-contain transition-transform duration-300 group-hover/brand:scale-105"
          />
        </div>
      </div>

      {/* Dynamic Expandable Wordmark (Continuous loop + Desktop hover expand) */}
      <div
        className="flex items-center animate-brand-logo-wordmark group-hover/brand:!max-w-[130px] group-hover/brand:!opacity-100 group-hover/brand:!ml-1.5 group-hover/brand:pointer-events-auto"
      >
        <Image
          src={isLightSection ? '/logos/brand-text-prop-dark.webp' : '/logos/brand-text-prop-white.webp'}
          alt="SANIVEX"
          width={105}
          height={24}
          priority
          className="h-5 sm:h-5.5 w-auto object-contain select-none max-w-none"
        />
      </div>
    </a>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote: _onOpenQuote }) => {
  const [navMounted, setNavMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setNavMounted(true), 60);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOpenPortal = () => setUserModalOpen(true);
    window.addEventListener('open-portal-modal', handleOpenPortal);
    return () => window.removeEventListener('open-portal-modal', handleOpenPortal);
  }, []);

  useEffect(() => {
    const checkScrollState = () => {
      const scrollTop = window.scrollY || (document.getElementById('main-scroll')?.scrollTop ?? 0);
      setScrolled(scrollTop > 20);

      // Check if any light theme section is currently intersecting the sticky navbar
      const lightElements = document.querySelectorAll('[data-theme="light"]');
      const navThreshold = window.innerWidth < 768 ? 95 : 70;
      let isLight = false;

      lightElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= navThreshold && rect.bottom >= 45) {
          isLight = true;
        }
      });

      setIsLightSection(isLight);
    };

    const scrollEl = document.getElementById('main-scroll');
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScrollState, { passive: true });
    }
    window.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState, { passive: true });

    // Initial check on mount
    checkScrollState();

    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', checkScrollState);
      }
      window.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, []);

  const specializedServices = [
    {
      id: 'mip',
      label: 'Manejo Integrado (MIP)',
      tag: 'Protocolo 360°',
      desc: 'Auditoría preventiva, monitoreo continuo y certificación BPM.',
      href: '#mip',
      icon: ShieldCheck,
      accentColor: 'group-hover/card:text-emerald-400',
      iconBgDark: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 group-hover/card:bg-emerald-500/25 group-hover/card:shadow-[0_0_15px_rgba(16,185,129,0.35)]',
      iconBgLight: 'bg-emerald-100/90 text-emerald-700 border-emerald-300 group-hover/card:bg-emerald-200/80',
    },
    {
      id: 'roedores',
      label: 'Control de Roedores',
      tag: 'Cebado Perimetral',
      desc: 'Exclusión estructural, cebado técnico y monitoreo hermético.',
      href: '#roedores',
      icon: RatIcon,
      accentColor: 'group-hover/card:text-amber-400',
      iconBgDark: 'bg-amber-500/15 text-amber-400 border-amber-500/30 group-hover/card:bg-amber-500/25 group-hover/card:shadow-[0_0_15px_rgba(245,158,11,0.35)]',
      iconBgLight: 'bg-amber-100/90 text-amber-800 border-amber-300 group-hover/card:bg-amber-200/80',
    },
    {
      id: 'insectos',
      label: 'Control de Insectos',
      tag: 'Rastreros & Voladores',
      desc: 'Aspersión focalizada, geles de atracción y termonebulización.',
      href: '#insectos',
      icon: Bug,
      accentColor: 'group-hover/card:text-rose-400',
      iconBgDark: 'bg-rose-500/15 text-rose-400 border-rose-500/30 group-hover/card:bg-rose-500/25 group-hover/card:shadow-[0_0_15px_rgba(244,63,94,0.35)]',
      iconBgLight: 'bg-rose-100/90 text-rose-700 border-rose-300 group-hover/card:bg-rose-200/80',
    },
    {
      id: 'aves',
      label: 'Control de Aves',
      tag: 'Sistemas Pasivos',
      desc: 'Mallas mecánicas, líneas de tensión y púas disuasorias inocuas.',
      href: '#aves',
      icon: BirdIcon,
      accentColor: 'group-hover/card:text-sky-400',
      iconBgDark: 'bg-sky-500/15 text-sky-400 border-sky-500/30 group-hover/card:bg-sky-500/25 group-hover/card:shadow-[0_0_15px_rgba(56,189,248,0.35)]',
      iconBgLight: 'bg-sky-100/90 text-sky-700 border-sky-300 group-hover/card:bg-sky-200/80',
    },
    {
      id: 'termitas',
      label: 'Termitas y Xilófagos',
      tag: 'Barrera Inyectada',
      desc: 'Inyección profunda perimetral y preservación de maderas nobles.',
      href: '#termitas',
      icon: TermiteIcon,
      accentColor: 'group-hover/card:text-orange-400',
      iconBgDark: 'bg-orange-500/15 text-orange-400 border-orange-500/30 group-hover/card:bg-orange-500/25 group-hover/card:shadow-[0_0_15px_rgba(249,115,22,0.35)]',
      iconBgLight: 'bg-orange-100/90 text-orange-800 border-orange-300 group-hover/card:bg-orange-200/80',
    },
    {
      id: 'sanitizacion',
      label: 'Sanitización Ambiental',
      tag: 'Grado Hospitalario',
      desc: 'Micro-nebulización virucida contra bacterias, hongos y virus.',
      href: '#sanitizacion',
      icon: Sparkles,
      accentColor: 'group-hover/card:text-teal-400',
      iconBgDark: 'bg-teal-500/15 text-teal-400 border-teal-500/30 group-hover/card:bg-teal-500/25 group-hover/card:shadow-[0_0_15px_rgba(20,184,166,0.35)]',
      iconBgLight: 'bg-teal-100/90 text-teal-700 border-teal-300 group-hover/card:bg-teal-200/80',
    },
  ];

  const serviceItems = [
    { label: 'Manejo Integrado de Plagas (MIP)', href: '#mip', desc: 'Protocolo preventivo y normativo' },
    { label: 'Control de Roedores', href: '#roedores', desc: 'Exclusión y cebado técnico perimetral' },
    { label: 'Control de Insectos', href: '#insectos', desc: 'Fumigación de rastreros y voladores' },
    { label: 'Control de Aves', href: '#aves', desc: 'Sistemas disuasorios y redes mecánicas' },
    { label: 'Termitas y Xilófagos', href: '#termitas', desc: 'Inyección profunda y barrera química' },
    { label: 'Sanitización Ambiental', href: '#sanitizacion', desc: 'Nebulización contra virus y bacterias' },
    { label: 'Sobre Sanivex (¿Quiénes somos?)', href: '#sanivex', desc: 'Estándares internacionales BPM/HACCP, equipo y diagnóstico' },
    { label: 'Contacto & Sedes Nacionales', href: '#contacto', desc: 'Líneas 24/7, gerencia y cobertura en 5 ciudades' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setSearchModalOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const lightElements = document.querySelectorAll('[data-theme="light"]');
        const navThreshold = window.innerWidth < 768 ? 95 : 70;
        let isLight = false;
        lightElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navThreshold && rect.bottom >= 45) {
            isLight = true;
          }
        });
        setIsLightSection(isLight);
      }, 500);
    } else if (typeof window !== 'undefined') {
      window.location.href = href === '#hero' ? '/' : `/${href}`;
    }
  };

  const filteredServices = serviceItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Full-Page Backdrop Blur Overlay for High-Contrast Focus when Services Submenu is open */}
      <div
        onClick={() => setServicesDropdownOpen(false)}
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          servicesDropdownOpen
            ? 'opacity-100 bg-slate-950/75 backdrop-blur-md visible pointer-events-auto'
            : 'opacity-0 bg-transparent backdrop-blur-none invisible pointer-events-none'
        }`}
        aria-hidden="true"
      />

      <header
        className={`fixed top-[calc(0.625rem+env(safe-area-inset-top,0px))] sm:top-4 inset-x-0 z-50 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          navMounted ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'
        }`}
      >
        {/* ================================================================= */}
        {/* MOBILE LIQUID GLASS DOCK                                          */}
        {/* ================================================================= */}
        <div
          className={`pointer-events-auto md:hidden mx-auto w-[94%] rounded-2xl overflow-hidden backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 relative shadow-2xl ${
            isLightSection
              ? 'liquid-glass-nav-light'
              : scrolled
              ? 'liquid-glass-nav-dark-scrolled'
              : 'liquid-glass-nav-dark'
          }`}
        >
          {/* Top Specular Caustic Highlight Line */}
          <div className="pointer-events-none absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          {/* Top Row: Brand Logo + Quick Actions (Instagram, User/Portal, WhatsApp) + Hamburger */}
          <div className="flex items-center justify-between px-3 xs:px-4 py-2.5 sm:py-3">
            {/* Mobile Animated Brand Logo (Icon permanent, wordmark expandable) */}
            <BrandLogoInteractive
              isLightSection={isLightSection}
              onNavigate={() => handleLinkClick('#hero')}
              isMobile
            />

            <div className="flex items-center gap-1.5 xs:gap-2">
              {/* 1. Instagram */}
              <a
                href="https://www.instagram.com/sanivex.co"
                target="_blank"
                rel="noopener noreferrer"
                className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 ${
                  isLightSection
                    ? 'bg-pink-500/15 border border-pink-500/35 text-pink-600 hover:bg-pink-500/25'
                    : 'bg-gradient-to-tr from-[#f09433]/25 via-[#dc2743]/25 to-[#bc1888]/25 border border-pink-500/40 text-pink-300 hover:text-white hover:border-pink-400/60 shadow-[0_2px_8px_rgba(220,39,67,0.25)]'
                }`}
                aria-label="Instagram oficial @sanivex.co"
                title="Instagram @sanivex.co"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* 2. Portal de Clientes (User) */}
              <button
                onClick={() => setUserModalOpen(true)}
                className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 ${
                  isLightSection
                    ? 'bg-cyan-600/15 border border-cyan-600/35 text-cyan-800 hover:bg-cyan-600/25'
                    : 'bg-cyan-500/15 border border-cyan-400/35 text-cyan-300 hover:text-white hover:border-cyan-400/60 shadow-[0_2px_8px_rgba(56,189,248,0.25)]'
                }`}
                aria-label="Portal de Clientes"
                title="Portal de Clientes (Actas / NIT)"
              >
                <User className="h-3.5 w-3.5 stroke-[2.3]" />
              </button>

              {/* 3. WhatsApp Oficial */}
              <a
                href="https://wa.me/573009123456?text=Hola%20SANIVEX,%20deseo%20comunicarme%20para%20un%20servicio%20de%20sanidad."
                target="_blank"
                rel="noopener noreferrer"
                className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 ${
                  isLightSection
                    ? 'bg-emerald-600/15 border border-emerald-600/35 text-emerald-800 hover:bg-emerald-600/25'
                    : 'bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400/60 shadow-[0_2px_8px_rgba(37,211,102,0.25)]'
                }`}
                aria-label="WhatsApp"
                title="WhatsApp Oficial Sanivex"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>

              {/* 4. Animated Hamburger Button (Morphs 3 lines into an X smoothly with dynamic spin) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`h-8 w-8 rounded-full flex flex-col items-center justify-center gap-[4.5px] transition-all duration-300 cursor-pointer active:scale-90 ${
                  mobileMenuOpen ? 'rotate-90' : 'rotate-0'
                } ${
                  isLightSection
                    ? 'bg-slate-200/60 text-[#0a3871] hover:bg-slate-300'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileMenuOpen}
              >
                <span
                  className={`h-[1.75px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                    mobileMenuOpen
                      ? 'w-4 translate-y-[6.25px] rotate-45'
                      : 'w-4 translate-y-0 rotate-0'
                  }`}
                />
                <span
                  className={`h-[1.75px] rounded-full bg-current transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mobileMenuOpen
                      ? 'w-0 opacity-0 scale-x-0 -translate-x-1.5'
                      : 'w-3 opacity-100 scale-x-100 translate-x-0'
                  }`}
                />
                <span
                  className={`h-[1.75px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                    mobileMenuOpen
                      ? 'w-4 -translate-y-[6.25px] -rotate-45'
                      : 'w-4 translate-y-0 rotate-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* DESKTOP FLOATING LIQUID GLASS DOCK                                 */}
        {/* ================================================================= */}
        <div
          onMouseLeave={() => setServicesDropdownOpen(false)}
          className={`pointer-events-auto hidden md:flex mx-auto w-[96%] max-w-[1720px] rounded-full items-center justify-between px-4 md:px-6 lg:px-10 xl:px-12 py-2.5 md:py-3 lg:py-3.5 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 relative overflow-visible shadow-2xl ${
            isLightSection
              ? 'liquid-glass-nav-light'
              : scrolled
              ? 'liquid-glass-nav-dark-scrolled'
              : 'liquid-glass-nav-dark'
          }`}
        >
          {/* Top Specular Caustic Highlight Line */}
          <div className="pointer-events-none absolute inset-x-12 sm:inset-x-24 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/55 to-transparent" />

          {/* Official SANIVEX Brand Logo with Dynamic Island Expand Animation */}
          <BrandLogoInteractive
            isLightSection={isLightSection}
            onNavigate={() => handleLinkClick('#hero')}
          />

          {/* Desktop Center Navigation Links - Centrado permanentemente en el centro exacto */}
          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:gap-2.5 lg:gap-5 xl:gap-7 z-10 pointer-events-auto">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#hero');
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-[13px] tracking-wide transition-all cursor-pointer font-medium ${
                isLightSection
                  ? 'text-[#0a3871] hover:bg-slate-200/60 hover:text-[#5c7090]'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white hover:shadow-inner'
              }`}
            >
              Inicio
            </a>

            {/* Dropdown for Servicios Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-[13px] tracking-wide transition-all cursor-pointer font-medium ${
                  isLightSection
                    ? 'text-[#0a3871] hover:bg-slate-200/60 hover:text-[#5c7090]'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white hover:shadow-inner'
                }`}
                aria-haspopup="true"
                aria-expanded={servicesDropdownOpen}
              >
                <span>Servicios</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180' : ''
                  } ${
                    isLightSection
                      ? servicesDropdownOpen ? 'text-[#0a3871]' : 'text-[#5c7090]'
                      : servicesDropdownOpen ? 'text-white' : 'text-slate-300'
                  }`}
                />
              </button>
            </div>

            <a
              href="#sanivex"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#sanivex');
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-[13px] tracking-wide transition-all cursor-pointer font-medium ${
                isLightSection
                  ? 'text-[#0a3871] hover:bg-slate-200/60 hover:text-[#5c7090]'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white hover:shadow-inner'
              }`}
            >
              ¿Sanivex?
            </a>

            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#contacto');
              }}
              className={`px-3 md:px-3.5 lg:px-4 py-1.5 md:py-2 rounded-full text-xs lg:text-[13px] tracking-wide transition-all cursor-pointer font-medium ${
                isLightSection
                  ? 'text-[#0a3871] hover:bg-slate-200/60 hover:text-[#5c7090]'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white hover:shadow-inner'
              }`}
            >
              Contactanos
            </a>
          </nav>

          {/* Desktop Right Action Icons: Search + Instagram + User/Portal + WhatsApp */}
          <div className="flex items-center gap-2 sm:gap-2.5 relative z-10 shrink-0">
            {/* 1. Search */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className={`group relative h-9 w-9 rounded-full flex items-center justify-center transition-all cursor-pointer transform hover:scale-105 active:scale-95 ${
                isLightSection
                  ? 'bg-slate-100 hover:bg-slate-200 text-[#0a3871] hover:text-[#5c7090] border border-slate-200'
                  : 'bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white border border-white/10 shadow-inner'
              }`}
              aria-label="Buscar servicios o vectores"
              title="Buscar en Sanivex"
            >
              <Search className="h-4 w-4 stroke-[2]" />
              <span className="pointer-events-none absolute top-full mt-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-slate-900/95 px-2.5 py-1 text-[11px] font-semibold text-slate-200 shadow-xl opacity-0 backdrop-blur-md border border-white/10 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0.5 z-50">
                Buscar
              </span>
            </button>

            {/* Subtle Divider */}
            <div className={`h-4.5 w-[1px] ${isLightSection ? 'bg-slate-300' : 'bg-white/15'} mx-0.5`} />

            {/* 2. Instagram Button (Degradado Oficial + Giro 3D continuo) */}
            <a
              href="https://www.instagram.com/sanivex.co"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-[0_2px_10px_rgba(220,39,67,0.35)] hover:shadow-[0_4px_16px_rgba(220,39,67,0.65)] border border-white/25 transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Instagram oficial @sanivex.co"
            >
              <div
                className="flex h-4 w-4 items-center justify-center animate-floating-icon-instagram"
                style={{ perspective: '400px', transformOrigin: 'center' }}
              >
                <svg
                  className="h-4 w-4 fill-white transition-transform group-hover:rotate-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span className="pointer-events-none absolute top-full mt-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-slate-900/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xl opacity-0 backdrop-blur-md border border-white/10 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0.5 z-50">
                Instagram @sanivex.co
              </span>
            </a>

            {/* 3. Portal de Clientes (User) (Giro 3D continuo + Modal Actas/NIT) */}
            <button
              onClick={() => setUserModalOpen(true)}
              className="group relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0a3871] via-[#103460] to-[#071930] border border-cyan-400/50 text-cyan-200 hover:text-white shadow-[0_2px_10px_rgba(10,56,113,0.5)] hover:shadow-[0_4px_16px_rgba(97,218,251,0.5)] transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Portal de Clientes (Actas / NIT)"
            >
              <div
                className="flex h-4 w-4 items-center justify-center animate-floating-icon-login"
                style={{ perspective: '400px', transformOrigin: 'center' }}
              >
                <User className="h-4 w-4 stroke-[2.2] transition-transform group-hover:scale-110" />
              </div>
              <span className="pointer-events-none absolute top-full mt-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-slate-900/95 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 shadow-xl opacity-0 backdrop-blur-md border border-white/10 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0.5 z-50">
                Portal de Clientes
              </span>
            </button>

            {/* 4. WhatsApp Button Oficial (Giro 3D continuo + Enlace directo) */}
            <a
              href="https://wa.me/573009123456?text=Hola%20SANIVEX,%20deseo%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20sanidad%20ambiental."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_2px_10px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_18px_rgba(37,211,102,0.65)] border border-white/25 transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="WhatsApp Oficial Sanivex"
            >
              <div
                className="flex h-4 w-4 items-center justify-center animate-floating-icon-whatsapp"
                style={{ perspective: '400px', transformOrigin: 'center' }}
              >
                <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </div>
              <span className="pointer-events-none absolute top-full mt-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-slate-900/95 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 shadow-xl opacity-0 backdrop-blur-md border border-white/10 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0.5 z-50">
                WhatsApp Oficial
              </span>
            </a>
          </div>

          {/* Desktop Mega-Dropdown (Centered relative to the entire desktop dock for zero side overflow) */}
          {servicesDropdownOpen && (
            <div
              id="services-desktop-dropdown"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
              className="absolute top-full left-1/2 -translate-x-1/2 pt-3.5 w-[94vw] max-w-[690px] z-50 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto"
            >
              <div
                className={`rounded-3xl p-4 sm:p-5 relative overflow-hidden backdrop-blur-3xl transition-all ${
                  isLightSection ? 'liquid-glass-dropdown-light' : 'liquid-glass-dropdown'
                }`}
              >
                {/* Top Specular Liquid Caustic Highlight Arc */}
                <div className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/85 to-transparent blur-[0.5px]" />
                <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-24 bg-cyan-500/15 rounded-full blur-2xl" />

                {/* Submenu Header Bar */}
                <div
                  className={`flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b ${
                    isLightSection ? 'border-slate-300/70' : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                    </span>
                    <span
                      className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase truncate ${
                        isLightSection ? 'text-[#0a3871]' : 'text-slate-200'
                      }`}
                    >
                      Portafolio de Sanidad Especializada
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium border shrink-0 ${
                      isLightSection
                        ? 'bg-cyan-600/10 border-cyan-600/25 text-[#0a3871]'
                        : 'bg-cyan-500/10 border-cyan-400/25 text-cyan-300'
                    }`}
                  >
                    <ShieldCheck className="h-3 w-3 text-cyan-400 shrink-0" />
                    <span>Protocolo BPM & HACCP</span>
                  </div>
                </div>

                {/* 2-Column Responsive Grid of 6 Specialized Services */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {specializedServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <a
                        key={service.id}
                        href={service.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(service.href);
                        }}
                        className={`group/card flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl cursor-pointer min-w-0 ${
                          isLightSection ? 'liquid-glass-subcard-light' : 'liquid-glass-subcard'
                        }`}
                      >
                        {/* Glass Icon Badge */}
                        <div
                          className={`shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                            isLightSection ? service.iconBgLight : service.iconBgDark
                          }`}
                        >
                          <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                        </div>

                        {/* Service Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <h4
                              className={`text-xs font-bold leading-tight break-words transition-colors ${
                                isLightSection
                                  ? 'text-[#0a3871] group-hover/card:text-[#5c7090]'
                                  : `text-white ${service.accentColor}`
                              }`}
                            >
                              {service.label}
                            </h4>
                            <ChevronRight
                              className={`h-3 w-3 shrink-0 opacity-0 -translate-x-1 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-200 ${
                                isLightSection ? 'text-[#0a3871]' : 'text-cyan-400'
                              }`}
                            />
                          </div>
                          <p
                            className={`text-[10px] leading-snug break-words ${
                              isLightSection ? 'text-slate-600' : 'text-slate-400'
                            }`}
                          >
                            {service.desc}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Bottom Bar: Quick links to ¿Quiénes Somos?, Sedes & Urgencias 24/7 */}
                <div
                  className={`mt-3 pt-3 border-t flex flex-wrap items-center justify-between gap-2 ${
                    isLightSection ? 'border-slate-300/70' : 'border-white/10'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <a
                      href="#sanivex"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick('#sanivex');
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                        isLightSection
                          ? 'bg-slate-200/80 text-[#0a3871] hover:bg-slate-300 hover:text-[#5c7090]'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                      }`}
                    >
                      <Award className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>¿Quiénes Somos?</span>
                    </a>

                    <a
                      href="#contacto"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick('#contacto');
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                        isLightSection
                          ? 'bg-slate-200/80 text-[#0a3871] hover:bg-slate-300 hover:text-[#5c7090]'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                      }`}
                    >
                      <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Sedes Nacionales</span>
                    </a>
                  </div>

                  <a
                    href="https://wa.me/573009123456?text=Hola%20SANIVEX,%20requiero%20atenci%C3%B3n%20urgente%20de%20sanidad."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-[11px] font-semibold text-emerald-300 hover:text-white hover:border-emerald-400/60 transition-all cursor-pointer shadow-[0_2px_10px_rgba(16,185,129,0.15)] active:scale-95 shrink-0"
                  >
                    <Phone className="h-3 w-3 text-emerald-400 animate-pulse shrink-0" />
                    <span>Urgencias 24/7</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Off-Canvas Drawer Menu with Liquid Glass & Fluid Staggered Entrance */}
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setMobileMenuOpen(false);
          }
        }}
        className={`fixed inset-0 z-40 md:hidden flex flex-col justify-center px-5 pt-[calc(5rem+env(safe-area-inset-top,0px))] pb-[calc(2rem+env(safe-area-inset-bottom,0px))] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto ${
          mobileMenuOpen
            ? 'opacity-100 visible pointer-events-auto bg-[#050912]/96 backdrop-blur-3xl backdrop-saturate-150'
            : 'opacity-0 invisible pointer-events-none bg-transparent backdrop-blur-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Ambient Liquid Glowing Orbs inside drawer */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-60 h-60 rounded-full bg-cyan-500/15 blur-3xl transition-opacity duration-700" />
        <div className="pointer-events-none absolute bottom-8 -left-16 w-60 h-60 rounded-full bg-blue-600/15 blur-3xl transition-opacity duration-700" />

        <div
          className={`relative z-10 flex flex-col gap-3.5 text-center max-w-sm mx-auto w-full my-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen
              ? 'translate-y-0 opacity-100 scale-100'
              : '-translate-y-8 opacity-0 scale-[0.95]'
          }`}
        >
          {/* Item 1: Quick search input */}
          <div
            onClick={() => {
              setMobileMenuOpen(false);
              setSearchModalOpen(true);
            }}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-400 text-xs cursor-pointer hover:border-cyan-400/40 hover:text-slate-200 transition-all ${
              mobileMenuOpen ? 'animate-drawer-stagger-1' : ''
            }`}
          >
            <Search className="h-4 w-4 text-[#5c7090]" />
            <span>Buscar plagas o servicios...</span>
          </div>

          {/* Item 2: Inicio link */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            className={`text-sm font-semibold text-slate-200 hover:text-cyan-300 transition py-1 ${
              mobileMenuOpen ? 'animate-drawer-stagger-2' : ''
            }`}
          >
            Inicio
          </a>

          {/* Item 3: Servicios Especializados Liquid Card */}
          <div
            className={`relative overflow-hidden rounded-2xl p-3.5 border border-white/10 bg-gradient-to-b from-white/[0.08] via-slate-900/85 to-[#070d17]/95 backdrop-blur-2xl shadow-xl text-left ${
              mobileMenuOpen ? 'animate-drawer-stagger-3' : ''
            }`}
          >
            {/* Caustic Specular Glare */}
            <div className="pointer-events-none absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

            <div className="flex items-center justify-between mb-2.5 px-0.5">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500" />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold">
                  Servicios Especializados
                </span>
              </div>
              <span className="text-[9px] font-medium text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-full">
                MIP / BPM
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {specializedServices.map((service) => {
                const Icon = service.icon;
                return (
                  <a
                    key={service.id}
                    href={service.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(service.href);
                    }}
                    className="group/mob flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/5 hover:border-cyan-400/30 transition-all cursor-pointer"
                  >
                    <div className={`shrink-0 h-6.5 w-6.5 rounded-lg flex items-center justify-center border ${service.iconBgDark}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[11px] font-semibold text-slate-200 group-hover/mob:text-cyan-300 truncate transition-colors">
                        {service.label}
                      </span>
                      <span className="block text-[9px] text-slate-400 truncate">
                        {service.tag}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Item 4: ¿Sanivex? link */}
          <a
            href="#sanivex"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#sanivex');
            }}
            className={`text-sm font-semibold text-slate-200 hover:text-cyan-300 transition py-1 ${
              mobileMenuOpen ? 'animate-drawer-stagger-4' : ''
            }`}
          >
            ¿Sanivex?
          </a>

          {/* Item 5: Contacto & Sedes link */}
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#contacto');
            }}
            className={`text-sm font-semibold text-slate-200 hover:text-cyan-300 transition py-1 ${
              mobileMenuOpen ? 'animate-drawer-stagger-5' : ''
            }`}
          >
            Contacto & Sedes
          </a>

          {/* Item 6: Quick Actions Trio (WhatsApp, Instagram, Portal Clientes) */}
          <div
            className={`pt-2 flex flex-col gap-2 ${
              mobileMenuOpen ? 'animate-drawer-stagger-6' : ''
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider text-[#5c7090] font-bold text-left px-1">
              Accesos Directos
            </span>

            <div className="grid grid-cols-2 gap-2">
              {/* WhatsApp */}
              <a
                href="https://wa.me/573009123456?text=Hola%20SANIVEX,%20deseo%20comunicarme%20para%20un%20servicio%20de%20sanidad."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 text-xs font-semibold transition-all active:scale-95 shadow-[0_2px_10px_rgba(37,211,102,0.15)]"
                aria-label="WhatsApp Oficial"
              >
                <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/sanivex.co"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#f09433]/20 via-[#dc2743]/20 to-[#bc1888]/20 border border-pink-500/30 text-pink-300 hover:text-white text-xs font-semibold transition-all active:scale-95 shadow-[0_2px_10px_rgba(220,39,67,0.15)]"
                aria-label="Instagram Oficial"
              >
                <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>

            {/* Portal de Clientes */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setUserModalOpen(true);
              }}
              className="w-full text-xs text-cyan-200 hover:text-white py-2.5 px-3 flex items-center justify-center gap-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 font-medium transition-all active:scale-95 cursor-pointer shadow-[0_2px_10px_rgba(56,189,248,0.15)]"
            >
              <User className="h-3.5 w-3.5 text-cyan-400" />
              <span>Portal de Clientes (Actas / NIT)</span>
            </button>
          </div>

          {/* Item 7: Phone Direct */}
          <a
            href="tel:+573009123456"
            className={`flex items-center justify-center gap-2 text-xs text-slate-400 font-medium pt-1 hover:text-slate-200 transition-colors ${
              mobileMenuOpen ? 'animate-drawer-stagger-7' : ''
            }`}
          >
            <Phone className="h-3.5 w-3.5 text-cyan-400" /> Línea directa: +57 300 912 3456
          </a>
        </div>
      </div>

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
              <Search className="h-5 w-5 text-[#5c7090]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar servicio, plaga (roedores, insectos, aves)..."
                className="bg-transparent border-none outline-none text-white w-full text-base sm:text-sm placeholder:text-slate-500"
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
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-[#5c7090]">
                        {service.label}
                      </div>
                      <div className="text-xs text-slate-400">{service.desc}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-[#5c7090] group-hover:translate-x-1 transition-all" />
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
              <div className="h-10 w-10 rounded-xl bg-[#5c7090]/15 border border-[#5c7090]/30 flex items-center justify-center p-2">
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-base sm:text-xs focus:border-[#5c7090] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Código de Acta Técnica / Servicio
                </label>
                <input
                  type="text"
                  placeholder="Ej: SNX-2026-9812"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-base sm:text-xs focus:border-[#5c7090] outline-none"
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
                  className="text-[11px] text-[#5c7090] hover:underline"
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
