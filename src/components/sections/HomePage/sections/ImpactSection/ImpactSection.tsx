import type { Feature } from '@/content/contracts/home'

import { ImpactIcon } from './ImpactIcons'
import { ImpactReveal } from './ImpactReveal.client'
import styles from './ImpactSection.module.css'

export function ImpactSection({ items }: { items: Feature[] }) {
  return (
    <section id="impact" className={styles.section}>
      <ImpactReveal className={styles.inner}>
        <div className={styles.heading} data-impact-reveal>
          <div className={styles.label}>
            <img src="/assets/images/FgRH97CRKc89glFrnVOauFDy3qE.png" alt="" aria-hidden="true" />
            <p>What Sets Us Apart</p>
            <img
              className={styles.separatorEnd}
              src="/assets/images/FgRH97CRKc89glFrnVOauFDy3qE.png"
              alt=""
              aria-hidden="true"
            />
          </div>
          <h2>Global Reach. Proven Impact.</h2>
        </div>

        <div className={styles.grid} data-impact-reveal>
          {items.map((item, index) => (
            <article className={styles.card} key={item.title}>
              <ImpactIcon index={index} />
              <div className={`${styles.copy} ${styles[`copy${index + 1}`] ?? ''}`}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </ImpactReveal>
    </section>
  )
}
