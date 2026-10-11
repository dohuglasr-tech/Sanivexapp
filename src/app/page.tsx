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
    <div className="relative min-h-screen bg-[#09111c] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar onOpenQuote={() => handleOpenQuote('Cotización General')} />

      {/* Side Scroll Indicator */}
      <ScrollDots />

      {/* Floating Actions (WhatsApp & Scroll-to-top) */}
      <FloatingActions />

      {/* Mobile Sticky Bottom CTA Bar (Solicitar Presupuesto) */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#060b14]/95 backdrop-blur-xl border-t border-cyan-500/25 px-4 py-3 shadow-[0_-10px_35px_rgba(0,0,0,0.7)] animate-in fade-in duration-300">
        <button
          onClick={() => handleOpenQuote('Cotización General')}
          className="w-full py-3.5 px-6 rounded-xl hero-primary-btn font-black text-xs sm:text-sm tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(34,211,238,0.4)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-slate-950"
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
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[150px] animate-float-orb" />
        <div className="absolute top-[45%] right-[-10%] w-[600px] h-[600px] rounded-full bg-sky-500/10 blur-[170px] animate-float-orb" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-[75%] left-[10%] w-[550px] h-[550px] rounded-full bg-teal-500/10 blur-[160px] animate-float-orb" style={{ animationDelay: '-8s' }} />
      </div>

      {/* Main Snap Container */}
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth relative z-10">

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
              className="w-full text-[clamp(2.5rem,13.5vw,3.75rem)] md:text-5xl lg:text-[54px] uppercase md:normal-case font-black md:font-bold text-white leading-[0.95] md:leading-[1.12] tracking-[-0.025em] md:tracking-tight md:max-w-2xl"
            >
              <span className="block">Control de<br className="md:hidden" /> plagas</span>
              <span className="block text-[#22d3ee] md:text-[#7eedee]">y sanidad<br className="md:hidden" /> ambiental</span>
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
                className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl hero-secondary-btn font-semibold text-xs xs:text-[13px] tracking-wider uppercase transition-all shadow-lg active:scale-95 cursor-pointer text-cyan-300 border border-cyan-500/40 bg-[#0e1726]/90 hover:bg-[#152338]"
              >
                <Phone className="h-4 w-4 text-cyan-400 fill-cyan-400" />
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
              className="mt-3.5 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Puedes comunicarte con nosotros vía <span className="font-semibold text-slate-300">WHATSAPP</span></span>
              <span className="font-bold">→</span>
            </motion.a>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 2: MANEJO INTEGRADO DE PLAGAS (MIP)                                */}
        {/* ========================================================================= */}
        <section
          id="mip"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 lg:py-0 overflow-hidden bg-gradient-to-b from-[#121e2c] via-[#162331] to-[#121e2b]"
        >
          {/* Subtle Ambient Liquid Orbs */}
          <div className="absolute top-1/3 right-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

          {/* User's CoMIP.jpg Asset on Right Side (Ant, Cockroach, Rat) seamlessly blended */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] opacity-40 lg:opacity-75 pointer-events-none z-0">
            <Image
              src="/images/Propias/CoMIP.jpg"
              alt="Manejo Integrado de Plagas Sanivex"
              fill
              quality={90}
              className="object-cover object-right"
            />
            {/* Subtle Gradient Masks: image natural color (#1d2b38) seamlessly blends into the section */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#121e2c] via-[#121e2c]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121e2b] via-transparent to-[#121e2c]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col">
            {/* Header */}
            <div className="mb-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-xs font-semibold text-cyan-300 mb-3">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                Protocolo Técnico MIP
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Manejo Integrado de Plagas (MIP)
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-2xl font-light">
                A través de nuestro servicio, implementamos sistemas avanzados de detección temprana, barreras físicas perimetrales y cebado técnico para la protección integral de tus instalaciones y colaboradores.
              </p>
            </div>

            {/* 3 Liquid Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl">
              {/* Card 1: Prevención */}
              <GlassCard
                badge="Prevención"
                icon={ShieldAlert}
                title="Reducción de Riesgos para la Salud"
                subtitle="Evaluación de Riesgos"
                description="Protegemos el bienestar de tu capital humano minimizando radicalmente la exposición a plaguicidas y químicos nocivos. Aseguramos un entorno laboral seguro bajo los más altos estándares de salud ocupacional."
                bullets={[
                  'Inspección no destructiva de puntos ciegos',
                  'Sellamiento hermético y barreras físicas',
                  'Cero contaminación de alimentos y superficies',
                ]}
                actionLabel="Consultar prevención"
                onAction={() => handleOpenQuote('MIP - Prevención de Riesgos')}
              />

              {/* Card 2: Monitoreo */}
              <GlassCard
                badge="Monitoreo"
                icon={Activity}
                title="Conservación de Infraestructura"
                subtitle="Tecnología & Sensores"
                description="Protegemos tus activos evitando daños costosos provocados por roedores e insectos en áreas críticas de tu empresa, como cableados, maquinaria pesada y estructuras físicas, reduciendo costos de mantenimiento."
                bullets={[
                  'Cámaras de fototrampeo y sensores térmicos',
                  'Monitoreo continuo de tableros eléctricos',
                  'Detección acústica de actividad oculta',
                ]}
                actionLabel="Ver tecnología"
                onAction={() => handleOpenQuote('MIP - Monitoreo Tecnológico')}
              />

              {/* Card 3: Control */}
              <GlassCard
                badge="Normatividad"
                icon={FileCheck2}
                title="Cumplimiento Normativo y Regulaciones"
                subtitle="Bajo Impacto Químico"
                description="Facilitamos el cumplimiento estricto de las normativas de sanidad ambiental vigentes, brindando blindaje legal ante secretarías de salud. Respaldado por reportes digitales y mapas de calor para auditorías."
                bullets={[
                  'Cumplimiento de estándares BPM, HACCP e INVIMA',
                  'Intervención con cebos biorracionales selectivos',
                  'Trazabilidad digital con actas técnicas al instante',
                ]}
                actionLabel="Solicitar auditoría"
                onAction={() => handleOpenQuote('MIP - Cumplimiento Normativo')}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 3: CONTROL DE ROEDORES                                             */}
        {/* ========================================================================= */}
        <section
          id="roedores"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 lg:py-0 overflow-hidden bg-gradient-to-b from-[#121e2b] via-[#142130] to-[#111d2a]"
        >
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-red-500/10 blur-[130px] pointer-events-none" />

          {/* User's asas.jpg Asset on Right Side (Rat macro facing left) seamlessly blended */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[50%] opacity-40 lg:opacity-75 pointer-events-none z-0">
            <Image
              src="/images/Propias/asas.jpg"
              alt="Control Avanzado de Roedores Sanivex"
              fill
              quality={90}
              className="object-cover object-right"
            />
            {/* Subtle Gradient Blend Masks for seamless transition with zero hard lines */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#142130] via-[#142130]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111d2a] via-transparent to-[#121e2b]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10">
            {/* Header */}
            <div className="mb-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-300 mb-3 backdrop-blur-md">
                <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                Vectores de Alta Criticidad Sanitaria
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Control Avanzado de Roedores
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Erradicación técnica y exclusión estructural de Rattus norvegicus, Rattus rattus y Mus musculus. Protegemos la integridad sanitaria y los sistemas eléctricos de tu compañía en Colombia.
              </p>
            </div>

            {/* 3 Floating Liquid Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl">
              {/* Card 1: Riesgo Sanitario */}
              <GlassCard
                badge="Vector Biológico"
                icon={Biohazard}
                title="Riesgo Sanitario y Contaminación"
                subtitle="Enfermedades Infecciosas"
                description="Los roedores son vectores de Leptospirosis, Salmonelosis y Hantavirus. Eliminamos focos biológicos y contaminaciones cruzadas en depósitos, almacenes de materia prima y zonas de procesamiento alimentario."
                bullets={[
                  'Protección de productos terminados e insumos',
                  'Desinfección de orina y heces contaminantes',
                  'Garantía total de inocuidad alimentaria',
                ]}
                actionLabel="Proteger instalaciones"
                onAction={() => handleOpenQuote('Control de Roedores - Riesgo Sanitario')}
              />

              {/* Card 2: Daño a Redes y Cables */}
              <GlassCard
                badge="Seguridad Eléctrica"
                icon={Flame}
                title="Daño a Redes y Cables"
                subtitle="Prevención de Cortocircuitos"
                description="El hábito constante de roer desgasta aislamientos de cables de alta tensión, fibra óptica y tableros de control. Prevenimos interrupciones operativas imprevistas, paradas de planta y riesgos graves de incendio estructural."
                bullets={[
                  'Blindaje de bandejas portacables y ductos',
                  'Inspección de cuartos de telecomunicaciones y racks',
                  'Evita pérdidas millonarias por lucro cesante',
                ]}
                actionLabel="Blindar cableado"
                onAction={() => handleOpenQuote('Control de Roedores - Redes y Cables')}
              />

              {/* Card 3: Cebado Técnico */}
              <GlassCard
                badge="Dispositivos Seguros"
                icon={Radio}
                title="Sistemas de Cebado Técnico"
                subtitle="Estaciones Inviolables"
                description="Despliegue perimetral de cajas cebaderas termo-formadas con llave de seguridad de doble perno y rodenticidas anticoagulantes de segunda generación fijados mecánicamente sin riesgo de arrastre."
                bullets={[
                  'Identificación con código QR y georreferenciación',
                  'Mecanismos de anclaje antivandálico',
                  'Registro de consumo en plataforma digital',
                ]}
                actionLabel="Ver estaciones"
                onAction={() => handleOpenQuote('Control de Roedores - Cebado Técnico')}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 4: CONTROL DE INSECTOS (From Reference & Fondo2.jpg)               */}
        {/* ========================================================================= */}
        <section
          id="insectos"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 lg:py-0 overflow-hidden bg-gradient-to-b from-[#111d2a] via-[#152332] to-[#121e2c]"
        >
          {/* Subtle Ambient Emerald/Cyan Glow */}
          <div className="absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none" />

          {/* User's Fondo2.jpg Asset on Left Side (Macro Cockroach/Insect) seamlessly blended */}
          <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[50%] opacity-40 lg:opacity-75 pointer-events-none z-0">
            <Image
              src="/images/Propias/Fondo2.jpg"
              alt="Control Profesional de Insectos Sanivex"
              fill
              quality={90}
              className="object-cover object-left"
            />
            {/* Subtle Gradient Blend Masks for seamless transition with zero hard lines */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#152332] via-[#152332]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121e2c] via-transparent to-[#111d2a]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-end">
            {/* Header (Aligned to right for visual harmony with insect on left) */}
            <div className="mb-8 max-w-2xl w-full text-left lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300 mb-3 backdrop-blur-md">
                <Bug className="h-3.5 w-3.5 text-emerald-400" />
                Control de Insectos Rastreros y Voladores
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Control Integral de Insectos
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Erradicación técnica de cucarachas (Blattodea), hormigas, pulgas, chinches y moscas mediante geles biorracionales de transferencia horizontal y micro-aspersión de precisión de ultra bajo olor.
              </p>
            </div>

            {/* 3 Floating Liquid Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full">
              {/* Card 1: Rastreros */}
              <GlassCard
                badge="Rastreros"
                icon={Bug}
                title="Cucarachas y Plagas de Cocina"
                subtitle="Efecto Cascada Biorracional"
                description="Aplicación estratégica de geles alimenticios con atrayentes feromonales e insecticidas de transferencia horizontal. Las ninfas y adultos mueren en sus nidos sin contaminar áreas limpias ni requerir desalojo."
                bullets={[
                  'Eficacia contra cucaracha alemana y americana',
                  'Sin olor, sin manchas y de alta adherencia',
                  'Seguro en tableros eléctricos y motores',
                ]}
                actionLabel="Controlar rastreros"
                onAction={() => handleOpenQuote('Control de Insectos - Cucarachas')}
              />

              {/* Card 2: Voladores */}
              <GlassCard
                badge="Voladores"
                icon={Eye}
                title="Insectos Voladores y Trampas UV"
                subtitle="Monitoreo Lumínico"
                description="Instalación y mantenimiento de lámparas atrapainsectos con tubos de luz UV inastillables y láminas adhesivas con feromonas. Evita la fragmentación de insectos sobre líneas de producción y comedores."
                bullets={[
                  'Cumplimiento con normas alimentarias BPM',
                  'Trampas de alta captura sin electrocución ruidosa',
                  'Conteo y trazabilidad de especies capturadas',
                ]}
                actionLabel="Instalar lámparas UV"
                onAction={() => handleOpenQuote('Control de Insectos - Voladores')}
              />

              {/* Card 3: Nebulización ULV */}
              <GlassCard
                badge="Perimetral"
                icon={Syringe}
                title="Micro-Aspersión y Nebulización"
                subtitle="Ultra Bajo Volumen (ULV)"
                description="Tratamiento de choque perimetral en grietas, cámaras de inspección, sifones y ductos de ventilación. Uso de moléculas piretroides microencapsuladas con efecto residual de hasta 90 días."
                bullets={[
                  'Penetración profunda en fisuras estructurales',
                  'Efecto de expulsión inmediata (flushing-out)',
                  'Certificados sanitarios de aplicación oficial',
                ]}
                actionLabel="Solicitar micro-aspersión"
                onAction={() => handleOpenQuote('Control de Insectos - Aspersión ULV')}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 5: CONTROL DE AVES (With Transparent Paloma Asset)                 */}
        {/* ========================================================================= */}
        <section
          id="aves"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 lg:py-0 overflow-hidden bg-gradient-to-b from-[#121e2c] via-[#142131] to-[#101b28]"
        >
          {/* Subtle Ambient Sky-Blue Glow behind the bird */}
          <div className="absolute top-1/3 right-10 h-[450px] w-[450px] rounded-full bg-cyan-500/15 blur-[150px] pointer-events-none" />

          {/* User's PalomaSanivex transparent asset positioned seamlessly on the right */}
          <div className="absolute right-[-2%] bottom-[-5%] w-[420px] sm:w-[580px] lg:w-[680px] h-[55%] lg:h-[80%] opacity-45 lg:opacity-85 pointer-events-none z-0">
            <Image
              src="/images/Propias/PalomaSanivex_trans.webp"
              alt="Manejo y Exclusión de Aves Urbanas Sanivex"
              fill
              quality={95}
              className="object-contain object-bottom-right"
            />
            {/* Soft subtle bottom/left edge feathering */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#142131] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#101b28] to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10">
            {/* Header */}
            <div className="mb-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-xs font-semibold text-cyan-300 mb-3">
                <Building2 className="h-3.5 w-3.5 text-cyan-400" />
                Protección Estructural & Fachadas
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Manejo y Exclusión de Aves Urbanas
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-2xl">
                Control ético, disuasivo y no cruento de palomas (Columba livia) y aves plaga en naves industriales, galpones y techumbres. Frenamos la corrosión por ácido úrico y riesgos de histoplasmosis.
              </p>
            </div>

            {/* 3 Liquid Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl">
              {/* Solution 1: Mallas */}
              <GlassCard
                badge="Exclusión Física"
                icon={Layers}
                title="Mallas Anti-Aves de Alta Tenacidad"
                subtitle="100% Hermetismo"
                description="Redes de polietileno de alta densidad estabilizado contra rayos UV. Bloquean el ingreso de aves a cerchas, estructuras elevadas y silos sin comprometer la ventilación ni la iluminación natural."
                bullets={[
                  'Cables tensores perimetrales en acero inoxidable',
                  'Resistencia ante climas extremos e intemperie',
                  'Totalmente imperceptibles a distancia visual',
                ]}
                actionLabel="Cotizar mallas"
                onAction={() => handleOpenQuote('Control de Aves - Mallas')}
              />

              {/* Solution 2: Púas y Postes */}
              <GlassCard
                badge="Disuasión Mecánica"
                icon={ShieldAlert}
                title="Púas y Postes Estructurales"
                subtitle="Sin Daño a Especies"
                description="Sistemas mecánicos de varillas de acero quirúrgico grado 316 sobre base de policarbonato virgen. Impiden el posamiento y anidamiento en cornisas, perfiles de marquesinas y tuberías aéreas."
                bullets={[
                  'Diseño con puntas romas que no lesionan',
                  'Fijación permanente con adhesivos de grado marino',
                  'Cero mantenimiento durante más de 10 años',
                ]}
                actionLabel="Solicitar instalación"
                onAction={() => handleOpenQuote('Control de Aves - Púas y Postes')}
              />

              {/* Solution 3: Sistemas Ópticos */}
              <GlassCard
                badge="Bio-tecnología"
                icon={Eye}
                title="Sistemas Ópticos y Láser"
                subtitle="Disuasión Sensorial"
                description="Dispositivos ópticos reflectivos y proyectores láser automatizados que simulan barreras visuales de peligro. Ideal para hangares logísticos, puertos y grandes centros de distribución."
                bullets={[
                  'Rayos láser de barrido silencioso y continuo',
                  'Efecto no habituable para bandadas persistentes',
                  'Operación automatizada diurna y nocturna',
                ]}
                actionLabel="Ver tecnología láser"
                onAction={() => handleOpenQuote('Control de Aves - Sistemas Ópticos')}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 6: CONTROL DE TERMITAS (With Transparent Termita Asset)            */}
        {/* ========================================================================= */}
        <section
          id="termitas"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 lg:py-0 overflow-hidden bg-gradient-to-b from-[#101b28] via-[#142131] to-[#101b27]"
        >
          {/* Subtle Ambient Amber/Golden Glow behind the termite */}
          <div className="absolute top-1/3 left-10 h-[450px] w-[450px] rounded-full bg-amber-500/12 blur-[150px] pointer-events-none" />

          {/* User's TermitaSanivex transparent asset positioned seamlessly on the left */}
          <div className="absolute left-[-2%] bottom-[-5%] w-[420px] sm:w-[580px] lg:w-[680px] h-[55%] lg:h-[80%] opacity-45 lg:opacity-85 pointer-events-none z-0">
            <Image
              src="/images/Propias/TermitaSanivex_trans.webp"
              alt="Control Profesional de Termitas Sanivex"
              fill
              quality={95}
              className="object-contain object-bottom-left"
            />
            {/* Soft subtle edge feathering */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#142131] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#101b27] to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-end">
            {/* Header (Aligned to right for visual balance with termite on left) */}
            <div className="mb-8 max-w-3xl w-full text-left lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 mb-3 backdrop-blur-md">
                <Search className="h-3.5 w-3.5 text-amber-400" />
                Protección Invisible de la Infraestructura
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Servicios de Control de Termitas
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-3xl">
                Las termitas representan una de las plagas más destructivas para la infraestructura, consumiendo celulosa desde el interior y generando un deterioro progresivo e invisible. Implementamos sistemas de detección temprana, barreras químicas perimetrales y cebado en Colombia.
              </p>
            </div>

            {/* 3 Liquid Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full">
              {/* Card 1 */}
              <GlassCard
                badge="Diagnóstico"
                icon={Search}
                title="Prevención de Daños Invisibles y Sobrecostos"
                subtitle="Detección Temprana"
                description="Las termitas consumen celulosa desde el interior de las estructuras. Nuestro control técnico evita colapsos en la infraestructura y elevados sobrecostos de reparación que no suelen cubrir las pólizas de seguro."
                bullets={[
                  'Termografía infrarroja no destructiva',
                  'Sensores acústicos de actividad xilófaga',
                  'Inspección detallada de vigas y cielorrasos',
                ]}
                actionLabel="Solicitar diagnóstico"
                onAction={() => handleOpenQuote('Termitas - Prevención y Diagnóstico')}
              />

              {/* Card 2 */}
              <GlassCard
                badge="Blindaje"
                icon={Building2}
                title="Protección de Elementos Estructurales Críticos"
                subtitle="Cimientos & Madera"
                description="Identificamos y blindamos los puntos clave de vulnerabilidad ante termitas subterráneas y de madera seca. Protegemos tu inversión, desde cimientos y vigas de soporte, hasta revestimientos y drywall."
                bullets={[
                  'Tratamiento de madera con sales de boro',
                  'Sellado de fisuras y juntas de dilatación',
                  'Blindaje estructural preventivo para obras nuevas',
                ]}
                actionLabel="Proteger estructuras"
                onAction={() => handleOpenQuote('Termitas - Elementos Estructurales')}
              />

              {/* Card 3 */}
              <GlassCard
                badge="Erradicación"
                icon={Syringe}
                title="Sistemas Avanzados de Erradicación"
                subtitle="Cebado & Barreras Químicas"
                description="Implementamos sistemas de cebado y monitoreo para la eliminación total y definitiva de las colonias (incluyendo la reina), con barreras químicas perimetrales por inyección sub-suelo."
                bullets={[
                  'Cebos con inhibidores de quitina (IGR)',
                  'Inyección sub-suelo a alta presión',
                  'Eliminación de colonias subterráneas completas',
                ]}
                actionLabel="Erradicar colonias"
                onAction={() => handleOpenQuote('Termitas - Erradicación')}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 7: SANITIZACIÓN Y DESINFECCIÓN                                     */}
        {/* ========================================================================= */}
        <section
          id="sanitizacion"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-between px-4 sm:px-8 lg:px-16 pt-20 pb-8 overflow-hidden bg-gradient-to-b from-[#101b27] via-[#0d1622] to-[#070d17]"
        >
          {/* Subtle Ambient Teal/Cyan Glow */}
          <div className="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-teal-500/10 blur-[150px] pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
            {/* Header */}
            <div className="mb-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-xs font-semibold text-teal-300 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-teal-400" />
                Bioseguridad Grado Quirúrgico & Corporativo
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Sanitización y Desinfección de Alto Nivel
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-2xl">
                Ambientes clínicos, corporativos e industriales libres de microorganismos patógenos. Aplicamos micro-nebulización en frío ULV y termonebulización con desinfectantes de amplio espectro certificados.
              </p>
            </div>

            {/* 3 Liquid Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {/* Card 1 */}
              <GlassCard
                badge="Microbiología"
                icon={Biohazard}
                title="Microorganismos Patógenos"
                subtitle="Virus, Bacterias & Hongos"
                description="Eliminación garantizada del 99.999% de patógenos aerotransportados y de superficie, tales como bacterias grampositivas y gramnegativas, esporas fúngicas, moho y virus de alta virulencia."
                bullets={[
                  'Amonios cuaternarios de 5ª generación y dióxido de cloro',
                  'Desinfección de ductos de aire acondicionado HVAC',
                  'Inocuidad garantizada para contacto con alimentos',
                ]}
                actionLabel="Desinfectar área"
                onAction={() => handleOpenQuote('Sanitización - Microorganismos')}
              />

              {/* Card 2 */}
              <GlassCard
                badge="Salud Laboral"
                icon={Users}
                title="Protección del Capital Humano"
                subtitle="Ambientes Libres de Contagio"
                description="Reducción significativa del ausentismo laboral por afecciones respiratorias y gastrointestinales. Generamos entornos de trabajo confiables y salubres que fortalecen la productividad de tu empresa."
                bullets={[
                  'Aplicación fuera de horarios para cero interferencia',
                  'Tiempos rápidos de reingreso seguro (< 2 horas)',
                  'Monitoreo biológico con hisopados y bioluminiscencia ATP',
                ]}
                actionLabel="Proteger equipo"
                onAction={() => handleOpenQuote('Sanitización - Capital Humano')}
              />

              {/* Card 3 */}
              <GlassCard
                badge="Normativa Sanitaria"
                icon={FileCheck2}
                title="Cumplimiento Normativo (BPM & HACCP)"
                subtitle="Certificación Oficial"
                description="Expedimos certificados sanitarios oficiales y fichas técnicas exigidos por las Secretarías de Salud, INVIMA y auditores internacionales bajo esquemas de Buenas Prácticas de Manufactura."
                bullets={[
                  'Certificados válidos para renovación de licencias',
                  'Dosificación técnica controlada y segura',
                  'Asesoría técnica para inspecciones sanitarias',
                ]}
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
              <span className="text-cyan-400">Bogotá D.C.</span>
              <span>&bull;</span>
              <span className="text-cyan-400">Medellín</span>
              <span>&bull;</span>
              <span className="text-cyan-400">Cali</span>
              <span>&bull;</span>
              <span className="text-cyan-400">Barranquilla</span>
              <span>&bull;</span>
              <span className="text-cyan-400">Bucaramanga</span>
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
