export async function processPath(repoName, pathVal, pkgDef, versionFull, addLog, sleep) {
  addLog(`  Reading ${pathVal}...`, 'dim');
  await sleep(120);
  let updated = 0;
  if (pkgDef?.dependencies?.length > 0) {
    for (const dep of pkgDef.dependencies) {
      addLog(`  ${pathVal}  ${dep}  →  ${versionFull}`, 'success');
      updated += 1;
      // small pause to simulate work
      // eslint-disable-next-line no-await-in-loop
      await sleep(60);
    }
  } else {
    addLog(`  ${pathVal}  no matching deps — skipped`, 'warn');
  }
  return updated;
}

export async function runRepo(repo, opts) {
  const { selectedPaths, branchName, versionFull, runInstall, dryRun, createPR, addLog, sleep } = opts;
  const paths = selectedPaths[repo.id] ?? [];
  if (paths.length === 0) return null;

  addLog('', 'dim');
  addLog(`── ${repo.name}`, 'info');
  await sleep(200);
  addLog(`  Cloning ${repo.name}...`, 'dim');
  await sleep(300);
  addLog(`  Checking out ${branchName}...`, 'dim');
  await sleep(200);

  let updated = 0;
  for (const pathVal of paths) {
    const pkgDef = repo.packagePaths.find(p => p.path === pathVal);
    // eslint-disable-next-line no-await-in-loop
    updated += await processPath(repo.name, pathVal, pkgDef, versionFull, addLog, sleep);
  }

  if (runInstall) {
    addLog(`  Running npm install...`, 'dim');
    await sleep(400);
  }

  if (dryRun) {
    addLog(`  [dry-run] Would commit & ${createPR ? 'open PR' : 'push'}`, 'warn');
  } else {
    addLog(`  Committing: chore(release): bump deps to ${versionFull} [${branchName}]`, 'dim');
    await sleep(180);
    if (createPR) addLog(`  PR created: chore/release-sync-${branchName.replace('/', '-')}`, 'success');
    else addLog(`  Pushed to origin/${branchName}`, 'success');
  }

  await sleep(120);
  return { repo: repo.name, updated, paths: paths.length, status: 'success' };
}
