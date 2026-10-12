import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { SiteFooter } from '@/components/layout/SiteFooter/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader.client'
import { PublicChrome } from '@/components/layout/PublicChrome.client'
import { SmoothScroll } from '@/components/layout/SmoothScroll/SmoothScroll.client'
import { getSiteContent } from '@/content/repositories/site'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import '@/design-system/tokens.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const { navigation } = getSiteContent()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang="en"
      dir="ltr"
      data-theme="dark"
      suppressHydrationWarning
    >
      <head suppressHydrationWarning>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="astrolab" id="top">
        <Providers>
          <SmoothScroll />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <PublicChrome region="header">
            <SiteHeader navigation={navigation} />
          </PublicChrome>
          {children}
          <PublicChrome>
            <SiteFooter />
          </PublicChrome>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@astrolab',
  },
}
