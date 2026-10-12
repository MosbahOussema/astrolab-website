import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const heroCss = readFileSync(
  new URL(
    '../../src/components/sections/HomePage/sections/HeroSection/HeroSection.module.css',
    import.meta.url,
  ),
  'utf8',
)
const frameworkCss = readFileSync(
  new URL(
    '../../src/components/sections/HomePage/sections/FrameworkSection/FrameworkSection.module.css',
    import.meta.url,
  ),
  'utf8',
)

function media(css, query) {
  const start = css.indexOf(`@media ${query}`)
  assert.notEqual(start, -1, `missing ${query}`)
  let depth = 0
  let bodyStart = -1
  for (let index = start; index < css.length; index++) {
    if (css[index] === '{') {
      depth++
      if (bodyStart === -1) bodyStart = index + 1
    } else if (css[index] === '}') {
      depth--
      if (bodyStart !== -1 && depth === 0) return css.slice(bodyStart, index)
    }
  }
  assert.fail(`unterminated ${query}`)
}

test('narrow-phone hero follows the source content-height variant', () => {
  const narrow = media(heroCss, '(max-width: 389px)')
  assert.match(narrow, /\.hero\s*{[^}]*padding-inline:\s*30px;[^}]*block-size:\s*auto;/s)
  assert.match(narrow, /\.title\s*{[^}]*font-size:\s*25px;/s)
  assert.match(narrow, /\.second\s*>\s*span\s*{[^}]*font-size:\s*30px;/s)
  assert.match(narrow, /\.description\s*{[^}]*font-size:\s*14px;[^}]*line-height:\s*21px;/s)
  assert.doesNotMatch(narrow, /\.description\s*{[^}]*margin-block-start:\s*49px/s)
  assert.match(narrow, /\.actions\s*{[^}]*flex-direction:\s*column;[^}]*margin-block-start:\s*49px;/s)
  assert.match(narrow, /\.marquee\s*{[^}]*margin-block-start:\s*25px;/s)
  assert.doesNotMatch(narrow, /\.hero\s*{[^}]*block-size:\s*100vh;/s)
})

test('tablet Framework uses the source 598px wrapper and 731px card row', () => {
  const tablet = media(frameworkCss, '(min-width: 810px) and (max-width: 1199px)')
  assert.match(tablet, /\.section\s*{[^}]*block-size:\s*598px;[^}]*min-block-size:\s*598px;[^}]*padding-inline:\s*40px;/s)
  assert.match(tablet, /\.inner\s*>\s*:first-child h2\s*{[^}]*font-size:\s*36px;[^}]*line-height:\s*48\.8px;/s)
  assert.match(tablet, /grid-template-columns:\s*246px 232px 232px;/)
  assert.match(tablet, /max-inline-size:\s*731px;/)
  assert.match(tablet, /gap:\s*10px;/)
  assert.match(tablet, /\.card:nth-child\(2\)\s*{[^}]*block-size:\s*328px;/s)
  assert.match(tablet, /\.copy h3\s*{[^}]*font-size:\s*19px;[^}]*line-height:\s*24px;/s)
  assert.match(tablet, /\.copy p\s*{[^}]*font-size:\s*13px;[^}]*line-height:\s*21\.6px;/s)
  assert.equal(246 + 232 + 232 + 2 * 10, 730)
  assert.equal(682 - 598, 84)
})

test('Framework label uses the source Inter role and separator asset', () => {
  assert.match(
    frameworkCss,
    /\.inner\s*>\s*:first-child\s*>\s*:first-child\s*{[^}]*gap:\s*8px;[^}]*font-family:\s*var\(--astro-font-ui\);[^}]*letter-spacing:\s*-0\.54px;/s,
  )
  assert.match(
    frameworkCss,
    /FgRH97CRKc89glFrnVOauFDy3qE\.png[^}]*center\/contain no-repeat/,
  )
})

test('narrow-phone Framework carries the dedicated source heading role', () => {
  const narrow = media(frameworkCss, '(max-width: 389px)')
  assert.match(narrow, /\.section\s*{[^}]*padding-inline:\s*30px;/s)
  assert.match(narrow, /\.inner\s*>\s*:first-child\s*>\s*:first-child\s*{[^}]*font-size:\s*14px;/s)
  assert.match(narrow, /\.inner\s*>\s*:first-child h2\s*{[^}]*font-size:\s*20px;[^}]*line-height:\s*30\.8px;/s)
  assert.match(narrow, /\.card:first-child \.visual\s*{[^}]*block-size:\s*319\.4375px;/s)
  assert.match(narrow, /\.card:nth-child\(2\) \.visual\s*{[^}]*block-size:\s*341\.05px;/s)
  assert.match(narrow, /\.card:nth-child\(3\) \.visual\s*{[^}]*block-size:\s*319\.4375px;/s)

  const heroDelta = 873.375 - 667
  const frameworkDelta = 1520.390625 - 1562.375
  assert.equal(heroDelta + frameworkDelta, 164.390625)
})

test('wide-mobile Framework uses the full 24px-inset source variant', () => {
  const mobile = media(frameworkCss, '(max-width: 809px)')
  const wideMobile = media(frameworkCss, '(min-width: 390px) and (max-width: 809px)')

  assert.match(mobile, /\.inner\s*>\s*:first-child\s*>\s*:first-child\s*{[^}]*font-size:\s*14px;/s)
  assert.match(mobile, /\.copy\s*{[^}]*padding-inline:\s*24px;/s)
  assert.match(mobile, /\.copy h3\s*{[^}]*font-weight:\s*400;[^}]*line-height:\s*24px;/s)
  assert.match(wideMobile, /\.section\s*{[^}]*padding-inline:\s*24px;/s)
  assert.match(wideMobile, /\.inner\s*{[^}]*max-inline-size:\s*none;/s)
  assert.match(wideMobile, /\.copy p\s*{[^}]*font-size:\s*16px;[^}]*line-height:\s*21\.6px;/s)
})
