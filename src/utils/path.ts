const BASE = import.meta.env.BASE_URL;

/** Prepend the deployment base path to an absolute path.
 *  e.g. assetPath("/images/logo.png") => "/tiancheng-survey/images/logo.png"
 */
export function assetPath(path: string): string {
  if (path.startsWith(BASE)) return path;
  return `${BASE}${path.replace(/^\//, "")}`;
}
