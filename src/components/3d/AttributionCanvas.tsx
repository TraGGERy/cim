'use client';

import React, { useCallback, useState } from 'react';
import * as THREE from 'three';
import SceneContainer from './SceneContainer';

export type AttributionModelType = 'first-touch' | 'last-touch' | 'linear' | 'time-decay' | 'data-driven';

export default function AttributionCanvas() {
  const [modelType, setModelType] = useState<AttributionModelType>('time-decay');

  const initScene = useCallback((canvas: HTMLCanvasElement, container: HTMLDivElement) => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e1a);
    scene.fog = new THREE.FogExp2(0x0a0e1a, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4, 12);

    // Renderer
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xa855f7, 2, 20);
    pointLight.position.set(-4, 3, 2);
    scene.add(pointLight);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(20, 20, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Touchpoint Nodes in 3D Space
    const touchpoints = [
      { name: 'Paid Social (Discovery)', color: 0xf43f5e, pos: new THREE.Vector3(-6, 1.5, -2) },
      { name: 'Organic Search (Research)', color: 0x38bdf8, pos: new THREE.Vector3(-3, 0.5, 0) },
      { name: 'Webinar / Content (Nurture)', color: 0xa855f7, pos: new THREE.Vector3(0, 1.8, -1) },
      { name: 'Email Sequence (Intent)', color: 0xf59e0b, pos: new THREE.Vector3(3, 0.2, 1) },
      { name: 'Direct Conversion (Won)', color: 0x10b981, pos: new THREE.Vector3(6, 2.0, 0) }
    ];

    const nodeGroup = new THREE.Group();
    const nodeMeshes: THREE.Mesh[] = [];

    touchpoints.forEach((tp) => {
      // Sphere Node
      const geometry = new THREE.SphereGeometry(0.55, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: tp.color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: tp.color,
        emissiveIntensity: 0.35
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(tp.pos);
      nodeGroup.add(mesh);
      nodeMeshes.push(mesh);

      // Glow Ring
      const ringGeo = new THREE.TorusGeometry(0.85, 0.03, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: tp.color, wireframe: true, transparent: true, opacity: 0.6 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(tp.pos);
      ring.rotation.x = Math.PI / 2;
      nodeGroup.add(ring);
    });

    scene.add(nodeGroup);

    // Curve Flow connecting touchpoints
    const curve = new THREE.CatmullRomCurve3(touchpoints.map(tp => tp.pos));
    const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.08, 8, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.5 });
    const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tubeMesh);

    // Moving Flow Particles
    const particleCount = 150;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleProgress = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particleProgress[i] = Math.random();
      const pt = curve.getPoint(particleProgress[i]);
      particlePositions[i * 3] = pt.x;
      particlePositions[i * 3 + 1] = pt.y;
      particlePositions[i * 3 + 2] = pt.z;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.15,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Interaction Controls (Orbit-like mouse rotation)
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    const rotationSpeed = 0.005;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      scene.rotation.y += deltaX * rotationSpeed;
      scene.rotation.x = Math.max(-0.5, Math.min(0.5, scene.rotation.x + deltaY * rotationSpeed));

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      camera.position.z = Math.max(6, Math.min(18, camera.position.z + e.deltaY * 0.01));
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW === 0 || newH === 0) return;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle idle scene rotation
      if (!isDragging) {
        scene.rotation.y += 0.002;
      }

      // Animate Nodes floating gently
      nodeMeshes.forEach((mesh, idx) => {
        mesh.position.y = touchpoints[idx].pos.y + Math.sin(elapsedTime * 2 + idx) * 0.12;
      });

      // Animate Particles along curve
      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        particleProgress[i] = (particleProgress[i] + 0.003) % 1.0;
        const pt = curve.getPoint(particleProgress[i]);
        positions[i * 3] = pt.x;
        positions[i * 3 + 1] = pt.y;
        positions[i * 3 + 2] = pt.z;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Attribution Model Weights for CIM analysis
  const getAttributionWeights = (model: AttributionModelType) => {
    switch (model) {
      case 'first-touch':
        return [100, 0, 0, 0, 0];
      case 'last-touch':
        return [0, 0, 0, 0, 100];
      case 'linear':
        return [20, 20, 20, 20, 20];
      case 'time-decay':
        return [5, 10, 20, 30, 35];
      case 'data-driven':
        return [15, 25, 30, 10, 20];
    }
  };

  const weights = getAttributionWeights(modelType);
  const touchpointNames = [
    'Paid Social (Discovery)',
    'Organic Search (Research)',
    'Webinar / Content (Nurture)',
    'Email Sequence (Intent)',
    'Direct Conversion (Won)'
  ];

  return (
    <div className="space-y-4">
      <SceneContainer
        title="3D Multi-Touch Marketing Attribution & Funnel Model"
        subtitle="CIM LO 1.3 & LO 3.3 • Interactive WebGL Flow Simulation"
        onInit={initScene}
      />

      {/* Model Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="text-sm font-semibold text-white">Attribution Model Selection</h4>
            <p className="text-xs text-slate-400">Evaluate how revenue credit shifts across the 5 customer journey touchpoints</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(['time-decay', 'linear', 'data-driven', 'first-touch', 'last-touch'] as AttributionModelType[]).map((m) => (
              <button
                key={m}
                onClick={() => setModelType(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  modelType === m
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-500'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {m.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Weights Breakdown Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {touchpointNames.map((name, i) => (
            <div key={name} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-[11px] text-slate-400 truncate mb-1">{name}</div>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold text-white">{weights[i]}%</span>
                <span className="text-[10px] text-emerald-400 font-medium">£{(weights[i] * 10).toLocaleString()} Credit</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${weights[i]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
