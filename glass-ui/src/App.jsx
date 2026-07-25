import { useState, useEffect } from 'react';
import {
  GlassCard,
  GlassButton,
  GlassModal,
  GlassInput,
  GlassNavbar,
  GlassSidebar,
  GlassToast,
  GlassToastContainer,
  useToast,
  GlassBadge,
} from './components';
import './glass.css';
import './App.css';

/* ── SVG Icons ──────────────────────────────────────────────── */
const Icons = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  users: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  chart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  star: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  zap: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  globe: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

/* ── Sidebar Config ─────────────────────────────────────────── */
const sidebarSections = [
  {
    title: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard },
      { id: 'analytics', label: 'Analytics', icon: Icons.chart, badge: 'New' },
      { id: 'users', label: 'Users', icon: Icons.users },
      { id: 'messages', label: 'Messages', icon: Icons.mail, badge: '3' },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { id: 'projects', label: 'Projects', icon: Icons.star },
      { id: 'integrations', label: 'Integrations', icon: Icons.zap },
      { id: 'domains', label: 'Domains', icon: Icons.globe },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'security', label: 'Security', icon: Icons.shield },
      { id: 'settings', label: 'Settings', icon: Icons.settings },
    ],
  },
];

const navbarLinks = [
  { label: 'Dashboard', icon: Icons.dashboard },
  { label: 'Components', icon: Icons.star },
  { label: 'Documentation', icon: Icons.globe },
];

/* ── Stat Card Data ─────────────────────────────────────────── */
const stats = [
  { label: 'Total Users', value: '24,589', change: '+12.5%', color: 'blue' },
  { label: 'Revenue', value: '$48,290', change: '+8.2%', color: 'green' },
  { label: 'Active Sessions', value: '1,847', change: '+24.1%', color: 'purple' },
  { label: 'Conversion Rate', value: '3.24%', change: '+1.8%', color: 'amber' },
];

/* ── Activity Data ──────────────────────────────────────────── */
const activities = [
  { user: 'Sarah Chen', action: 'deployed v2.4.1 to production', time: '2 min ago', type: 'success' },
  { user: 'Marcus Webb', action: 'opened a pull request #847', time: '15 min ago', type: 'info' },
  { user: 'Priya Patel', action: 'updated billing settings', time: '1 hour ago', type: 'warning' },
  { user: 'Alex Rivera', action: 'fixed critical auth bug', time: '3 hours ago', type: 'success' },
  { user: 'Jordan Kim', action: 'added new API endpoint', time: '5 hours ago', type: 'info' },
];

/* ── Project Data ───────────────────────────────────────────── */
const projects = [
  { name: 'GlassUI Pro', status: 'Active', progress: 78, members: 4 },
  { name: 'Design System', status: 'Active', progress: 92, members: 6 },
  { name: 'API Gateway', status: 'In Review', progress: 45, members: 3 },
  { name: 'Mobile App', status: 'Planning', progress: 15, members: 5 },
];

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState('dashboard');
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toasts, toast, removeToast } = useToast();
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));

  /* Animate stat numbers on mount */
  useEffect(() => {
    const targets = [24589, 48290, 1847, 3.24];
    const durations = [1200, 1400, 1000, 1100];
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newValues = targets.map((target, i) => {
        const progress = Math.min(elapsed / durations[i], 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        return target * eased;
      });
      setAnimatedValues(newValues);
      if (elapsed < Math.max(...durations)) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  const formatValue = (index) => {
    const v = animatedValues[index];
    if (index === 0) return Math.round(v).toLocaleString();
    if (index === 1) return '$' + Math.round(v).toLocaleString();
    if (index === 2) return Math.round(v).toLocaleString();
    return v.toFixed(2) + '%';
  };

  const handleToast = (type) => {
    const messages = {
      success: ['Success!', 'Your changes have been saved successfully.'],
      error: ['Error', 'Something went wrong. Please try again.'],
      warning: ['Warning', 'Your session will expire in 5 minutes.'],
      info: ['Info', 'A new update is available for download.'],
    };
    toast[type](messages[type][0], messages[type][1]);
  };

  const handleLoadingButton = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Complete!', 'The operation finished successfully.');
    }, 2000);
  };

  return (
    <div className="glass-app">
      <GlassToastContainer toasts={toasts} onRemove={removeToast} />
      <GlassModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create New Project"
        subtitle="Fill in the details below to create a new project in your workspace."
        footer={
          <>
            <GlassButton variant="default" onClick={() => setModalOpen(false)}>Cancel</GlassButton>
            <GlassButton
              variant="primary"
              onClick={() => {
                setModalOpen(false);
                toast.success('Project Created', 'Your new project has been created successfully.');
              }}
            >
              Create Project
            </GlassButton>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <GlassInput label="Project Name" placeholder="My Awesome Project" required />
          <GlassInput label="Description" textarea placeholder="Describe your project..." />
          <GlassInput
            label="Category"
            select
            options={[
              { value: '', label: 'Select a category...' },
              { value: 'web', label: 'Web Application' },
              { value: 'mobile', label: 'Mobile App' },
              { value: 'api', label: 'API / Backend' },
              { value: 'design', label: 'Design System' },
            ]}
          />
        </div>
      </GlassModal>

      <div className="glass-app-layout">
        <GlassSidebar
          title="GlassUI"
          sections={sidebarSections}
          activeItem={activeSidebar}
          onItemClick={(item) => setActiveSidebar(item.id)}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          user={{ initials: 'RU', name: 'Rupesh', role: 'Administrator' }}
        />

        <div
          className="glass-app-main"
          style={{ marginLeft: sidebarCollapsed ? '72px' : '260px' }}
        >
          <GlassNavbar
            title="GlassUI"
            links={navbarLinks}
            activeLink={activeNav}
            onLinkClick={(link) => setActiveNav(link.label)}
            userInitials="RU"
            notificationCount={3}
          />

          <div className="glass-content">
            {/* Hero Section */}
            <section className="glass-hero">
              <div className="glass-hero-glow" />
              <GlassCard variant="ultra" shine className="glass-hero-card">
                <div className="glass-hero-content">
                  <GlassBadge variant="purple" size="lg" pulse>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>{Icons.zap} New Release</span>
                  </GlassBadge>
                  <h1 className="glass-hero-title">
                    Glass<span className="glass-hero-accent">Morphism</span> UI
                  </h1>
                  <p className="glass-hero-subtitle">
                    A stunning collection of glass-effect components with blur, transparency,
                    and beautiful animations. Build interfaces that look like they're made of glass.
                  </p>
                  <div className="glass-hero-actions">
                    <GlassButton variant="primary" size="lg" shine onClick={() => setModalOpen(true)}>
                      Get Started
                    </GlassButton>
                    <GlassButton variant="default" size="lg">
                      View Docs
                    </GlassButton>
                  </div>
                </div>
              </GlassCard>
            </section>

            {/* Stats Row */}
            <section className="glass-stats">
              {stats.map((stat, i) => (
                <GlassCard key={i} variant="medium" className="glass-stat-card" hover={false}>
                  <div className={`glass-stat-dot glass-stat-dot-${stat.color}`} />
                  <span className="glass-stat-label">{stat.label}</span>
                  <span className="glass-stat-value">{formatValue(i)}</span>
                  <span className="glass-stat-change">{stat.change}</span>
                </GlassCard>
              ))}
            </section>

            {/* Main Content Grid */}
            <section className="glass-grid">
              {/* Activity Panel */}
              <GlassCard variant="medium" className="glass-panel">
                <div className="glass-panel-header">
                  <h3 className="glass-panel-title">Recent Activity</h3>
                  <GlassBadge variant="info">Live</GlassBadge>
                </div>
                <div className="glass-activity-list">
                  {activities.map((act, i) => (
                    <div key={i} className="glass-activity-item">
                      <div className={`glass-activity-dot glass-activity-dot-${act.type}`} />
                      <div className="glass-activity-content">
                        <p className="glass-activity-text">
                          <strong>{act.user}</strong> {act.action}
                        </p>
                        <span className="glass-activity-time">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Projects Panel */}
              <GlassCard variant="medium" className="glass-panel">
                <div className="glass-panel-header">
                  <h3 className="glass-panel-title">Projects</h3>
                  <GlassButton variant="default" size="sm" onClick={() => setModalOpen(true)}>
                    + New
                  </GlassButton>
                </div>
                <div className="glass-projects-list">
                  {projects.map((proj, i) => (
                    <div key={i} className="glass-project-item">
                      <div className="glass-project-info">
                        <span className="glass-project-name">{proj.name}</span>
                        <GlassBadge
                          variant={proj.status === 'Active' ? 'success' : proj.status === 'In Review' ? 'warning' : 'info'}
                          size="sm"
                        >
                          {proj.status}
                        </GlassBadge>
                      </div>
                      <div className="glass-project-bar-track">
                        <div
                          className="glass-project-bar-fill"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                      <div className="glass-project-meta">
                        <span>{proj.progress}% complete</span>
                        <span>{proj.members} members</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </section>

            {/* Component Showcase */}
            <section className="glass-showcase">
              <h2 className="glass-section-title">Component Showcase</h2>
              <p className="glass-section-subtitle">Every component uses glassmorphism with backdrop-filter blur</p>

              {/* Buttons */}
              <GlassCard variant="medium" className="glass-showcase-card">
                <h3 className="glass-showcase-label">Buttons</h3>
                <div className="glass-showcase-row">
                  <GlassButton variant="default">Default</GlassButton>
                  <GlassButton variant="primary">Primary</GlassButton>
                  <GlassButton variant="success">Success</GlassButton>
                  <GlassButton variant="danger">Danger</GlassButton>
                  <GlassButton variant="warning">Warning</GlassButton>
                </div>
                <div className="glass-showcase-row">
                  <GlassButton variant="primary" size="sm">Small</GlassButton>
                  <GlassButton variant="primary">Medium</GlassButton>
                  <GlassButton variant="primary" size="lg">Large</GlassButton>
                </div>
                <div className="glass-showcase-row">
                  <GlassButton variant="primary" pill shine>Pill + Shine</GlassButton>
                  <GlassButton variant="primary" loading={loading} onClick={handleLoadingButton}>
                    {loading ? 'Loading...' : 'Click to Load'}
                  </GlassButton>
                  <GlassButton variant="default" disabled>Disabled</GlassButton>
                </div>
              </GlassCard>

              {/* Badges */}
              <GlassCard variant="medium" className="glass-showcase-card">
                <h3 className="glass-showcase-label">Badges</h3>
                <div className="glass-showcase-row">
                  <GlassBadge>Default</GlassBadge>
                  <GlassBadge variant="success" dot>Success</GlassBadge>
                  <GlassBadge variant="error" dot>Error</GlassBadge>
                  <GlassBadge variant="warning" dot pulse>Warning</GlassBadge>
                  <GlassBadge variant="info" dot>Info</GlassBadge>
                  <GlassBadge variant="purple" dot>Purple</GlassBadge>
                  <GlassBadge variant="pink" dot>Pink</GlassBadge>
                </div>
                <div className="glass-showcase-row">
                  <GlassBadge variant="success" size="sm">Small</GlassBadge>
                  <GlassBadge variant="info">Default</GlassBadge>
                  <GlassBadge variant="purple" size="lg">Large</GlassBadge>
                </div>
              </GlassCard>

              {/* Inputs */}
              <GlassCard variant="medium" className="glass-showcase-card">
                <h3 className="glass-showcase-label">Inputs</h3>
                <div className="glass-showcase-grid-2">
                  <GlassInput label="Email Address" placeholder="you@example.com" required />
                  <GlassInput label="Password" type="password" placeholder="••••••••" />
                  <GlassInput label="Floating Label" floating placeholder="Type something..." />
                  <GlassInput
                    label="With Error"
                    placeholder="Invalid input"
                    error="This field is required"
                  />
                </div>
              </GlassCard>

              {/* Glass Variants */}
              <GlassCard variant="medium" className="glass-showcase-card">
                <h3 className="glass-showcase-label">Glass Intensity Levels</h3>
                <div className="glass-showcase-grid-3">
                  {['subtle', 'light', 'medium', 'heavy', 'ultra', 'frosted'].map((v) => (
                    <GlassCard key={v} variant={v} className="glass-variant-demo">
                      <span className="glass-variant-label">{v}</span>
                      <span className="glass-variant-desc">blur({v === 'subtle' ? '10px' : v === 'light' ? '16px' : v === 'medium' ? '24px' : v === 'heavy' ? '40px' : v === 'ultra' ? '60px' : '60px + sat(180%)'})</span>
                    </GlassCard>
                  ))}
                </div>
              </GlassCard>

              {/* Glass Tint Colors */}
              <GlassCard variant="medium" className="glass-showcase-card">
                <h3 className="glass-showcase-label">Tinted Glass Colors</h3>
                <div className="glass-showcase-grid-3">
                  {['blue', 'purple', 'pink', 'green', 'amber', 'red'].map((c) => (
                    <GlassCard key={c} variant={c} className="glass-variant-demo" noPadding>
                      <span className="glass-variant-label">{c}</span>
                    </GlassCard>
                  ))}
                </div>
              </GlassCard>

              {/* Animation Cards */}
              <GlassCard variant="medium" className="glass-showcase-card">
                <h3 className="glass-showcase-label">Animated Effects</h3>
                <div className="glass-showcase-grid-4">
                  <GlassCard variant="medium" shine className="glass-anim-demo">
                    <span>✨ Shine</span>
                  </GlassCard>
                  <GlassCard variant="medium" pulse className="glass-anim-demo">
                    <span>💓 Pulse</span>
                  </GlassCard>
                  <GlassCard variant="medium" float className="glass-anim-demo">
                    <span>🫧 Float</span>
                  </GlassCard>
                  <GlassCard variant="medium" glow className="glass-anim-demo">
                    <span>💡 Glow</span>
                  </GlassCard>
                  <GlassCard variant="medium" shimmer className="glass-anim-demo">
                    <span>💫 Shimmer</span>
                  </GlassCard>
                  <GlassCard variant="inner-light" className="glass-variant-demo">
                    <span>🔦 Inner Light</span>
                  </GlassCard>
                </div>
              </GlassCard>

              {/* Toast Triggers */}
              <GlassCard variant="medium" className="glass-showcase-card">
                <h3 className="glass-showcase-label">Toast Notifications</h3>
                <div className="glass-showcase-row">
                  <GlassButton variant="success" onClick={() => handleToast('success')}>Success Toast</GlassButton>
                  <GlassButton variant="danger" onClick={() => handleToast('error')}>Error Toast</GlassButton>
                  <GlassButton variant="warning" onClick={() => handleToast('warning')}>Warning Toast</GlassButton>
                  <GlassButton variant="default" onClick={() => handleToast('info')}>Info Toast</GlassButton>
                </div>
              </GlassCard>
            </section>

            {/* Footer */}
            <footer className="glass-footer">
              <GlassCard variant="subtle" className="glass-footer-card">
                <p>Built with 🤍 by <strong>GlassUI</strong> — Glassmorphism Component Library</p>
                <p className="glass-footer-sub">React • Vite • CSS backdrop-filter</p>
              </GlassCard>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
