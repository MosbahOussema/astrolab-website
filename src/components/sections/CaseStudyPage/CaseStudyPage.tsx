import type { CaseStudyContent } from '@/content/contracts/secondary'
import Image from 'next/image'
import Link from 'next/link'

import { CaseMotion } from './CaseMotion.client'
import { CaseRichText } from './CaseRichText'
import { CaseSection } from './CaseSection'
import styles from './caseStudyStyles'

export default function CaseStudyPage({ content }: { content: CaseStudyContent }) {
  return (
    <CaseMotion key={content.slug} className={styles.page} slug={content.slug}>
      <section className={styles.hero}>
        <div className={styles.heroHeading} data-case-entry="heading">
          <p className={styles.breadcrumb}>
            <Link href="/">Case Studies / </Link>
            <span>{content.title}</span>
          </p>
          <h1>{content.title}</h1>
        </div>
        <div className={styles.heroImage} data-case-entry="cover">
          <Image
            alt={content.heroImage.alt}
            height={content.heroImage.height}
            priority
            sizes="(max-width: 809px) 100vw, 82vw"
            src={content.heroImage.src}
            width={content.heroImage.width}
          />
        </div>
      </section>

      <section
        className={`${styles.contentSection} ${styles.overview}`}
        data-case-entry={content.slug !== 'talinty-ai-recruitment-platform' ? 'section' : undefined}
      >
        <p className={styles.sectionLabel}>Overview</p>
        <div className={styles.sectionBody}>
          <div className={styles.overviewCopy}>
            {content.overview.map((paragraph, index) => (
              <p key={index}>
                <CaseRichText text={paragraph} formatting={content.overviewFormatting} />
                {content.overviewBlankLineAfter?.includes(index) ? (
                  <>
                    <br />
                    <br />
                  </>
                ) : null}
              </p>
            ))}
          </div>
          <div className={styles.facts}>
            {content.facts.map((fact) => (
              <div className={styles.fact} key={fact.label} data-case-entry="fact">
                <h2>
                  <span className={fact.mobileLabel ? styles.desktopFactLabel : undefined}>
                    {fact.label}
                  </span>
                  {fact.mobileLabel ? (
                    <span className={styles.mobileFactLabel}>{fact.mobileLabel}</span>
                  ) : null}
                </h2>
                {fact.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {content.sections.map((section) => (
        <CaseSection key={section.id} section={section} slug={content.slug} />
      ))}

      <section className={styles.relatedSection}>
        <h2 data-case-entry="fact">Other Project</h2>
        <div className={styles.relatedGrid}>
          {content.related.map((related) => (
            <Link
              className={styles.relatedCard}
              href={related.href}
              key={related.href}
              data-case-hover
              data-case-entry="related"
            >
              <div className={styles.relatedImage}>
                <Image
                  alt={related.image.alt}
                  fill
                  sizes="(max-width: 809px) 100vw, 33vw"
                  src={related.image.src}
                />
              </div>
              <h3>{related.title}</h3>
              <p>{related.sector}</p>
            </Link>
          ))}
        </div>
      </section>
    </CaseMotion>
  )
}
