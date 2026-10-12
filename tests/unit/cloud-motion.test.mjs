import assert from 'node:assert/strict'
import test from 'node:test'
import {
  cloudEntryOffset,
  cloudPlaybackState,
} from '../../src/components/sections/HomePage/sections/ServicesSection/cloudMotion.ts'

test('Cloud enters from inline-start in both writing directions', () => {
  assert.equal(cloudEntryOffset('ltr'), -100)
  assert.equal(cloudEntryOffset('rtl'), 100)
})

test('Cloud rows run only while visible with normal motion', () => {
  assert.equal(cloudPlaybackState({ hidden: false, inViewport: true, reduced: false }), 'running')
  for (const state of [
    { hidden: true, inViewport: true, reduced: false },
    { hidden: false, inViewport: false, reduced: false },
    { hidden: false, inViewport: true, reduced: true },
  ]) {
    assert.equal(cloudPlaybackState(state), 'paused')
  }
})
