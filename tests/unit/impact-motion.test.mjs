import assert from 'node:assert/strict'
import test from 'node:test'

import {
  impactEntryVisible,
  impactSpring,
} from '../../src/components/sections/HomePage/sections/ImpactSection/impactMotion.ts'

test('Impact uses the source m1/k66/c20 spring from opacity 0 and y40', () => {
  const initial = impactSpring(0)
  assert.ok(Math.abs(initial.remaining - 1) < 1e-12)
  assert.ok(Math.abs(initial.velocity) < 1e-12)

  const dt = 0.00001
  for (const time of [0.05, 0.2, 0.5, 1, 2]) {
    const sample = impactSpring(time)
    const before = impactSpring(time - dt)
    const after = impactSpring(time + dt)
    const acceleration = (after.velocity - before.velocity) / (2 * dt)
    assert.ok(Math.abs(acceleration + 20 * sample.velocity + 66 * sample.remaining) < 1e-6)
    assert.ok(sample.remaining >= 0)
  }
})

test('Impact starts each reveal at fifty percent of the smaller target or viewport', () => {
  assert.equal(impactEntryVisible(true, 399, 1410, 800), false)
  assert.equal(impactEntryVisible(true, 400, 1410, 800), true)
  assert.equal(impactEntryVisible(true, 50, 100, 800), true)
  assert.equal(impactEntryVisible(false, 400, 1410, 800), false)
  assert.equal(impactEntryVisible(true, 0, 0, 800), true)
})
