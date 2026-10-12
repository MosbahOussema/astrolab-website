/** Analytic mass-one spring, with displacement and velocity preserved on reversal. */
export function caseSpring(
  seconds: number,
  stiffness: number,
  damping: number,
  displacement = 1,
  velocity = 0,
) {
  const time = Math.max(0, seconds)
  const decay = damping / 2
  const discriminant = decay * decay - stiffness
  if (Math.abs(discriminant) < 1e-9) {
    const b = velocity + decay * displacement
    const envelope = Math.exp(-decay * time)
    return {
      displacement: (displacement + b * time) * envelope,
      velocity: (b - decay * (displacement + b * time)) * envelope,
    }
  }
  if (discriminant > 0) {
    const root = Math.sqrt(discriminant)
    const slow = -decay + root
    const fast = -decay - root
    const a = (velocity - fast * displacement) / (slow - fast)
    const b = displacement - a
    const first = a * Math.exp(slow * time)
    const second = b * Math.exp(fast * time)
    return { displacement: first + second, velocity: slow * first + fast * second }
  }
  const frequency = Math.sqrt(-discriminant)
  const b = (velocity + decay * displacement) / frequency
  const cosine = Math.cos(frequency * time)
  const sine = Math.sin(frequency * time)
  const envelope = Math.exp(-decay * time)
  const wave = displacement * cosine + b * sine
  return {
    displacement: envelope * wave,
    velocity: envelope * (frequency * (-displacement * sine + b * cosine) - decay * wave),
  }
}
