export type TimedCycleOptions<State> = {
  clear: (handle: number) => void
  delay: (state: State) => number
  initial: State
  next: (state: State) => State
  now: () => number
  onState: (state: State) => void
  schedule: (callback: () => void, delay: number) => number
}

/** A timeout cycle that preserves the current state's remaining hold while paused. */
export function createTimedCycle<State>({
  clear,
  delay,
  initial,
  next,
  now,
  onState,
  schedule,
}: TimedCycleOptions<State>) {
  let disposed = false
  let handle: number | undefined
  let playing = false
  let remaining = delay(initial)
  let startedAt = 0
  let state = initial

  const cancel = (preserve: boolean) => {
    if (handle === undefined) return
    clear(handle)
    handle = undefined
    if (preserve) remaining = Math.max(0, remaining - Math.max(0, now() - startedAt))
    startedAt = 0
  }

  const queue = () => {
    if (disposed || !playing || handle !== undefined) return
    startedAt = now()
    handle = schedule(() => {
      handle = undefined
      startedAt = 0
      if (disposed || !playing) return
      state = next(state)
      onState(state)
      remaining = delay(state)
      queue()
    }, remaining)
  }

  return {
    dispose() {
      disposed = true
      playing = false
      cancel(false)
    },
    reset(nextState = initial, shouldPlay = false) {
      if (disposed) return
      cancel(false)
      state = nextState
      remaining = delay(state)
      playing = shouldPlay
      onState(state)
      queue()
    },
    setPlaying(nextPlaying: boolean) {
      if (disposed || playing === nextPlaying) return
      playing = nextPlaying
      if (playing) queue()
      else cancel(true)
    },
  }
}
