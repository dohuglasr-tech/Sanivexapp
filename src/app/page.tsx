'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Sparkles,
  ShieldCheck,
  Activity,
  Building2,
  FileCheck2,
  AlertTriangle,
  Flame,
  Radio,
  Eye,
  Layers,
  Search,
  Syringe,
  Biohazard,
  Users,
  Bug,
  Phone,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { GlassCard } from '@/components/GlassCard';
import { ScrollDots } from '@/components/ScrollDots';
import { QuoteModal } from '@/components/QuoteModal';
import { FloatingActions } from '@/components/FloatingActions';

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Manejo Integrado de Plagas (MIP)');

  const handleOpenQuote = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setQuoteModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#09111c] text-slate-100 font-sans selection:bg-[#5c7090] selection:text-white overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar onOpenQuote={() => handleOpenQuote('Cotización General')} />

      {/* Side Scroll Indicator */}
      <ScrollDots />

      {/* Floating Actions (WhatsApp & Scroll-to-top) */}
      <FloatingActions />

      {/* Mobile Sticky Bottom CTA Bar (Solicitar Presupuesto) */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#060b14]/95 backdrop-blur-xl border-t border-[#5c7090]/30 px-4 py-3 shadow-[0_-10px_35px_rgba(0,0,0,0.7)] animate-in fade-in duration-300">
        <button
          onClick={() => handleOpenQuote('Cotización General')}
          className="w-full py-3.5 px-6 rounded-xl hero-primary-btn font-black text-xs sm:text-sm tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(92,112,144,0.4)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-white"
        >
          <span>SOLICITAR PRESUPUESTO</span>
          <span className="text-base font-black">→</span>
        </button>
      </div>

      {/* Modal for Quotations */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultService={selectedService}
      />

      {/* Ambient Global Liquid Light Orbs (Floating smoothly in background) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#5c7090]/15 blur-[150px] animate-float-orb" />
        <div className="absolute top-[45%] right-[-10%] w-[600px] h-[600px] rounded-full bg-sky-500/10 blur-[170px] animate-float-orb" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-[75%] left-[10%] w-[550px] h-[550px] rounded-full bg-teal-500/10 blur-[160px] animate-float-orb" style={{ animationDelay: '-8s' }} />
      </div>

      {/* Main Snap Container */}
      <div id="main-scroll" className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth relative z-10">

        {/* ========================================================================= */}
        {/* SECCIÓN 1: HERO PRINCIPAL                                                 */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* SECCIÓN 1: HERO PRINCIPAL (Idéntico a Imagen 2, fondo azul unificado)     */}
        {/* ========================================================================= */}
        <section
          id="hero"
          className="relative min-h-screen md:h-screen snap-start snap-always flex flex-col justify-center items-center overflow-hidden bg-[#060b14]"
        >
          {/* Background Image: Specialist in tactical gear with cinematic dark blue atmosphere */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/Propias/principal_black.jpg"
              alt="Especialista Sanivex en inspección técnica y sanidad ambiental"
              fill
              priority
              quality={95}
              className="object-cover object-center scale-100"
            />
            {/* Center atmospheric spotlight illumination behind technician and text */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_40%,rgba(34,211,238,0.12)_0%,rgba(6,11,20,0.6)_55%,#060b14_100%)]" />

            {/* Deep cinematic vignette overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060b14] via-transparent to-[#060b14]/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060b14]/90 via-transparent to-[#060b14]/90" />
            
            {/* Soft bottom feathered color transition into section 2 */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent via-[#060b14]/80 to-[#121e2c]" />
          </div>

          {/* Hero Content (Exact replica of Image 2, responsive for Mobile & Desktop) */}
          <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-start text-left md:items-center md:text-center px-6 md:px-4 pt-36 sm:pt-40 md:pt-0 pb-24 md:pb-0">
            {/* Top Liquid Pill: "Somos los mejores en" */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center px-6 py-1.5 rounded-full hero-top-pill text-xs font-normal text-slate-300 tracking-wide mb-4 md:mb-5 select-none"
            >
              Somos los mejores en
            </motion.div>

            {/* H1 Heading - Cuadrado, Profesional y en 2 Líneas Equilibradas */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-full text-[clamp(2.5rem,13.5vw,3.75rem)] md:text-5xl lg:text-[54px] uppercase md:normal-case font-semibold md:font-bold text-white leading-[0.98] md:leading-[1.12] tracking-[-0.02em] md:tracking-tight md:max-w-2xl"
            >
              <span className="block">Control de<br className="md:hidden" /> plagas</span>
              <span className="block text-[#5c7090]">y sanidad<br className="md:hidden" /> ambiental</span>
            </motion.h1>

            {/* Subtitle - Exact Authentic Sanivex Copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 md:mt-4 text-[13px] md:text-[13.5px] text-slate-300/85 max-w-[340px] sm:max-w-md md:max-w-[500px] leading-relaxed font-light drop-shadow"
            >
              Tu operación segura, nuestra razón de ser, somos tu aliado estratégico en control de plagas para que tu y tu empresa estén seguros.
            </motion.p>

            {/* Red Alert Pill - Exact from Image 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 md:mt-5 inline-flex items-center justify-center px-6 md:px-7 py-1.5 rounded-full hero-alert-pill text-xs font-medium text-red-200/90 tracking-wide"
            >
              ¡Alerta de ROEDORES en tu area!
            </motion.div>

            {/* Action Button: Solo Llamar directamente (eliminado botón redundante de cotización) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 flex flex-col items-center justify-center w-full max-w-[340px]"
            >
              <a
                href="tel:+573009123456"
                className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl hero-secondary-btn font-semibold text-xs xs:text-[13px] tracking-wider uppercase transition-all shadow-lg active:scale-95 cursor-pointer text-[#5c7090] border border-[#5c7090]/40 bg-[#0e1726]/90 hover:bg-[#152338]"
              >
                <Phone className="h-4 w-4 text-[#5c7090] fill-[#5c7090]" />
                <span>Llamar directamente: 300-912-3456</span>
              </a>
            </motion.div>

            {/* WhatsApp Helper link */}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              href="https://wa.me/573009123456?text=Hola%20SANIVEX,%20deseo%20comunicarme%20para%20un%20servicio%20de%20sanidad."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 text-[11px] text-slate-400 hover:text-[#5c7090] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Puedes comunicarte con nosotros vía <span className="font-semibold text-slate-300">WHATSAPP</span></span>
              <span className="font-bold">→</span>
            </motion.a>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 2: MANEJO INTEGRADO DE PLAGAS (MIP - Ciclo Metodológico en 3 Fases) */}
        {/* ========================================================================= */}
        <section
          id="mip"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12 lg:py-0 overflow-hidden bg-gradient-to-b from-[#121e2c] via-[#162331] to-[#121e2b]"
        >
          {/* Subtle Ambient Liquid Orbs */}
          <div className="absolute top-1/3 left-10 h-96 w-96 rounded-full bg-[#5c7090]/15 blur-[130px] pointer-events-none" />

          {/* User's CoMIP Asset on Left Side (Ant, Cockroach, Rat) looking towards right */}
          <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[52%] opacity-35 lg:opacity-75 pointer-events-none z-0">
            <Image
              src="/images/Propias/CoMIP-left.jpg"
              alt="Manejo Integrado de Plagas Sanivex"
              fill
              quality={90}
              className="object-cover object-left"
            />
            {/* Subtle Gradient Masks */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#121e2c]/60 to-[#121e2c]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121e2b] via-transparent to-[#121e2c]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col my-auto items-end">
            {/* Header */}
            <div className="mb-4 lg:mb-6 max-w-2xl w-full text-left self-end">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-[11px] font-semibold text-[#5c7090] mb-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#5c7090]" />
                Protocolo Metodológico MIP
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Manejo Integrado de Plagas (MIP)
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed font-light">
                Metodología biorracional y preventiva en 3 fases continuas. Minimizamos el uso de químicos nocivos protegiendo tu capital humano y activos críticos.
              </p>
            </div>

            {/* 3 Full-Image Process Cards with Opaque Gradient Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 max-w-5xl w-full self-end">
              {/* Fase 01 */}
              <GlassCard
                imageSrc="/images/hero_technician.jpg"
                stepNumber="01"
                badge="Diagnóstico"
                badgeVariant="blue"
                title="Evaluación de Riesgos"
                subtitle="Inspección de Puntos Críticos"
                description="Inspección no destructiva de puntos ciegos y mapeo digital de vulnerabilidades para evitar infestaciones antes de que ocurran."
                actionLabel="Consultar diagnóstico"
                onAction={() => handleOpenQuote('MIP - Fase Diagnóstico')}
              />

              {/* Fase 02 */}
              <GlassCard
                imageSrc="/images/cards/card_blindaje_roedores.jpg"
                stepNumber="02"
                badge="Monitoreo"
                badgeVariant="amber"
                title="Conservación Activa"
                subtitle="Monitoreo de Infraestructura"
                description="Protegemos cableados y maquinaria pesada con monitoreo continuo, previniendo paradas de planta y costos imprevistos."
                actionLabel="Ver tecnología"
                onAction={() => handleOpenQuote('MIP - Fase Monitoreo')}
              />

              {/* Fase 03 */}
              <GlassCard
                imageSrc="/images/sanitization_clean.jpg"
                stepNumber="03"
                badge="Normatividad"
                badgeVariant="emerald"
                title="Cumplimiento BPM"
                subtitle="Blindaje Sanitario & INVIMA"
                description="Blindaje sanitario ante secretarías de salud con cebos biorracionales selectivos y actas técnicas digitales con trazabilidad al instante."
                actionLabel="Solicitar auditoría"
                onAction={() => handleOpenQuote('MIP - Fase Normatividad')}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 3: CONTROL DE ROEDORES (Diseño Asimétrico con Mucho Aire y Foco)   */}
        {/* ========================================================================= */}
        <section
          id="roedores"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12 lg:py-0 overflow-hidden bg-gradient-to-b from-[#121e2b] via-[#142130] to-[#111d2a]"
        >
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-red-500/10 blur-[130px] pointer-events-none" />

          {/* User's asas.jpg Asset on Right Side (Rat macro facing left) */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[48%] opacity-40 lg:opacity-75 pointer-events-none z-0">
            <Image
              src="/images/Propias/asas.jpg"
              alt="Control Avanzado de Roedores Sanivex"
              fill
              quality={90}
              className="object-cover object-right"
            />
            {/* Subtle Gradient Blend Masks */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#142130] via-[#142130]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111d2a] via-transparent to-[#121e2b]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col my-auto">
            {/* Header */}
            <div className="mb-4 lg:mb-5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[11px] font-semibold text-red-300 mb-2 backdrop-blur-md">
                <AlertTriangle className="h-3 w-3 text-red-400" />
                Vectores de Alta Criticidad Sanitaria
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Control Avanzado de Roedores
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Erradicación técnica y exclusión estructural de Rattus norvegicus y Mus musculus. Protegemos la salud de tu equipo y el sistema eléctrico de tu empresa.
              </p>
            </div>

            {/* 3 Full-Image Cards with Opaque Gradient Overlay (Matching User's Reference Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 w-full max-w-5xl">
              {/* Card 1: Roedores (Exact clone of user's image card 1) */}
              <GlassCard
                imageSrc="/images/cards/card_roedores.jpg"
                badge="Alta urgencia"
                badgeVariant="red"
                title="Roedores"
                subtitle="Ratas y ratones"
                description="Control de guatones, ratas de alcantarilla y ratones de tejado. Cebado, trampeo y sellado de accesos."
                actionLabel="Solicitar tratamiento para Roedores"
                onAction={() => handleOpenQuote('Control de Roedores')}
              />

              {/* Card 2: Blindaje de Redes y Cables */}
              <GlassCard
                imageSrc="/images/cards/card_blindaje_roedores.jpg"
                badge="Seguridad Eléctrica"
                badgeVariant="amber"
                title="Blindaje Eléctrico"
                subtitle="Prevención de Incendios"
                description="Protección de bandejas portacables, racks y fibra óptica. Prevenimos paradas de planta y riesgos de cortocircuito."
                actionLabel="Blindar cableado e infraestructura"
                onAction={() => handleOpenQuote('Control de Roedores - Redes y Cables')}
              />

              {/* Card 3: Cebado Georreferenciado QR */}
              <GlassCard
                imageSrc="/images/cards/card_cebo_qr.jpg"
                badge="Monitoreo Digital"
                badgeVariant="purple"
                title="Cebado Técnico QR"
                subtitle="Dispositivos Seguros"
                description="Estaciones inviolables con llave de seguridad de doble perno y registro digital de consumo en tiempo real."
                actionLabel="Ver estaciones QR"
                onAction={() => handleOpenQuote('Control de Roedores - Cebado Técnico')}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 4: CONTROL DE INSECTOS (Duo-Split + Action Strip Minimalista)      */}
        {/* ========================================================================= */}
        <section
          id="insectos"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12 lg:py-0 overflow-hidden bg-gradient-to-b from-[#111d2a] via-[#152332] to-[#121e2c]"
        >
          {/* Subtle Ambient Emerald/Cyan Glow */}
          <div className="absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none" />

          {/* User's Fondo2.jpg Asset on Left Side (Macro Cockroach/Insect) */}
          <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[48%] opacity-40 lg:opacity-75 pointer-events-none z-0">
            <Image
              src="/images/Propias/Fondo2.jpg"
              alt="Control Profesional de Insectos Sanivex"
              fill
              quality={90}
              className="object-cover object-left"
            />
            {/* Subtle Gradient Blend Masks */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#152332] via-[#152332]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121e2c] via-transparent to-[#111d2a]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-end my-auto">
            {/* Header (Aligned to right for visual harmony with insect on left) */}
            <div className="mb-4 lg:mb-5 max-w-2xl w-full text-left lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-300 mb-2 backdrop-blur-md">
                <Bug className="h-3 w-3 text-emerald-400" />
                Control de Rastreros y Voladores
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Control Integral de Insectos
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Erradicación de cucarachas (Blattodea), hormigas y moscas mediante geles biorracionales y trampas UV de captura limpia.
              </p>
            </div>

            {/* 3 Full-Image Cards with Opaque Gradient Overlay (Matching User's Reference Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 w-full max-w-5xl">
              {/* Card 1: Cucarachas (Exact clone of user's image card 2) */}
              <GlassCard
                imageSrc="/images/cards/card_cucarachas.jpg"
                badge="Muy común"
                badgeVariant="amber"
                title="Cucarachas"
                subtitle="Alemana y Americana"
                description="Tratamiento de gel, aspersión y termonebulización para cocinas, alcantarillado y cañerías."
                actionLabel="Solicitar tratamiento para Cucarachas"
                onAction={() => handleOpenQuote('Control de Insectos - Cucarachas')}
              />

              {/* Card 2: Chinches de Cama (Exact clone of user's image card 3) */}
              <GlassCard
                imageSrc="/images/cards/card_chinches.jpg"
                badge="Tratamiento especializado"
                badgeVariant="purple"
                title="Chinches de Cama"
                subtitle="Cimex lectularius"
                description="Tratamiento térmico y químico profundo en colchones, marcos, molduras y enchufes."
                actionLabel="Solicitar tratamiento para Chinches de Cama"
                onAction={() => handleOpenQuote('Control de Insectos - Chinches')}
              />

              {/* Card 3: Insectos Voladores & Trampas UV */}
              <GlassCard
                imageSrc="/images/cards/card_voladores.jpg"
                badge="Norma BPM"
                badgeVariant="emerald"
                title="Insectos Voladores"
                subtitle="Moscas y Trampas UV"
                description="Lámparas atrapainsectos con tubos UV inastillables y láminas con feromonas. Cero fragmentación sobre líneas de producción."
                actionLabel="Instalar lámparas UV"
                onAction={() => handleOpenQuote('Control de Insectos - Voladores')}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 5: CONTROL DE AVES (Paloma Limpia y 3 Cápsulas Minimalistas)        */}
        {/* ========================================================================= */}
        <section
          id="aves"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12 lg:py-0 overflow-hidden bg-gradient-to-b from-[#121e2c] via-[#142131] to-[#101b28]"
        >
          {/* Subtle Ambient Glow behind the bird */}
          <div className="absolute top-1/3 right-10 h-[450px] w-[450px] rounded-full bg-[#5c7090]/15 blur-[150px] pointer-events-none" />

          {/* User's Paloma Asset on Right Side (Pigeon macro facing left) - Cinematic Studio Quality matching asas.jpg */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[50%] opacity-75 lg:opacity-100 pointer-events-none z-0">
            <Image
              src="/images/Propias/PalomaSanivex_dark.jpg"
              alt="Manejo y Exclusión de Aves Urbanas Sanivex"
              fill
              quality={95}
              className="object-cover object-right"
            />
            {/* Subtle Gradient Blend Masks on left edge only */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#142131] via-[#142131]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101b28] via-transparent to-[#121e2c]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col my-auto">
            {/* Header */}
            <div className="mb-4 lg:mb-5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-[11px] font-semibold text-[#5c7090] mb-2">
                <Building2 className="h-3 w-3 text-[#5c7090]" />
                Protección Estructural & Fachadas
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Manejo y Exclusión de Aves Urbanas
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Control ético, disuasivo y no cruento de palomas (Columba livia) en naves industriales y techumbres. Frenamos la corrosión por ácido úrico y riesgos biológicos.
              </p>
            </div>

            {/* 3 Full-Image Solution Cards with Opaque Gradient Overlay */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 w-full max-w-4xl">
              <GlassCard
                imageSrc="/images/cards/card_mallas_aves.jpg"
                badge="100% Hermético"
                badgeVariant="blue"
                title="Mallas Anti-Aves"
                subtitle="Redes Mecánicas de Alta Tenacidad"
                description="Redes de polietileno UV con cables en acero inox. Bloquean cerchas y marquesinas sin comprometer ventilación."
                actionLabel="Cotizar mallas"
                onAction={() => handleOpenQuote('Control de Aves - Mallas')}
              />

              <GlassCard
                imageSrc="/images/cards/card_puas_aves.jpg"
                badge="Sin Daño"
                badgeVariant="teal"
                title="Púas Quirúrgicas"
                subtitle="Acero Inoxidable Grado 316"
                description="Varillas romas sobre policarbonato virgen. Impiden el posamiento en cornisas, letreros y marquesinas."
                actionLabel="Solicitar púas"
                onAction={() => handleOpenQuote('Control de Aves - Púas y Postes')}
              />

              <GlassCard
                imageSrc="/images/cards/card_laser_aves.jpg"
                badge="Bio-tecnología"
                badgeVariant="purple"
                title="Disuasión Láser"
                subtitle="Sistemas Ópticos Automatizados"
                description="Barreras visuales de peligro automatizadas día y noche. Efecto no habituable para hangares y silos industriales."
                actionLabel="Ver tecnología láser"
                onAction={() => handleOpenQuote('Control de Aves - Sistemas Ópticos')}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 6: CONTROL DE TERMITAS (Fondo Blanco Limpio Sin Degradados Sucios) */}
        {/* ========================================================================= */}
        <section
          id="termitas"
          data-theme="light"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12 lg:py-0 overflow-hidden bg-white text-slate-900"
        >
          {/* User's Termita Asset on Left Side - Macro limpia abarcando lateral */}
          <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[48%] pointer-events-none z-0 opacity-25 lg:opacity-100">
            <Image
              src="/images/Propias/TermitaSanivex.jpg"
              alt="Control Profesional de Termitas Sanivex"
              fill
              quality={95}
              className="object-cover object-left"
            />
            {/* Máscara suave hacia la derecha en blanco puro para fundirse con las tarjetas */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-white" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-end my-auto">
            {/* Header */}
            <div className="mb-4 lg:mb-5 max-w-2xl w-full text-left lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-[11px] font-semibold text-amber-900 mb-2 shadow-sm">
                <Search className="h-3 w-3 text-amber-700" />
                Protección Invisible de la Infraestructura
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#09111c] tracking-tight">
                Servicios de Control de Termitas
              </h2>
              <p className="mt-1.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                Las termitas consumen celulosa desde el interior causando deterioro progresivo e invisible. Implementamos sistemas de detección temprana, blindaje estructural y erradicación biológica.
              </p>
            </div>

            {/* 3 Compact Light Glass Cards */}
            {/* 3 Full-Image Solution Cards with Opaque Gradient Overlay */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 w-full lg:max-w-3xl xl:max-w-4xl lg:ml-auto">
              <GlassCard
                imageSrc="/images/cards/card_termitas_diagnostico.jpg"
                badge="Diagnóstico"
                badgeVariant="amber"
                title="Detección No Destructiva"
                subtitle="Detección Temprana"
                description="Termografía infrarroja y sensores acústicos para localizar actividad xilófaga oculta en vigas y cielorrasos."
                actionLabel="Solicitar diagnóstico"
                onAction={() => handleOpenQuote('Termitas - Prevención y Diagnóstico')}
              />

              <GlassCard
                imageSrc="/images/cards/card_termitas_blindaje.jpg"
                badge="Blindaje"
                badgeVariant="blue"
                title="Blindaje Estructural"
                subtitle="Cimientos & Madera"
                description="Tratamiento de madera con sales de boro y sellado de fisuras en cimientos, vigas de soporte y drywall."
                actionLabel="Proteger estructuras"
                onAction={() => handleOpenQuote('Termitas - Elementos Estructurales')}
              />

              <GlassCard
                imageSrc="/images/termite_macro.jpg"
                badge="Erradicación"
                badgeVariant="red"
                title="Erradicación Total"
                subtitle="Cebado & Barreras"
                description="Sistemas de cebado con inhibidores de quitina (IGR) e inyección sub-suelo para erradicación completa de la reina."
                actionLabel="Erradicar colonias"
                onAction={() => handleOpenQuote('Termitas - Erradicación')}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 7: SANITIZACIÓN Y DESINFECCIÓN (Diseño Clínico con Aire y Footer) */}
        {/* ========================================================================= */}
        <section
          id="sanitizacion"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-between px-4 sm:px-8 lg:px-16 pt-16 pb-8 overflow-hidden bg-gradient-to-b from-[#101b27] via-[#0d1622] to-[#070d17]"
        >
          {/* Subtle Ambient Teal/Cyan Glow */}
          <div className="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-teal-500/10 blur-[150px] pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center my-auto">
            {/* Header */}
            <div className="mb-4 lg:mb-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-[11px] font-semibold text-teal-300 mb-2">
                <Sparkles className="h-3 w-3 text-teal-400" />
                Bioseguridad Grado Quirúrgico & Corporativo
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Sanitización y Desinfección de Alto Nivel
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Ambientes clínicos y corporativos libres de patógenos. Micro-nebulización en frío ULV con desinfectantes certificados de amplio espectro.
              </p>
            </div>

            {/* 3 Full-Image Clinical Cards with Opaque Gradient Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 max-w-5xl">
              <GlassCard
                imageSrc="/images/sanitization_clean.jpg"
                badge="Microbiología"
                badgeVariant="teal"
                title="Microorganismos Patógenos"
                subtitle="Virus, Bacterias & Hongos"
                description="Eliminación garantizada del 99.999% de patógenos con amonios cuaternarios de 5ª generación y dióxido de cloro inocuos con alimentos."
                actionLabel="Desinfectar área"
                onAction={() => handleOpenQuote('Sanitización - Microorganismos')}
              />

              <GlassCard
                imageSrc="/images/hero_technician.jpg"
                badge="Salud Laboral"
                badgeVariant="blue"
                title="Protección del Personal"
                subtitle="Ambientes Corporativos Seguros"
                description="Reducción del ausentismo laboral. Tiempos rápidos de reingreso seguro (< 2 horas) y monitoreo con bioluminiscencia ATP."
                actionLabel="Proteger equipo"
                onAction={() => handleOpenQuote('Sanitización - Capital Humano')}
              />

              <GlassCard
                imageSrc="/images/Propias/principal_black.jpg"
                badge="Blindaje Legal"
                badgeVariant="emerald"
                title="Certificación Sanitaria"
                subtitle="Cumplimiento BPM & INVIMA"
                description="Expedimos certificados sanitarios oficiales y fichas técnicas válidos para renovación de licencias ante Secretarías de Salud."
                actionLabel="Certificar empresa"
                onAction={() => handleOpenQuote('Sanitización - Normativa y Certificados')}
              />
            </div>
          </div>

          {/* Integrated Footer with Liquid Glass border */}
          <footer className="w-full max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-white tracking-wider">SANIVEX COLOMBIA</span>
              <span>&bull;</span>
              <span>Líder en Sanidad Ambiental & MIP</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
              <span className="text-[#5c7090]">Bogotá D.C.</span>
              <span>&bull;</span>
              <span className="text-[#5c7090]">Medellín</span>
              <span>&bull;</span>
              <span className="text-[#5c7090]">Cali</span>
              <span>&bull;</span>
              <span className="text-[#5c7090]">Barranquilla</span>
              <span>&bull;</span>
              <span className="text-[#5c7090]">Bucaramanga</span>
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <span>&copy; {new Date().getFullYear()} SANIVEX SAS. Todos los derechos reservados.</span>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
