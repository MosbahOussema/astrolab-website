'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, type FormEvent } from 'react'

import styles from './ContactPage.module.css'

export function ContactForm({ title }: { title: string }) {
  const router = useRouter()
  const [invalidFields, setInvalidFields] = useState<Set<string>>(() => new Set())

  function markInvalid(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = event.currentTarget.name
    setInvalidFields((current) => new Set(current).add(name))
  }

  function clearInvalid(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.currentTarget
    if (!field.validity.valid) return
    setInvalidFields((current) => {
      if (!current.has(field.name)) return current
      const next = new Set(current)
      next.delete(field.name)
      return next
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    router.push('/thank-you')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <div className={styles.fieldGrid}>
        <label className={styles.field}>
          <span className={styles.srOnly}>Your full name</span>
          <input
            aria-describedby="contact-form-feedback"
            aria-invalid={invalidFields.has('Name') || undefined}
            autoComplete="name"
            name="Name"
            onInput={clearInvalid}
            onInvalid={markInvalid}
            placeholder="Your full name"
            required
            type="text"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.srOnly}>Phone number</span>
          <input
            aria-describedby="contact-form-feedback"
            aria-invalid={invalidFields.has('Phone number') || undefined}
            autoComplete="tel"
            name="Phone number"
            onInput={clearInvalid}
            onInvalid={markInvalid}
            placeholder="Enter your phone number"
            required
            type="tel"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.srOnly}>Email address</span>
          <input
            aria-describedby="contact-form-feedback"
            aria-invalid={invalidFields.has('Email') || undefined}
            autoComplete="email"
            name="Email"
            onInput={clearInvalid}
            onInvalid={markInvalid}
            placeholder="Your email address"
            required
            type="email"
          />
        </label>
        <label className={`${styles.field} ${styles.messageField}`}>
          <span className={styles.srOnly}>Message</span>
          <textarea
            aria-describedby="contact-form-feedback"
            aria-invalid={invalidFields.has('Message') || undefined}
            name="Message"
            onInput={clearInvalid}
            onInvalid={markInvalid}
            placeholder="Tell Us Your Message"
            required
            rows={1}
          />
        </label>
      </div>
      <div className={styles.formFooter}>
        <button type="submit">
          <span>Submit</span>
        </button>
        <p>
          By sending this form I confirm that I have read and accept the{' '}
          <Link href="/policies/privacy-policy">Privacy Policy</Link>
        </p>
        <p aria-live="polite" className={styles.srOnly} id="contact-form-feedback" role="status">
          {invalidFields.size > 0
            ? 'Please complete every required field with valid information.'
            : ''}
        </p>
      </div>
    </form>
  )
}
