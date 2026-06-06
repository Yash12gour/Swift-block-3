import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 320);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isLargeScreen || !containerRef.current) return;

    // 1. Create Scene
    const scene = new THREE.Scene();

    // 2. Set Up Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 25;

    // 3. Set Up Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Downscaled for performance
    containerRef.current.appendChild(renderer.domElement);

    // 4. Create floating elements
    const elementsGroup = new THREE.Group();
    scene.add(elementsGroup);

    // Create a 3D structural building grid in the deep center
    const gridHelper = new THREE.GridHelper(50, 25, 0x059212, 0xCBD5E1);
    gridHelper.position.y = -10;
    gridHelper.rotation.x = Math.PI * 0.08;
    scene.add(gridHelper);

    // Create several floating architectural elements (reduced counts from 12 to 5 for desktop)
    const bgObjects: {
      group: THREE.Group;
      spinX: number;
      spinY: number;
      floatSpeed: number;
      floatOffset: number;
      initialY: number;
      initialX: number;
    }[] = [];

    // Track all created geometries and materials for simplified, safe automatic disposal
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    const numObjects = 5; // Reduced from 12 for 60% less draw overload
    for (let i = 0; i < numObjects; i++) {
      const type = i % 3; // 0 = Standard Block, 1 = Tall Building, 2 = Manufacturing Factory
      let objGroup: THREE.Group;

      if (type === 0) {
        // --- 1. STANDARD COMPACT ECO BLOCK ---
        const geometry = new THREE.BoxGeometry(
          4.0, // length
          1.8, // height
          1.8  // width
        );
        geometriesToDispose.push(geometry);

        const edgesGeometry = new THREE.EdgesGeometry(geometry);
        geometriesToDispose.push(edgesGeometry);

        const color = i % 2 === 0 ? 0x059212 : 0xC42D2D; // Green or Crimson Red
        const lineMaterial = new THREE.LineBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.28,
        });
        materialsToDispose.push(lineMaterial);

        const wireframe = new THREE.LineSegments(edgesGeometry, lineMaterial);

        const meshMaterial = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.04,
          side: THREE.DoubleSide
        });
        materialsToDispose.push(meshMaterial);
        const solidMesh = new THREE.Mesh(geometry, meshMaterial);

        objGroup = new THREE.Group();
        objGroup.add(wireframe);
        objGroup.add(solidMesh);

      } else if (type === 1) {
        // --- 2. TALL MODULAR BUILDING FRAME ---
        objGroup = new THREE.Group();
        const color = 0x059212; // Brand Green

        // Base Tower Block
        const baseGeo = new THREE.BoxGeometry(2.0, 5.0, 2.0);
        geometriesToDispose.push(baseGeo);
        const baseEdges = new THREE.EdgesGeometry(baseGeo);
        geometriesToDispose.push(baseEdges);

        const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 });
        materialsToDispose.push(lineMat);
        const meshMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.03 });
        materialsToDispose.push(meshMat);

        const baseWire = new THREE.LineSegments(baseEdges, lineMat);
        const baseMesh = new THREE.Mesh(baseGeo, meshMat);
        objGroup.add(baseWire);
        objGroup.add(baseMesh);

        // Nested Upper Stepped Deck
        const topGeo = new THREE.BoxGeometry(1.4, 2.2, 1.4);
        geometriesToDispose.push(topGeo);
        const topEdges = new THREE.EdgesGeometry(topGeo);
        geometriesToDispose.push(topEdges);

        const topWire = new THREE.LineSegments(topEdges, lineMat);
        const topMesh = new THREE.Mesh(topGeo, meshMat);
        topWire.position.y = 3.6;
        topMesh.position.y = 3.6;
        objGroup.add(topWire);
        objGroup.add(topMesh);

        // Thin antenna/spire line
        const spireGeo = new THREE.CylinderGeometry(0.01, 0.01, 1.5, 4);
        geometriesToDispose.push(spireGeo);
        const spireEdges = new THREE.EdgesGeometry(spireGeo);
        geometriesToDispose.push(spireEdges);
        const spireWire = new THREE.LineSegments(spireEdges, lineMat);
        spireWire.position.y = 5.45;
        objGroup.add(spireWire);

      } else {
        // --- 3. MANUFACTURING INDUSTRIAL FACTORY ---
        objGroup = new THREE.Group();
        const color = 0xC42D2D; // Crimson Red

        // Factory Floor Barn block
        const bodyGeo = new THREE.BoxGeometry(4.2, 2.0, 2.2);
        geometriesToDispose.push(bodyGeo);
        const bodyEdges = new THREE.EdgesGeometry(bodyGeo);
        geometriesToDispose.push(bodyEdges);

        const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.24 });
        materialsToDispose.push(lineMat);
        const meshMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.03 });
        materialsToDispose.push(meshMat);

        const bodyWire = new THREE.LineSegments(bodyEdges, lineMat);
        const bodyMesh = new THREE.Mesh(bodyGeo, meshMat);
        objGroup.add(bodyWire);
        objGroup.add(bodyMesh);

        // Triangular sloped roof cylinder
        const roofGeo = new THREE.CylinderGeometry(0, 1.4, 4.0, 4, 1);
        geometriesToDispose.push(roofGeo);
        const roofEdges = new THREE.EdgesGeometry(roofGeo);
        geometriesToDispose.push(roofEdges);

        const roofWire = new THREE.LineSegments(roofEdges, lineMat);
        const roofMesh = new THREE.Mesh(roofGeo, meshMat);
        roofWire.rotation.y = Math.PI / 4;
        roofWire.rotation.z = Math.PI / 2;
        roofWire.position.y = 1.6;
        roofMesh.rotation.y = Math.PI / 4;
        roofMesh.rotation.z = Math.PI / 2;
        roofMesh.position.y = 1.6;
        objGroup.add(roofWire);
        objGroup.add(roofMesh);

        // Factory Chimney Smoke Stack
        const chimneyGeo = new THREE.CylinderGeometry(0.18, 0.28, 2.6, 6);
        geometriesToDispose.push(chimneyGeo);
        const chimneyEdges = new THREE.EdgesGeometry(chimneyGeo);
        geometriesToDispose.push(chimneyEdges);

        const chimneyWire = new THREE.LineSegments(chimneyEdges, lineMat);
        const chimneyMesh = new THREE.Mesh(chimneyGeo, meshMat);
        chimneyWire.position.set(-1.4, 1.8, 0);
        chimneyMesh.position.set(-1.4, 1.8, 0);

        objGroup.add(chimneyWire);
        objGroup.add(chimneyMesh);
      }

      // Random placement around deep viewport bounds
      const initialX = (Math.random() - 0.5) * 45;
      const initialY = (Math.random() - 0.5) * 25;
      const initialZ = (Math.random() - 0.5) * 15 - 8;

      objGroup.position.set(initialX, initialY, initialZ);
      elementsGroup.add(objGroup);

      bgObjects.push({
        group: objGroup,
        spinX: (Math.random() - 0.5) * 0.003,
        spinY: (Math.random() - 0.5) * 0.003,
        floatSpeed: 0.10 + Math.random() * 0.15,
        floatOffset: Math.random() * Math.PI * 2,
        initialY: initialY,
        initialX: initialX
      });
    }

    // 5. Create active micro-pore particle cloud (Reduced count for maximum performance)
    const particleCount = 45; // Reduced from 180 to 45
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60; // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30; // Z

      // Set beautiful green particles mixed with soft terracotta shades
      const isGreen = Math.random() > 0.4;
      colors[i * 3] = isGreen ? 0.05 : 0.82;     // R
      colors[i * 3 + 1] = isGreen ? 0.47 : 0.42; // G
      colors[i * 3 + 2] = isGreen ? 0.35 : 0.18; // B
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom textured circular particles
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.24,
      vertexColors: true,
      transparent: true,
      opacity: 0.35
    });

    const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlePoints);

    // 6. Interaction handling
    let currentScroll = 0;
    let targetScroll = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 7. Render Animation Loop throttled elegantly to 30 FPS
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let frameDelta = 0;
    const fpsLimit = 1 / 30; // 30 FPS Cap for background efficiency

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Scroll boundaries optimization: Pause canvas updates when page scrolled so far down that background is obscured
      if (window.scrollY > 4200) return;

      const delta = clock.getDelta();
      frameDelta += delta;
      if (frameDelta < fpsLimit) return;
      frameDelta = frameDelta % fpsLimit;

      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll damping
      currentScroll += (targetScroll - currentScroll) * 0.08;

      // Translate whole elements based on viewport scroll progress (ambient floating parallax)
      const scrollRatio = currentScroll * 0.012;
      elementsGroup.position.y = scrollRatio;
      gridHelper.position.y = -10 + scrollRatio * 0.3;
      particlePoints.position.y = scrollRatio * 0.5;

      // Interactive mouse follow offset
      camera.position.x += (mouseX * 4 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Animate background elements individual floating & rotation
      bgObjects.forEach((obj) => {
        obj.group.rotation.x += obj.spinX;
        obj.group.rotation.y += obj.spinY;

        // Soft harmonic floating heights
        const floatY = Math.sin(elapsedTime * obj.floatSpeed + obj.floatOffset) * 0.85;
        obj.group.position.y = obj.initialY + floatY;
        
        // Gentle horizontal oscillation
        const floatX = Math.cos(elapsedTime * (obj.floatSpeed * 0.5) + obj.floatOffset) * 0.5;
        obj.group.position.x = obj.initialX + floatX;
      });

      // Slowly rotate the architectural alignment grid
      gridHelper.rotation.y = elapsedTime * 0.012;

      // Animate dust particles cascading
      const posAttr = particleGeometry.getAttribute('position') as THREE.BufferAttribute;
      const positionsArray = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const indexY = i * 3 + 1;
        positionsArray[indexY] -= 0.012; // slow fall
        if (positionsArray[indexY] < -25) {
          positionsArray[indexY] = 25; // reset at ceiling
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handling with ResizeObserver
    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    // Clean up
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);

      if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose of resources safely
      particleGeometry.dispose();
      particleMaterial.dispose();
      
      geometriesToDispose.forEach((geo) => geo.dispose());
      materialsToDispose.forEach((mat) => mat.dispose());

      gridHelper.geometry.dispose();
      if (Array.isArray(gridHelper.material)) {
        gridHelper.material.forEach((mat) => mat.dispose());
      } else {
        gridHelper.material.dispose();
      }

      renderer.dispose();
    };
  }, [isLargeScreen]);

  if (!isLargeScreen) {
    // Beautiful, lightweight high-performance aesthetic backdrop for Mobile and Tablets
    return (
      <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-[#F8F9FA]">
        <div className="absolute top-[15%] -left-16 w-72 h-72 rounded-full bg-[#059212]/3 blur-3xl opacity-75" />
        <div className="absolute top-[50%] -right-24 w-80 h-80 rounded-full bg-[#C42D2D]/2 blur-3xl opacity-60" />
        <div className="absolute bottom-[10%] -left-20 w-96 h-96 rounded-full bg-[#059212]/4 blur-3xl opacity-70" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, #059212 0.75px, transparent 0.75px)`,
            backgroundSize: '28px 28px'
          }}
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      id="3d-element-background"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-80" 
    />
  );
}
