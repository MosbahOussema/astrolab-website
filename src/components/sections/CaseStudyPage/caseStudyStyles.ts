import baseStyles from './CaseStudyBase.module.css'
import variantStyles from './CaseStudyVariants.module.css'
import responsiveStyles from './CaseStudyResponsive.module.css'

const layers: ReadonlyArray<Record<string, string>> = [
  baseStyles,
  variantStyles,
  responsiveStyles,
]

const cache = new Map<string, string>()

const styles = new Proxy({} as Record<string, string>, {
  get(_target, property) {
    if (typeof property !== 'string') return undefined
    const cached = cache.get(property)
    if (cached !== undefined) return cached
    const className = layers
      .map((layer) => layer[property])
      .filter(Boolean)
      .join(' ')
    cache.set(property, className)
    return className
  },
})

export default styles
