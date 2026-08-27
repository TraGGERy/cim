'use client';

import React, { useCallback, useState } from 'react';
import * as THREE from 'three';
import SceneContainer from './SceneContainer';

export type StrategicMatrixMode = 'bcg' | 'ansoff' | 'mendelow';

interface NodeData {
  id: string;
  name: string;
  quadrant: string;
  x: number;
  y: number;
  z: number;
  size: number;
  color: number;
  metric1: string;
  metric2: string;
  strategicAction: string;
}

export default function Matrix3DCanvas() {
  const [matrixMode, setMatrixMode] = useState<StrategicMatrixMode>('bcg');
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  const getNodesForMatrix = (mode: StrategicMatrixMode): NodeData[] => {
    switch (mode) {
      case 'bcg':
        return [
          {
            id: 'star-1',
            name: 'Cloud AI Telemetry',
            quadrant: 'Stars (High Growth, High Share)',
            x: 2.5,
            y: 2.5,
            z: 0.5,
            size: 0.7,
            color: 0x38bdf8,
            metric1: 'Market Growth: 28% YoY',
            metric2: 'Relative Share: 1.8x',
            strategicAction: 'Invest heavily to maintain market leadership and capture compound scale benefits.'
          },
          {
            id: 'cow-1',
            name: 'Core Clinical Hardware',
            quadrant: 'Cash Cows (Low Growth, High Share)',
            x: 2.5,
            y: -2.5,
            z: -0.2,
            size: 0.9,
            color: 0x10b981,
            metric1: 'Market Growth: 3% YoY',
            metric2: 'Relative Share: 2.4x',
            strategicAction: 'Milk cash flows to fund high-growth innovation in Star and Question Mark ventures.'
          },
          {
            id: 'qm-1',
            name: 'Predictive Remote RPM',
            quadrant: 'Question Marks (High Growth, Low Share)',
            x: -2.5,
            y: 2.5,
            z: 0.8,
            size: 0.55,
            color: 0xf59e0b,
            metric1: 'Market Growth: 35% YoY',
            metric2: 'Relative Share: 0.4x',
            strategicAction: 'Assess SFA feasibility to either invest heavily for Star status or divest.'
          },
          {
            id: 'dog-1',
            name: 'Legacy Analog Sensors',
            quadrant: 'Dogs (Low Growth, Low Share)',
            x: -2.5,
            y: -2.5,
            z: -0.5,
            size: 0.45,
            color: 0xf43f5e,
            metric1: 'Market Growth: -4% YoY',
            metric2: 'Relative Share: 0.3x',
            strategicAction: 'Harvest or divest to liberate trapped capital and human resources.'
          }
        ];
      case 'ansoff':
        return [
          {
            id: 'mp-1',
            name: 'Core Market Penetration',
            quadrant: 'Existing Product, Existing Market',
            x: -2.5,
            y: -2.5,
            z: 0,
            size: 0.8,
            color: 0x10b981,
            metric1: 'Risk Profile: Lowest',
            metric2: 'Focus: Share of Wallet & Retention',
            strategicAction: 'Drive volume discounts, loyalty rewards, and customer advocacy.'
          },
          {
            id: 'pd-1',
            name: 'AI Diagnostic SaaS (RPM)',
            quadrant: 'New Product, Existing Market (Product Dev)',
            x: 2.5,
            y: -2.5,
            z: 0.5,
            size: 0.75,
            color: 0x38bdf8,
            metric1: 'Risk Profile: Moderate',
            metric2: 'Focus: R&D & Clinical Adoption',
            strategicAction: 'Leverage established trust with hospital buyers to cross-sell software subscriptions.'
          },
          {
            id: 'md-1',
            name: 'European Export Expansion',
            quadrant: 'Existing Product, New Market (Market Dev)',
            x: -2.5,
            y: 2.5,
            z: 0.4,
            size: 0.65,
            color: 0xf59e0b,
            metric1: 'Risk Profile: Moderate',
            metric2: 'Focus: Channel Partnerships',
            strategicAction: 'Select local clinical distribution partners and adapt regulatory filings.'
          },
          {
            id: 'div-1',
            name: 'Consumer Smart Wearables',
            quadrant: 'New Product, New Market (Diversification)',
            x: 2.5,
            y: 2.5,
            z: 1.0,
            size: 0.5,
            color: 0xf43f5e,
            metric1: 'Risk Profile: Highest',
            metric2: 'Focus: Direct-to-Consumer Branding',
            strategicAction: 'Requires distinct corporate spin-off or strategic joint venture.'
          }
        ];
      case 'mendelow':
        return [
          {
            id: 'key-1',
            name: 'NHS Procurement & Clinical Directors',
            quadrant: 'High Power, High Interest (Key Players)',
            x: 2.5,
            y: 2.5,
            z: 0.6,
            size: 0.85,
            color: 0xf43f5e,
            metric1: 'Influence: Decisive Buyer',
            metric2: 'Engagement: Manage Closely',
            strategicAction: 'Involve in regular co-design workshops, steering committees, and executive reviews.'
          },
          {
            id: 'sat-1',
            name: 'Hospital CFO & Finance Committee',
            quadrant: 'High Power, Low Interest (Keep Satisfied)',
            x: 2.5,
            y: -2.5,
            z: 0.2,
            size: 0.75,
            color: 0xf59e0b,
            metric1: 'Influence: Budgetary Veto',
            metric2: 'Engagement: Keep Satisfied',
            strategicAction: 'Provide transparent ROMI proofs, business cases, and compliance audits.'
          },
          {
            id: 'inf-1',
            name: 'Cardiology Nursing Staff',
            quadrant: 'Low Power, High Interest (Keep Informed)',
            x: -2.5,
            y: 2.5,
            z: 0.4,
            size: 0.65,
            color: 0x38bdf8,
            metric1: 'Influence: End-User Champions',
            metric2: 'Engagement: Keep Informed',
            strategicAction: 'Offer frictionless user training, responsive helpdesk support, and product feedback channels.'
          },
          {
            id: 'min-1',
            name: 'General Public Patients',
            quadrant: 'Low Power, Low Interest (Minimal Effort)',
            x: -2.5,
            y: -2.5,
            z: -0.3,
            size: 0.5,
            color: 0x64748b,
            metric1: 'Influence: Indirect Beneficiaries',
            metric2: 'Engagement: Monitor',
            strategicAction: 'Provide clear user instructions and accessible patient leaflets.'
          }
        ];
    }
  };

  const nodes = getNodesForMatrix(matrixMode);

  const initScene = useCallback((canvas: HTMLCanvasElement, container: HTMLDivElement) => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);
    scene.fog = new THREE.FogExp2(0x0a0f1d, 0.03);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 11);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0x60a5fa, 1.5);
    dirLight.position.set(6, 12, 8);
    scene.add(dirLight);

    // Matrix 3D Planes (4 Quadrant Grids)
    const axesHelper = new THREE.AxesHelper(4.5);
    scene.add(axesHelper);

    // 2D Matrix Divider Lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0x334155, linewidth: 2 });
    const xLineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-5, 0, 0), new THREE.Vector3(5, 0, 0)]);
    const yLineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -4, 0), new THREE.Vector3(0, 4, 0)]);
    scene.add(new THREE.Line(xLineGeo, lineMat));
    scene.add(new THREE.Line(yLineGeo, lineMat));

    // Group for nodes
    const nodeGroup = new THREE.Group();
    const meshMap: { mesh: THREE.Mesh; data: NodeData }[] = [];

    nodes.forEach((data) => {
      const geo = new THREE.SphereGeometry(data.size, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.25,
        metalness: 0.7,
        emissive: data.color,
        emissiveIntensity: 0.3
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(data.x, data.y, data.z);
      nodeGroup.add(mesh);
      meshMap.push({ mesh, data });

      // Pulsing wireframe orbit ring
      const ringGeo = new THREE.RingGeometry(data.size * 1.3, data.size * 1.35, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: data.color, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(data.x, data.y, data.z);
      nodeGroup.add(ring);
    });

    scene.add(nodeGroup);

    // Interaction State
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

      scene.rotation.y += dx * 0.005;
      scene.rotation.x = Math.max(-0.6, Math.min(0.6, scene.rotation.x + dy * 0.005));

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      camera.position.z = Math.max(5, Math.min(16, camera.position.z + e.deltaY * 0.01));
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
        scene.rotation.y += 0.0015;
      }

      meshMap.forEach(({ mesh }, i) => {
        mesh.position.z = nodes[i].z + Math.sin(elapsed * 2 + i) * 0.15;
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
  }, [nodes]);

  return (
    <div className="space-y-4">
      <SceneContainer
        title="3D Strategic Space & Portfolio Matrix"
        subtitle={`CIM Strategy & Planning LO 2.2 / LO 3.1 • 3D ${matrixMode.toUpperCase()} Visualization`}
        onInit={initScene}
      />

      {/* Selector & Inspector */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="text-sm font-semibold text-white">Strategic Framework Model</h4>
            <p className="text-xs text-slate-400">Examine portfolio distribution and strategic postures in 3D</p>
          </div>
          <div className="flex gap-2">
            {(['bcg', 'ansoff', 'mendelow'] as StrategicMatrixMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setMatrixMode(mode);
                  setSelectedNode(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  matrixMode === mode
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-500'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {mode === 'bcg' ? 'BCG Matrix' : mode === 'ansoff' ? 'Ansoff Matrix' : 'Mendelow Stakeholders'}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Quadrants Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {nodes.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                selectedNode?.id === node.id
                  ? 'bg-slate-800 border-blue-500 ring-2 ring-blue-500/30'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: `#${node.color.toString(16).padStart(6, '0')}` }}
                />
                <h5 className="text-xs font-bold text-white truncate">{node.name}</h5>
              </div>
              <div className="text-[11px] text-blue-400 font-medium mb-2">{node.quadrant}</div>
              <div className="space-y-1 text-[11px] text-slate-300">
                <div>{node.metric1}</div>
                <div>{node.metric2}</div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-slate-400 line-clamp-2">
                <strong className="text-slate-300">Action:</strong> {node.strategicAction}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
