export function stripLangFromPath(path: string, languageCodes: string[]): string {
  if (!path.startsWith('/')) path = '/' + path
  const regex = new RegExp(`^/(${languageCodes.join('|')})(/|$)`)
  path = path.replace(regex, '/')
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  return path
}
