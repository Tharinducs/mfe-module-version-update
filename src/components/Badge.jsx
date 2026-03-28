import PropTypes from 'prop-types';

function Badge({ children, color, bg }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 500,
        padding: '2px 8px',
        borderRadius: 99,
        background: bg,
        color,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  bg: PropTypes.string,
};

Badge.defaultProps = {
  children: null,
  color: 'inherit',
  bg: 'transparent',
};

export default Badge;