import {
  Beau_Rivage,
  Great_Vibes,
  Hurricane, Italianno,
  Meow_Script,
  Norican,
  Rouge_Script,
  Style_Script,
  Tangerine
} from 'next/font/google';

// Font configuration
export const writing = Great_Vibes({
  variable: '--font-writing-sans',
  subsets: ['latin'],
  weight: '400'
});

// Centralized color theme for wedding invitation
// Elegant Maroon, Gold & Blush color scheme
export const theme = {
  colors: {
    // Primary - Royal Maroon (replacing Navy)
    primary: {
      50: '#f9f2f2',   // White with red tint
      100: '#f4e0e0',  // Very light red
      200: '#eac2c2',  // Light reddish-pink
      300: '#dd9e9f',  // Soft muted red
      400: '#cc7072',  // Medium red
      500: '#902426',  // Royal Maroon (main)
      600: '#721d1e',  // Deep Maroon
      700: '#561617',  // Dark Maroon
      800: '#3c0f10',  // Very Dark Maroon
      900: '#240909',  // Blackish Red
    },
    
    // Secondary - Rich Antique Gold
    secondary: {
      50: '#fbf9f4',
      100: '#f6f1e6',
      200: '#ebdcc5',
      300: '#dfc29d',
      400: '#d2a673',
      500: '#c28846',  // Antique Gold (main)
      600: '#9b6d38',
      700: '#74522a',
      800: '#4d361c',
      900: '#271b0e',
    },
    
    // Neutral - Warm Sand/Grey
    neutral: {
      50: '#faf9f8',
      100: '#f5f4f2',
      200: '#e8e6e3',
      300: '#d7d4cf',
      400: '#a9a49d',
      500: '#7a756f',
      600: '#595551',
      700: '#45423e',
      800: '#2a2826',
      900: '#1c1b1a',
    },
    
    // Accent - Romantic Blush/Rose (replacing Beige)
    accent: {
      50: '#fdfbfb',
      100: '#faf5f5',
      200: '#f5ebea',
      300: '#eedadb',
      400: '#e4c2c4',
      500: '#d6a2a6',  // Dusty Rose
      600: '#ab8285',
      700: '#806164',
      800: '#564142',
      900: '#2b2021',
    },
    
    // Success, warning, error states
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
  },
  
  // Gradient combinations - cohesive and elegant
  gradients: {
    // Primary maroon gradients
    primary: 'from-primary-500 via-primary-600 to-primary-700',
    
    // Gold gradients
    secondary: 'from-secondary-400 via-secondary-500 to-secondary-600',
    
    // Elegant combined gradients (maroon + gold)
    elegant: 'from-primary-600 via-primary-500 to-secondary-500',
    elegantReverse: 'from-secondary-500 via-primary-500 to-primary-600',
    
    // Romantic/soft blush gradient
    romantic: 'from-accent-100 via-accent-50 to-white',
    
    // Subtle background gradients
    subtle: 'from-neutral-50 via-accent-50 to-secondary-50',
    hero: 'from-primary-700 via-primary-600 to-primary-500',
    card: 'from-white via-accent-50/50 to-secondary-50/30',
    
    // Dark background gradients
    coverDark: 'from-primary-900 via-primary-800 to-primary-700',
    darkNavy: 'from-primary-800 via-primary-900 to-neutral-900', // Kept name for compatibility, but is dark maroon
    
    // Light background gradients  
    lightBackground: 'from-white via-accent-50/40 to-secondary-50/40',
    softBackground: 'from-accent-50 via-secondary-50 to-accent-50',
    sidebarBackground: 'from-accent-50/60 to-secondary-50/60',
    
    // Text gradients (for bg-clip-text)
    textPrimary: 'from-secondary-400 via-secondary-500 to-secondary-600',    // Gold text
    textSecondary: 'from-primary-400 via-primary-500 to-primary-600',       // Maroon text
    textElegant: 'from-primary-600 via-primary-700 to-primary-800',         // Deep maroon text
    textGold: 'from-secondary-500 via-secondary-600 to-secondary-700',      // Rich gold text
    
    // Button gradients
    buttonPrimary: 'from-primary-500/20 to-primary-600/20 hover:from-primary-500/30 hover:to-primary-600/30',
    buttonSolid: 'from-primary-600 to-primary-700',
    buttonGold: 'from-secondary-500 to-secondary-600',
    buttonHover: 'hover:from-primary-700 hover:to-primary-800',
    
    // Event and card gradients (monochromatic for cohesion)
    eventPrimary: 'from-primary-500 to-primary-600',      // Maroon event
    eventSecondary: 'from-secondary-500 to-secondary-600', // Gold event
    cardPrimary: 'from-primary-500/5 to-primary-600/10',
    cardGold: 'from-secondary-400/5 to-secondary-500/10',
    
    // Timer unit gradients (consistent maroon tones)
    timerDay: 'from-primary-500 to-primary-600',
    timerHour: 'from-primary-600 to-primary-700',
    timerMinute: 'from-primary-500 to-primary-600',
    timerSecond: 'from-primary-600 to-primary-700',
    
    // Decorative element gradients
    decorativeLine: 'from-transparent via-secondary-400/50 to-transparent',   // Gold line
    decorativeGlow: 'from-secondary-400/20 to-secondary-500/20',             // Gold glow
    cardOverlay: 'from-white to-accent-50/30',
    
    // Audio wave gradient (gold tones)
    audioWave: 'from-secondary-400 via-secondary-500 to-secondary-600',
    
    // Success state gradient
    successCard: 'from-primary-600 to-primary-700',
  },
  
  // Shadow variations
  shadows: {
    soft: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    medium: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    large: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(144, 36, 38, 0.15), 0 0 40px rgba(194, 136, 70, 0.12)', // Maroon glow
    romantic: '0 8px 32px rgba(194, 136, 70, 0.18)',
  },
  
  // Typography scale
  typography: {
    fontFamily: {
      serif: '"Playfair Display", "Times New Roman", serif',
      sans: '"Inter", "Helvetica Neue", sans-serif',
      display: '"Dancing Script", "Brush Script MT", cursive',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
  },
  
  // Animation configurations
  animations: {
    duration: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
    },
    easing: {
      in: 'ease-in',
      out: 'ease-out',
      inOut: 'ease-in-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  
  // Spacing system
  spacing: {
    section: '5rem', // py-20
    card: '2rem',    // p-8
    element: '1rem', // p-4
    tight: '0.5rem', // p-2
  },
  
  // Border radius values
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    full: '9999px',
  },
}

// Helper functions for theme usage
export const getColorClass = (color: string, shade: number = 500) => {
  return `${color}-${shade}`
}

export const getGradientClass = (gradient: keyof typeof theme.gradients) => {
  return `bg-gradient-to-br ${theme.gradients[gradient]}`
}

// Helper function for inline gradient styles (for cases where Tailwind classes can't be used)
export const getInlineGradient = (gradient: keyof typeof theme.gradients, direction: 'to-br' | 'to-r' | 'to-t' | 'to-b' = 'to-br') => {
  // Convert Tailwind gradient format to CSS linear-gradient
  const gradientStr = theme.gradients[gradient]
  
  // Map direction to CSS angle
  const directionMap = {
    'to-br': '135deg',
    'to-r': '90deg',
    'to-t': '0deg',
    'to-b': '180deg'
  }
  
  return {
    background: `linear-gradient(${directionMap[direction]}, ${gradientStr.replace(/from-|via-|to-|hover:/g, '')})`,
  }
}

// Helper for card overlay inline style (commonly used pattern)
export const getCardOverlayStyle = () => {
  return {
    background: 'linear-gradient(135deg, rgba(144, 36, 38, 0.4) 0%, rgba(194, 136, 70, 0.15) 100%)' // Maroon to gold overlay
  }
}

// CSS custom properties for dynamic theming
export const getCSSVariables = () => {
  return {
    '--color-primary': theme.colors.primary[500],
    '--color-secondary': theme.colors.secondary[400],
    '--color-accent': theme.colors.accent[400],
    '--color-neutral': theme.colors.neutral[600],
    '--shadow-soft': theme.shadows.soft,
    '--shadow-glow': theme.shadows.glow,
    '--animation-spring': theme.animations.easing.spring,
  }
}

// Semantic color utilities for consistent usage
export const semanticColors = {
  // Text colors
  textPrimary: 'text-neutral-800',
  textSecondary: 'text-neutral-600',
  textMuted: 'text-neutral-500',
  textLight: 'text-neutral-700',
  
  // Background colors
  bgPrimary: 'bg-white',
  bgSecondary: 'bg-accent-50',
  bgMuted: 'bg-neutral-50',
  
  // Border colors
  borderPrimary: 'border-neutral-200',
  borderSecondary: 'border-primary-200',
  borderAccent: 'border-secondary-400',
  
  // Decorative accents
  accentPrimary: 'bg-primary-500',
  accentSecondary: 'bg-secondary-500',
  accentDot: 'bg-primary-400/60',
  accentLine: 'bg-primary-400',
  
  // Glow effects
  glowPrimary: 'bg-primary-300/30',
  glowSecondary: 'bg-secondary-300/30',
}

// Helper function to convert hex color to rgba
export const hexToRgba = (hex: string, alpha: number = 1) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Helper for background colors with opacity
export const getBgColor = (color: string, opacity: number = 1) => {
  return {
    backgroundColor: hexToRgba(color, opacity)
  }
}

// Helper for text colors
export const getTextColor = (color: string) => {
  return {
    color: color
  }
}

// Helper for border colors with opacity
export const getBorderColor = (color: string, opacity: number = 1) => {
  return {
    borderColor: hexToRgba(color, opacity)
  }
}

export type ThemeColors = typeof theme.colors
export type ThemeGradients = keyof typeof theme.gradients
