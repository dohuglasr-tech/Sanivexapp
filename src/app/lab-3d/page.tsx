'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { RotateCcw, Play, Pause, Sliders, Eye } from 'lucide-react';
import geo from './logo-geometry.json';

/* ------------------------------------------------------------------ */
/*  GEOMETRY CONSTANTS                                                */
/* ------------------------------------------------------------------ */
type Box = { x: number; y: number; w: number; h: number };
type TipKey = 'tl' | 'tr' | 'bl' | 'br';
type LetterKey = 's' | 'a' | 'n' | 'i' | 'v' | 'e' | 'x';

const STAGE_W = 960;
const STAGE_H = 420;
const K = 1.45; // wordmark scale
const KI = 0.22; // icon scale

const iconPieces = geo.icon.pieces as unknown as Record<'head' | TipKey, Box>;
const letterBoxes = geo.text.letters as unknown as Record<LetterKey, Box>;
const IC = geo.icon.center;
const TEXT_W = geo.text.source.w * K;
const TEXT_H = geo.text.source.h * K;
const X0 = (STAGE_W - TEXT_W) / 2;
const Y0 = (STAGE_H - TEXT_H) / 2;

type Rect = { left: number; top: number; w: number; h: number };
const iconRect = (b: Box): Rect => ({
  left: STAGE_W / 2 + (b.x - IC.x) * KI,
  top: STAGE_H / 2 + (b.y - IC.y) * KI,
  w: b.w * KI,
  h: b.h * KI,
});
const letterRect = (b: Box): Rect => ({
  left: X0 + b.x * K,
  top: Y0 + b.y * K,
  w: b.w * K,
  h: b.h * K,
});

const TIPS: TipKey[] = ['tl', 'tr', 'bl', 'br'];
const LETTERS: LetterKey[] = ['s', 'a', 'n', 'i', 'v', 'e', 'x'];

/* ------------------------------------------------------------------ */
/*  THE 4 CONTINUOUS DRAWING PATHS (1 part -> 1 line)                 */
/* ------------------------------------------------------------------ */
// P1 (from TL: 445, 171): Sweeps to left, traces S curves, sweeps to A apex and legs
const PATH_TL = 'M 445 171 C 350 135, 230 145, 175 184 C 150 170, 120 171, 100 190 C 88 202, 112 216, 138 210 C 166 204, 182 220, 176 235 C 168 250, 120 252, 98 238 C 135 254, 180 254, 215 250 L 260 170 L 305 250 M 235 222 L 285 222';

// P2 (from BL: 445, 251): Sweeps down-left, traces N (left stem, diagonal, right stem)
const PATH_BL = 'M 445 251 C 410 275, 375 275, 352 250 L 352 170 L 430 250 L 430 170';

// P3 (from TR: 515, 171): Traces vertical stem of I, then sweeps down & up for V
const PATH_TR = 'M 515 171 C 505 160, 486 160, 486 170 L 486 250 C 486 265, 520 210, 536 170 L 581 250 L 626 170';

// P4 (from BR: 515, 251): Sweeps right into E (stem & 3 bars) and crosses X (both diagonals)
const PATH_BR = 'M 515 251 C 560 280, 630 275, 672 250 L 672 170 L 738 170 M 672 210 L 726 210 M 672 250 L 738 250 M 780 170 L 864 250 M 864 170 L 780 250';

const MILESTONES = [
  { id: 'rest', label: '1 · Isotipo en reposo' },
  { id: 'lines', label: '2 · Se convierte en 4 líneas' },
  { id: 'draw', label: '3 · Líneas dibujan SANIVEX' },
  { id: 'sink', label: '4 · Círculo entra dentro de la I' },
  { id: 'final', label: '5 · SANIVEX completo' },
] as const;

export default function LoadingScreenLab() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [ready, setReady] = useState(false);
  const [fit, setFit] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);

  // SVG Path refs
  const pathTLRef = useRef<SVGPathElement | null>(null);
  const pathBLRef = useRef<SVGPathElement | null>(null);
  const pathTRRef = useRef<SVGPathElement | null>(null);
  const pathBRRef = useRef<SVGPathElement | null>(null);

  // Responsive scale fit
  useEffect(() => {
    const update = () => {
      const s = Math.min(1, (window.innerWidth * 0.94) / STAGE_W, (window.innerHeight * 0.72) / STAGE_H);
      setFit(Math.max(0.32, s));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Preload images
  useEffect(() => {
    let cancelled = false;
    const urls = [
      ...TIPS.map((t) => `/logos/loader/wing-${t}.png`),
      '/logos/loader/head.png',
      ...LETTERS.map((l) => `/logos/loader/letter-${l}.png`),
      '/logos/sanivex-text-white.png',
    ];
    Promise.all(
      urls.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          })
      )
    ).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Build the GSAP timeline with continuous fluid motion
  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);
      const tip = (t: TipKey) => q(`[data-tip="${t}"]`)[0];
      const letter = (l: LetterKey) => q(`[data-letter="${l}"]`)[0];
      const head = q('[data-head]')[0];
      const headAbsorbed = q('[data-head-absorbed]')[0];
      const aura = q('[data-aura]')[0];
      const shimmer = q('[data-shimmer]')[0];
      const tagline = q('[data-tagline]')[0];
      const fullLogo = q('[data-full-logo]')[0];

      // Measure SVG path lengths
      const lenTL = pathTLRef.current?.getTotalLength() || 720;
      const lenBL = pathBLRef.current?.getTotalLength() || 440;
      const lenTR = pathTRRef.current?.getTotalLength() || 540;
      const lenBR = pathBRRef.current?.getTotalLength() || 700;

      // Set initial SVG path stroke dash
      [
        { el: pathTLRef.current, len: lenTL },
        { el: pathBLRef.current, len: lenBL },
        { el: pathTRRef.current, len: lenTR },
        { el: pathBRRef.current, len: lenBR },
      ].forEach(({ el, len }) => {
        if (el) {
          gsap.set(el, {
            strokeDasharray: len,
            strokeDashoffset: len,
            opacity: 1,
          });
        }
      });

      // Initial visual states
      TIPS.forEach((t) => gsap.set(tip(t), { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1, filter: 'blur(0px)' }));
      LETTERS.forEach((l) => gsap.set(letter(l), { opacity: 0, scale: 0.96 }));
      gsap.set(head, { x: 0, y: 0, scale: 1, opacity: 1 });
      gsap.set(headAbsorbed, { y: -30, scale: 0.7, opacity: 0 }); // starts above inside the I
      gsap.set(aura, { opacity: 0.35, scale: 0.95 });
      gsap.set(fullLogo, { opacity: 0 });
      gsap.set(shimmer, { x: -300 });
      gsap.set(tagline, { opacity: 0, y: 12 });

      // Create continuous master timeline
      const tl = gsap.timeline({
        paused: false,
        onUpdate: () => {
          setProgress(tl.progress());
          setTime(tl.time());
        },
        onComplete: () => setIsPlaying(false),
      });
      timelineRef.current = tl;

      // =========================================================
      // 1. ISOTIPO EN REPOSO (0.0s - 0.45s)
      // =========================================================
      tl.addLabel('rest', 0);
      tl.to(aura, { opacity: 0.8, scale: 1.15, duration: 0.45, ease: 'sine.inOut' }, 0);

      // =========================================================
      // 2. SEPARACIÓN Y METAMORFOSIS EN 4 LÍNEAS (0.45s - 0.95s)
      // Cada una de las 4 partes se estira y se convierte en 1 línea
      // =========================================================
      tl.addLabel('lines', 0.45);

      // Desarmado continuo: cada parte se deforma y adelgaza convirtiéndose en un filamento láser
      tl.to(
        tip('tl'),
        { x: -35, y: -16, scaleX: 1.9, scaleY: 0.12, opacity: 0, filter: 'blur(1.5px)', duration: 0.5, ease: 'power2.in' },
        'lines'
      );
      tl.to(
        tip('bl'),
        { x: -35, y: 16, scaleX: 1.9, scaleY: 0.12, opacity: 0, filter: 'blur(1.5px)', duration: 0.5, ease: 'power2.in' },
        'lines'
      );
      tl.to(
        tip('tr'),
        { x: 35, y: -16, scaleX: 1.9, scaleY: 0.12, opacity: 0, filter: 'blur(1.5px)', duration: 0.5, ease: 'power2.in' },
        'lines'
      );
      tl.to(
        tip('br'),
        { x: 35, y: 16, scaleX: 1.9, scaleY: 0.12, opacity: 0, filter: 'blur(1.5px)', duration: 0.5, ease: 'power2.in' },
        'lines'
      );

      // El círculo asciende suavemente para colocarse en el eje vertical de la "I" (x: 486)
      tl.to(
        head,
        {
          x: 6, // 480 -> 486 alineación vertical perfecta con la I
          y: -58,
          scale: 0.85,
          duration: 0.85,
          ease: 'power2.out',
        },
        'lines'
      );

      // =========================================================
      // 3. LAS 4 LÍNEAS DIBUJAN SANIVEX (0.65s - 2.15s)
      // Cada línea dibuja fluidamente su sección y se disuelve
      // =========================================================
      tl.addLabel('draw', 0.65);

      // Línea 1 (desde TL): Dibuja S y A
      if (pathTLRef.current) {
        tl.to(
          pathTLRef.current,
          {
            strokeDashoffset: 0,
            duration: 1.35,
            ease: 'power1.inOut',
          },
          'draw'
        );
        // La línea se desvanece suavemente al finalizar de trazar sus letras
        tl.to(pathTLRef.current, { opacity: 0, duration: 0.35, ease: 'power2.out' }, 'draw+=1.25');
      }
      tl.fromTo(letter('s'), { opacity: 0, scale: 0.94, filter: 'brightness(2)' }, { opacity: 1, scale: 1, filter: 'brightness(1)', duration: 0.45, ease: 'power2.out' }, 'draw+=0.4');
      tl.fromTo(letter('a'), { opacity: 0, scale: 0.94, filter: 'brightness(2)' }, { opacity: 1, scale: 1, filter: 'brightness(1)', duration: 0.45, ease: 'power2.out' }, 'draw+=0.85');

      // Línea 2 (desde BL): Dibuja N
      if (pathBLRef.current) {
        tl.to(
          pathBLRef.current,
          {
            strokeDashoffset: 0,
            duration: 1.25,
            ease: 'power1.inOut',
          },
          'draw+=0.08'
        );
        tl.to(pathBLRef.current, { opacity: 0, duration: 0.35, ease: 'power2.out' }, 'draw+=1.2');
      }
      tl.fromTo(letter('n'), { opacity: 0, scale: 0.94, filter: 'brightness(2)' }, { opacity: 1, scale: 1, filter: 'brightness(1)', duration: 0.45, ease: 'power2.out' }, 'draw+=0.65');

      // Línea 3 (desde TR): Dibuja el tallo de la I y la V
      if (pathTRRef.current) {
        tl.to(
          pathTRRef.current,
          {
            strokeDashoffset: 0,
            duration: 1.3,
            ease: 'power1.inOut',
          },
          'draw+=0.05'
        );
        tl.to(pathTRRef.current, { opacity: 0, duration: 0.35, ease: 'power2.out' }, 'draw+=1.25');
      }
      tl.fromTo(letter('i'), { opacity: 0, scale: 0.94, filter: 'brightness(2)' }, { opacity: 1, scale: 1, filter: 'brightness(1)', duration: 0.4, ease: 'power2.out' }, 'draw+=0.4');
      tl.fromTo(letter('v'), { opacity: 0, scale: 0.94, filter: 'brightness(2)' }, { opacity: 1, scale: 1, filter: 'brightness(1)', duration: 0.45, ease: 'power2.out' }, 'draw+=0.8');

      // Línea 4 (desde BR): Dibuja E y X
      if (pathBRRef.current) {
        tl.to(
          pathBRRef.current,
          {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: 'power1.inOut',
          },
          'draw+=0.12'
        );
        tl.to(pathBRRef.current, { opacity: 0, duration: 0.35, ease: 'power2.out' }, 'draw+=1.35');
      }
      tl.fromTo(letter('e'), { opacity: 0, scale: 0.94, filter: 'brightness(2)' }, { opacity: 1, scale: 1, filter: 'brightness(1)', duration: 0.45, ease: 'power2.out' }, 'draw+=0.75');
      tl.fromTo(letter('x'), { opacity: 0, scale: 0.94, filter: 'brightness(2)' }, { opacity: 1, scale: 1, filter: 'brightness(1)', duration: 0.5, ease: 'power2.out' }, 'draw+=1.1');

      // =========================================================
      // 4. EL CÍRCULO ENTRA Y DESAPARECE DENTRO DE LA MISMA "I" (1.85s - 2.55s)
      // Desciende desde arriba, penetra en la I y se absorbe por completo
      // =========================================================
      tl.addLabel('sink', 1.85);

      // La cabeza externa desciende hacia el borde superior de la I
      tl.to(
        head,
        {
          y: 4, // llega al tope superior del tallo de la I
          scale: 0.7,
          duration: 0.42,
          ease: 'power2.in',
        },
        'sink'
      );

      // Transición fluida: pasa de la esfera externa al interior de la "I"
      tl.set(head, { opacity: 0 }, 'sink+=0.42');
      tl.set(headAbsorbed, { opacity: 1, y: -28, scale: 0.75 }, 'sink+=0.42');

      // El círculo viaja hacia abajo DENTRO del cuerpo de la I y se desintegra/absorbe
      tl.to(
        headAbsorbed,
        {
          y: 34, // se hunde hacia el centro del tallo de la I
          scale: 0.3,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
        },
        'sink+=0.42'
      );

      // Pulso luminoso interno de absorción en la "I"
      tl.to(
        letter('i'),
        {
          filter: 'drop-shadow(0 0 20px rgba(56, 189, 248, 1)) drop-shadow(0 0 35px rgba(255, 255, 255, 0.95)) brightness(1.5)',
          duration: 0.25,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
        },
        'sink+=0.55'
      );

      // =========================================================
      // 5. UNIFICACIÓN Y BRILLO FINAL DE SANIVEX (2.55s - 3.4s)
      // =========================================================
      tl.addLabel('final', 2.55);

      // El logo final vectorizado toma el relevo con nitidez cristalina
      tl.to(fullLogo, { opacity: 1, duration: 0.35, ease: 'power1.inOut' }, 'final');

      // Haz de luz que barre de izquierda a derecha
      tl.fromTo(
        shimmer,
        { x: -350, opacity: 0 },
        {
          x: TEXT_W + 350,
          opacity: 1,
          duration: 0.85,
          ease: 'power2.inOut',
        },
        'final+=0.15'
      );

      // Subtítulo corporativo aparece suavemente
      tl.to(
        tagline,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        'final+=0.35'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [ready]);

  // Adjust speed multiplier
  useEffect(() => {
    timelineRef.current?.timeScale(speed);
  }, [speed]);

  // Playback handlers
  const restart = useCallback(() => {
    timelineRef.current?.restart();
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (isPlaying) {
      tl.pause();
      setIsPlaying(false);
    } else {
      if (tl.progress() >= 1) tl.restart();
      else tl.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const scrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tl = timelineRef.current;
    if (!tl) return;
    tl.pause();
    const val = parseFloat(e.target.value);
    tl.progress(val);
    setIsPlaying(false);
    setProgress(val);
    setTime(tl.time());
  };

  const jumpToMilestone = (id: string) => {
    const tl = timelineRef.current;
    if (!tl) return;
    tl.pause();
    setIsPlaying(false);

    // Seek to the most descriptive visual point for each milestone
    if (id === 'rest') tl.seek(0);
    else if (id === 'lines') tl.seek(0.68);
    else if (id === 'draw') tl.seek(1.35);
    else if (id === 'sink') tl.seek(2.1);
    else if (id === 'final') tl.seek(2.9);
    else tl.seek(id);

    setProgress(tl.progress());
    setTime(tl.time());
  };

  const headRectR = iconRect(iconPieces.head);
  const iRectR = letterRect(letterBoxes.i);

  return (
    <main
      ref={containerRef}
      className="relative h-screen w-full select-none overflow-hidden font-[var(--font-poppins),var(--font-montserrat),sans-serif]"
      style={{ backgroundColor: '#0a3871' }}
    >
      {/* Fondo con profundidad azul corporativa */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(10,56,113,0)_55%,rgba(3,20,45,0.4)_100%)]" />

      {/* ============================================================ */}
      {/* DESIGN STAGE (960px x 420px responsive canvas) */}
      {/* ============================================================ */}
      <div
        className="absolute left-1/2 top-1/2 cursor-pointer"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `translate(-50%, -50%) scale(${fit})`,
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
        onClick={togglePlay}
        title="Clic para pausar / reanudar"
      >
        {/* Aura de respiración ambiental */}
        <div
          data-aura
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/20 blur-[90px]"
        />

        {/* ============================================================ */}
        {/* CAPA 1: LAS 4 PUNTAS DEL ISOTIPO (METAMORFOSIS EN LÍNEAS) */}
        {/* ============================================================ */}
        {TIPS.map((t) => {
          const r = iconRect(iconPieces[t]);
          return (
            <div
              key={t}
              data-tip={t}
              className="pointer-events-none absolute will-change-transform"
              style={{
                left: r.left,
                top: r.top,
                width: r.w,
                height: r.h,
                zIndex: 10,
              }}
            >
              <Image
                src={`/logos/loader/wing-${t}.png`}
                alt=""
                width={iconPieces[t].w}
                height={iconPieces[t].h}
                unoptimized
                priority
                draggable={false}
                className="h-full w-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.3)]"
              />
            </div>
          );
        })}

        {/* ============================================================ */}
        {/* CAPA 2: EL CÍRCULO (CABEZA EXTERNA) */}
        {/* ============================================================ */}
        <div
          data-head
          className="pointer-events-none absolute will-change-transform"
          style={{
            left: headRectR.left,
            top: headRectR.top,
            width: headRectR.w,
            height: headRectR.h,
            zIndex: 15,
          }}
        >
          <Image
            src="/logos/loader/head.png"
            alt=""
            width={iconPieces.head.w}
            height={iconPieces.head.h}
            unoptimized
            priority
            draggable={false}
            className="h-full w-full object-contain drop-shadow-[0_0_15px_rgba(186,230,253,0.7)]"
          />
        </div>

        {/* ============================================================ */}
        {/* CAPA 3: SVG DE LAS 4 LÍNEAS DE TRAZO LUMINOSO */}
        {/* ============================================================ */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
          style={{ zIndex: 20 }}
        >
          <defs>
            {/* Gradiente y filtro de neón para los trazos */}
            <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Línea 1 (desde TL): Dibuja S y A */}
          <path
            ref={pathTLRef}
            d={PATH_TL}
            fill="none"
            stroke="url(#neonCyan)"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#laserGlow)"
          />

          {/* Línea 2 (desde BL): Dibuja N */}
          <path
            ref={pathBLRef}
            d={PATH_BL}
            fill="none"
            stroke="url(#neonCyan)"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#laserGlow)"
          />

          {/* Línea 3 (desde TR): Dibuja I y V */}
          <path
            ref={pathTRRef}
            d={PATH_TR}
            fill="none"
            stroke="url(#neonCyan)"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#laserGlow)"
          />

          {/* Línea 4 (desde BR): Dibuja E y X */}
          <path
            ref={pathBRRef}
            d={PATH_BR}
            fill="none"
            stroke="url(#neonCyan)"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#laserGlow)"
          />
        </svg>

        {/* ============================================================ */}
        {/* CAPA 4: LETRAS SOLIDIFICADAS DE SANIVEX */}
        {/* ============================================================ */}
        {LETTERS.map((l) => {
          const r = letterRect(letterBoxes[l]);

          // Especial: La 'I' tiene un contenedor con overflow:hidden para que el círculo
          // entre dentro de ella y desaparezca en su interior
          if (l === 'i') {
            return (
              <div
                key={l}
                data-letter-container="i"
                className="pointer-events-none absolute overflow-hidden will-change-transform"
                style={{
                  left: r.left - 6,
                  top: r.top - 6,
                  width: r.w + 12,
                  height: r.h + 12,
                  zIndex: 25,
                }}
              >
                {/* Cuerpo de la I */}
                <div
                  data-letter="i"
                  className="relative h-full w-full"
                  style={{ padding: '6px' }}
                >
                  <Image
                    src="/logos/loader/letter-i.png"
                    alt=""
                    width={Math.round(letterBoxes.i.w)}
                    height={Math.round(letterBoxes.i.h)}
                    unoptimized
                    priority
                    draggable={false}
                    className="h-full w-full object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
                  />
                </div>

                {/* El círculo que viaja DENTRO de la I y se absorbe */}
                <div
                  data-head-absorbed
                  className="absolute left-1/2 top-1/2 -ml-3 -mt-3 h-6 w-6 rounded-full bg-white shadow-[0_0_12px_#38bdf8,0_0_20px_#ffffff] will-change-transform"
                />
              </div>
            );
          }

          return (
            <div
              key={l}
              data-letter={l}
              className="pointer-events-none absolute will-change-transform"
              style={{
                left: r.left,
                top: r.top,
                width: r.w,
                height: r.h,
                zIndex: 22,
              }}
            >
              <Image
                src={`/logos/loader/letter-${l}.png`}
                alt=""
                width={Math.round(letterBoxes[l].w)}
                height={Math.round(letterBoxes[l].h)}
                unoptimized
                priority
                draggable={false}
                className="h-full w-full object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
              />
            </div>
          );
        })}

        {/* ============================================================ */}
        {/* CAPA 5: LOGO COMPLETO UNIFICADO + SHIMMER FINAL */}
        {/* ============================================================ */}
        <div
          data-full-logo
          className="pointer-events-none absolute will-change-opacity"
          style={{
            left: X0,
            top: Y0,
            width: TEXT_W,
            height: TEXT_H,
            zIndex: 30,
          }}
        >
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src="/logos/sanivex-text-white.png"
              alt="SANIVEX"
              width={542}
              height={60}
              priority
              className="h-full w-full object-contain drop-shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
            />

            {/* Haz de brillo que barre las letras al finalizar */}
            <div
              data-shimmer
              className="absolute inset-y-0 -left-[140px] w-[140px] -skew-x-[25deg] mix-blend-overlay"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)',
              }}
            />
          </div>
        </div>

        {/* Subtítulo corporativo */}
        <div
          data-tagline
          className="pointer-events-none absolute w-full text-center"
          style={{ top: Y0 + TEXT_H + 22, zIndex: 30 }}
        >
          <p className="text-xs sm:text-sm font-semibold tracking-[0.26em] uppercase text-sky-200/85 drop-shadow-md">
            Control de Plagas y Sanidad Ambiental
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PANEL DE PRUEBAS INTERACTIVO */}
      {/* ============================================================ */}

      {/* Selector rápido de hitos */}
      <div className="absolute left-1/2 top-5 z-50 -translate-x-1/2">
        <div className="flex max-w-[94vw] items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-[#051c3a]/85 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {MILESTONES.map((m) => (
            <button
              key={m.id}
              onClick={() => jumpToMilestone(m.id)}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white sm:text-xs"
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controles flotantes */}
      <div
        className={`absolute bottom-6 left-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 transition-all duration-300 ${
          showControls ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <div className="rounded-2xl border border-white/15 bg-[#051c3a]/90 p-3.5 text-white shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-4">
          <div className="mb-3 flex items-center gap-3">
            <span className="w-12 font-mono text-[11px] text-sky-300">{time.toFixed(2)}s</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.002"
              value={progress}
              onChange={scrub}
              className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-white/15 accent-sky-400 hover:accent-sky-300"
            />
            <span className="w-10 text-right font-mono text-[11px] text-white/60">{speed}x</span>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <div className="flex items-center gap-2">
              <button
                onClick={restart}
                className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium transition-all hover:bg-white/20 active:scale-95"
              >
                <RotateCcw className="h-3.5 w-3.5 text-sky-300" />
                Reiniciar
              </button>

              <button
                onClick={togglePlay}
                className="flex items-center gap-1.5 rounded-lg bg-sky-500/80 px-3.5 py-1.5 text-xs font-semibold shadow-md shadow-sky-500/20 transition-all hover:bg-sky-500 active:scale-95"
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                {isPlaying ? 'Pausar' : 'Reproducir'}
              </button>
            </div>

            <div className="flex items-center gap-1">
              {[0.25, 0.5, 1, 1.5].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`rounded-md px-2 py-1 font-mono text-[11px] transition-all ${
                    speed === s ? 'bg-white font-bold text-[#0a3871] shadow-sm' : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Botón de alternar controles */}
      <button
        onClick={() => setShowControls((s) => !s)}
        className="absolute bottom-6 right-6 z-50 rounded-full border border-white/15 bg-black/40 p-2.5 text-white/80 shadow-lg backdrop-blur-md transition-all hover:bg-black/60 hover:text-white active:scale-90"
        title={showControls ? 'Ocultar controles' : 'Mostrar controles'}
      >
        {showControls ? <Sliders className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </main>
  );
}
