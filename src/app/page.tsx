'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Sparkles,
  Phone,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Activity,
  Zap,
  Building2,
  FileCheck2,
  AlertTriangle,
  Flame,
  Radio,
  Eye,
  Layers,
  Search,
  Crosshair,
  Syringe,
  Biohazard,
  Users,
  CheckCircle,
  ExternalLink,
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
    <div className="relative min-h-screen bg-[#070b16] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation Bar */}
      <Navbar onOpenQuote={() => handleOpenQuote('General')} />

      {/* Side Scroll Indicator */}
      <ScrollDots />

      {/* Floating Actions (WhatsApp & Scroll-to-top) */}
      <FloatingActions />

      {/* Modal for Quotations */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultService={selectedService}
      />

      {/* Main Snap Container */}
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {/* ========================================================================= */}
        {/* SECCIÓN 1: HERO PRINCIPAL                                                 */}
        {/* ========================================================================= */}
        <section
          id="hero"
          className="relative h-screen snap-start snap-always flex flex-col justify-center items-center px-4 sm:px-8 overflow-hidden"
        >
          {/* Background Image with Dark & Cyan Overlays */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero_technician.jpg"
              alt="Especialista Sanivex en inspección técnica"
              fill
              priority
              className="object-cover object-center scale-105"
            />
            {/* Multi-layer Dark Gradient Overlays for perfect Liquid Glass contrast */}
            <div className="absolute inset-0 bg-[#070b16]/75 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-transparent to-[#070b16]/80" />
            <div className="absolute inset-0 bg-radial-[circle_at_center_rgba(6,182,212,0.15)]" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center mt-12 sm:mt-0">
            {/* Top Pill: "Somos los mejores en" */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs sm:text-sm font-medium text-slate-300 backdrop-blur-xl shadow-lg mb-6"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Somos los mejores en</span>
            </motion.div>

            {/* H1 Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-3xl drop-shadow-2xl"
            >
              Control de plagas{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
                y sanidad ambiental
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-sm sm:text-lg text-slate-300/90 max-w-2xl leading-relaxed font-light drop-shadow"
            >
              Tu operación segura, nuestra razón de ser, somos tu aliado estratégico en control de plagas para que tú y tu empresa estén protegidos con tecnología de vanguardia.
            </motion.p>

            {/* Red Alert Pill (From Reference Image) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-red-950/70 border border-red-500/40 text-red-200 text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(239,68,68,0.25)] backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span>¡Alerta de ROEDORES en tu área!</span>
            </motion.div>

            {/* Pill Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary Cyan Pill Button */}
              <button
                onClick={() => handleOpenQuote('Cotización General')}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-extrabold text-sm shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Pedir un presupuesto</span>
                <ArrowRight className="h-4 w-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Liquid Glass Button */}
              <a
                href="tel:+573009123456"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-white/20 text-white font-semibold text-sm backdrop-blur-xl shadow-lg transition-all hover:border-cyan-400/40"
              >
                <Phone className="h-4 w-4 text-cyan-400" />
                <span>Llamar directamente</span>
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
              className="mt-5 text-xs text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Puedes comunicarte con nosotros vía WHATSAPP</span>
              <span className="text-cyan-400">→</span>
            </motion.a>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 2: MANEJO INTEGRADO DE PLAGAS (MIP)                                */}
        {/* ========================================================================= */}
        <section
          id="mip"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 lg:py-0 overflow-hidden bg-[#070b16]"
        >
          {/* Subtle Ambient Background */}
          <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
            {/* Vertical Section Ribbon (as seen in Image 3) */}
            <div className="hidden xl:flex items-center gap-3">
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 font-bold vertical-lr py-4 border-l border-cyan-500/30">
                MANEJO INTEGRADO DE PLAGAS
              </span>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="mb-8 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Protocolo Técnico MIP
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Manejo Integrado de Plagas (MIP)
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl font-light">
                  A través de nuestro servicio, implementamos sistemas avanzados de detección temprana, barreras físicas perimetrales y cebado técnico para la protección integral de tus instalaciones y colaboradores.
                </p>
              </div>

              {/* 3 Vertical Liquid Glass Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {/* Card 1: Prevención */}
                <GlassCard
                  badge="Prevención"
                  icon={ShieldAlert}
                  title="Reducción de Riesgos para la Salud"
                  subtitle="Evaluación de Riesgos"
                  description="Protegemos el bienestar de tu capital humano minimizando radicalmente la exposición a plaguicidas y productos químicos nocivos. Mediante este enfoque proactivo, aseguramos un entorno laboral totalmente seguro que cumple con los más altos estándares de salud ocupacional."
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
                  title="Conservación de la Infraestructura"
                  subtitle="Tecnología & Sensores"
                  description="Protegemos tus activos evitando daños costosos provocados por roedores e insectos en áreas críticas de tu empresa, como cableados, maquinaria pesada y estructuras físicas. Mitigamos el desgaste técnico, logrando una reducción drástica en costos de mantenimiento."
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
                  badge="Control"
                  icon={FileCheck2}
                  title="Cumplimiento Normativo y Regulaciones"
                  subtitle="Bajo Impacto Químico"
                  description="Facilitamos el cumplimiento estricto de las normativas de sanidad ambiental vigentes, brindando un blindaje legal ante autoridades de salud. Aseguramos operaciones transparentes, libres de multas o clausuras, respaldadas por reportes digitales y mapas de calor para auditorías."
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
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 3: CONTROL DE ROEDORES                                             */}
        {/* ========================================================================= */}
        <section
          id="roedores"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 lg:py-0 overflow-hidden bg-[#070b16]"
        >
          {/* Subtle Dark Macro Rodent in Corner (Matching Reference Image 4) */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-35 lg:opacity-65 pointer-events-none mix-blend-screen transition-opacity">
            <Image
              src="/images/rodent_macro.jpg"
              alt="Control de Roedores de Importancia Sanitaria"
              fill
              className="object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070b16] via-[#070b16]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-transparent to-[#070b16]/80" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10">
            {/* Header */}
            <div className="mb-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 mb-3">
                <AlertTriangle className="h-3.5 w-3.5" />
                Vectores de Alta Criticidad
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Control Avanzado de Roedores
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Erradicación técnica y exclusión estructural de Rattus norvegicus, Rattus rattus y Mus musculus. Protegemos la integridad sanitaria y los sistemas eléctricos de tu compañía.
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
                description="Los roedores son vectores primarios de Leptospirosis, Salmonelosis y Hantavirus. Eliminamos focos biológicos y contaminaciones cruzadas en depósitos, almacenes de materia prima y zonas de procesamiento alimentario."
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
                description="Despliegue perimetral de cajas cebaderas termo-formadas de alta resistencia con llave de seguridad de doble perno. Incluyen rodenticidas anticoagulantes de segunda generación fijados mecánicamente sin riesgo de arrastre."
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
        {/* SECCIÓN 4: CONTROL DE AVES                                                 */}
        {/* ========================================================================= */}
        <section
          id="aves"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 lg:py-0 overflow-hidden bg-[#070b16]"
        >
          {/* Background Industrial Roof with Overlay */}
          <div className="absolute inset-0 opacity-25 lg:opacity-45 pointer-events-none">
            <Image
              src="/images/birds_exclusion.jpg"
              alt="Protección estructural de aves en techos industriales"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#070b16]/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-transparent to-[#070b16]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10">
            {/* Header */}
            <div className="mb-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
                <Building2 className="h-3.5 w-3.5" />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {/* Solution 1: Mallas */}
              <GlassCard
                badge="Exclusión Física"
                icon={Layers}
                title="Mallas Anti-Aves de Alta Tenacidad"
                subtitle="100% Hermetismo"
                description="Redes de polietileno de alta densidad estabilizado contra rayos ultravioleta (UV). Bloquean el ingreso de aves a cerchas, estructuras elevadas y silos sin comprometer la ventilación ni la iluminación natural."
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
                description="Sistemas mecánicos de varillas de acero quirúrgico grado 316 sobre base de policarbonato virgen. Impiden el posamiento y anidamiento en cornisas, perfiles de marquesinas, tuberías aéreas y letreros comerciales."
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
                description="Dispositivos ópticos reflectivos y proyectores láser automatizados que simulan barreras visuales de peligro. Ideal para hangares logísticos, puertos y grandes centros de distribución de alta rotación."
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
        {/* SECCIÓN 5: CONTROL DE TERMITAS (Matching Reference Image 1)               */}
        {/* ========================================================================= */}
        <section
          id="termitas"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 lg:py-0 overflow-hidden bg-[#070b16]"
        >
          {/* Macro Termite Image on Left Side (Matching Reference Screenshot 1) */}
          <div className="absolute left-0 top-0 bottom-0 w-full lg:w-1/2 opacity-35 lg:opacity-65 pointer-events-none mix-blend-screen transition-opacity">
            <Image
              src="/images/termite_macro.jpg"
              alt="Soldier Termite Macro Sanivex"
              fill
              className="object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#070b16] via-[#070b16]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-transparent to-[#070b16]/80" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-end">
            {/* Header (Aligned right/center to give space to termite on left) */}
            <div className="mb-8 max-w-3xl w-full text-left lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 mb-3">
                <Search className="h-3.5 w-3.5" />
                Protección Invisible de la Infraestructura
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Servicios de Control de Termitas
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-3xl">
                Las termitas representan una de las plagas más destructivas para la infraestructura, consumiendo celulosa desde el interior y generando un deterioro progresivo e invisible. A través de nuestro servicio, implementamos sistemas avanzados de detección temprana, barreras químicas perimetrales y cebado para la protección integral de tu propiedad en Colombia.
              </p>
            </div>

            {/* 3 Liquid Glass Cards (Matching Reference Image 1 titles) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full">
              {/* Card 1 */}
              <GlassCard
                badge="Diagnóstico"
                icon={Search}
                title="Prevención de Daños Invisibles y Sobrecostos"
                subtitle="Detección Temprana"
                description="Las termitas consumen celulosa desde el interior de las estructuras, generando un deterioro progresivo y silencioso. Nuestro control técnico evita colapsos en la infraestructura y elevados sobrecostos de reparación que no suelen cubrir las pólizas de seguro."
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
                description="Identificamos y blindamos los puntos clave de vulnerabilidad ante termitas subterráneas, de madera seca y húmeda. Protegemos integralmente tu inversión, desde cimientos y vigas de soporte, hasta revestimientos, paneles de yeso (drywall) y mobiliario."
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
                description="Implementamos sistemas de cebado y monitoreo para la eliminación total y definitiva de las colonias (incluyendo a la reina). Además, creamos barreras químicas perimetrales mediante inyección en el suelo y aplicamos tratamientos directos de larga residualidad."
                bullets={[
                  'Cebos con inhibidores de síntesis de quitina (IGR)',
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
        {/* SECCIÓN 6: SANITIZACIÓN Y DESINFECCIÓN                                     */}
        {/* ========================================================================= */}
        <section
          id="sanitizacion"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-between px-4 sm:px-8 lg:px-16 pt-20 pb-8 overflow-hidden bg-[#070b16]"
        >
          {/* Background Image with Clean Tech Gradient */}
          <div className="absolute inset-0 opacity-20 lg:opacity-35 pointer-events-none">
            <Image
              src="/images/sanitization_clean.jpg"
              alt="Sanitización y desinfección de alto nivel"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#070b16]/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-transparent to-[#070b16]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
            {/* Header */}
            <div className="mb-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-300 mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                Bioseguridad Grado Quirúrgico
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
                description="Reducción significativa del ausentismo laboral por afecciones respiratorias y gastrointestinales. Generamos entornos de trabajo confiables y salubres que fortalecen la productividad y reputación de tu marca."
                bullets={[
                  'Aplicación fuera de horarios laborales para cero interferencia',
                  'Tiempos rápidos de reingreso seguro (menores a 2 horas)',
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

          {/* Integrated Footer Bar */}
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

            <div className="flex items-center gap-3 text-slate-500">
              <span>&copy; {new Date().getFullYear()} SANIVEX SAS. Todos los derechos reservados.</span>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
