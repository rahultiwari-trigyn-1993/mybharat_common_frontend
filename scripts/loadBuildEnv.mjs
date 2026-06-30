import { existsSync, readFileSync } from 'node:fs';

function loadDotEnv(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function parseGithubRepo(url) {
  const match = String(url || '').match(/github\.com[/:]([^/]+)\/([^/.]+)/i);
  if (!match) return { githubUser: '', githubRepo: '' };
  return { githubUser: match[1], githubRepo: match[2] };
}

/** jsDelivr metadata for dist/shell/manifest.json — LOCAL TESTING ONLY (no S3/CDN access). */
export function getShellManifestGithub(pkg) {
  const env = { ...loadDotEnv('.env'), ...process.env };
  const fromRepo = parseGithubRepo(pkg.repository?.url);
  return {
    githubUser: env.MYBHARAT_SHELL_GITHUB_USER || fromRepo.githubUser,
    githubRepo: env.MYBHARAT_SHELL_GITHUB_REPO || fromRepo.githubRepo,
    tag: env.MYBHARAT_SHELL_GITHUB_TAG || `v${pkg.version}`,
  };
}
