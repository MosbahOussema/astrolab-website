'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { servicesHeadingSpring } from '../../shared/servicesHeadingSpring'

export function ServicesReveal({
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
    const targets = Array.from(
      root.querySelectorAll<HTMLElement>('[data-service-reveal], [data-service-heading]'),
    )
    const heading = root.querySelector<HTMLElement>('[data-service-heading]')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let started = false
    let finished = false
    let elapsed = 0
    let lastTime = 0
    const finishHeading = () => {
      cancelAnimationFrame(frame)
      frame = 0
      finished = true
      if (!heading) return
      heading.style.opacity = '1'
      heading.style.transform = 'none'
      heading.style.removeProperty('will-change')
    }
    const tick = (time: number) => {
      frame = 0
      if (!heading || finished) return
      if (document.hidden) {
        lastTime = 0
        return
      }
      if (!lastTime) lastTime = time
      elapsed += (time - lastTime) / 1000
      lastTime = time
      const { remaining, velocity } = servicesHeadingSpring(elapsed)
      heading.style.opacity = String(1 - remaining)
      heading.style.transform = `translate3d(0, ${40 * remaining}px, 0)`
      if (40 * remaining < 0.01 && 40 * Math.abs(velocity) < 0.01) finishHeading()
      else frame = requestAnimationFrame(tick)
    }
    const showAll = () => {
      finishHeading()
      targets.forEach((target) => {
        target.dataset.visible = 'true'
      })
    }
    if (reducedMotion.matches) {
      showAll()
      return
    }
    // Keep the server/no-JS version readable; initialize the source entry before paint.
    if (heading) {
      heading.style.opacity = '0'
      heading.style.transform = 'translate3d(0, 40px, 0)'
      heading.style.willChange = 'opacity, transform'
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return
          ;(entry.target as HTMLElement).dataset.visible = 'true'
          if (entry.target === heading && !started) {
            started = true
            frame = requestAnimationFrame(tick)
          }
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.5 },
    )
    targets.forEach((target) => observer.observe(target))
    const onPreferenceChange = () => {
      if (!reducedMotion.matches) return
      observer.disconnect()
      showAll()
    }
    const onVisibilityChange = () => {
      cancelAnimationFrame(frame)
      frame = 0
      lastTime = 0
      if (!document.hidden && started && !finished) frame = requestAnimationFrame(tick)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    reducedMotion.addEventListener('change', onPreferenceChange)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      reducedMotion.removeEventListener('change', onPreferenceChange)
      heading?.style.removeProperty('opacity')
      heading?.style.removeProperty('transform')
      heading?.style.removeProperty('will-change')
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
