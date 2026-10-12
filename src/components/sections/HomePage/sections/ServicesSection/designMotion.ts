export type DesignStage = 'default' | 'swapped' | 'return'

export const DESIGN_CURSOR_DURATION_MS = 3000

const MIN_DURATION_SECONDS = 0.01
const MAX_DURATION_SECONDS = 10
const MIN_DAMPING_RATIO = 0.05
const MAX_DAMPING_RATIO = 1
const SPRING_EPSILON = 0.001
const NEWTON_ITERATIONS = 11

export function nextDesignStage(stage: DesignStage): DesignStage {
  if (stage === 'default') return 'swapped'
  if (stage === 'swapped') return 'return'
  return 'default'
}

export function designStageDelay(stage: DesignStage) {
  if (stage === 'default') return 500
  if (stage === 'swapped') return 3500
  return 2000
}

export function designStageEndpoint(stage: DesignStage): 'default' | 'swapped' {
  return stage === 'swapped' ? 'swapped' : 'default'
}

/** Motion's duration/bounce spring resolver, kept in seconds at the public boundary. */
export function resolveDurationSpring(durationSeconds: number, bounce: number, mass = 1) {
  const duration = Math.min(MAX_DURATION_SECONDS, Math.max(MIN_DURATION_SECONDS, durationSeconds))
  const dampingRatio = Math.min(MAX_DAMPING_RATIO, Math.max(MIN_DAMPING_RATIO, 1 - bounce))

  const envelope = (angularFrequency: number) => {
    if (dampingRatio < 1) {
      const decay = angularFrequency * dampingRatio
      const angular = angularFrequency * Math.sqrt(1 - dampingRatio * dampingRatio)
      return SPRING_EPSILON - ((decay - 0) / angular) * Math.exp(-decay * duration)
    }
    const decay = Math.exp(-angularFrequency * duration)
    return -SPRING_EPSILON + decay * (angularFrequency * duration + 1)
  }

  const derivative = (angularFrequency: number) => {
    if (dampingRatio < 1) {
      const decay = angularFrequency * dampingRatio * duration
      const dampingSquared =
        dampingRatio * dampingRatio * angularFrequency * angularFrequency * duration
      const denominator =
        angularFrequency * angularFrequency * Math.sqrt(1 - dampingRatio * dampingRatio)
      return (
        (-envelope(angularFrequency) + SPRING_EPSILON > 0 ? -1 : 1) *
        ((-dampingSquared * Math.exp(-decay)) / denominator)
      )
    }
    return Math.exp(-angularFrequency * duration) * -angularFrequency * duration * duration
  }

  let angularFrequency = 5 / duration
  for (let iteration = 0; iteration < NEWTON_ITERATIONS; iteration += 1) {
    angularFrequency -= envelope(angularFrequency) / derivative(angularFrequency)
  }

  if (!Number.isFinite(angularFrequency)) {
    return { stiffness: 100, damping: 10, mass }
  }

  const stiffness = angularFrequency * angularFrequency * mass
  return {
    stiffness,
    damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
    mass,
  }
}

export const DESIGN_CURSOR_SPRING = resolveDurationSpring(3, 0.2)

export function designEntryVisible(
  intersects: boolean,
  visibleHeight: number,
  elementHeight: number,
  viewportHeight: number,
) {
  if (!intersects) return false
  if (elementHeight === 0) return true
  return visibleHeight / Math.min(elementHeight, viewportHeight) >= 0.5
}

type TimerHandle = number

export function createDesignCycle({
  clear,
  onStage,
  schedule,
}: {
  clear: (handle: TimerHandle) => void
  onStage: (stage: DesignStage) => void
  schedule: (callback: () => void, delay: number) => TimerHandle
}) {
  let stage: DesignStage = 'default'
  let timer: TimerHandle | undefined
  let disposed = false

  const cancel = () => {
    if (timer === undefined) return
    clear(timer)
    timer = undefined
  }

  const queue = () => {
    timer = schedule(() => {
      timer = undefined
      if (disposed) return
      stage = nextDesignStage(stage)
      onStage(stage)
      queue()
    }, designStageDelay(stage))
  }

  return {
    sync({ reduced, tablet }: { reduced: boolean; tablet: boolean }) {
      if (disposed) return
      cancel()
      stage = 'default'
      onStage(stage)
      if (!reduced && !tablet) queue()
    },
    dispose() {
      disposed = true
      cancel()
    },
  }
}
