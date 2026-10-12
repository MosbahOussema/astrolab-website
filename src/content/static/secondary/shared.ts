import type { RelatedCaseStudy, SecondaryImage } from '@/content/contracts/secondary'

export const image = (src: string, alt: string, width = 2064, height = 1322): SecondaryImage => ({
  alt,
  height,
  src: `/assets/images/${src}`,
  width,
})

export const relatedCases = {
  eldo: {
    href: '/eldowallet-use-case',
    image: image('xJgfNMm2ikdnEd7ksTRXhtRyz0.jpg', 'EldoWallet', 2544, 1923),
    sector: 'retail, small to large businesses, mobile marketing campaigns',
    title: 'EldoWallet',
  },
  mazad: {
    href: '/mazad-al-jomrok-use-case',
    image: image('5mFDH4hPxIEq1k7BCvLo17nknQ.jpg', 'Mazad Al Jomrok', 2544, 1908),
    sector: 'Government services, e-auction, customs, public sector',
    title: 'Mazad-al-jomrok',
  },
  rawi: {
    href: '/rawi-al-kotob-use-case',
    image: image('nboob6ZqbyqOumuahu8rfbZt9VI.jpg', 'Rawi Al Kotob', 2544, 1908),
    sector: 'educational & entertainment sectors',
    title: 'Rawi-al-kotob',
  },
  talinty: {
    href: '/talinty-ai-recruitment-platform',
    image: image('krJVulGYzbltLf78PfYZaL3OvzE.png', 'Talinty', 3816, 2862),
    sector: 'Recruitment & Staffing Industry',
    title: 'Talinty',
  },
} as const satisfies Record<string, RelatedCaseStudy>
