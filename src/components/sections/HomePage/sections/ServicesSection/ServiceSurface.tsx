'use client'

import { useLayoutEffect, useRef } from 'react'
import styles from './ServiceSurface.module.css'

const variants = ['venture', 'automation', 'cloud', 'apps', 'design'] as const

/** Decorative source layers; independent of each illustration's reveal/cycle. */
export function ServiceSurface({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const surface = ref.current
    const shade = surface?.firstElementChild as HTMLElement | null
    if (!surface || !shade) return
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
    let inViewport = typeof IntersectionObserver === 'undefined'
    const synchronize = () => {
      shade.style.animationPlayState =
        inViewport && !document.hidden && !reducedMotion.matches ? 'running' : 'paused'
    }
    const observer =
      typeof IntersectionObserver === 'undefined'
        ? undefined
        : new IntersectionObserver(([entry]) => {
            inViewport = Boolean(entry?.isIntersecting)
            synchronize()
          })
    observer?.observe(surface)
    synchronize()
    document.addEventListener('visibilitychange', synchronize)
    reducedMotion.addEventListener('change', synchronize)
    return () => {
      observer?.disconnect()
      document.removeEventListener('visibilitychange', synchronize)
      reducedMotion.removeEventListener('change', synchronize)
      shade.style.removeProperty('animation-play-state')
    }
  }, [])

  return (
    <div ref={ref} className={styles.surface} data-surface={variants[index]} aria-hidden="true">
      <div className={styles.shade} style={{ animationPlayState: 'paused' }}>
        <img src="/assets/images/QTNLfziyDOtD8RMjLzkPgNKSwCI.jpg" alt="" />
      </div>
    </div>
  )
}
