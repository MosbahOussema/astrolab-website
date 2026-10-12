export type Particle = {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
}

export const STARFIELD_PARTICLE_COUNT = 30
export const STARFIELD_MOVE_SPEED = 0.5
export const STARFIELD_FPS = 60
export const STARFIELD_MAX_DELTA_MS = 1000
const RANDOM_MAX = 1 - Number.EPSILON

// tsParticles clamps Math.random so range maxima remain exclusive.
function randomUnit(random: () => number) {
  return Math.min(Math.max(random(), 0), RANDOM_MAX)
}

/** CSS-pixel equivalent of the reference tsParticles direction:none model. */
export function createParticle(width: number, height: number, random = Math.random): Particle {
  const radius = 1 + randomUnit(random)
  const x = randomUnit(random) * width
  const y = randomUnit(random) * height
  // direction:none selects a random base direction. straight:false then adds
  // the engine's default move.angle spread of -45..45 degrees.
  const heading =
    randomUnit(random) * Math.PI * 2 + (randomUnit(random) - 0.5) * (Math.PI / 2)
  return {
    x,
    y,
    radius,
    vx: Math.cos(heading),
    vy: Math.sin(heading),
  }
}

export function advanceParticle(
  particle: Particle,
  width: number,
  height: number,
  elapsedMs: number,
  random = Math.random,
) {
  // BaseMover: speed * delta.factor / 2, with delta.factor = 60 * ms / 1000.
  // move.random:false keeps the unit velocity magnitude.
  const deltaFactor = (STARFIELD_FPS * elapsedMs) / 1000
  const distance = (STARFIELD_MOVE_SPEED * deltaFactor) / 2
  particle.x += particle.vx * distance
  particle.y += particle.vy * distance
  const radius = particle.radius

  // `out`, warp:false: cross the entire circle, then randomize the other axis.
  // The engine processes bottom, left, right, then top (important at corners).
  if (particle.y - radius > height) {
    particle.y = -radius
    particle.x = randomUnit(random) * width
  }
  if (particle.x + radius < 0) {
    particle.x = width + radius
    particle.y = randomUnit(random) * height
  }
  if (particle.x - radius > width) {
    particle.x = -radius
    particle.y = randomUnit(random) * height
  }
  if (particle.y + radius < 0) {
    particle.y = height + radius
    particle.x = randomUnit(random) * width
  }
}
