import assert from 'node:assert/strict'
import test from 'node:test'
import {
  samePageAnchor,
  smoothScrollDuration,
  usesSmoothScroll,
} from '../../src/components/layout/SmoothScroll/smoothScrollConfig.ts'

test('Smooth scrolling is restricted to the five measured public routes', () => {
  assert.equal(smoothScrollDuration, 2.4)
  for (const path of [
    '/',
    '/eldowallet-use-case',
    '/talinty-ai-recruitment-platform',
    '/rawi-al-kotob-use-case',
    '/mazad-al-jomrok-use-case',
  ])
    assert.equal(usesSmoothScroll(path), true)
  for (const path of [
    '/admin',
    '/admin/create-first-user',
    '/contact',
    '/thank-you',
    '/policies/privacy-policy',
    '/policies/terms-conditions',
    '/missing',
  ])
    assert.equal(usesSmoothScroll(path), false)
})

test('Anchor interception excludes external links and navigation to other pages', () => {
  const url = 'http://localhost:3000/'
  assert.equal(samePageAnchor('/#framework', url), 'framework')
  assert.equal(samePageAnchor('#case-studies', url), 'case-studies')
  assert.equal(samePageAnchor('https://astrolab.co/#framework', url), null)
  assert.equal(samePageAnchor('/#framework', `${url}talinty-ai-recruitment-platform`), null)
  assert.equal(samePageAnchor('/?preview=true#framework', url), null)
  assert.equal(samePageAnchor('#%invalid', url), null)
  assert.equal(samePageAnchor('/contact', url), null)
})
