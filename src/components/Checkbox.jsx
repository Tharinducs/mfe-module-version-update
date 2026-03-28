import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function Checkbox({ checked = false, onChange = () => {}, label, sublabel, indeterminate = false }) {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate && !checked);
    }
  }, [indeterminate, checked]);

  const showIndeterminate = indeterminate && !checked;

  const renderIcon = (() => {
    if (showIndeterminate) {
      return <div style={{ width: 8, height: 2, background: 'white', borderRadius: 1 }} />;
    }
    if (checked) {
      return (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return null;
  })();

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none', position: 'relative' }}>
      {/* native checkbox positioned over the visual box so it's keyboard-focusable and clickable */}
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e)}
        aria-checked={showIndeterminate ? 'mixed' : checked}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          position: 'absolute',
          left: 0,
          top: 2,
          width: 16,
          height: 16,
          margin: 0,
          padding: 0,
          opacity: 0,
          cursor: 'pointer',
        }}
      />

      <span
        aria-hidden
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          flexShrink: 0,
          marginTop: 2,
          // always show a clear border so the unchecked state is visible
          border: '1.5px solid var(--color-border-secondary)',
          background: checked || showIndeterminate ? '#1D9E75' : 'var(--color-background-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.12s',
          boxShadow: focused ? '0 0 0 4px rgba(29,158,117,0.08)' : undefined,
          borderColor: checked ? '#1D9E75' : 'var(--color-border-secondary)',
        }}
      >
        {renderIcon}
      </span>

      <div>
        <div style={{ fontSize: 13, color: 'var(--color-text-primary)', lineHeight: 1.4 }}>{label}</div>
        {sublabel && <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 1 }}>{sublabel}</div>}
      </div>
    </label>
  );
}

export default Checkbox;

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  sublabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  indeterminate: PropTypes.bool,
};

Checkbox.defaultProps = {
  checked: false,
  onChange: () => {},
  indeterminate: false,
  label: null,
  sublabel: null,
};