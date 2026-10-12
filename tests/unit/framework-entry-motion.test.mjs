import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import {
  FRAMEWORK_ENTRY_SPRINGS,
  frameworkEntryKind,
  frameworkEntryPlaybackState,
  frameworkEntrySpring,
  frameworkEntryTransform,
  frameworkEntryVisible,
} from '../../src/components/sections/HomePage/sections/FrameworkSection/frameworkEntryMotion.ts'

test('Framework card roots use the two exact source springs while Mapping has no appear effect', () => {
  assert.deepEqual(FRAMEWORK_ENTRY_SPRINGS.direction, {
    axis: 'block',
    damping: 20,
    distance: 40,
    mass: 1,
    stiffness: 66,
  })
  assert.deepEqual(FRAMEWORK_ENTRY_SPRINGS.execution, {
    axis: 'inline-end',
    damping: 45,
    distance: 100,
    mass: 1,
    stiffness: 200,
  })
  assert.deepEqual([0, 1, 2].map(frameworkEntryKind), ['direction', 'mapping', 'execution'])
  assert.deepEqual(frameworkEntrySpring('mapping', 0), { remaining: 0, velocity: 0 })
  assert.equal(frameworkEntryTransform('mapping', 1, 'ltr'), 'none')
})

test('Framework analytic springs start at rest and satisfy their source equations', () => {
  const dt = 0.00001
  for (const kind of ['direction', 'execution']) {
    const config = FRAMEWORK_ENTRY_SPRINGS[kind]
    const initial = frameworkEntrySpring(kind, 0)
    assert.ok(Math.abs(initial.remaining - 1) < 1e-12)
    assert.ok(Math.abs(initial.velocity) < 1e-12)

    let previous = 1
    for (const time of [0.05, 0.2, 0.5, 1, 2]) {
      const sample = frameworkEntrySpring(kind, time)
      const before = frameworkEntrySpring(kind, time - dt)
      const after = frameworkEntrySpring(kind, time + dt)
      const acceleration = (after.velocity - before.velocity) / (2 * dt)
      assert.ok(
        Math.abs(
          config.mass * acceleration +
            config.damping * sample.velocity +
            config.stiffness * sample.remaining,
        ) < 1e-6,
      )
      assert.ok(sample.remaining >= 0 && sample.remaining < previous)
      previous = sample.remaining
    }
  }
})

test('Execution enters from inline-end and mirrors only its inline motion in RTL', () => {
  assert.equal(frameworkEntryTransform('direction', 1, 'ltr'), 'translate3d(0, 40px, 0)')
  assert.equal(frameworkEntryTransform('direction', 1, 'rtl'), 'translate3d(0, 40px, 0)')
  assert.equal(frameworkEntryTransform('execution', 1, 'ltr'), 'translate3d(100px, 0, 0)')
  assert.equal(frameworkEntryTransform('execution', 1, 'rtl'), 'translate3d(-100px, 0, 0)')
})

test('Framework uses normalized fifty-percent visibility and pauses elapsed time while hidden', () => {
  assert.equal(frameworkEntryVisible(true, 399, 1200, 800), false)
  assert.equal(frameworkEntryVisible(true, 400, 1200, 800), true)
  assert.equal(frameworkEntryVisible(true, 200, 400, 800), true)
  assert.equal(frameworkEntryVisible(false, 400, 400, 800), false)

  assert.equal(
    frameworkEntryPlaybackState({ active: true, hidden: false, reduced: false }),
    'running',
  )
  assert.equal(
    frameworkEntryPlaybackState({ active: true, hidden: true, reduced: false }),
    'paused',
  )
  assert.equal(
    frameworkEntryPlaybackState({ active: false, hidden: false, reduced: false }),
    'waiting',
  )
  assert.equal(
    frameworkEntryPlaybackState({ active: true, hidden: false, reduced: true }),
    'finished',
  )
})

test('the entry marker scopes motion to the complete card and neutralizes the old visual-only entrance', () => {
  const component = readFileSync(
    new URL(
      '../../src/components/sections/HomePage/sections/FrameworkSection/FrameworkIllustrations.client.tsx',
      import.meta.url,
    ),
    'utf8',
  )
  const css = readFileSync(
    new URL(
      '../../src/components/sections/HomePage/sections/FrameworkSection/FrameworkSection.module.css',
      import.meta.url,
    ),
    'utf8',
  )

  assert.match(component, /<article[\s\S]*data-framework-entry=\{frameworkEntryKind\(index\)\}/)
  assert.match(component, /styles\.entryNeutralIllustration/)
  assert.match(
    css,
    /\.card \.illustration\.entryNeutralIllustration\s*{[^}]*opacity:\s*1;[^}]*transform:\s*none;[^}]*animation:\s*none;/s,
  )
})

test('Framework internal sequences keep the exact source stages and loop targets', () => {
  const component = readFileSync(
    new URL(
      '../../src/components/sections/HomePage/sections/FrameworkSection/FrameworkIllustrations.client.tsx',
      import.meta.url,
    ),
    'utf8',
  )

  assert.match(component, /directionTimings = \[500, 500, 2000, 2000, 2000, 2000\]/)
  assert.match(
    component,
    /directionStacks = \[\s*\[0, 0, 0\],\s*\[0, 1, 0\],\s*\[2, 1, 0\],\s*\[2, 3, 0\]/s,
  )
  assert.match(component, /directionLayoutDuration = 620/)
  assert.match(component, /function directionFlipTransform/)
  assert.match(component, /mappingTimings = \[500, 500, 500, 500, 500, 1000, 1000, 3000\]/)
  assert.match(component, /executionTimings = \[500, 700, 2000, 2000, 2000\]/)
  assert.match(component, /useSequence\(6, directionTimings, 2\)/)
  assert.match(component, /\{ label: 'Prototype', number: '04' \}/)
  assert.match(component, /useSequence\(8, mappingTimings, 4\)/)
  assert.match(component, /useSequence\(5, executionTimings, 2\)/)
  assert.match(component, /createTimedCycle<number>/)
  assert.match(component, /inViewport && !document\.hidden/)
})

test('Framework artwork keeps the measured live geometry and podium variants', () => {
  const css = readFileSync(
    new URL(
      '../../src/components/sections/HomePage/sections/FrameworkSection/FrameworkSection.module.css',
      import.meta.url,
    ),
    'utf8',
  )

  assert.match(css, /\.card\s*{[^}]*border-radius:\s*16px;/s)
  assert.match(css, /\.visual\s*{[^}]*block-size:\s*341px;/s)
  assert.match(css, /\.projectPanel\s*{[^}]*inset:\s*15\.72px 15\.72px auto;/s)
  assert.match(css, /\.phaseStack\s*{[^}]*inset:\s*0;/s)
  assert.match(css, /data-phase-step='0'\] \.phaseCard\[data-layer='0'\][^}]*inset-block-start:\s*188\.63px/s)
  assert.match(
    css,
    /data-phase-step='0'\] \.phaseCard\[data-layer='0'\][^}]*inline-size:\s*calc\(100% - 31\.44px\)/s,
  )
  assert.match(css, /data-phase-step='3'\] \.phaseCard\[data-layer='1'\][^}]*inline-size:\s*219px/s)
  assert.match(css, /\.mappingRoutes\s*{[^}]*inset:\s*15\.72px 42\.78px auto;/s)
  assert.match(css, /\.mappingMetrics\s*{[^}]*inset:\s*210\.72px 42\.78px auto;/s)
  assert.match(css, /\.rankOne\s*{[^}]*block-size:\s*216px;/s)
  assert.match(css, /data-step='3'\] \.rankTwo\s*{[^}]*block-size:\s*115px;/s)
  assert.match(css, /data-step='3'\] \.rankThree\s*{[^}]*block-size:\s*139px;/s)
  assert.match(css, /data-step='4'\] \.rankTwo\s*{[^}]*block-size:\s*171px;/s)
  assert.match(css, /data-step='4'\] \.rankThree\s*{[^}]*block-size:\s*118px;/s)
})
