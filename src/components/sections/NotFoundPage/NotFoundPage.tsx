import Link from 'next/link'

import { notFoundPageContent, type NotFoundPageContent } from '@/content/static/notFound'

import styles from './NotFoundPage.module.css'

export function NotFoundPage({ content = notFoundPageContent }: { content?: NotFoundPageContent }) {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <svg
          aria-hidden="true"
          className={styles.logo}
          fill="currentColor"
          viewBox="0 0 14 21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 14 0 L 14 7 L 7 7 L 0 0 Z M 14 14 L 7 14 L 7 21 L 0 14 L 0 7 L 7 7 Z" />
        </svg>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.description}>{content.description}</p>
        <Link className={styles.action} href={content.homeHref} role="button">
          {content.homeLabel}
        </Link>
      </div>
    </main>
  )
}
