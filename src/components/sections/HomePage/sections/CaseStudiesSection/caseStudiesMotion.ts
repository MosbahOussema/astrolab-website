export type CaseStudiesRevealKind = 'card' | 'heading'

export const CASE_STUDIES_SPRINGS = {
  card: { damping: 70, distance: 50, mass: 1, stiffness: 320 },
  heading: { damping: 20, distance: 40, mass: 1, stiffness: 66 },
} as const

/** Exact mass-one over-damped source springs, starting at rest. */
export function caseStudiesSpring(kind: CaseStudiesRevealKind, seconds: number) {
  const { damping, mass, stiffness } = CASE_STUDIES_SPRINGS[kind]
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

/** Framer normalizes tall targets against the viewport before its 50% threshold. */
export function caseStudiesEntryVisible(
  intersects: boolean,
  visibleHeight: number,
  elementHeight: number,
  viewportHeight: number,
) {
  if (!intersects) return false
  if (elementHeight === 0) return true
  return visibleHeight / Math.min(elementHeight, viewportHeight) >= 0.5
}

export function caseStudiesPlaybackState({
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
