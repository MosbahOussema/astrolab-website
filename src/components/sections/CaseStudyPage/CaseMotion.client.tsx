'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { caseHoverTransition, createCaseHoverGesture } from './caseHover'
import { caseSpring } from './caseSpring'
import { caseEntryVisible } from './caseIntersection'

type Entrance = {
  element: HTMLElement
  started: number
  delay: number
  distance: number
  stiffness: number
  damping: number
  scaleFrom: number
  opacityFrom: number
}
type Hover = {
  image: HTMLElement
  scale: number
  velocity: number
  target: number
  from: number
  initialVelocity: number
  started: number
}

export function CaseMotion({
  children,
  className,
  slug,
}: {
  children: ReactNode
  className: string
  slug: string
}) {
  const rootRef = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const entries = [...root.querySelectorAll<HTMLElement>('[data-case-entry]')]
    const running = new Set<Entrance>()
    const hovers = new Set<Hover>()
    const hoverStates: Hover[] = []
    const resetHoverGestures: Array<() => void> = []
    const cleanups: Array<() => void> = []
    let frame = 0
    const finish = (element: HTMLElement) => {
      element.style.opacity = '1'
      element.style.transform = 'none'
      element.style.removeProperty('will-change')
    }
    const tick = (now: number) => {
      frame = 0
      for (const entry of running) {
        const sample = caseSpring(
          (now - entry.started - entry.delay) / 1000,
          entry.stiffness,
          entry.damping,
        )
        entry.element.style.opacity = String(
          Math.min(1, Math.max(0, 1 - (1 - entry.opacityFrom) * sample.displacement)),
        )
        entry.element.style.transform = `translate3d(0, ${entry.distance * sample.displacement}px, 0) scale(${1 + (entry.scaleFrom - 1) * sample.displacement})`
        if (
          Math.abs(entry.distance * sample.displacement) < 0.01 &&
          Math.abs(entry.distance * sample.velocity) < 0.01
        ) {
          finish(entry.element)
          running.delete(entry)
        }
      }
      for (const hover of hovers) {
        const sample = caseSpring(
          (now - hover.started) / 1000,
          100,
          30,
          hover.from - hover.target,
          hover.initialVelocity,
        )
        hover.scale = hover.target + sample.displacement
        hover.velocity = sample.velocity
        hover.image.style.transform = `scale(${hover.scale})`
        if (Math.abs(sample.displacement) < 0.00001 && Math.abs(sample.velocity) < 0.00001) {
          hover.scale = hover.target
          hover.velocity = 0
          hover.image.style.transform = `scale(${hover.target})`
          hovers.delete(hover)
        }
      }
      if (running.size || hovers.size) frame = requestAnimationFrame(tick)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const start = (element: HTMLElement) => {
      const type = element.dataset.caseEntry
      running.add({
        element,
        started: performance.now(),
        delay: type === 'cover' ? 100 : 0,
        distance: type === 'section' ? 40 : 60,
        stiffness:
          type === 'section' ? 66 : ['fact', 'related', 'divider'].includes(type ?? '') ? 160 : 170,
        damping:
          type === 'section' ? 20 : ['fact', 'related', 'divider'].includes(type ?? '') ? 30 : 26,
        scaleFrom: type === 'related' ? 0.9 : 1,
        opacityFrom: type === 'heading' ? 0.001 : 0,
      })
      schedule()
    }
    const observer = new IntersectionObserver(
      (observations) => {
        for (const observation of observations) {
          if (
            !caseEntryVisible(
              observation.isIntersecting,
              observation.intersectionRect.height,
              observation.boundingClientRect.height,
              window.innerHeight,
            )
          )
            continue
          observer.unobserve(observation.target)
          start(observation.target as HTMLElement)
        }
      },
      { threshold: Array.from({ length: 100 }, (_, index) => index / 100) },
    )
    for (const element of entries) {
      if (reduced.matches) {
        finish(element)
        continue
      }
      element.style.opacity = element.dataset.caseEntry === 'heading' ? '.001' : '0'
      element.style.transform = `translate3d(0, ${element.dataset.caseEntry === 'section' ? 40 : 60}px, 0) scale(${element.dataset.caseEntry === 'related' ? 0.9 : 1})`
      element.style.willChange = 'opacity, transform'
      if (element.dataset.caseEntry === 'heading') start(element)
      else observer.observe(element)
    }
    for (const card of root.querySelectorAll<HTMLElement>('[data-case-hover]')) {
      const image = card.querySelector<HTMLElement>('img')
      if (!image) continue
      const state: Hover = {
        image,
        scale: 1,
        velocity: 0,
        target: 1,
        from: 1,
        initialVelocity: 0,
        started: 0,
      }
      hoverStates.push(state)
      const move = (target: number) => {
        if (reduced.matches) return
        state.from = state.scale
        state.initialVelocity = state.velocity
        state.target = target
        state.started = performance.now()
        hovers.add(state)
        schedule()
      }
      let gesture = createCaseHoverGesture()
      let listeningForRelease = false
      const apply = (transition: ReturnType<typeof caseHoverTransition>) => {
        gesture = transition.gesture
        if (transition.target) move(transition.target)
      }
      const stopListeningForRelease = () => {
        if (!listeningForRelease) return
        listeningForRelease = false
        document.removeEventListener('pointerup', release)
        document.removeEventListener('pointercancel', release)
      }
      const release = () => {
        stopListeningForRelease()
        apply(caseHoverTransition(gesture, { type: 'release' }))
      }
      const enter = (event: PointerEvent) => {
        if (reduced.matches) return
        apply(caseHoverTransition(gesture, { type: 'enter', pointerType: event.pointerType }))
      }
      const down = (event: PointerEvent) => {
        if (reduced.matches || event.pointerType === 'touch') return
        apply(caseHoverTransition(gesture, { type: 'down', pointerType: event.pointerType }))
        if (!gesture.pressed || listeningForRelease) return
        listeningForRelease = true
        document.addEventListener('pointerup', release)
        document.addEventListener('pointercancel', release)
      }
      const leave = (event: PointerEvent) => {
        if (reduced.matches) return
        apply(caseHoverTransition(gesture, { type: 'leave', pointerType: event.pointerType }))
      }
      const resetGesture = () => {
        stopListeningForRelease()
        gesture = caseHoverTransition(gesture, { type: 'reset' }).gesture
      }
      resetHoverGestures.push(resetGesture)
      card.addEventListener('pointerenter', enter)
      card.addEventListener('pointerdown', down)
      card.addEventListener('pointerleave', leave)
      cleanups.push(() => {
        resetGesture()
        card.removeEventListener('pointerenter', enter)
        card.removeEventListener('pointerdown', down)
        card.removeEventListener('pointerleave', leave)
        image.style.removeProperty('transform')
      })
    }
    const onPreference = () => {
      if (!reduced.matches) return
      observer.disconnect()
      cancelAnimationFrame(frame)
      frame = 0
      running.clear()
      entries.forEach(finish)
      resetHoverGestures.forEach((reset) => reset())
      hoverStates.forEach((hover) => {
        hover.image.style.transform = 'none'
        hover.scale = 1
        hover.velocity = 0
      })
      hovers.clear()
    }
    reduced.addEventListener('change', onPreference)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      reduced.removeEventListener('change', onPreference)
      cleanups.forEach((cleanup) => cleanup())
      entries.forEach((element) => {
        element.style.removeProperty('opacity')
        element.style.removeProperty('transform')
        element.style.removeProperty('will-change')
      })
    }
  }, [])
  return (
    <main
      ref={rootRef}
      className={className}
      data-case={slug}
      data-editorial={[
        'eldowallet-use-case',
        'rawi-al-kotob-use-case',
        'mazad-al-jomrok-use-case',
        'talinty-ai-recruitment-platform',
      ].includes(slug)}
    >
      {children}
    </main>
  )
}
