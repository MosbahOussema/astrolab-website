import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const component = readFileSync(
  new URL('../../src/components/layout/SiteHeader/SiteHeader.client.tsx', import.meta.url),
  'utf8',
)
const styles = readFileSync(
  new URL('../../src/components/layout/SiteHeader/SiteHeader.module.css', import.meta.url),
  'utf8',
)

test('legal routes preserve the measured narrow mobile navigation inset', () => {
  assert.match(component, /pathname\.startsWith\('\/policies\/'\) \? styles\.legal/)
  assert.match(
    styles,
    /@media \(max-width: 809\.98px\)[\s\S]*?\.legal \.navigation\s*\{[^}]*padding-inline:\s*50px;[^}]*gap:\s*24px;/s,
  )
})

test('header responsive positioning remains logical-direction safe', () => {
  assert.doesNotMatch(
    styles,
    /(?:^|[;{]\s*)(?:left|right|margin-left|margin-right|padding-left|padding-right)\s*:/m,
  )
})
