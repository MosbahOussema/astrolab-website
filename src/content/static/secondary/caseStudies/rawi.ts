import type { CaseStudyContent } from '@/content/contracts/secondary'
import { image, relatedCases } from '../shared.ts'

export const rawi: CaseStudyContent = {
  facts: [
    { label: 'Market', lines: ['Educational & Entertainment sectors'] },
    { label: 'Platform', lines: ['Mobile application (iOS and Android),'] },
  ],
  heroImage: image('HMb6epkZJAgdB3QwUZdTztkREsw.webp', 'Rawi cover', 2544, 1908),
  overview: [
    'Rawialkotob.com (RAWI) is a leading digital platform for Arabic audiobooks, podcasts, educational content, and more designed to deliver an engaging, intuitive experience for Arabic-speaking audiences.',
    'Rawi Al Kotob (RAWI) established itself as the premier Arabic audiobook platform through comprehensive accessibility implementation, strategic institutional partnerships, and inclusive design that serves 400+ million Arabic speakers globally. The platform achieved first-to-market advantages through Qatar National Library integration and full MADA e-Accessibility compliance while securing premium distribution via Qatar Airways partnership.',
    'RAWI empowers listeners with stories, knowledge, and entertainment anytime, anywhere. Its library offers a wide range of exclusive, carefully curated titles tailored to diverse interests, featuring audio productions available only on RAWI. Every audiobook is brought to life with high-quality narration, professional sound design, and immersive delivery, creating a captivating listening journey.',
  ],
  related: [relatedCases.talinty, relatedCases.eldo, relatedCases.mazad],
  sections: [
    {
      id: 'services',
      items: [
        {
          paragraphs: [
            'Full stack website development showcasing Rawialkotob’s app features and value proposition',
            'Mobile app design and development with integration to Qatar National Library (QNL) content',
            'Implementation of Mada E-Accessibility guidelines to cater to users with visual, cognitive, and auditory disabilities',
            'Support services for managing QNL subscriptions, book catalog management, app maintenance, and compliance with accessibility standards',
            'Strategic consultation to position Rawialkotob as a leading Arabic audio platform in the region',
          ],
        },
      ],
      label: 'Services',
      title: 'Services Provided',
    },
    {
      id: 'challenges',
      intro: [
        'The Arabic digital content ecosystem faces significant structural challenges that create barriers to inclusive engagement:',
      ],
      items: [
        {
          paragraphs: [
            'Arabic digital content remains underrepresented online despite 400+ million Arabic speakers globally, with audiobooks being particularly scarce before 2017.',
          ],
          title: 'Content Scarcity',
        },
        {
          paragraphs: [
            'An estimated 40+ million Arabic speakers with disabilities lack access to accessible digital content, with limited screen reader support and Arabic-optimized assistive technologies.',
          ],
          title: 'Accessibility Exclusion:',
        },
        {
          paragraphs: [
            'Traditional content distribution channels in MENA lack the infrastructure for digital audio delivery, creating gaps between content creators and audiences.',
          ],
          title: 'Fragmented Distribution:',
          textReveal: false,
          titleReveal: false,
        },
        {
          paragraphs: [
            "Arabic children's educational content, particularly in audio format, remains significantly underdeveloped compared to English-language alternatives.",
          ],
          title: "Children's Market Underservice:",
          textReveal: false,
          titleReveal: false,
        },
        {
          paragraphs: [
            'Educational and library institutions struggle to provide digital Arabic content through unified, accessible platforms that meet government accessibility standards.',
          ],
          title: 'Institutional Integration Barriers:',
          textReveal: false,
          titleReveal: false,
        },
      ],
      label: 'Challanges',
      title: 'The Challenge: Bridging the Arabic Content Gap',
    },
    {
      id: 'solutions',
      intro: [
        'RAWI transforms Arabic content consumption through comprehensive accessibility implementation and strategic institutional partnerships:',
      ],
      items: [
        {
          image: image(
            'iiGHvHJablQZk4e0d4WmORAxj4.webp',
            'Rawi Qatar National Library integration',
          ),
          paragraphs: [
            "Revolutionary partnership enabling QNL members to access RAWI's complete catalog, creating the first institutional-grade Arabic audiobook distribution model in the region.",
          ],
          title: 'Qatar National Library (QNL) Integration:',
        },
        {
          paragraphs: [
            "\u00a0Complete implementation of Qatar's assistive technology standards, ensuring WCAG 2.0 AA compliance for comprehensive accessibility.",
          ],
          title: 'Full MADA E-Accessibility Compliance:',
        },
        {
          paragraphs: [
            "High-quality narration and immersive sound design that differentiates RAWI's content from amateur productions, establishing new standards for Arabic audiobook quality.",
          ],
          title: 'Professional Audio Production:',
        },
        {
          paragraphs: [
            'Simultaneous iOS and Android deployment optimized for MENA market preferences and device usage patterns.',
          ],
          title: 'Multi-Platform Native Distribution:',
        },
        {
          paragraphs: [
            'Full compatibility with TalkBack (Android) and VoiceOver (iOS) specifically optimized for Arabic text processing and right-to-left reading patterns.',
          ],
          title: 'Advanced Screen Reader Support:',
        },
        {
          paragraphs: [
            'User-controlled text sizing that accommodates visual impairments while maintaining Arabic typography integrity.',
          ],
          title: 'Dynamic Font Size Scaling:',
        },
        {
          image: image('B9RlqogTHHkM65VPBtor2jegl8.webp', 'Rawi haptic feedback'),
          paragraphs: [
            'Tactile user interactions that enhance navigation for users with visual or cognitive disabilities.',
          ],
          title: 'Haptic Feedback Integration:',
        },
        {
          paragraphs: [
            'MADA-compliant visual themes with optimized color schemes for users with visual impairments, following international accessibility guidelines.',
          ],
          title: 'High Contrast Accessibility Themes:',
        },
        {
          image: image('ZPMoT4SWoNq6wDpdcgN091ySI.webp', 'Rawi kids mode'),
          paragraphs: [
            'Safe, educational Arabic content delivery with age-appropriate filtering and parental oversight capabilities.',
          ],
          title: 'Kids Mode with Parental Controls:',
        },
        {
          image: image('ED9nSen5ezUcF1kU0aA6UaFiDd8.webp', 'Rawi drive mode'),
          paragraphs: [
            'offers a simplified, distraction-free interface with larger buttons and single-touch volume control, making it safe and easy to listen while driving.',
          ],
          title: 'Drive Mode:',
        },
        {
          image: image('wjQZmyc81WF3A4XkKzKla32eR4.webp', 'Rawi offline mode'),
          paragraphs: [
            'lets you download audiobooks to your device so you can keep listening without an internet connection which makes it perfect for flights, commutes, or places with limited coverage.',
          ],
          title: 'Offline Mode',
        },
        {
          image: image('UNqB23ew4WF5691hsoPbRJvSX44.webp', 'Rawi app download'),
          paragraphs: [
            'lets you download audiobooks to your device so you can keep listening without an internet connection which makes it perfect for flights, commutes, or places with limited coverage.',
          ],
          title:
            'Rawi Al Kotob is available on both AppStore and Google Play, and now on Soundcloud:',
        },
      ],
      label: 'Solutions',
      title: 'The RAWI Solution: Accessibility-First Arabic Audio Platform',
    },
    {
      id: 'strategy',
      items: [
        {
          paragraphs: [
            "RAWI's partnership with QNL represents the first institutional-grade Arabic audiobook access model, enabling library members to access exclusive content directly through their existing memberships. This integration validates RAWI's content quality while expanding addressable markets through institutional channels.",
          ],
          title: 'Qatar National Library Integration',
        },
        {
          image: image('QmYNt8PlDzDkQhPkeY11tNGtKA.webp', 'Rawi and Qatar partnership'),
          paragraphs: [
            'Securing permanent placement on Qatar Airways aircraft positions RAWI content as premium entertainment for international travelers, enhancing brand credibility while reaching Arabic-speaking diaspora populations globally.',
          ],
          title: 'Qatar Airways Exclusive Content Partnership',
        },
      ],
      label: 'Strategie',
      title: 'Strategic Partnerships: Institutional Validation and Premium Distribution',
      titleStrong: true,
    },
    {
      id: 'results',
      intro: ['Platform Achievements'],
      textReveal: false,
      itemTitleReveal: false,
      items: [
        {
          paragraphs: [
            '\u00a0Established as the leading Arabic audiobook platform in MENA through first-mover advantages and comprehensive feature set.',
          ],
          title: 'Regional Market Leadership:',
        },
        {
          paragraphs: [
            'Achieved full MADA e-Accessibility certification, positioning RAWI for government and educational sector adoption.',
          ],
          title: 'Accessibility Compliance Success:',
        },
        {
          paragraphs: [
            'Qatar Airways exclusive content partnership demonstrates platform quality and commercial viability at international scale.',
          ],
          title: 'Premium Partnership Validation:',
        },
        {
          paragraphs: [
            'Successful deployment across iOS and Android app stores with comprehensive MENA regional availability.',
          ],
          title: 'Multi-Platform Market Penetration:',
        },
        { paragraphs: [], title: 'Competitive Advantages', titleReveal: true },
        {
          paragraphs: [
            'QNL partnership creates defensible institutional market position unavailable to competitors.',
          ],
          title: 'First-Mover Institutional Integration:',
        },
        {
          paragraphs: [
            'Comprehensive MADA compliance provides regulatory advantages for government and education sector sales.',
          ],
          title: 'Accessibility Leadership:',
        },
        {
          paragraphs: [
            'Professional narration and sound design differentiate RAWI from amateur content providers.',
          ],
          title: 'Premium Audio Quality:',
        },
        {
          paragraphs: [
            'Kids Mode and accessibility features expand addressable market beyond traditional audiobook demographics.',
          ],
          title: 'Inclusive Design Framework:',
        },
      ],
      label: 'Results',
      title: 'The Result: Market Leadership Through Inclusive Innovation',
    },
    {
      id: 'conclusion',
      intro: [
        "Rawi Al Kotob demonstrates that accessibility-first design creates sustainable competitive advantages while expanding addressable markets in underserved segments. Through comprehensive MADA compliance, strategic institutional partnerships, and premium content quality, RAWI established market leadership in the rapidly growing Arabic digital content space. The platform's success validates the business case for inclusive design while setting industry standards for Arabic accessibility implementation. As the MENA digital market continues expanding at 19.8% annually, RAWI's foundation in accessibility and institutional partnerships positions the platform for sustained growth and regional market leadership.",
      ],
      label: 'Conclusion',
    },
  ],
  seoDescription:
    'How Astrolab built RAWI, an accessibility-first Arabic audiobook platform with strategic institutional partnerships.',
  seoTitle: 'Rawi Al Kotob Use Case | Astrolab Arabic Audiobook Platform',
  slug: 'rawi-al-kotob-use-case',
  title: 'Rawi Al Kotob: Pioneering Arabic Audiobook Accessibility in the MENA Region',
}
