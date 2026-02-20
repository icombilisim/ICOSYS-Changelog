import { useState, useMemo } from 'react';
import releases from './data/releases.json';
import modules from './data/modules.json';
import TimelineRelease from './components/TimelineRelease.jsx';
import ModuleFilter from './components/ModuleFilter.jsx';
import SearchBar from './components/SearchBar.jsx';

const totalReleases = releases.length;
const lastUpdate = [...releases].sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date ?? '—';

/**
 * Root application component.
 * Renders the changelog page with filtering and search.
 */
export default function App() {
  const [activeModule, setActiveModule] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    return releases
      .filter((r) => {
        if (activeModule !== 'all' && r.module !== activeModule) return false;
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          return (
            r.summary.toLowerCase().includes(term) ||
            r.version.includes(term) ||
            r.changes.some((c) => c.text.toLowerCase().includes(term))
          );
        }
        return true;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activeModule, searchTerm]);

  return (
    <div className="page">
      {/* Sticky Header */}
      <header className="header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="logo">IC</div>
            <span className="brand-name">ICOSYS Docs</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Changelog</span>
          </div>
          <nav className="header-nav">
            <a href="https://docsicosys.icombilisim.com/api/rest-api/" className="nav-link" target="_blank" rel="noreferrer">API Docs</a>
            <a href="https://docsicosys.icombilisim.com/guides/new-module/" className="nav-link" target="_blank" rel="noreferrer">Guides</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Page title */}
        <div className="page-title">
          <h1 className="title">Changelog</h1>
          <p className="subtitle">ICOSYS platform releases — all modules.</p>
        </div>

        {/* Stats bar */}
        <div className="stats-bar">
          <div className="stats">
            <div className="stat">
              <span className="stat-label">Total Releases:</span>
              <span className="stat-value">{totalReleases}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Last Updated:</span>
              <span className="stat-value">{lastUpdate}</span>
            </div>
          </div>
          <div className="rss-btn">
            <span style={{ color: '#f59e0b' }}>◉</span> RSS Feed
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <ModuleFilter modules={modules} active={activeModule} onSelect={setActiveModule} />
        </div>

        {/* Timeline */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p className="empty-title">No results found</p>
            <p className="empty-sub">Try a different filter or search term</p>
          </div>
        ) : (
          <div className="timeline">
            {filtered.map((release, i) => (
              <TimelineRelease
                key={`${release.module}-${release.version}`}
                release={release}
                mod={modules[release.module] ?? modules.core}
                isLast={i === filtered.length - 1}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <span className="footer-copy">
            ICOM Bilişim © 2026 — Auto-generated via Conventional Commits + semantic-release.
          </span>
          <div className="footer-links">
            <a href="https://github.com/icombilisim" className="footer-link" target="_blank" rel="noreferrer">GitHub</a>
            <a href="#" className="footer-link">Support</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
