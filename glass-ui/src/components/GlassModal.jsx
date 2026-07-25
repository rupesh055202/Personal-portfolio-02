import { useEffect, useRef } from 'react';

const styles = `
.glass-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-modal-overlay.glass-modal-open {
  opacity: 1;
  visibility: visible;
}

.glass-modal-container {
  position: relative;
  width: 90%;
  max-width: 520px;
  max-height: 85vh;
  padding: 32px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.3),
    0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 2px 0 rgba(255, 255, 255, 0.15),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05);
  overflow-y: auto;
  transform: scale(0.9) translateY(20px);
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.glass-modal-open .glass-modal-container {
  transform: scale(1) translateY(0);
}

.glass-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;
}

.glass-modal-close:hover {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
  transform: rotate(90deg);
}

.glass-modal-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 8px 0;
  padding-right: 40px;
}

.glass-modal-subtitle {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 24px 0;
}

.glass-modal-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
  margin: 20px 0;
  border: none;
}

.glass-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}
`;

// Inject styles once
if (typeof document !== 'undefined' && !document.getElementById('glass-modal-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'glass-modal-styles';
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
}

export default function GlassModal({
  open = false,
  onClose,
  title,
  subtitle,
  children,
  footer,
  closeOnOverlay = true,
  closeOnEsc = true,
  className = '',
}) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeOnEsc, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === overlayRef.current) {
      onClose?.();
    }
  };

  return (
    <div
      ref={overlayRef}
      className={`glass-modal-overlay ${open ? 'glass-modal-open' : ''} ${className}`}
      onClick={handleOverlayClick}
    >
      <div ref={containerRef} className="glass-modal-container" role="dialog" aria-modal="true">
        <button className="glass-modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>
        {title && <h2 className="glass-modal-title">{title}</h2>}
        {subtitle && <p className="glass-modal-subtitle">{subtitle}</p>}
        {title && <hr className="glass-modal-divider" />}
        <div className="glass-modal-body">{children}</div>
        {footer && (
          <>
            <hr className="glass-modal-divider" />
            <div className="glass-modal-footer">{footer}</div>
          </>
        )}
      </div>
    </div>
  );
}
