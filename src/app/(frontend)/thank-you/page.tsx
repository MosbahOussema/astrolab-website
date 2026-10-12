import ThankYouPage from '@/components/sections/ContactPage/ThankYouPage'
import { getThankYouPage } from '@/content/repositories/secondary'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Thank you for contacting Astrolab.',
  title: 'Thank You for Your Message | Astrolab Team',
}

export default function ThankYouRoute() {
  return <ThankYouPage content={getThankYouPage()} />
}
