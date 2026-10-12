import assert from 'node:assert/strict'
import test from 'node:test'
import {
  caseTextEasing,
  caseTextMotion,
  caseTextProgress,
  isBreakableRevealWord,
} from '../../src/components/sections/CaseStudyPage/caseTextMotion.ts'

test('Line reveal uses the reference critical spring and native samples', () => {
  assert.equal(caseTextMotion.durationMs, 200)
  assert.equal(caseTextMotion.lineDelayMs, 75)
  assert.equal(caseTextProgress(0), 0)
  assert.equal(caseTextProgress(200), 1)
  assert.equal(caseTextEasing, 'linear(0, 0.4551, 0.8122, 0.9445, 0.9848, 0.996, 1)')
  for (let elapsed = 1; elapsed < 200; elapsed += 1) {
    assert.ok(caseTextProgress(elapsed) > caseTextProgress(elapsed - 1))
    assert.ok(caseTextProgress(elapsed) < 1)
  }
})

test('Character reveal permits wrapping only after twelve UTF-16 code units', () => {
  assert.equal(isBreakableRevealWord('demonstrates'), false)
  assert.equal(isBreakableRevealWord('collaborative'), true)
  assert.equal(isBreakableRevealWord('Next-Generation'), true)
  assert.equal(isBreakableRevealWord('100\u202f%'), false)
})
