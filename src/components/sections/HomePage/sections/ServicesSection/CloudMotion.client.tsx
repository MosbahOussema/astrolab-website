'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { caseEntryVisible } from '../../../CaseStudyPage/caseIntersection'
import { caseSpring } from '../../../CaseStudyPage/caseSpring'
import { cloudEntryOffset, cloudPlaybackState } from './cloudMotion'

export function CloudMotion({ children, className }: { children: ReactNode; className: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const entryRoot = root?.closest<HTMLElement>('[data-service-reveal]')
    if (!root || !entryRoot) return

    const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-cloud-row]'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let entryObserver: IntersectionObserver | undefined
    let entryFrame = 0
    let inViewport = false
    let entryStarted = false
    let entryFinished = false
    let entryElapsed = 0
    let entryLastTime = 0

    const syncPlayback = () => {
      const state = cloudPlaybackState({
        hidden: document.hidden,
        inViewport,
        reduced: reducedMotion.matches,
      })
      rows.forEach((row) => {
        row.style.animationPlayState = state
      })
    }

    const finishEntry = () => {
      cancelAnimationFrame(entryFrame)
      entryFrame = 0
      entryFinished = true
      entryRoot.style.opacity = '1'
      entryRoot.style.transform = 'none'
      entryRoot.style.removeProperty('will-change')
    }

    const tickEntry = (now: number) => {
      entryFrame = 0
      if (document.hidden || reducedMotion.matches) {
        entryLastTime = 0
        return
      }
      if (!entryLastTime) entryLastTime = now
      entryElapsed += (now - entryLastTime) / 1000
      entryLastTime = now
      const offset = cloudEntryOffset(getComputedStyle(entryRoot).direction)
      const sample = caseSpring(entryElapsed, 200, 45)
      entryRoot.style.opacity = String(Math.min(1, Math.max(0, 1 - sample.displacement)))
      entryRoot.style.transform = `translate3d(${offset * sample.displacement}px, 0, 0)`
      if (
        Math.abs(offset * sample.displacement) < 0.01 &&
        Math.abs(offset * sample.velocity) < 0.01
      ) {
        finishEntry()
        return
      }
      entryFrame = requestAnimationFrame(tickEntry)
    }

    const startEntry = () => {
      if (entryStarted || entryFinished) return
      entryStarted = true
      entryFrame = requestAnimationFrame(tickEntry)
    }

    const syncEntry = () => {
      cancelAnimationFrame(entryFrame)
      entryFrame = 0
      entryLastTime = 0
      if (entryStarted && !entryFinished && !document.hidden && !reducedMotion.matches) {
        entryFrame = requestAnimationFrame(tickEntry)
      }
    }

    rows.forEach((row) => {
      row.style.animationPlayState = 'paused'
    })
    const loopObserver = new IntersectionObserver(([entry]) => {
      inViewport = Boolean(entry?.isIntersecting)
      syncPlayback()
    })
    loopObserver.observe(root)

    if (reducedMotion.matches) finishEntry()
    else {
      const offset = cloudEntryOffset(getComputedStyle(entryRoot).direction)
      entryRoot.style.opacity = '0'
      entryRoot.style.transform = `translate3d(${offset}px, 0, 0)`
      entryRoot.style.willChange = 'opacity, transform'
      entryObserver = new IntersectionObserver(
        ([entry]) => {
          if (
            !entry ||
            !caseEntryVisible(
              entry.isIntersecting,
              entry.intersectionRect.height,
              entry.boundingClientRect.height,
              window.innerHeight,
            )
          )
            return
          entryObserver?.disconnect()
          startEntry()
        },
        { threshold: Array.from({ length: 101 }, (_, index) => index / 100) },
      )
      entryObserver.observe(entryRoot)
    }

    const onVisibility = () => {
      syncPlayback()
      syncEntry()
    }
    const onPreference = () => {
      syncPlayback()
      if (!reducedMotion.matches || entryFinished) return
      entryObserver?.disconnect()
      finishEntry()
    }
    document.addEventListener('visibilitychange', onVisibility)
    reducedMotion.addEventListener('change', onPreference)

    return () => {
      entryObserver?.disconnect()
      loopObserver?.disconnect()
      cancelAnimationFrame(entryFrame)
      document.removeEventListener('visibilitychange', onVisibility)
      reducedMotion.removeEventListener('change', onPreference)
      rows.forEach((row) => {
        row.style.removeProperty('animation-play-state')
      })
      entryRoot.style.removeProperty('opacity')
      entryRoot.style.removeProperty('transform')
      entryRoot.style.removeProperty('will-change')
    }
  }, [])

  return (
    <div ref={rootRef} className={className} aria-hidden="true">
      {children}
    </div>
  )
}
