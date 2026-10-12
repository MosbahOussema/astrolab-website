import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import {
  CASE_STUDIES_SPRINGS,
  caseStudiesEntryVisible,
  caseStudiesPlaybackState,
  caseStudiesSpring,
} from '../../src/components/sections/HomePage/sections/CaseStudiesSection/caseStudiesMotion.ts'

test('homepage case-study entrances use the two exact source springs', () => {
  assert.deepEqual(CASE_STUDIES_SPRINGS.heading, {
    damping: 20,
    distance: 40,
    mass: 1,
    stiffness: 66,
  })
  assert.deepEqual(CASE_STUDIES_SPRINGS.card, {
    damping: 70,
    distance: 50,
    mass: 1,
    stiffness: 320,
  })

  const delta = 0.00001
  for (const kind of ['heading', 'card']) {
    const config = CASE_STUDIES_SPRINGS[kind]
    const initial = caseStudiesSpring(kind, 0)
    assert.ok(Math.abs(initial.remaining - 1) < 1e-12)
    assert.ok(Math.abs(initial.velocity) < 1e-12)

    let previous = 1
    for (const time of [0.05, 0.2, 0.5, 1, 2]) {
      const sample = caseStudiesSpring(kind, time)
      const before = caseStudiesSpring(kind, time - delta)
      const after = caseStudiesSpring(kind, time + delta)
      const acceleration = (after.velocity - before.velocity) / (2 * delta)
      assert.ok(
        Math.abs(
          acceleration + config.damping * sample.velocity + config.stiffness * sample.remaining,
        ) < 1e-6,
      )
      assert.ok(sample.remaining >= 0 && sample.remaining <= previous)
      previous = sample.remaining
    }
  }
})

test('case-study reveal threshold and lifecycle cover tall cards, hidden tabs, and reduced motion', () => {
  assert.equal(caseStudiesEntryVisible(true, 399, 900, 800), false)
  assert.equal(caseStudiesEntryVisible(true, 400, 900, 800), true)
  assert.equal(caseStudiesEntryVisible(true, 350, 700, 800), true)
  assert.equal(caseStudiesEntryVisible(false, 700, 700, 800), false)
  assert.equal(caseStudiesEntryVisible(true, 0, 0, 800), true)

  assert.equal(
    caseStudiesPlaybackState({ active: true, hidden: false, reduced: false }),
    'running',
  )
  assert.equal(
    caseStudiesPlaybackState({ active: true, hidden: true, reduced: false }),
    'paused',
  )
  assert.equal(
    caseStudiesPlaybackState({ active: false, hidden: false, reduced: false }),
    'waiting',
  )
  assert.equal(
    caseStudiesPlaybackState({ active: true, hidden: false, reduced: true }),
    'finished',
  )
})

test('motion is attached to the clipped card interior and old CSS timing is absent', () => {
  const component = readFileSync(
    new URL(
      '../../src/components/sections/HomePage/sections/CaseStudiesSection/CaseStudyCard.client.tsx',
      import.meta.url,
    ),
    'utf8',
  )
  const css = readFileSync(
    new URL(
      '../../src/components/sections/HomePage/sections/CaseStudiesSection/CaseStudiesSection.module.css',
      import.meta.url,
    ),
    'utf8',
  )

  assert.match(component, /<Link[\s\S]*className=\{styles\.cardLink\}[\s\S]*<article/)
  assert.match(component, /data-case-studies-reveal="card"/)
  assert.match(css, /\.cardLink\s*\{[^}]*overflow:\s*clip;/s)
  assert.doesNotMatch(css, /0\.85s|data-visible/)
})

test('narrow-phone cards preserve the measured title, tag, and description order', () => {
  const css = readFileSync(
    new URL(
      '../../src/components/sections/HomePage/sections/CaseStudiesSection/CaseStudiesSection.module.css',
      import.meta.url,
    ),
    'utf8',
  )
  const narrowStart = css.indexOf('@media (max-width: 389.98px)')
  assert.notEqual(narrowStart, -1)
  const narrow = css.slice(narrowStart)

  assert.match(narrow, /\.cardLink:not\(:first-child\) \.copy > div\s*\{[^}]*gap:\s*15px;/s)
  assert.match(
    narrow,
    /\.cardLink:not\(:first-child\) \.copy h3\s*\{[^}]*order:\s*1;[^}]*font-size:\s*26px;/s,
  )
  assert.match(
    narrow,
    /\.cardLink:not\(:first-child\) \.mobileTags\s*\{[^}]*order:\s*2;[^}]*margin-block-start:\s*0;/s,
  )
  assert.match(
    narrow,
    /\.cardLink:not\(:first-child\) \.copy p\s*\{[^}]*order:\s*3;[^}]*margin-block-start:\s*9px;/s,
  )
  assert.match(narrow, /\.cardLink:nth-child\(4\) \.card\s*\{[^}]*gap:\s*26px;/s)
})
