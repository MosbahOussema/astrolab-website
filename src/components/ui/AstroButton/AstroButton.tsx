import Link from 'next/link'
import styles from './AstroButton.module.css'

export function AstroButton({
  children,
  href,
  secondary = false,
  arrow = true,
  className = '',
}: {
  children: React.ReactNode
  href: string
  secondary?: boolean
  arrow?: boolean
  className?: string
}) {
  return (
    <Link className={`${styles.button} ${secondary ? styles.secondary : ''} ${className}`} href={href}>
      {children}
      {arrow && (
        <svg aria-hidden="true" className={styles.arrow} viewBox="0 0 20 21" fill="none">
          <path
            d="M6.25 14.6201L13.75 7.12012M13.75 7.12012H6.25M13.75 7.12012V14.6201"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Link>
  )
}
