'use client'

import { useEffect, useRef, useState } from 'react'
import { createTimedCycle } from '../../shared/timedCycle'
import { appsStageDelay, nextAppsStage, type AppsStage } from './appsCycle'
import styles from './AppsVisual.module.css'

const PHONE_ASSET = '/assets/images/rdXY7NV85J9DKkvbZku1tcNN0.png'

export function AppsVisual() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState<AppsStage>(1)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const desktop = window.matchMedia('(min-width: 1200px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let inViewport = typeof IntersectionObserver === 'undefined'
    let staticVariant = !desktop.matches || reducedMotion.matches
    const cycle = createTimedCycle<AppsStage>({
      clear: (handle) => window.clearTimeout(handle),
      delay: appsStageDelay,
      initial: 1,
      next: nextAppsStage,
      now: () => performance.now(),
      onState: setStage,
      schedule: (callback, delay) => window.setTimeout(callback, delay),
    })

    const synchronize = () => {
      const nextStaticVariant = !desktop.matches || reducedMotion.matches
      if (nextStaticVariant) {
        if (!staticVariant) cycle.reset(1, false)
        setStage(14)
        staticVariant = true
        return
      }
      if (staticVariant) cycle.reset(1, false)
      staticVariant = false
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
    desktop.addEventListener('change', synchronize)
    reducedMotion.addEventListener('change', synchronize)
    return () => {
      cycle.dispose()
      observer?.disconnect()
      document.removeEventListener('visibilitychange', synchronize)
      desktop.removeEventListener('change', synchronize)
      reducedMotion.removeEventListener('change', synchronize)
    }
  }, [])

  return (
    <div ref={rootRef} className={styles.root} data-stage={stage} aria-hidden="true">
      <div className={styles.scene}>
        <div className={styles.dashboard}>
          <div className={styles.rail}>
            <div className={styles.identity}>
              <i />
              <span>
                <b />
                <b />
              </span>
            </div>
          </div>
          <div className={styles.dashboardBody}>
            <div className={styles.dashboardTitle}>Dashboard</div>
            <div className={styles.metrics}>
              <i />
              <i />
              <i />
            </div>
            <div className={styles.middle}>
              <i />
              <i />
            </div>
            <div className={styles.footerBlock}>
              <i />
            </div>
          </div>
        </div>

        <div className={styles.phone}>
          <img className={styles.phoneFrame} src={PHONE_ASSET} width="700" height="1088" alt="" />
          <div className={styles.phoneFade} />
          <div className={styles.phoneHeader}>
            <div className={styles.phoneIdentity}>
              <i />
              <span>
                <b />
                Welcome back!
              </span>
            </div>
            <div className={styles.phoneActions}>
              <i />
              <i />
            </div>
          </div>
          <i className={styles.phoneHero} />
          <div className={styles.phoneTiles}>
            <span>
              <b />
              <i />
            </span>
            <i />
            <i />
          </div>
          <div className={styles.phoneFeature}>
            <b />
            <i />
          </div>
          <div className={styles.phoneHeaderCompact}>
            <div className={styles.phoneIdentity}>
              <i />
              <span>
                <b />
                Welcome back!
              </span>
            </div>
            <div className={styles.phoneActions}>
              <i />
              <i />
            </div>
          </div>
          <i className={styles.phoneGlow} />
        </div>
      </div>
    </div>
  )
}
