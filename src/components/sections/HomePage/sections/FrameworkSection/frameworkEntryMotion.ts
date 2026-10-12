export type FrameworkEntryKind = 'direction' | 'mapping' | 'execution'
export type FrameworkEntryDirection = 'ltr' | 'rtl'

export const FRAMEWORK_ENTRY_KINDS = ['direction', 'mapping', 'execution'] as const

export const FRAMEWORK_ENTRY_SPRINGS = {
  direction: {
    axis: 'block',
    damping: 20,
    distance: 40,
    mass: 1,
    stiffness: 66,
  },
  execution: {
    axis: 'inline-end',
    damping: 45,
    distance: 100,
    mass: 1,
    stiffness: 200,
  },
} as const

export function frameworkEntryKind(index: number): FrameworkEntryKind {
  return FRAMEWORK_ENTRY_KINDS[index] ?? 'direction'
}

export function frameworkEntrySpring(kind: FrameworkEntryKind, seconds: number) {
  if (kind === 'mapping') return { remaining: 0, velocity: 0 }

  const { damping, mass, stiffness } = FRAMEWORK_ENTRY_SPRINGS[kind]
  const time = Math.max(0, seconds)
  const discriminant = Math.sqrt(damping * damping - 4 * mass * stiffness)
  const slowRate = (-damping + discriminant) / (2 * mass)
  const fastRate = (-damping - discriminant) / (2 * mass)
  const denominator = slowRate - fastRate
  const slow = (-fastRate / denominator) * Math.exp(slowRate * time)
  const fast = (slowRate / denominator) * Math.exp(fastRate * time)

  return {
    remaining: slow + fast,
    velocity: slowRate * slow + fastRate * fast,
  }
}

export function frameworkEntryTransform(
  kind: FrameworkEntryKind,
  remaining: number,
  direction: FrameworkEntryDirection,
) {
  if (kind === 'mapping') return 'none'
  const { axis, distance } = FRAMEWORK_ENTRY_SPRINGS[kind]
  if (axis === 'block') return `translate3d(0, ${distance * remaining}px, 0)`
  const inlineSign = direction === 'rtl' ? -1 : 1
  return `translate3d(${inlineSign * distance * remaining}px, 0, 0)`
}

/** Framer normalizes a tall reveal target against the viewport before its 50% threshold. */
export function frameworkEntryVisible(
  intersects: boolean,
  visibleHeight: number,
  elementHeight: number,
  viewportHeight: number,
) {
  if (!intersects) return false
  if (elementHeight === 0) return true
  return visibleHeight / Math.min(elementHeight, viewportHeight) >= 0.5
}

export function frameworkEntryPlaybackState({
  active,
  hidden,
  reduced,
}: {
  active: boolean
  hidden: boolean
  reduced: boolean
}): 'finished' | 'paused' | 'running' | 'waiting' {
  if (reduced) return 'finished'
  if (!active) return 'waiting'
  return hidden ? 'paused' : 'running'
}
