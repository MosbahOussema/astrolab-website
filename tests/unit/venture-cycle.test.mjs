import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  nextVentureStage,
  ventureStageDelay,
} from '../../src/components/sections/HomePage/sections/ServicesSection/ventureCycle.ts'

test('Venture advances 1 through 7 and repeats from 2, not the hidden initial state', () => {
  const stages = [1]
  for (let index = 0; index < 7; index++) stages.push(nextVentureStage(stages.at(-1)))
  assert.deepEqual(stages, [1, 2, 3, 4, 5, 6, 7, 2])
})

test('Venture uses 500ms advances, a 3000ms final hold, and a 5500ms recurring cycle', () => {
  for (let stage = 1; stage < 7; stage++) assert.equal(ventureStageDelay(stage), 500)
  assert.equal(ventureStageDelay(7), 3000)
  assert.equal(
    [2, 3, 4, 5, 6, 7].reduce((time, stage) => time + ventureStageDelay(stage), 0),
    5500,
  )
})
