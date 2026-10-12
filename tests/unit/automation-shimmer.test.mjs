import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  automationEase,
  automationShimmerFrame,
} from '../../src/components/sections/HomePage/sections/ServicesSection/automationShimmer.ts'

test('Automation has a 2000ms traversal followed by a 300ms invisible pause', () => {
  assert.deepEqual(automationShimmerFrame(0), { forward: 160, reverse: 30, opacity: 0 })
  for (const time of [2000, 2100, 2299]) {
    assert.deepEqual(automationShimmerFrame(time), { forward: 30, reverse: 160, opacity: 0 })
  }
  assert.deepEqual(automationShimmerFrame(2300), automationShimmerFrame(0))
  assert.deepEqual(automationShimmerFrame(3300), automationShimmerFrame(1000))
})

test('Automation uses opposing normalized paths and fades at the eased endpoints', () => {
  let previous = 0
  for (let time = 0; time <= 2000; time += 10) {
    const eased = automationEase(time / 2000)
    const frame = automationShimmerFrame(time)
    assert.ok(eased >= previous && eased <= 1)
    assert.ok(Math.abs(frame.forward + frame.reverse - 190) < 1e-10)
    assert.ok(frame.opacity >= 0 && frame.opacity <= 1)
    previous = eased
  }
  assert.ok(automationEase(0.5) < 0.2, 'slow start differs from a linear traversal')
  assert.equal(automationShimmerFrame(1000).opacity, 1)
  assert.ok(automationShimmerFrame(10).opacity < 1)
})
