import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL(
  '../../src/components/sections/HomePage/sections/HeroSection/',
  import.meta.url,
)
const carousel = readFileSync(new URL('HeroCarousel.client.tsx', root), 'utf8')
const ticker = readFileSync(new URL('PartnerTicker.client.tsx', root), 'utf8')
const partners = readFileSync(new URL('Partners.client.tsx', root), 'utf8')
const hero = readFileSync(new URL('HeroSection.tsx', root), 'utf8')
const css = readFileSync(new URL('HeroSection.module.css', root), 'utf8')

function media(source, query) {
  const start = source.indexOf(`@media ${query}`)
  assert.notEqual(start, -1, `missing ${query}`)
  let depth = 0
  let bodyStart = -1
  for (let index = start; index < source.length; index++) {
    if (source[index] === '{') {
      depth++
      if (bodyStart === -1) bodyStart = index + 1
    } else if (source[index] === '}') {
      depth--
      if (bodyStart !== -1 && depth === 0) return source.slice(bodyStart, index)
    }
  }
  assert.fail(`unterminated ${query}`)
}

test('hero carousel matches source autoplay and non-draggable contract', () => {
  assert.match(carousel, /const INTERVAL_MS = 5000/)
  assert.match(carousel, /const TRANSITION_MS = 500/)
  assert.match(carousel, /cubic-bezier\(1, 0, 0, 1\.01\)/)
  assert.match(carousel, /new IntersectionObserver/)
  assert.match(carousel, /new ResizeObserver/)
  assert.match(carousel, /document\.addEventListener\('visibilitychange', synchronize\)/)
  assert.match(carousel, /reducedMotion\.addEventListener\('change', handlePreference\)/)
  assert.match(carousel, /const currentTime =/)
  assert.match(carousel, /active\.currentTime = currentTime/)
  assert.match(carousel, /const resize = new ResizeObserver\(\(\) => \{\s*reprojectAnimation\(\)/s)
  assert.match(carousel, /draggable=\{false\}/)
  assert.doesNotMatch(carousel, /setInterval/)
  assert.doesNotMatch(carousel, /onMouseEnter|onMouseLeave/)
})

test('partner ticker pauses offscreen and preserves measured phase', () => {
  assert.match(ticker, /const SPEED = 35/)
  assert.match(ticker, /const HOVER_FACTOR = 0\.5/)
  assert.match(ticker, /new IntersectionObserver/)
  assert.match(ticker, /const progress = loopWidth > 0 \? phase \/ loopWidth : 0/)
  assert.match(ticker, /phase = progress \* loopWidth/)
  assert.match(ticker, /document\.addEventListener\('visibilitychange', synchronize\)/)
  assert.match(ticker, /new MutationObserver\(render\)/)
  assert.match(ticker, /getComputedStyle\(element\)\.direction === 'rtl' \? 1 : -1/)
})

test('partner entrances retain their distinct source responsive variants', () => {
  assert.match(partners, /\(min-width: 390px\) and \(max-width: 809\.98px\)/)
  assert.match(partners, /characteristic roots -5 and -40/)
  assert.match(
    css,
    /\.marquee\s*\{[^}]*animation:\s*partnerTickerEnter 2s var\(--astro-ease-entrance\) 0\.4s both;/s,
  )
  assert.match(
    css,
    /@keyframes partnerTickerEnter\s*\{[\s\S]*opacity:\s*0\.001;[\s\S]*translateY\(80px\) scale\(0\.9\)/,
  )

  const mobile = media(css, '(max-width: 809px)')
  assert.match(mobile, /\.marquee\s*\{[^}]*animation:\s*none;[^}]*will-change:\s*auto;/s)
})

test('hero reproduces the source image wrapper compositing without a substitute layer', () => {
  assert.match(hero, /className=\{styles\.backgroundLayer\}/)
  assert.match(hero, /SHKAyyvo2GTbkuksRArmdrqw17k\.png/)
  assert.match(css, /\.backgroundLayer\s*\{[^}]*position:\s*absolute;[^}]*inset:\s*0;/s)
  assert.match(
    css,
    /\.background\s*\{[^}]*display:\s*block;[^}]*object-fit:\s*cover;[^}]*object-position:\s*center top;/s,
  )
  assert.doesNotMatch(css, /background-blend-mode|mix-blend-mode/)
})
