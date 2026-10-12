'use client'

import { useState } from 'react'

import type { ContactPageContent } from '@/content/contracts/secondary'

import styles from './ContactPage.module.css'

type SocialLink = ContactPageContent['socialLinks'][number]

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 25">
      <path d="M16.5 8 6 18.5" />
      <path d="M8 6.68791s8.0479-.67842 9.2692.54288C18.4906 8.45209 17.812 16.5 17.812 16.5" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M9 15c0-2.8284 0-4.2426.8787-5.1213C10.7574 9 12.1716 9 15 9h1c2.8284 0 4.2426 0 5.1213.8787C22 10.7574 22 12.1716 22 15v1c0 2.8284 0 4.2426-.8787 5.1213C20.2426 22 18.8284 22 16 22h-1c-2.8284 0-4.2426 0-5.1213-.8787C9 20.2426 9 18.8284 9 16Z" />
      <path d="M16.9999 9c-.0024-2.9571-.0471-4.4888-.9079-5.5376a6 6 0 0 0-.5544-.5544C14.4312 2 12.7875 2 9.5 2S4.5688 2 3.4624 2.908a6 6 0 0 0-.5544.5544C2 4.5688 2 6.2125 2 9.5s0 4.9312.908 6.0376c.1662.2025.3519.3882.5544.5544 1.0488.8608 2.5805.9055 5.5376.9079" />
    </svg>
  )
}

function CopiedIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3 15 9.29412 20 21 4" />
    </svg>
  )
}

function SocialIcon({ label }: { label: string }) {
  if (label === 'Linkedin')
    return (
      <svg aria-hidden="true" viewBox="0 0 32 33">
        <path d="M6.00033 13.166h-.66667c-1.25708 0-1.88561 0-2.27615.3905-.39052.3906-.39052 1.0191-.39052 2.2762V27.166c0 1.2571 0 1.8856.39052 2.2761.39054.3906 1.01907.3906 2.27615.3906h.66667c1.25708 0 1.88561 0 2.27614-.3906.39052-.3905.39052-1.019.39052-2.2761V15.8327c0-1.2571 0-1.8856-.39052-2.2762-.39053-.3905-1.01906-.3905-2.27614-.3905Z" />
        <path d="M8.66699 6.16602a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path d="M16.435 13.166h-1.1013c-1.2571 0-1.8856 0-2.2762.3905-.3905.3906-.3905 1.0191-.3905 2.2762V27.166c0 1.2571 0 1.8856.3905 2.2761.3906.3906 1.0191.3906 2.2762.3906h.6666c1.2571 0 1.8856 0 2.2762-.3906.3905-.3905.3905-1.019.3905-2.2761l.0001-4.6665c0-2.2091.704-4 2.7838-4 1.0397 0 1.8828.8954 1.8828 2v6c0 1.257 0 1.8856.3905 2.2761.3904.3905 1.0191.3905 2.2761.3905h.665c1.2568 0 1.8852 0 2.2757-.3904.3905-.3904.3907-1.0188.3909-2.2756l.0019-7.3338c0-3.3136-3.1516-6-6.2711-6-1.7758 0-3.36.8705-4.3956 2.2317-.0001-.8401-.0001-1.2601-.1825-1.572-.1156-.1975-.2801-.3619-.4776-.4775-.3119-.1825-.7319-.1825-1.572-.1825Z" />
      </svg>
    )
  if (label === 'Dribbble')
    return (
      <svg aria-hidden="true" viewBox="0 0 32 33">
        <circle cx="16.0003" cy="16.4993" r="13.3333" />
        <path d="M29.3333 18.1855a20.6 20.6 0 0 0-3.8037-.3525C18.3931 17.833 12.0458 21.4897 8 27.1663M25.3337 7.166C21.161 12.0559 14.8909 15.166 7.8798 15.166a23.3 23.3 0 0 1-5.2128-.5884M19.4901 29.8333c.3341-1.6186.5096-3.295.5096-5.0124 0-8.4213-4.221-15.859-10.6667-20.3209" />
      </svg>
    )
  if (label === 'Instagram')
    return (
      <svg aria-hidden="true" viewBox="0 0 32 33">
        <path d="M3.333 16.5007c0-5.9712 0-8.9567 1.855-10.8117 1.855-1.855 4.8406-1.855 10.8117-1.855s8.9566 0 10.8117 1.855c1.8549 1.855 1.8549 4.8405 1.8549 10.8117 0 5.971 0 8.9566-1.8549 10.8117-1.8551 1.8549-4.8407 1.8549-10.8117 1.8549s-8.9567 0-10.8117-1.8549c-1.855-1.8551-1.855-4.8407-1.855-10.8117Z" />
        <circle cx="16" cy="16.5" r="6" />
        <path d="M23.344 9.167h-.012" strokeWidth="2.66667" />
      </svg>
    )
  return (
    <svg aria-hidden="true" viewBox="0 0 32 33">
      <path d="M3.9561 14.4941v6.6691c0 3.7725 0 5.6588 1.1715 6.8308 1.1716 1.1721 3.0572 1.1721 6.8285 1.1721h8c3.7712 0 5.6568 0 6.8284-1.1721 1.1716-1.172 1.1716-3.0583 1.1716-6.8308v-6.6691M19.9561 23.1582c-.9122.8096-2.3643 1.3333-4 1.3333-1.6358 0-3.0879-.5237-4-1.3333" />
      <path d="M13.4721 11.7246c-.376 1.3579-1.7434 3.7002-4.3414 4.0397-2.2939.2997-4.0338-.7016-4.4782-1.1203-.4899-.3395-1.6066-1.4257-1.8801-2.1046-.2735-.679.0456-2.15.2735-2.7497l.911-2.6379c.2224-.6625.743-2.2296 1.2768-2.7596.5337-.5301 1.6144-.5531 2.0592-.5531h9.3406c2.4043.034 7.6614-.0215 8.7006 0 1.0392.0214 1.6637.8925 1.846 1.2659 1.5505 3.7558 2.1536 5.9068 2.1536 6.8233-.2024.9778-1.04 2.8214-3.9996 3.6324-3.076.8426-4.8199-.7966-5.367-1.4259m-7.7598 0c.433.5319 1.7913 1.6024 3.7602 1.6295 1.9691.0272 3.6692-1.3472 4.2731-2.0373.1709-.2037.5401-.8079.9231-2.0029" />
    </svg>
  )
}

export function ContactDetails({
  email,
  socialLinks,
}: {
  email: string
  socialLinks: ContactPageContent['socialLinks']
}) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
  }

  return (
    <div className={styles.contactInset}>
      <div className={styles.contactBlock}>
        <h6 className={styles.miniLabel}>Contact details</h6>
        <div className={styles.emailRow}>
          <h5 className={styles.email}>{email}</h5>
          <button
            aria-label={copyState === 'copied' ? 'Email copied' : 'Copy email address'}
            className={styles.copyButton}
            data-copy-state={copyState}
            onBlur={() => setCopyState('idle')}
            onClick={copyEmail}
            type="button"
          >
            <span aria-hidden="true" className={styles.copyDefault}>
              <CopyIcon />
            </span>
            <span aria-hidden="true" className={styles.copySuccess}>
              <CopiedIcon />
            </span>
            <span aria-live="polite" className={styles.srOnly} role="status">
              {copyState === 'copied'
                ? 'Email address copied.'
                : copyState === 'error'
                  ? 'Unable to copy the email address.'
                  : ''}
            </span>
          </button>
        </div>
      </div>
      <div className={styles.socialBlock}>
        <p className={styles.miniLabel}>Our social links</p>
        <nav aria-label="Astrolab social media" className={styles.socials}>
          {socialLinks.map((link: SocialLink) => (
            <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
              <span className={styles.socialName}>
                <SocialIcon label={link.label} />
                <span>{link.label}</span>
              </span>
              <ArrowIcon />
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
