import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 4. Create floating elements
    const elementsGroup = new THREE.Group();
    scene.add(elementsGroup);

    // Create a 3D structural building grid in the deep center
    const gridHelper = new THREE.GridHelper(50, 25, 0x16a34a, 0x1c1917);
    gridHelper.position.y = -10;
    gridHelper.rotation.x = Math.PI * 0.08;
    scene.add(gridHelper);

    // Create several floating architectural wireframe blocks (simulating Eco Blox bricks)
    const blocks: {
      group: THREE.Group;
      geometry: THREE.BoxGeometry;
      edgesGeometry: THREE.EdgesGeometry;
      lineMaterial: THREE.LineBasicMaterial;
      meshMaterial: THREE.MeshBasicMaterial;
      spinX: number;
      spinY: number;
      floatSpeed: number;
      floatOffset: number;
      initialY: number;
      initialX: number;
    }[] = [];

    const numBlocks = 10;
    for (let i = 0; i < numBlocks; i++) {
      // Geometry of standard rectangular concrete block (micro-scaled)
      const geometry = new THREE.BoxGeometry(
        3.5 + Math.random() * 3.5, // length (600mm scaled)
        1.5 + Math.random() * 1.5, // height (200mm scaled)
        1.5 + Math.random() * 1.5  // width (150mm scaled)
      );

      const edgesGeometry = new THREE.EdgesGeometry(geometry);
      
      // Stand-out futuristic green and cool grey outline colors
      const color = i % 2 === 0 ? 0x22c55e : 0x10b981;
      const lineMaterial = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: i % 2 === 0 ? 0.22 : 0.15,
      });

      const wireframe = new THREE.LineSegments(edgesGeometry, lineMaterial);

      // Add a translucent volumetric concrete block face structure
      const meshMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: i % 2 === 0 ? 0.035 : 0.018,
        side: THREE.DoubleSide
      });
      const solidMesh = new THREE.Mesh(geometry, meshMaterial);

      // Assemble physical group
      const blockGroup = new THREE.Group();
      blockGroup.add(wireframe);
      blockGroup.add(solidMesh);

      // Place in spacious camera margins
      const initialX = (Math.random() - 0.5) * 50;
      const initialY = (Math.random() - 0.5) * 30;
      const initialZ = (Math.random() - 0.5) * 20 - 8;

      blockGroup.position.set(initialX, initialY, initialZ);
      elementsGroup.add(blockGroup);

      blocks.push({
        group: blockGroup,
        geometry: geometry,
        edgesGeometry: edgesGeometry,
        lineMaterial: lineMaterial,
        meshMaterial: meshMaterial,
        spinX: (Math.random() - 0.5) * 0.005,
        spinY: (Math.random() - 0.5) * 0.005,
        floatSpeed: 0.2 + Math.random() * 0.3,
        floatOffset: Math.random() * Math.PI * 2,
        initialY: initialY,
        initialX: initialX
      });
    }

    // 5. Create active micro-pore particle cloud (representing the lightweight air bubbles within aerated concrete)
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60; // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30; // Z

      // Set beautiful green particles mixed with soft grey-silvers
      const isGreen = Math.random() > 0.4;
      colors[i * 3] = isGreen ? 0.08 : 0.25;     // R
      colors[i * 3 + 1] = isGreen ? 0.64 : 0.25; // G
      colors[i * 3 + 2] = isGreen ? 0.29 : 0.25; // B
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom textured circular particles
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
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

    // 7. Render Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
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

      // Animate blocks individual floating & rotation
      blocks.forEach((block) => {
        block.group.rotation.x += block.spinX;
        block.group.rotation.y += block.spinY;

        // Soft harmonic floating heights
        const floatY = Math.sin(elapsedTime * block.floatSpeed + block.floatOffset) * 0.85;
        block.group.position.y = block.initialY + floatY;
        
        // Gentle horizontal oscillation
        const floatX = Math.cos(elapsedTime * (block.floatSpeed * 0.5) + block.floatOffset) * 0.5;
        block.group.position.x = block.initialX + floatX;
      });

      // Slowly rotate the architectural alignment grid
      gridHelper.rotation.y = elapsedTime * 0.015;

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
      animationFrameId = requestAnimationFrame(animate);
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
      
      blocks.forEach((block) => {
        block.geometry.dispose();
        block.edgesGeometry.dispose();
        block.lineMaterial.dispose();
        block.meshMaterial.dispose();
      });

      gridHelper.geometry.dispose();
      if (Array.isArray(gridHelper.material)) {
        gridHelper.material.forEach((mat) => mat.dispose());
      } else {
        gridHelper.material.dispose();
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      id="3d-element-background"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-85" 
    />
  );
}
