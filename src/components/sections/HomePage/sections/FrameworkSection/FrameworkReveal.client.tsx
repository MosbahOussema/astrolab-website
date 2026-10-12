'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

import {
  FRAMEWORK_ENTRY_SPRINGS,
  frameworkEntryPlaybackState,
  frameworkEntrySpring,
  frameworkEntryTransform,
  frameworkEntryVisible,
  type FrameworkEntryDirection,
  type FrameworkEntryKind,
} from './frameworkEntryMotion'

type ActiveEntry = {
  direction: FrameworkEntryDirection
  elapsed: number
  element: HTMLElement
  kind: Exclude<FrameworkEntryKind, 'mapping'>
  lastTime: number
}

export function FrameworkReveal({
  children,
  className,
}: {
  children: ReactNode
  className: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useLayoutEffect(() => {
    const wrapper = ref.current
    if (!wrapper) return

    const elements = Array.from(
      wrapper.querySelectorAll<HTMLElement>('[data-framework-entry]'),
    )
    const animatedElements = elements.filter(
      (element) => element.dataset.frameworkEntry !== 'mapping',
    )
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const active = new Map<HTMLElement, ActiveEntry>()
    let frame = 0

    const reset = (element: HTMLElement) => {
      active.delete(element)
      element.style.removeProperty('opacity')
      element.style.removeProperty('transform')
      element.style.removeProperty('will-change')
    }

    const finishAll = () => {
      cancelAnimationFrame(frame)
      frame = 0
      observer.disconnect()
      animatedElements.forEach(reset)
    }

    function tick(time: number) {
      frame = 0
      if (
        frameworkEntryPlaybackState({
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

        const { remaining, velocity } = frameworkEntrySpring(entry.kind, entry.elapsed)
        const { distance } = FRAMEWORK_ENTRY_SPRINGS[entry.kind]
        entry.element.style.opacity = String(1 - remaining)
        entry.element.style.transform = frameworkEntryTransform(
          entry.kind,
          remaining,
          entry.direction,
        )

        if (distance * remaining < 0.01 && distance * Math.abs(velocity) < 0.01) {
          reset(entry.element)
        }
      })

      schedule()
    }

    function schedule() {
      if (
        !frame &&
        frameworkEntryPlaybackState({
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
            !frameworkEntryVisible(
              entry.isIntersecting,
              entry.intersectionRect.height,
              entry.boundingClientRect.height,
              window.innerHeight,
            )
          )
            return

          const element = entry.target as HTMLElement
          const kind = element.dataset.frameworkEntry
          if (kind !== 'direction' && kind !== 'execution') return
          observer.unobserve(element)
          active.set(element, {
            direction: getComputedStyle(element).direction === 'rtl' ? 'rtl' : 'ltr',
            elapsed: 0,
            element,
            kind,
            lastTime: 0,
          })
        })
        schedule()
      },
      { threshold: Array.from({ length: 101 }, (_, index) => index / 100) },
    )

    if (reducedMotion.matches) {
      finishAll()
      return
    }

    animatedElements.forEach((element) => {
      const kind = element.dataset.frameworkEntry as Exclude<
        FrameworkEntryKind,
        'mapping'
      >
      element.style.opacity = '0'
      element.style.transform = frameworkEntryTransform(
        kind,
        1,
        getComputedStyle(element).direction === 'rtl' ? 'rtl' : 'ltr',
      )
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
      observer?.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
      reducedMotion.removeEventListener('change', handlePreferenceChange)
      animatedElements.forEach(reset)
    }
  }, [])

  useEffect(() => {
    const wrapper = ref.current
    const heading = wrapper?.firstElementChild
    if (!heading) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.intersectionRatio && entry.intersectionRatio >= 0.5) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(heading)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={className} data-visible={visible}>
      {children}
    </div>
  )
}
