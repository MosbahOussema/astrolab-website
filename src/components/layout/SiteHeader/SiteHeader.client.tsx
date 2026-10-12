'use client'

import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AstroButton } from '@/components/ui/AstroButton/AstroButton'
import styles from './SiteHeader.module.css'

function LanguageControl() {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [open])
  return (
    <div
      className={styles.language}
      ref={root}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpen(false)
      }}
    >
      <button
        className={styles.languageTrigger}
        aria-expanded={open}
        aria-label="Language: English"
        onClick={() => setOpen(!open)}
      >
        <img src="/assets/images/flag-en.svg" width="16" height="16" alt="" />
        <span>EN</span>
        <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9.29 15.46l3.88-3.88L9.29 7.7a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z" />
        </svg>
      </button>
      {open && (
        <div className={styles.languageMenu} aria-label="Language options">
          <button onClick={() => setOpen(false)} aria-label="English, selected">
            <img src="/assets/images/flag-en.svg" width="16" height="16" alt="" />
            <span>EN</span>
          </button>
          <button
            aria-disabled="true"
            title="French is not available in this English-only static preview"
          >
            <img src="/assets/images/flag-fr.svg" width="16" height="16" alt="" />
            <span>FR</span>
          </button>
        </div>
      )}
    </div>
  )
}

export function SiteHeader({ navigation }: { navigation: readonly (readonly [string, string])[] }) {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  const [viewport, setViewport] = useState(0)
  const pill = useRef<HTMLDivElement>(null)
  const widthVelocity = useRef(0)
  const root = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    let previous = window.scrollY
    // A browser restores/directly resolves the initial hash after hydration. The
    // reference keeps its full header for that first jump; only a subsequent
    // user-driven downward scroll may contract it.
    let pendingInitialHash = Boolean(window.location.hash)
    const releaseInitialHash = () => {
      pendingInitialHash = false
      previous = window.scrollY
    }
    const scroll = () => {
      const y = window.scrollY
      root.current?.style.setProperty('--header-scroll', y + 'px')
      if (pendingInitialHash) {
        previous = y
        setCompact(false)
        return
      }
      // The home mobile variant disables the source scroll-direction override.
      if (innerWidth < 810 && pathname === '/') setCompact(false)
      else if (Math.abs(y - previous) > 2) setCompact(y > 0 && y > previous)
      previous = y
    }
    const resize = () => {
      setViewport(innerWidth)
      setOpen(false)
      setCompact(false)
    }
    resize()
    root.current?.style.setProperty('--header-scroll', window.scrollY + 'px')
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('resize', resize)
    window.addEventListener('wheel', releaseInitialHash, { passive: true })
    window.addEventListener('touchstart', releaseInitialHash, { passive: true })
    window.addEventListener('pointerdown', releaseInitialHash, { passive: true })
    window.addEventListener('keydown', releaseInitialHash)
    return () => {
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('resize', resize)
      window.removeEventListener('wheel', releaseInitialHash)
      window.removeEventListener('touchstart', releaseInitialHash)
      window.removeEventListener('pointerdown', releaseInitialHash)
      window.removeEventListener('keydown', releaseInitialHash)
    }
  }, [pathname])

  useEffect(() => {
    const node = pill.current
    if (!node) return
    const sideSpace =
      innerWidth >= 810 || pathname === '/thank-you' ? 100 : pathname === '/contact' ? 80 : 40
    const target =
      compact && !open
        ? 314.03125
        : innerWidth >= 1200
          ? 911.828125
          : document.documentElement.clientWidth - sideSpace
    const from = node.getBoundingClientRect().width
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.style.inlineSize = target + 'px'
      widthVelocity.current = 0
      return
    }
    let frame = 0
    const start = performance.now()
    // Retain velocity when scrolling reverses before the source spring settles.
    // Roots of mass1 / stiffness500 / damping60 are -10 and -50.
    const displacement = from - target
    const slow = (widthVelocity.current + 50 * displacement) / 40
    const fast = -(widthVelocity.current + 10 * displacement) / 40
    const tick = (time: number) => {
      const t = (time - start) / 1000
      const slowTail = slow * Math.exp(-10 * t)
      const fastTail = fast * Math.exp(-50 * t)
      const remaining = slowTail + fastTail
      widthVelocity.current = -10 * slowTail - 50 * fastTail
      node.style.inlineSize = target + remaining + 'px'
      if (Math.abs(remaining) > 0.01 || Math.abs(widthVelocity.current) > 0.01)
        frame = requestAnimationFrame(tick)
      else {
        node.style.inlineSize = target + 'px'
        widthVelocity.current = 0
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [compact, open, viewport, pathname])

  useEffect(() => {
    if (!open) return
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [open])

  const close = () => setOpen(false)
  return (
    <header
      ref={root}
      className={[
        styles.header,
        pathname === '/' ? styles.home : '',
        pathname === '/contact' ? styles.contact : '',
        pathname === '/thank-you' ? styles.confirmation : '',
        pathname.startsWith('/policies/') ? styles.legal : '',
      ].join(' ')}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false)
          toggle.current?.focus()
        }
      }}
    >
      <nav
        aria-label="Main navigation"
        className={styles.navigation + (compact && !open ? ' ' + styles.compact : '')}
      >
        <div ref={pill} className={styles.pill}>
          <div className={styles.brandAndLinks}>
            <Link className={styles.logo} href="/" aria-label="Astrolab home" onClick={close}>
              <img
                src="/assets/images/astrolab-header-logo.svg"
                alt="Astrolab"
                width="111"
                height="28"
              />
            </Link>
            <div className={styles.links}>
              {navigation.map(([label, href], index) => (
                <Fragment key={href}>
                  <a href={href}>{label}</a>
                  <span
                    className={
                      styles.divider +
                      (index === navigation.length - 1 ? ' ' + styles.emptyDivider : '')
                    }
                    aria-hidden="true"
                  />
                </Fragment>
              ))}
            </div>
          </div>
          <div className={styles.actions}>
            <div className={styles.desktopLanguage}>
              <LanguageControl />
            </div>
            <div className={styles.cta}>
              <AstroButton href="/contact">Get in Touch</AstroButton>
            </div>
          </div>
          <button
            ref={toggle}
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <svg className={styles.closeIcon} viewBox="0 0 12 12" aria-hidden="true">
                <path d="M12 0 6 6M6 6 0 12M6 6 12 12M6 6 0 0" />
              </svg>
            ) : (
              <svg className={styles.menuIcon} viewBox="0 0 16 14" aria-hidden="true">
                <path d="M0 0H16M0 7H16M0 14H16" />
              </svg>
            )}
          </button>
        </div>
        {open && (
          <div id="mobile-navigation" className={styles.mobilePanel}>
            <div className={styles.mobileLinks}>
              {navigation.map(([label, href], index) => (
                <Fragment key={href}>
                  <a href={href} onClick={close}>
                    {label === 'Services' ? 'Service' : label}
                  </a>
                  {index < navigation.length - 1 && (
                    <span className={styles.mobileDivider} aria-hidden="true" />
                  )}
                </Fragment>
              ))}
            </div>
            <LanguageControl />
            <div className={styles.mobileCta} onClick={close}>
              <AstroButton href="/contact">Get in Touch</AstroButton>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
