export function cloudEntryOffset(direction: string) {
  return direction === 'rtl' ? 100 : -100
}

export function cloudPlaybackState({
  hidden,
  inViewport,
  reduced,
}: {
  hidden: boolean
  inViewport: boolean
  reduced: boolean
}): 'paused' | 'running' {
  return !reduced && inViewport && !hidden ? 'running' : 'paused'
}
