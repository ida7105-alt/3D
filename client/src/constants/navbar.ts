/**
 * Navigation Bar Configuration
 * Centralized configuration for navbar menu items and styling
 */

export const NAVBAR_CONFIG = {
  LOGO_URL: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663100243762/S7Pwh7cDaWkxwg6mirvsWR/LOGO_96d0ddb2.svg',
  MENU_ITEMS: [
    { english: 'ITEM 1', chinese: '項目一' },
    { english: 'ITEM 2', chinese: '項目二' },
    { english: 'ITEM 3', chinese: '項目三' },
    { english: 'ITEM 4', chinese: '項目四' },
    { english: 'ITEM 5', chinese: '項目五' },
  ] as const,
  DESKTOP_GAP: '4.14rem',
  MOBILE_MENU_DELAY: 300,
} as const;

export const NAVBAR_STYLES = {
  LOGO_HEIGHT: 'h-16',
  HAMBURGER_SIZE: 24,
  HAMBURGER_LINE_HEIGHT: 2,
  HAMBURGER_GAP: 6,
  CLOSE_BUTTON_SIZE: 28,
  CLOSE_BUTTON_TOP: 16,
  CLOSE_BUTTON_RIGHT: 16,
} as const;

export const NAVBAR_COLORS = {
  TEXT: 'rgb(255, 255, 255)',
  TEXT_HOVER: '#3b82f6',
  BORDER: 'border-slate-800/50',
  MOBILE_BG: 'bg-slate-950/95',
} as const;
