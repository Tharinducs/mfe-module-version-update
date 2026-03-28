import PropTypes from 'prop-types';

function StepBar({ current }) {
    const steps = ["Configure", "Select repos", "Review & run"];
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }}>
            {steps.map((s, i) => {
                const done = i < current;
                const active = i === current;
                let labelColor = 'var(--color-text-tertiary)';
                if (active) {
                    labelColor = 'var(--color-text-primary)';
                } else if (done) {
                    labelColor = '#1D9E75';
                }
                return (
                    <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: 99,
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 11,
                                    fontWeight: 500,
                                    background: (done || active) ? "#1D9E75" : "var(--color-background-secondary)",
                                    color: (done || active) ? "white" : "var(--color-text-tertiary)",
                                    border: (done || active) ? "none" : "0.5px solid var(--color-border-secondary)",
                                    transition: "all 0.2s",
                                }}
                            >
                                {done ? (
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : i + 1}
                            </div>
                            <span style={{
                                fontSize: 12,
                                fontWeight: active ? 500 : 400,
                                color: labelColor,
                                whiteSpace: "nowrap",
                            }}>{s}</span>
                        </div>
                        {i < steps.length - 1 && (
                            <div style={{ flex: 1, height: 1, background: done ? "#1D9E75" : "var(--color-border-tertiary)", margin: "0 12px", transition: "background 0.3s" }} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

StepBar.propTypes = {
    current: PropTypes.number,
};

StepBar.defaultProps = {
    current: 0,
};

export default StepBar;