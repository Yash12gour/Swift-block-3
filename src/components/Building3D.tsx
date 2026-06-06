import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Building3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const isVisibleRef = useRef(isVisible);
  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isLargeScreen || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 360;

    // 1. Scene & Setup: Pure crystal transparent backdrop
    const scene = new THREE.Scene();
    scene.background = null; 

    // 2. Camera setting optimized for modular architectural stack
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3.6, 2.9, 4.0);
    camera.lookAt(0, 0.65, 0);

    // 3. High fidelity renderer with seamless alpha
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Vibrant Multi-directional Sun & Sky Lighting (Light Theme)
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.4); // extremely warm cozy interior ambient
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffb700, 2.0); // high-noon golden sun
    sunLight.position.set(6, 12, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const skyLight = new THREE.DirectionalLight(0x00d2ff, 1.2); // sky reflection fill
    skyLight.position.set(-6, 4, -4);
    scene.add(skyLight);

    // Engaging local colored emissions
    const neonAmberLight = new THREE.PointLight(0xff7700, 3.0, 8);
    neonAmberLight.position.set(1.2, 0.8, 1.2);
    scene.add(neonAmberLight);

    const neonEmeraldLight = new THREE.PointLight(0x22c55e, 2.5, 8);
    neonEmeraldLight.position.set(-1.2, 0.3, -1.2);
    scene.add(neonEmeraldLight);

    // 5. Stylized Lightweight Turntable Base Group
    const baseGroup = new THREE.Group();
    scene.add(baseGroup);

    // Glowing warm amber and crisp white checkerboard design grid
    const gridHelper = new THREE.GridHelper(4, 18, 0xff7700, 0xcbd5e1);
    gridHelper.position.y = -0.15;
    baseGroup.add(gridHelper);

    // High performance glazed porcelain hex plate
    const baseGeo = new THREE.CylinderGeometry(1.4, 1.45, 0.05, 6); // clean hexagonal footprint
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xfcfdfd,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.95
    });
    const baseHex = new THREE.Mesh(baseGeo, baseMat);
    baseHex.position.y = -0.18;
    baseHex.receiveShadow = true;
    baseGroup.add(baseHex);

    // Radiant outer orbit loop
    const ringGeo = new THREE.RingGeometry(1.55, 1.57, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff7700, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
    const guideRing = new THREE.Mesh(ringGeo, ringMat);
    guideRing.rotation.x = Math.PI / 2;
    guideRing.position.y = -0.14;
    baseGroup.add(guideRing);

    // 6. Creating the High-Contrast Articulated Building (Terracotta, Sun-Gold, Light-Glass blocks)
    const buildingGroup = new THREE.Group();
    baseGroup.add(buildingGroup);

    // Materials - Highly engaging color palette
    const coralMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e, // coral pink/terracotta accent
      roughness: 0.25,
      metalness: 0.4
    });

    const sunGoldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // brilliant amber gold
      roughness: 0.1,
      metalness: 0.9
    });

    const structuralBoneMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // modern cool concrete/bone white
      roughness: 0.4,
      metalness: 0.2
    });

    const skyGlassMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9, // radiant cyan-sky glass
      roughness: 0.02,
      metalness: 0.95,
      transparent: true,
      opacity: 0.55
    });

    const modelBlueprint = [
      // Foundation pedestal
      { w: 0.6, h: 0.35, d: 0.6, x: 0, y: 0.025, z: 0, mat: structuralBoneMat },
      
      // Tier 1 Base Frame Assembly
      { w: 1.2, h: 0.15, d: 1.2, x: 0, y: 0.2, z: 0, mat: sunGoldMat },
      { w: 0.28, h: 0.65, d: 0.28, x: -0.4, y: 0.55, z: 0.4, mat: coralMat },
      { w: 0.28, h: 0.65, d: 0.28, x: 0.4, y: 0.55, z: 0.4, mat: structuralBoneMat },
      { w: 0.28, h: 0.65, d: 0.28, x: -0.4, y: 0.55, z: -0.4, mat: structuralBoneMat },
      { w: 0.28, h: 0.65, d: 0.28, x: 0.4, y: 0.55, z: -0.4, mat: coralMat },
      
      // Heart of Energy (Skyglass transparent central module)
      { w: 0.52, h: 0.6, d: 0.52, x: 0, y: 0.55, z: 0, mat: skyGlassMat },

      // Middle Cantilever deck plate
      { w: 1.35, h: 0.08, d: 1.35, x: 0, y: 0.9, z: 0, mat: sunGoldMat },

      // Tier 2 Complex offsets
      { w: 0.65, h: 0.52, d: 0.65, x: -0.15, y: 1.15, z: 0.15, mat: structuralBoneMat },
      { w: 0.42, h: 0.45, d: 0.42, x: 0.22, y: 1.1, z: -0.22, mat: skyGlassMat },

      // Crown Cap
      { w: 0.75, h: 0.06, d: 0.75, x: -0.15, y: 1.41, z: 0.15, mat: coralMat },
    ];

    modelBlueprint.forEach((cfg) => {
      const geo = new THREE.BoxGeometry(cfg.w, cfg.h, cfg.d);
      const mesh = new THREE.Mesh(geo, cfg.mat);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      buildingGroup.add(mesh);

      // Contrast outlines over blocks for an illustrative blueprint effect
      const edges = new THREE.EdgesGeometry(geo);
      const outputLineColor = cfg.mat === skyGlassMat ? 0x0284c7 : (cfg.mat === coralMat ? 0xbe123c : 0xd97706);
      const lineMat = new THREE.LineBasicMaterial({ 
        color: outputLineColor, 
        linewidth: 1.5 
      });
      const line = new THREE.LineSegments(edges, lineMat);
      line.position.copy(mesh.position);
      buildingGroup.add(line);
    });

    // 7. Architectural Spire Needle & Signal Pulse Tip
    const antennaGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.65, 8);
    const antennaMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85 });
    const antenna = new THREE.Mesh(antennaGeo, antennaMat);
    antenna.position.set(-0.15, 1.72, 0.15);
    buildingGroup.add(antenna);

    const statusBeaconGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const statusBeaconMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
    const beacon = new THREE.Mesh(statusBeaconGeo, statusBeaconMat);
    beacon.position.set(-0.15, 2.05, 0.15);
    buildingGroup.add(beacon);

    // 8. Rotating Energy Stabilizer Halo Ring (illustrative mechanical design)
    const haloGroup = new THREE.Group();
    haloGroup.position.set(0, 0.92, 0);
    baseGroup.add(haloGroup);

    const torusGeo = new THREE.TorusGeometry(0.85, 0.018, 8, 48);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0xff7700, transparent: true, opacity: 0.85 });
    const cyberTorus = new THREE.Mesh(torusGeo, torusMat);
    cyberTorus.rotation.x = Math.PI / 2;
    haloGroup.add(cyberTorus);

    // Mini focus lenses rotating on orbital ring
    const nodeGeo = new THREE.BoxGeometry(0.06, 0.045, 0.06);
    const nodeMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, metalness: 0.8 });
    const laserLens1 = new THREE.Mesh(nodeGeo, nodeMat);
    laserLens1.position.set(0.85, 0, 0);
    haloGroup.add(laserLens1);

    const laserLens2 = new THREE.Mesh(nodeGeo, nodeMat);
    laserLens2.position.set(-0.85, 0, 0);
    haloGroup.add(laserLens2);

    // 9. Interactive and dynamic tick loop with 30fps throttle & visibility bypass
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let frameDelta = 0;
    const fpsLimit = 1 / 30; // rigid 30 FPS cap for high performance

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();
      frameDelta += delta;
      if (frameDelta < fpsLimit) return;
      frameDelta = frameDelta % fpsLimit;

      const elapsedTime = clock.getElapsedTime();

      // Fluid orbital rotations
      baseGroup.rotation.y = elapsedTime * 0.32;

      // Delightful architectural floating curve
      buildingGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.05;

      // Accelerated scanner rotation
      haloGroup.rotation.y = -elapsedTime * 1.4;
      haloGroup.rotation.x = Math.sin(elapsedTime * 2.2) * 0.06;

      // Pulse bright amber gold and hot pink on the indicator tip
      const pulseColor = 0.5 + Math.sin(elapsedTime * 10) * 0.5;
      statusBeaconMat.color.setHSL(0.02, 1.0, 0.4 + pulseColor * 0.25);

      renderer.render(scene, camera);
    };

    animate();

    // 10. Frame resizing handler with ResizeObserver
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 11. Viewport Intersection Observer
    const viewportObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.02 }
    );
    viewportObserver.observe(container);

    // 12. Memory release on cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      viewportObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isLargeScreen]);

  if (!isLargeScreen) return null; // Avoid running any 3D WebGL computation on smaller viewports entirely!

  return (
    <div className="relative w-full h-[320px] lg:h-[400px] bg-stone-50 rounded-2xl border border-stone-250 shadow-lg flex items-center justify-center overflow-hidden">
      {/* Dynamic graphic aesthetic lines */}
      <div className="absolute inset-0 bg-radial from-stone-50/50 via-stone-100/30 to-stone-200/10 opacity-70 pointer-events-none" />
      
      {/* 3D Label overlay in sunny high-contrast palette */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 select-none z-10 pointer-events-none">
        <span className="text-[9px] font-mono font-extrabold text-amber-700 tracking-widest uppercase bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md backdrop-blur-md leading-none">
          SIMULATOR ACTIVE // MODULAR STRUCTURAL CORE
        </span>
        <span className="text-xs font-sans font-extrabold text-stone-800 uppercase tracking-wider leading-none mt-1">
          Futuristic High-Density Block
        </span>
      </div>

      {/* Cyber diagnostics specs in sleek warm text */}
      <div className="absolute bottom-4 left-4 hidden xl:flex flex-col gap-0.5 text-[8px] font-mono text-stone-500 z-10 select-none font-bold">
        <span>X-RESONANCE: 1.48 RAD</span>
        <span>HOLOGRAPHIC ACCURACY: 99.8%</span>
        <span>PALETTE: HIGH-CONTRAST CORAL GOLD</span>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 z-10 pointer-events-none text-[9px] font-mono text-stone-600 select-none font-extrabold">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
        <span className="text-rose-600 tracking-wider">SPECTRUM RENDER ACTIVE</span>
      </div>

      {/* Rendering target */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing z-0" />
    </div>
  );
}
