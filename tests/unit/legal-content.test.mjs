import assert from 'node:assert/strict'
import { test } from 'node:test'
import { legalDocuments } from '../../src/content/static/secondary.ts'

test('Legal formatting references existing static text without overlapping marks', () => {
  for (const document of legalDocuments) {
    const blocks = [
      ...(document.intro ?? []),
      ...document.sections.flatMap((section) => section.blocks),
    ]
    for (const block of blocks) {
      if (block.type === 'spacer') continue
      const texts = block.type === 'list' ? block.items : [block.text]
      for (const mark of [
        ...(block.emphasis ?? []),
        ...(block.links ?? []).map((link) => link.text),
      ]) {
        assert.ok(
          texts.some((text) => text.includes(mark)),
          `${document.slug}: missing ${mark}`,
        )
      }
      for (const link of block.links ?? []) {
        assert.match(link.href, /^(\/|mailto:)/)
        assert.ok(link.text.length > 0)
      }
      for (const text of texts) {
        const ranges = [...(block.emphasis ?? []), ...(block.links ?? []).map((link) => link.text)]
          .map((mark) => ({ start: text.indexOf(mark), length: mark.length }))
          .filter((range) => range.start >= 0)
          .sort((a, b) => a.start - b.start)
        for (let index = 1; index < ranges.length; index++) {
          assert.ok(ranges[index].start >= ranges[index - 1].start + ranges[index - 1].length)
        }
      }
    }
  }
})

test('Both legal documents retain their source sections and explicit source whitespace blocks', () => {
  const privacy = legalDocuments.find((document) => document.slug === 'privacy-policy')
  const terms = legalDocuments.find((document) => document.slug === 'terms-conditions')
  assert.equal(privacy.sections.length, 10)
  assert.equal(terms.sections.length, 11)
  assert.equal(privacy.intro.filter((block) => block.type === 'spacer').length, 1)
  assert.equal(
    privacy.sections.flatMap((section) => section.blocks).filter((block) => block.type === 'spacer')
      .length,
    2,
  )
  assert.equal(privacy.date, '8/12/2025')
  assert.equal(terms.date, '08/12/2025')
})
