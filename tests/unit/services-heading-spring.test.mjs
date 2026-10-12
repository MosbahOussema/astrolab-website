import assert from 'node:assert/strict'
import test from 'node:test'
import { servicesHeadingSpring } from '../../src/components/sections/HomePage/shared/servicesHeadingSpring.ts'

test('Services heading begins at y40, zero opacity and zero velocity', () => {
  const sample = servicesHeadingSpring(0)
  assert.ok(Math.abs(sample.remaining - 1) < 1e-12)
  assert.ok(Math.abs(sample.velocity) < 1e-12)
  assert.deepEqual(servicesHeadingSpring(-1), sample)
})

test('Services heading satisfies the source physical spring equation', () => {
  const dt = 0.00001
  for (const t of [0.05, 0.2, 0.5, 1, 2]) {
    const sample = servicesHeadingSpring(t)
    const before = servicesHeadingSpring(t - dt)
    const after = servicesHeadingSpring(t + dt)
    const acceleration = (after.velocity - before.velocity) / (2 * dt)
    assert.ok(Math.abs(acceleration + 20 * sample.velocity + 66 * sample.remaining) < 1e-6)
    assert.ok(Math.abs((after.remaining - before.remaining) / (2 * dt) - sample.velocity) < 1e-7)
  }
})

test('Overdamped heading converges without overshoot and is independent of frame rate', () => {
  let previous = 1
  for (let frame = 1; frame <= 300; frame++) {
    const { remaining, velocity } = servicesHeadingSpring(frame / 60)
    assert.ok(remaining >= 0 && remaining < previous)
    assert.ok(velocity < 0)
    previous = remaining
  }
  assert.ok(40 * previous < 0.000001)
  assert.deepEqual(servicesHeadingSpring(30 / 60), servicesHeadingSpring(60 / 120))
})
