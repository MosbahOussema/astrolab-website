import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { createTimedCycle } from '../../src/components/sections/HomePage/shared/timedCycle.ts'

test('homepage timed cycles resume the same hold after visibility pauses', () => {
  let clock = 0
  let nextHandle = 1
  const pending = new Map()
  const states = []
  const cycle = createTimedCycle({
    clear: (handle) => pending.delete(handle),
    delay: (state) => (state === 1 ? 500 : 2000),
    initial: 1,
    next: (state) => (state === 1 ? 2 : 1),
    now: () => clock,
    onState: (state) => states.push(state),
    schedule(callback, delay) {
      const handle = nextHandle++
      pending.set(handle, { callback, delay })
      return handle
    },
  })

  cycle.reset(1, true)
  assert.equal([...pending.values()][0].delay, 500)
  clock = 125
  cycle.setPlaying(false)
  assert.equal(pending.size, 0)
  cycle.setPlaying(true)
  assert.equal([...pending.values()][0].delay, 375)

  const resumed = [...pending.entries()][0]
  pending.delete(resumed[0])
  resumed[1].callback()
  assert.deepEqual(states, [1, 2])
  assert.equal([...pending.values()][0].delay, 2000)

  cycle.dispose()
  assert.equal(pending.size, 0)
})

test('reset discards a paused remainder and cleanup prevents later work', () => {
  let clock = 0
  let nextHandle = 1
  const pending = new Map()
  const states = []
  const cycle = createTimedCycle({
    clear: (handle) => pending.delete(handle),
    delay: () => 1000,
    initial: 'a',
    next: (state) => (state === 'a' ? 'b' : 'a'),
    now: () => clock,
    onState: (state) => states.push(state),
    schedule(callback, delay) {
      const handle = nextHandle++
      pending.set(handle, { callback, delay })
      return handle
    },
  })

  cycle.reset('a', true)
  clock = 900
  cycle.setPlaying(false)
  cycle.reset('b', false)
  cycle.setPlaying(true)
  assert.equal([...pending.values()][0].delay, 1000)
  assert.deepEqual(states, ['a', 'b'])
  cycle.dispose()
  cycle.setPlaying(true)
  assert.equal(pending.size, 0)
})

test('homepage service loops wire viewport, tab, preference, and cleanup lifecycle', () => {
  const root = new URL(
    '../../src/components/sections/HomePage/sections/ServicesSection/',
    import.meta.url,
  )
  for (const file of ['AppsVisual.client.tsx', 'VentureVisual.client.tsx']) {
    const source = readFileSync(new URL(file, root), 'utf8')
    assert.match(source, /createTimedCycle/)
    assert.match(source, /new IntersectionObserver/)
    assert.match(source, /document\.addEventListener\('visibilitychange', synchronize\)/)
    assert.match(source, /cycle\.dispose\(\)/)
    assert.match(source, /observer\?\.disconnect\(\)/)
  }

  const automation = readFileSync(new URL('AutomationVisual.client.tsx', root), 'utf8')
  assert.match(automation, /elapsed \+= time - lastTime/)
  assert.match(automation, /inViewport && !document\.hidden/)
  assert.match(automation, /preference\.addEventListener\('change', syncMotion\)/)
  assert.match(automation, /observer\?\.disconnect\(\)/)

  const surface = readFileSync(new URL('ServiceSurface.tsx', root), 'utf8')
  assert.match(surface, /animationPlayState/)
  assert.match(surface, /inViewport && !document\.hidden && !reducedMotion\.matches/)
  assert.match(surface, /removeProperty\('animation-play-state'\)/)
})

test('reduced motion and first paint never expose empty service artwork', () => {
  const ventureStyles = readFileSync(
    new URL(
      '../../src/components/sections/HomePage/sections/ServicesSection/VentureVisual.module.css',
      import.meta.url,
    ),
    'utf8',
  )
  const appsStyles = readFileSync(
    new URL(
      '../../src/components/sections/HomePage/sections/ServicesSection/AppsVisual.module.css',
      import.meta.url,
    ),
    'utf8',
  )
  const surface = readFileSync(
    new URL(
      '../../src/components/sections/HomePage/sections/ServicesSection/ServiceSurface.tsx',
      import.meta.url,
    ),
    'utf8',
  )

  assert.match(
    ventureStyles,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.workspace,[\s\S]*opacity:\s*1/s,
  )
  assert.match(
    appsStyles,
    /@media \(min-width: 1200px\) and \(prefers-reduced-motion: reduce\)[\s\S]*\.dashboard,[\s\S]*opacity:\s*1/s,
  )
  assert.match(surface, /useLayoutEffect/)
  assert.match(surface, /style=\{\{ animationPlayState: 'paused' \}\}/)
})
