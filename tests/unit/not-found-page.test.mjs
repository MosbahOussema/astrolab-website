import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const component = readFileSync(
  new URL('../../src/components/sections/NotFoundPage/NotFoundPage.tsx', import.meta.url),
  'utf8',
)
const styles = readFileSync(
  new URL('../../src/components/sections/NotFoundPage/NotFoundPage.module.css', import.meta.url),
  'utf8',
)
const content = readFileSync(
  new URL('../../src/content/static/notFound.ts', import.meta.url),
  'utf8',
)
const tokens = readFileSync(new URL('../../src/design-system/tokens.css', import.meta.url), 'utf8')

test('404 keeps its content separate and exposes a semantic home action', () => {
  assert.match(component, /notFoundPageContent/)
  assert.match(component, /<main className=\{styles\.page\}>/)
  assert.match(component, /<h1 className=\{styles\.title\}>\{content\.title\}<\/h1>/)
  assert.match(component, /<Link className=\{styles\.action\} href=\{content\.homeHref\}/)
  assert.match(content, /title: 'Page Not Found'/)
  assert.match(content, /homeLabel: 'Back to Home'/)
  assert.match(content, /homeHref: '\/'/)
})

test('404 hides public chrome only while its page is mounted', () => {
  assert.match(styles, /body\.astrolab\):has\(\.page\) :global\(header\)/)
  assert.match(styles, /body\.astrolab\):has\(\.page\) :global\(footer\)/)
  assert.match(styles, /display:\s*none/)
  assert.doesNotMatch(styles, /display:\s*none\s*!important/)
})

test('404 preserves measured geometry, logical layout, and hover asymmetry', () => {
  assert.match(styles, /max-inline-size:\s*240px/)
  assert.match(styles, /padding-inline:\s*20px/)
  assert.match(styles, /inline-size:\s*14px/)
  assert.match(styles, /block-size:\s*21px/)
  assert.match(styles, /block-size:\s*30px/)
  assert.match(styles, /\.action\s*\{[\s\S]*?transition:\s*none/s)
  assert.match(styles, /\.action:hover\s*\{[\s\S]*?opacity:\s*0\.75/s)
  assert.match(styles, /\.action:hover\s*\{[\s\S]*?transition:\s*all 0\.2s/s)
  assert.match(
    styles,
    /\.action:focus-visible\s*\{[\s\S]*?outline:\s*-webkit-focus-ring-color auto 1px;[\s\S]*?outline-offset:\s*1px/s,
  )
  assert.doesNotMatch(
    styles,
    /(?:^|[;{]\s*)(?:left|right|margin-left|margin-right|padding-left|padding-right)\s*:/m,
  )
})

test('404 theme keeps explicit light/dark tokens and global accessibility guards', () => {
  assert.match(tokens, /--astro-not-found-bg:\s*#ffffff/)
  assert.match(tokens, /--astro-not-found-text:\s*#333333/)
  assert.match(tokens, /@media \(prefers-color-scheme: dark\)[\s\S]*--astro-not-found-bg:\s*#000000/s)
  assert.match(tokens, /\.astrolab :focus-visible\s*\{[\s\S]*outline:\s*2px solid var\(--astro-focus\)/s)
  assert.match(tokens, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(tokens, /transition-duration:\s*0\.01ms !important/)
})
