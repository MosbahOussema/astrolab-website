import type { ContactPageContent } from '@/content/contracts/secondary'

import { ContactDetails } from './ContactDetails.client'
import { ContactForm } from './ContactForm.client'
import styles from './ContactPage.module.css'

function CheckIcon() {
  return (
    <svg aria-hidden="true" className={styles.checkIcon} viewBox="0 0 24 24">
      <rect className={styles.checkIconDisc} height="24" rx="12" width="24" />
      <path
        className={styles.checkIconMark}
        d="M17.3327 8 9.99935 15.3333 6.66602 12"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export default function ContactPage({ content }: { content: ContactPageContent }) {
  return (
    <main className={styles.page}>
      <div className={styles.pageContent}>
        <section className={styles.heroCard}>
          <div className={styles.heroCopy}>
            <div className={styles.heroHeading}>
              <h3 className={styles.eyebrow}>{content.eyebrow}</h3>
              <h1>
                {content.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
            </div>
            <ul>
              {content.assurances.map((assurance) => (
                <li key={assurance}>
                  <CheckIcon />
                  <span>{assurance}</span>
                </li>
              ))}
            </ul>
          </div>
          <ContactDetails email={content.email} socialLinks={content.socialLinks} />
        </section>
        <section className={styles.formSection}>
          <h3 className={styles.formLabel}>Contact</h3>
          <ContactForm title={content.formTitle} />
        </section>
      </div>
    </main>
  )
}
