import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { LoadingBar } from '@/components/LoadingBar';
import { useThreeScene } from '@/hooks/useThreeScene';
import { useLoadingProgress } from '@/hooks/useLoadingProgress';

/**
 * Landing Page with 3D Particle Wave Interaction
 * Design: Deep blue theme with animated title and mouse-controlled 3D particle waves
 * Technology: Three.js for 3D rendering with particle system
 *
 * Optimizations:
 * - Extracted Three.js logic into useThreeScene hook
 * - Extracted loading progress logic into useLoadingProgress hook
 * - Created reusable Navbar and LoadingBar components
 * - Improved code organization and maintainability
 */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { progress, titleVisible } = useLoadingProgress();

  // Initialize Three.js scene
  useThreeScene(containerRef);

  return (
    <>
      <style>{`
        #root canvas {
          display: block !important;
          width: 100vw !important;
          height: 100vh !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
        }
      `}</style>
      <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* Navigation Bar */}
      <Navbar />

      {/* Loading Progress Bar */}
      <LoadingBar progress={progress} />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none pt-20">
        {/* Landing Bar Animation */}
        <div className="text-center space-y-6 max-w-4xl pointer-events-auto">
          {/* English Title with Animation */}
          <div className="flex items-center justify-center">
            {titleVisible && (
              <h1 className="heading-main text-white fade-in-from-bottom">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                  HEADING SAMPLE WORD
                </span>
              </h1>
            )}
          </div>

          {/* Chinese Title */}
          <div className="flex items-center justify-center">
            {titleVisible && (
              <h2 className="heading-sub fade-in-from-bottom-delay-1" style={{
                color: '#FFFFFF',
                fontSize: '26px',
                fontWeight: '500',
              }}>
                3D 粒子波浪互動
              </h2>
            )}
          </div>

          {/* Subtitle */}
          <div className="h-12 flex items-center justify-center">
            {titleVisible && (
              <p className="text-lg md:text-xl text-gray-300 fade-in-from-bottom-delay-2">
                Move your mouse to control the waves
              </p>
            )}
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            {titleVisible && (
              <Button
                className="text-white font-semibold px-8 py-3 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #0369a1 0%, #075985 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)';
                }}
                onClick={() => alert('Welcome to Landing Pro! 🌊')}
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Additional Info */}
          <div className="pt-6 text-gray-400" style={{ fontSize: '11px' }}>
            {titleVisible && (
              <p className="animate-in fade-in duration-1000 delay-1000">
                © 2026 ALL RIGHTS RESERVED.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
      </div>
    </>
  );
}
