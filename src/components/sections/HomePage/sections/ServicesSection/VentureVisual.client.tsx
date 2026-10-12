'use client'

import { useEffect, useRef, useState } from 'react'
import { createTimedCycle } from '../../shared/timedCycle'
import { nextVentureStage, ventureStageDelay, type VentureStage } from './ventureCycle'
import styles from './VentureVisual.module.css'

const lineNumbers = Array.from({ length: 21 }, (_, index) => index + 1)

function CodeLead() {
  return (
    <>
      <p>
        <em>import</em> <b>mongoose</b>
        {', { '}
        <b>Schema</b>
        {' } '}
      </p>
      <p>
        <em>from</em> &apos;mongoose&apos;
      </p>
    </>
  )
}

function Skeleton() {
  return <i className={styles.skeleton} />
}

function RoadmapGroup({ className }: { className: string }) {
  return (
    <div className={`${styles.roadmapGroup} ${className}`}>
      <i />
      <i />
      <i />
    </div>
  )
}

export function VentureVisual() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState<VentureStage>(1)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let inViewport = typeof IntersectionObserver === 'undefined'
    let wasReduced = reducedMotion.matches
    const cycle = createTimedCycle<VentureStage>({
      clear: (handle) => window.clearTimeout(handle),
      delay: ventureStageDelay,
      initial: 1,
      next: nextVentureStage,
      now: () => performance.now(),
      onState: setStage,
      schedule: (callback, delay) => window.setTimeout(callback, delay),
    })

    const synchronize = () => {
      if (reducedMotion.matches) {
        if (!wasReduced) cycle.reset(1, false)
        setStage(7)
        wasReduced = true
        return
      }
      if (wasReduced) cycle.reset(1, false)
      wasReduced = false
      cycle.setPlaying(inViewport && !document.hidden)
    }

    const observer =
      typeof IntersectionObserver === 'undefined'
        ? undefined
        : new IntersectionObserver(([entry]) => {
            inViewport = Boolean(entry?.isIntersecting)
            synchronize()
          })
    observer?.observe(root)
    cycle.reset(1, false)
    synchronize()
    document.addEventListener('visibilitychange', synchronize)
    reducedMotion.addEventListener('change', synchronize)

    return () => {
      cycle.dispose()
      observer?.disconnect()
      document.removeEventListener('visibilitychange', synchronize)
      reducedMotion.removeEventListener('change', synchronize)
    }
  }, [])

  return (
    <div ref={rootRef} className={styles.root} data-stage={stage} aria-hidden="true">
      <div className={styles.workspace}>
        <div className={styles.codePanel}>
          <div className={styles.codeViewport}>
            <ol className={styles.lineNumbers}>
              {lineNumbers.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
            <div className={styles.codeStack}>
              <div className={`${styles.codeGroup} ${styles.codeLead}`}>
                <Skeleton />
                <CodeLead />
              </div>
              <div className={`${styles.codeGroup} ${styles.codeCollection}`}>
                <Skeleton />
                <p>
                  <em>export const</em> <b>collection</b> = &apos;Product&apos;|
                </p>
              </div>
              <div className={styles.codeGroup}>
                <Skeleton />
                <div className={styles.codeSchema}>
                  <p>
                    <em>const</em> <b>schema</b> = <em>new</em> Schema({'{'}
                  </p>
                  <p>
                    {'  '}
                    <b>name</b>: {'{'}
                  </p>
                  <p>
                    {'    '}
                    <b>type</b>: String,
                  </p>
                  <p>
                    {'    '}
                    <b>required</b>: true
                  </p>
                  <p>{'  },'}</p>
                  <p>
                    <br />
                  </p>
                </div>
                <p className={styles.codeTail}>
                  <em>from</em> &apos;mongoose&apos;
                </p>
              </div>
              <div className={styles.codeGroup}>
                <Skeleton />
                <div className={styles.codeRestart}>
                  <CodeLead />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.panelFade} />
        </div>

        <div className={styles.roadmapPanel}>
          <strong>Product Roadmap</strong>
          <RoadmapGroup className={styles.roadmapOne} />
          <RoadmapGroup className={styles.roadmapTwo} />
          <RoadmapGroup className={styles.roadmapThree} />
          <div className={styles.panelFade} />
        </div>
      </div>
    </div>
  )
}
