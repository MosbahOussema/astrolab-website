import Image from 'next/image'
import Link from 'next/link'
import type { CasePreview } from '@/content/contracts/home'
import styles from './CaseStudiesSection.module.css'

export function CaseStudyCard({ item, reverse }: { item: CasePreview; reverse: boolean }) {
  const descriptionParts = item.emphasizedPhrase
    ? item.description.split(item.emphasizedPhrase)
    : null

  return (
    <Link href={`/${item.slug}`} className={styles.cardLink}>
      <article
        className={styles.card}
        data-reverse={reverse}
        data-case-studies-reveal="card"
      >
        <span className={styles.glow} aria-hidden="true" />
        <div className={styles.media}>
          <Image
            src={`/assets/images/${item.image}`}
            alt={`${item.title.split(':')[0]} showcase`}
            fill
            sizes="(max-width: 1199px) calc(100vw - 148px), 513px"
          />
        </div>
        <div className={styles.copy}>
          <div>
            <h3>{item.title}</h3>
            <p>
              {descriptionParts ? (
                <>
                  {descriptionParts[0]}
                  <strong>{item.emphasizedPhrase}</strong>
                  {descriptionParts.slice(1).join(item.emphasizedPhrase)}
                </>
              ) : (
                item.description
              )}
              {item.trailingParagraphBreak && (
                <>
                  <br />
                  <br />
                </>
              )}
            </p>
            <div className={styles.tags + (item.mobileTags ? ' ' + styles.desktopTags : '')}>
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {item.mobileTags && (
              <div className={styles.tags + ' ' + styles.mobileTags}>
                {item.mobileTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
          <span className={styles.action}>
            Explore Use Case{' '}
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m6 14 8-8m0 0H7m7 0v7" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  )
}
