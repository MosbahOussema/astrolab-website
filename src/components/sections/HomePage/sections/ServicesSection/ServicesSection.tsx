import type { CSSProperties } from 'react'
import type { Feature } from '@/content/contracts/home'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import { ServicesReveal } from './ServicesReveal.client'
import { ServiceSurface } from './ServiceSurface'
import { VentureVisual } from './VentureVisual.client'
import { AutomationVisual } from './AutomationVisual.client'
import { AppsVisual } from './AppsVisual.client'
import { DesignVisual } from './DesignVisual.client'
import { CloudMotion } from './CloudMotion.client'
import styles from './ServicesSection.module.css'

const cloudRows = [
  ['Scalable', 'Secure', 'Reliable', 'Elastic'],
  ['Scalable', 'Secure', 'Reliable', 'Elastic'],
  ['Elastic', 'Scalable', 'Secure', 'Reliable'],
  ['Cloud-native', 'Resilient', 'Automated', 'Hybrid'],
]

function CloudVisual() {
  return (
    <CloudMotion className={styles.cloudScene}>
      <div className={styles.cloud}>
        {cloudRows.map((row, index) => (
          <div
            className={styles.cloudViewport}
            key={index}
            style={{ '--row': index } as CSSProperties}
          >
            <div className={styles.cloudRow} data-cloud-row>
              {[...row, ...row].map((label, item) => (
                <span key={`${label}-${item}`}>{label}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cloudHub}>
        <div className={styles.cloudBadge}>
          <img src="/assets/images/services-cloud-badge.svg" width="29" height="28" alt="" />
        </div>
      </div>
    </CloudMotion>
  )
}

const visuals = [
  <VentureVisual key="venture" />,
  <AutomationVisual key="automation" />,
  <CloudVisual key="cloud" />,
  <AppsVisual key="apps" />,
  <DesignVisual key="design" />,
]

export function ServicesSection({ items }: { items: Feature[] }) {
  return (
    <section id="service" className={styles.section}>
      <ServicesReveal className={styles.inner}>
        <div className={styles.headingReveal} data-service-heading>
          <SectionHeading
            label="What We Deliver"
            title={'End-To-End Expertise\nFor Ventures And Enterprises'}
          />
        </div>
        <div className={styles.grid}>
          {items.map((item, index) => (
            <article className={styles.card} key={item.title} data-service-reveal>
              <ServiceSurface index={index} />
              <div className={styles.visual}>{visuals[index]}</div>
              {index === 2 ? (
                <div className={styles.cloudFadeFrame} aria-hidden="true">
                  <div className={styles.cloudFade} />
                </div>
              ) : null}
              <div className={styles.copy}>
                <h3>
                  {index === 1 ? (
                    <>
                      {item.title.slice(0, 1)}
                      <strong>{item.title.slice(1)}.</strong>
                    </>
                  ) : (
                    item.title
                  )}
                </h3>
                <div className={styles.separator} />
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </ServicesReveal>
    </section>
  )
}
