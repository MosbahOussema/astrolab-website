/** Measured line reveal: 200 ms, zero bounce, 75 ms between lines. */
export const caseTextMotion = { durationMs: 200, lineDelayMs: 75, nowrapLimit: 12 } as const

// Critical damping: displacement reaches .001 at the requested duration.
// The source duration-based spring snaps to rest at that endpoint.
const durationSeconds = caseTextMotion.durationMs / 1000
let frequency = 5 / durationSeconds
for (let iteration = 1; iteration < 12; iteration += 1) {
  const exponent = frequency * durationSeconds
  const envelope = Math.exp(-exponent)
  const residual = envelope * (1 + exponent) - 0.001
  frequency -= residual / (-frequency * durationSeconds ** 2 * envelope)
}

export function caseTextProgress(elapsedMs: number) {
  if (elapsedMs <= 0) return 0
  if (elapsedMs >= caseTextMotion.durationMs) return 1
  const exponent = (frequency * elapsedMs) / 1000
  return 1 - (1 + exponent) * Math.exp(-exponent)
}

// Native spring serialization in the observed runtime samples every ~30 ms.
const sampleCount = Math.max(2, Math.round(caseTextMotion.durationMs / 30))
export const caseTextEasing = `linear(${Array.from(
  { length: sampleCount },
  (_, index) =>
    Math.round(caseTextProgress((index * caseTextMotion.durationMs) / (sampleCount - 1)) * 10000) /
    10000,
).join(', ')})`

export function isBreakableRevealWord(word: string) {
  return word.length > caseTextMotion.nowrapLimit
}
