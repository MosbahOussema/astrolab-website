import type { Feature } from '@/content/contracts/home'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import { FrameworkIllustrations } from './FrameworkIllustrations.client'
import { FrameworkReveal } from './FrameworkReveal.client'
import styles from './FrameworkSection.module.css'

export function FrameworkSection({ items }: { items: Feature[] }) {
  return (
    <section id="framework" className={styles.section}>
      <FrameworkReveal className={styles.inner}>
        <SectionHeading
          label="The Astrolab Framework"
          title="Astrolab Transforms Complex Challenges Into Clear, Actionable Roadmaps."
        />
        <FrameworkIllustrations items={items} />
      </FrameworkReveal>
    </section>
  )
}
