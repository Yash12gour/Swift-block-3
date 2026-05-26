import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Flame, 
  Droplet, 
  Scale, 
  Plus, 
  RotateCcw, 
  Check, 
  Info,
  Shield,
  Layers,
  Zap,
  ArrowRight
} from 'lucide-react';

interface ThreeCanvasProps {
  activeSize: { l: number; h: number; w: number };
}

export default function ThreeCanvas({ activeSize }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'showroom' | 'builder' | 'physics'>('showroom');
  
  // Tab states
  // Builder tab
  const [blocksInWall, setBlocksInWall] = useState<number>(3);
  // Physics lab tab
  const [testMode, setTestMode] = useState<'thermal' | 'buoyancy' | 'load'>('thermal');
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<string>('');

  // Synchronized state references to prevent Three.js WebGL re-initialization and rendering contexts leaks
  const activeTabRef = useRef(activeTab);
  const testModeRef = useRef(testMode);
  const isTestRunningRef = useRef(isTestRunning);
  const activeSizeRef = useRef(activeSize);
  const blocksInWallRef = useRef(blocksInWall);

  const updateWallBuilderMeshesRef = useRef<() => void>();

  useEffect(() => { activeTabRef.current = activeTab; }, [activeTab]);
  useEffect(() => { testModeRef.current = testMode; }, [testMode]);
  useEffect(() => { isTestRunningRef.current = isTestRunning; }, [isTestRunning]);
  useEffect(() => { activeSizeRef.current = activeSize; }, [activeSize]);
  useEffect(() => { blocksInWallRef.current = blocksInWall; }, [blocksInWall]);

  // Three.js References
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const requestRef = useRef<number | null>(null);

  // Mesh References
  const showroomMeshRef = useRef<THREE.Mesh | null>(null);
  const builderGroupRef = useRef<THREE.Group | null>(null);
  const physicsLeftMeshRef = useRef<THREE.Mesh | null>(null); // Brick
  const physicsRightMeshRef = useRef<THREE.Mesh | null>(null); // Eco Blox
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const fireParticlesRef = useRef<THREE.Points | null>(null);

  // Mouse interaction state values
  const mouseX = useRef<number>(0);
  const mouseY = useRef<number>(0);
  const targetRotationX = useRef<number>(0);
  const targetRotationY = useRef<number>(0);
  const targetZoom = useRef<number>(1.28);
  const currentZoom = useRef<number>(1.28);

  // Material helpers: Generate concrete grain and clay grain procedurally using raw HTML5 Canvases
  const generateConcreteTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Cement base colors
    ctx.fillStyle = '#b0b5b3';
    ctx.fillRect(0, 0, 512, 512);

    // Apply granular concrete pores
    for (let i = 0; i < 40000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const radius = Math.random() * 1.5;
      const opacity = Math.random() * 0.25;
      
      // Grey air-bubbles
      ctx.fillStyle = `rgba(60, 60, 60, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Light grains
      if (Math.random() > 0.6) {
        ctx.fillStyle = `rgba(240, 240, 240, ${opacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(x + Math.random(), y + Math.random(), radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    return texture;
  };

  const generateClayTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Clay base burnt-red-orange color
    ctx.fillStyle = '#b24c30';
    ctx.fillRect(0, 0, 256, 256);

    // Clay rough sand grits
    for (let i = 0; i < 20000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const radius = Math.random() * 1;
      const opacity = Math.random() * 0.35;
      
      // Burnt spots
      ctx.fillStyle = `rgba(40, 10, 5, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Sandy speckles
      if (Math.random() > 0.7) {
        ctx.fillStyle = `rgba(210, 150, 120, ${opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  // Main Scene Setup
  useEffect(() => {
    if (!mountRef.current) return;

    // Clear old elements
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = null; // transparent to mesh with tailwind backgrounds
    sceneRef.current = scene;

    // 2. Camera
    const width = mountRef.current.clientWidth || 500;
    const height = mountRef.current.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.95, 4.3);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 8, 5);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    dirLight1.shadow.bias = -0.001;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xbad2e5, 0.6); // slight sky azul reflection
    dirLight2.position.set(-5, 4, -3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x22c55e, 0, 5); // Glow accent light if needed
    scene.add(pointLight);

    // 5. Initialize Procedural Textures
    const concreteText = generateConcreteTexture();
    const clayText = generateClayTexture();

    // 6. BUILD SYSTEM IN EACH STATE
    
    // --- SHOWROOM MESHES ---
    // Standard block geometry: activeSize dimensions mapped to meters.
    // Standard sizes are e.g. L=600mm, H=200m, W=150mm. Map to units: (L: 1.8, H: 0.6, W: 0.45 for scaling)
    const blockScaleL = (activeSizeRef.current.l / 600) * 2.2;
    const blockScaleH = (activeSizeRef.current.h / 200) * 0.72;
    const blockScaleW = (activeSizeRef.current.w / 150) * 0.54;

    const showroomGeo = new THREE.BoxGeometry(1, 1, 1);
    // Chamfer-like bevel simulation using a custom material profile or nice edges
    const showroomMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      map: concreteText,
      bumpMap: concreteText,
      bumpScale: 0.02,
      roughness: 0.8,
      metalness: 0.05
    });
    
    const showroomMesh = new THREE.Mesh(showroomGeo, showroomMat);
    showroomMesh.castShadow = true;
    showroomMesh.receiveShadow = true;
    showroomMesh.position.set(0, 0.1, 0);
    showroomMesh.scale.set(blockScaleL, blockScaleH, blockScaleW);
    scene.add(showroomMesh);
    showroomMeshRef.current = showroomMesh;

    // Add clean subtle shadow receiver below
    const floorGeo = new THREE.PlaneGeometry(10, 10);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1.2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // --- BUILDER GROUP MESHES ---
    const builderGroup = new THREE.Group();
    scene.add(builderGroup);
    builderGroupRef.current = builderGroup;

    // --- PHYSICS LAB MESHES ---
    // Left: Traditional Red Clay Brick (L=1.0, H=0.5, W=0.5)
    const clayBrickGeo = new THREE.BoxGeometry(1.0, 0.5, 0.5);
    const clayBrickMat = new THREE.MeshStandardMaterial({
      color: 0xa84122,
      map: clayText,
      bumpMap: clayText,
      bumpScale: 0.025,
      roughness: 0.9,
      metalness: 0.0
    });
    const clayBrickMesh = new THREE.Mesh(clayBrickGeo, clayBrickMat);
    clayBrickMesh.castShadow = true;
    clayBrickMesh.position.set(-1.4, 0, 0);
    scene.add(clayBrickMesh);
    physicsLeftMeshRef.current = clayBrickMesh;

    // Right: Swift Eco Blox
    const rightEcoGeo = new THREE.BoxGeometry(1.5, 0.5, 0.5);
    const rightEcoMesh = new THREE.Mesh(rightEcoGeo, showroomMat);
    rightEcoMesh.castShadow = true;
    rightEcoMesh.position.set(1.4, 0, 0);
    scene.add(rightEcoMesh);
    physicsRightMeshRef.current = rightEcoMesh;

    // Water reservoir container (invisible initially, slides into position in buoyancy)
    const waterGeo = new THREE.BoxGeometry(4.2, 1.4, 1.8);
    const waterMat = new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.7,
      ior: 1.33
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.set(0, -1.2, 0);
    scene.add(waterMesh);
    waterMeshRef.current = waterMesh;

    // Flame particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Initialize random scattered positions around zero
      positions[i * 3] = (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 1] = Math.random() * 0.8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;

      // Color ranges from red to bright yellow
      colors[i * 3] = 1.0; // R
      colors[i * 3 + 1] = Math.random() * 0.5; // G
      colors[i * 3 + 2] = 0.0; // B
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0,
    });

    const fireParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(fireParticles);
    fireParticlesRef.current = fireParticles;

    // Helper: Build the dynamic Wall models depending on blocksInWall count
    const updateWallBuilderMeshes = () => {
      // Clear old meshes
      while (builderGroup.children.length > 0) {
        builderGroup.remove(builderGroup.children[0]);
      }

      // Block values (Scaled in meters)
      const bW = 1.45;
      const bH = 0.48;
      const bD = 0.36;

      let blockIndex = 0;
      const blocksCount = blocksInWallRef.current;
      // Staggered layout. Row 1: base blocks, Row 2: interlocking, Row 3: cap
      for (let row = 0; row < 4; row++) {
        const isOffset = row % 2 !== 0;
        const blocksInRow = isOffset ? 3 : 2;
        
        for (let col = 0; col < blocksInRow; col++) {
          if (blockIndex >= blocksCount) break;

          let meshGeo = new THREE.BoxGeometry(bW, bH, bD);
          let meshX = 0;

          // Align centered with overlap offset
          if (isOffset) {
            // center gap-stagger layout
            // Blocks: 1 half block, 1 full block, 1 half block
            if (col === 0) {
              meshGeo = new THREE.BoxGeometry(0.69, bH, bD);
              meshX = -1.1;
            } else if (col === 1) {
              meshX = 0;
            } else {
              meshGeo = new THREE.BoxGeometry(0.69, bH, bD);
              meshX = 1.1;
            }
          } else {
            // Two full blocks
            meshX = col === 0 ? -0.735 : 0.735;
          }

          const singleBlockMesh = new THREE.Mesh(meshGeo, showroomMat);
          singleBlockMesh.castShadow = true;
          singleBlockMesh.receiveShadow = true;
          singleBlockMesh.position.set(meshX, row * (bH + 0.015) - 0.75, 0);
          builderGroup.add(singleBlockMesh);

          // Add a thin mortar glue representation (light green for Eco polymer bond)
          const mortarGeo = isOffset 
            ? new THREE.PlaneGeometry(2.9, 0.01) 
            : new THREE.PlaneGeometry(2.9, 0.01);
          const mortarMat = new THREE.MeshBasicMaterial({ 
            color: 0x4ade80, 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
          });
          const mortarMesh = new THREE.Mesh(mortarGeo, mortarMat);
          mortarMesh.rotation.x = Math.PI / 2;
          mortarMesh.position.set(0, row * (bH + 0.015) - bH/2 - 0.007 - 0.75, 0);
          builderGroup.add(mortarMesh);

          blockIndex++;
        }
      }
    };

    updateWallBuilderMeshesRef.current = updateWallBuilderMeshes;
    updateWallBuilderMeshes();

    // 7. Dynamic Mouse Pointer Controls
    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouseX.current = x;
      mouseY.current = y;
    };

    // Prevent scrolling parent page when zooming block canvas
    const handleScrollPrevent = (e: WheelEvent) => {
      if (containerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        const factor = e.deltaY * -0.002;
        targetZoom.current = Math.min(Math.max(0.8, targetZoom.current + factor), 2.2);
      }
    };

    const canvasEl = renderer.domElement;
    canvasEl.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('wheel', handleScrollPrevent, { passive: false });

    // 8. Uniform Performance Rendering Loops
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth zoom damping
      currentZoom.current += (targetZoom.current - currentZoom.current) * 0.15;
      camera.zoom = currentZoom.current;
      camera.updateProjectionMatrix();

      // Adjust views & components depending on state
      const currentTab = activeTabRef.current;
      const currentMode = testModeRef.current;
      const isRunning = isTestRunningRef.current;

      if (currentTab === 'showroom') {
        // Showroom meshes visible, others hidden
        showroomMesh.visible = true;
        builderGroup.visible = false;
        clayBrickMesh.visible = false;
        rightEcoMesh.visible = false;
        waterMesh.visible = false;
        fireParticles.visible = false;

        // Slow hover rotation + mouse offset rotation
        targetRotationY.current += (mouseX.current * 0.5 - targetRotationY.current) * 0.06;
        targetRotationX.current += (-mouseY.current * 0.5 - targetRotationX.current) * 0.06;

        showroomMesh.rotation.y = targetRotationY.current + elapsedTime * 0.15;
        showroomMesh.rotation.x = targetRotationX.current;
        
        // Gentle float
        showroomMesh.position.y = 0.1 + Math.sin(elapsedTime * 1.5) * 0.06;

        // Apply dynamic scale
        const size = activeSizeRef.current;
        const sL = (size.l / 600) * 2.2;
        const sH = (size.h / 200) * 0.72;
        const sW = (size.w / 150) * 0.54;
        showroomMesh.scale.set(sL, sH, sW);

      } else if (currentTab === 'builder') {
        // Stacking wall visualization
        showroomMesh.visible = false;
        builderGroup.visible = true;
        clayBrickMesh.visible = false;
        rightEcoMesh.visible = false;
        waterMesh.visible = false;
        fireParticles.visible = false;

        // Spin group slightly with cursor
        builderGroup.rotation.y = mouseX.current * 0.4 + Math.sin(elapsedTime * 0.3) * 0.1;

      } else if (currentTab === 'physics') {
        // Lab comparisons visible
        showroomMesh.visible = false;
        builderGroup.visible = false;
        clayBrickMesh.visible = true;
        rightEcoMesh.visible = true;

        // Mouse offsets on visualizer items
        clayBrickMesh.rotation.y = mouseX.current * 0.2 + elapsedTime * 0.1;
        rightEcoMesh.rotation.y = mouseX.current * 0.2 + elapsedTime * 0.1;

        // PHYSICS TEST TIMELINE ANIMATIONS
        if (currentMode === 'buoyancy') {
          waterMesh.visible = true;
          fireParticles.visible = false;
          
          // Animate water appearing
          if (isRunning) {
            waterMat.opacity += (0.42 - waterMat.opacity) * 0.08;
            waterMesh.position.y += (-0.2 - waterMesh.position.y) * 0.08;

            // Deep fall (Clay Brick sinks rapidly below base levels)
            clayBrickMesh.position.y += (-0.8 - clayBrickMesh.position.y) * 0.05;
            clayBrickMesh.rotation.z += (0.22 - clayBrickMesh.rotation.z) * 0.05;

            // Float float (Eco Blox drops slightly, then floats with buoyancy wave)
            const buoyancyY = 0.1 + Math.sin(elapsedTime * 2.5) * 0.04;
            rightEcoMesh.position.y += (buoyancyY - rightEcoMesh.position.y) * 0.06;
          } else {
            // Default reset positions
            waterMat.opacity += (0 - waterMat.opacity) * 0.1;
            waterMesh.position.y += (-1.2 - waterMesh.position.y) * 0.1;
            clayBrickMesh.position.y += (0 - clayBrickMesh.position.y) * 0.1;
            clayBrickMesh.rotation.z += (0 - clayBrickMesh.rotation.z) * 0.1;
            rightEcoMesh.position.y += (0 - rightEcoMesh.position.y) * 0.1;
          }
        } else if (currentMode === 'thermal') {
          waterMesh.visible = false;

          if (isRunning) {
            fireParticles.visible = true;
            particleMat.opacity += (0.85 - particleMat.opacity) * 0.1;

            // Left brick conducting heat - changes from rust-brick red to boiling orange
            const conductHeat = 0.5 + Math.sin(elapsedTime * 4.0) * 0.3;
            clayBrickMat.color.setRGB(0.66 + conductHeat * 0.34, 0.25 + conductHeat * 0.15, 0.12);

            // Right block stays cool green/cement hue
            showroomMat.color.setHex(0xbbf7d0); // subtle minty cool barrier color

            // Animate 3D fire particles floating upwards at heat interfaces
            const posAttr = particleGeo.getAttribute('position') as THREE.BufferAttribute;
            const colorsAttr = particleGeo.getAttribute('color') as THREE.BufferAttribute;
            const posArray = posAttr.array as Float32Array;
            const colsArray = colorsAttr.array as Float32Array;

            for (let i = 0; i < particleCount; i++) {
              const i3 = i * 3;
              let px = posArray[i3];
              let py = posArray[i3 + 1];
              let pz = posArray[i3 + 2];

              py += delta * 0.4;
              if (py > 0.8) {
                py = 0;
                px = (Math.random() - 0.5) * 1.5 - 1.4; // center on Left red brick
                pz = (Math.random() - 0.5) * 0.4;
              }
              posArray[i3] = px;
              posArray[i3 + 1] = py;
              posArray[i3 + 2] = pz;

              // color fades as it goes up
              colsArray[i3 + 1] = (1.0 - py) * 0.6; // Green reduction (yellow fade to red)
            }
            posAttr.needsUpdate = true;
            colorsAttr.needsUpdate = true;

          } else {
            // Stop fire, restore neutral colors
            particleMat.opacity += (0 - particleMat.opacity) * 0.1;
            if (particleMat.opacity < 0.05) fireParticles.visible = false;

            clayBrickMat.color.setHex(0xa84122);
            showroomMat.color.setHex(0xcccccc);
          }
        } else if (currentMode === 'load') {
          waterMesh.visible = false;
          fireParticles.visible = false;

          if (isRunning) {
            // Traditional brick compresses/squashes slightly under massive loading vectors
            clayBrickMesh.scale.y += (0.75 - clayBrickMesh.scale.y) * 0.06;
            // Eco blocks stand robustly unbended
            rightEcoMesh.scale.y += (1.0 - rightEcoMesh.scale.y) * 0.06;
          } else {
            clayBrickMesh.scale.set(1, 1, 1);
            rightEcoMesh.scale.set(1, 1, 1);
          }
        }
      }

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    // Start rendering frame
    requestRef.current = requestAnimationFrame(animate);

    // 9. Resize handler with ResizeObserver
    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (mountRef.current) {
      resizeObserver.observe(mountRef.current);
    }

    // Clean up
    return () => {
      resizeObserver.disconnect();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (canvasEl) canvasEl.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('wheel', handleScrollPrevent);
      concreteText.dispose();
      clayText.dispose();
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
      if (canvasEl && mountRef.current && mountRef.current.contains(canvasEl)) {
        mountRef.current.removeChild(canvasEl);
      }
    };
  }, []);

  // Update wall meshes cleanly without tearing down WebGL contexts
  useEffect(() => {
    if (updateWallBuilderMeshesRef.current) {
      updateWallBuilderMeshesRef.current();
    }
  }, [blocksInWall]);

  // Restart trigger when builders align blocks
  const handleAddBlock = () => {
    if (blocksInWall < 9) {
      setBlocksInWall(prev => prev + 1);
    }
  };

  const handleResetWall = () => {
    setBlocksInWall(3);
  };

  // Run dynamic physics lab visual validations
  const handleRunPhysicsTest = () => {
    if (isTestRunning) return;
    setIsTestRunning(true);
    
    let result = '';
    if (testMode === 'buoyancy') {
      result = " buoyant structure. Red brick (density ~1900kg/m³) drops straight down. AAC Eco Blox (density ~600kg/m³) floats effortlessly on water!";
    } else if (testMode === 'thermal') {
      result = " thermal barrier block. Red clay brick conducts high heat within mins. Swift Eco Blox stops conduction entirely due to its micro gas cell pores!";
    } else {
      result = " superior weight-to-bearing efficiency. Eco Blox reduces overall column weight loading by up to 30%+ compared to standard bricks.";
    }

    setTestResult(result);

    // Auto terminate verification step after 5.5s
    setTimeout(() => {
      setIsTestRunning(false);
    }, 4500);
  };

  return (
    <div ref={containerRef} className="bg-stone-900 rounded-3xl p-5 md:p-6 border border-stone-800 shadow-xl overflow-hidden flex flex-col h-full relative">
      
      {/* Dynamic Tab Navigation Headers */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-3 z-10 relative">
        <div>
          <span className="text-xs font-mono text-green-400 font-semibold tracking-wider uppercase block mb-0.5">
            Studio Experience
          </span>
          <h3 className="font-display text-xl md:text-2xl font-bold text-white">
            Interactive 3D Engine
          </h3>
        </div>

        <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-850">
          <button
            onClick={() => { setActiveTab('showroom'); setIsTestRunning(false); setTestResult(''); }}
            className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'showroom'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-green-400" />
            Showroom
          </button>
          <button
            onClick={() => { setActiveTab('builder'); setIsTestRunning(false); setTestResult(''); }}
            className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'builder'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Layers className="w-4 h-4 text-green-400" />
            Build Wall
          </button>
          <button
            onClick={() => { setActiveTab('physics'); setIsTestRunning(false); setTestResult(''); }}
            className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'physics'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Zap className="w-4 h-4 text-green-400" />
            Physics Lab
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Container */}
      <div className="flex-1 min-h-[160px] md:min-h-[220px] lg:min-h-[260px] relative mt-2 flex items-center justify-center">
        
        {/* Mount point for Three.js */}
        <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" />
        
        {/* Ambient Canvas Labels */}
        <div className="absolute top-2 left-2 px-2.5 py-0.5 bg-stone-950/80 backdrop-blur-md border border-stone-800/80 rounded text-[9px] font-mono text-stone-400 flex items-center gap-1.5 pointer-events-none select-none">
          <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
          WebGL Active • Drag to Spin • Scroll to Zoom
        </div>

      </div>

      {/* Dynamic Context Overlays (Positioned beneath the canvas to keep 3D asset 100% visible) */}
      <div className="w-full mt-2 pointer-events-auto z-10 flex flex-col gap-1.5">
        
        <AnimatePresence mode="wait">
          
          {/* Showroom Overlay */}
          {activeTab === 'showroom' && (
            <motion.div
              key="showroom-hud"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-stone-950/90 backdrop-blur-md p-3.5 rounded-xl border border-stone-800/80 shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-display font-bold text-white text-sm">
                    Eco Blox Model ({activeSize.l}x{activeSize.h}x{activeSize.w} mm)
                  </h4>
                  <p className="text-xs text-white mt-0.5 leading-relaxed">
                    Custom structural block textured with high-density procedural micro air pores. Aeration ratio exceeds 70%.
                  </p>
                </div>
                <div className="bg-green-950/80 px-2 py-0.5 rounded text-[9px] font-mono text-green-400 border border-green-800/40 font-bold whitespace-nowrap">
                  ISI Brand Standard
                </div>
              </div>
            </motion.div>
          )}

          {/* Builder Overlay */}
          {activeTab === 'builder' && (
            <motion.div
              key="builder-hud"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-stone-950/90 backdrop-blur-md p-3.5 rounded-xl border border-stone-800/80 shadow-lg flex flex-col md:flex-row items-center gap-4 justify-between"
            >
              <div>
                <h4 className="font-display font-mono text-xs font-semibold text-green-400 uppercase tracking-wide">
                  Modular Interlock Assembly
                </h4>
                <div className="text-xs font-bold text-stone-100 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span>Blocks Stacked: {blocksInWall} / 9</span>
                  <span className="text-stone-750">|</span>
                  <span className="text-orange-400 font-medium">Estimated wall weight: {blocksInWall * 11} kg</span>
                  <span className="text-stone-750 text-xs">vs</span>
                  <span className="text-red-450 line-through font-normal">{blocksInWall * 36} kg (Red Brick)</span>
                </div>
                <p className="text-[10px] text-stone-400 leading-normal mt-0.5">
                  AAC blocks interlock perfectly in staggered rows with just 2-3mm PMC binding mortar. Faster assembly, 68% brick dead-load saved!
                </p>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                <button
                  onClick={handleAddBlock}
                  disabled={blocksInWall >= 9}
                  className="flex-1 md:flex-none justify-center px-3 py-1.5 bg-green-600 hover:bg-green-500 active:scale-95 disabled:opacity-40 disabled:scale-100 text-white font-medium text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Lay Block
                </button>
                <button
                  onClick={handleResetWall}
                  className="p-1.5 bg-stone-800 hover:bg-stone-700 active:scale-95 rounded-lg transition-all cursor-pointer"
                  title="Reset builder"
                >
                  <RotateCcw className="w-4 h-4 text-stone-350" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Physics Lab Overlay */}
          {activeTab === 'physics' && (
            <motion.div
              key="physics-hud"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-stone-950/90 backdrop-blur-md p-3.5 rounded-xl border border-stone-800/80 shadow-lg flex flex-col gap-2.5"
            >
              {/* Lab parameters */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 bg-stone-900/60 p-1 rounded-xl border border-stone-800/50">
                <button
                  onClick={() => { setTestMode('thermal'); setIsTestRunning(false); setTestResult(''); }}
                  className={`flex-1 px-2.5 py-1 rounded-lg font-medium text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    testMode === 'thermal'
                      ? 'bg-orange-950/60 text-orange-200 border border-orange-850'
                      : 'text-stone-400 hover:text-stone-200 border border-transparent'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-orange-550" />
                  Heat Barrier
                </button>
                <button
                  onClick={() => { setTestMode('buoyancy'); setIsTestRunning(false); setTestResult(''); }}
                  className={`flex-1 px-2.5 py-1 rounded-lg font-medium text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    testMode === 'buoyancy'
                      ? 'bg-sky-950/60 text-sky-200 border border-sky-850'
                      : 'text-stone-400 hover:text-stone-200 border border-transparent'
                  }`}
                >
                  <Droplet className="w-3.5 h-3.5 text-sky-400" />
                  Float Test (Density)
                </button>
                <button
                  onClick={() => { setTestMode('load'); setIsTestRunning(false); setTestResult(''); }}
                  className={`flex-1 px-2.5 py-1 rounded-lg font-medium text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    testMode === 'load'
                      ? 'bg-green-950/60 text-green-200 border border-green-850'
                      : 'text-stone-400 hover:text-stone-200 border border-transparent'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5 text-emerald-400" />
                  Load Resistance
                </button>
              </div>

              {/* Sub Action Controller */}
              <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2.5 pt-1 border-t border-stone-850">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[9px] font-semibold text-stone-500 font-mono block uppercase">
                    Physical Parameters side-by-side
                  </span>
                  <span className="text-xs font-bold text-stone-200 flex items-center gap-1">
                    <span className="text-red-450">Red Clay Brick (Left)</span>
                    <span className="text-stone-600">vs</span>
                    <span className="text-green-400">Swift Eco Blox (Right)</span>
                  </span>
                </div>

                <button
                  onClick={handleRunPhysicsTest}
                  disabled={isTestRunning}
                  className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all active:scale-95 border border-green-500/20 shadow-md shadow-green-900/10 cursor-pointer"
                >
                  {isTestRunning ? (
                    <>
                      <span className="w-3 h-3 border-2 border-stone-300 border-t-green-900 rounded-full animate-spin" />
                      Running Simulation...
                    </>
                  ) : (
                    <>
                      Run Lab Test
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Simulated Results */}
              {testResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-stone-900/60 p-2 rounded-lg border border-stone-800 text-[10px] text-stone-350 leading-relaxed flex items-start gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-blue-450 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white font-semibold">Scientific Result:</strong> Swift Eco Blox validates
                    {testResult}
                  </span>
                </motion.div>
              )}

            </motion.div>
          )}

        </AnimatePresence>

      </div>

    </div>
  );
}
