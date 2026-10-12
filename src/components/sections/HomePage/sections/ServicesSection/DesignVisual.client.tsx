'use client'

import { useLayoutEffect, useRef } from 'react'
import { caseSpring } from '../../../CaseStudyPage/caseSpring'
import {
  createDesignCycle,
  DESIGN_CURSOR_DURATION_MS,
  DESIGN_CURSOR_SPRING,
  designEntryVisible,
  designStageEndpoint,
  type DesignStage,
} from './designMotion'
import styles from './DesignVisual.module.css'

const ARTWORK = '/assets/images/ZkrHKcE6L9XbM9M4FHR3T2QmreA.png'
const CARLOS = '/assets/images/services-design-carlos.svg'
const POINTER = '/assets/images/services-design-pointer.svg'
const TABLET_QUERY = '(min-width: 810px) and (max-width: 1199.98px)'

type Point = { x: number; y: number }
type CursorState = { current: Point; velocity: Point }

const desktopPositions = {
  default: { carlos: { x: -1, y: 65 }, mike: { x: 155, y: 0 } },
  swapped: { carlos: { x: 9, y: 8 }, mike: { x: 146, y: 47 } },
}
const tabletPositions = { carlos: { x: -1, y: 41 }, mike: { x: 99, y: 0 } }

function setPosition(element: HTMLElement, point: Point) {
  element.style.setProperty('--design-x', `${point.x}px`)
  element.style.setProperty('--design-y', `${point.y}px`)
}

export function DesignVisual() {
  const rootRef = useRef<HTMLDivElement>(null)
  const carlosRef = useRef<HTMLImageElement>(null)
  const mikeRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const carlos = carlosRef.current
    const mike = mikeRef.current
    if (!root || !carlos || !mike) return
    const entryRoot = root.closest<HTMLElement>('[data-service-reveal]') ?? root

    const tablet = window.matchMedia(TABLET_QUERY)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const entryDistance = getComputedStyle(root).direction === 'rtl' ? -100 : 100
    const carlosState: CursorState = {
      current: { ...desktopPositions.default.carlos },
      velocity: { x: 0, y: 0 },
    }
    const mikeState: CursorState = {
      current: { ...desktopPositions.default.mike },
      velocity: { x: 0, y: 0 },
    }
    let cursorFrame = 0
    let entryFrame = 0
    let observer: IntersectionObserver | undefined
    let activeEndpoint: 'default' | 'swapped' = 'default'

    const applyStaticPositions = () => {
      const positions = tablet.matches ? tabletPositions : desktopPositions.default
      carlosState.current = { ...positions.carlos }
      mikeState.current = { ...positions.mike }
      carlosState.velocity = { x: 0, y: 0 }
      mikeState.velocity = { x: 0, y: 0 }
      setPosition(carlos, carlosState.current)
      setPosition(mike, mikeState.current)
    }

    const animateStage = (stage: DesignStage) => {
      if (tablet.matches || reduced.matches) {
        cancelAnimationFrame(cursorFrame)
        cursorFrame = 0
        activeEndpoint = 'default'
        applyStaticPositions()
        return
      }

      const endpoint = designStageEndpoint(stage)
      // The source's return and default variants share a layout. Do not restart the
      // in-flight return spring when the state machine crosses that invisible edge.
      if (endpoint === activeEndpoint) return
      activeEndpoint = endpoint
      cancelAnimationFrame(cursorFrame)
      cursorFrame = 0
      const target = desktopPositions[endpoint]
      const started = performance.now()
      const starts = {
        carlos: { ...carlosState.current },
        mike: { ...mikeState.current },
      }
      const velocities = {
        carlos: { ...carlosState.velocity },
        mike: { ...mikeState.velocity },
      }

      const tick = (now: number) => {
        const seconds = Math.max(0, now - started) / 1000
        for (const [element, state, from, initialVelocity, destination] of [
          [carlos, carlosState, starts.carlos, velocities.carlos, target.carlos],
          [mike, mikeState, starts.mike, velocities.mike, target.mike],
        ] as const) {
          const x = caseSpring(
            seconds,
            DESIGN_CURSOR_SPRING.stiffness,
            DESIGN_CURSOR_SPRING.damping,
            from.x - destination.x,
            initialVelocity.x,
          )
          const y = caseSpring(
            seconds,
            DESIGN_CURSOR_SPRING.stiffness,
            DESIGN_CURSOR_SPRING.damping,
            from.y - destination.y,
            initialVelocity.y,
          )
          state.current = { x: destination.x + x.displacement, y: destination.y + y.displacement }
          state.velocity = { x: x.velocity, y: y.velocity }
          setPosition(element, state.current)
        }

        if (now - started >= DESIGN_CURSOR_DURATION_MS) {
          carlosState.current = { ...target.carlos }
          mikeState.current = { ...target.mike }
          carlosState.velocity = { x: 0, y: 0 }
          mikeState.velocity = { x: 0, y: 0 }
          setPosition(carlos, carlosState.current)
          setPosition(mike, mikeState.current)
          cursorFrame = 0
          return
        }
        cursorFrame = requestAnimationFrame(tick)
      }
      cursorFrame = requestAnimationFrame(tick)
    }

    const cycle = createDesignCycle({
      clear: (handle) => window.clearTimeout(handle),
      onStage: animateStage,
      schedule: (callback, delay) => window.setTimeout(callback, delay),
    })

    const finishEntry = () => {
      cancelAnimationFrame(entryFrame)
      entryFrame = 0
      entryRoot.style.opacity = '1'
      entryRoot.style.transform = 'none'
      entryRoot.style.removeProperty('will-change')
    }
    const startEntry = () => {
      const started = performance.now()
      const tick = (now: number) => {
        const sample = caseSpring((now - started) / 1000, 200, 45)
        entryRoot.style.opacity = String(Math.min(1, Math.max(0, 1 - sample.displacement)))
        entryRoot.style.transform = `translate3d(${entryDistance * sample.displacement}px, 0, 0)`
        if (Math.abs(100 * sample.displacement) < 0.01 && Math.abs(100 * sample.velocity) < 0.01) {
          finishEntry()
          return
        }
        entryFrame = requestAnimationFrame(tick)
      }
      entryFrame = requestAnimationFrame(tick)
    }

    applyStaticPositions()
    if (reduced.matches) finishEntry()
    else {
      entryRoot.style.opacity = '0'
      entryRoot.style.transform = `translate3d(${entryDistance}px, 0, 0)`
      entryRoot.style.willChange = 'opacity, transform'
      observer = new IntersectionObserver(
        ([entry]) => {
          if (
            !entry ||
            !designEntryVisible(
              entry.isIntersecting,
              entry.intersectionRect.height,
              entry.boundingClientRect.height,
              window.innerHeight,
            )
          )
            return
          observer?.disconnect()
          startEntry()
        },
        { threshold: Array.from({ length: 101 }, (_, index) => index / 100) },
      )
      observer.observe(entryRoot)
    }

    const syncCycle = () => {
      cancelAnimationFrame(cursorFrame)
      cursorFrame = 0
      applyStaticPositions()
      activeEndpoint = 'default'
      cycle.sync({ reduced: reduced.matches, tablet: tablet.matches })
      if (reduced.matches) {
        observer?.disconnect()
        finishEntry()
      }
    }
    syncCycle()
    tablet.addEventListener('change', syncCycle)
    reduced.addEventListener('change', syncCycle)

    return () => {
      cycle.dispose()
      observer?.disconnect()
      tablet.removeEventListener('change', syncCycle)
      reduced.removeEventListener('change', syncCycle)
      cancelAnimationFrame(cursorFrame)
      cancelAnimationFrame(entryFrame)
      entryRoot.style.removeProperty('opacity')
      entryRoot.style.removeProperty('transform')
      entryRoot.style.removeProperty('will-change')
      carlos.style.removeProperty('--design-x')
      carlos.style.removeProperty('--design-y')
      mike.style.removeProperty('--design-x')
      mike.style.removeProperty('--design-y')
    }
  }, [])

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <div className={styles.artworkContainer}>
        <div className={styles.artwork}>
          <img src={ARTWORK} width="620" height="426" alt="" />
          <div className={styles.cursorGroup}>
            <img
              ref={carlosRef}
              className={styles.carlos}
              src={CARLOS}
              width="81"
              height="48"
              alt=""
            />
            <div ref={mikeRef} className={styles.mike}>
              <img src={POINTER} width="17" height="17" alt="" />
              <span>Mike</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
