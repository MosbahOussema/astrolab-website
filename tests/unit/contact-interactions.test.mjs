import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const details = readFileSync(
  new URL('../../src/components/sections/ContactPage/ContactDetails.client.tsx', import.meta.url),
  'utf8',
)
const form = readFileSync(
  new URL('../../src/components/sections/ContactPage/ContactForm.client.tsx', import.meta.url),
  'utf8',
)
const styles = readFileSync(
  new URL('../../src/components/sections/ContactPage/ContactPage.module.css', import.meta.url),
  'utf8',
)

test('contact copy feedback is keyboard-safe, announced, and handles clipboard failure', () => {
  assert.match(details, /navigator\.clipboard\.writeText\(email\)/)
  assert.match(details, /setCopyState\('copied'\)/)
  assert.match(details, /catch \{\s*setCopyState\('error'\)/s)
  assert.match(details, /onBlur=\{\(\) => setCopyState\('idle'\)\}/)
  assert.match(details, /aria-live="polite"/)
  assert.match(details, /data-copy-state=\{copyState\}/)
  assert.match(styles, /data-copy-state='copied'/)
  assert.match(styles, /filter:\s*blur\(4px\)/)
  assert.match(styles, /transform:\s*scale\(1\.2\)/)
})

test('contact form omits the removed simulation notice and exposes native validation state', () => {
  assert.equal(form.match(/^\s+required$/gm)?.length, 4)
  assert.match(form, /aria-invalid=\{invalidFields\.has\('Email'\) \|\| undefined\}/)
  assert.match(form, /onInvalid=\{markInvalid\}/)
  assert.match(form, /onInput=\{clearInvalid\}/)
  assert.match(form, /aria-live="polite"/)
  assert.match(form, /router\.push\('\/thank-you'\)/)
  assert.doesNotMatch(form, /Local simulation — this form does not send or store your message\./)
  assert.match(form, /href="\/policies\/privacy-policy"/)
  assert.match(styles, /\.field:focus-within/)
  assert.match(styles, /\.field:has\(\[aria-invalid='true'\]\)/)
})

test('contact controls cover focus, reduced motion, and direction-aware arrows', () => {
  assert.match(styles, /\.copyButton:focus-visible/)
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(styles, /:dir\(rtl\) \.socials a > svg/)
  assert.match(styles, /\.checkIconDisc\s*\{[^}]*fill:\s*var\(--astro-accent\)/s)
  assert.match(styles, /\.checkIconMark\s*\{[^}]*stroke:\s*var\(--astro-text\)/s)
  assert.doesNotMatch(
    styles,
    /(?:^|[;{]\s*)(?:left|right|margin-left|margin-right|padding-left|padding-right)\s*:/m,
  )
})

test('contact keeps the measured narrow-phone hero growth', () => {
  assert.match(styles, /@media \(max-width: 375px\)/)
  assert.match(styles, /min-block-size: 767\.390625px/)
})
