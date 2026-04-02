/**
 * TypeScript Type Definitions
 * Centralized type definitions for the application
 */

/**
 * Navigation menu item structure
 */
export interface MenuItem {\n  english: string;\n  chinese: string;\n}\n\n/**\n * Mouse position for 3D interaction\n */\nexport interface MousePosition {\n  x: number;\n  y: number;\n}\n\n/**\n * Loading progress state\n */\nexport interface LoadingState {\n  progress: number;\n  titleVisible: boolean;\n}\n\n/**\n * Three.js Scene configuration\n */\nexport interface SceneConfig {\n  width: number;\n  height: number;\n  pixelRatio: number;\n  backgroundColor: number;\n}\n\n/**\n * Particle system configuration\n */\nexport interface ParticleConfig {\n  separation: number;\n  amountX: number;\n  amountY: number;\n  particleSize: number;\n  particleOpacity: number;\n  waveSpeed: number;\n  waveFrequency1: number;\n  waveFrequency2: number;\n  waveAmplitude: number;\n  mouseInfluence: number;\n  cameraZ: number;\n  cameraSmooth: number;\n  sceneColor: number;\n  fadeInDuration: number;\n  fadeInDistance: number;\n}\n\n/**\n * Animation timing configuration\n */\nexport interface AnimationTiming {\n  duration: number;\n  delay: number;\n  easing: string;\n}\n\n/**\n * Component props for NavMenuItem\n */\nexport interface NavMenuItemProps {\n  englishText: string;\n  chineseText: string;\n  isMobile: boolean;\n}\n\n/**\n * Component props for LoadingBar\n */\nexport interface LoadingBarProps {\n  progress: number;\n}\n
