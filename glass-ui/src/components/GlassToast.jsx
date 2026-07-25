import { useState, useEffect, useCallback } from 'react';

const styles = `
.glass-toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}

.glass-toast {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: toastIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  cursor: pointer;
  transition: all 0.2s ease;
}

.glass-toast:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateX(-4px);
}

.glass-toast-exit {
  animation: toastOut 0.3s ease forwards;
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes toastOut {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
  }
}

.glass-toast-icon {
  width: 22px;
  min-width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-top: 1px;
}

.glass-toast-success .glass-toast-icon {
  background: rgba(34, 197, 94, 0.15);
  color: rgba(134, 239, 172, 0.9);
}

.glass-toast-error .glass-toast-icon {
  background: rgba(239, 68, 68, 0.15);
  color: rgba(252, 165, 165, 0.9);
}

.glass-toast-warning .glass-toast-icon {
  background: rgba(245, 158, 11, 0.15);
  color: rgba(253, 224, 138, 0.9);
}

.glass-toast-info .glass-toast-icon {
  background: rgba(59, 130, 246, 0.15);
  color: rgba(147, 197, 253, 0.9);
}

.glass-toast-content {
  flex: 1;
  min-width: 0;
}

.glass-toast-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 2px 0;
}

.glass-toast-message {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  line-height: 1.4;
}

.glass-toast-close {
  width: 24px;
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.glass-toast-close:hover {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
}

.glass-toast-progress {
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  overflow: hidden;
}

.glass-toast-progress-bar {
  height: 100%;
  border-radius: 999px;
  animation: toastProgress linear forwards;
}

.glass-toast-success .glass-toast-progress-bar {
  background: rgba(34, 197, 94, 0.5);
}

.glass-toast-error .glass-toast-progress-bar {
  background: rgba(239, 68, 68, 0.5);
}

.glass-toast-warning .glass-toast-progress-bar {
  background: rgba(245, 158, 11, 0.5);
}

.glass-toast-info .glass-toast-progress-bar {
  background: rgba(59, 130, 246, 0.5);
}

@keyframes toastProgress {
  from { width: 100%; }
  to { width: 0%; }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('glass-toast-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'glass-toast-styles';
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
}

const ICONS = {
  success: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  error: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  warning: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

let toastIdCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'info', title, message, duration = 5000 }) => {
    const id = ++toastIdCounter;
    setToasts(prev => [...prev, { id, type, title, message, duration, exiting: false }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id));
        }, 300);
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 300);
  }, []);

  const toast = {
    success: (title, message) => addToast({ type: 'success', title, message }),
    error: (title, message) => addToast({ type: 'error', title, message }),
    warning: (title, message) => addToast({ type: 'warning', title, message }),
    info: (title, message) => addToast({ type: 'info', title, message }),
  };

  return { toasts, toast, removeToast };
}

export default function GlassToastContainer({ toasts, onRemove }) {
  return (
    <div className="glass-toast-container">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`glass-toast glass-toast-${t.type} ${t.exiting ? 'glass-toast-exit' : ''}`}
          style={{ position: 'relative' }}
          onClick={() => onRemove(t.id)}
        >
          <div className="glass-toast-icon">{ICONS[t.type]}</div>
          <div className="glass-toast-content">
            {t.title && <p className="glass-toast-title">{t.title}</p>}
            {t.message && <p className="glass-toast-message">{t.message}</p>}
          </div>
          <button className="glass-toast-close" onClick={(e) => { e.stopPropagation(); onRemove(t.id); }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {t.duration > 0 && (
            <div className="glass-toast-progress">
              <div
                className="glass-toast-progress-bar"
                style={{ animationDuration: `${t.duration}ms` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
