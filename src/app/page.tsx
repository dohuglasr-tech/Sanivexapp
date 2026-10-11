'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
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

// Azul institucional Sanivex
const SANIVEX_BLUE = 0x0a3871;

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Manejo Integrado de Plagas (MIP)');
  const mountRef = useRef<HTMLDivElement | null>(null);
  const isPlayingRef = useRef(true);

  // 3D Sanivex emblem (se renderiza en desktop >= 1024px, 0% consumo en móvil)
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 21);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Soft studio reflections (environment map)
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    // Lighting (cool rim + key light + moving highlight)
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const keyLight = new THREE.DirectionalLight(0xe2e8f0, 2.6);
    keyLight.position.set(12, 16, 18);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x94a3b8, 3.5, 34);
    rimLight.position.set(-16, -10, -12);
    scene.add(rimLight);

    const cyanBack = new THREE.PointLight(0x61dafb, 2.2, 28);
    cyanBack.position.set(0, -12, -8);
    scene.add(cyanBack);

    // Traveling highlight that sweeps across the surface
    const sweepLight = new THREE.PointLight(0xffffff, 40, 26, 1.6);
    scene.add(sweepLight);

    // ---------------------------------------------------------------
    // Emblem geometry (faithful to official logo)
    // ---------------------------------------------------------------
    const emblem = new THREE.Group();
    emblem.rotation.z = (8 * Math.PI) / 180;
    scene.add(emblem);

    const blueMat = new THREE.MeshPhysicalMaterial({
      color: SANIVEX_BLUE,
      metalness: 0.55,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.15,
      emissive: SANIVEX_BLUE,
      emissiveIntensity: 0.2,
    });

    const buildHalfShape = (side: 1 | -1) => {
      const x = (v: number) => v * side;
      const s = new THREE.Shape();

      s.moveTo(x(-3.2), 3.6);
      s.lineTo(x(-0.3), 0.75);
      s.bezierCurveTo(x(-0.16), 0.5, x(-0.06), 0.26, x(-0.06), 0);
      s.bezierCurveTo(x(-0.06), -0.26, x(-0.16), -0.5, x(-0.3), -0.75);
      s.lineTo(x(-3.2), -3.6);
      s.lineTo(x(-3.2), -1.85);
      s.bezierCurveTo(x(-3.2), -1.2, x(-2.66), -0.67, x(-2.0), -0.67);
      s.lineTo(x(-0.68), -0.67);
      s.bezierCurveTo(x(-0.42), -0.67, x(-0.19), -0.38, x(-0.19), 0);
      s.bezierCurveTo(x(-0.19), 0.38, x(-0.42), 0.67, x(-0.68), 0.67);
      s.lineTo(x(-2.0), 0.67);
      s.bezierCurveTo(x(-2.66), 0.67, x(-3.2), 1.2, x(-3.2), 1.85);
      s.lineTo(x(-3.2), 3.6);

      return s;
    };

    const extrude: THREE.ExtrudeGeometryOptions = {
      depth: 0.4,
      curveSegments: 48,
      bevelEnabled: true,
      bevelSegments: 10,
      bevelThickness: 0.1,
      bevelSize: 0.035,
      bevelOffset: 0,
    };

    const leftGeo = new THREE.ExtrudeGeometry(buildHalfShape(1), extrude);
    leftGeo.translate(0, 0, -extrude.depth! / 2);
    leftGeo.computeVertexNormals();

    const rightGeo = new THREE.ExtrudeGeometry(buildHalfShape(-1), extrude);
    rightGeo.translate(0, 0, -extrude.depth! / 2);
    rightGeo.computeVertexNormals();

    // Pest images inside emblem (subtle macro photography)
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 2048;
    texCanvas.height = 2304;
    const tctx = texCanvas.getContext('2d')!;

    const hexBlue = '#0a3871';
    const paintBase = () => {
      tctx.globalAlpha = 1;
      tctx.filter = 'none';
      tctx.fillStyle = hexBlue;
      tctx.fillRect(0, 0, texCanvas.width, texCanvas.height);
    };
    paintBase();

    const pestTexture = new THREE.CanvasTexture(texCanvas);
    pestTexture.colorSpace = THREE.SRGBColorSpace;
    pestTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    pestTexture.repeat.set(1 / 6.4, 1 / 7.2);
    pestTexture.offset.set(0.5, 0.5);

    const pestSources = [
      {
        src: '/images/pests/rata_studio.jpg',
        col: 0,
        row: 0,
        fx: 0.52,
        fy: 0.04,
        fw: 0.48,
        fh: 0.94,
        mirrorX: false,
      },
      {
        src: '/images/pests/paloma_studio.jpg',
        col: 1,
        row: 0,
        fx: 0.53,
        fy: 0.02,
        fw: 0.47,
        fh: 0.98,
        mirrorX: false,
      },
      {
        src: '/images/pests/cucaracha_studio.jpg',
        col: 0,
        row: 1,
        fx: 0.0,
        fy: 0.0,
        fw: 0.5,
        fh: 0.98,
        mirrorX: false,
      },
      {
        src: '/images/pests/plagas_trio.jpg',
        col: 1,
        row: 1,
        fx: 0.0,
        fy: 0.0,
        fw: 0.35,
        fh: 0.48,
        mirrorX: true,
      },
    ];

    let disposed = false;
    const loaded: { img: HTMLImageElement; cfg: (typeof pestSources)[number] }[] = [];

    const repaint = () => {
      paintBase();
      const qw = texCanvas.width / 2;
      const qh = texCanvas.height / 2;

      loaded.forEach(({ img, cfg }) => {
        const sx = cfg.fx * img.naturalWidth;
        const sy = cfg.fy * img.naturalHeight;
        const sw = cfg.fw * img.naturalWidth;
        const sh = cfg.fh * img.naturalHeight;

        tctx.save();
        const dx = cfg.col * qw;
        const dy = cfg.row * qh;

        if (cfg.mirrorX) {
          tctx.translate(dx + qw, dy);
          tctx.scale(-1, 1);
        } else {
          tctx.translate(dx, dy);
        }

        // Studio macro photography clarity with subtle atmospheric integration
        tctx.filter = 'contrast(1.15) saturate(1.1)';
        tctx.globalAlpha = 0.65;
        tctx.drawImage(img, sx, sy, sw, sh, 0, 0, qw, qh);
        tctx.restore();
      });

      // Royal blue wash so corporate Sanivex color remains cohesive
      tctx.save();
      tctx.globalAlpha = 0.22;
      tctx.filter = 'none';
      tctx.fillStyle = hexBlue;
      tctx.fillRect(0, 0, texCanvas.width, texCanvas.height);
      tctx.restore();

      pestTexture.needsUpdate = true;
    };

    pestSources.forEach((cfg) => {
      const img = new window.Image();
      img.onload = () => {
        if (disposed) return;
        loaded.push({ img, cfg });
        repaint();
      };
      img.src = cfg.src;
    });

    const capMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: pestTexture,
      metalness: 0.4,
      roughness: 0.24,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.1,
      emissive: 0xffffff,
      emissiveMap: pestTexture,
      emissiveIntensity: 0.35,
    });

    const wingMaterials = [capMat, blueMat];
    const leftWing = new THREE.Mesh(leftGeo, wingMaterials);
    const rightWing = new THREE.Mesh(rightGeo, wingMaterials);

    const headGeo = new THREE.SphereGeometry(1.0, 96, 96);
    const head = new THREE.Mesh(headGeo, blueMat);
    head.position.set(0, 2.65, 0);

    emblem.add(leftWing, rightWing, head);
    emblem.scale.setScalar(1.35);

    // Orbit controls (drag rotation only, zoom disabled)
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let theta = 0;
    let phi = Math.PI / 2.1;
    let distance = 21;

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      prevX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      prevY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const cy = 'touches' in e ? e.touches[0].clientY : e.clientY;
      theta -= (cx - prevX) * 0.007;
      phi = Math.max(0.5, Math.min(Math.PI - 0.5, phi - (cy - prevY) * 0.007));
      prevX = cx;
      prevY = cy;
    };
    const onUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    container.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (window.innerWidth < 1024) return; // 0% GPU en móvil
      const t = clock.getElapsedTime();

      camera.position.x = distance * Math.sin(phi) * Math.sin(theta);
      camera.position.y = distance * Math.cos(phi);
      camera.position.z = distance * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 0, 0);

      if (isPlayingRef.current) {
        emblem.rotation.y += 0.006;
      }
      emblem.position.y = Math.sin(t * 0.9) * 0.18;

      sweepLight.position.set(Math.cos(t * 0.7) * 10, Math.sin(t * 0.5) * 6, 9 + Math.sin(t * 0.7) * 3);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      disposed = true;
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      container.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);

      leftGeo.dispose();
      rightGeo.dispose();
      headGeo.dispose();
      blueMat.dispose();
      capMat.dispose();
      pestTexture.dispose();
      envTexture.dispose();
      pmrem.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

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
        {/* SECCIÓN 1: HERO PRINCIPAL (Split Hero 3D en Desktop / Clean Fit en Móvil) */}
        {/* ========================================================================= */}
        <section
          id="hero"
          className="relative min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center overflow-hidden bg-[#05070b] px-5 sm:px-8 lg:px-16 pt-[104px] sm:pt-[120px] lg:pt-0 pb-16 lg:pb-0"
        >
          {/* Ambient Lighting, Techno Grid & Top Header Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* 110px Grid overlay matching lab-3d */}
            <div
              className="absolute inset-0 opacity-35"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
                backgroundSize: '110px 110px',
                WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 78%)',
                maskImage: 'radial-gradient(circle at center, black 30%, transparent 78%)',
              }}
            />
            <div className="absolute -top-28 left-1/2 -translate-x-1/2 h-[24rem] w-[84vw] max-w-[1500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(97,218,251,.16),rgba(10,56,113,.14)_50%,transparent_75%)] blur-3xl" />
            <div className="absolute -top-32 left-[10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(97,218,251,.15),transparent_70%)] blur-3xl" />
            <div className="absolute bottom-0 right-[5%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(10,56,113,.28),transparent_70%)] blur-3xl" />
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent via-[#05070b]/80 to-[#121e2c]" />
          </div>

          <div className="relative mx-auto flex flex-col justify-center min-h-[calc(100vh-140px)] sm:min-h-[auto] lg:min-h-0 lg:grid lg:grid-cols-[1.08fr_0.92fr] items-center gap-6 sm:gap-8 lg:gap-14 w-full max-w-[1600px] my-auto z-10">
            {/* Columna Izquierda: Mensaje Comercial, Título Auténtico y Botones de Acción */}
            <div className="relative z-20 max-w-2xl flex flex-col items-start w-full my-auto">
              {/* Top Liquid Pill: "Somos los mejores en" */}
              <div className="bloom active inline-flex items-center gap-2 px-3.5 sm:px-5 py-1.5 rounded-full hero-top-pill text-[11px] sm:text-xs font-normal text-slate-300 tracking-wide select-none mb-2.5 sm:mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span>Somos los mejores en</span>
              </div>

              {/* H1 Heading - Cuadrado, Profesional y Adaptado para Móvil */}
              <h1 className="text-[clamp(2.15rem,9.2vw,4.2rem)] font-bold text-white leading-[1.08] tracking-tight">
                <span className="block">Control de plagas</span>
                <span className="block text-[#5c7090]">y sanidad ambiental</span>
              </h1>

              {/* Subtítulo Auténtico Sanivex */}
              <p className="mt-3 sm:mt-4 text-[13px] sm:text-sm md:text-base text-slate-300/85 max-w-xl leading-relaxed font-light">
                Tu operación segura, nuestra razón de ser. Somos tu aliado estratégico en bioseguridad y manejo integrado para que tú y tu empresa estén 100% protegidos.
              </p>

              {/* Red Alert Pill */}
              <div className="mt-4 sm:mt-5 inline-flex items-center gap-2 px-3.5 sm:px-5 py-1.5 rounded-full hero-alert-pill text-[11px] sm:text-xs font-medium text-red-200/90 tracking-wide max-w-full">
                <AlertTriangle className="h-3.5 w-3.5 text-red-400 shrink-0" />
                <span>¡Alerta de ROEDORES e Insectos en tu área!</span>
              </div>

              {/* Botones de Acción (En desktop: Cotizar y Llamar. En móvil: Llamar en hero y Cotizar sticky abajo) */}
              <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4 w-full">
                {/* Botón Principal (visible en desktop, sticky en móvil) */}
                <button
                  onClick={() => handleOpenQuote('Cotización General')}
                  className="hidden sm:inline-flex py-3.5 px-7 rounded-xl hero-primary-btn font-extrabold text-xs sm:text-sm tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(92,112,144,0.4)] active:scale-[0.98] items-center justify-center gap-2.5 cursor-pointer text-white"
                >
                  <span>SOLICITAR PRESUPUESTO</span>
                  <span className="font-bold text-sm">→</span>
                </button>

                {/* Botón Secundario: Llamar directamente */}
                <a
                  href="tel:+573009123456"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-xl hero-secondary-btn font-bold text-xs sm:text-[13px] tracking-wider uppercase transition-all shadow-lg active:scale-95 cursor-pointer text-[#5c7090] border border-[#5c7090]/40 bg-[#0e1726]/90 hover:bg-[#152338]"
                >
                  <Phone className="h-4 w-4 text-[#5c7090] fill-[#5c7090]" />
                  <span>Llamar: 300-912-3456</span>
                </a>
              </div>

              {/* WhatsApp Helper link */}
              <a
                href="https://wa.me/573009123456?text=Hola%20SANIVEX,%20deseo%20comunicarme%20para%20un%20servicio%20de%20sanidad."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 sm:mt-3.5 text-[11.5px] sm:text-xs text-slate-400 hover:text-[#5c7090] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Puedes comunicarte con nosotros vía <span className="font-semibold text-slate-300">WHATSAPP</span></span>
                <span className="font-bold">→</span>
              </a>

              {/* Trust Badges Bar */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 flex flex-wrap items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400" />
                  Normatividad BPM & INVIMA
                </span>
                <span className="text-white/20 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#61DAFB]" />
                  Protocolo Metodológico MIP
                </span>
                <span className="text-white/20 hidden sm:inline">•</span>
                <span className="text-slate-300">Respuesta &lt; 24h</span>
              </div>
            </div>

            {/* Columna Derecha: Icono 3D de Sanivex en Volumen (ELIMINADO en móvil, visible en escritorio >= lg) */}
            <div className="hidden lg:flex relative flex-col items-center justify-center lg:items-end w-full lg:mt-0 order-2">
              <div className="relative w-full max-w-[440px] lg:max-w-[680px] mx-auto lg:mr-0">
                <div className="organic-shell float-core relative aspect-square w-full scroll-grow bg-[#05070b]/40 min-h-[400px] lg:min-h-[500px]">
                  {/* 3D WebGL Canvas */}
                  <div ref={mountRef} className="h-full w-full cursor-grab active:cursor-grabbing" />

                  {/* Radial subtle vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(5,7,11,0.5)_100%)] pointer-events-none" />
                </div>
              </div>
            </div>
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
