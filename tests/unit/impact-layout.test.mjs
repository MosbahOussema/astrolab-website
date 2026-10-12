import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const css = readFileSync(
  new URL(
    '../../src/components/sections/HomePage/sections/ImpactSection/ImpactSection.module.css',
    import.meta.url,
  ),
  'utf8',
)
const section = readFileSync(
  new URL(
    '../../src/components/sections/HomePage/sections/ImpactSection/ImpactSection.tsx',
    import.meta.url,
  ),
  'utf8',
)
const icons = readFileSync(
  new URL(
    '../../src/components/sections/HomePage/sections/ImpactSection/ImpactIcons.tsx',
    import.meta.url,
  ),
  'utf8',
)

function media(query) {
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

test('Impact uses the measured desktop and responsive grid geometry', () => {
  assert.match(css, /\.inner\s*{[^}]*gap:\s*44px;[^}]*inline-size:\s*1100px;/s)
  assert.match(
    css,
    /\.grid\s*{[^}]*grid-template-rows:\s*repeat\(2, minmax\(0, 1fr\)\);[^}]*gap:\s*24px;[^}]*block-size:\s*513px;/s,
  )
  assert.match(css, /\.card:nth-child\(-n \+ 3\)\s*{[^}]*block-size:\s*245px;/s)

  const tablet = media('(min-width: 810px) and (max-width: 1199.98px)')
  assert.match(tablet, /\.section\s*{[^}]*block-size:\s*1222px;/s)
  assert.match(tablet, /grid-template-columns:\s*repeat\(2, minmax\(50px, 1fr\)\)/)
  assert.match(tablet, /gap:\s*100px 31px/)
  assert.match(tablet, /\.card h3\s*{[^}]*font-size:\s*24px;/s)
  assert.match(tablet, /\.card p\s*{[^}]*font-size:\s*18px;[^}]*line-height:\s*21\.6px;/s)

  const mobile = media('(min-width: 390px) and (max-width: 809.98px)')
  assert.match(mobile, /grid-template-rows:\s*repeat\(6, minmax\(0, 1fr\)\)/)
  assert.match(mobile, /gap:\s*14px 0/)
  assert.match(mobile, /block-size:\s*1410px/)
  assert.match(mobile, /\.heading h2\s*{[^}]*font-size:\s*28px;[^}]*line-height:\s*33\.6px;/s)
  assert.match(mobile, /\.card h3\s*{[^}]*font-size:\s*22px;/s)
  assert.match(mobile, /\.card p\s*{[^}]*font-size:\s*17px;[^}]*line-height:\s*20\.4px;/s)
  assert.match(
    mobile,
    /\.card:nth-child\(6\) p\s*{[^}]*font-size:\s*17px;[^}]*line-height:\s*20\.4px;/s,
  )

  const narrow = media('(max-width: 389.98px)')
  assert.match(narrow, /font-size:\s*20px/)
  assert.match(narrow, /line-height:\s*30\.8px/)
})

test('Impact uses the source separator and six exact inline icon view boxes', () => {
  assert.equal(section.match(/FgRH97CRKc89glFrnVOauFDy3qE\.png/g)?.length, 2)
  assert.doesNotMatch(section, /lucide-react/)
  for (const viewBox of [
    '0 0 36 36',
    '0 0 36.75 36.75',
    '0 0 32 32',
    '0 0 40 40',
    '0 0 38 38',
    '0 0 32 38',
  ]) {
    assert.match(icons, new RegExp(`viewBox="${viewBox}"`))
  }
})
