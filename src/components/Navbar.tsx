'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Phone, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'MIP', href: '#mip' },
    { label: 'Roedores', href: '#roedores' },
    { label: 'Aves', href: '#aves' },
    { label: 'Termitas', href: '#termitas' },
    { label: 'Sanitización', href: '#sanitizacion' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-8 py-3 sm:py-4 ${
          scrolled
            ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2.5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-cyan-500 to-sky-400 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.35)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all">
              <div className="h-full w-full rounded-2xl bg-slate-950 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                SANIVEX
              </span>
              <span className="text-[9px] tracking-widest text-slate-400 -mt-1 font-mono uppercase">
                Sanidad Ambiental
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+573009123456"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-full bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all backdrop-blur-md"
            >
              <Phone className="h-3.5 w-3.5 text-cyan-400" />
              <span>(601) 745 0000</span>
            </a>

            <button
              onClick={onOpenQuote}
              className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Pedir Presupuesto</span>
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenQuote}
              className="sm:hidden px-3 py-1.5 text-xs font-bold rounded-full bg-cyan-400 text-slate-950"
            >
              Cotizar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-2xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl lg:hidden flex flex-col justify-center px-8">
          <nav className="flex flex-col gap-4 text-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-xl font-bold text-slate-200 hover:text-cyan-400 transition"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px w-24 mx-auto bg-white/10 my-4" />
            <a
              href="tel:+573009123456"
              className="flex items-center justify-center gap-2 text-sm text-cyan-400 font-semibold"
            >
              <Phone className="h-4 w-4" /> Línea Directa Colombia: (601) 745 0000
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="mt-4 w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)]"
            >
              Pedir un Presupuesto Gratuito
            </button>
          </nav>
        </div>
      )}
    </>
  );
};
