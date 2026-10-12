import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const component = readFileSync(
  new URL('../../src/components/layout/SiteFooter/SiteFooter.tsx', import.meta.url),
  'utf8',
)
const styles = readFileSync(
  new URL('../../src/components/layout/SiteFooter/SiteFooter.module.css', import.meta.url),
  'utf8',
)

test('footer uses the two measured source entrance springs at the fifty-percent threshold', () => {
  assert.match(component, /stiffness: offset === 50 \? 320 : 66/)
  assert.match(component, /damping: offset === 50 \? 70 : 20/)
  assert.match(component, /data-footer-entry="40"/)
  assert.match(component, /data-footer-entry="50"/)
  assert.match(component, /visibleHeight \/ Math\.min\(elementHeight, viewportHeight\) >= 0\.5/)
  assert.match(component, /document\.hidden/)
  assert.match(component, /prefers-reduced-motion: reduce/)
})

test('footer preserves the authored desktop, tablet, and phone geometry', () => {
  assert.match(component, /usePathname/)
  assert.match(component, /pathname === '\/contact' \? styles\.contact/)
  assert.match(component, /pathname === '\/' \? styles\.home/)
  assert.match(component, /isCaseStudy \? styles\.caseStudy/)
  assert.match(component, /pathname === '\/eldowallet-use-case' \? styles\.eldowalletCase/)
  assert.match(styles, /padding: 100px 50px 28px/)
  assert.match(styles, /inline-size: 1124px/)
  assert.match(styles, /max-inline-size: 1100px/)
  assert.match(styles, /@media \(min-width: 810px\) and \(max-width: 1199px\)/)
  assert.match(
    styles,
    /@media \(min-width: 810px\) and \(max-width: 1199px\)[\s\S]*?\.footer\s*\{[^}]*inline-size:\s*calc\(100% - 40px\)[^}]*margin-inline:\s*20px;[^}]*margin-block-end:\s*20px/s,
  )
  assert.match(styles, /font-size: 55px/)
  assert.match(styles, /min-block-size: 134px/)
  assert.match(styles, /grid-template-columns: repeat\(3, minmax\(50px, 1fr\)\)/)
  assert.match(styles, /@media \(max-width: 809px\)/)
  assert.match(
    styles,
    /\.footer\.contact\s*\{[^}]*inline-size:\s*100%[^}]*margin-block-end:\s*22px/s,
  )
  assert.match(styles, /inline-size: calc\(100% - 40px\)/)
  assert.match(styles, /block-size: 1979px/)
  assert.match(styles, /margin-inline: 20px/)
  assert.match(styles, /padding: 50px 20px/)
  assert.match(styles, /inline-size: 341px/)
  assert.match(styles, /max-inline-size: none/)
  assert.match(styles, /grid-template-rows: repeat\(2, 134px\)/)
  assert.match(styles, /block-size: 306px/)
  assert.match(styles, /inline-size: max-content/)
  assert.match(styles, /white-space: nowrap/)
  assert.match(styles, /font-size: 32px/)
  assert.match(styles, /grid-template-columns: repeat\(2, minmax\(50px, 1fr\)\)/)
  assert.match(
    styles,
    /\.footer\.home\s*\{[^}]*inline-size:\s*100%[^}]*block-size:\s*1925px[^}]*margin-inline:\s*0/s,
  )
  assert.match(
    styles,
    /\.footer\.caseStudy\s*\{[^}]*margin-block-end:\s*30px/s,
  )
  assert.match(
    styles,
    /\.footer\.eldowalletCase\s*\{[^}]*inline-size:\s*calc\(100% - 60px\)[^}]*margin-inline:\s*30px/s,
  )
  assert.match(
    styles,
    /@media \(max-width: 375px\)[\s\S]*?\.footer\.home\s*\{[^}]*block-size:\s*1996px/s,
  )
})

test('footer layout avoids physical inline positioning properties', () => {
  assert.doesNotMatch(
    styles,
    /(?:^|[;{]\s*)(?:left|right|margin-left|margin-right|padding-left|padding-right)\s*:/m,
  )
})
