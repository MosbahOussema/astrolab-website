import { Fragment } from 'react'
import type { CaseStudyContent } from '@/content/contracts/secondary'

export function CaseRichText({
  text,
  formatting,
}: {
  text: string
  formatting?: CaseStudyContent['overviewFormatting']
}) {
  const marks = (formatting ?? [])
    .flatMap((mark) => {
      const start = text.indexOf(mark.text)
      return start < 0 ? [] : [{ ...mark, start, end: start + mark.text.length }]
    })
    .sort((a, b) => a.start - b.start)
  const parts = []
  let cursor = 0
  for (const mark of marks) {
    if (mark.start < cursor) continue
    parts.push(
      <Fragment key={mark.start}>
        {text.slice(cursor, mark.start)}
        {mark.style === 'strong' ? <strong>{mark.text}</strong> : <em>{mark.text}</em>}
      </Fragment>,
    )
    cursor = mark.end
  }
  return (
    <>
      {parts}
      {text.slice(cursor)}
    </>
  )
}
