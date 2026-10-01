/**
 * Project-wide links that are not content.
 *
 * `repoUrl` is the only thing to fill in once the repository is public, e.g.
 * 'https://github.com/<användare>/jaktlara'. Every GitHub link on the site is
 * derived from it, and while it is null those links render as "kommer snart"
 * instead of pointing nowhere.
 */
export const repoUrl: string | null = null

/** A path inside the repository, such as 'issues/new' or 'blob/main/CONTRIBUTING.md'. */
export function repoLink(path = ''): string | null {
  if (!repoUrl) return null
  const base = repoUrl.replace(/\/+$/, '')
  return path ? `${base}/${path.replace(/^\/+/, '')}` : base
}
