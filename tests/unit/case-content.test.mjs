import assert from 'node:assert/strict'
import { test } from 'node:test'
import { caseStudies } from '../../src/content/static/secondary.ts'

test('A-014 retains Rawi content instead of the reference mobile EldoWallet copy', () => {
  const rawi = caseStudies.find((page) => page.slug === 'rawi-al-kotob-use-case')
  const sections = rawi.sections.filter((section) =>
    ['services', 'challenges', 'strategy', 'results'].includes(section.id),
  )
  assert.doesNotMatch(JSON.stringify(sections), /EldoWallet|Breaking Through Loyalty Barriers/)
  assert.equal(
    sections.find((section) => section.id === 'results').items[0].title,
    'Regional Market Leadership:',
  )
  assert.equal(rawi.sections.find((section) => section.id === 'strategy').items[0].image, undefined)
  assert.ok(rawi.sections.find((section) => section.id === 'strategy').items[1].image)
})

test('all case-study facts keep their real labels on responsive screens', () => {
  for (const page of caseStudies) {
    assert.deepEqual(
      page.facts.map((fact) => fact.label),
      ['Market', 'Platform'],
      page.slug,
    )
    assert.ok(page.facts.every((fact) => fact.mobileLabel === undefined), page.slug)
  }
})

test('Case structured lists and measured breakable words refer to valid static content', () => {
  for (const page of caseStudies) {
    for (const section of page.sections) {
      for (const item of section.items ?? []) {
        if (item.titleStrongText) assert.ok(item.title.includes(item.titleStrongText))
      }
      for (const block of section.introBlocks ?? []) {
        if (block.type === 'list') {
          assert.ok(block.items.length > 0)
          assert.ok(block.items.every((text) => text.trim().length > 0))
        } else {
          for (const word of block.breakableWords ?? []) {
            assert.ok(block.text.split(/[\t\n\r ]+/).includes(word), `${page.slug}: ${word}`)
          }
        }
      }
    }
  }
  const mazad = caseStudies.find((page) => page.slug === 'mazad-al-jomrok-use-case')
  const list = mazad.sections
    .find((section) => section.id === 'solutions')
    .introBlocks.find((block) => block.type === 'list')
  assert.equal(list.ordered, true)
  assert.equal(list.items.length, 3)
})

test('A-016 preserves Talinty challenge and result titles on mobile', () => {
  const talinty = caseStudies.find((page) => page.slug === 'talinty-ai-recruitment-platform')
  assert.doesNotMatch(
    JSON.stringify(talinty.sections),
    /Loyalty Barriers|Transaction Volume|Customer Acquisition Cost/,
  )
  assert.equal(
    talinty.sections.find((section) => section.id === 'challenges').title,
    'Breaking Traditional Recruitment Barriers',
  )
})

test('EldoWallet preserves natural cards and the two independently revealed result paragraphs', () => {
  const eldo = caseStudies.find((page) => page.slug === 'eldowallet-use-case')
  assert.equal(eldo.sections.find((section) => section.id === 'services').itemTitleReveal, false)
  const challenges = eldo.sections.find((section) => section.id === 'challenges')
  for (const item of challenges.items.slice(2)) {
    assert.equal(item.titleReveal, false)
    assert.equal(item.textReveal, false)
  }
  const results = eldo.sections.find((section) => section.id === 'results')
  assert.equal(results.intro[0].split('\n').length, 2)
  assert.match(results.intro[0].split('\n')[1], /^  The KPIs/)
  assert.equal(results.itemTitleReveal, false)
  assert.equal(results.textReveal, false)
  assert.equal(results.items[5].textReveal, true)
})
