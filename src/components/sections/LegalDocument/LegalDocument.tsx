import type {
  LegalBlock,
  LegalDocumentContent,
  LegalTextFormatting,
} from '@/content/contracts/secondary'
import { Fragment } from 'react'
import { LegalReveal } from './LegalReveal.client'

import styles from './LegalDocument.module.css'

function InlineText({ text, formatting }: { text: string; formatting: LegalTextFormatting }) {
  const marks = [
    ...(formatting.emphasis ?? []).map((value) => ({ text: value, href: undefined })),
    ...(formatting.links ?? []),
  ]
    .flatMap((mark) => {
      const start = text.indexOf(mark.text)
      return start < 0 ? [] : [{ ...mark, start, end: start + mark.text.length }]
    })
    .sort((a, b) => a.start - b.start)
  let cursor = 0
  const parts = []
  for (const mark of marks) {
    if (mark.start < cursor) continue
    const before = text.slice(cursor, mark.start)
    cursor = mark.end
    parts.push(
      <Fragment key={`${mark.start}-${mark.end}`}>
        {before}
        {mark.href ? (
          <a href={mark.href} rel="noopener" target="_blank">
            {mark.text}
          </a>
        ) : (
          <strong>{mark.text}</strong>
        )}
      </Fragment>,
    )
  }
  return (
    <>
      {parts}
      {text.slice(cursor)}
    </>
  )
}

function Blocks({ blocks }: { blocks: readonly LegalBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === 'spacer')
      return (
        <p key={`spacer-${index}`} aria-hidden="true">
          <br />
        </p>
      )
    if (block.type === 'list') {
      return (
        <ul key={`list-${index}`}>
          {block.items.map((item) => (
            <li key={item}>
              <InlineText text={item} formatting={block} />
            </li>
          ))}
        </ul>
      )
    }

    return (
      <p key={`${block.text.slice(0, 24)}-${index}`}>
        <InlineText text={block.text} formatting={block} />
      </p>
    )
  })
}

export default function LegalDocument({ content }: { content: LegalDocumentContent }) {
  return (
    <main className={styles.page}>
      <LegalReveal key={content.slug} className={styles.document}>
        <header>
          <h1
            data-legal-entry="title"
            style={{
              opacity: 0,
              transform: 'translateY(-50px)',
              willChange: 'opacity, transform',
            }}
          >
            {content.title}
          </h1>
          <time
            data-legal-entry="date"
            style={{
              opacity: 0,
              transform: 'translateY(-50px)',
              willChange: 'opacity, transform',
            }}
          >
            {content.date}
          </time>
        </header>
        <div
          className={styles.body}
          data-legal-entry="body"
          style={{
            opacity: 0,
            transform: 'translateY(50px)',
            willChange: 'opacity, transform',
          }}
        >
          {content.intro?.length ? (
            <div className={styles.intro}>
              <Blocks blocks={content.intro} />
            </div>
          ) : null}
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <Blocks blocks={section.blocks} />
            </section>
          ))}
        </div>
      </LegalReveal>
    </main>
  )
}
