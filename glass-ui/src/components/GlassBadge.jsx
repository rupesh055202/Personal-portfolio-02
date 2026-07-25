const styles = `
.glass-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.glass-badge:hover {
  background: rgba(255, 255, 255, 0.12);
}

.glass-badge-sm {
  padding: 2px 8px;
  font-size: 11px;
}

.glass-badge-lg {
  padding: 6px 16px;
  font-size: 13px;
}

.glass-badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  flex-shrink: 0;
}

.glass-badge-success {
  background: rgba(34, 197, 94, 0.12);
  border-color: rgba(34, 197, 94, 0.2);
  color: rgba(134, 239, 172, 0.9);
}

.glass-badge-success .glass-badge-dot {
  background: rgba(34, 197, 94, 0.8);
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.4);
}

.glass-badge-error {
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.2);
  color: rgba(252, 165, 165, 0.9);
}

.glass-badge-error .glass-badge-dot {
  background: rgba(239, 68, 68, 0.8);
  box-shadow: 0 0 6px rgba(239, 68, 68, 0.4);
}

.glass-badge-warning {
  background: rgba(245, 158, 11, 0.12);
  border-color: rgba(245, 158, 11, 0.2);
  color: rgba(253, 224, 138, 0.9);
}

.glass-badge-warning .glass-badge-dot {
  background: rgba(245, 158, 11, 0.8);
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.4);
}

.glass-badge-info {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.2);
  color: rgba(147, 197, 253, 0.9);
}

.glass-badge-info .glass-badge-dot {
  background: rgba(59, 130, 246, 0.8);
  box-shadow: 0 0 6px rgba(59, 130, 246, 0.4);
}

.glass-badge-purple {
  background: rgba(139, 92, 246, 0.12);
  border-color: rgba(139, 92, 246, 0.2);
  color: rgba(196, 181, 253, 0.9);
}

.glass-badge-purple .glass-badge-dot {
  background: rgba(139, 92, 246, 0.8);
  box-shadow: 0 0 6px rgba(139, 92, 246, 0.4);
}

.glass-badge-pink {
  background: rgba(236, 72, 153, 0.12);
  border-color: rgba(236, 72, 153, 0.2);
  color: rgba(244, 114, 182, 0.9);
}

.glass-badge-pink .glass-badge-dot {
  background: rgba(236, 72, 153, 0.8);
  box-shadow: 0 0 6px rgba(236, 72, 153, 0.4);
}

/* Pulse animation for live dot */
@keyframes badgePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.5); }
}

.glass-badge-pulse .glass-badge-dot {
  animation: badgePulse 2s ease-in-out infinite;
}

/* Pill shape (default is pill, add sharp option) */
.glass-badge-sharp {
  border-radius: 6px;
}
`;

if (typeof document !== 'undefined' && !document.getElementById('glass-badge-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'glass-badge-styles';
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
}

export default function GlassBadge({
  variant = 'default',
  size = 'default',
  dot = false,
  pulse = false,
  sharp = false,
  icon,
  children,
  className = '',
  ...rest
}) {
  const classes = [
    'glass-badge',
    variant !== 'default' ? `glass-badge-${variant}` : '',
    size !== 'default' ? `glass-badge-${size}` : '',
    pulse ? 'glass-badge-pulse' : '',
    sharp ? 'glass-badge-sharp' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...rest}>
      {dot && <span className="glass-badge-dot" />}
      {icon}
      {children}
    </span>
  );
}
