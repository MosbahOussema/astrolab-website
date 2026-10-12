import ContactPage from '@/components/sections/ContactPage/ContactPage'
import { getContactPage } from '@/content/repositories/secondary'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Start a conversation with Astrolab about your digital product, strategy, or technology needs.',
  title: 'Contact Astrolab | Get a Quote',
}

export default function ContactRoute() {
  return <ContactPage content={getContactPage()} />
}
