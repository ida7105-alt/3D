/**
 * Theme and Color Configuration
 * Centralized color palette and theme settings
 */

export const THEME_CONFIG = {
  BACKGROUND: '#0f172a',
  BACKGROUND_RGB: 'rgb(15, 23, 42)',
} as const;

export const COLOR_PALETTE = {
  WHITE: '#FFFFFF',
  WHITE_RGB: 'rgb(255, 255, 255)',
  LIGHT_GRAY: '#E0E0E0',
  GRAY_300: '#d1d5db',
  GRAY_400: '#9ca3af',
  CYAN_200: '#06b6d4',
  CYAN_400: '#22d3ee',
  CYAN_500: '#06b6d4',
  BLUE_300: '#93c5fd',
  BLUE_400: '#60a5fa',
  BLUE_500: '#3b82f6',
  SLATE_950: '#030712',
  SLATE_950_OPACITY_95: 'rgba(3, 7, 18, 0.95)',
  SLATE_800_OPACITY_50: 'rgba(30, 41, 59, 0.5)',
} as const;

export const GRADIENT_CONFIG = {
  TITLE_GRADIENT: 'linear-gradient(to right, #60a5fa, #22d3ee, #93c5fd)',
  SUBTITLE_GRADIENT: 'linear-gradient(to bottom, #E0E0E0, #FFFFFF)',
} as const;

export const BUTTON_CONFIG = {
  PRIMARY_BG: 'bg-cyan-400',
  PRIMARY_BG_HOVER: 'hover:bg-cyan-500',
  PRIMARY_TEXT: 'text-slate-950',
  PRIMARY_PADDING: 'px-8 py-3',
} as const;
