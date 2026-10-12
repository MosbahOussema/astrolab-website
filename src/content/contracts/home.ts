export type Feature = { title: string; description: string }
export type CasePreview = Feature & {
  slug: string
  image: string
  tags: string[]
  mobileTags?: string[]
  trailingParagraphBreak?: boolean
  emphasizedPhrase?: string
}
export type HomeContent = {
  hero: { eyebrow: string; description: string }
  framework: Feature[]
  services: Feature[]
  impact: Feature[]
  cases: CasePreview[]
}
