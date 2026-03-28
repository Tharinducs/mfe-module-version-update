import React from 'react';
import PropTypes from 'prop-types';
import StepBar from './StepBar';
import RepoCard from './RepoCard';
import { REPOS } from '../constants';

export default function StepSelectRepos(props) {
  const { selectedPaths, onToggleRepo, onTogglePath, selectAll, clearAll, setStep } = props;

  const selectedRepoCount = Object.values(selectedPaths).filter(p => p.length > 0).length;
  const totalPathCount = Object.values(selectedPaths).reduce((a, b) => a + b.length, 0);

  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 16px' }}>
        <StepBar current={1} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 4 }}>Select repositories</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
              Choose which repos and package.json paths to update.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={selectAll} style={{ fontSize: 12, padding: '5px 12px' }}>Select all</button>
            <button onClick={clearAll} style={{ fontSize: 12, padding: '5px 12px' }}>Clear</button>
          </div>
        </div>

        {selectedRepoCount > 0 && (
          <div style={{ marginBottom: 14, padding: '6px 12px', borderRadius: 99, background: '#E1F5EE', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6.5L4.5 9L10 3" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 12, color: '#0F6E56', fontWeight: 500 }}>{selectedRepoCount} {selectedRepoCount === 1 ? 'repo' : 'repos'} selected  ·  {totalPathCount} package.json paths</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {REPOS.map(repo => (
            <RepoCard key={repo.id} repo={repo} selected={(selectedPaths[repo.id] ?? []).length > 0} selectedPaths={selectedPaths[repo.id] ?? []} onToggleRepo={onToggleRepo} onTogglePath={onTogglePath} />
          ))}
        </div>

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => setStep(0)} style={{ fontSize: 12, padding: '5px 12px' }}>← Back</button>
          <button onClick={() => setStep(2)} disabled={selectedRepoCount === 0} style={{ opacity: selectedRepoCount > 0 ? 1 : 0.4 }}>Review & run →</button>
        </div>
      </div>
    </div>
  );
}

StepSelectRepos.propTypes = {
  selectedPaths: PropTypes.object.isRequired,
  onToggleRepo: PropTypes.func.isRequired,
  onTogglePath: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  clearAll: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
};
