const styles = `
.glass-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 28px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.08),
    inset 0 -1px 0 rgba(255, 255, 255, 0.04);
  transition: all 0.3s ease;
}

.glass-navbar.scrolled {
  background: rgba(255, 255, 255, 0.1);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.15),
    inset 0 -1px 0 rgba(255, 255, 255, 0.06);
}

.glass-navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.glass-navbar-logo {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
}

.glass-navbar-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: -0.02em;
}

.glass-navbar-links {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.glass-navbar-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
}

.glass-navbar-link:hover {
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.08);
}

.glass-navbar-link.active {
  color: rgba(255, 255, 255, 0.95);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.glass-navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.glass-navbar-avatar {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.glass-navbar-avatar:hover {
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.25);
}

.glass-navbar-icon-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
}

.glass-navbar-icon-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.85);
}

.glass-navbar-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.8);
  backdrop-filter: blur(4px);
  border: 1.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
}

@media (max-width: 768px) {
  .glass-navbar-links {
    display: none;
  }
  .glass-navbar {
    padding: 12px 16px;
  }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('glass-navbar-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'glass-navbar-styles';
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
}

import { useState, useEffect } from 'react';

export default function GlassNavbar({
  logo,
  title = 'GlassUI',
  links = [],
  activeLink,
  onLinkClick,
  rightContent,
  userInitials,
  notificationCount = 0,
  onNotificationClick,
  className = '',
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`glass-navbar ${scrolled ? 'scrolled' : ''} ${className}`}>
      <a href="#" className="glass-navbar-brand">
        <div className="glass-navbar-logo">
          {logo || (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
            </svg>
          )}
        </div>
        <span className="glass-navbar-title">{title}</span>
      </a>

      <ul className="glass-navbar-links">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.href || '#'}
              className={`glass-navbar-link ${activeLink === link.label ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onLinkClick?.(link);
              }}
            >
              {link.icon && <span>{link.icon}</span>}
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="glass-navbar-right">
        {rightContent}
        <button
          className="glass-navbar-icon-btn"
          onClick={onNotificationClick}
          style={{ position: 'relative' }}
          aria-label="Notifications"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {notificationCount > 0 && (
            <span className="glass-navbar-badge">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>
        {userInitials && (
          <div className="glass-navbar-avatar">{userInitials}</div>
        )}
      </div>
    </nav>
  );
}
