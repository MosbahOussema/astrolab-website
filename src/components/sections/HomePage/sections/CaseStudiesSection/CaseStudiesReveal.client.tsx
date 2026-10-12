'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'

import {
  CASE_STUDIES_SPRINGS,
  caseStudiesEntryVisible,
  caseStudiesPlaybackState,
  caseStudiesSpring,
  type CaseStudiesRevealKind,
} from './caseStudiesMotion'

type ActiveEntry = {
  elapsed: number
  element: HTMLElement
  kind: CaseStudiesRevealKind
  lastTime: number
}

export function CaseStudiesReveal({
  children,
  className,
}: {
  children: ReactNode
  className: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>('[data-case-studies-reveal]'),
    )
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const active = new Map<HTMLElement, ActiveEntry>()
    let frame = 0

    const finish = (element: HTMLElement) => {
      active.delete(element)
      element.style.opacity = '1'
      element.style.transform = 'none'
      element.style.removeProperty('will-change')
    }

    const tick = (time: number) => {
      frame = 0
      if (
        caseStudiesPlaybackState({
          active: active.size > 0,
          hidden: document.hidden,
          reduced: reducedMotion.matches,
        }) !== 'running'
      ) {
        active.forEach((entry) => {
          entry.lastTime = 0
        })
        return
      }

      active.forEach((entry) => {
        if (!entry.lastTime) entry.lastTime = time
        entry.elapsed += (time - entry.lastTime) / 1000
        entry.lastTime = time

        const { distance } = CASE_STUDIES_SPRINGS[entry.kind]
        const { remaining, velocity } = caseStudiesSpring(entry.kind, entry.elapsed)
        entry.element.style.opacity = String(1 - remaining)
        entry.element.style.transform = `translate3d(0, ${distance * remaining}px, 0)`

        if (distance * remaining < 0.01 && distance * Math.abs(velocity) < 0.01) {
          finish(entry.element)
        }
      })

      schedule()
    }

    const schedule = () => {
      if (
        !frame &&
        caseStudiesPlaybackState({
          active: active.size > 0,
          hidden: document.hidden,
          reduced: reducedMotion.matches,
        }) === 'running'
      ) {
        frame = requestAnimationFrame(tick)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            !caseStudiesEntryVisible(
              entry.isIntersecting,
              entry.intersectionRect.height,
              entry.boundingClientRect.height,
              window.innerHeight,
            )
          )
            return

          const element = entry.target as HTMLElement
          const kind = element.dataset.caseStudiesReveal as CaseStudiesRevealKind
          observer.unobserve(element)
          active.set(element, { elapsed: 0, element, kind, lastTime: 0 })
        })
        schedule()
      },
      { threshold: Array.from({ length: 101 }, (_, index) => index / 100) },
    )

    const finishAll = () => {
      cancelAnimationFrame(frame)
      frame = 0
      observer.disconnect()
      elements.forEach(finish)
    }

    if (reducedMotion.matches) {
      finishAll()
      return
    }

    // Keep the server/no-JS result readable and install source entry states before paint.
    elements.forEach((element) => {
      const kind = element.dataset.caseStudiesReveal as CaseStudiesRevealKind
      element.style.opacity = '0'
      element.style.transform = `translate3d(0, ${CASE_STUDIES_SPRINGS[kind].distance}px, 0)`
      element.style.willChange = 'opacity, transform'
      observer.observe(element)
    })

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame)
        frame = 0
        active.forEach((entry) => {
          entry.lastTime = 0
        })
      } else {
        schedule()
      }
    }
    const handlePreferenceChange = () => {
      if (reducedMotion.matches) finishAll()
    }

    document.addEventListener('visibilitychange', handleVisibility)
    reducedMotion.addEventListener('change', handlePreferenceChange)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
      reducedMotion.removeEventListener('change', handlePreferenceChange)
      elements.forEach((element) => {
        element.style.removeProperty('opacity')
        element.style.removeProperty('transform')
        element.style.removeProperty('will-change')
      })
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
