'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import Link from 'next/link';
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Shield,
  Zap,
  Radio,
  Bug,
  Bird,
  Flame,
  Eye,
  Maximize2,
  Activity,
  CheckCircle2,
  Sliders,
} from 'lucide-react';

// Type definitions for Pest types
type PestType = 'rat' | 'cockroach' | 'pigeon' | 'termite';

interface PestData {
  id: number;
  type: PestType;
  group: THREE.Group;
  velocity: THREE.Vector3;
  targetOffset: THREE.Vector3;
  wingAngle?: number;
  legAngle?: number;
  tailSegments?: THREE.Mesh[];
  wings?: { left: THREE.Object3D; right: THREE.Object3D };
  antennae?: THREE.Object3D[];
  speed: number;
  curveFactor: number;
  initialDistance: number;
}

interface ParticleSpark {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}

interface Shockwave {
  mesh: THREE.Mesh;
  scale: number;
  maxScale: number;
  opacity: number;
}

export default function PlanetLab3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // State for UI and controls
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1); // multiplier
  const [activeFilter, setActiveFilter] = useState<'all' | PestType>('all');
  const [shieldMode, setShieldMode] = useState<'ion' | 'quantum' | 'vortex'>('ion');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [cameraMode, setCameraMode] = useState<'free' | 'core' | 'top' | 'cinematic'>('free');
  
  // Interception counters
  const [counters, setCounters] = useState({
    rat: 0,
    cockroach: 0,
    pigeon: 0,
    termite: 0,
    total: 0,
  });

  // Audio Context Ref (Web Audio API)
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play subtle futuristic laser / shield neutralization sound
  const playZapSound = useCallback((frequency = 440) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch {
      // Audio might be blocked by browser policy until interaction
    }
  }, [soundEnabled]);

  // Three.js References for internal manipulation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const planetGroupRef = useRef<THREE.Group | null>(null);
  const shieldMeshRef = useRef<THREE.Mesh | null>(null);
  const pestsRef = useRef<PestData[]>([]);
  const sparksRef = useRef<ParticleSpark[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Helper function to trigger a new wave of pests
  const spawnPestWave = useCallback((count = 16) => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    const types: PestType[] = ['pigeon', 'rat', 'cockroach', 'termite'];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      if (activeFilter !== 'all' && activeFilter !== type) continue;

      createAndAddPest(scene, type, 32 + Math.random() * 20);
    }
  }, [activeFilter]);

  // Helper to create 3D pest models
  function createAndAddPest(scene: THREE.Scene, type: PestType, distance: number) {
    const pestGroup = new THREE.Group();

    // Random spherical coordinate for spawn
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = distance * Math.sin(phi) * Math.cos(theta);
    const y = distance * Math.sin(phi) * Math.sin(theta);
    const z = distance * Math.cos(phi);

    pestGroup.position.set(x, y, z);

    let wingsObj: { left: THREE.Object3D; right: THREE.Object3D } | undefined = undefined;
    const tailSegments: THREE.Mesh[] = [];
    const antennae: THREE.Object3D[] = [];

    // Construct specific 3D anatomy for each pest
    if (type === 'pigeon') {
      // PALOMA (PIGEON) 3D MESH
      // Body
      const bodyGeo = new THREE.ConeGeometry(0.35, 1.2, 8);
      bodyGeo.rotateX(Math.PI / 2);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x475569, // Slate grey
        roughness: 0.6,
        metalness: 0.1,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      pestGroup.add(body);

      // Neck / Head
      const headGeo = new THREE.SphereGeometry(0.28, 8, 8);
      const headMat = new THREE.MeshStandardMaterial({
        color: 0x0f766e, // Iridescent green/teal neck
        roughness: 0.3,
        metalness: 0.5,
      });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.set(0, 0.15, 0.65);
      pestGroup.add(head);

      // Beak
      const beakGeo = new THREE.ConeGeometry(0.08, 0.3, 4);
      beakGeo.rotateX(Math.PI / 2);
      const beakMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
      const beak = new THREE.Mesh(beakGeo, beakMat);
      beak.position.set(0, 0.1, 0.95);
      pestGroup.add(beak);

      // Flapping Wings
      const wingGeo = new THREE.BoxGeometry(1.3, 0.04, 0.45);
      const wingMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.7,
      });

      const wingLeft = new THREE.Group();
      const leftMesh = new THREE.Mesh(wingGeo, wingMat);
      leftMesh.position.set(-0.65, 0, 0);
      wingLeft.add(leftMesh);
      wingLeft.position.set(-0.25, 0.1, 0.1);
      pestGroup.add(wingLeft);

      const wingRight = new THREE.Group();
      const rightMesh = new THREE.Mesh(wingGeo, wingMat);
      rightMesh.position.set(0.65, 0, 0);
      wingRight.add(rightMesh);
      wingRight.position.set(0.25, 0.1, 0.1);
      pestGroup.add(wingRight);

      wingsObj = { left: wingLeft, right: wingRight };

      // Tail
      const tailGeo = new THREE.BoxGeometry(0.5, 0.05, 0.6);
      const tailMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
      const tail = new THREE.Mesh(tailGeo, tailMat);
      tail.position.set(0, 0, -0.8);
      pestGroup.add(tail);

    } else if (type === 'rat') {
      // RATA (RAT) 3D MESH
      // Body
      const bodyGeo = new THREE.SphereGeometry(0.38, 8, 8);
      bodyGeo.scale(1, 0.8, 1.8);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x27272a, // Dark rodent fur
        roughness: 0.85,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      pestGroup.add(body);

      // Head / Snout
      const headGeo = new THREE.ConeGeometry(0.28, 0.7, 6);
      headGeo.rotateX(Math.PI / 2);
      const headMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.set(0, 0.05, 0.85);
      pestGroup.add(head);

      // Glowing threat eyes
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const eyeGeo = new THREE.SphereGeometry(0.06, 4, 4);
      const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
      eyeL.position.set(-0.16, 0.18, 0.95);
      const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
      eyeR.position.set(0.16, 0.18, 0.95);
      pestGroup.add(eyeL, eyeR);

      // Ears
      const earGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 6);
      earGeo.rotateX(Math.PI / 4);
      const earMat = new THREE.MeshStandardMaterial({ color: 0x71717a });
      const earL = new THREE.Mesh(earGeo, earMat);
      earL.position.set(-0.25, 0.3, 0.6);
      const earR = new THREE.Mesh(earGeo, earMat);
      earR.position.set(0.25, 0.3, 0.6);
      pestGroup.add(earL, earR);

      // Flexible tail chain
      for (let s = 0; s < 5; s++) {
        const segGeo = new THREE.CylinderGeometry(0.06 - s * 0.009, 0.08 - s * 0.009, 0.28, 5);
        segGeo.rotateX(Math.PI / 2);
        const segMat = new THREE.MeshStandardMaterial({ color: 0x52525b });
        const seg = new THREE.Mesh(segGeo, segMat);
        seg.position.set(0, -0.05, -0.8 - s * 0.26);
        pestGroup.add(seg);
        tailSegments.push(seg);
      }

    } else if (type === 'cockroach') {
      // CUCARACHA (COCKROACH) 3D MESH
      // Flattened Chitin Shell
      const shellGeo = new THREE.SphereGeometry(0.42, 8, 8);
      shellGeo.scale(1.1, 0.45, 1.7);
      const shellMat = new THREE.MeshStandardMaterial({
        color: 0x854d0e, // Amber brown glossy chitin
        roughness: 0.25,
        metalness: 0.3,
      });
      const shell = new THREE.Mesh(shellGeo, shellMat);
      pestGroup.add(shell);

      // Pronotum (Shield head)
      const pronoGeo = new THREE.SphereGeometry(0.35, 6, 6);
      pronoGeo.scale(1, 0.4, 0.8);
      const pronoMat = new THREE.MeshStandardMaterial({
        color: 0x451a03,
        roughness: 0.2,
      });
      const prono = new THREE.Mesh(pronoGeo, pronoMat);
      prono.position.set(0, 0.08, 0.65);
      pestGroup.add(prono);

      // Long Antennae
      const antGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.1, 3);
      antGeo.rotateX(Math.PI / 3);
      const antMat = new THREE.MeshBasicMaterial({ color: 0xd97706 });

      const antL = new THREE.Mesh(antGeo, antMat);
      antL.position.set(-0.15, 0.1, 1.05);
      antL.rotation.y = -0.3;
      const antR = new THREE.Mesh(antGeo, antMat);
      antR.position.set(0.15, 0.1, 1.05);
      antR.rotation.y = 0.3;
      pestGroup.add(antL, antR);
      antennae.push(antL, antR);

      // Legs (6 legs)
      for (let l = 0; l < 3; l++) {
        const legGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.7, 3);
        legGeo.rotateZ(Math.PI / 2.8);
        const legMat = new THREE.MeshStandardMaterial({ color: 0x78350f });

        const legL = new THREE.Mesh(legGeo, legMat);
        legL.position.set(-0.5, -0.1, -0.3 + l * 0.35);
        const legR = new THREE.Mesh(legGeo, legMat);
        legR.position.set(0.5, -0.1, -0.3 + l * 0.35);
        legR.rotation.y = Math.PI;

        pestGroup.add(legL, legR);
      }

    } else if (type === 'termite') {
      // TERMITA (TERMITE ALATE) 3D MESH
      // Segmented body: Head, Thorax, Abdomen
      const abdGeo = new THREE.SphereGeometry(0.24, 6, 6);
      abdGeo.scale(0.9, 0.7, 1.4);
      const abdMat = new THREE.MeshStandardMaterial({
        color: 0xfde68a, // Pale amber translucent
        roughness: 0.4,
      });
      const abd = new THREE.Mesh(abdGeo, abdMat);
      pestGroup.add(abd);

      const thoraxGeo = new THREE.SphereGeometry(0.18, 5, 5);
      const thoraxMat = new THREE.MeshStandardMaterial({ color: 0xd97706 });
      const thorax = new THREE.Mesh(thoraxGeo, thoraxMat);
      thorax.position.set(0, 0.02, 0.4);
      pestGroup.add(thorax);

      const tHeadGeo = new THREE.SphereGeometry(0.16, 5, 5);
      const tHeadMat = new THREE.MeshStandardMaterial({ color: 0xb45309 });
      const tHead = new THREE.Mesh(tHeadGeo, tHeadMat);
      tHead.position.set(0, 0.04, 0.65);
      pestGroup.add(tHead);

      // Mandibles
      const manGeo = new THREE.ConeGeometry(0.04, 0.15, 3);
      manGeo.rotateX(Math.PI / 2);
      const manMat = new THREE.MeshBasicMaterial({ color: 0x78350f });
      const manL = new THREE.Mesh(manGeo, manMat);
      manL.position.set(-0.06, 0, 0.78);
      const manR = new THREE.Mesh(manGeo, manMat);
      manR.position.set(0.06, 0, 0.78);
      pestGroup.add(manL, manR);

      // Translucent Termite Wings
      const tWingGeo = new THREE.BoxGeometry(0.9, 0.02, 0.28);
      const tWingMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
        roughness: 0.1,
      });

      const wingLeft = new THREE.Group();
      const leftMesh = new THREE.Mesh(tWingGeo, tWingMat);
      leftMesh.position.set(-0.45, 0, 0);
      wingLeft.add(leftMesh);
      wingLeft.position.set(-0.12, 0.08, 0.35);
      pestGroup.add(wingLeft);

      const wingRight = new THREE.Group();
      const rightMesh = new THREE.Mesh(tWingGeo, tWingMat);
      rightMesh.position.set(0.45, 0, 0);
      wingRight.add(rightMesh);
      wingRight.position.set(0.12, 0.08, 0.35);
      pestGroup.add(wingRight);

      wingsObj = { left: wingLeft, right: wingRight };
    }

    // Threat Vector Beacon Glow (Small radar marker on pest)
    const markerColor =
      type === 'rat'
        ? 0xef4444
        : type === 'cockroach'
        ? 0xf59e0b
        : type === 'pigeon'
        ? 0x06b6d4
        : 0x10b981;

    const markerGeo = new THREE.SphereGeometry(0.08, 4, 4);
    const markerMat = new THREE.MeshBasicMaterial({ color: markerColor });
    const marker = new THREE.Mesh(markerGeo, markerMat);
    marker.position.set(0, 0.35, 0);
    pestGroup.add(marker);

    scene.add(pestGroup);

    // Initial velocity towards center with subtle spiral angular momentum
    const pos = pestGroup.position.clone();
    const toCenter = pos.clone().negate().normalize();

    // Perpendicular vector for orbital curl
    const up = new THREE.Vector3(0, 1, 0);
    const tangent = new THREE.Vector3().crossVectors(toCenter, up).normalize();

    const speed =
      type === 'pigeon'
        ? 0.14 + Math.random() * 0.05
        : type === 'rat'
        ? 0.12 + Math.random() * 0.04
        : type === 'cockroach'
        ? 0.09 + Math.random() * 0.04
        : 0.08 + Math.random() * 0.03;

    const pestData: PestData = {
      id: Math.random(),
      type,
      group: pestGroup,
      velocity: toCenter.clone().multiplyScalar(speed),
      targetOffset: tangent.clone().multiplyScalar(0.4 + Math.random() * 0.6),
      wings: wingsObj,
      tailSegments,
      antennae,
      speed,
      curveFactor: 0.8 + Math.random() * 0.6,
      initialDistance: distance,
    };

    pestsRef.current.push(pestData);
  }

  // Trigger neutralization impact effects
  const triggerImpactAt = useCallback((position: THREE.Vector3, type: PestType) => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    // Increment UI Counter
    setCounters((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
      total: prev.total + 1,
    }));

    // Audio frequency based on pest type
    const frequencies: Record<PestType, number> = {
      rat: 320,
      cockroach: 480,
      pigeon: 620,
      termite: 780,
    };
    playZapSound(frequencies[type]);

    // Color based on pest neutralization
    const color =
      type === 'rat'
        ? 0xf43f5e
        : type === 'cockroach'
        ? 0xf59e0b
        : type === 'pigeon'
        ? 0x06b6d4
        : 0x10b981;

    // 1. Shockwave Ripple ring on the planetary shield
    const ringGeo = new THREE.RingGeometry(0.3, 0.45, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(position);
    ring.lookAt(0, 0, 0);
    scene.add(ring);

    shockwavesRef.current.push({
      mesh: ring,
      scale: 1,
      maxScale: 3.5,
      opacity: 0.9,
    });

    // 2. Disintegration spark burst
    const sparkGeo = new THREE.SphereGeometry(0.06, 4, 4);
    const sparkMat = new THREE.MeshBasicMaterial({ color });

    for (let s = 0; s < 14; s++) {
      const spark = new THREE.Mesh(sparkGeo, sparkMat);
      spark.position.copy(position);
      scene.add(spark);

      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4
      ).add(position.clone().normalize().multiplyScalar(0.2));

      sparksRef.current.push({
        mesh: spark,
        velocity: vel,
        life: 0,
        maxLife: 25 + Math.random() * 15,
      });
    }
  }, [playZapSound]);

  // Main Three.js Scene Setup and Animation Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x060c17, 0.015);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 6, 22);
    cameraRef.current = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x10b981, 3.5, 40);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const sunLight = new THREE.DirectionalLight(0xe0f2fe, 2.2);
    sunLight.position.set(15, 20, 25);
    scene.add(sunLight);

    const blueRimLight = new THREE.PointLight(0x0ea5e9, 2.5, 30);
    blueRimLight.position.set(-18, -10, -10);
    scene.add(blueRimLight);

    // 4. Background Starfield / Bio-particle space
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 1200;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 120;
      starPositions[i + 1] = (Math.random() - 0.5) * 120;
      starPositions[i + 2] = (Math.random() - 0.5) * 120;

      // Color variation: white, cyan, emerald
      const isGreen = Math.random() > 0.6;
      starColors[i] = isGreen ? 0.2 : 0.6;
      starColors[i + 1] = isGreen ? 0.9 : 0.8;
      starColors[i + 2] = 1.0;
    }

    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starsMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // 5. THE 3D PLANET & SANIVEX ICON (Rotating like a planet with axial tilt)
    const planetGroup = new THREE.Group();
    planetGroup.rotation.z = (23.5 * Math.PI) / 180; // 23.5° planetary axial tilt!
    planetGroupRef.current = planetGroup;
    scene.add(planetGroup);

    // Planet Core Sphere (Obsidian Dark Bio-Core with Emerald circuits)
    const planetRadius = 3.6;
    const coreGeo = new THREE.SphereGeometry(planetRadius, 64, 64);

    // Procedural canvas texture for high-tech planetary terrain / biosafety shield grid
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Deep space ocean background
      const grad = ctx.createLinearGradient(0, 0, 1024, 512);
      grad.addColorStop(0, '#091322');
      grad.addColorStop(0.5, '#051b2c');
      grad.addColorStop(1, '#062024');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Latitudinal and longitudinal glowing neon circuit lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
      ctx.lineWidth = 2;
      for (let y = 30; y < 512; y += 45) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
      }
      for (let x = 30; x < 1024; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }

      // Hexagonal planetary shield patterns
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.lineWidth = 1.5;
      const hexSize = 25;
      for (let hy = 0; hy < 512; hy += hexSize * 1.5) {
        for (let hx = 0; hx < 1024; hx += hexSize * Math.sqrt(3)) {
          ctx.beginPath();
          for (let a = 0; a < 6; a++) {
            const angle = (a * Math.PI) / 3;
            const px = hx + hexSize * Math.cos(angle);
            const py = hy + hexSize * Math.sin(angle);
            if (a === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    }

    const planetTex = new THREE.CanvasTexture(canvas);
    planetTex.wrapS = THREE.RepeatWrapping;
    planetTex.wrapT = THREE.ClampToEdgeWrapping;

    const coreMat = new THREE.MeshStandardMaterial({
      map: planetTex,
      roughness: 0.35,
      metalness: 0.7,
      emissive: 0x064e3b,
      emissiveIntensity: 0.45,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    planetGroup.add(coreMesh);

    // 6. SANIVEX 3D ICON EMBEDDED ON THE ROTATING PLANET
    // We create floating 3D embossed Sanivex logo badges at the equator and center!
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/logos/brand-icon-white.png',
      (brandTexture) => {
        brandTexture.colorSpace = THREE.SRGBColorSpace;

        // Front Facing 3D Badge on Equator
        const badgeGeo = new THREE.PlaneGeometry(2.4, 2.4);
        const badgeMat = new THREE.MeshStandardMaterial({
          map: brandTexture,
          transparent: true,
          side: THREE.DoubleSide,
          emissive: 0x10b981,
          emissiveIntensity: 0.9,
          roughness: 0.2,
          metalness: 0.8,
        });

        // Badge 1 (Facing +Z)
        const badge1 = new THREE.Mesh(badgeGeo, badgeMat);
        badge1.position.set(0, 0, planetRadius + 0.12);
        planetGroup.add(badge1);

        // Badge 2 (Facing -Z)
        const badge2 = new THREE.Mesh(badgeGeo, badgeMat);
        badge2.position.set(0, 0, -(planetRadius + 0.12));
        badge2.rotation.y = Math.PI;
        planetGroup.add(badge2);

        // Badge 3 (Facing +X)
        const badge3 = new THREE.Mesh(badgeGeo, badgeMat);
        badge3.position.set(planetRadius + 0.12, 0, 0);
        badge3.rotation.y = Math.PI / 2;
        planetGroup.add(badge3);

        // Badge 4 (Facing -X)
        const badge4 = new THREE.Mesh(badgeGeo, badgeMat);
        badge4.position.set(-(planetRadius + 0.12), 0, 0);
        badge4.rotation.y = -Math.PI / 2;
        planetGroup.add(badge4);

        // Central Hologram floating inside glowing glass orb
        const centerBadge = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), badgeMat);
        planetGroup.add(centerBadge);
      },
      undefined,
      () => {
        // Fallback: procedural 3D stylized emblem if image loading encounters delay
        const fallbackGeo = new THREE.OctahedronGeometry(1.6, 1);
        const fallbackMat = new THREE.MeshStandardMaterial({
          color: 0x10b981,
          wireframe: true,
          emissive: 0x10b981,
          emissiveIntensity: 0.8,
        });
        const fallbackBadge = new THREE.Mesh(fallbackGeo, fallbackMat);
        planetGroup.add(fallbackBadge);
      }
    );

    // 7. Planetary Rings (Like Saturn, with glowing orbital rings)
    const ringGeo = new THREE.RingGeometry(4.8, 7.2, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x047857,
      emissiveIntensity: 0.35,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
      roughness: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    planetGroup.add(ringMesh);

    // Outer Thin Orbit Laser Ring
    const laserRingGeo = new THREE.RingGeometry(8.2, 8.28, 64);
    const laserRingMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const laserRing = new THREE.Mesh(laserRingGeo, laserRingMat);
    laserRing.rotation.x = Math.PI / 2.3;
    planetGroup.add(laserRing);

    // 8. Dynamic Planetary Biosafety Forcefield Shield (Icosahedron Geodesic)
    const shieldGeo = new THREE.IcosahedronGeometry(4.3, 2);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.6,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMeshRef.current = shieldMesh;
    planetGroup.add(shieldMesh);

    // Atmosphere Glow Halo (Translucent outer sphere with rim glow)
    const haloGeo = new THREE.SphereGeometry(4.4, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    planetGroup.add(haloMesh);

    // 9. Initial Wave of Pests
    const initialTypes: PestType[] = ['pigeon', 'rat', 'cockroach', 'termite'];
    for (let i = 0; i < 28; i++) {
      const type = initialTypes[i % initialTypes.length];
      createAndAddPest(scene, type, 24 + Math.random() * 22);
    }

    // 10. Interactive Mouse / Touch Navigation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let sphericalTheta = 0;
    let sphericalPhi = Math.PI / 2.4;
    let cameraDistance = 22;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      sphericalTheta -= deltaX * 0.006;
      sphericalPhi = Math.max(0.15, Math.min(Math.PI - 0.15, sphericalPhi - deltaY * 0.006));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      cameraDistance = Math.max(9, Math.min(48, cameraDistance + e.deltaY * 0.02));
      e.preventDefault();
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // 11. Window Resize Listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 12. Animation Engine / Render Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Camera position update based on orbit angles
      if (cameraMode === 'free') {
        camera.position.x = cameraDistance * Math.sin(sphericalPhi) * Math.sin(sphericalTheta);
        camera.position.y = cameraDistance * Math.cos(sphericalPhi);
        camera.position.z = cameraDistance * Math.sin(sphericalPhi) * Math.cos(sphericalTheta);
        camera.lookAt(0, 0, 0);
      } else if (cameraMode === 'core') {
        camera.position.set(0, 2, 11);
        camera.lookAt(0, 0, 0);
      } else if (cameraMode === 'top') {
        camera.position.set(0, 26, 0.1);
        camera.lookAt(0, 0, 0);
      } else if (cameraMode === 'cinematic') {
        const angle = time * 0.25;
        camera.position.set(Math.sin(angle) * 18, 5 + Math.sin(time * 0.4) * 4, Math.cos(angle) * 18);
        camera.lookAt(0, 0, 0);
      }

      // Planet Planetary Rotation
      if (isPlaying && planetGroup) {
        planetGroup.rotation.y += 0.008 * rotationSpeed;

        // Forcefield Shield Pulse
        if (shieldMeshRef.current) {
          const pulseScale = 1 + 0.04 * Math.sin(time * 4);
          shieldMeshRef.current.scale.set(pulseScale, pulseScale, pulseScale);
        }
      }

      // Update Pests (Movement towards 3D rotating planet)
      const pests = pestsRef.current;
      const shieldRadius = 4.3;

      for (let i = pests.length - 1; i >= 0; i--) {
        const p = pests[i];

        if (isPlaying) {
          const currentPos = p.group.position;
          const distToCenter = currentPos.length();

          // Biological animations for limbs, wings, tails
          if (p.wings) {
            const wingSpeed = p.type === 'pigeon' ? 14 : 26;
            const wingAngle = Math.sin(time * wingSpeed) * (p.type === 'pigeon' ? 0.6 : 0.4);
            p.wings.left.rotation.z = wingAngle;
            p.wings.right.rotation.z = -wingAngle;
          }

          if (p.tailSegments && p.tailSegments.length > 0) {
            p.tailSegments.forEach((seg, idx) => {
              seg.rotation.y = Math.sin(time * 12 - idx * 0.6) * 0.35;
            });
          }

          if (p.antennae && p.antennae.length > 0) {
            p.antennae.forEach((ant, idx) => {
              ant.rotation.z = Math.sin(time * 16 + idx) * 0.25;
            });
          }

          // Gravitational pull towards planetary core
          const toCore = currentPos.clone().negate().normalize();

          // Dynamic spiral vortex as pest approaches the planet
          if (distToCenter < 14) {
            const swirlAxis = new THREE.Vector3(0, 1, 0);
            const swirl = new THREE.Vector3().crossVectors(toCore, swirlAxis).normalize();
            // Pull harder and curl inwards into the vortex
            toCore.add(swirl.multiplyScalar(0.75 * (1 - distToCenter / 14)));
            toCore.normalize();
          }

          // Acceleration towards planet
          const currentSpeed = p.speed * (1 + (p.initialDistance / Math.max(distToCenter, 1)) * 0.35);
          currentPos.add(toCore.multiplyScalar(currentSpeed));

          // Orient pest along its trajectory towards the planet
          p.group.lookAt(0, 0, 0);

          // Check if pest enters the rotating planet / forcefield shield
          if (distToCenter <= shieldRadius) {
            // TRIGGER IMPACT / DISINTEGRATION
            triggerImpactAt(currentPos.clone(), p.type);

            // Respawn pest at outer perimeter for continuous fluid demonstration
            const newTheta = Math.random() * Math.PI * 2;
            const newPhi = Math.acos(2 * Math.random() - 1);
            const newDist = 28 + Math.random() * 18;
            p.group.position.set(
              newDist * Math.sin(newPhi) * Math.cos(newTheta),
              newDist * Math.sin(newPhi) * Math.sin(newTheta),
              newDist * Math.cos(newPhi)
            );
            p.initialDistance = newDist;
          }
        }
      }

      // Update Particle Sparks
      const sparks = sparksRef.current;
      for (let s = sparks.length - 1; s >= 0; s--) {
        const sp = sparks[s];
        sp.mesh.position.add(sp.velocity);
        sp.life += 1;
        const progress = sp.life / sp.maxLife;
        sp.mesh.scale.setScalar(Math.max(0.01, 1 - progress));

        if (sp.life >= sp.maxLife) {
          scene.remove(sp.mesh);
          sp.mesh.geometry.dispose();
          sparks.splice(s, 1);
        }
      }

      // Update Shockwave Rings
      const waves = shockwavesRef.current;
      for (let w = waves.length - 1; w >= 0; w--) {
        const wv = waves[w];
        wv.scale += 0.12;
        wv.mesh.scale.set(wv.scale, wv.scale, wv.scale);
        wv.opacity -= 0.035;
        (wv.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, wv.opacity);

        if (wv.opacity <= 0 || wv.scale >= wv.maxScale) {
          scene.remove(wv.mesh);
          wv.mesh.geometry.dispose();
          waves.splice(w, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      container.removeEventListener('wheel', onWheel);

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [cameraMode, isPlaying, rotationSpeed, triggerImpactAt]);

  // Shield Mode styling update
  useEffect(() => {
    if (!shieldMeshRef.current) return;
    const mat = shieldMeshRef.current.material as THREE.MeshStandardMaterial;
    if (shieldMode === 'ion') {
      mat.color.setHex(0x10b981);
      mat.emissive.setHex(0x06b6d4);
      mat.wireframe = true;
    } else if (shieldMode === 'quantum') {
      mat.color.setHex(0x38bdf8);
      mat.emissive.setHex(0x3b82f6);
      mat.wireframe = false;
      mat.opacity = 0.25;
    } else if (shieldMode === 'vortex') {
      mat.color.setHex(0xf59e0b);
      mat.emissive.setHex(0xef4444);
      mat.wireframe = true;
    }
  }, [shieldMode]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#060c17] select-none text-slate-100 font-sans">
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing z-0" />

      {/* TOP FLOATING NAVIGATION & TITLE HUD */}
      <header className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Back Button & Title */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full liquid-glass text-xs md:text-sm font-semibold tracking-wide text-white hover:text-emerald-400 transition-all duration-300 border border-white/10 hover:border-emerald-500/50 shadow-lg group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-emerald-400" />
            <span>Volver a Sanivex</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full liquid-glass border border-emerald-500/20 text-xs font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>LAB 3D • Sistema Planetario de Intercepción</span>
          </div>
        </div>

        {/* Quick Audio & Playback Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            aria-label="Alternar Audio"
            className={`p-2.5 rounded-full liquid-glass border transition-all duration-300 ${
              soundEnabled
                ? 'border-emerald-500/60 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-label="Pausar / Reanudar Rotación"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full liquid-glass border transition-all duration-300 text-xs font-semibold ${
              isPlaying
                ? 'border-emerald-500/40 text-emerald-300'
                : 'border-amber-500/40 text-amber-300'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Reanudar</span>
              </>
            )}
          </button>

          <button
            onClick={() => spawnPestWave(20)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/60 hover:shadow-emerald-500/30 transition-all duration-300 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-200 animate-pulse" />
            <span>Generar Enjambre</span>
          </button>
        </div>
      </header>

      {/* LEFT SIDE HUD: TELEMETRY & INTERCEPTION COUNTER */}
      <aside className="absolute left-4 top-20 md:top-24 z-10 w-72 max-w-[calc(100vw-2rem)] pointer-events-auto space-y-3">
        {/* Main Stats Card */}
        <div className="p-4 rounded-2xl liquid-glass border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Bio-Radar En Tiempo Real</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Activo
            </span>
          </div>

          {/* Total Counter Display */}
          <div className="mb-4 text-center py-2.5 px-3 rounded-xl bg-black/40 border border-emerald-500/20">
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
              Vectores Neutralizados
            </div>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-mono tracking-tight mt-0.5">
              {counters.total.toLocaleString()}
            </div>
          </div>

          {/* Breakdown by Pest Type */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Ratas */}
            <div className="p-2 rounded-xl bg-slate-900/60 border border-rose-500/20 flex flex-col">
              <span className="text-[10px] text-rose-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                Ratas
              </span>
              <span className="text-lg font-bold text-white font-mono mt-0.5">
                {counters.rat}
              </span>
            </div>

            {/* Cucarachas */}
            <div className="p-2 rounded-xl bg-slate-900/60 border border-amber-500/20 flex flex-col">
              <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                <Bug className="w-2.5 h-2.5" />
                Cucarachas
              </span>
              <span className="text-lg font-bold text-white font-mono mt-0.5">
                {counters.cockroach}
              </span>
            </div>

            {/* Palomas */}
            <div className="p-2 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex flex-col">
              <span className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
                <Bird className="w-2.5 h-2.5" />
                Palomas
              </span>
              <span className="text-lg font-bold text-white font-mono mt-0.5">
                {counters.pigeon}
              </span>
            </div>

            {/* Termitas */}
            <div className="p-2 rounded-xl bg-slate-900/60 border border-emerald-500/20 flex flex-col">
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <Flame className="w-2.5 h-2.5" />
                Termitas
              </span>
              <span className="text-lg font-bold text-white font-mono mt-0.5">
                {counters.termite}
              </span>
            </div>
          </div>

          {/* Efficiency Bar */}
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-1 text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Nivel de Control
            </span>
            <span className="font-bold text-emerald-400">Progresivo Activo</span>
          </div>
        </div>

        {/* Pest Filter Selector */}
        <div className="p-3.5 rounded-2xl liquid-glass border border-white/10 text-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Filtro de Vectores</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(['all', 'rat', 'cockroach', 'pigeon', 'termite'] as const).map((filter) => {
              const label =
                filter === 'all'
                  ? 'Todos'
                  : filter === 'rat'
                  ? 'Ratas'
                  : filter === 'cockroach'
                  ? 'Cucarachas'
                  : filter === 'pigeon'
                  ? 'Palomas'
                  : 'Termitas';

              const active = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    active
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE HUD: 3D PLANET & CAMERA CONTROLS */}
      <aside className="absolute right-4 top-20 md:top-24 z-10 w-64 max-w-[calc(100vw-2rem)] pointer-events-auto space-y-3">
        {/* Shield Mode Selector */}
        <div className="p-3.5 rounded-2xl liquid-glass border border-white/10 text-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Barrera de Protección 3D</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {(['ion', 'quantum', 'vortex'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setShieldMode(mode)}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all text-center ${
                  shieldMode === mode
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                {mode === 'ion' ? 'Iónico' : mode === 'quantum' ? 'Cuántic' : 'Vórtice'}
              </button>
            ))}
          </div>
        </div>

        {/* Camera Views Selector */}
        <div className="p-3.5 rounded-2xl liquid-glass border border-white/10 text-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Perspectiva de Cámara</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'free', label: 'Orbital Libre' },
              { id: 'core', label: 'Foco Núcleo' },
              { id: 'top', label: 'Vista Polar' },
              { id: 'cinematic', label: 'Cinemática' },
            ].map((cam) => (
              <button
                key={cam.id}
                onClick={() => setCameraMode(cam.id as typeof cameraMode)}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all text-center ${
                  cameraMode === cam.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                {cam.label}
              </button>
            ))}
          </div>
        </div>

        {/* Planet Speed Multiplier */}
        <div className="p-3.5 rounded-2xl liquid-glass border border-white/10 text-xs">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-teal-400" />
              Velocidad Rotación
            </span>
            <span className="text-emerald-400 font-mono">{rotationSpeed}x</span>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {[0.5, 1, 2, 3].map((speed) => (
              <button
                key={speed}
                onClick={() => setRotationSpeed(speed)}
                className={`py-1 rounded text-[11px] font-mono font-bold transition-all ${
                  rotationSpeed === speed
                    ? 'bg-teal-500 text-slate-950'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* BOTTOM FLOATING CONTROLS GUIDE */}
      <footer className="absolute bottom-4 left-4 right-4 z-10 flex flex-col md:flex-row items-center justify-between gap-2 pointer-events-none text-[11px] text-slate-400">
        <div className="pointer-events-auto px-4 py-2 rounded-full liquid-glass border border-white/10 flex items-center gap-3 backdrop-blur-md">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Interacción 3D:</span>
          </span>
          <span className="hidden sm:inline">Arrastra para rotar la órbita • Rueda de ratón para hacer zoom</span>
          <span className="sm:hidden">Arrastra para girar vista 3D</span>
        </div>

        <div className="pointer-events-auto px-4 py-2 rounded-full liquid-glass border border-white/10 text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Inclinación axial: <strong>23.5°</strong> (Rotación Planetaria Sanivex)</span>
        </div>
      </footer>
    </div>
  );
}
