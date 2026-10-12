'use client'

import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { samePageAnchor, smoothScrollDuration, usesSmoothScroll } from './smoothScrollConfig'
import styles from './SmoothScroll.module.css'

/** The reference enables this effect on Home and the four case studies only. */
export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (!usesSmoothScroll(pathname)) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let controller: Lenis | undefined
    let frame = 0
    let pendingAnchor: { target: HTMLElement; offset: number } | undefined

    const tick = (time: number) => {
      controller?.raf(time)
      frame = requestAnimationFrame(tick)
    }
    const dispose = () => {
      cancelAnimationFrame(frame)
      controller?.destroy()
      controller = undefined
      document.documentElement.classList.remove(styles.active)
    }
    const configure = () => {
      // A preference change must finish an already announced hash navigation.
      // Do not snap during route cleanup or after the user interrupted the scroll.
      if (reduced.matches && pendingAnchor?.target.isConnected) {
        controller?.scrollTo(pendingAnchor.target, {
          offset: pendingAnchor.offset,
          immediate: true,
        })
      }
      pendingAnchor = undefined
      dispose()
      if (reduced.matches) return
      controller = new Lenis({
        duration: smoothScrollDuration,
        // Keep nested controls native instead of diverting their wheel events.
        prevent: (node: Element) => {
          if (node === document.body || node === document.documentElement) return false
          const overflow = getComputedStyle(node).overflowY
          return (
            (overflow === 'auto' || overflow === 'scroll') && node.scrollHeight > node.clientHeight
          )
        },
      })
      document.documentElement.classList.add(styles.active)
      frame = requestAnimationFrame(tick)
    }
    const anchor = (event: MouseEvent) => {
      if (
        !controller ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return
      const link =
        event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return
      const id = samePageAnchor(link.href, window.location.href)
      const target = id ? document.getElementById(id) : null
      if (!target) return
      event.preventDefault()
      if (new URL(link.href).hash !== window.location.hash) {
        window.history.pushState(null, '', link.href)
      }
      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
      const destination = { target, offset: -margin }
      pendingAnchor = destination
      controller.scrollTo(target, {
        offset: destination.offset,
        onComplete: () => {
          if (pendingAnchor === destination) pendingAnchor = undefined
        },
      })
    }
    const interruptAnchor = () => {
      pendingAnchor = undefined
    }
    const interruptAnchorWithKey = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
        interruptAnchor()
      }
    }

    configure()
    reduced.addEventListener('change', configure)
    document.addEventListener('click', anchor, true)
    window.addEventListener('wheel', interruptAnchor, { passive: true })
    window.addEventListener('touchstart', interruptAnchor, { passive: true })
    window.addEventListener('keydown', interruptAnchorWithKey)
    return () => {
      document.removeEventListener('click', anchor, true)
      window.removeEventListener('wheel', interruptAnchor)
      window.removeEventListener('touchstart', interruptAnchor)
      window.removeEventListener('keydown', interruptAnchorWithKey)
      reduced.removeEventListener('change', configure)
      dispose()
    }
  }, [pathname])

  return null
}
