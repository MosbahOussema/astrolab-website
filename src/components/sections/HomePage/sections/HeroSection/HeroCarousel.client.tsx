'use client'

import { useEffect, useRef } from 'react'
import styles from './HeroSection.module.css'

const INTERVAL_MS = 5000
const TRANSITION_MS = 500
const LAST_REAL_SLIDE = 1

export function HeroCarousel() {
  const viewport = useRef<HTMLSpanElement>(null)
  const slides = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const viewportElement = viewport.current
    const element = slides.current
    if (!viewportElement || !element) return
    const slideElement = element

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let index = 0
    let targetIndex = 0
    let inViewport = typeof IntersectionObserver === 'undefined'
    let timer: number | undefined
    let timerRemaining = INTERVAL_MS
    let timerStartedAt = 0
    let active: Animation | undefined

    const step = () => {
      const first = slideElement.children.item(0) as HTMLElement | null
      const second = slideElement.children.item(1) as HTMLElement | null
      if (first && second) {
        const measured = second.offsetTop - first.offsetTop
        if (measured > 0) return measured
      }
      return (first?.getBoundingClientRect().height ?? 71) + 10
    }
    const render = () => {
      slideElement.style.transform = `translate3d(0, -${index * step()}px, 0)`
    }
    const canPlay = () => inViewport && !document.hidden && !reducedMotion.matches
    const clearTimer = (preserve = false) => {
      if (timer === undefined) return
      window.clearTimeout(timer)
      if (preserve) {
        timerRemaining = Math.max(
          0,
          timerRemaining - Math.max(0, performance.now() - timerStartedAt),
        )
      }
      timer = undefined
      timerStartedAt = 0
    }
    const settleAnimation = () => {
      if (!active) return
      active.onfinish = null
      active.cancel()
      active = undefined
      index = targetIndex > LAST_REAL_SLIDE ? 0 : targetIndex
      render()
    }
    const reprojectAnimation = () => {
      if (!active) {
        render()
        return
      }
      const currentTime =
        typeof active.currentTime === 'number'
          ? Math.min(TRANSITION_MS, Math.max(0, active.currentTime))
          : 0
      active.onfinish = null
      active.cancel()
      const distance = step()
      active = slideElement.animate(
        [
          { transform: `translate3d(0, -${index * distance}px, 0)` },
          { transform: `translate3d(0, -${targetIndex * distance}px, 0)` },
        ],
        {
          duration: TRANSITION_MS,
          easing: 'cubic-bezier(1, 0, 0, 1.01)',
          fill: 'forwards',
        },
      )
      active.currentTime = currentTime
      active.onfinish = () => settleAnimation()
      if (!canPlay()) active.pause()
    }
    function schedule(reset = false) {
      if (reset) timerRemaining = INTERVAL_MS
      if (!canPlay() || timer !== undefined) return
      timerStartedAt = performance.now()
      timer = window.setTimeout(advance, timerRemaining)
    }
    function advance() {
      timer = undefined
      timerRemaining = INTERVAL_MS
      timerStartedAt = 0
      if (!canPlay() || active) {
        schedule()
        return
      }

      const distance = step()
      targetIndex = index + 1
      active = slideElement.animate(
        [
          { transform: `translate3d(0, -${index * distance}px, 0)` },
          { transform: `translate3d(0, -${targetIndex * distance}px, 0)` },
        ],
        {
          duration: TRANSITION_MS,
          easing: 'cubic-bezier(1, 0, 0, 1.01)',
          fill: 'forwards',
        },
      )
      active.onfinish = () => settleAnimation()

      // Framer starts the next five-second interval with the transition, not after it.
      schedule(true)
    }
    const synchronize = () => {
      if (!canPlay()) {
        clearTimer(true)
        active?.pause()
        return
      }
      active?.play()
      schedule()
    }
    const handlePreference = () => {
      if (reducedMotion.matches) {
        clearTimer()
        timerRemaining = INTERVAL_MS
        settleAnimation()
      } else {
        synchronize()
      }
    }

    const intersection =
      typeof IntersectionObserver === 'undefined'
        ? undefined
        : new IntersectionObserver(([entry]) => {
            inViewport = Boolean(entry?.isIntersecting)
            synchronize()
          })
    intersection?.observe(viewportElement)

    const resize = new ResizeObserver(() => {
      reprojectAnimation()
      synchronize()
    })
    resize.observe(viewportElement)

    document.addEventListener('visibilitychange', synchronize)
    reducedMotion.addEventListener('change', handlePreference)
    render()
    synchronize()

    return () => {
      clearTimer()
      active?.cancel()
      intersection?.disconnect()
      resize.disconnect()
      document.removeEventListener('visibilitychange', synchronize)
      reducedMotion.removeEventListener('change', handlePreference)
      slideElement.style.removeProperty('transform')
    }
  }, [])

  return (
    <span ref={viewport} className={styles.carousel} aria-hidden="true">
      <span ref={slides} className={styles.slides}>
        {[
          'hJHL1iZvftX3QOlpgSlSYyiJPI.png',
          'z9WPFltlrWnR7ZEXDQ3hR3QTaGg.png',
          'hJHL1iZvftX3QOlpgSlSYyiJPI.png',
        ].map((file, imageIndex) => (
          <img
            key={imageIndex}
            src={`/assets/images/${file}`}
            alt=""
            width="90"
            height="71"
            draggable={false}
          />
        ))}
      </span>
    </span>
  )
}
