export function validateVersion(v) {
  return /^\d+\.\d+\.\d+$/.test(v);
}

export async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export function formatErrorMessage(err) {
  return err?.message ?? String(err);
}
