import assert from 'node:assert/strict'
import test from 'node:test'
import {
  advanceParticle,
  createParticle,
  STARFIELD_MOVE_SPEED,
  STARFIELD_PARTICLE_COUNT,
} from '../../src/components/sections/HomePage/shared/starfieldSimulation.ts'

test('reference scalar configuration remains explicit', () => {
  assert.equal(STARFIELD_PARTICLE_COUNT, 30)
  assert.equal(STARFIELD_MOVE_SPEED, 0.5)
})

test('initial radius, position and velocity follow the reference distribution', () => {
  const values = [0.25, 0.2, 0.8, 0, 0.5]
  const particle = createParticle(100, 80, () => values.shift())
  assert.deepEqual(particle, { radius: 1.25, x: 20, y: 64, vx: 1, vy: 0 })
})

test('source speed model is frame-rate independent', () => {
  const particle = { x: 20, y: 20, radius: 1.5, vx: 1, vy: 0 }
  const divided = { ...particle }
  advanceParticle(particle, 100, 80, 1000)
  for (let i = 0; i < 60; i++) advanceParticle(divided, 100, 80, 1000 / 60)
  assert.equal(particle.x, 35)
  assert.deepEqual(divided, particle)
})

test('out mode waits until the full circle exits and randomizes the other axis', () => {
  const particle = { x: 101, y: 20, radius: 1, vx: 1, vy: 0 }
  advanceParticle(particle, 100, 80, 0, () => 0.25)
  assert.equal(particle.x, 101)
  advanceParticle(particle, 100, 80, 1000 / 60, () => 0.25)
  assert.deepEqual(particle, { x: -1, y: 20, radius: 1, vx: 1, vy: 0 })
})

test('source random clamp keeps positions inside the canvas', () => {
  const particle = createParticle(100, 80, () => 1)
  assert.ok(particle.radius <= 2)
  assert.ok(particle.x < 100)
  assert.ok(particle.y < 80)
})

test('corner wrapping processes bottom before horizontal exits', () => {
  const particle = { x: 102, y: 82, radius: 1, vx: 1, vy: 1 }
  advanceParticle(particle, 100, 80, 0, () => 0.5)
  assert.equal(particle.x, 50)
  assert.equal(particle.y, -1)
})

test('all other edges preserve heading and randomize the orthogonal position', () => {
  for (const [start, expected] of [
    [
      { x: -2, y: 20 },
      { x: 101, y: 40 },
    ],
    [
      { x: 102, y: 20 },
      { x: -1, y: 40 },
    ],
    [
      { x: 20, y: -2 },
      { x: 50, y: 81 },
    ],
  ]) {
    const particle = { ...start, radius: 1, vx: -0.5, vy: 0.5 }
    advanceParticle(particle, 100, 80, 0, () => 0.5)
    assert.deepEqual(particle, { ...expected, radius: 1, vx: -0.5, vy: 0.5 })
  }
})
