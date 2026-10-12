export type CaseHoverGesture = {
  hovered: boolean
  pressed: boolean
  pendingLeave: boolean
}

export type CaseHoverEvent =
  { type: 'enter' | 'down' | 'leave'; pointerType: string } | { type: 'release' | 'reset' }

export type CaseHoverTransition = {
  gesture: CaseHoverGesture
  target?: 1 | 1.2
}

export function createCaseHoverGesture(): CaseHoverGesture {
  return { hovered: false, pressed: false, pendingLeave: false }
}

/** Match Motion's hover gesture: touch is ignored and pressed leave waits for release. */
export function caseHoverTransition(
  gesture: CaseHoverGesture,
  event: CaseHoverEvent,
): CaseHoverTransition {
  if ('pointerType' in event && event.pointerType === 'touch') return { gesture }

  switch (event.type) {
    case 'enter':
      return {
        gesture: { ...gesture, hovered: true, pendingLeave: false },
        target: gesture.hovered ? undefined : 1.2,
      }
    case 'down':
      return gesture.hovered ? { gesture: { ...gesture, pressed: true } } : { gesture }
    case 'leave':
      if (!gesture.hovered) return { gesture }
      if (gesture.pressed) {
        return { gesture: { ...gesture, pendingLeave: true } }
      }
      return {
        gesture: { ...gesture, hovered: false, pendingLeave: false },
        target: 1,
      }
    case 'release':
      if (!gesture.pressed) return { gesture }
      if (gesture.pendingLeave) {
        return {
          gesture: { hovered: false, pressed: false, pendingLeave: false },
          target: 1,
        }
      }
      return { gesture: { ...gesture, pressed: false } }
    case 'reset':
      return { gesture: createCaseHoverGesture() }
  }
}
