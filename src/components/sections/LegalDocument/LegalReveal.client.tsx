'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { legalEntranceSpring } from './legalEntranceSpring'

export function LegalReveal({ children, className }: { children: ReactNode; className: string }) {
  const rootRef = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const elements = Array.from(
      rootRef.current?.querySelectorAll<HTMLElement>('[data-legal-entry]') ?? [],
    )
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const active = new Map<HTMLElement, number | null>()
    const reveal = (element: HTMLElement) => {
      element.style.opacity = '1'
      element.style.transform = 'none'
      element.style.removeProperty('will-change')
    }
    if (reduced.matches) {
      elements.forEach(reveal)
      return
    }
    const tick = (now: number) => {
      frame = 0
      for (const [element, started] of active) {
        const origin = started ?? now
        if (started === null) active.set(element, origin)
        const delay = element.dataset.legalEntry === 'title' ? 100 : 0
        const { remaining, velocity } = legalEntranceSpring((now - origin - delay) / 1000)
        const offset = element.dataset.legalEntry === 'body' ? 50 : -50
        element.style.opacity = String(1 - remaining)
        element.style.transform = `translateY(${offset * remaining}px)`
        if (50 * remaining < 0.01 && 50 * Math.abs(velocity) < 0.01) {
          reveal(element)
          active.delete(element)
        }
      }
      if (active.size) frame = requestAnimationFrame(tick)
    }
    elements.forEach((element) => {
      const offset = element.dataset.legalEntry === 'body' ? 50 : -50
      element.style.opacity = '0'
      element.style.transform = `translateY(${offset}px)`
      element.style.willChange = 'opacity, transform'
    })
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const element = entry.target as HTMLElement
          active.set(element, null)
          observer.unobserve(element)
        }
        if (active.size && !frame) frame = requestAnimationFrame(tick)
      },
      { threshold: 0 },
    )
    elements.forEach((element) => observer.observe(element))
    const onPreference = () => {
      if (!reduced.matches) return
      observer.disconnect()
      cancelAnimationFrame(frame)
      frame = 0
      active.clear()
      elements.forEach(reveal)
    }
    reduced.addEventListener('change', onPreference)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      reduced.removeEventListener('change', onPreference)
      elements.forEach((element) => {
        element.style.removeProperty('opacity')
        element.style.removeProperty('transform')
        element.style.removeProperty('will-change')
      })
    }
  }, [])
  return (
    <article ref={rootRef} className={className}>
      {children}
    </article>
  )
}
