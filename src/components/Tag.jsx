import PropTypes from 'prop-types';

function Tag({ children }) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 500,
        padding: '2px 6px',
        borderRadius: 4,
        background: 'var(--color-background-secondary)',
        color: 'var(--color-text-secondary)',
        border: '0.5px solid var(--color-border-tertiary)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.01em',
      }}
    >
      {children}
    </span>
  );
}

Tag.propTypes = {
  children: PropTypes.node,
};

Tag.defaultProps = {
  children: null,
};

export default Tag;