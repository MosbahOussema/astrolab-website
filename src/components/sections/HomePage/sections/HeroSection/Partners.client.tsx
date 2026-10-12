'use client'

import { type ReactNode, useLayoutEffect, useRef } from 'react'

type PartnersProps = {
  children: ReactNode
  className?: string
}

const MOBILE_WITHOUT_APPEAR = '(min-width: 390px) and (max-width: 809.98px)'

/** Source appear effect: opacity 0 / y +100, threshold .5, once, spring 200/45/1. */
export function Partners({ children, className = '' }: PartnersProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const mobileWithoutAppear = matchMedia(MOBILE_WITHOUT_APPEAR)
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
    if (mobileWithoutAppear.matches || reducedMotion.matches) return

    let frame = 0
    let elapsed = 0
    let lastTime = 0
    let running = false

    const render = (displacement: number) => {
      element.style.opacity = String(1 - displacement)
      element.style.transform = `translate3d(0, ${100 * displacement}px, 0)`
    }
    const finish = () => {
      cancelAnimationFrame(frame)
      frame = 0
      running = false
      observer?.disconnect()
      element.style.opacity = '1'
      element.style.transform = 'none'
      element.style.removeProperty('will-change')
    }
    const tick = (time: number) => {
      frame = 0
      if (!running || document.hidden) {
        lastTime = 0
        return
      }
      if (!lastTime) lastTime = time
      elapsed += (time - lastTime) / 1000
      lastTime = time

      // m=1, c=45, k=200 => characteristic roots -5 and -40.
      const slow = Math.exp(-5 * elapsed)
      const fast = Math.exp(-40 * elapsed)
      const displacement = (8 * slow - fast) / 7
      const velocity = (40 * (fast - slow)) / 7
      render(displacement)

      if (100 * displacement < 0.01 && 100 * Math.abs(velocity) < 0.01) {
        finish()
      } else {
        frame = requestAnimationFrame(tick)
      }
    }
    const play = () => {
      if (!running || frame || document.hidden) return
      lastTime = 0
      frame = requestAnimationFrame(tick)
    }
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame)
        frame = 0
        lastTime = 0
      } else {
        play()
      }
    }
    const handlePreferenceChange = () => {
      if (mobileWithoutAppear.matches || reducedMotion.matches) finish()
    }

    // Server/no-JS output stays visible; hydration installs the source state before paint.
    element.style.opacity = '0'
    element.style.transform = 'translate3d(0, 100px, 0)'
    element.style.willChange = 'opacity, transform'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || entry.intersectionRatio < 0.5) return
        observer?.disconnect()
        running = true
        play()
      },
      { threshold: 0.5 },
    )
    observer.observe(element)
    document.addEventListener('visibilitychange', handleVisibility)
    mobileWithoutAppear.addEventListener('change', handlePreferenceChange)
    reducedMotion.addEventListener('change', handlePreferenceChange)

    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
      mobileWithoutAppear.removeEventListener('change', handlePreferenceChange)
      reducedMotion.removeEventListener('change', handlePreferenceChange)
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
