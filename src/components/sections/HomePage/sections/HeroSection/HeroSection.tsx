import type { HomeContent } from '@/content/contracts/home'
import { AstroButton } from '@/components/ui/AstroButton/AstroButton'
import { Starfield } from '../../shared/Starfield.client'
import { HeroCarousel } from './HeroCarousel.client'
import { PartnerTicker } from './PartnerTicker.client'
import { Partners } from './Partners.client'
import styles from './HeroSection.module.css'

export function HeroSection({ content }: { content: HomeContent['hero'] }) {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.backgroundLayer} aria-hidden="true">
        <img
          className={styles.background}
          src="/assets/images/SHKAyyvo2GTbkuksRArmdrqw17k.png"
          alt=""
          width="2880"
          height="1475"
          fetchPriority="high"
          draggable={false}
        />
      </div>
      <div className={styles.particles} aria-hidden="true">
        <Starfield />
      </div>
      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <img src="/assets/images/astrolab-mark.svg" alt="" width="15" height="17" />
          {content.eyebrow}
        </p>
        <h1 className={styles.title} aria-label="Mapping The Path From Vision To Impact.">
          <span className={styles.first}>
            <span>Mapping</span>
            <HeroCarousel />
            <span>The Path</span>
          </span>
          <span className={styles.second}>
            <span>From</span>
            <em>Vision</em>
            <span>To</span>
            <em>Impact.</em>
          </span>
        </h1>
        <p className={styles.description}>{content.description}</p>
        <div className={styles.actions}>
          <AstroButton href="/contact">Get in Touch</AstroButton>
          <AstroButton href="/#case-studies" secondary arrow={false}>
            Explore our work
          </AstroButton>
        </div>
      </div>
      <Partners className={styles.partners}>
        <p>Building success with global industry leaders</p>
        <PartnerTicker />
      </Partners>
    </section>
  )
}
