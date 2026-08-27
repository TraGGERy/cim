'use client';

import React, { useCallback, useState } from 'react';
import * as THREE from 'three';
import SceneContainer from './SceneContainer';

interface ResourceState {
  men: number; // 0-100
  money: number; // 0-100
  materials: number; // 0-100
  minutes: number; // 0-100
  measurements: number; // 0-100
}

export default function Resource5MCanvas() {
  const [resources, setResources] = useState<ResourceState>({
    men: 75,
    money: 60,
    materials: 80,
    minutes: 50,
    measurements: 90
  });

  const initScene = useCallback((canvas: HTMLCanvasElement, container: HTMLDivElement) => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1120);
    scene.fog = new THREE.FogExp2(0x0b1120, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4, 10);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const spotLight = new THREE.SpotLight(0x38bdf8, 2);
    spotLight.position.set(0, 10, 5);
    scene.add(spotLight);

    // Central Pillar / Fulcrum
    const fulcrumGeo = new THREE.CylinderGeometry(0.3, 0.8, 2, 32);
    const fulcrumMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.2 });
    const fulcrum = new THREE.Mesh(fulcrumGeo, fulcrumMat);
    fulcrum.position.y = -1;
    scene.add(fulcrum);

    // 5M Pedestals (5 Cylinders in circle)
    const elements = [
      { name: 'Men (Skills/Headcount)', color: 0x38bdf8, angle: 0 },
      { name: 'Money (Budget/Capital)', color: 0x10b981, angle: (Math.PI * 2) / 5 },
      { name: 'Materials (MarTech/Creative)', color: 0xa855f7, angle: ((Math.PI * 2) / 5) * 2 },
      { name: 'Minutes (Time/Schedule)', color: 0xf59e0b, angle: ((Math.PI * 2) / 5) * 3 },
      { name: 'Measurements (KPIs/Data)', color: 0xf43f5e, angle: ((Math.PI * 2) / 5) * 4 }
    ];

    const radius = 3.5;
    const columnGroup = new THREE.Group();
    const columns: THREE.Mesh[] = [];

    elements.forEach((elem) => {
      const x = Math.cos(elem.angle) * radius;
      const z = Math.sin(elem.angle) * radius;

      const colGeo = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
      const colMat = new THREE.MeshStandardMaterial({
        color: elem.color,
        metalness: 0.6,
        roughness: 0.3,
        emissive: elem.color,
        emissiveIntensity: 0.25
      });
      const colMesh = new THREE.Mesh(colGeo, colMat);
      colMesh.position.set(x, 0.5, z);
      columnGroup.add(colMesh);
      columns.push(colMesh);

      // Top floating energy orb
      const orbGeo = new THREE.SphereGeometry(0.35, 32, 32);
      const orbMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: elem.color, emissiveIntensity: 0.8 });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set(x, 2.3, z);
      columnGroup.add(orb);
    });

    scene.add(columnGroup);

    // Orbit Ring
    const orbitGeo = new THREE.TorusGeometry(radius, 0.04, 16, 100);
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0x334155, wireframe: true });
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
    orbitMesh.rotation.x = Math.PI / 2;
    orbitMesh.position.y = -0.5;
    scene.add(orbitMesh);

    // Mouse Interaction
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMousePos.x;
      const dy = e.clientY - prevMousePos.y;

      columnGroup.rotation.y += dx * 0.005;
      scene.rotation.x = Math.max(-0.5, Math.min(0.5, scene.rotation.x + dy * 0.005));

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      camera.position.z = Math.max(6, Math.min(16, camera.position.z + e.deltaY * 0.01));
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);

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

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        columnGroup.rotation.y += 0.003;
      }

      columns.forEach((col, i) => {
        col.position.y = 0.5 + Math.sin(elapsed * 2 + i) * 0.1;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  const totalBalance = Math.round(
    (resources.men + resources.money + resources.materials + resources.minutes + resources.measurements) / 5
  );

  const calculateCommercialReadiness = () => {
    if (resources.minutes < 40) return { status: 'Critical Bottleneck (Time Deficit)', color: 'text-amber-400' };
    if (resources.money < 40) return { status: 'Underfunded Risk (Capital Deficit)', color: 'text-red-400' };
    if (resources.measurements < 50) return { status: 'Blind Governance (Lack of Control Metrics)', color: 'text-amber-400' };
    if (totalBalance >= 75) return { status: 'Optimal Commercial Execution Readiness', color: 'text-emerald-400' };
    return { status: 'Moderate Operational Alignment', color: 'text-blue-400' };
  };

  const readiness = calculateCommercialReadiness();

  return (
    <div className="space-y-4">
      <SceneContainer
        title="3D 5Ms Resource Allocation Balance Simulator"
        subtitle="CIM LO 2.1 & LO 5.1 • Men, Money, Materials, Minutes, Measurements"
        onInit={initScene}
      />

      {/* Sliders & Impact Dashboard */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-slate-800">
          <div>
            <h4 className="text-sm font-semibold text-white">5Ms Operational Capacity Sliders</h4>
            <p className="text-xs text-slate-400">Balance resource constraints to evaluate operational feasibility</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Readiness Status: </span>
            <span className={`text-xs font-bold ${readiness.color}`}>{readiness.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { key: 'men' as keyof ResourceState, label: 'Men (Human / Skills)', color: 'accent-sky-500' },
            { key: 'money' as keyof ResourceState, label: 'Money (Budget / Capital)', color: 'accent-emerald-500' },
            { key: 'materials' as keyof ResourceState, label: 'Materials (MarTech/Assets)', color: 'accent-purple-500' },
            { key: 'minutes' as keyof ResourceState, label: 'Minutes (Time Runway)', color: 'accent-amber-500' },
            { key: 'measurements' as keyof ResourceState, label: 'Measurements (KPI/Control)', color: 'accent-rose-500' }
          ].map((item) => (
            <div key={item.key} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-300 font-medium truncate">{item.label}</span>
                <span className="text-white font-mono font-bold">{resources[item.key]}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={resources[item.key]}
                onChange={(e) => setResources({ ...resources, [item.key]: parseInt(e.target.value) })}
                className={`w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer ${item.color}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
