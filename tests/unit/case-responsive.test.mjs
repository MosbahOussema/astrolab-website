import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const styleComposition = readFileSync(
  new URL('../../src/components/sections/CaseStudyPage/caseStudyStyles.ts', import.meta.url),
  'utf8',
)

const css = [
  'CaseStudyBase.module.css',
  'CaseStudyVariants.module.css',
  'CaseStudyResponsive.module.css',
]
  .map((file) =>
    readFileSync(new URL(`../../src/components/sections/CaseStudyPage/${file}`, import.meta.url), 'utf8'),
  )
  .join('\n')

function media(query, occurrence = 0) {
  const marker = `@media ${query}`
  let start = -1
  for (let index = 0; index <= occurrence; index += 1) {
    start = css.indexOf(marker, start + 1)
    assert.notEqual(start, -1, `missing ${query} occurrence ${occurrence + 1}`)
  }

  let depth = 0
  let bodyStart = -1
  for (let index = start; index < css.length; index += 1) {
    if (css[index] === '{') {
      depth += 1
      if (bodyStart === -1) bodyStart = index + 1
    } else if (css[index] === '}') {
      depth -= 1
      if (bodyStart !== -1 && depth === 0) return css.slice(bodyStart, index)
    }
  }
  assert.fail(`unterminated ${query}`)
}

test('case pages preserve the exact 810 and 1200 source variant boundaries', () => {
  const tablet = media('(min-width: 810px) and (max-width: 1199.98px)')
  const belowDesktop = media('(max-width: 1199.98px)', 1)
  const phone = media('(max-width: 809.98px)')

  assert.match(
    tablet,
    /data-case='talinty-ai-recruitment-platform'.*data-case='mazad-al-jomrok-use-case'[^{]*\)\s*\.contentSection\s*{[^}]*inline-size:\s*calc\(100% - 168px\);[^}]*gap:\s*37px;/s,
  )
  assert.match(tablet, /:is\(\.services, \.challenges\)\s*{[^}]*gap:\s*40px;/s)
  assert.match(tablet, /:is\(\.results, \.conclusion\)\s*{[^}]*gap:\s*24px;/s)
  assert.match(
    tablet,
    /data-case='talinty-ai-recruitment-platform'.*data-case='rawi-al-kotob-use-case'[^{]*\)\s*\.heroImage\s*img\s*{[^}]*block-size:\s*646px;[^}]*inset-block-start:\s*calc\(50% - 322\.75px\);/s,
  )
  assert.match(tablet, /data-editorial='true'\]\s*\.relatedCard h3\s*{[^}]*font-size:\s*20px;/s)
  assert.match(belowDesktop, /\.hero h1\s*{[^}]*font-size:\s*42px;/s)
  assert.match(phone, /\.hero h1\s*{[^}]*font-size:\s*28px;/s)
  assert.match(css, /\.hero h1\s*{[^}]*font-size:\s*72px;/s)
})

test('responsive case styles are emitted after desktop variants', () => {
  assert.match(
    styleComposition,
    /import baseStyles[^\n]+\nimport variantStyles[^\n]+\nimport responsiveStyles/,
  )
  assert.match(
    css,
    /data-case='mazad-al-jomrok-use-case'\] \.heroImage\s*{[^}]*inline-size:\s*min\(1032px, 100%\);/s,
  )
  assert.match(
    css,
    /data-case='eldowallet-use-case'\] \.contentSection\s*\{[^}]*inline-size:\s*calc\(100% - 60px\);/s,
  )
  assert.match(
    css,
    /data-case='talinty-ai-recruitment-platform'\] \.contentSection\s*\{[^}]*inline-size:\s*calc\(100% - 40px\);/s,
  )
  assert.match(
    css,
    /data-case='rawi-al-kotob-use-case'\] \.overview\s*\{[^}]*margin-block-start:\s*95px;/s,
  )
  assert.match(
    css,
    /data-case='talinty-ai-recruitment-platform'\] \.solutions\s*\{[^}]*margin-block-start:\s*52px;/s,
  )
})

test('case media retain the measured crop and the explicit mobile exceptions', () => {
  const phone = media('(max-width: 809.98px)')

  assert.match(
    css,
    /\.itemImage img\s*{[^}]*inset-block-start:\s*calc\(50% - 100\.1470588235294% \/ 2\);/s,
  )
  assert.match(
    phone,
    /data-case='rawi-al-kotob-use-case'[^{]*\.results \.itemReveal:nth-child\(-n \+ 2\)\s*{[^}]*min-block-size:\s*0;/s,
  )
  assert.match(
    phone,
    /A-015:[\s\S]*data-case='mazad-al-jomrok-use-case'[^{]*\.hero\s*{[^}]*block-size:\s*auto;[^}]*gap:\s*30px;/s,
  )
})

test('case layout avoids physical inline positioning properties', () => {
  assert.doesNotMatch(
    css,
    /(?:^|[;{]\s*)(?:left|right|margin-left|margin-right|padding-left|padding-right|border-left|border-right)\s*:/m,
  )
})
