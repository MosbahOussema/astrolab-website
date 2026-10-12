import assert from 'node:assert/strict'
import { test } from 'node:test'
import { legalEntranceSpring } from '../../src/components/sections/LegalDocument/legalEntranceSpring.ts'

test('Legal source spring starts at rest and converges without overshoot', () => {
  const initial = legalEntranceSpring(0)
  assert.ok(Math.abs(initial.remaining - 1) < 1e-12)
  assert.ok(Math.abs(initial.velocity) < 1e-12)
  let previous = 1
  for (let time = 0; time <= 10; time += 0.01) {
    const { remaining } = legalEntranceSpring(time)
    assert.ok(remaining >= 0 && remaining <= previous)
    previous = remaining
  }
  assert.ok(legalEntranceSpring(10).remaining < 1e-10)
})

test('Legal entry obeys mass1, damping60 and stiffness150', () => {
  const delta = 1e-5
  for (const time of [0.1, 0.25, 0.5, 1, 2]) {
    const state = legalEntranceSpring(time)
    const acceleration =
      (legalEntranceSpring(time + delta).velocity - legalEntranceSpring(time - delta).velocity) /
      (2 * delta)
    assert.ok(Math.abs(acceleration + 60 * state.velocity + 150 * state.remaining) < 1e-6)
  }
})
