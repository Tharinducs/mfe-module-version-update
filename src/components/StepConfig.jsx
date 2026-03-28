import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import Tag from './Tag';
import StepBar from './StepBar';
import { COUNTRIES, RELEASE_TYPES } from '../constants';

export default function StepConfig(props) {
  const {
    country, setCountry, releaseType, setReleaseType, version, setVersion, versionError, setVersionError,
    dryRun, setDryRun, createPR, setCreatePR, runInstall, setRunInstall, versionFull, setStep
  } = props;

  const step1Valid = country && releaseType && version && /^\d+\.\d+\.\d+$/.test(version);

  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 16px' }}>
        <StepBar current={0} />

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 4 }}>Release configuration</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Set the country, release type and version for this sync run.</div>
        </div>

        <div style={{ display: 'grid', gap: 20 }}>
          <div>
            <label htmlFor="country-select" style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>Country</label>
            <select id="country-select" value={country} onChange={e => setCountry(e.target.value)} style={{ width: '100%', maxWidth: 320 }}>
              <option value="">Select country…</option>
              {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.label} ({c.code})</option>)}
            </select>
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 8 }}>Release type</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {RELEASE_TYPES.map(rt => (
                <button key={rt.value} type="button" aria-pressed={releaseType === rt.value} onClick={() => setReleaseType(rt.value)} style={{ padding: '10px 18px', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', border: releaseType === rt.value ? `1.5px solid ${rt.color}` : '0.5px solid var(--color-border-secondary)', background: releaseType === rt.value ? rt.bg : 'var(--color-background-primary)', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 99, background: rt.color }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: releaseType === rt.value ? rt.color : 'var(--color-text-primary)' }}>{rt.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}>{rt.desc}{country || '<country>'}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="version-input" style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>Version <span style={{ fontWeight: 400, color: 'var(--color-text-tertiary)' }}>(semver, e.g. 28.3.0)</span></label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <input id="version-input" type="text" placeholder="28.3.0" value={version} onChange={e => { setVersion(e.target.value); setVersionError(e.target.value && !/^\d+\.\d+\.\d+$/.test(e.target.value) ? 'Must be x.y.z format' : ''); }} style={{ width: 160, borderColor: versionError ? 'var(--color-border-danger)' : undefined }} />
              {versionFull && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>→ full version:</span>
                  <Tag>{versionFull}</Tag>
                </div>
              )}
            </div>
            {versionError && <div style={{ fontSize: 11, color: 'var(--color-text-danger)', marginTop: 4 }}>{versionError}</div>}
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 10 }}>Options</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Checkbox checked={dryRun} onChange={() => setDryRun(v => !v)} label="Dry run" sublabel="Preview changes without committing or pushing" />
              <Checkbox checked={createPR} onChange={() => setCreatePR(v => !v)} label="Create pull request" sublabel="Open a PR instead of pushing directly to the branch" />
              <Checkbox checked={runInstall} onChange={() => setRunInstall(v => !v)} label="Run npm install" sublabel="Refresh node_modules after updating package.json" />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => setStep(1)} disabled={!step1Valid} style={{ opacity: step1Valid ? 1 : 0.4 }}>Next: select repos →</button>
        </div>
      </div>
    </div>
  );
}

StepConfig.propTypes = {
  country: PropTypes.string.isRequired,
  setCountry: PropTypes.func.isRequired,
  releaseType: PropTypes.string.isRequired,
  setReleaseType: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired,
  setVersion: PropTypes.func.isRequired,
  versionError: PropTypes.string,
  setVersionError: PropTypes.func.isRequired,
  dryRun: PropTypes.bool.isRequired,
  setDryRun: PropTypes.func.isRequired,
  createPR: PropTypes.bool.isRequired,
  setCreatePR: PropTypes.func.isRequired,
  runInstall: PropTypes.bool.isRequired,
  setRunInstall: PropTypes.func.isRequired,
  versionFull: PropTypes.string,
  setStep: PropTypes.func.isRequired,
};
