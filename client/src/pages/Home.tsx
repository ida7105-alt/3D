import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

/**
 * Landing Page with 3D Particle Wave Interaction
 * Design: Deep blue theme with animated title and mouse-controlled 3D particle waves
 * Technology: Three.js for 3D rendering with particle system
 */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    setTitleVisible(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0f172a);

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.z = 1500;
    cameraRef.current = camera;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Particle Wave Setup
    const SEPARATION = 150;  // 增加 50%
    const AMOUNTX = 50;
    const AMOUNTY = 50;

    // Create geometry
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];

    for (let x = 0; x < AMOUNTX; x++) {
      for (let y = 0; y < AMOUNTY; y++) {
        const px = x * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const py = 0;
        const pz = y * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        positions.push(px, py, pz);

        // Color: cyan/blue gradient
        const color = new THREE.Color();
        color.setHSL(0.5 + Math.random() * 0.1, 0.8, 0.5);
        colors.push(color.r, color.g, color.b);
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

    // Create material
    // Create canvas texture for circular particles
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 12,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      map: texture,  // 使用圓形紋理
    });

    // Create points
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Window resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      timeRef.current += 0.01;

      // Update particle positions with wave effect
      const positionAttribute = geometry.getAttribute('position');
      const positions = positionAttribute.array as Float32Array;

      let index = 0;
      for (let x = 0; x < AMOUNTX; x++) {
        for (let y = 0; y < AMOUNTY; y++) {
          const px = x * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          const pz = y * SEPARATION - (AMOUNTY * SEPARATION) / 2;

          // Wave formula with mouse influence - increased amplitude by 50%
          const wave1 = Math.sin(0.3 * (x + timeRef.current)) * 75;  // 50 -> 75
          const wave2 = Math.sin(0.5 * (y + timeRef.current)) * 75;  // 50 -> 75
          const mouseInfluence = mouseRef.current.x * 100;

          const py = wave1 + wave2 + mouseInfluence - 400;

          positions[index * 3] = px;
          positions[index * 3 + 1] = py;
          positions[index * 3 + 2] = pz;

          index++;
        }
      }

      positionAttribute.needsUpdate = true;

      // Camera movement
      camera.position.x += (mouseRef.current.x * 500 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 300 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-slate-950">
      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        {/* Landing Bar Animation */}
        <div className="text-center space-y-6 max-w-4xl pointer-events-auto">
          {/* English Title with Animation */}
          <div className="h-20 flex items-center justify-center">
            {titleVisible && (
              <h1 className="text-5xl md:text-7xl font-bold text-white animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                  Landing Pro
                </span>
              </h1>
            )}
          </div>

          {/* Chinese Title */}
          <div className="h-16 flex items-center justify-center">
            {titleVisible && (
              <h2 className="text-4xl md:text-5xl font-bold text-cyan-200 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                3D 粒子波浪互動
              </h2>
            )}
          </div>

          {/* Subtitle */}
          <div className="h-12 flex items-center justify-center">
            {titleVisible && (
              <p className="text-lg md:text-xl text-gray-300 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                Move your mouse to control the waves
              </p>
            )}
          </div>

          {/* CTA Button */}
          <div className="pt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl pointer-events-auto"
              onClick={() => alert('Welcome to Landing Pro! 🌊')}
            >
              Get Started
            </Button>
          </div>

          {/* Additional Info */}
          <div className="pt-12 text-gray-400 text-sm">
            {titleVisible && (
              <p className="animate-in fade-in duration-1000 delay-1000">
                ✨ Three.js 3D Particles • Smooth Mouse Tracking • Modern Design
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
    </div>
  );
}
