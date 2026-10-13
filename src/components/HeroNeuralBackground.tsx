import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Layers, Zap, Activity } from 'lucide-react';

export type NeuralFormation = 'sphere' | 'matrix' | 'stream' | 'field';

interface HeroNeuralBackgroundProps {
  formation?: NeuralFormation;
  onFormationChange?: (formation: NeuralFormation) => void;
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  showFloatingControls?: boolean;
}

// Generate circular anti-aliased sprite texture for Three.js Points
function createCircleTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.95)');
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.6)');
    gradient.addColorStop(0.85, 'rgba(255, 255, 255, 0.15)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const HeroNeuralBackground: React.FC<HeroNeuralBackgroundProps> = ({
  formation: controlledFormation,
  onFormationChange,
  onCursorChange,
  showFloatingControls = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [internalFormation, setInternalFormation] = useState<NeuralFormation>('sphere');
  const [isAutoCycle, setIsAutoCycle] = useState<boolean>(true);

  const activeFormation = controlledFormation || internalFormation;

  const handleSelectFormation = (f: NeuralFormation) => {
    setIsAutoCycle(false);
    if (onFormationChange) {
      onFormationChange(f);
    } else {
      setInternalFormation(f);
    }
  };

  const PARTICLE_COUNT = 240;
  const MAX_LINES = 1200;

  const sceneState = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    group?: THREE.Group;
    particles?: THREE.Points;
    lines?: THREE.LineSegments;
    currentPositions: Float32Array;
    targetPositions: Float32Array;
    colors: Float32Array;
    circleTexture?: THREE.Texture;
    mouse: { x: number; y: number; active: boolean; targetX: number; targetY: number };
    clock: number;
    rafId?: number;
    currentFormation: NeuralFormation;
    viewportSize: { width: number; height: number };
  }>({
    currentPositions: new Float32Array(0),
    targetPositions: new Float32Array(0),
    colors: new Float32Array(0),
    mouse: { x: 0, y: 0, active: false, targetX: 0, targetY: 0 },
    clock: 0,
    currentFormation: activeFormation,
    viewportSize: { width: 0, height: 0 },
  });

  // Calculate coordinates for distinct 3D formations
  const computeTargetPositions = useCallback((type: NeuralFormation, count: number) => {
    const targets = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      if (type === 'sphere') {
        // 1. Fibonacci Geodesic Neural Sphere (Centered & Expanded)
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const radius = 2.9;

        targets[idx] = radius * Math.sin(phi) * Math.cos(theta);
        targets[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
        targets[idx + 2] = radius * Math.cos(phi);
      } else if (type === 'matrix') {
        // 2. Crystalline Diamond Octahedron Lattice
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const r = 2.75 * Math.pow(Math.sin(phi), 0.6);

        targets[idx] = r * Math.cos(theta);
        targets[idx + 1] = (phi - Math.PI / 2) * 2.45;
        targets[idx + 2] = r * Math.sin(theta);
      } else if (type === 'stream') {
        // 3. High-Velocity Quantum Double Helix / Stream
        const t = (i / count) * Math.PI * 4;
        const strand = i % 2 === 0 ? 0 : Math.PI;
        const radius = 1.65;
        const length = 5.8;

        targets[idx] = radius * Math.cos(t + strand);
        targets[idx + 1] = (i / count - 0.5) * length;
        targets[idx + 2] = radius * Math.sin(t + strand);
      } else {
        // 4. Expansive Neural Wave Field spanning screen width
        const cols = 24;
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = (col / (cols - 1) - 0.5) * 8.6;
        const z = (row / (count / cols - 1) - 0.5) * 5.0;
        const y = Math.sin((col / cols) * Math.PI * 2) * 0.85 + Math.cos((row / (count / cols)) * Math.PI * 2) * 0.6;

        targets[idx] = x;
        targets[idx + 1] = y;
        targets[idx + 2] = z;
      }
    }

    return targets;
  }, []);

  // Sync formation changes to target positions
  useEffect(() => {
    sceneState.current.currentFormation = activeFormation;
    const newTargets = computeTargetPositions(activeFormation, PARTICLE_COUNT);
    sceneState.current.targetPositions = newTargets;
  }, [activeFormation, computeTargetPositions, PARTICLE_COUNT]);

  // Auto-cycle through formations every 14 seconds when active
  useEffect(() => {
    if (!isAutoCycle) return;
    const formationsList: NeuralFormation[] = ['sphere', 'matrix', 'stream', 'field'];
    const timer = setInterval(() => {
      const nextIdx = (formationsList.indexOf(activeFormation) + 1) % formationsList.length;
      const nextFormation = formationsList[nextIdx];
      if (onFormationChange) {
        onFormationChange(nextFormation);
      } else {
        setInternalFormation(nextFormation);
      }
    }, 14000);

    return () => clearInterval(timer);
  }, [isAutoCycle, activeFormation, onFormationChange]);

  // Main Three.js Scene Setup & Animation Loop
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Responsive camera distance for mobile portrait vs desktop
    const aspect = width / height;
    camera.position.set(0, 0, aspect < 1 ? 7.2 + (1 - aspect) * 3.5 : 7.2);

    // 2. WebGL Renderer with Transparent Alpha
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    scene.add(group);

    // 3. Particles & Connecting Synapse Lines
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const initialTargets = computeTargetPositions(sceneState.current.currentFormation, PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    // Brand Palette: High-contrast Indigo, Sapphire, Vivid Cyan, Violet & Deep Navy
    const brandPalette = [
      new THREE.Color('#353788'),
      new THREE.Color('#4338CA'),
      new THREE.Color('#0096C7'),
      new THREE.Color('#6366F1'),
      new THREE.Color('#2563EB'),
      new THREE.Color('#1E1B4B'),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      positions[idx] = initialTargets[idx] + (Math.random() - 0.5) * 1.5;
      positions[idx + 1] = initialTargets[idx + 1] + (Math.random() - 0.5) * 1.5;
      positions[idx + 2] = initialTargets[idx + 2] + (Math.random() - 0.5) * 1.5;

      const chosenColor = brandPalette[i % brandPalette.length];
      colors[idx] = chosenColor.r;
      colors[idx + 1] = chosenColor.g;
      colors[idx + 2] = chosenColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const circleTexture = createCircleTexture();
    sceneState.current.circleTexture = circleTexture;

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.22,
      map: circleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.96,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    // Dynamic Line Segments
    const linePositions = new Float32Array(MAX_LINES * 2 * 3);
    const lineColors = new Float32Array(MAX_LINES * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lines);

    sceneState.current.renderer = renderer;
    sceneState.current.scene = scene;
    sceneState.current.camera = camera;
    sceneState.current.group = group;
    sceneState.current.particles = particles;
    sceneState.current.lines = lines;
    sceneState.current.currentPositions = positions;
    sceneState.current.targetPositions = initialTargets;
    sceneState.current.colors = colors;
    sceneState.current.viewportSize = { width, height };

    // 4. Kinetic Animation Loop with Active Cursor Follow
    const animate = () => {
      const s = sceneState.current;
      s.clock += 0.011;

      // Mouse smoothing (LERP) - quick, buttery smooth tracking
      s.mouse.x += (s.mouse.targetX - s.mouse.x) * 0.1;
      s.mouse.y += (s.mouse.targetY - s.mouse.y) * 0.1;

      // Active 3D Geometry Following: Dynamic 3D Translation, Orbital Tilt & Roll
      if (s.group) {
        // Physical 3D translation: the entire geometry glides towards the cursor
        const targetPosX = s.mouse.x * 1.5;
        const targetPosY = s.mouse.y * 1.05;
        s.group.position.x += (targetPosX - s.group.position.x) * 0.085;
        s.group.position.y += (targetPosY - s.group.position.y) * 0.085;

        // Dynamic 3D rotation & tilt: look towards the cursor + ambient continuous spin
        const targetRotY = s.clock * 0.12 + s.mouse.x * 0.95;
        const targetRotX = Math.sin(s.clock * 0.08) * 0.06 - s.mouse.y * 0.85;
        const targetRotZ = -s.mouse.x * 0.28;

        s.group.rotation.y += (targetRotY - s.group.rotation.y) * 0.09;
        s.group.rotation.x += (targetRotX - s.group.rotation.x) * 0.09;
        s.group.rotation.z += (targetRotZ - s.group.rotation.z) * 0.09;
      }

      const cur = s.currentPositions;
      const tgt = s.targetPositions;
      const posAttr = particleGeometry.getAttribute('position') as THREE.BufferAttribute;
      const linePosAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
      const lineColAttr = lineGeometry.getAttribute('color') as THREE.BufferAttribute;

      // World mouse coordinates at z = 0 plane
      const vpAspect = s.viewportSize.height > 0 ? s.viewportSize.width / s.viewportSize.height : 1.77;
      const halfHeight = 2.98;
      const halfWidth = halfHeight * vpAspect;
      const worldMouseX = s.mouse.active ? s.mouse.x * halfWidth : 9999;
      const worldMouseY = s.mouse.active ? s.mouse.y * halfHeight : 9999;

      // Local cursor position relative to the translated 3D group
      const localMouseX = worldMouseX - (s.group ? s.group.position.x : 0);
      const localMouseY = worldMouseY - (s.group ? s.group.position.y : 0);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;

        // Smooth spring pull to formation target
        cur[idx] += (tgt[idx] - cur[idx]) * 0.055;
        cur[idx + 1] += (tgt[idx + 1] - cur[idx + 1]) * 0.055;
        cur[idx + 2] += (tgt[idx + 2] - cur[idx + 2]) * 0.055;

        // Organic undulating wave
        cur[idx + 1] += Math.sin(s.clock * 1.8 + i * 0.4) * 0.0035;
        cur[idx] += Math.cos(s.clock * 1.2 + i * 0.3) * 0.002;

        // Elastic Dynamic Cursor Influence (Magnetic field perturbation)
        if (s.mouse.active) {
          const dx = cur[idx] - localMouseX;
          const dy = cur[idx + 1] - localMouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 3.8 && distSq > 0.001) {
            const force = (3.8 - distSq) * 0.075;
            cur[idx] += dx * force;
            cur[idx + 1] += dy * force;
          }
        }
      }
      posAttr.needsUpdate = true;

      // Dynamic Proximity Synapses (Connections)
      let lineVertexIdx = 0;
      const linePos = linePositions;
      const lineCol = lineColors;
      const maxConnectDist = 1.35;
      const maxConnectDistSq = maxConnectDist * maxConnectDist;

      for (let i = 0; i < PARTICLE_COUNT && lineVertexIdx < MAX_LINES * 6; i++) {
        const i3 = i * 3;
        for (let j = i + 1; j < PARTICLE_COUNT && lineVertexIdx < MAX_LINES * 6; j++) {
          const j3 = j * 3;
          const dx = cur[i3] - cur[j3];
          const dy = cur[i3 + 1] - cur[j3 + 1];
          const dz = cur[i3 + 2] - cur[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          // Fast squared distance rejection before expensive Math.sqrt
          if (distSq < maxConnectDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = 1.0 - dist / maxConnectDist;
            const lineAlpha = Math.max(0.32, alpha);

            // Vertex 1 (Indigo / Deep Sapphire)
            linePos[lineVertexIdx] = cur[i3];
            linePos[lineVertexIdx + 1] = cur[i3 + 1];
            linePos[lineVertexIdx + 2] = cur[i3 + 2];
            lineCol[lineVertexIdx] = 0.22 * lineAlpha;
            lineCol[lineVertexIdx + 1] = 0.24 * lineAlpha;
            lineCol[lineVertexIdx + 2] = 0.58 * lineAlpha;

            // Vertex 2 (Cyan / Vivid Azure)
            linePos[lineVertexIdx + 3] = cur[j3];
            linePos[lineVertexIdx + 4] = cur[j3 + 1];
            linePos[lineVertexIdx + 5] = cur[j3 + 2];
            lineCol[lineVertexIdx + 3] = 0.02 * lineAlpha;
            lineCol[lineVertexIdx + 4] = 0.59 * lineAlpha;
            lineCol[lineVertexIdx + 5] = 0.82 * lineAlpha;

            lineVertexIdx += 6;
          }
        }
      }

      // Clear remaining line vertices
      for (let k = lineVertexIdx; k < linePositions.length; k++) {
        linePos[k] = 0;
        lineCol[k] = 0;
      }

      lineGeometry.setDrawRange(0, lineVertexIdx / 3);
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      renderer.render(scene, camera);

      if (isVisible) {
        s.rafId = requestAnimationFrame(animate);
      } else {
        s.rafId = undefined;
      }
    };

    // Visibility Observer to sleep Three.js loop when scrolled offscreen
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible && !sceneState.current.rafId) {
          sceneState.current.rafId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 }
    );
    if (container) {
      visibilityObserver.observe(container);
    }

    sceneState.current.rafId = requestAnimationFrame(animate);

    // 5. Window Pointer Tracking across Hero Viewport with RAF Throttling
    let mousePending = false;
    const handleWindowPointerMove = (e: MouseEvent) => {
      if (!isVisible || !containerRef.current || mousePending) return;
      mousePending = true;

      requestAnimationFrame(() => {
        mousePending = false;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const xPct = Math.max(-1.3, Math.min(1.3, ((e.clientX - rect.left) / rect.width) * 2 - 1));
          const yPct = Math.max(-1.3, Math.min(1.3, -(((e.clientY - rect.top) / rect.height) * 2 - 1)));
          sceneState.current.mouse.targetX = xPct;
          sceneState.current.mouse.targetY = yPct;
          sceneState.current.mouse.active = true;
        } else {
          sceneState.current.mouse.active = false;
          sceneState.current.mouse.targetX = 0;
          sceneState.current.mouse.targetY = 0;
        }
      });
    };

    window.addEventListener('mousemove', handleWindowPointerMove, { passive: true });

    // 6. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          sceneState.current.viewportSize = { width: newWidth, height: newHeight };
          const currentAspect = newWidth / newHeight;
          camera.aspect = currentAspect;
          camera.position.z = currentAspect < 1 ? 7.2 + (1 - currentAspect) * 3.5 : 7.2;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    const stateObj = sceneState.current;
    return () => {
      visibilityObserver.disconnect();
      window.removeEventListener('mousemove', handleWindowPointerMove);
      resizeObserver.disconnect();
      if (stateObj.rafId) {
        cancelAnimationFrame(stateObj.rafId);
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      circleTexture.dispose();
      renderer.dispose();
    };
  }, [computeTargetPositions, PARTICLE_COUNT]);

  const formationsList: { id: NeuralFormation; label: string; icon: typeof Compass }[] = [
    { id: 'sphere', label: 'Sphere', icon: Compass },
    { id: 'matrix', label: 'Lattice', icon: Layers },
    { id: 'stream', label: 'Helix', icon: Zap },
    { id: 'field', label: 'Field', icon: Sparkles },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Centered Luminous Atmospheric Depth Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-br from-[#353788]/[0.08] via-[#0096C7]/[0.05] to-[#8A8DF8]/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-[#353788]/[0.045] rounded-full blur-[90px] pointer-events-none" />

      {/* Centered Blueprint Dot Matrix Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(53,55,136,0.18)_1.5px,transparent_1.5px)] bg-[size:32px_32px] opacity-35 [mask-image:radial-gradient(ellipse_at_50%_50%,black_50%,transparent_90%)] pointer-events-none" />

      {/* Full-Bleed 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block relative z-0" />

      {/* Optional Floating Telemetry HUD */}
      {showFloatingControls && (
        <div className="absolute bottom-6 right-6 md:right-12 z-20 pointer-events-auto flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onMouseEnter={() => onCursorChange?.('hover')}
            onMouseLeave={() => onCursorChange?.('default')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-[#E8E8E8] shadow-[0_8px_24px_rgba(0,0,0,0.06)] text-[#171717]"
          >
            <div className="flex items-center gap-1.5 pr-2 border-r border-[#E8E8E8]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#353788] hidden sm:inline">
                QUANTUM 3D CORE
              </span>
            </div>

            <div className="flex items-center gap-1">
              {formationsList.map((item) => {
                const Icon = item.icon;
                const isActive = activeFormation === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectFormation(item.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                      isActive
                        ? 'bg-[#353788] text-white shadow-sm'
                        : 'text-[#737373] hover:text-[#171717] hover:bg-black/5'
                    }`}
                  >
                    <Icon className="w-2.5 h-2.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsAutoCycle((prev) => !prev)}
              className={`hidden lg:flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                isAutoCycle
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-zinc-50 text-zinc-500 border-zinc-200'
              }`}
            >
              <Activity className="w-2.5 h-2.5 animate-pulse" />
              <span>{isAutoCycle ? 'CYCLE' : 'PAUSED'}</span>
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
