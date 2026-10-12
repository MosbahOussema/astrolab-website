import assert from 'node:assert/strict'
import test from 'node:test'
import { caseSpring } from '../../src/components/sections/CaseStudyPage/caseSpring.ts'

for (const [stiffness, damping] of [
  [170, 26],
  [66, 20],
  [160, 30],
  [100, 30],
  [100, 20],
]) {
  test(`case spring k${stiffness}/c${damping}: initial state and settled endpoint`, () => {
    const initial = caseSpring(0, stiffness, damping)
    assert.ok(Math.abs(initial.displacement - 1) < 1e-12)
    assert.ok(Math.abs(initial.velocity) < 1e-12)
    const settled = caseSpring(10, stiffness, damping)
    assert.ok(Math.abs(settled.displacement) < 1e-10)
    assert.ok(Math.abs(settled.velocity) < 1e-10)
  })
}
test('hover reversal preserves displacement and velocity', () => {
  const before = caseSpring(0.15, 100, 30, -0.2, 0)
  const scale = 1.2 + before.displacement
  const reverse = caseSpring(0, 100, 30, scale - 1, before.velocity)
  assert.ok(Math.abs(1 + reverse.displacement - scale) < 1e-12)
  assert.ok(Math.abs(reverse.velocity - before.velocity) < 1e-12)
})
