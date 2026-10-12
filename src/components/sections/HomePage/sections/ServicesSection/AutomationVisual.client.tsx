'use client'

import { useEffect, useRef } from 'react'
import { automationShimmerFrame } from './automationShimmer'
import styles from './AutomationVisual.module.css'

const connectors = [
  { d: 'M1 0c0 150 250 75 250 200', width: 501, reverse: true },
  { d: 'M250 200c0-125-150-50-150-200', width: 500 },
  { d: 'M250 200c0-125-50-50-50-200', width: 500 },
  { d: 'M250 200c0-125 50-50 50-200', width: 500 },
  { d: 'M250 200c0-125 150-50 150-200', width: 500 },
  { d: 'M250 200c0-125 250-50 250-200', width: 501 },
]

export function AutomationVisual() {
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animation = 0
    let elapsed = 0
    let inViewport = typeof IntersectionObserver === 'undefined'
    let lastTime = 0
    const tick = (time: number) => {
      animation = 0
      if (!inViewport || document.hidden || preference.matches) {
        lastTime = 0
        return
      }
      if (!lastTime) lastTime = time
      elapsed += time - lastTime
      lastTime = time
      const values = automationShimmerFrame(elapsed)
      frame.style.setProperty('--automation-forward', String(values.forward))
      frame.style.setProperty('--automation-reverse', String(values.reverse))
      frame.style.setProperty('--automation-opacity', String(values.opacity))
      animation = window.requestAnimationFrame(tick)
    }
    const syncMotion = () => {
      window.cancelAnimationFrame(animation)
      animation = 0
      lastTime = 0
      if (preference.matches) {
        elapsed = 0
        frame.style.setProperty('--automation-opacity', '0')
        return
      }
      if (inViewport && !document.hidden) animation = window.requestAnimationFrame(tick)
    }
    const observer =
      typeof IntersectionObserver === 'undefined'
        ? undefined
        : new IntersectionObserver(([entry]) => {
            inViewport = Boolean(entry?.isIntersecting)
            syncMotion()
          })
    observer?.observe(frame)
    syncMotion()
    document.addEventListener('visibilitychange', syncMotion)
    preference.addEventListener('change', syncMotion)
    return () => {
      window.cancelAnimationFrame(animation)
      observer?.disconnect()
      document.removeEventListener('visibilitychange', syncMotion)
      preference.removeEventListener('change', syncMotion)
      frame.style.removeProperty('--automation-forward')
      frame.style.removeProperty('--automation-reverse')
      frame.style.removeProperty('--automation-opacity')
    }
  }, [])

  return (
    <div ref={frameRef} className={styles.frame} aria-hidden="true">
      <img
        className={styles.logos}
        src="/assets/images/services-app-logos.svg"
        width="346"
        height="62"
        alt=""
      />
      <div className={styles.connections}>
        <div className={styles.paths}>
          {connectors.map(({ d, width, reverse }) => (
            <svg key={d} viewBox={`0 0 ${width} 200`}>
              <path className={styles.base} d={d} />
              <path
                className={styles.shimmer}
                data-reverse={reverse || undefined}
                d={d}
                pathLength="100"
              />
            </svg>
          ))}
        </div>
      </div>
      <span className={styles.hub}>
        <img src="/assets/images/services-automation-stars.svg" width="22" height="22" alt="" />
      </span>
    </div>
  )
}
