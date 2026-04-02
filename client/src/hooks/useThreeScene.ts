import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Configuration constants for 3D particle wave
 */
const WAVE_CONFIG = {
  SEPARATION: 150,
  AMOUNT_X: 50,
  AMOUNT_Y: 50,
  PARTICLE_SIZE: 20,
  PARTICLE_OPACITY: 0.8,
  WAVE_SPEED: 0.025,
  WAVE_FREQUENCY_1: 0.3,
  WAVE_FREQUENCY_2: 0.5,
  WAVE_AMPLITUDE: 120,
  MOUSE_INFLUENCE: 100,
  CAMERA_Z: 1500,
  CAMERA_SMOOTH: 0.05,
  SCENE_COLOR: 0x0f172a,
  FADE_IN_DURATION: 2000,
  FADE_IN_DISTANCE: 500,
} as const;

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Custom hook for Three.js scene setup and animation
 * Handles particle wave creation, mouse tracking, and rendering
 */
export function useThreeScene(containerRef: React.RefObject<HTMLDivElement>) {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const animationIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const fadeInCompleteRef = useRef<boolean>(false);

  /**
   * Create circular particle texture
   */
  const createParticleTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  };

  /**
   * Create particle geometry with positions and colors
   */
  const createParticleGeometry = (): THREE.BufferGeometry => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];

    for (let x = 0; x < WAVE_CONFIG.AMOUNT_X; x++) {
      for (let y = 0; y < WAVE_CONFIG.AMOUNT_Y; y++) {
        const px = x * WAVE_CONFIG.SEPARATION - (WAVE_CONFIG.AMOUNT_X * WAVE_CONFIG.SEPARATION) / 2;
        const py = 0;
        const pz = y * WAVE_CONFIG.SEPARATION - (WAVE_CONFIG.AMOUNT_Y * WAVE_CONFIG.SEPARATION) / 2;

        positions.push(px, py, pz);

        // Random cyan/blue gradient colors
        const color = new THREE.Color();
        color.setHSL(0.5 + Math.random() * 0.1, 0.8, 0.5);
        colors.push(color.r, color.g, color.b);
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

    return geometry;
  };

  /**
   * Handle window resize
   */
  const handleResize = (camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  /**
   * Handle mouse movement
   */
  const handleMouseMove = (event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  /**
   * Update particle positions based on wave formula with fade-in effect
   */
  const updateParticlePositions = (geometry: THREE.BufferGeometry, material: THREE.PointsMaterial) => {
    const positionAttribute = geometry.getAttribute('position');
    const positions = positionAttribute.array as Float32Array;

    // Calculate fade-in progress (0 to 1)
    const elapsedTime = Date.now() - startTimeRef.current;
    const fadeInProgress = Math.min(elapsedTime / WAVE_CONFIG.FADE_IN_DURATION, 1);

    // Update material opacity based on fade-in progress
    material.opacity = WAVE_CONFIG.PARTICLE_OPACITY * fadeInProgress;

    if (fadeInProgress >= 1) {
      fadeInCompleteRef.current = true;
    }

    let index = 0;
    for (let x = 0; x < WAVE_CONFIG.AMOUNT_X; x++) {
      for (let y = 0; y < WAVE_CONFIG.AMOUNT_Y; y++) {
        const px = x * WAVE_CONFIG.SEPARATION - (WAVE_CONFIG.AMOUNT_X * WAVE_CONFIG.SEPARATION) / 2;
        const pz = y * WAVE_CONFIG.SEPARATION - (WAVE_CONFIG.AMOUNT_Y * WAVE_CONFIG.SEPARATION) / 2;

        // Wave formula with mouse influence
        const wave1 = Math.sin(WAVE_CONFIG.WAVE_FREQUENCY_1 * (x + timeRef.current)) * WAVE_CONFIG.WAVE_AMPLITUDE;
        const wave2 = Math.sin(WAVE_CONFIG.WAVE_FREQUENCY_2 * (y + timeRef.current)) * WAVE_CONFIG.WAVE_AMPLITUDE;
        const mouseInfluence = mouseRef.current.x * WAVE_CONFIG.MOUSE_INFLUENCE;

        let py = wave1 + wave2 + mouseInfluence - 400;

        // Apply fade-in upward movement (only during fade-in phase)
        if (!fadeInCompleteRef.current) {
          const startY = -WAVE_CONFIG.FADE_IN_DISTANCE;
          py = startY + (py - startY) * fadeInProgress;
        }

        positions[index * 3] = px;
        positions[index * 3 + 1] = py;
        positions[index * 3 + 2] = pz;

        index++;
      }
    }

    positionAttribute.needsUpdate = true;
  };

  /**
   * Update camera position based on mouse
   */
  const updateCameraPosition = (camera: THREE.PerspectiveCamera, scene: THREE.Scene) => {
    camera.position.x += (mouseRef.current.x * 500 - camera.position.x) * WAVE_CONFIG.CAMERA_SMOOTH;
    camera.position.y += (mouseRef.current.y * 300 - camera.position.y) * WAVE_CONFIG.CAMERA_SMOOTH;
    camera.lookAt(scene.position);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(WAVE_CONFIG.SCENE_COLOR);

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.z = WAVE_CONFIG.CAMERA_Z;
    cameraRef.current = camera;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Particle Wave Setup
    const geometry = createParticleGeometry();
    const texture = createParticleTexture();

    const material = new THREE.PointsMaterial({
      size: WAVE_CONFIG.PARTICLE_SIZE,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      map: texture,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      timeRef.current += WAVE_CONFIG.WAVE_SPEED;

      updateParticlePositions(geometry, material);
      updateCameraPosition(camera, scene);

      renderer.render(scene, camera);
    };

    animate();

    // Event listeners
    const resizeHandler = () => handleResize(camera, renderer);
    const mouseMoveHandler = handleMouseMove;

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('resize', resizeHandler);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('resize', resizeHandler);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      material.opacity = WAVE_CONFIG.PARTICLE_OPACITY;

      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();

      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);
}
