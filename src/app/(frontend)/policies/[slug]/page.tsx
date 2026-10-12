import LegalDocument from '@/components/sections/LegalDocument/LegalDocument'
import { getLegalDocument, legalDocumentSlugs } from '@/content/repositories/secondary'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type PolicyPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return legalDocumentSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params
  const content = getLegalDocument(slug)

  if (!content) return {}

  return {
    description: content.seoDescription,
    title: content.seoTitle,
  }
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = await params
  const content = getLegalDocument(slug)

  if (!content) notFound()

  return <LegalDocument content={content} />
}
