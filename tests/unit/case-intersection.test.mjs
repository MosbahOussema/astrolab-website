import assert from 'node:assert/strict'
import test from 'node:test'
import { caseEntryVisible } from '../../src/components/sections/CaseStudyPage/caseIntersection.ts'

test('Appear threshold uses half of the smaller element/viewport height', () => {
  assert.equal(caseEntryVisible(true, 399, 2400, 800), false)
  assert.equal(caseEntryVisible(true, 400, 2400, 800), true)
  assert.equal(caseEntryVisible(true, 49, 100, 800), false)
  assert.equal(caseEntryVisible(true, 50, 100, 800), true)
  assert.equal(caseEntryVisible(false, 400, 2400, 800), false)
  assert.equal(caseEntryVisible(true, 0, 0, 800), true)
})
