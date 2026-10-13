import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Cpu } from 'lucide-react';

interface TrustCore3DProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}

export const TrustCore3D: React.FC<TrustCore3DProps> = ({ onCursorChange }) => {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeMode, setActiveMode] = useState<'wireframe' | 'solid' | 'core'>('wireframe');
  const [hudStats, setHudStats] = useState({ rotX: 18, rotY: 42 });

  // References to communicate with the Three.js loop safely
  const sceneState = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    coreGroup?: THREE.Group;
    solidMesh?: THREE.Mesh;
    wireframeMesh?: THREE.LineSegments;
    ring1?: THREE.Mesh;
    ring2?: THREE.Mesh;
    particles?: THREE.Points;
    isDragging: boolean;
    previousMousePosition: { x: number; y: number };
    targetRotation: { x: number; y: number };
    currentRotation: { x: number; y: number };
    rafId?: number;
  }>({
    isDragging: false,
    previousMousePosition: { x: 0, y: 0 },
    targetRotation: { x: 0.3, y: 0.7 },
    currentRotation: { x: 0.3, y: 0.7 },
  });

  useEffect(() => {
    if (!canvasRef.current || !canvasWrapperRef.current) return;

    const canvas = canvasRef.current;
    const wrapper = canvasWrapperRef.current;
    const width = wrapper.clientWidth || 340;
    const height = wrapper.clientHeight || 280;

    // 1. Scene & Camera Setup with calibrated FOV
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x353788, 5.5, 20);
    keyLight.position.set(4, 4, 4);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x6366f1, 4, 20);
    fillLight.position.set(-4, -3, 3);
    scene.add(fillLight);

    // 4. Main 3D Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 5. Central Polyhedral Core (Compact, properly scaled)
    const coreRadius = 0.95;
    const icosahedronGeo = new THREE.IcosahedronGeometry(coreRadius, 1);

    // Solid inner core with luxury translucent glass
    const solidMat = new THREE.MeshPhysicalMaterial({
      color: 0x353788,
      metalness: 0.4,
      roughness: 0.15,
      transparent: true,
      opacity: 0.45,
      transmission: 0.35,
      ior: 1.5,
    });
    const solidMesh = new THREE.Mesh(icosahedronGeo, solidMat);
    coreGroup.add(solidMesh);

    // Wireframe outer geometric lattice
    const edgesGeo = new THREE.EdgesGeometry(icosahedronGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x353788,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.85,
    });
    const wireframeMesh = new THREE.LineSegments(edgesGeo, wireframeMat);
    coreGroup.add(wireframeMesh);

    // Inner glowing nucleus
    const nucleusGeo = new THREE.OctahedronGeometry(0.48, 2);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      emissive: 0x353788,
      emissiveIntensity: 0.65,
      roughness: 0.3,
      metalness: 0.8,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleusMesh);

    // 6. Orbital Gimbal Gyroscope Rings (Cleanly bounded to avoid clipping)
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x353788,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: true,
    });
    const ringGeo1 = new THREE.TorusGeometry(1.48, 0.02, 16, 80);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    coreGroup.add(ring1);

    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.7,
      roughness: 0.3,
      wireframe: true,
    });
    const ringGeo2 = new THREE.TorusGeometry(1.82, 0.018, 16, 90);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2.5;
    coreGroup.add(ring2);

    // 7. Satellite Data Beacons on the Rings
    const beaconGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x353788 });
    const beacon1 = new THREE.Mesh(beaconGeo, beaconMat);
    beacon1.position.set(1.48, 0, 0);
    ring1.add(beacon1);

    const beacon2 = new THREE.Mesh(beaconGeo, new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    beacon2.position.set(1.82, 0, 0);
    ring2.add(beacon2);

    // 8. Spatial Data Particle Field (Bound within safe orbit)
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.6 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x353788,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // Save references to sceneState
    sceneState.current.renderer = renderer;
    sceneState.current.scene = scene;
    sceneState.current.camera = camera;
    sceneState.current.coreGroup = coreGroup;
    sceneState.current.solidMesh = solidMesh;
    sceneState.current.wireframeMesh = wireframeMesh;
    sceneState.current.ring1 = ring1;
    sceneState.current.ring2 = ring2;
    sceneState.current.particles = particles;

    // 9. Resize Observer precisely attached to the canvas viewport wrapper
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const { width: newW, height: newH } = entries[0].contentRect;
      if (newW <= 0 || newH <= 0) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
    resizeObserver.observe(wrapper);

    // 10. Animation Loop
    let clock = new THREE.Clock();
    let frameCount = 0;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle ambient rotation if not actively dragging
      if (!sceneState.current.isDragging) {
        sceneState.current.targetRotation.y += 0.0035;
        sceneState.current.targetRotation.x = Math.sin(elapsedTime * 0.4) * 0.12 + 0.15;
      }

      // Smooth rotational inertia interpolation
      const s = sceneState.current;
      s.currentRotation.x += (s.targetRotation.x - s.currentRotation.x) * 0.08;
      s.currentRotation.y += (s.targetRotation.y - s.currentRotation.y) * 0.08;

      if (coreGroup) {
        coreGroup.rotation.x = s.currentRotation.x;
        coreGroup.rotation.y = s.currentRotation.y;
      }

      // Independent counter-rotation of gimbal rings
      if (ring1) ring1.rotation.z = elapsedTime * 0.35;
      if (ring2) ring2.rotation.z = -elapsedTime * 0.45;
      if (particles) particles.rotation.y = -elapsedTime * 0.08;

      // Nucleus breathing pulsation
      const pulseScale = 1 + Math.sin(elapsedTime * 2.2) * 0.08;
      nucleusMesh.scale.set(pulseScale, pulseScale, pulseScale);

      // Render
      renderer.render(scene, camera);

      // Periodically update HUD readout only when visible
      frameCount++;
      if (frameCount % 15 === 0 && isVisible) {
        setHudStats({
          rotX: Math.round(((s.currentRotation.x * 180) / Math.PI) % 360),
          rotY: Math.round(((s.currentRotation.y * 180) / Math.PI) % 360),
        });
      }

      if (isVisible) {
        sceneState.current.rafId = requestAnimationFrame(animate);
      } else {
        sceneState.current.rafId = undefined;
      }
    };

    let isVisible = false;
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
    visibilityObserver.observe(wrapper);

    // Initial trigger if already in view
    sceneState.current.rafId = requestAnimationFrame(animate);

    // Cleanup on unmount
    const stateRef = sceneState.current;
    return () => {
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      if (stateRef.rafId) {
        cancelAnimationFrame(stateRef.rafId);
      }
      renderer.dispose();
      icosahedronGeo.dispose();
      edgesGeo.dispose();
      nucleusGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      particleGeo.dispose();
      solidMat.dispose();
      wireframeMat.dispose();
      nucleusMat.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      particleMat.dispose();
    };
  }, []);

  // Mode switching behavior
  useEffect(() => {
    const { solidMesh, wireframeMesh } = sceneState.current;
    if (!solidMesh || !wireframeMesh) return;

    if (activeMode === 'wireframe') {
      solidMesh.visible = false;
      wireframeMesh.visible = true;
    } else if (activeMode === 'solid') {
      solidMesh.visible = true;
      wireframeMesh.visible = false;
    } else {
      solidMesh.visible = true;
      wireframeMesh.visible = true;
    }
  }, [activeMode]);

  // Pointer / Mouse interaction handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    sceneState.current.isDragging = true;
    sceneState.current.previousMousePosition = { x: e.clientX, y: e.clientY };
    setIsInteracting(true);
    onCursorChange?.('drag', 'INSPECT');
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!sceneState.current.isDragging) return;

    const deltaX = e.clientX - sceneState.current.previousMousePosition.x;
    const deltaY = e.clientY - sceneState.current.previousMousePosition.y;

    sceneState.current.targetRotation.y += deltaX * 0.009;
    sceneState.current.targetRotation.x += deltaY * 0.009;

    sceneState.current.previousMousePosition = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    sceneState.current.isDragging = false;
    setIsInteracting(false);
    onCursorChange?.('default');
  };

  const handleResetOrientation = () => {
    sceneState.current.targetRotation = { x: 0.3, y: 0.7 };
  };

  return (
    <div className="relative w-full h-full min-h-[460px] sm:min-h-[480px] lg:min-h-[500px] rounded-3xl bg-gradient-to-b from-[#F7F7F5] to-white border border-[#E8E8E8] shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group flex flex-col justify-between p-5 sm:p-6 select-none">
      {/* CAD Corner Coordinates */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[#737373]/70 mb-2 pointer-events-none flex-shrink-0">
        <span className="flex items-center gap-1.5">
          <span className="text-[#353788] font-bold">+</span>
          <span>GEO_LAT: 28.4595°N</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span>SYS_STATUS: 99.98%</span>
          <span className="text-[#353788] font-bold">+</span>
        </span>
      </div>

      {/* Header HUD Bar */}
      <div className="relative z-20 flex items-center justify-between gap-3 pb-2 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#353788]/10 text-[#353788] flex items-center justify-center flex-shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717] block leading-tight">
              RetroTech Quantum Trust Core
            </span>
            <span className="text-[10px] font-mono text-[#737373] block">
              Real-Time Interactive 3D Architecture
            </span>
          </div>
        </div>

        {/* Live Active Beacon Badge */}
        <div className="flex items-center gap-1.5 bg-white border border-[#E8E8E8] px-2.5 py-1 rounded-full shadow-xs flex-shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-mono font-semibold text-[#171717]">
            {isInteracting ? 'ACTIVE INSPECT' : 'ORBITAL LOCK'}
          </span>
        </div>
      </div>

      {/* Dedicated 3D Viewport Wrapper with Dynamic Resizing */}
      <div
        ref={canvasWrapperRef}
        className="relative flex-1 w-full min-h-[240px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden my-1"
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onMouseEnter={() => onCursorChange?.('hover', 'DRAG')}
          className="w-full h-full touch-none"
        />

        {/* Floating Interactive Drag Hint */}
        <div className="absolute bottom-2 pointer-events-none text-center z-20">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-[#E8E8E8] shadow-xs">
            {isInteracting ? 'Rotating 3D Mesh' : 'Drag to Rotate • 360° Inspection'}
          </span>
        </div>
      </div>

      {/* Bottom Control & HUD Bar (Guaranteed Visibility with flex-shrink-0) */}
      <div className="relative z-20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 pt-3 border-t border-[#E8E8E8] flex-shrink-0">
        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-[#F1F1EF] p-1 rounded-xl">
          {(['wireframe', 'core', 'solid'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              onMouseEnter={() => onCursorChange?.('hover')}
              onMouseLeave={() => onCursorChange?.('default')}
              className={`px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-lg transition-all ${
                activeMode === mode
                  ? 'bg-white text-[#353788] shadow-xs'
                  : 'text-[#737373] hover:text-[#171717]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Real-time Telemetry Coordinates & Reset */}
        <div className="flex items-center gap-3">
          <div className="text-[10px] font-mono text-[#737373] flex items-center gap-2">
            <span>&theta;X: {hudStats.rotX}&deg;</span>
            <span>&theta;Y: {hudStats.rotY}&deg;</span>
          </div>

          <button
            onClick={handleResetOrientation}
            onMouseEnter={() => onCursorChange?.('hover')}
            onMouseLeave={() => onCursorChange?.('default')}
            title="Reset Orientation"
            className="w-6 h-6 rounded-lg bg-white border border-[#E8E8E8] flex items-center justify-center text-[#737373] hover:text-[#353788] hover:border-[#353788] transition-colors shadow-xs"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
