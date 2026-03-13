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
// Elegant Navy, Gold & Cream color scheme
export const theme = {
  colors: {
    // Primary - Elegant Navy Blue
    primary: {
      50: '#f0f4f8',   // Very light blue-gray
      100: '#dce4ec',  // Light blue-gray
      200: '#b8cfe0',  // Soft blue
      300: '#8cafd2',  // Medium blue
      400: '#5a8dc4',  // Blue
      500: '#2c5f8d',  // Navy blue (main)
      600: '#234a6f',  // Deep navy
      700: '#1a3851',  // Darker navy
      800: '#122838',  // Very dark navy
      900: '#0a1a24',  // Almost black navy
    },
    
    // Secondary - Warm Gold/Champagne
    secondary: {
      50: '#fefdfb',   // Almost white gold
      100: '#fef9f0',  // Cream white
      200: '#fcefd6',  // Light champagne
      300: '#f9e2b8',  // Soft gold
      400: '#f5d08f',  // Light gold
      500: '#d4a574',  // Champagne gold (main)
      600: '#b8824f',  // Rich gold
      700: '#96663d',  // Deep gold
      800: '#6f4a2d',  // Bronze
      900: '#4a301e',  // Dark bronze
    },
    
    // Neutral - Warm grays and creams
    neutral: {
      50: '#fafaf9',   // Warm white
      100: '#f5f5f4',  // Off white
      200: '#e7e5e4',  // Light gray
      300: '#d6d3d1',  // Soft gray
      400: '#a8a29e',  // Medium gray
      500: '#78716c',  // Gray
      600: '#57534e',  // Dark gray
      700: '#44403c',  // Charcoal
      800: '#292524',  // Very dark gray
      900: '#1c1917',  // Almost black
    },
    
    // Accent - Subtle Cream/Beige (replaces pink)
    accent: {
      50: '#fdfcfb',   // Ivory white
      100: '#faf8f5',  // Cream
      200: '#f5f1eb',  // Light beige
      300: '#ebe5dc',  // Soft beige
      400: '#ded4c8',  // Beige
      500: '#c9baa8',  // Warm beige
      600: '#b09b87',  // Taupe
      700: '#8e7968',  // Brown taupe
      800: '#6b5b4d',  // Dark taupe
      900: '#4a3f36',  // Deep brown
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
    // Primary navy gradients
    primary: 'from-primary-500 via-primary-600 to-primary-700',
    
    // Gold gradients
    secondary: 'from-secondary-400 via-secondary-500 to-secondary-600',
    
    // Elegant combined gradients (navy + gold)
    elegant: 'from-primary-600 via-primary-500 to-secondary-500',
    elegantReverse: 'from-secondary-500 via-primary-500 to-primary-600',
    
    // Romantic/soft cream gradient
    romantic: 'from-accent-100 via-accent-50 to-white',
    
    // Subtle background gradients
    subtle: 'from-neutral-50 via-accent-50 to-secondary-50',
    hero: 'from-primary-700 via-primary-600 to-primary-500',
    card: 'from-white via-accent-50/50 to-secondary-50/30',
    
    // Dark background gradients
    coverDark: 'from-primary-900 via-primary-800 to-primary-700',
    darkNavy: 'from-primary-800 via-primary-900 to-neutral-900',
    
    // Light background gradients  
    lightBackground: 'from-white via-accent-50/40 to-secondary-50/40',
    softBackground: 'from-accent-50 via-secondary-50 to-accent-50',
    sidebarBackground: 'from-accent-50/60 to-secondary-50/60',
    
    // Text gradients (for bg-clip-text)
    textPrimary: 'from-secondary-400 via-secondary-500 to-secondary-600',    // Gold text
    textSecondary: 'from-primary-400 via-primary-500 to-primary-600',       // Navy text
    textElegant: 'from-primary-600 via-primary-700 to-primary-800',         // Deep navy text
    textGold: 'from-secondary-500 via-secondary-600 to-secondary-700',      // Rich gold text
    
    // Button gradients
    buttonPrimary: 'from-primary-500/20 to-primary-600/20 hover:from-primary-500/30 hover:to-primary-600/30',
    buttonSolid: 'from-primary-600 to-primary-700',
    buttonGold: 'from-secondary-500 to-secondary-600',
    buttonHover: 'hover:from-primary-700 hover:to-primary-800',
    
    // Event and card gradients (monochromatic for cohesion)
    eventPrimary: 'from-primary-500 to-primary-600',      // Navy event
    eventSecondary: 'from-secondary-500 to-secondary-600', // Gold event
    cardPrimary: 'from-primary-500/5 to-primary-600/10',
    cardGold: 'from-secondary-400/5 to-secondary-500/10',
    
    // Timer unit gradients (consistent navy tones)
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
    glow: '0 0 20px rgba(44, 95, 141, 0.15), 0 0 40px rgba(212, 165, 116, 0.12)',
    romantic: '0 8px 32px rgba(212, 165, 116, 0.18)',
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
    background: 'linear-gradient(135deg, rgba(44, 95, 141, 0.4) 0%, rgba(212, 165, 116, 0.15) 100%)' // Navy to gold overlay
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
