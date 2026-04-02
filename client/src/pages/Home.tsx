import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Landing Page with 3D Wave Interaction
 * Design: Deep blue theme with animated title and mouse-controlled 3D waves
 */
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [titleVisible, setTitleVisible] = useState(false);

  // Initialize 3D Wave Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wave parameters
    const waves = [
      { amplitude: 30, frequency: 0.01, speed: 0.02, phase: 0, color: 'rgba(59, 130, 246, 0.3)' },
      { amplitude: 20, frequency: 0.015, speed: 0.015, phase: Math.PI / 4, color: 'rgba(99, 102, 241, 0.2)' },
      { amplitude: 15, frequency: 0.02, speed: 0.01, phase: Math.PI / 2, color: 'rgba(139, 92, 246, 0.15)' },
    ];

    let animationId: number;
    let time = 0;

    const animate = () => {
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#1e293b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;

        const baseY = canvas.height * 0.5 + (index - 1) * 40;
        const mouseInfluence = (mousePos.x / canvas.width - 0.5) * 50;

        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            baseY +
            Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
            Math.sin(x * 0.005 + time * 0.01) * mouseInfluence;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      });

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  // Trigger title animation on mount
  useEffect(() => {
    setTitleVisible(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-950">
      {/* Canvas for 3D Wave Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Landing Bar Animation */}
        <div className="text-center space-y-6 max-w-4xl">
          {/* English Title with Animation */}
          <div className="h-20 flex items-center justify-center">
            {titleVisible && (
              <h1 className="text-5xl md:text-7xl font-bold text-white animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Landing Pro
                </span>
              </h1>
            )}
          </div>

          {/* Chinese Title */}
          <div className="h-16 flex items-center justify-center">
            {titleVisible && (
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-200 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                3D 波浪互動體驗
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
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
              onClick={() => alert('Welcome to Landing Pro! 🌊')}
            >
              Get Started
            </Button>
          </div>

          {/* Additional Info */}
          <div className="pt-12 text-gray-400 text-sm">
            {titleVisible && (
              <p className="animate-in fade-in duration-1000 delay-1000">
                ✨ Interactive 3D Wave Effect • Smooth Mouse Tracking • Modern Design
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
    </div>
  );
}
