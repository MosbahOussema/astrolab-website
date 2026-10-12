import { act, cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => {
  class MockLenis {
    static instances: MockLenis[] = []

    destroy = vi.fn()
    raf = vi.fn()
    scrollTo = vi.fn()

    constructor() {
      MockLenis.instances.push(this)
    }
  }

  return { MockLenis, pathname: '/' }
})

vi.mock('lenis', () => ({ default: mocks.MockLenis }))
vi.mock('next/navigation', () => ({ usePathname: () => mocks.pathname }))

import { SmoothScroll } from '../../src/components/layout/SmoothScroll/SmoothScroll.client'

type ChangeListener = (event: MediaQueryListEvent) => void

function createReducedMotion(initial = false) {
  const listeners = new Set<ChangeListener>()
  const media = {
    matches: initial,
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addEventListener: vi.fn((_type: string, listener: ChangeListener) => listeners.add(listener)),
    removeEventListener: vi.fn((_type: string, listener: ChangeListener) =>
      listeners.delete(listener),
    ),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    set(matches: boolean) {
      media.matches = matches
      const event = { matches, media: media.media } as MediaQueryListEvent
      listeners.forEach((listener) => listener(event))
    },
  }
  return media
}

function mountFixture() {
  const target = document.createElement('section')
  target.id = 'service'
  target.style.scrollMarginTop = '24px'
  const anchor = document.createElement('a')
  anchor.href = '/#service'
  anchor.textContent = 'Service'
  document.body.append(anchor, target)
  const view = render(<SmoothScroll />)
  return { anchor, target, ...view }
}

function click(anchor: HTMLAnchorElement) {
  anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0, cancelable: true }))
}

function currentLenis() {
  return mocks.MockLenis.instances.at(-1)!
}

beforeEach(() => {
  mocks.pathname = '/'
  mocks.MockLenis.instances.length = 0
  vi.stubGlobal(
    'requestAnimationFrame',
    vi.fn(() => 1),
  )
  vi.stubGlobal('cancelAnimationFrame', vi.fn())
})

afterEach(() => {
  cleanup()
  document.body.replaceChildren()
  window.history.replaceState(null, '', '/')
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('SmoothScroll pending anchor lifecycle', () => {
  it('finishes the retained target and offset before reduced-motion disposal', () => {
    const media = createReducedMotion()
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => media),
    )
    const { anchor, target } = mountFixture()
    const lenis = currentLenis()

    click(anchor)
    expect(lenis.scrollTo).toHaveBeenNthCalledWith(
      1,
      target,
      expect.objectContaining({ offset: -24, onComplete: expect.any(Function) }),
    )

    act(() => media.set(true))
    expect(lenis.scrollTo).toHaveBeenNthCalledWith(2, target, {
      offset: -24,
      immediate: true,
    })
    expect(lenis.destroy).toHaveBeenCalledOnce()
  })

  it('forgets a completed anchor and does not snap on a later preference change', () => {
    const media = createReducedMotion()
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => media),
    )
    const { anchor } = mountFixture()
    const lenis = currentLenis()

    click(anchor)
    const options = lenis.scrollTo.mock.calls[0]?.[1] as { onComplete: () => void }
    act(() => options.onComplete())
    act(() => media.set(true))

    expect(lenis.scrollTo).toHaveBeenCalledOnce()
    expect(lenis.destroy).toHaveBeenCalledOnce()
  })

  it.each([
    ['wheel', () => window.dispatchEvent(new WheelEvent('wheel'))],
    ['touchstart', () => window.dispatchEvent(new Event('touchstart'))],
    ['scroll key', () => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown' }))],
  ])('does not snap after a %s interruption', (_name, interrupt) => {
    const media = createReducedMotion()
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => media),
    )
    const { anchor } = mountFixture()
    const lenis = currentLenis()

    click(anchor)
    act(interrupt)
    act(() => media.set(true))

    expect(lenis.scrollTo).toHaveBeenCalledOnce()
  })

  it('does not snap during route cleanup and removes every lifecycle listener', () => {
    const media = createReducedMotion()
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => media),
    )
    const removeWindowListener = vi.spyOn(window, 'removeEventListener')
    const removeDocumentListener = vi.spyOn(document, 'removeEventListener')
    const { anchor, unmount } = mountFixture()
    const lenis = currentLenis()

    click(anchor)
    unmount()
    act(() => media.set(true))

    expect(lenis.scrollTo).toHaveBeenCalledOnce()
    expect(lenis.destroy).toHaveBeenCalledOnce()
    expect(cancelAnimationFrame).toHaveBeenCalledWith(1)
    expect(media.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    expect(removeDocumentListener).toHaveBeenCalledWith('click', expect.any(Function), true)
    expect(removeWindowListener).toHaveBeenCalledWith('wheel', expect.any(Function))
    expect(removeWindowListener).toHaveBeenCalledWith('touchstart', expect.any(Function))
    expect(removeWindowListener).toHaveBeenCalledWith('keydown', expect.any(Function))
  })
})
