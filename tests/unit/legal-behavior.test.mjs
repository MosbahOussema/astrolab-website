import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const component = readFileSync(
  new URL('../../src/components/sections/LegalDocument/LegalDocument.tsx', import.meta.url),
  'utf8',
)
const reveal = readFileSync(
  new URL('../../src/components/sections/LegalDocument/LegalReveal.client.tsx', import.meta.url),
  'utf8',
)
const styles = readFileSync(
  new URL('../../src/components/sections/LegalDocument/LegalDocument.module.css', import.meta.url),
  'utf8',
)

test('legal links preserve the source new-tab behavior and visible keyboard focus', () => {
  assert.match(component, /<a href=\{mark\.href\} rel="noopener" target="_blank">/)
  assert.match(styles, /\.document a:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--astro-focus\)/s)
})

test('legal layout keeps the measured desktop and phone shell with logical CSS', () => {
  assert.match(styles, /padding-block:\s*268px 160px/)
  assert.match(styles, /inline-size:\s*min\(1100px, calc\(100% - 40px\)\)/)
  assert.match(styles, /padding-inline:\s*48px/)
  assert.match(styles, /text-align:\s*start/)
  assert.match(styles, /@media \(min-width: 810px\) and \(max-width: 1199px\)/)
  assert.match(styles, /font-size:\s*16px/)
  assert.match(styles, /line-height:\s*25\.6px/)
  assert.match(styles, /@media \(max-width: 809px\)/)
  assert.match(styles, /padding-inline:\s*12px/)
  assert.match(styles, /\.document li\s*\{\s*padding-inline-start:\s*18\.62px/)
  assert.match(styles, /\.page\s*~\s*:global\(footer\)[\s\S]*margin-block-end:\s*20px/)
  assert.match(styles, /font-size:\s*41px/)
  assert.match(styles, /line-height:\s*22\.4px/)
  assert.doesNotMatch(
    styles,
    /(?:^|[;{]\s*)(?:left|right|margin-left|margin-right|padding-left|padding-right)\s*:/m,
  )
})

test('legal reveal keeps source offsets, delay, threshold and reduced-motion cleanup', () => {
  assert.equal(component.match(/opacity:\s*0/g)?.length, 3)
  assert.equal(component.match(/translateY\(-50px\)/g)?.length, 2)
  assert.equal(component.match(/translateY\(50px\)/g)?.length, 1)
  assert.match(reveal, /element\.dataset\.legalEntry === 'title' \? 100 : 0/)
  assert.match(reveal, /element\.dataset\.legalEntry === 'body' \? 50 : -50/)
  assert.match(reveal, /legalEntranceSpring\(\(now - origin - delay\) \/ 1000\)/)
  assert.match(reveal, /\{ threshold: 0 \}/)
  assert.match(reveal, /if \(reduced\.matches\) \{\s*elements\.forEach\(reveal\)\s*return/s)
  assert.match(reveal, /reduced\.addEventListener\('change', onPreference\)/)
  assert.match(reveal, /observer\.disconnect\(\)/)
  assert.match(reveal, /cancelAnimationFrame\(frame\)/)
  assert.match(component, /<LegalReveal key=\{content\.slug\}/)
})

test('legal shell formulas inventory the audited responsive CSS-pixel viewports', () => {
  const shell = (viewport) => Math.min(1100, viewport - 40)
  const content = (viewport) => shell(viewport) - (viewport <= 809 ? 24 : 96)
  const shellStart = (viewport) => (viewport - shell(viewport)) / 2
  const textStart = (viewport) => shellStart(viewport) + (viewport <= 809 ? 12 : 48)
  assert.deepEqual(
    [1440, 1280, 1024, 768, 390, 375].map((viewport) => ({
      content: content(viewport),
      shell: shell(viewport),
      shellStart: shellStart(viewport),
      textStart: textStart(viewport),
      viewport,
    })),
    [
      { content: 1004, shell: 1100, shellStart: 170, textStart: 218, viewport: 1440 },
      { content: 1004, shell: 1100, shellStart: 90, textStart: 138, viewport: 1280 },
      { content: 888, shell: 984, shellStart: 20, textStart: 68, viewport: 1024 },
      { content: 704, shell: 728, shellStart: 20, textStart: 32, viewport: 768 },
      { content: 326, shell: 350, shellStart: 20, textStart: 32, viewport: 390 },
      { content: 311, shell: 335, shellStart: 20, textStart: 32, viewport: 375 },
    ],
  )
})
