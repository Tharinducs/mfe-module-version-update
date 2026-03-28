import React from 'react';
import PropTypes from 'prop-types';

function LogViewer({ logs }) {
  const colorMap = { info: 'var(--color-text-secondary)', success: '#1D9E75', error: '#D85A30', warn: '#BA7517', dim: 'var(--color-text-tertiary)' };
  return (
    <div style={{
      background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)",
      border: "0.5px solid var(--color-border-tertiary)", padding: "12px 14px",
      fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.7,
      maxHeight: 320, overflowY: "auto",
    }}>
      {logs.length === 0 && <span style={{ color: 'var(--color-text-tertiary)' }}>Waiting to run…</span>}
      {logs.map((l, i) => (
        <div key={l.id ?? `${l.time}-${i}`} style={{ color: colorMap[l.type] ?? 'var(--color-text-secondary)' }}>
          <span style={{ color: 'var(--color-text-tertiary)', marginRight: 8 }}>{l.time}</span>
          {l.msg}
        </div>
      ))}
    </div>
  );
}

LogViewer.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string,
      type: PropTypes.string,
      msg: PropTypes.node,
    })
  ),
};

LogViewer.defaultProps = {
  logs: [],
};

export default LogViewer;