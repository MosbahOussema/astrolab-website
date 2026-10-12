'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLayoutEffect, useRef } from 'react'
import { getSiteContent } from '@/content/repositories/site'
import { AstroButton } from '@/components/ui/AstroButton/AstroButton'
import { Starfield } from '@/components/sections/HomePage/shared/Starfield.client'
import styles from './SiteFooter.module.css'

type ActiveEntry = {
  element: HTMLElement
  elapsed: number
  lastTime: number
  offset: number
  stiffness: number
  damping: number
}

function footerSpring(seconds: number, stiffness: number, damping: number) {
  const time = Math.max(0, seconds)
  const decay = damping / 2
  const root = Math.sqrt(decay * decay - stiffness)
  const slowRate = -decay + root
  const fastRate = -decay - root
  const slow = (-fastRate / (slowRate - fastRate)) * Math.exp(slowRate * time)
  const fast = (slowRate / (slowRate - fastRate)) * Math.exp(fastRate * time)
  return {
    remaining: slow + fast,
    velocity: slowRate * slow + fastRate * fast,
  }
}

function enteredHalfway(
  intersects: boolean,
  visibleHeight: number,
  elementHeight: number,
  viewportHeight: number,
) {
  if (!intersects) return false
  if (elementHeight === 0) return true
  return visibleHeight / Math.min(elementHeight, viewportHeight) >= 0.5
}

export function SiteFooter() {
  const { navigation, socialLinks, offices, footerCta } = getSiteContent()
  const pathname = usePathname()
  const footerRef = useRef<HTMLElement>(null)
  const isCaseStudy = [
    '/eldowallet-use-case',
    '/talinty-ai-recruitment-platform',
    '/rawi-al-kotob-use-case',
    '/mazad-al-jomrok-use-case',
  ].includes(pathname)

  useLayoutEffect(() => {
    const elements = Array.from(
      footerRef.current?.querySelectorAll<HTMLElement>('[data-footer-entry]') ?? [],
    )
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const active = new Map<HTMLElement, ActiveEntry>()
    let frame = 0

    const finish = (element: HTMLElement) => {
      active.delete(element)
      element.style.opacity = '1'
      element.style.transform = 'none'
      element.style.removeProperty('will-change')
    }

    const tick = (time: number) => {
      frame = 0
      if (document.hidden) {
        active.forEach((entry) => {
          entry.lastTime = 0
        })
        return
      }

      active.forEach((entry) => {
        if (!entry.lastTime) entry.lastTime = time
        entry.elapsed += (time - entry.lastTime) / 1000
        entry.lastTime = time
        const { remaining, velocity } = footerSpring(entry.elapsed, entry.stiffness, entry.damping)
        entry.element.style.opacity = String(1 - remaining)
        entry.element.style.transform = `translate3d(0, ${entry.offset * remaining}px, 0)`

        if (entry.offset * remaining < 0.01 && entry.offset * Math.abs(velocity) < 0.01) {
          finish(entry.element)
        }
      })

      if (active.size) frame = requestAnimationFrame(tick)
    }

    const schedule = () => {
      if (!frame && active.size && !document.hidden) frame = requestAnimationFrame(tick)
    }

    const start = (element: HTMLElement) => {
      if (active.has(element)) return
      const offset = Number(element.dataset.footerEntry)
      active.set(element, {
        element,
        elapsed: 0,
        lastTime: 0,
        offset,
        stiffness: offset === 50 ? 320 : 66,
        damping: offset === 50 ? 70 : 20,
      })
      schedule()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            !enteredHalfway(
              entry.isIntersecting,
              entry.intersectionRect.height,
              entry.boundingClientRect.height,
              window.innerHeight,
            )
          )
            return
          observer.unobserve(entry.target)
          start(entry.target as HTMLElement)
        })
      },
      { threshold: Array.from({ length: 101 }, (_, index) => index / 100) },
    )

    const showAll = () => {
      cancelAnimationFrame(frame)
      frame = 0
      observer.disconnect()
      elements.forEach(finish)
    }

    if (reducedMotion.matches) {
      showAll()
      return
    }

    elements.forEach((element) => {
      const offset = Number(element.dataset.footerEntry)
      element.style.opacity = '0'
      element.style.transform = `translate3d(0, ${offset}px, 0)`
      element.style.willChange = 'opacity, transform'
      observer.observe(element)
    })

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame)
        frame = 0
        active.forEach((entry) => {
          entry.lastTime = 0
        })
      } else {
        schedule()
      }
    }
    const handlePreferenceChange = () => {
      if (reducedMotion.matches) showAll()
    }

    document.addEventListener('visibilitychange', handleVisibility)
    reducedMotion.addEventListener('change', handlePreferenceChange)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
      reducedMotion.removeEventListener('change', handlePreferenceChange)
      elements.forEach((element) => {
        element.style.removeProperty('opacity')
        element.style.removeProperty('transform')
        element.style.removeProperty('will-change')
      })
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className={[
        styles.footer,
        pathname === '/' ? styles.home : '',
        pathname === '/contact' ? styles.contact : '',
        isCaseStudy ? styles.caseStudy : '',
        pathname === '/eldowallet-use-case' ? styles.eldowalletCase : '',
      ].join(' ')}
    >
      <Starfield />
      <div className={styles.cta}>
        <div className={styles.ctaHeading} data-footer-entry="40">
          <p className={styles.eyebrow}>
            <img src="/assets/images/astrolab-mark.svg" alt="" width="15" height="17" />
            {footerCta.label}
          </p>
          <h2>
            {footerCta.title
              .split(/(Vision|Execution)/)
              .map((part, index) =>
                part === 'Vision' || part === 'Execution' ? <em key={index}>{part}</em> : part,
              )}
          </h2>
        </div>
        <p className={styles.description} data-footer-entry="40">
          {footerCta.description}
        </p>
        <div className={styles.bookEntry} data-footer-entry="40">
          <AstroButton href="/contact" className={styles.book}>
            Book a Call
          </AstroButton>
        </div>
      </div>
      <div className={styles.wordmark} aria-hidden="true">
        <div className={styles.wordmarkArt} data-footer-entry="50">
          <img src="/assets/images/astrolab-wordmark.svg" alt="" width="1124" height="254" />
        </div>
        <div className={styles.wordmarkFade} data-footer-entry="40" />
      </div>
      <div className={styles.bottom}>
        <div className={styles.footerMain} data-footer-entry="40">
          <div className={styles.navigation}>
            <Link className={styles.brand} href="/" aria-label="Astrolab home">
              <img
                className={styles.logo}
                src="/assets/images/astrolab-footer-logo.svg"
                alt="Astrolab"
                width="568"
                height="58"
              />
            </Link>
            <div className={styles.navigationColumns}>
              <div>
                <h3>Menu</h3>
                {navigation.slice(0, 3).map(([label, href]) => (
                  <Link href={href} key={href}>
                    {label === 'Services' ? 'Service' : label}
                  </Link>
                ))}
              </div>
              <div>
                <h3>Resources</h3>
                <Link href="/policies/privacy-policy">Privacy Policy</Link>
                <Link href="/policies/terms-conditions">Terms & Conditions</Link>
              </div>
              <div>
                <h3>Social media</h3>
                {socialLinks.map(([label, href]) => (
                  <a href={href} key={href} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.offices}>
            {offices.map((o) => (
              <div key={o.country}>
                <h3>
                  <img src={`/assets/images/${o.flag}`} alt="" width="24" height="24" /> {o.country}
                </h3>
                <a href={`tel:${o.phone.replaceAll(' ', '')}`}>{o.phone}</a>
                <p>{o.address}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.copyright} data-footer-entry="50">
          <p>© 2025 All rights reserved Astrolab</p>
          <Link href="#top">
            Back to the top{' '}
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 15V5M5 10l5-5 5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  )
}
