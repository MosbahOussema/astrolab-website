/** Source Impact entrance: m=1, k=66, c=20, y=40, opacity=0, delay=0. */
export function impactSpring(seconds: number) {
  const time = Math.max(0, seconds)
  const root = Math.sqrt(34)
  const slowRate = -10 + root
  const fastRate = -10 - root
  const slow = (-fastRate / (2 * root)) * Math.exp(slowRate * time)
  const fast = (slowRate / (2 * root)) * Math.exp(fastRate * time)
  return {
    remaining: slow + fast,
    velocity: slowRate * slow + fastRate * fast,
  }
}

/** Framer normalizes a tall reveal target against the viewport before applying its 50% threshold. */
export function impactEntryVisible(
  intersects: boolean,
  visibleHeight: number,
  elementHeight: number,
  viewportHeight: number,
) {
  if (!intersects) return false
  if (elementHeight === 0) return true
  return visibleHeight / Math.min(elementHeight, viewportHeight) >= 0.5
}
