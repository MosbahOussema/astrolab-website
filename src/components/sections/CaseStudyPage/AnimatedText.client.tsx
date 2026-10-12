'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

import { caseTextEasing, caseTextMotion, isBreakableRevealWord } from './caseTextMotion'

import styles from './caseStudyStyles'

type AnimatedTextProps = {
  as: 'h2' | 'h3' | 'p'
  className?: string
  text: string
  strong?: boolean
  strongText?: string
  breakableWords?: readonly string[]
  reveal?: boolean
}

export function AnimatedText({
  as: Tag,
  className = '',
  text,
  strong,
  strongText,
  breakableWords,
  reveal = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const parts = text.split(/([\t\n\r ]+)/)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !reveal) return

    const measureLines = () => {
      const lineTops: number[] = []

      container.querySelectorAll<HTMLSpanElement>('[data-case-line-word]').forEach((word) => {
        const top = word.offsetTop
        let lineIndex = lineTops.findIndex((lineTop) => Math.abs(lineTop - top) < 2)

        if (lineIndex === -1) {
          lineIndex = lineTops.length
          lineTops.push(top)
        }

        word.style.setProperty('--astro-line-delay', `${lineIndex * caseTextMotion.lineDelayMs}ms`)
      })
    }

    measureLines()
    const resizeObserver = new ResizeObserver(measureLines)
    resizeObserver.observe(container)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          measureLines()
          setVisible(true)
          observer.disconnect()
          resizeObserver.disconnect()
        }
      },
      { threshold: 0 },
    )

    observer.observe(container)
    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
    }
  }, [reveal])

  const formatPart = (part: string, index: number, characterOffset = 0) => {
    if (!strongText) return part
    const markStart = text.indexOf(strongText)
    if (markStart < 0) return part
    const offset = parts.slice(0, index).join('').length + characterOffset
    const start = Math.max(0, markStart - offset)
    const end = Math.min(part.length, markStart + strongText.length - offset)
    if (start >= end) return part
    return (
      <>
        {part.slice(0, start)}
        <strong>{part.slice(start, end)}</strong>
        {part.slice(end)}
      </>
    )
  }

  if (!reveal) {
    const content = formatPart(text, 0)
    return <Tag className={className}>{strong ? <strong>{content}</strong> : content}</Tag>
  }

  const words = parts.map((part, index) =>
    /^[\t\n\r ]+$/.test(part) ? (
      part
    ) : (
      <span
        aria-hidden="true"
        style={{
          whiteSpace:
            isBreakableRevealWord(part) || breakableWords?.includes(part) ? 'unset' : 'nowrap',
        }}
        key={`${part}-${index}`}
      >
        {Array.from(part).map((character, characterIndex, characters) => (
          <span className={styles.lineWord} data-case-line-word key={characterIndex}>
            {formatPart(character, index, characters.slice(0, characterIndex).join('').length)}
          </span>
        ))}
      </span>
    ),
  )
  return (
    <Tag
      aria-label={text}
      style={
        {
          '--astro-text-easing': caseTextEasing,
          '--astro-text-duration': `${caseTextMotion.durationMs}ms`,
        } as CSSProperties
      }
      className={`${styles.animatedText} ${visible ? styles.animatedTextVisible : ''} ${className}`}
      ref={(element) => {
        containerRef.current = element
      }}
    >
      {strong ? <strong>{words}</strong> : words}
    </Tag>
  )
}
