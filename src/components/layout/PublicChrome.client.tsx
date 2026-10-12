'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/** Confirmation retains navigation but does not include the marketing footer. */
export function PublicChrome({
  children,
  region = 'footer',
}: {
  children: ReactNode
  region?: 'header' | 'footer'
}) {
  return usePathname() === '/thank-you' && region === 'footer' ? null : children
}
