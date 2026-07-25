import { useState } from 'react';

/**
 * GlassCard - A glassmorphism card component with multiple effect levels
 * 
 * @param {Object} props
 * @param {'none'|'subtle'|'light'|'medium'|'heavy'|'ultra'|'frosted'|'inner-light'|'neo'} props.variant - Glass intensity
 * @param {'default'|'blue'|'purple'|'pink'|'green'|'amber'|'red'} props.color - Tint color
 * @param {boolean} props.shine - Enable light sweep on hover
 * @param {boolean} props.pulse - Enable pulsing glass shadow
 * @param {boolean} props.float - Enable floating animation
 * @param {boolean} props.glow - Enable glow animation
 * @param {boolean} props.shimmer - Enable shimmer animation
 * @param {'none'|'bright'|'glow'} props.borderStyle - Border style variant
 * @param {'sm'|'default'|'lg'|'xl'} props.radius - Border radius size
 * @param {boolean} props.noPadding - Remove default padding
 * @param {boolean} props.noBorder - Remove border
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Card content
 * @param {Function} props.onClick - Click handler
 */
export default function GlassCard({
  variant = 'medium',
  color = 'default',
  shine = false,
  pulse = false,
  float = false,
  glow = false,
  shimmer = false,
  borderStyle = 'none',
  radius = 'default',
  noPadding = false,
  noBorder = false,
  className = '',
  children,
  onClick,
  style,
  ...rest
}) {
  const [isHovered, setIsHovered] = useState(false);

  const variantClass = variant === 'none' ? '' : `glass-${variant === 'default' ? '' : variant}`;
  const colorClass = color !== 'default' ? `glass-${color}` : '';
  const borderClass = borderStyle !== 'none' ? `glass-border-${borderStyle}` : '';
  
  const radiusMap = {
    sm: 'glass-sm',
    lg: 'glass-lg',
    xl: 'glass-xl',
  };
  const radiusClass = radius !== 'default' ? radiusMap[radius] || '' : '';

  const animationClasses = [
    shine ? 'glass-shine' : '',
    pulse ? 'glass-pulse' : '',
    float ? 'glass-float' : '',
    glow ? 'glass-glow' : '',
    shimmer ? 'glass-shimmer' : '',
  ].filter(Boolean).join(' ');

  const classes = [
    !noBorder ? (variantClass || 'glass') : '',
    colorClass,
    borderClass,
    radiusClass,
    animationClasses,
    onClick ? 'glass-card-clickable' : '',
    className,
  ].filter(Boolean).join(' ');

  const paddingStyle = noPadding ? { padding: 0 } : {};

  return (
    <div
      className={classes}
      style={{
        ...paddingStyle,
        ...style,
        cursor: onClick ? 'pointer' : undefined,
        transform: isHovered && !float ? 'translateY(-4px) scale(1.01)' : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
