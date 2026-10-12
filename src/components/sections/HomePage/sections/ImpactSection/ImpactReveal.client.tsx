'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'

import { impactEntryVisible, impactSpring } from './impactMotion'

type ActiveEntry = {
  element: HTMLElement
  elapsed: number
  lastTime: number
}

export function ImpactReveal({
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

    const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-impact-reveal]'))
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
      if (document.hidden) {
        active.forEach((entry) => {
          entry.lastTime = 0
        })
        return
      }

      active.forEach((entry) => {
        if (!entry.lastTime) entry.lastTime = time
        entry.elapsed += (time - entry.lastTime) / 1000
        entry.lastTime = time

        const { remaining, velocity } = impactSpring(entry.elapsed)
        entry.element.style.opacity = String(1 - remaining)
        entry.element.style.transform = `translate3d(0, ${40 * remaining}px, 0)`

        if (40 * remaining < 0.01 && 40 * Math.abs(velocity) < 0.01) {
          finish(entry.element)
        }
      })

      if (active.size) frame = requestAnimationFrame(tick)
    }

    const schedule = () => {
      if (!frame && active.size && !document.hidden) frame = requestAnimationFrame(tick)
    }

    const start = (element: HTMLElement) => {
      if (active.has(element)) return
      active.set(element, { element, elapsed: 0, lastTime: 0 })
      schedule()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            !impactEntryVisible(
              entry.isIntersecting,
              entry.intersectionRect.height,
              entry.boundingClientRect.height,
              window.innerHeight,
            )
          )
            return

          observer.unobserve(entry.target)
          start(entry.target as HTMLElement)
        })
      },
      { threshold: Array.from({ length: 101 }, (_, index) => index / 100) },
    )

    const showAll = () => {
      cancelAnimationFrame(frame)
      frame = 0
      observer.disconnect()
      elements.forEach(finish)
    }

    if (reducedMotion.matches) {
      showAll()
      return
    }

    // The server/no-JS result remains readable; hydration installs the source state before paint.
    elements.forEach((element) => {
      element.style.opacity = '0'
      element.style.transform = 'translate3d(0, 40px, 0)'
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
      if (reducedMotion.matches) showAll()
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
