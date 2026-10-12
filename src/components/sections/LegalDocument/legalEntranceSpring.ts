// Reference legal entry: mass1, stiffness150, damping60, zero initial velocity.
export function legalEntranceSpring(seconds: number) {
  const time = Math.max(0, seconds)
  const discriminant = Math.sqrt(60 ** 2 - 4 * 150)
  const slow = (-60 + discriminant) / 2
  const fast = (-60 - discriminant) / 2
  const slowWeight = -fast / (slow - fast)
  const fastWeight = slow / (slow - fast)
  const slowTerm = slowWeight * Math.exp(slow * time)
  const fastTerm = fastWeight * Math.exp(fast * time)
  return {
    remaining: slowTerm + fastTerm,
    velocity: slow * slowTerm + fast * fastTerm,
  }
}
