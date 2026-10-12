import type { CasePreview } from '@/content/contracts/home'
import { CaseStudyCard } from './CaseStudyCard.client'
import { CaseStudiesReveal } from './CaseStudiesReveal.client'
import styles from './CaseStudiesSection.module.css'

export function CaseStudiesSection({ items }: { items: CasePreview[] }) {
  return (
    <section id="case-studies" className={styles.section}>
      <CaseStudiesReveal className={styles.inner}>
        <div className={styles.heading} data-case-studies-reveal="heading">
          <div className={styles.label}>
            <img
              src="/assets/images/FgRH97CRKc89glFrnVOauFDy3qE.png"
              alt=""
              aria-hidden="true"
            />
            <p>Case Studies</p>
            <img
              className={styles.separatorEnd}
              src="/assets/images/FgRH97CRKc89glFrnVOauFDy3qE.png"
              alt=""
              aria-hidden="true"
            />
          </div>
          <h2>Where Strategy Meets Outcomes</h2>
          <p className={styles.description}>
            Showcasing real projects that turned bold ideas into measurable business impact.
          </p>
        </div>
        <div className={styles.list}>
          {items.map((item, index) => (
            <CaseStudyCard item={item} reverse={index % 2 === 1} key={item.slug} />
          ))}
        </div>
      </CaseStudiesReveal>
    </section>
  )
}
