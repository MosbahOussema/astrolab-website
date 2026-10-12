export const smoothScrollDuration = 2.4

const smoothPaths = new Set([
  '/',
  '/eldowallet-use-case',
  '/talinty-ai-recruitment-platform',
  '/rawi-al-kotob-use-case',
  '/mazad-al-jomrok-use-case',
])

export function usesSmoothScroll(pathname: string) {
  return smoothPaths.has(pathname)
}

export function samePageAnchor(href: string, currentHref: string) {
  try {
    const current = new URL(currentHref)
    const target = new URL(href, current)
    if (
      target.origin !== current.origin ||
      target.pathname !== current.pathname ||
      target.search !== current.search ||
      !target.hash
    )
      return null
    return decodeURIComponent(target.hash.slice(1)) || null
  } catch {
    return null
  }
}
