import React from 'react';
import PropTypes from 'prop-types';
import StepBar from './StepBar';
import Badge from './Badge';
import Tag from './Tag';
import LogViewer from './LogViewer';
import { REPOS, COUNTRIES } from '../constants';

export default function StepReviewRun(props) {
  const { releaseTypeDef, versionFull, branchName, dryRun, createPR, runInstall, selectedPaths, logs, results, done, running, handleRun, setStep, setDone, setLogs, setResults, setCountry, setReleaseType, setVersion, setSelectedPaths } = props;

  const selectedRepoCount = Object.values(selectedPaths).filter(p => p.length > 0).length;
  const totalPathCount = Object.values(selectedPaths).reduce((a, b) => a + b.length, 0);

  let actionLabel;
  if (running) actionLabel = 'Running…';
  else if (done) actionLabel = 'Done';
  else actionLabel = dryRun ? 'Run dry run' : 'Run sync';

  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 16px' }}>
        <StepBar current={2} />

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 4 }}>Review & run</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Confirm the release configuration before executing.</div>
        </div>

        <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
            {[ { label: 'Country', value: `${COUNTRIES.find(c => c.code === (branchName.split('/')[1] || ''))?.label} (${branchName.split('/')[1] || ''})` }, { label: 'Release type', value: <Badge color={releaseTypeDef.color} bg={releaseTypeDef.bg}>{releaseTypeDef.value}</Badge> }, { label: 'Version', value: <Tag>{versionFull}</Tag> }, { label: 'Branch', value: <Tag>{branchName}</Tag> } ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '0.5px solid var(--color-border-tertiary)', display: 'flex', gap: 12 }}>
            {dryRun && <Badge color="#BA7517" bg="#FAEEDA">dry run</Badge>}
            {createPR && <Badge color="#185FA5" bg="#E6F1FB">create PR</Badge>}
            {runInstall && <Badge color="#3B6D11" bg="#EAF3DE">npm install</Badge>}
            {!dryRun && !createPR && !runInstall && <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>direct push</span>}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 8 }}>{selectedRepoCount} repositories  ·  {totalPathCount} package.json paths</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {REPOS.filter(r => (selectedPaths[r.id] ?? []).length > 0).map(repo => {
              const paths = selectedPaths[repo.id];
              return (
                <div key={repo.id} style={{ background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', padding: '8px 12px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
                    <rect x="1" y="1" width="12" height="12" rx="2" stroke="var(--color-text-tertiary)" strokeWidth="1" />
                    <path d="M4 5h6M4 7.5h4" stroke="var(--color-text-tertiary)" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}>{repo.name}</span>
                    {repo.isContainer && <span style={{ marginLeft: 6 }}><Badge color="#185FA5" bg="#E6F1FB">container</Badge></span>}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>{paths.map(p => <Tag key={p}>{p}</Tag>)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Output log</div>
          <LogViewer logs={logs} />
        </div>

        {done && results.length > 0 && (
          <div style={{ background: '#E1F5EE', border: '0.5px solid #9FE1CB', borderRadius: 'var(--border-radius-md)', padding: '10px 14px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#0F6E56', marginBottom: 6 }}>Run complete</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ fontSize: 12, color: '#1D9E75' }}>✔ {results.length} repos processed</span>
              <span style={{ fontSize: 12, color: '#1D9E75' }}>✔ {results.reduce((a, b) => a + b.updated, 0)} dependencies updated</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => { setStep(1); setDone(false); setLogs([]); setResults([]); }} disabled={running} style={{ fontSize: 12, padding: '5px 12px' }}>← Back</button>
          <div style={{ display: 'flex', gap: 10 }}>
            {done && (
              <button onClick={() => { setStep(0); setDone(false); setLogs([]); setResults([]); setCountry(''); setReleaseType(''); setVersion(''); setSelectedPaths({}); }} style={{ fontSize: 12, padding: '5px 12px' }}>New run</button>
            )}
            <button onClick={handleRun} disabled={running || done} style={{ opacity: running || done ? 0.5 : 1, background: dryRun ? '#FAEEDA' : '#1D9E75', color: dryRun ? '#BA7517' : 'white', border: 'none', borderRadius: 'var(--border-radius-md)', padding: '8px 20px', fontSize: 13, fontWeight: 500, cursor: running || done ? 'not-allowed' : 'pointer' }}>{actionLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

StepReviewRun.propTypes = {
  releaseTypeDef: PropTypes.object.isRequired,
  versionFull: PropTypes.string.isRequired,
  branchName: PropTypes.string.isRequired,
  dryRun: PropTypes.bool.isRequired,
  createPR: PropTypes.bool.isRequired,
  runInstall: PropTypes.bool.isRequired,
  selectedPaths: PropTypes.object.isRequired,
  logs: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
  done: PropTypes.bool.isRequired,
  running: PropTypes.bool.isRequired,
  handleRun: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setDone: PropTypes.func.isRequired,
  setLogs: PropTypes.func.isRequired,
  setResults: PropTypes.func.isRequired,
  setCountry: PropTypes.func.isRequired,
  setReleaseType: PropTypes.func.isRequired,
  setVersion: PropTypes.func.isRequired,
  setSelectedPaths: PropTypes.func.isRequired,
};

