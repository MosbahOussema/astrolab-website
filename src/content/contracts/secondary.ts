export type SecondaryImage = {
  alt: string
  height: number
  src: string
  width: number
}

export type ContactSocialLink = {
  href: string
  label: string
}

export type ContactPageContent = {
  assurances: readonly string[]
  email: string
  eyebrow: string
  formTitle: string
  socialLinks: readonly ContactSocialLink[]
  title: readonly string[]
}

export type CaseStudyFact = {
  label: string
  mobileLabel?: string
  lines: readonly string[]
}

export type CaseStudyItem = {
  image?: SecondaryImage
  paragraphs: readonly string[]
  mobileParagraphs?: readonly string[]
  title?: string
  titleStrong?: boolean
  titleStrongText?: string
  textReveal?: boolean
  titleReveal?: boolean
}

export type CaseStudyBlock =
  | { type: 'paragraph' | 'heading'; text: string; breakableWords?: readonly string[] }
  | { type: 'list'; items: readonly string[]; ordered?: boolean }

export type CaseStudySection = {
  id: string
  textReveal?: boolean
  introReveal?: boolean
  titleReveal?: boolean
  itemTitleReveal?: boolean
  intro?: readonly string[]
  introBlocks?: readonly CaseStudyBlock[]
  bulletItems?: boolean
  items?: readonly CaseStudyItem[]
  label: string
  title?: string
  titleStrong?: boolean
  mobileTitle?: string
}

export type RelatedCaseStudy = {
  href: `/${string}`
  image: SecondaryImage
  sector: string
  title: string
}

export type CaseStudyContent = {
  facts: readonly CaseStudyFact[]
  heroImage: SecondaryImage
  overview: readonly string[]
  overviewBlankLineAfter?: readonly number[]
  overviewFormatting?: readonly { text: string; style: 'emphasis' | 'strong' }[]
  related: readonly RelatedCaseStudy[]
  sections: readonly CaseStudySection[]
  seoDescription: string
  seoTitle: string
  slug: string
  title: string
}

export type LegalTextFormatting = {
  emphasis?: readonly string[]
  links?: readonly { text: string; href: string }[]
}

export type LegalListBlock = LegalTextFormatting & {
  items: readonly string[]
  type: 'list'
}

export type LegalParagraphBlock = LegalTextFormatting & {
  text: string
  type: 'paragraph'
}

export type LegalBlock = LegalListBlock | LegalParagraphBlock | { type: 'spacer' }

export type LegalSection = {
  blocks: readonly LegalBlock[]
  title: string
}

export type LegalDocumentContent = {
  date: string
  intro?: readonly LegalBlock[]
  sections: readonly LegalSection[]
  seoDescription: string
  seoTitle: string
  slug: string
  title: string
}

export type ThankYouPageContent = {
  background: SecondaryImage
  body: string
  cta: string
  title: string
}
