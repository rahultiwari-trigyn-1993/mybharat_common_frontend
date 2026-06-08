/** GitHub org/user for shell CDN (see docs/github-cdn-publish.md). */
export const MYBHARAT_SHELL_GITHUB_USER = 'rahultiwari-trigyn-1993';

/** Repo name on GitHub — must match the remote you push `dist/shell/` to. */
export const MYBHARAT_SHELL_GITHUB_REPO = 'mybharat_common_frontend';

/** Git tag for pinned shell CDN. */
export const MYBHARAT_SHELL_GITHUB_TAG = 'v1.0.194';

/**
 * jsDelivr base — use for browser embeds (correct MIME types; raw GitHub triggers ORB).
 * @example `https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.165/dist/shell`
 */
export function mybharatShellJsdelivrBase(versionOrTag: string = MYBHARAT_SHELL_GITHUB_TAG): string {
  const tag = versionOrTag.startsWith('v') ? versionOrTag : `v${versionOrTag}`;
  return `https://cdn.jsdelivr.net/gh/${MYBHARAT_SHELL_GITHUB_USER}/${MYBHARAT_SHELL_GITHUB_REPO}@${tag}/dist/shell`;
}

/** jsDelivr shell JS URL. */
export function mybharatShellJsdelivrJs(versionOrTag: string = MYBHARAT_SHELL_GITHUB_TAG): string {
  return `${mybharatShellJsdelivrBase(versionOrTag)}/shell.js`;
}

/**
 * jsDelivr shell CSS URL.
 * File is `mybharat-shell.css` (not `shell.css`) — jsDelivr 404 on `dist/shell/shell.css`.
 */
export function mybharatShellJsdelivrCss(versionOrTag: string = MYBHARAT_SHELL_GITHUB_TAG): string {
  return `${mybharatShellJsdelivrBase(versionOrTag)}/mybharat-shell.css`;
}
