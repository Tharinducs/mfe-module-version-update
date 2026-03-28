import React, { useState } from 'react';
import StepConfig from './components/StepConfig';
import StepSelectRepos from './components/StepSelectRepos';
import StepReviewRun from './components/StepReviewRun';
import { RELEASE_TYPES, REPOS } from './constants';
import { runRepo } from './lib/runner';
import { sleep, formatErrorMessage } from './lib/helpers';

function App() {
  const [step, setStep] = useState(0);

  // Step 1 state
  const [country, setCountry] = useState('');
  const [releaseType, setReleaseType] = useState('');
  const [version, setVersion] = useState('');
  const [versionError, setVersionError] = useState('');
  const [dryRun, setDryRun] = useState(false);
  const [createPR, setCreatePR] = useState(false);
  const [runInstall, setRunInstall] = useState(false);

  // Step 2 state
  const [selectedPaths, setSelectedPaths] = useState({});

  // Step 3 state
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState([]);

  const versionFull = version && country ? `${version}-${country}` : version || '';
  const branchName = country && releaseType ? `${releaseType}/${country}` : '';

  

  function handleToggleRepo(repoId) {
    const repo = REPOS.find(r => r.id === repoId);
    const current = selectedPaths[repoId] ?? [];
    const allPaths = repo.packagePaths.map(p => p.path);
    const isAll = current.length === allPaths.length;
    setSelectedPaths(prev => ({ ...prev, [repoId]: isAll ? [] : allPaths }));
  }

  function handleTogglePath(repoId, pathVal) {
    const current = selectedPaths[repoId] ?? [];
    const next = current.includes(pathVal) ? current.filter(p => p !== pathVal) : [...current, pathVal];
    setSelectedPaths(prev => ({ ...prev, [repoId]: next }));
  }

  function selectAll() {
    const next = {};
    REPOS.forEach(r => { next[r.id] = r.packagePaths.map(p => p.path); });
    setSelectedPaths(next);
  }
  function clearAll() { setSelectedPaths({}); }

  function addLog(msg, type = 'info') {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLogs(prev => [...prev, { msg, type, time }]);
  }

  // processRepo has been extracted to src/lib/runner.js (runRepo) to reduce component complexity

  async function handleRun() {
    setRunning(true);
    setDone(false);
    setLogs([]);
    setResults([]);
    addLog('══════════════════════════════════════', 'dim');
    addLog(`mfe-release-sync  ${dryRun ? '[DRY RUN]' : ''}`, 'info');
    addLog(`Country: ${country}  |  Version: ${versionFull}  |  Branch: ${branchName}`, 'dim');
    addLog('══════════════════════════════════════', 'dim');
    await sleep(200);

    const repoResults = [];
    for (const repo of REPOS) {
      // eslint-disable-next-line no-await-in-loop
      try {
        const res = await runRepo(repo, {
          selectedPaths,
          branchName,
          versionFull,
          runInstall,
          dryRun,
          createPR,
          addLog,
          sleep,
        });
        if (res) repoResults.push(res);
      } catch (err) {
        // keep processing other repos, but log the error
        const msg = formatErrorMessage(err);
        addLog(`Error processing ${repo.name}: ${msg}`, 'error');
      }
    }

    addLog('', 'dim');
    addLog('══════════════════════════════════════', 'dim');
    addLog(`Done. ${repoResults.length} repos processed  |  ${repoResults.reduce((a, b) => a + b.updated, 0)} deps updated`, 'success');
    setResults(repoResults);
    setRunning(false);
    setDone(true);
  }

  const releaseTypeDef = RELEASE_TYPES.find(r => r.value === releaseType) || { color: '#333', bg: 'transparent' };

  // Render per-step using smaller components to reduce App complexity
  if (step === 0) {
    return (
      <StepConfig
        country={country}
        setCountry={setCountry}
        releaseType={releaseType}
        setReleaseType={setReleaseType}
        version={version}
        setVersion={setVersion}
        versionError={versionError}
        setVersionError={setVersionError}
        dryRun={dryRun}
        setDryRun={setDryRun}
        createPR={createPR}
        setCreatePR={setCreatePR}
        runInstall={runInstall}
        setRunInstall={setRunInstall}
        versionFull={versionFull}
        setStep={setStep}
      />
    );
  }

  if (step === 1) {
    return (
      <StepSelectRepos
        selectedPaths={selectedPaths}
        onToggleRepo={handleToggleRepo}
        onTogglePath={handleTogglePath}
        selectAll={selectAll}
        clearAll={clearAll}
        setStep={setStep}
      />
    );
  }

  return (
    <StepReviewRun
      releaseTypeDef={releaseTypeDef}
      versionFull={versionFull}
      branchName={branchName}
      dryRun={dryRun}
      createPR={createPR}
      runInstall={runInstall}
      selectedPaths={selectedPaths}
      logs={logs}
      results={results}
      done={done}
      running={running}
      handleRun={handleRun}
      setStep={setStep}
      setDone={setDone}
      setLogs={setLogs}
      setResults={setResults}
      setCountry={setCountry}
      setReleaseType={setReleaseType}
      setVersion={setVersion}
      setSelectedPaths={setSelectedPaths}
    />
  );
}

export default App;