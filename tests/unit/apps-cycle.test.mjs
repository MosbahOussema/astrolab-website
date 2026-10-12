import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  appsStageDelay,
  nextAppsStage,
} from '../../src/components/sections/HomePage/sections/ServicesSection/appsCycle.ts'

test('Apps advances through fourteen source states and repeats from state ten', () => {
  const stages = [1]
  for (let index = 0; index < 14; index++) stages.push(nextAppsStage(stages.at(-1)))
  assert.deepEqual(stages, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 10])
})

test('Apps uses 500ms steps with 2000ms holds at states ten and fourteen', () => {
  for (let stage = 1; stage <= 14; stage++) {
    assert.equal(appsStageDelay(stage), stage === 10 || stage === 14 ? 2000 : 500)
  }
  assert.equal(
    [10, 11, 12, 13, 14].reduce((time, stage) => time + appsStageDelay(stage), 0),
    5500,
  )
})
