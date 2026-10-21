"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { ArrowLeft, Play, Pause, Phone, AlertTriangle, ShieldCheck, Sparkles, ArrowRight } from "lucide-react"
import { QuoteModal } from "@/components/QuoteModal"
import { Navbar } from "@/components/Navbar"

// Azul institucional Sanivex (extraído del logotipo oficial)
const SANIVEX_BLUE = 0x0a3871

export default function Lab3DPage() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const isPlayingRef = useRef(true)

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    document.documentElement.classList.add("dark", "scroll-smooth")
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    document.querySelectorAll<HTMLElement>(".bloom").forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  // 3D Sanivex emblem (se renderiza en desktop >= 1024px, se pausa en móvil)
  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const scene = new THREE.Scene()

    const width = container.clientWidth || 600
    const height = container.clientHeight || 600

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000)
    camera.position.set(0, 0.8, 21)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // Soft studio reflections (environment map)
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envTexture

    // Lighting (cool rim + key light + moving highlight)
    scene.add(new THREE.AmbientLight(0xffffff, 0.35))

    const keyLight = new THREE.DirectionalLight(0xe2e8f0, 2.6)
    keyLight.position.set(12, 16, 18)
    scene.add(keyLight)

    const rimLight = new THREE.PointLight(0x94a3b8, 3.5, 34)
    rimLight.position.set(-16, -10, -12)
    scene.add(rimLight)

    const cyanBack = new THREE.PointLight(0x61dafb, 2.2, 28)
    cyanBack.position.set(0, -12, -8)
    scene.add(cyanBack)

    // Traveling highlight that sweeps across the surface
    const sweepLight = new THREE.PointLight(0xffffff, 40, 26, 1.6)
    scene.add(sweepLight)

    // ---------------------------------------------------------------
    // Emblem geometry (faithful to the official logo, refined profile)
    // ---------------------------------------------------------------
    const emblem = new THREE.Group()
    emblem.rotation.z = (8 * Math.PI) / 180
    scene.add(emblem)

    const blueMat = new THREE.MeshPhysicalMaterial({
      color: SANIVEX_BLUE,
      metalness: 0.55,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.15,
      emissive: SANIVEX_BLUE,
      emissiveIntensity: 0.2,
    })

    // One half of the wings (left = -1, right = +1), logo units / 100
    const buildHalfShape = (side: 1 | -1) => {
      const x = (v: number) => v * side
      const s = new THREE.Shape()

      s.moveTo(x(-3.2), 3.6)
      s.lineTo(x(-0.3), 0.75)
      s.bezierCurveTo(x(-0.16), 0.5, x(-0.06), 0.26, x(-0.06), 0)
      s.bezierCurveTo(x(-0.06), -0.26, x(-0.16), -0.5, x(-0.3), -0.75)
      s.lineTo(x(-3.2), -3.6)
      s.lineTo(x(-3.2), -1.85)
      s.bezierCurveTo(x(-3.2), -1.2, x(-2.66), -0.67, x(-2.0), -0.67)
      s.lineTo(x(-0.68), -0.67)
      s.bezierCurveTo(x(-0.42), -0.67, x(-0.19), -0.38, x(-0.19), 0)
      s.bezierCurveTo(x(-0.19), 0.38, x(-0.42), 0.67, x(-0.68), 0.67)
      s.lineTo(x(-2.0), 0.67)
      s.bezierCurveTo(x(-2.66), 0.67, x(-3.2), 1.2, x(-3.2), 1.85)
      s.lineTo(x(-3.2), 3.6)

      return s
    }

    const extrude: THREE.ExtrudeGeometryOptions = {
      depth: 0.4,
      curveSegments: 48,
      bevelEnabled: true,
      bevelSegments: 10,
      bevelThickness: 0.1,
      bevelSize: 0.035,
      bevelOffset: 0,
    }

    const leftGeo = new THREE.ExtrudeGeometry(buildHalfShape(1), extrude)
    leftGeo.translate(0, 0, -extrude.depth! / 2)
    leftGeo.computeVertexNormals()

    const rightGeo = new THREE.ExtrudeGeometry(buildHalfShape(-1), extrude)
    rightGeo.translate(0, 0, -extrude.depth! / 2)
    rightGeo.computeVertexNormals()

    // -----------------------------------------------------------
    // Pest images "inside" the emblem (subtle, low opacity)
    // Canvas covers the logo bounds: 6.4 x 7.2 units, one pest per wing
    // -----------------------------------------------------------
    const texCanvas = document.createElement("canvas")
    texCanvas.width = 2048
    texCanvas.height = 2304
    const tctx = texCanvas.getContext("2d")!

    const hexBlue = "#0a3871"
    const paintBase = () => {
      tctx.globalAlpha = 1
      tctx.filter = "none"
      tctx.fillStyle = hexBlue
      tctx.fillRect(0, 0, texCanvas.width, texCanvas.height)
    }
    paintBase()

    const pestTexture = new THREE.CanvasTexture(texCanvas)
    pestTexture.colorSpace = THREE.SRGBColorSpace
    pestTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()
    // Shape UVs are raw (x, y) in logo units -> remap to 0..1 over the logo bounds
    pestTexture.repeat.set(1 / 6.4, 1 / 7.2)
    pestTexture.offset.set(0.5, 0.5)

    // Quadrants: [col, row], crop focus (fractions of the source image)
    const pestSources = [
      // Top-Left: Rata macro de estudio (perfil con iluminación de borde)
      {
        src: "/images/pests/rata_studio.jpg",
        col: 0,
        row: 0,
        fx: 0.52,
        fy: 0.04,
        fw: 0.48,
        fh: 0.94,
        mirrorX: false,
      },
      // Top-Right: Paloma macro de estudio (retrato nítido con plumaje tornasolado)
      {
        src: "/images/pests/paloma_studio.jpg",
        col: 1,
        row: 0,
        fx: 0.53,
        fy: 0.02,
        fw: 0.47,
        fh: 0.98,
        mirrorX: false,
      },
      // Bottom-Left: Cucaracha macro de estudio (antenas y ojo compuesto)
      {
        src: "/images/pests/cucaracha_studio.jpg",
        col: 0,
        row: 1,
        fx: 0.0,
        fy: 0.0,
        fw: 0.5,
        fh: 0.98,
        mirrorX: false,
      },
      // Bottom-Right: Termita / Insecto macro de estudio (mandíbulas y patas)
      {
        src: "/images/pests/plagas_trio.jpg",
        col: 1,
        row: 1,
        fx: 0.0,
        fy: 0.0,
        fw: 0.35,
        fh: 0.48,
        mirrorX: true,
      },
    ]

    let disposed = false
    const loaded: { img: HTMLImageElement; cfg: (typeof pestSources)[number] }[] = []

    const repaint = () => {
      paintBase()
      const qw = texCanvas.width / 2
      const qh = texCanvas.height / 2

      loaded.forEach(({ img, cfg }) => {
        const sx = cfg.fx * img.naturalWidth
        const sy = cfg.fy * img.naturalHeight
        const sw = cfg.fw * img.naturalWidth
        const sh = cfg.fh * img.naturalHeight

        tctx.save()
        const dx = cfg.col * qw
        const dy = cfg.row * qh

        if (cfg.mirrorX) {
          tctx.translate(dx + qw, dy)
          tctx.scale(-1, 1)
        } else {
          tctx.translate(dx, dy)
        }

        // Studio macro photography clarity with subtle atmospheric integration
        tctx.filter = "contrast(1.15) saturate(1.1)"
        tctx.globalAlpha = 0.65
        tctx.drawImage(img, sx, sy, sw, sh, 0, 0, qw, qh)
        tctx.restore()
      })

      // Royal blue wash so corporate Sanivex color remains cohesive
      tctx.save()
      tctx.globalAlpha = 0.22
      tctx.filter = "none"
      tctx.fillStyle = hexBlue
      tctx.fillRect(0, 0, texCanvas.width, texCanvas.height)
      tctx.restore()

      pestTexture.needsUpdate = true
    }

    pestSources.forEach((cfg) => {
      const img = new Image()
      img.onload = () => {
        if (disposed) return
        loaded.push({ img, cfg })
        repaint()
      }
      img.src = cfg.src
    })

    // Cap faces (front/back) show the pests; bevel sides stay solid blue
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
    })

    const wingMaterials = [capMat, blueMat]
    const leftWing = new THREE.Mesh(leftGeo, wingMaterials)
    const rightWing = new THREE.Mesh(rightGeo, wingMaterials)

    const headGeo = new THREE.SphereGeometry(1.0, 96, 96)
    const head = new THREE.Mesh(headGeo, blueMat)
    head.position.set(0, 2.65, 0)

    emblem.add(leftWing, rightWing, head)
    emblem.scale.setScalar(1.35)

    // Orbit controls (drag + wheel)
    let isDragging = false
    let prevX = 0
    let prevY = 0
    let theta = 0
    let phi = Math.PI / 2.1
    const distance = 21

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true
      prevX = "touches" in e ? e.touches[0].clientX : e.clientX
      prevY = "touches" in e ? e.touches[0].clientY : e.clientY
    }
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return
      const cx = "touches" in e ? e.touches[0].clientX : e.clientX
      const cy = "touches" in e ? e.touches[0].clientY : e.clientY
      theta -= (cx - prevX) * 0.007
      phi = Math.max(0.5, Math.min(Math.PI - 0.5, phi - (cy - prevY) * 0.007))
      prevX = cx
      prevY = cy
    }
    const onUp = () => {
      isDragging = false
    }

    container.addEventListener("mousedown", onDown)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    container.addEventListener("touchstart", onDown, { passive: true })
    window.addEventListener("touchmove", onMove, { passive: true })
    window.addEventListener("touchend", onUp)

    const onResize = () => {
      if (!container) return
      const w = container.clientWidth || 600
      const h = container.clientHeight || 600
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", onResize)

    const clock = new THREE.Clock()
    let rafId = 0

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (window.innerWidth < 1024) return // 0% consumo de GPU en móvil
      const t = clock.getElapsedTime()

      camera.position.x = distance * Math.sin(phi) * Math.sin(theta)
      camera.position.y = distance * Math.cos(phi)
      camera.position.z = distance * Math.sin(phi) * Math.cos(theta)
      camera.lookAt(0, 0, 0)

      if (isPlayingRef.current) {
        emblem.rotation.y += 0.006
      }
      emblem.position.y = Math.sin(t * 0.9) * 0.18

      // Highlight sweeping around the emblem
      sweepLight.position.set(Math.cos(t * 0.7) * 10, Math.sin(t * 0.5) * 6, 9 + Math.sin(t * 0.7) * 3)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      disposed = true
      window.removeEventListener("resize", onResize)
      container.removeEventListener("mousedown", onDown)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      container.removeEventListener("touchstart", onDown)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onUp)

      leftGeo.dispose()
      rightGeo.dispose()
      headGeo.dispose()
      blueMat.dispose()
      capMat.dispose()
      pestTexture.dispose()
      envTexture.dispose()
      pmrem.dispose()

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  const features = [
    {
      label: "Plagas",
      title: "Rata, paloma, cucaracha y termita por dentro.",
      text: "Las imágenes de las plagas que controlamos viven dentro del icono con baja opacidad, bajo el barniz brillante.",
    },
    {
      label: "Iluminación",
      title: "Reflejos de luz en movimiento.",
      text: "Luz de recorte fría, luz principal rasante y un destello que recorre la superficie del icono.",
    },
    {
      label: "Interacción",
      title: "Arrastra y rota.",
      text: "Control con el ratón para rotar libremente el icono sobre su eje e inspeccionarlo desde cualquier ángulo.",
    },
  ]

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05070b] text-white">
      {/* Background glow orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Top Header ambient glow (gives the floating liquid glass navbar rich light to blur and refract) */}
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 h-[24rem] w-[84vw] max-w-[1500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(97,218,251,.16),rgba(10,56,113,.14)_50%,transparent_75%)] blur-3xl pointer-events-none" />
        <div className="absolute -top-32 left-[10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(97,218,251,.15),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-[5%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(10,56,113,.28),transparent_70%)] blur-3xl" />
      </div>

      {/* Main Navbar */}
      <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

      <main className="relative z-10 overflow-hidden px-5 sm:px-6 md:px-10 pt-[116px] sm:pt-[130px] lg:pt-32 pb-24 md:pb-0">
        {/* ========================================================================= */}
        {/* SECCIÓN 1: SPLIT HERO (Prototipo Opción 1 para Página Principal)           */}
        {/* ========================================================================= */}
        <section id="hero" className="relative mx-auto flex flex-col justify-center min-h-[calc(100vh-140px)] sm:min-h-[auto] lg:min-h-[90vh] lg:grid lg:grid-cols-[1.08fr_0.92fr] items-center gap-6 sm:gap-8 lg:gap-14 max-w-[1600px] py-2 sm:py-6 lg:py-0">
          {/* Columna Izquierda: Mensaje Comercial, Título Auténtico y Botones de Acción */}
          <div className="relative z-20 max-w-2xl flex flex-col items-start w-full order-1 my-auto">
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

            {/* Botones de Acción (En móvil: botón de llamada en hero y botón de cotización sticky abajo) */}
            <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4 w-full">
              {/* Botón Principal (visible en desktop, sticky en móvil) */}
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="hidden sm:inline-flex py-3.5 px-7 rounded-xl hero-primary-btn font-extrabold text-xs sm:text-sm tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(92,112,144,0.4)] active:scale-[0.98] items-center justify-center gap-2.5 cursor-pointer text-white"
              >
                <span>SOLICITAR PRESUPUESTO</span>
                <ArrowRight className="h-4 w-4" />
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

          {/* Columna Derecha: Icono 3D de Sanivex en Volumen (ELIMINADO en móvil, solo visible en escritorio >= lg) */}
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
        </section>

        {/* ========================================================================= */}
        {/* SECCIÓN 2: EXPLICACIÓN DE INTEGRACIÓN Y DETALLES TÉCNICOS                  */}
        {/* ========================================================================= */}
        <section className="relative mx-auto mt-28 max-w-[1600px] pb-32">
          <div className="mb-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-semibold text-cyan-300 mb-3 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              Prototipo de Implementación
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ¿Por qué el Split Hero es la mejor opción?
            </h2>
            <p className="mt-2 text-sm text-slate-300/80 leading-relaxed font-light">
              Así se verá en la página principal: el contenido comercial y de llamada a la acción en el lado izquierdo, equilibrado con el icono 3D de alta gama en el lado derecho.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="liquid-panel bloom rounded-[2.5rem] p-8">
              <div className="flex items-center justify-between">
                <div className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#61DAFB]">Impacto de Marca</div>
                <div className="pulse-react h-3 w-3 rounded-full bg-[#61DAFB]" />
              </div>
              <h3 className="mt-6 text-xl font-bold leading-tight">Efecto WOW sin perder conversión</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                El usuario ve de inmediato los botones de cotización y teléfono a la izquierda, mientras que el icono 3D le otorga una presencia tecnológica de primer nivel.
              </p>
            </article>

            <article className="liquid-panel bloom rounded-[2.5rem] p-8">
              <div className="flex items-center justify-between">
                <div className="font-sans text-[10px] uppercase tracking-[0.28em] text-emerald-400">Plagas en el Interior</div>
                <div className="pulse-react h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <h3 className="mt-6 text-xl font-bold leading-tight">Fotos macro integradas con sutileza</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                Rata, paloma, cucaracha y termita viven dentro de las alas con baja opacidad bajo el barniz brillante, manteniendo el azul corporativo como protagonista.
              </p>
            </article>

            <article className="liquid-panel bloom rounded-[2.5rem] p-8">
              <div className="flex items-center justify-between">
                <div className="font-sans text-[10px] uppercase tracking-[0.28em] text-cyan-400">Rendimiento</div>
                <div className="pulse-react h-3 w-3 rounded-full bg-cyan-400" />
              </div>
              <h3 className="mt-6 text-xl font-bold leading-tight">60 FPS y 0% consumo en scroll</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                El motor WebGL se pausa automáticamente cuando la persona hace scroll a otras secciones, asegurando cero consumo innecesario de batería o GPU.
              </p>
            </article>
          </div>
        </section>
      </main>

      {/* Mobile Sticky Bottom CTA Bar (Solicitar Presupuesto) - Idéntico a la página principal */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#060b14]/95 backdrop-blur-xl border-t border-[#5c7090]/30 px-4 py-3 shadow-[0_-10px_35px_rgba(0,0,0,0.7)] animate-in fade-in duration-300">
        <button
          onClick={() => setQuoteModalOpen(true)}
          className="w-full py-3.5 px-6 rounded-xl hero-primary-btn font-black text-xs sm:text-sm tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(92,112,144,0.4)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-white"
        >
          <span>SOLICITAR PRESUPUESTO</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Modal Real de Cotización */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultService="Cotización General - Hero 3D"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          color-scheme: dark;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 20% 10%, rgba(97, 218, 251, 0.12), transparent 28%),
            radial-gradient(circle at 80% 40%, rgba(10, 56, 113, 0.12), transparent 24%),
            radial-gradient(circle at 50% 100%, rgba(97, 218, 251, 0.06), transparent 35%),
            #05070b;
          color: white;
          font-family: var(--font-poppins), var(--font-montserrat), sans-serif;
        }

        body::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 110px 110px;
          -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 78%);
          mask-image: radial-gradient(circle at center, black 30%, transparent 78%);
          opacity: 0.35;
          z-index: -1;
        }

        .liquid-panel {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
          backdrop-filter: blur(60px) saturate(1.4);
          -webkit-backdrop-filter: blur(60px) saturate(1.4);
          border: 1px solid rgba(255, 255, 255, 0.07);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.07),
            0 30px 120px rgba(0, 0, 0, 0.5),
            0 0 80px rgba(97, 218, 251, 0.04);
        }

        .dew {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04));
          backdrop-filter: blur(30px) saturate(1.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            0 0 40px rgba(97, 218, 251, 0.14);
          transition:
            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.6s ease;
        }

        .dew:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.18),
            0 0 60px rgba(97, 218, 251, 0.22);
        }

        .wind-sway {
          display: inline-block;
          transform-origin: center bottom;
          animation: wind 8s ease-in-out infinite;
        }

        .organic-shell {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          border-radius: 44% 56% 58% 42% / 42% 36% 64% 58%;
          -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 74%);
          mask-image: radial-gradient(circle at center, black 40%, transparent 74%);
          filter: drop-shadow(0 0 80px rgba(97, 218, 251, 0.14));
        }

        .organic-shell::before {
          content: "";
          position: absolute;
          inset: -10%;
          background: radial-gradient(circle, rgba(97, 218, 251, 0.12), transparent 60%);
          filter: blur(50px);
          z-index: 2;
          pointer-events: none;
        }

        .bloom {
          opacity: 0;
          transform: translateY(60px) scale(0.96);
          transition:
            opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bloom.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .pulse-react {
          animation: pulseReact 4s ease-in-out infinite;
        }

        @keyframes wind {
          0%, 100% {
            transform: rotate(-1deg) translateX(-2px);
          }
          50% {
            transform: rotate(1deg) translateX(2px);
          }
        }

        @keyframes pulseReact {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.03);
            opacity: 1;
          }
        }

        .float-core {
          animation: drift 9s ease-in-out infinite;
        }

        @keyframes drift {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @supports (animation-timeline: view()) {
          .scroll-grow {
            animation: grow linear both;
            animation-timeline: view();
            animation-range: entry 10% cover 65%;
          }

          @keyframes grow {
            from {
              transform: scale(0.92);
              opacity: 0.6;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        }
      `}} />
    </main>
  )
}
