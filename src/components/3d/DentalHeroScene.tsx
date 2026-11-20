'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PosterFallback } from './PosterFallback';

export function DentalHeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [activeCallout, setActiveCallout] = useState<'crown' | 'implant' | 'jawbone' | null>(null);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setHasWebGL(supported);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  useEffect(() => {
    if (!hasWebGL || !containerRef.current) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Anatomical Models Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Materials
    // Crown: Glazed ceramic porcelain
    const crownMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfcfaf6,
      roughness: 0.22,
      metalness: 0.04,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      transmission: 0.08,
      thickness: 0.5,
    });

    // Implant: Brushed surgical titanium
    const implantMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a9a9a,
      roughness: 0.38,
      metalness: 0.85,
    });

    // Abutment: Polished titanium
    const abutmentMaterial = new THREE.MeshStandardMaterial({
      color: 0xc4d4d4,
      roughness: 0.2,
      metalness: 0.9,
    });

    // Jawbone: Trabecular bone layer
    const boneMaterial = new THREE.MeshStandardMaterial({
      color: 0xeadccb,
      roughness: 0.75,
      metalness: 0.05,
      transparent: true,
      opacity: 0.65,
    });

    // Gum tissue
    const gumMaterial = new THREE.MeshStandardMaterial({
      color: 0xdda5a5,
      roughness: 0.5,
      metalness: 0.0,
      transparent: true,
      opacity: 0.55,
    });

    // 2.1 Crown Mesh (Sculpted multi-cusp molar)
    const crownGeometry = new THREE.CylinderGeometry(0.72, 0.58, 1.0, 32, 16);
    // Displace vertices to form 4 natural occlusal cusps
    const pos = crownGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const z = pos.getZ(i);
      if (y > 0.2) {
        // Cusp modulation
        const cusp = Math.sin(x * 4) * Math.sin(z * 4) * 0.18;
        pos.setY(i, y + cusp);
      }
    }
    crownGeometry.computeVertexNormals();
    const crownMesh = new THREE.Mesh(crownGeometry, crownMaterial);
    crownMesh.position.y = 1.0;
    modelGroup.add(crownMesh);

    // 2.2 Abutment Collar
    const abutmentGeom = new THREE.CylinderGeometry(0.52, 0.42, 0.35, 32);
    const abutmentMesh = new THREE.Mesh(abutmentGeom, abutmentMaterial);
    abutmentMesh.position.y = 0.38;
    modelGroup.add(abutmentMesh);

    // 2.3 Titanium Implant Body (LatheGeometry with helical thread ridges)
    const implantPoints: THREE.Vector2[] = [];
    const threadCount = 14;
    for (let i = 0; i <= 36; i++) {
      const t = i / 36;
      const y = 0.2 - t * 2.1;
      let r = 0.42 * (1 - t * 0.35); // Tapered apex
      if (t > 0.1 && t < 0.9) {
        // Thread ridges
        r += Math.sin(t * threadCount * Math.PI) * 0.035;
      }
      implantPoints.push(new THREE.Vector2(r, y));
    }
    const implantGeom = new THREE.LatheGeometry(implantPoints, 36);
    const implantMesh = new THREE.Mesh(implantGeom, implantMaterial);
    modelGroup.add(implantMesh);

    // 2.4 Jawbone Cross-Section
    const boneGeom = new THREE.CylinderGeometry(1.2, 1.4, 2.3, 32, 1, true);
    const boneMesh = new THREE.Mesh(boneGeom, boneMaterial);
    boneMesh.position.y = -1.1;
    modelGroup.add(boneMesh);

    // 2.5 Gum Tissue Ridge
    const gumGeom = new THREE.TorusGeometry(0.78, 0.18, 16, 40);
    gumGeom.rotateX(Math.PI / 2);
    const gumMesh = new THREE.Mesh(gumGeom, gumMaterial);
    gumMesh.position.y = 0.3;
    modelGroup.add(gumMesh);

    // 3. Three-Point Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa9c0b3, 1.4);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xb8935a, 1.8);
    rimLight.position.set(0, -3, -4);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xf6f1e8, 0.9);
    scene.add(ambientLight);

    // 4. Interactive Pointer & Touch Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0.35;
    let targetRotationX = 0.05;
    let isVisible = true;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(-0.4, Math.min(0.4, targetRotationX));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 5. Off-Screen Pause via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 6. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop with Idle Drift & Smooth Damping
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Gentle idle float
      if (!isDragging) {
        targetRotationY += 0.002;
      }

      modelGroup.rotation.y += (targetRotationY - modelGroup.rotation.y) * 0.06;
      modelGroup.rotation.x += (targetRotationX - modelGroup.rotation.x) * 0.06;
      modelGroup.position.y = Math.sin(elapsed * 1.4) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Disposal on Unmount (Memory leak prevention)
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      crownGeometry.dispose();
      abutmentGeom.dispose();
      implantGeom.dispose();
      boneGeom.dispose();
      gumGeom.dispose();

      crownMaterial.dispose();
      implantMaterial.dispose();
      abutmentMaterial.dispose();
      boneMaterial.dispose();
      gumMaterial.dispose();

      renderer.dispose();
    };
  }, [hasWebGL]);

  if (hasWebGL === false) {
    return <PosterFallback />;
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] lg:h-[500px] flex items-center justify-center">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
        title="Interactive 3D Molar & Titanium Implant Model. Click and drag to inspect."
      />

      {/* Interactive Plain-Fact Callout Pills (Synchronized with Model) */}
      <div className="absolute inset-0 pointer-events-none p-4">
        {/* Crown Callout */}
        <div
          className={`pointer-events-auto absolute top-12 right-6 sm:right-12 px-3.5 py-1.5 rounded-full bg-theme-card/90 backdrop-blur-md shadow-sm border border-theme-border transition-all duration-300 ${
            activeCallout === 'crown' ? 'ring-2 ring-primary scale-105' : 'hover:scale-102'
          }`}
          onMouseEnter={() => setActiveCallout('crown')}
          onMouseLeave={() => setActiveCallout(null)}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-sans text-[12px] font-semibold text-theme-ink">Crown (Porcelain)</span>
          </div>
        </div>

        {/* Titanium Implant Callout */}
        <div
          className={`pointer-events-auto absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 px-3.5 py-1.5 rounded-full bg-theme-card/90 backdrop-blur-md shadow-sm border border-theme-border transition-all duration-300 ${
            activeCallout === 'implant' ? 'ring-2 ring-primary scale-105' : 'hover:scale-102'
          }`}
          onMouseEnter={() => setActiveCallout('implant')}
          onMouseLeave={() => setActiveCallout(null)}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-theme-brass" />
            <span className="font-sans text-[12px] font-semibold text-theme-ink">Implant (Titanium)</span>
          </div>
        </div>

        {/* Jawbone Callout */}
        <div
          className={`pointer-events-auto absolute bottom-8 right-8 sm:right-16 px-3.5 py-1.5 rounded-full bg-theme-card/90 backdrop-blur-md shadow-sm border border-theme-border transition-all duration-300 ${
            activeCallout === 'jawbone' ? 'ring-2 ring-primary scale-105' : 'hover:scale-102'
          }`}
          onMouseEnter={() => setActiveCallout('jawbone')}
          onMouseLeave={() => setActiveCallout(null)}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-theme-secondary" />
            <span className="font-sans text-[12px] font-semibold text-theme-ink">Jawbone Structure</span>
          </div>
        </div>
      </div>
    </div>
  );
}

