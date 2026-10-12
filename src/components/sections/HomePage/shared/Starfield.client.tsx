'use client'

import { useEffect, useRef } from 'react'
import {
  advanceParticle,
  createParticle,
  STARFIELD_MAX_DELTA_MS,
  STARFIELD_PARTICLE_COUNT,
  type Particle,
} from './starfieldSimulation'
import styles from './Starfield.module.css'

/** Shared reference effect; dimensions/entrance belong to each host. */
export function Starfield({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let frame = 0
    let previous = 0
    let visible = false
    let color = getComputedStyle(canvas).color

    const draw = () => {
      context.clearRect(0, 0, width, height)
      context.fillStyle = color
      for (const particle of particles) {
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      }
    }
    const paint = (time: number) => {
      frame = 0
      if (!visible || document.hidden) return
      if (!previous) previous = time
      const elapsed = time - previous
      if (elapsed >= 1000 / 60) {
        // tsParticles drops long stalls, and reduces movement to one quarter.
        if (elapsed <= STARFIELD_MAX_DELTA_MS) {
          const motionTime = elapsed * (reducedMotion.matches ? 0.25 : 1)
          for (const particle of particles) advanceParticle(particle, width, height, motionTime)
        }
        previous = time
        draw()
      }
      frame = requestAnimationFrame(paint)
    }
    const synchronize = () => {
      cancelAnimationFrame(frame)
      frame = 0
      previous = 0
      draw()
      if (visible && !document.hidden) frame = requestAnimationFrame(paint)
    }
    const resizeCanvas = () => {
      const nextWidth = canvas.clientWidth
      const nextHeight = canvas.clientHeight
      if (!nextWidth || !nextHeight) return
      const ratio = devicePixelRatio || 1
      if (particles.length && width && height) {
        for (const particle of particles) {
          particle.x *= nextWidth / width
          particle.y *= nextHeight / height
        }
      } else {
        particles = Array.from({ length: STARFIELD_PARTICLE_COUNT }, () =>
          createParticle(nextWidth, nextHeight),
        )
      }
      width = nextWidth
      height = nextHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      color = getComputedStyle(canvas).color
      synchronize()
    }
    const resize = new ResizeObserver(resizeCanvas)
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      synchronize()
    })
    resize.observe(canvas)
    observer.observe(canvas)
    window.addEventListener('resize', resizeCanvas)
    document.addEventListener('visibilitychange', synchronize)
    reducedMotion.addEventListener('change', synchronize)
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      observer.disconnect()
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('visibilitychange', synchronize)
      reducedMotion.removeEventListener('change', synchronize)
    }
  }, [])
  return <canvas ref={ref} className={`${styles.field} ${className}`} aria-hidden="true" />
}
