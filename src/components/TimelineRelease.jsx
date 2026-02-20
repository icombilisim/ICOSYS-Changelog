import { useState } from 'react';
import Badge from './Badge.jsx';

const TYPE_ICONS = {
  feat:     { icon: '✦', color: '#10b981', label: 'New Feature' },
  fix:      { icon: '⚡', color: '#f59e0b', label: 'Fix' },
  perf:     { icon: '△', color: '#6366f1', label: 'Performance' },
  refactor: { icon: '↻', color: '#64748b', label: 'Refactor' },
  security: { icon: '◈', color: '#ef4444', label: 'Security' },
};

/**
 * Single release card rendered as a timeline entry.
 *
 * @param {Object} release - Release data object
 * @param {Object} mod - Module definition (label, color)
 * @param {boolean} isLast - Whether this is the last item (hides connector line)
 */
export default function TimelineRelease({ release, mod, isLast }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="timeline-item">
      {/* Left column — dot + connector line */}
      <div className="timeline-left">
        <div
          className="timeline-dot"
          style={{
            background: mod.color,
            border: `3px solid ${mod.color}33`,
            boxShadow: `0 0 0 4px #0f172a`,
          }}
        />
        {!isLast && <div className="timeline-line" />}
      </div>

      {/* Right column — content */}
      <div className="timeline-content" style={{ paddingBottom: isLast ? 0 : '32px' }}>
        {/* Header row */}
        <div className="release-header" onClick={() => setExpanded(!expanded)}>
          <span className="release-version">v{release.version}</span>
          <Badge text={mod.label} color={mod.color} />
          {release.breaking && <Badge text="BREAKING" color="#ef4444" outline />}
          <span className="release-date">{release.date}</span>
          <span
            className="release-chevron"
            style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
          >
            ▼
          </span>
        </div>

        {/* Summary */}
        <p className="release-summary">{release.summary}</p>

        {/* Change list */}
        {expanded && (
          <div className="change-list">
            {release.changes.map((change, i) => {
              const typeInfo = TYPE_ICONS[change.type] || TYPE_ICONS.feat;
              return (
                <div
                  key={i}
                  className="change-row"
                  style={{
                    borderBottom:
                      i < release.changes.length - 1 ? '1px solid #334155' : 'none',
                  }}
                >
                  <span className="change-icon" style={{ color: typeInfo.color }}>
                    {typeInfo.icon}
                  </span>
                  <span className="change-label" style={{ color: typeInfo.color }}>
                    {typeInfo.label}
                  </span>
                  <span className="change-text">{change.text}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
