import { useState, useRef } from 'react';

const styles = `
.glass-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  user-select: none;
  outline: none;
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.glass-btn:active {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(0px) scale(0.98);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.glass-btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.4);
  outline-offset: 2px;
}

/* Sizes */
.glass-btn-sm {
  padding: 8px 16px;
  font-size: 12px;
  border-radius: 8px;
}

.glass-btn-lg {
  padding: 16px 32px;
  font-size: 16px;
  border-radius: 14px;
}

/* Variants */
.glass-btn-primary {
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.3);
}

.glass-btn-primary:hover {
  background: rgba(99, 102, 241, 0.3);
  border-color: rgba(99, 102, 241, 0.45);
  box-shadow:
    0 8px 24px rgba(99, 102, 241, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.glass-btn-success {
  background: rgba(34, 197, 94, 0.15);
  border-color: rgba(34, 197, 94, 0.3);
  color: rgba(134, 239, 172, 0.9);
}

.glass-btn-success:hover {
  background: rgba(34, 197, 94, 0.25);
  border-color: rgba(34, 197, 94, 0.45);
  box-shadow:
    0 8px 24px rgba(34, 197, 94, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.glass-btn-danger {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.3);
  color: rgba(252, 165, 165, 0.9);
}

.glass-btn-danger:hover {
  background: rgba(239, 68, 68, 0.25);
  border-color: rgba(239, 68, 68, 0.45);
  box-shadow:
    0 8px 24px rgba(239, 68, 68, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.glass-btn-warning {
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(245, 158, 11, 0.3);
  color: rgba(253, 224, 138, 0.9);
}

.glass-btn-warning:hover {
  background: rgba(245, 158, 11, 0.25);
  border-color: rgba(245, 158, 11, 0.45);
  box-shadow:
    0 8px 24px rgba(245, 158, 11, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* Pill shape */
.glass-btn-pill {
  border-radius: 9999px;
}

/* Icon only */
.glass-btn-icon {
  padding: 12px;
  width: 44px;
  height: 44px;
}

.glass-btn-icon.glass-btn-sm {
  padding: 8px;
  width: 32px;
  height: 32px;
}

.glass-btn-icon.glass-btn-lg {
  padding: 16px;
  width: 56px;
  height: 56px;
}

/* Ripple */
.glass-btn-ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: scale(0);
  animation: rippleAnim 0.6s ease-out;
  pointer-events: none;
}

@keyframes rippleAnim {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* Disabled */
.glass-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none !important;
}

.glass-btn:disabled:hover {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* Shine sweep */
.glass-btn-shine::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.12), transparent);
  transform: skewX(-15deg);
  transition: left 0.5s ease;
  pointer-events: none;
  z-index: 1;
}

.glass-btn-shine:hover::before {
  left: 120%;
}
`;

// Inject styles once
if (typeof document !== 'undefined' && !document.getElementById('glass-btn-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'glass-btn-styles';
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
}

export default function GlassButton({
  variant = 'default',
  size = 'default',
  pill = false,
  icon = false,
  shine = false,
  ripple = true,
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  className = '',
  children,
  onClick,
  ...rest
}) {
  const btnRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    if (ripple && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples(prev => [...prev, { id, x, y }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
    }
    onClick?.(e);
  };

  const classes = [
    'glass-btn',
    variant !== 'default' ? `glass-btn-${variant}` : '',
    size !== 'default' ? `glass-btn-${size}` : '',
    pill ? 'glass-btn-pill' : '',
    icon ? 'glass-btn-icon' : '',
    shine ? 'glass-btn-shine' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={btnRef}
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </svg>
      )}
      {iconLeft && <span className="glass-btn-icon-wrap">{iconLeft}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="glass-btn-icon-wrap">{iconRight}</span>}
      {ripples.map(r => (
        <span
          key={r.id}
          className="glass-btn-ripple"
          style={{ left: r.x, top: r.y, width: 20, height: 20, marginLeft: -10, marginTop: -10 }}
        />
      ))}
    </button>
  );
}
