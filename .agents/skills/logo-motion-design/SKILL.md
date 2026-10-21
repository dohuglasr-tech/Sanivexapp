---
name: logo-motion-design
description: Expert guidelines and production rules for web logo animations, vector SVG morphing, GSAP/Framer Motion choreography, and cinematic brand intros.
---

# Logo Motion Design & Brand Animation Guide

This skill governs the design and implementation of world-class, award-winning logo animations, loading screens, and brand intro sequences for modern web applications.

---

## 1. Golden Rules of Corporate Logo Animation

1. **Never Use Uncontrolled Particle Clumping**:
   - Avoid converting clean corporate logos into random "fur", fuzzy hairs, or dense clouds of wandering lines. It degrades brand perception and looks chaotic.
   - Clean corporate identities (like Sanivex) demand **razor-sharp vector clarity**, geometric elegance, and intentional motion paths.

2. **Always Use Vector Geometry (SVG Paths)**:
   - Real motion graphics rely on scalable vector graphics (`<path>`, `<svg>`).
   - If only raster images (`.png`, `.webp`) are available, trace or reconstruct clean vector outlines (`M... C... L... Z`) before animating.

3. **Curate the Animation Archetype**:
   Choose one of these 4 proven high-end archetypes:
   - **Archetype A: Precision Stroke Tracing (DrawSVG)**
     Luminous, razor-sharp vector lines trace the exact contours of the icon (`strokeDasharray` / `strokeDashoffset`), then fluidly travel along connecting rails to draw the letterforms of the wordmark.
   - **Archetype B: Geometric Deconstruction & Assembly**
     The icon cleanly splits into its distinct visual parts (e.g., the 4 wings/leaves of Sanivex) with smooth easing (`cubic-bezier(0.16, 1, 0.3, 1)`), slides into alignment, and unrolls into the logo text.
   - **Archetype C: Light Ray / Laser Sweep with Kinetic Reveal**
     An energetic line or laser ribbon sweeps through the mark, using SVG masks or gradient sweeps to unveil the typography with high contrast and cinematic glow.
   - **Archetype D: Morphing Contours**
     The vector paths of the icon morph smoothly into the paths of the letters using path interpolation (e.g., Flubber, GSAP MorphSVG, or SVG `<animate>`).

4. **Timing & Easing Standards**:
   - Never use linear motion (`linear`).
   - Always use luxury easing:
     - Entrance / Disassembly: `power3.out`, `cubic-bezier(0.22, 1, 0.36, 1)`, or `easeOutExpo`.
     - Transit / Weaving: `power2.inOut` or `cubic-bezier(0.65, 0, 0.35, 1)`.
     - Final Lockup: Subtle bounce-free deceleration with an optional light shimmer sweep.
   - Ideal duration for a web loading screen: **1.8s to 2.8s** total. Anything longer frustrates users.

5. **Technology Stack**:
   - **GSAP (GreenSock) + ScrollTrigger / Flip**: The global industry standard for timeline orchestration and vector motion.
   - **Framer Motion**: Excellent for React component transitions and declarative path animations.
   - **Native SVG + CSS Variables**: Ultra-lightweight, zero-runtime dependency for 60-120 FPS performance.
