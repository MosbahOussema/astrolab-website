import assert from 'node:assert/strict'
import test from 'node:test'
import {
  createDesignCycle,
  DESIGN_CURSOR_SPRING,
  designEntryVisible,
  designStageDelay,
  designStageEndpoint,
  nextDesignStage,
  resolveDurationSpring,
} from '../../src/components/sections/HomePage/sections/ServicesSection/designMotion.ts'

test('Design follows the source 500/3500/2000ms cycle', () => {
  assert.equal(nextDesignStage('default'), 'swapped')
  assert.equal(nextDesignStage('swapped'), 'return')
  assert.equal(nextDesignStage('return'), 'default')
  assert.equal(designStageDelay('default'), 500)
  assert.equal(designStageDelay('swapped'), 3500)
  assert.equal(designStageDelay('return'), 2000)
  assert.equal(designStageEndpoint('default'), 'default')
  assert.equal(designStageEndpoint('swapped'), 'swapped')
  assert.equal(designStageEndpoint('return'), 'default')
})

test('Design resolves Motion duration/bounce spring constants deterministically', () => {
  assert.deepEqual(DESIGN_CURSOR_SPRING, resolveDurationSpring(3, 0.2))
  assert.ok(Math.abs(DESIGN_CURSOR_SPRING.stiffness - 8.988596992779575) < 1e-12)
  assert.ok(Math.abs(DESIGN_CURSOR_SPRING.damping - 4.796958234289279) < 1e-12)
  assert.equal(DESIGN_CURSOR_SPRING.mass, 1)
})

test('Design uses normalized fifty-percent visibility for tall elements', () => {
  assert.equal(designEntryVisible(true, 399, 1200, 800), false)
  assert.equal(designEntryVisible(true, 400, 1200, 800), true)
  assert.equal(designEntryVisible(true, 200, 400, 800), true)
  assert.equal(designEntryVisible(false, 400, 400, 800), false)
})

test('Design cycle pauses on tablet/reduced motion and clears every pending timer', () => {
  let nextHandle = 1
  const pending = new Map()
  const stages = []
  const cleared = []
  const cycle = createDesignCycle({
    clear(handle) {
      cleared.push(handle)
      pending.delete(handle)
    },
    onStage(stage) {
      stages.push(stage)
    },
    schedule(callback, delay) {
      const handle = nextHandle++
      pending.set(handle, { callback, delay })
      return handle
    },
  })

  cycle.sync({ reduced: false, tablet: false })
  assert.deepEqual(stages, ['default'])
  assert.deepEqual(
    [...pending.values()].map(({ delay }) => delay),
    [500],
  )

  const first = [...pending.entries()][0]
  pending.delete(first[0])
  first[1].callback()
  assert.deepEqual(stages, ['default', 'swapped'])
  assert.deepEqual(
    [...pending.values()].map(({ delay }) => delay),
    [3500],
  )

  const second = [...pending.entries()][0]
  pending.delete(second[0])
  second[1].callback()
  assert.deepEqual(stages, ['default', 'swapped', 'return'])
  assert.deepEqual(
    [...pending.values()].map(({ delay }) => delay),
    [2000],
  )

  const third = [...pending.entries()][0]
  pending.delete(third[0])
  third[1].callback()
  assert.deepEqual(stages, ['default', 'swapped', 'return', 'default'])
  assert.deepEqual(
    [...pending.values()].map(({ delay }) => delay),
    [500],
  )

  cycle.sync({ reduced: false, tablet: true })
  assert.equal(pending.size, 0)
  assert.equal(stages.at(-1), 'default')

  cycle.sync({ reduced: true, tablet: false })
  assert.equal(pending.size, 0)

  cycle.sync({ reduced: false, tablet: false })
  assert.deepEqual(
    [...pending.values()].map(({ delay }) => delay),
    [500],
  )
  cycle.dispose()
  assert.equal(pending.size, 0)
  assert.equal(cleared.length, 2)
})
