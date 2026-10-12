import type {
  CaseStudyContent,
  ContactPageContent,
  LegalDocumentContent,
  ThankYouPageContent,
} from '@/content/contracts/secondary'
import {
  caseStudies,
  contactPageContent,
  legalDocuments,
  thankYouPageContent,
} from '@/content/static/secondary'

export const caseStudySlugs = caseStudies.map(({ slug }) => slug)
export const legalDocumentSlugs = legalDocuments.map(({ slug }) => slug)

export function getCaseStudy(slug: string): CaseStudyContent | null {
  return caseStudies.find((entry) => entry.slug === slug) ?? null
}

export function getContactPage(): ContactPageContent {
  return contactPageContent
}

export function getLegalDocument(slug: string): LegalDocumentContent | null {
  return legalDocuments.find((entry) => entry.slug === slug) ?? null
}

export function getThankYouPage(): ThankYouPageContent {
  return thankYouPageContent
}
