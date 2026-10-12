import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const component = readFileSync(
  new URL('../../src/components/sections/ContactPage/ThankYouPage.tsx', import.meta.url),
  'utf8',
)
const styles = readFileSync(
  new URL('../../src/components/sections/ContactPage/ThankYouPage.module.css', import.meta.url),
  'utf8',
)

test('thank-you keeps the measured card and particle entrance layers', () => {
  assert.match(component, /<Starfield \/>/)
  assert.match(component, /className=\{styles\.particles\}/)
  assert.match(styles, /animation:\s*contentEnter 2s var\(--astro-ease-entrance\) 0\.3s backwards/)
  assert.match(
    styles,
    /animation:\s*particlesEnter 2s var\(--astro-ease-entrance\) 0\.6s backwards/,
  )
  assert.match(styles, /inline-size:\s*min\(901px, 100%\)/)
  assert.match(styles, /min-block-size:\s*386px/)
  assert.match(styles, /backdrop-filter:\s*blur\(155\.498px\)/)
  assert.match(styles, /@media \(min-width: 810px\) and \(max-width: 1199\.98px\)/)
  assert.match(styles, /align-items:\s*flex-start/)
  assert.match(styles, /padding-block-start:\s*320px/)
  assert.match(styles, /min-block-size:\s*369px/)
})

test('thank-you motion and directional control have accessible variants', () => {
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*animation:\s*none/)
  assert.match(styles, /\.content a:focus-visible/)
  assert.match(styles, /:dir\(rtl\) \.content a svg/)
  assert.match(styles, /transform:\s*scaleX\(-1\)/)
})
