import { theme, hexToRgba, getBgColor } from '@/lib/theme'

interface DecorativeLineProps {
  variant?: 'simple' | 'with-dots' | 'with-ornament'
  className?: string
}

export function DecorativeLine({ variant = 'with-dots', className = '' }: DecorativeLineProps) {
  if (variant === 'simple') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div 
          className="h-px flex-1 max-w-32" 
          style={{ background: `linear-gradient(to right, transparent, ${hexToRgba(theme.colors.secondary[400], 0.4)}, transparent)` }} 
        />
      </div>
    )
  }

  if (variant === 'with-ornament') {
    return (
      <div className={`flex items-center justify-center space-x-4 ${className}`}>
        <div 
          className="h-px flex-1 max-w-32" 
          style={{ background: `linear-gradient(to right, transparent, ${hexToRgba(theme.colors.secondary[400], 0.4)}, transparent)` }} 
        />
        <div className="flex items-center space-x-2">
          <div className="w-8 h-px" style={{ background: `linear-gradient(to right, transparent, ${hexToRgba(theme.colors.secondary[400], 0.4)})` }} />
          <div className="w-2 h-2 rounded-full" style={getBgColor(theme.colors.secondary[400], 0.6)} />
          <div className="w-12 h-px" style={getBgColor(theme.colors.secondary[400], 0.6)} />
          <div className="w-2 h-2 rounded-full" style={getBgColor(theme.colors.secondary[400], 0.6)} />
          <div className="w-8 h-px" style={{ background: `linear-gradient(to left, transparent, ${hexToRgba(theme.colors.secondary[400], 0.4)})` }} />
        </div>
        <div 
          className="h-px flex-1 max-w-32" 
          style={{ background: `linear-gradient(to right, transparent, ${hexToRgba(theme.colors.secondary[400], 0.4)}, transparent)` }} 
        />
      </div>
    )
  }

  // Default: with-dots
  return (
    <div className={`flex items-center justify-center space-x-4 ${className}`}>
      <div 
        className="h-px flex-1 max-w-32" 
        style={{ background: `linear-gradient(to right, transparent, ${hexToRgba(theme.colors.secondary[400], 0.4)}, transparent)` }} 
      />
      <div className="flex space-x-1">
        <div className="w-1 h-1 rounded-full" style={getBgColor(theme.colors.secondary[400])} />
        <div className="w-1 h-1 rounded-full" style={getBgColor(theme.colors.secondary[400])} />
        <div className="w-1 h-1 rounded-full" style={getBgColor(theme.colors.secondary[400])} />
      </div>
      <div 
        className="h-px flex-1 max-w-32" 
        style={{ background: `linear-gradient(to right, transparent, ${hexToRgba(theme.colors.secondary[400], 0.4)}, transparent)` }} 
      />
    </div>
  )
}
