const styles = `
.glass-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border-right: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow:
    4px 0 24px rgba(0, 0, 0, 0.06),
    inset -1px 0 0 rgba(255, 255, 255, 0.04);
  z-index: 50;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-sidebar::-webkit-scrollbar {
  width: 4px;
}

.glass-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.glass-sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
}

.glass-sidebar.collapsed {
  width: 72px;
  padding: 20px 8px;
}

.glass-sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  margin-bottom: 24px;
}

.glass-sidebar-logo-icon {
  width: 36px;
  height: 36px;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.35), rgba(168, 85, 247, 0.35));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.glass-sidebar-logo-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
}

.glass-sidebar-section {
  margin-bottom: 8px;
}

.glass-sidebar-section-title {
  padding: 8px 12px 6px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
  overflow: hidden;
}

.glass-sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  margin: 2px 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 13.5px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  border-radius: 12px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
}

.glass-sidebar-item:hover {
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.06);
}

.glass-sidebar-item.active {
  color: rgba(255, 255, 255, 0.95);
  background: rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.2);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
}

.glass-sidebar-item-icon {
  width: 20px;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
}

.glass-sidebar-item.active .glass-sidebar-item-icon {
  opacity: 1;
  color: rgba(129, 140, 248, 0.9);
}

.glass-sidebar-item-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.glass-sidebar-item-badge {
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.2);
  color: rgba(165, 180, 252, 0.9);
  border-radius: 999px;
  white-space: nowrap;
}

.glass-sidebar-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
  margin: 12px 8px;
}

.glass-sidebar-footer {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.glass-sidebar-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.glass-sidebar-user:hover {
  background: rgba(255, 255, 255, 0.06);
}

.glass-sidebar-user-avatar {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  font-weight: 600;
}

.glass-sidebar-user-info {
  overflow: hidden;
}

.glass-sidebar-user-name {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.glass-sidebar-user-role {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
}

.glass-sidebar-toggle {
  position: absolute;
  top: 50%;
  right: -12px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transform: translateY(-50%);
  transition: all 0.2s ease;
  z-index: 51;
}

.glass-sidebar-toggle:hover {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .glass-sidebar {
    transform: translateX(-100%);
  }
  .glass-sidebar.mobile-open {
    transform: translateX(0);
  }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('glass-sidebar-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'glass-sidebar-styles';
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
}

export default function GlassSidebar({
  logo,
  title = 'GlassUI',
  sections = [],
  activeItem,
  onItemClick,
  user,
  collapsed = false,
  onToggle,
  className = '',
}) {
  return (
    <aside className={`glass-sidebar ${collapsed ? 'collapsed' : ''} ${className}`}>
      {onToggle && (
        <button className="glass-sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      <div className="glass-sidebar-logo">
        <div className="glass-sidebar-logo-icon">
          {logo || (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
            </svg>
          )}
        </div>
        {!collapsed && <span className="glass-sidebar-logo-text">{title}</span>}
      </div>

      {sections.map((section, si) => (
        <div key={si} className="glass-sidebar-section">
          {!collapsed && section.title && (
            <div className="glass-sidebar-section-title">{section.title}</div>
          )}
          {section.items?.map((item, ii) => (
            <a
              key={ii}
              href={item.href || '#'}
              className={`glass-sidebar-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onItemClick?.(item);
              }}
              title={collapsed ? item.label : undefined}
            >
              <span className="glass-sidebar-item-icon">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="glass-sidebar-item-label">{item.label}</span>
                  {item.badge && <span className="glass-sidebar-item-badge">{item.badge}</span>}
                </>
              )}
            </a>
          ))}
          {si < sections.length - 1 && <div className="glass-sidebar-divider" />}
        </div>
      ))}

      {user && (
        <div className="glass-sidebar-footer">
          <div className="glass-sidebar-user">
            <div className="glass-sidebar-user-avatar">{user.initials}</div>
            {!collapsed && (
              <div className="glass-sidebar-user-info">
                <div className="glass-sidebar-user-name">{user.name}</div>
                <div className="glass-sidebar-user-role">{user.role}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
