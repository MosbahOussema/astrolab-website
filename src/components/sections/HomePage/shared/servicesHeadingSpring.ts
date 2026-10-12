/** Source Services heading: mass 1, stiffness 66, damping 20, zero initial velocity. */
export function servicesHeadingSpring(seconds: number) {
  const t = Math.max(0, seconds)
  const root = Math.sqrt(34)
  const slowRate = -10 + root
  const fastRate = -10 - root
  const slow = (-fastRate / (2 * root)) * Math.exp(slowRate * t)
  const fast = (slowRate / (2 * root)) * Math.exp(fastRate * t)
  return {
    remaining: slow + fast,
    velocity: slowRate * slow + fastRate * fast,
  }
}
