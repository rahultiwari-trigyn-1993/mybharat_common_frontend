/** GitHub org/user for jsDelivr dev CDN (see docs/github-cdn-publish.md). */
export const MYBHARAT_SHELL_GITHUB_USER = 'rahultiwari-trigyn-1993';

/** Repo name on GitHub — must match the remote you push `dist/shell/` to. */
export const MYBHARAT_SHELL_GITHUB_REPO = 'mybharat_common_frontend';

/**
 * jsDelivr base for shell assets from GitHub (pin tag in production).
 * @example `https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.163/dist/shell`
 */
export function mybharatShellJsdelivrBase(version: string): string {
  const tag = version.startsWith('v') ? version : `v${version}`;
  return `https://cdn.jsdelivr.net/gh/${MYBHARAT_SHELL_GITHUB_USER}/${MYBHARAT_SHELL_GITHUB_REPO}@${tag}/dist/shell`;
}
