// Centralized color theme for wedding invitation
export const theme = {
  colors: {
    // Primary wedding colors - elegant blues and golds
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe', 
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    
    // Secondary accent colors - warm golds and creams
    secondary: {
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
    
    // Neutral colors for text and backgrounds
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    
    // Romantic accent colors - soft pinks and lavenders
    accent: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
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
  
  // Gradient combinations for backgrounds and accents
  gradients: {
    primary: 'from-primary-400 via-primary-500 to-primary-600',
    secondary: 'from-secondary-300 via-secondary-400 to-secondary-500',
    romantic: 'from-accent-300 via-accent-400 to-accent-500',
    elegant: 'from-primary-500 via-secondary-400 to-accent-400',
    subtle: 'from-neutral-100 via-primary-50 to-secondary-50',
    hero: 'from-primary-600 via-primary-500 to-secondary-400',
    card: 'from-white/90 via-primary-50/80 to-secondary-50/70',
  },
  
  // Shadow variations
  shadows: {
    soft: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    medium: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    large: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(14, 165, 233, 0.15), 0 0 40px rgba(245, 158, 11, 0.1)',
    romantic: '0 8px 32px rgba(236, 72, 153, 0.15)',
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

// CSS custom properties for dynamic theming
export const getCSSVariables = () => {
  return {
    '--color-primary': theme.colors.primary[500],
    '--color-secondary': theme.colors.secondary[400],
    '--color-accent': theme.colors.accent[400],
    '--color-neutral': theme.colors.neutral[600],
    '--shadow-soft': theme.shadows.soft,
    '--shadow-glow': theme.shadows.glow,
    '--font-serif': theme.typography.fontFamily.serif,
    '--font-display': theme.typography.fontFamily.display,
    '--animation-spring': theme.animations.easing.spring,
  }
}

export type ThemeColors = typeof theme.colors
export type ThemeGradients = keyof typeof theme.gradients