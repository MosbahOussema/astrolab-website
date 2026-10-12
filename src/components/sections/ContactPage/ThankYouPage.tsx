import type { ThankYouPageContent } from '@/content/contracts/secondary'
import Image from 'next/image'
import Link from 'next/link'
import { Starfield } from '../HomePage/shared/Starfield.client'

import styles from './ThankYouPage.module.css'

export default function ThankYouPage({ content }: { content: ThankYouPageContent }) {
  return (
    <main className={styles.page}>
      <Image
        alt={content.background.alt}
        className={styles.background}
        fill
        priority
        unoptimized
        sizes="100vw"
        src={content.background.src}
      />
      <section className={styles.content}>
        <span aria-hidden="true" className={styles.checkmark}>
          <svg viewBox="0 0 37 36">
            <path d="M8 21 13.25 26.25 29 9.75" />
          </svg>
        </span>
        <h1>{content.title}</h1>
        <p>{content.body}</p>
        <Link href="/">
          <span>{content.cta}</span>
          <svg aria-hidden="true" viewBox="0 0 21 21">
            <path d="M6.75 14.25 14.25 6.75M14.25 6.75H6.75M14.25 6.75v7.5" />
          </svg>
        </Link>
      </section>
      <div className={styles.particles} aria-hidden="true">
        <Starfield />
      </div>
    </main>
  )
}
