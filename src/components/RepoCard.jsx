import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import Badge from './Badge';
import Tag from './Tag';

function RepoCard({ repo, selected, selectedPaths, onToggleRepo, onTogglePath }) {
  const [expanded, setExpanded] = useState(false);
  const allPaths = repo.packagePaths;
  const selectedCount = selectedPaths.length;
  const allSelected = selectedCount === allPaths.length;
  const someSelected = selectedCount > 0 && !allSelected;
 
  return (
    <div className="repo-card" style={{
      border: selected ? "1px solid #1D9E75" : "0.5px solid var(--color-border-tertiary)",
      borderRadius: "var(--border-radius-lg)", background: "var(--color-background-primary)",
      overflow: "hidden", transition: "border-color 0.15s",
    }}>
      <div style={{ padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={() => onToggleRepo(repo.id)}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", fontFamily: "var(--font-mono)" }}>
                {repo.name}
              </span>
              {repo.isContainer && <Badge color="#185FA5" bg="#E6F1FB">container</Badge>}
              {allPaths.length > 1 && (
                <Badge color="#3B6D11" bg="#EAF3DE">{allPaths.length} package.json</Badge>
              )}
            </div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 3 }}>
              {repo.description}
            </div>
          </div>
          {allPaths.length > 1 && (
            <button
              onClick={() => setExpanded(e => !e)}
              style={{
                background: "none", border: "0.5px solid var(--color-border-tertiary)",
                borderRadius: 6, padding: "3px 8px", cursor: "pointer",
                fontSize: 11, color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 4,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {expanded ? "collapse" : "expand"}
            </button>
          )}
        </div>
 
        {/* Quick path pills when not expanded */}
        {!expanded && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, paddingLeft: 40 }}>
            {allPaths.map(p => (
              <Tag key={p.path}>{p.path}</Tag>
            ))}
          </div>
        )}
      </div>
 
      {/* Expanded path selector */}
      {expanded && (
        <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-secondary)" }}>
          {allPaths.map((p, i) => {
            const isPathSelected = selectedPaths.includes(p.path);
            // compute sublabel text without nested ternaries/template literals
            let sublabelText = p.label;
            if (repo.isContainer && p.dependencies && p.dependencies.length > 0) {
              const depCount = p.dependencies.length;
              const depList = p.dependencies.slice(0, 2).join(', ');
              const more = depCount > 2 ? ` +${depCount - 2}` : '';
              sublabelText = `${depCount} deps: ${depList}${more}`;
            }
            return (
              <div
                key={p.path}
                style={{
                  padding: "10px 14px 10px 40px",
                  borderBottom: i < allPaths.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none",
                  background: isPathSelected ? "rgba(29,158,117,0.04)" : "transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Checkbox
                    checked={isPathSelected}
                    onChange={() => onTogglePath(repo.id, p.path)}
                    label={<Tag>{p.path}</Tag>}
                    sublabel={sublabelText}
                  />
                </div>
                {/* Show all dependencies for container repos */}
                {repo.isContainer && isPathSelected && p.dependencies.length > 0 && (
                  <div style={{ marginTop: 8, marginLeft: 26 }}>
                    <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginBottom: 4 }}>Dependencies to update:</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {p.dependencies.map(d => (
                        <span key={d} style={{
                          fontSize: 10, padding: "2px 6px", borderRadius: 4,
                          background: "#E6F1FB", color: "#185FA5",
                          fontFamily: "var(--font-mono)",
                        }}>{d}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

RepoCard.propTypes = {
  repo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    isContainer: PropTypes.bool,
    packagePaths: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        dependencies: PropTypes.arrayOf(PropTypes.string),
        label: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  selected: PropTypes.bool,
  selectedPaths: PropTypes.arrayOf(PropTypes.string),
  onToggleRepo: PropTypes.func,
  onTogglePath: PropTypes.func,
};

RepoCard.defaultProps = {
  selected: false,
  selectedPaths: [],
  onToggleRepo: () => {},
  onTogglePath: () => {},
};

export default RepoCard;