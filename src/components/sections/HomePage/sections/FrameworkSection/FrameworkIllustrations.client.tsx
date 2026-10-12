'use client'

import type { Feature } from '@/content/contracts/home'
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react'
import { frameworkEntryKind } from './frameworkEntryMotion'
import { createTimedCycle } from '../../shared/timedCycle'
import styles from './FrameworkSection.module.css'

const directionStates = [
  { label: 'Planning Phase', number: '01' },
  { label: 'Wireframing', number: '02' },
  { label: 'Design', number: '03' },
  { label: 'Prototype', number: '04' },
] as const
const directionTimings = [500, 500, 2000, 2000, 2000, 2000]
const directionStacks = [
  [0, 0, 0],
  [0, 1, 0],
  [2, 1, 0],
  [2, 3, 0],
] as const
const directionLayoutDuration = 620
const directionLayoutSpring =
  'linear(0, 0.04 10%, 0.2 20%, 0.53 32%, 0.82 44%, 0.97 55%, 1.015 68%, 1.007 80%, 1)'
const mappingTimings = [500, 500, 500, 500, 500, 1000, 1000, 3000]
const executionTimings = [500, 700, 2000, 2000, 2000]

type DirectionBox = {
  height: number
  left: number
  top: number
  width: number
}

function readDirectionBox(element: HTMLDivElement): DirectionBox {
  const box = element.getBoundingClientRect()
  return { height: box.height, left: box.left, top: box.top, width: box.width }
}

function directionFlipTransform(before: DirectionBox, after: DirectionBox) {
  const beforeCenter = before.left + before.width / 2
  const afterCenter = after.left + after.width / 2
  const deltaInline = beforeCenter - afterCenter
  const deltaBlock = before.top + before.height / 2 - (after.top + after.height / 2)
  const scaleInline = after.width ? before.width / after.width : 1
  return `translate3d(${deltaInline}px, ${deltaBlock}px, 0) scaleX(${scaleInline})`
}

function useDirectionStackFlip(phaseStep: number) {
  const stackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const previousBoxes = useRef<DirectionBox[]>([])
  const animations = useRef<Animation[]>([])

  const cancelAnimations = () => {
    animations.current.forEach((animation) => animation.cancel())
    animations.current = []
  }

  const recordBoxes = () => {
    const cards = cardRefs.current
    if (cards.length !== 3 || cards.some((card) => !card)) return
    previousBoxes.current = cards.map((card) => readDirectionBox(card as HTMLDivElement))
  }

  useLayoutEffect(() => {
    const cards = cardRefs.current
    if (cards.length !== 3 || cards.some((card) => !card)) return
    const elements = cards as HTMLDivElement[]
    const nextBoxes = elements.map(readDirectionBox)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    cancelAnimations()
    if (previousBoxes.current.length === elements.length && !reduced) {
      animations.current = elements.flatMap((element, index) => {
        const before = previousBoxes.current[index]
        const after = nextBoxes[index]
        if (!before || !after) return []
        const transform = directionFlipTransform(before, after)
        if (transform === 'translate3d(0px, 0px, 0) scaleX(1)') return []
        return [
          element.animate([{ transform }, { transform: 'none' }], {
            duration: directionLayoutDuration,
            easing: directionLayoutSpring,
            fill: 'backwards',
          }),
        ]
      })
    }
    previousBoxes.current = nextBoxes
  }, [phaseStep])

  useEffect(() => {
    const stack = stackRef.current
    if (!stack || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      cancelAnimations()
      recordBoxes()
    })
    observer.observe(stack)
    return () => {
      observer.disconnect()
      cancelAnimations()
    }
  }, [])

  return { cardRefs, stackRef }
}

function useSequence(length: number, sourceTimings: number[], loopStart: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [step, setStep] = useState(0)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    let inViewport = typeof IntersectionObserver === 'undefined'
    let wasReduced = query.matches
    const cycle = createTimedCycle<number>({
      clear: (handle) => window.clearTimeout(handle),
      delay: (state) => sourceTimings[state] ?? 2000,
      initial: 0,
      next: (state) => (state === length - 1 ? loopStart : state + 1),
      now: () => performance.now(),
      onState: setStep,
      schedule: (callback, delay) => window.setTimeout(callback, delay),
    })

    const synchronize = () => {
      if (query.matches) {
        if (!wasReduced) cycle.reset(0, false)
        wasReduced = true
        return
      }
      if (wasReduced) cycle.reset(0, false)
      wasReduced = false
      cycle.setPlaying(inViewport && !document.hidden)
    }
    const observer =
      typeof IntersectionObserver === 'undefined'
        ? undefined
        : new IntersectionObserver(
            ([entry]) => {
              inViewport = Boolean(entry?.isIntersecting)
              if (entry?.intersectionRatio && entry.intersectionRatio >= 0.5) setEntered(true)
              synchronize()
            },
            { threshold: [0, 0.5] },
          )

    observer?.observe(element)
    cycle.reset(0, false)
    synchronize()
    query.addEventListener('change', synchronize)
    document.addEventListener('visibilitychange', synchronize)
    return () => {
      cycle.dispose()
      observer?.disconnect()
      query.removeEventListener('change', synchronize)
      document.removeEventListener('visibilitychange', synchronize)
    }
  }, [length, loopStart, sourceTimings])
  return { ref, entered, step }
}

function Illustration({
  children,
  entered,
  rootRef,
}: {
  children: ReactNode
  entered: boolean
  rootRef: RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={rootRef}
      className={`${styles.illustration} ${styles.entryNeutralIllustration}`}
      data-entered={entered}
    >
      {children}
    </div>
  )
}

function StatusIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M11.7692.3848a4.073 4.073 0 1 1-.0001 8.1455 4.073 4.073 0 0 1 .0001-8.1455Zm1.917 2.833c-.098-.2765-.4013-.422-.6778-.3242-.3413.1209-.6585.3478-.9267.583-.2738.2401-.5276.5173-.7412.7734-.1035.1241-.1997.2451-.2852.3574a2.453 2.453 0 0 0-.1875-.1494l-.0029-.003c-.1122-.0748-.2632-.1748-.5127-.1748a.5313.5313 0 0 0-.081 1.0557l.0088.0059c.0394.0263.1611.1241.3066.415.0856.1713.257.2832.4482.293.191.0096.373-.0838.4756-.2451.1153-.1633.4549-.6443.6465-.874.1926-.2309.4076-.4638.626-.6553.2239-.1963.4226-.3238.581-.38.2765-.0979.421-.4012.3233-.6778Z" />
      <path
        opacity=".4"
        d="M8.6401.3854a5.1354 5.1354 0 0 0 5.7853 8.4673v.6053c0 1.3 0 2.333-.1151 3.1418-.1191.8362-.3703 1.5106-.93 2.0392-.5554.5246-1.2568.7564-2.1274.867-.8504.1079-1.9387.1079-3.3206.1079h-.8263c-1.3818 0-2.4702 0-3.3206-.108-.8705-.1105-1.5719-.3423-2.1273-.8669C1.0984 14.1104.8471 13.436.7281 12.5998.6129 11.7909.6129 10.758.6129 9.4581V6.5407c0-1.3 0-2.3329.1152-3.1418.119-.8362.3703-1.5106.93-2.0392.5554-.5246 1.2568-.7564 2.1274-.8669.8504-.108 1.9387-.108 3.3205-.108h.8264c.245 0 .4808 0 .7077.0006Z"
      />
      <path d="M3.2692 8.7074a.7083.7083 0 0 1 .7083-.7084h2.2017a.7083.7083 0 1 1 0 1.4167H3.9775a.7083.7083 0 0 1-.7083-.7083Zm0 2.8339a.7083.7083 0 0 1 .7083-.7083h5.6667a.7083.7083 0 1 1 0 1.4167H3.9775a.7083.7083 0 0 1-.7083-.7084Z" />
    </svg>
  )
}

function DirectionGraphic() {
  const sequence = useSequence(6, directionTimings, 2)
  const sequencePhaseStep = sequence.step >= 2 ? sequence.step - 2 : -1
  const phaseStep = Math.max(0, sequencePhaseStep)
  const phaseStack = directionStacks[phaseStep] ?? directionStacks[0]
  const { cardRefs, stackRef } = useDirectionStackFlip(phaseStep)
  return (
    <Illustration entered={sequence.entered} rootRef={sequence.ref}>
      <div
        className={styles.directionGraphic}
        data-phase-step={phaseStep}
        data-step={sequencePhaseStep}
        data-sequence-step={sequence.step}
      >
        <div className={styles.projectPanel}>
          <div className={styles.projectTop}>
            <strong>Your Project</strong>
            <span>
              <i /> In Progress
            </span>
          </div>
          <div className={styles.projectFiles}>
            {[
              'YQ3ESqH0PDPTTWBTVfW2uQKXE4.png',
              '9BKoqKth3DRHCyeAy3uwcGEivfg.png',
              'CcO56GIuYZrY0WWsXob0Ks76Q.png',
            ].map((src, index) => (
              <div
                className={styles.file}
                key={src}
                style={{ '--file-delay': `${index * 70}ms` } as CSSProperties}
              >
                <div className={styles.folderPreview} aria-hidden="true">
                  <span className={`${styles.folderPage} ${styles.folderPageBack}`} />
                  <span className={`${styles.folderPage} ${styles.folderPageMiddle}`} />
                  <span className={`${styles.folderPage} ${styles.folderPageFront}`} />
                  <img src={`/assets/images/${src}`} alt="" />
                </div>
                <i className={styles.fileBar} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.phaseStack} ref={stackRef}>
          {phaseStack.map((phaseIndex, layerIndex) => {
            const phase = directionStates[phaseIndex]
            return (
              <div
                className={styles.phaseCard}
                data-layer={layerIndex}
                key={layerIndex}
                ref={(element) => {
                  cardRefs.current[layerIndex] = element
                }}
              >
                <span className={styles.phaseMain}>
                  <span className={styles.phaseIcon}>
                    <StatusIcon />
                  </span>
                  <span className={styles.phaseCopy}>
                    <span>{phase.label}</span>
                    <i />
                  </span>
                </span>
                <b>{phase.number}</b>
              </div>
            )
          })}
        </div>
        <div className={styles.directionShade} />
      </div>
    </Illustration>
  )
}

function RouteArrow({ second = false }: { second?: boolean }) {
  return (
    <svg
      className={second ? styles.routeArrowEnd : styles.routeArrowStart}
      viewBox="0 0 12.5 72.387"
      aria-hidden="true"
    >
      <path d="M.5 7.5H0v55h1v-55Zm12 62-5-2.886v5.773ZM12.5.5V0h-5v1h5ZM7.5 69.5v.5H8v-1h-.5ZM.5 62.5H0C0 66.642 3.358 70 7.5 70v-1C3.91 69 1 66.09 1 62.5ZM7.5.5V0C3.358 0 0 3.358 0 7.5h1C1 3.91 3.91 1 7.5 1Z" />
    </svg>
  )
}
function TimeIcon() {
  return (
    <svg viewBox="0 0 17 17" aria-hidden="true">
      <path
        opacity=".4"
        d="M.6675 8.5a8.0625 8.0625 0 1 1 16.125 0 8.0625 8.0625 0 0 1-16.125 0Z"
      />
      <path d="M8.73 4.75a.75.75 0 0 1 .75.75v2.6893l1.2803 1.2804a.75.75 0 0 1-1.0607 1.0606l-1.5-1.5a.75.75 0 0 1-.2196-.5303v-3a.75.75 0 0 1 .75-.75Z" />
    </svg>
  )
}
function CostIcon() {
  return (
    <svg viewBox="0 0 16 17" aria-hidden="true">
      <path
        opacity=".4"
        d="M7.7729.8125c1.643 0 2.9335 0 3.9411.1354 1.0325.1389 1.8516.4291 2.4953 1.0728.6436.6436.9339 1.4628 1.0727 2.4953.1355 1.0076.1355 2.298.1355 3.941v.0859c0 1.643 0 2.9335-.1355 3.9411-.1388 1.0325-.4291 1.8517-1.0727 2.4953-.6437.6437-1.4628.9339-2.4953 1.0728-1.0076.1354-2.2981.1354-3.9411.1354h-.0859c-1.643 0-2.9335 0-3.941-.1354-1.0325-.1389-1.8517-.4291-2.4953-1.0728-.6437-.6436-.9339-1.4628-1.0728-2.4953C.0425 11.4764.0425 10.1859.0425 8.5429v-.0858c0-1.643 0-2.9335.1354-3.9411.1389-1.0325.4291-1.8517 1.0728-2.4953C1.8943 1.377 2.7135 1.0868 3.746.9479 4.7536.8125 6.0441.8125 7.6871.8125h.0858Z"
      />
      <path d="M11.48 10.9375a.5625.5625 0 0 1 .5625.5625v1.5a.5625.5625 0 1 1-1.125 0v-1.5a.5625.5625 0 0 1 .5625-.5625Zm-3.75-.75a.5625.5625 0 0 1 .5625.5625V13a.5625.5625 0 1 1-1.125 0v-2.25a.5625.5625 0 0 1 .5625-.5625Zm-3.75-1.5a.5625.5625 0 0 1 .5625.5625V13a.5625.5625 0 1 1-1.125 0V9.25a.5625.5625 0 0 1 .5625-.5625ZM2.8366 4.3479a.5625.5625 0 0 1 .7955.0088c2.0622 2.1081 4.6031 2.7579 7.133 2.2553l-.5168-.2535a.5625.5625 0 1 1 .4954-1.01l1.5553.7628a.9.9 0 0 1 .47.5798.874.874 0 0 1-.1528.7255l-1.0373 1.4158a.5625.5625 0 0 1-.9075-.6643l.3345-.4571c-2.8851.5792-5.8259-.1631-8.178-2.5677a.5625.5625 0 0 1 .0087-.7954Z" />
    </svg>
  )
}

function MappingGraphic() {
  const sequence = useSequence(8, mappingTimings, 4)
  return (
    <Illustration entered={sequence.entered} rootRef={sequence.ref}>
      <div className={styles.mappingGraphic} data-step={sequence.step}>
        <div className={styles.mappingRoutes}>
          <RouteArrow />
          {['Start with Design', 'To Development', 'Ending with Testing'].map((label, index) => (
            <div className={styles.routeCard} data-route={index} key={label}>
              <span>{label}</span>
              <i />
            </div>
          ))}
          <RouteArrow second />
        </div>
        <div className={styles.mappingMetrics}>
          <div>
            <TimeIcon />
            <span>Time Saved</span>
            <i />
          </div>
          <div>
            <CostIcon />
            <span>Cost Reducation</span>
            <i />
          </div>
        </div>
        <div className={styles.mappingShade} />
      </div>
    </Illustration>
  )
}

function ExecutionGraphic() {
  const sequence = useSequence(5, executionTimings, 2)
  return (
    <Illustration entered={sequence.entered} rootRef={sequence.ref}>
      <div className={styles.executionGraphic} data-step={sequence.step}>
        <span className={styles.company}>Your Company</span>
        <div className={styles.podium}>
          {[
            { rank: 2, cls: styles.rankTwo },
            { rank: 1, cls: styles.rankOne },
            { rank: 3, cls: styles.rankThree },
          ].map(({ rank, cls }) => (
            <div className={`${styles.rank} ${cls}`} key={rank}>
              <span>
                Top <b>#{rank}</b>
              </span>
              <i />
              <i />
              <i />
            </div>
          ))}
        </div>
        <div className={styles.executionShade} />
      </div>
    </Illustration>
  )
}

const graphics = [DirectionGraphic, MappingGraphic, ExecutionGraphic]

export function FrameworkIllustrations({ items }: { items: Feature[] }) {
  return (
    <div className={styles.cards}>
      {items.map((item, index) => {
        const Graphic = graphics[index] ?? DirectionGraphic
        return (
          <article
            className={styles.card}
            data-framework-entry={frameworkEntryKind(index)}
            key={item.title}
          >
            <div className={styles.visual}>
              <Graphic />
            </div>
            <div className={styles.copy}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
