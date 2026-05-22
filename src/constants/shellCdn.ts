/** GitHub org/user for shell CDN (see docs/github-cdn-publish.md). */
export const MYBHARAT_SHELL_GITHUB_USER = 'rahultiwari-trigyn-1993';

/** Repo name on GitHub — must match the remote you push `dist/shell/` to. */
export const MYBHARAT_SHELL_GITHUB_REPO = 'mybharat_common_frontend';

/** Git tag for pinned shell CDN. */
export const MYBHARAT_SHELL_GITHUB_TAG = 'v1.0.164';

export function mybharatShellRawGithubBase(versionOrTag: string = MYBHARAT_SHELL_GITHUB_TAG): string {
  const tag = versionOrTag.startsWith('v') ? versionOrTag : `v${versionOrTag}`;
  return `https://raw.githubusercontent.com/${MYBHARAT_SHELL_GITHUB_USER}/${MYBHARAT_SHELL_GITHUB_REPO}/${tag}/dist/shell`;
}

/** Raw GitHub URL for shell CSS. */
export function mybharatShellRawGithubCss(versionOrTag: string = MYBHARAT_SHELL_GITHUB_TAG): string {
  return `${mybharatShellRawGithubBase(versionOrTag)}/shell.css`;
}

/** Raw GitHub URL for shell JS. */
export function mybharatShellRawGithubJs(versionOrTag: string = MYBHARAT_SHELL_GITHUB_TAG): string {
  return `${mybharatShellRawGithubBase(versionOrTag)}/shell.js`;
}
