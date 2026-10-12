export const AUTOMATION_TRAVEL_MS = 2000
export const AUTOMATION_PAUSE_MS = 300

// The public reference uses cubic-bezier(.95, .04, .44, 1).
// Solve x(t) first: evaluating y at wall-clock progress changes the speed curve.
export function automationEase(progress: number): number {
  const x = Math.min(1, Math.max(0, progress))
  if (x === 0 || x === 1) return x
  let low = 0
  let high = 1
  for (let iteration = 0; iteration < 30; iteration++) {
    const t = (low + high) / 2
    const sample = 3 * (1 - t) ** 2 * t * 0.95 + 3 * (1 - t) * t ** 2 * 0.44 + t ** 3
    if (sample < x) low = t
    else high = t
  }
  const t = (low + high) / 2
  return 3 * (1 - t) ** 2 * t * 0.04 + 3 * (1 - t) * t ** 2 + t ** 3
}

export function automationShimmerFrame(elapsedMs: number) {
  const cycleMs = AUTOMATION_TRAVEL_MS + AUTOMATION_PAUSE_MS
  const phase = Math.max(0, elapsedMs) % cycleMs
  const progress = automationEase(Math.min(phase / AUTOMATION_TRAVEL_MS, 1))
  const opacity = progress <= 0.01 ? progress / 0.01 : progress >= 0.99 ? (1 - progress) / 0.01 : 1
  return { forward: 160 - 130 * progress, reverse: 30 + 130 * progress, opacity }
}
