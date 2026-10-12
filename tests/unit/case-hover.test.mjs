import assert from 'node:assert/strict'
import test from 'node:test'
import {
  caseHoverTransition,
  createCaseHoverGesture,
} from '../../src/components/sections/CaseStudyPage/caseHover.ts'

function transition(gesture, event) {
  return caseHoverTransition(gesture, event)
}

test('case hover ignores the complete touch gesture', () => {
  const initial = createCaseHoverGesture()
  const entered = transition(initial, { type: 'enter', pointerType: 'touch' })
  const pressed = transition(entered.gesture, { type: 'down', pointerType: 'touch' })
  const left = transition(pressed.gesture, { type: 'leave', pointerType: 'touch' })

  assert.deepEqual(entered, { gesture: initial })
  assert.deepEqual(pressed, { gesture: initial })
  assert.deepEqual(left, { gesture: initial })
})

test('case hover defers pressed leave until pointer release', () => {
  const entered = transition(createCaseHoverGesture(), {
    type: 'enter',
    pointerType: 'mouse',
  })
  assert.equal(entered.target, 1.2)

  const pressed = transition(entered.gesture, { type: 'down', pointerType: 'mouse' })
  const left = transition(pressed.gesture, { type: 'leave', pointerType: 'mouse' })
  assert.equal(left.target, undefined)
  assert.deepEqual(left.gesture, { hovered: true, pressed: true, pendingLeave: true })

  const released = transition(left.gesture, { type: 'release' })
  assert.equal(released.target, 1)
  assert.deepEqual(released.gesture, createCaseHoverGesture())
})

test('case hover cancels deferred leave when pointer re-enters before release', () => {
  const entered = transition(createCaseHoverGesture(), {
    type: 'enter',
    pointerType: 'pen',
  })
  const pressed = transition(entered.gesture, { type: 'down', pointerType: 'pen' })
  const left = transition(pressed.gesture, { type: 'leave', pointerType: 'pen' })
  const reentered = transition(left.gesture, { type: 'enter', pointerType: 'pen' })
  const released = transition(reentered.gesture, { type: 'release' })

  assert.equal(reentered.target, undefined)
  assert.deepEqual(released, {
    gesture: { hovered: true, pressed: false, pendingLeave: false },
  })
})

test('case hover reset clears an active pressed gesture without a target change', () => {
  const active = { hovered: true, pressed: true, pendingLeave: true }
  assert.deepEqual(transition(active, { type: 'reset' }), {
    gesture: createCaseHoverGesture(),
  })
})
