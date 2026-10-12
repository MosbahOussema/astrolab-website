'use client'

import { useEffect, useRef } from 'react'
import { partners } from '@/content/static/partners'
import styles from './HeroSection.module.css'

const SPEED = 35
const HOVER_FACTOR = 0.5

export function PartnerTicker() {
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const firstGroup = useRef<HTMLDivElement>(null)
  const hovered = useRef(false)

  useEffect(() => {
    const viewportElement = viewport.current
    const element = track.current
    const group = firstGroup.current
    if (!viewportElement || !element || !group) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let lastTime = 0
    let loopWidth = 0
    let phase = 0
    let inViewport = typeof IntersectionObserver === 'undefined'

    const direction = () => (getComputedStyle(element).direction === 'rtl' ? 1 : -1)
    const render = () => {
      element.style.transform = `translate3d(${direction() * phase}px, 0, 0)`
    }
    const canPlay = () =>
      inViewport && !document.hidden && !reducedMotion.matches && loopWidth > 0
    const tick = (time: number) => {
      frame = 0
      if (!canPlay()) {
        lastTime = 0
        return
      }
      if (!lastTime) lastTime = time
      const elapsed = time - lastTime
      lastTime = time
      if (elapsed <= 1000) {
        phase =
          (phase + (SPEED * (hovered.current ? HOVER_FACTOR : 1) * elapsed) / 1000) % loopWidth
        render()
      }
      frame = requestAnimationFrame(tick)
    }
    const synchronize = () => {
      cancelAnimationFrame(frame)
      frame = 0
      lastTime = 0
      if (canPlay()) frame = requestAnimationFrame(tick)
    }
    const resize = new ResizeObserver(() => {
      const nextWidth = group.getBoundingClientRect().width
      if (!(nextWidth > 0)) return
      const progress = loopWidth > 0 ? phase / loopWidth : 0
      loopWidth = nextWidth
      phase = progress * loopWidth
      render()
      synchronize()
    })
    const intersection =
      typeof IntersectionObserver === 'undefined'
        ? undefined
        : new IntersectionObserver(([entry]) => {
            inViewport = Boolean(entry?.isIntersecting)
            synchronize()
          })
    const directionObserver = new MutationObserver(render)

    resize.observe(group)
    intersection?.observe(viewportElement)
    directionObserver.observe(document.documentElement, {
      attributeFilter: ['dir'],
      attributes: true,
    })
    document.addEventListener('visibilitychange', synchronize)
    reducedMotion.addEventListener('change', synchronize)
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      intersection?.disconnect()
      directionObserver.disconnect()
      document.removeEventListener('visibilitychange', synchronize)
      reducedMotion.removeEventListener('change', synchronize)
      element.style.removeProperty('transform')
    }
  }, [])

  return (
    <div
      ref={viewport}
      className={styles.marquee}
      onMouseEnter={() => {
        hovered.current = true
      }}
      onMouseLeave={() => {
        hovered.current = false
      }}
    >
      <div ref={track} className={styles.track}>
        {[0, 1, 2].map((repeat) => (
          <div
            ref={repeat === 0 ? firstGroup : undefined}
            key={repeat}
            className={styles.logoGroup}
            aria-hidden={repeat > 0 ? true : undefined}
          >
            {partners.map((group) => (
              <div
                key={group.images[0].file}
                className={styles.partner}
                style={{
                  width: group.width,
                  height: group.height,
                  gap: 'gap' in group ? group.gap : 0,
                }}
              >
                {group.images.map((asset) => (
                  <img
                    key={asset.file}
                    src={`/assets/images/${asset.file}`}
                    alt={asset.alt}
                    width={asset.width}
                    height={asset.height}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
