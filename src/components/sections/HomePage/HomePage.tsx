import type { HomeContent } from '@/content/contracts/home'
import { HeroSection } from './sections/HeroSection/HeroSection'
import { FrameworkSection } from './sections/FrameworkSection/FrameworkSection'
import { ServicesSection } from './sections/ServicesSection/ServicesSection'
import { ImpactSection } from './sections/ImpactSection/ImpactSection'
import { CaseStudiesSection } from './sections/CaseStudiesSection/CaseStudiesSection'
import styles from './HomePage.module.css'
export function HomePage({ content }: { content: HomeContent }) {
  return (
    <main className={styles.page}>
      <HeroSection content={content.hero} />
      <FrameworkSection items={content.framework} />
      <ServicesSection items={content.services} />
      <ImpactSection items={content.impact} />
      <CaseStudiesSection items={content.cases} />
    </main>
  )
}
