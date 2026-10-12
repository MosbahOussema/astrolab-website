import type { CaseStudyContent } from '@/content/contracts/secondary'
import { image, relatedCases } from '../shared.ts'

export const eldowallet: CaseStudyContent = {
  facts: [
    { label: 'Market', lines: ['Small to large Business , Digital Wallets'] },
    {
      label: 'Platform',
      lines: [
        'Cloud-Based back office, Apple Wallet & google wallet integration',
        'API connectors',
      ],
    },
  ],
  heroImage: image('xO2DKJnvJe9dvQvlxesghUzZ4.webp', 'EldoWallet Cover', 2544, 1923),
  overview: [
    'EldoWallet is a powerful digital solution that enables businesses and institutions to create and digitize loyalty cards, tickets, and mobile marketing campaigns directly in Apple Wallet and Google Wallet. With zero mobile apps to develop, EldoWallet delivers passes straight to customer phones, ensuring instant adoption and reduced costs.',
    'Through an intuitive back office, EldoWallet enables merchants and business owners to design, distribute, and update digital cards, send personalized notifications, and track campaign performance all within one seamless experience that drives engagement, boosts loyalty, and maximizes ROI.',
    'The system delivers simple, secure, and high-performance results, improving customer experience by 100 %, achieving a 72 % opt‑in rate and costing 35 % less than SMS marketing',
    "EldoWallet serves a broad range of organizations: retail chains, restaurants, associations, municipalities, museums, marketing agencies, software vendors (CRM/ticketing), clubs, partners, and sponsors. For each sector, it delivers digital loyalty programs, membership cards, or tickets directly to consumers' smartphone wallets.",
  ],
  related: [relatedCases.talinty, relatedCases.rawi, relatedCases.mazad],
  overviewFormatting: [
    { text: 'zero mobile apps to develop', style: 'emphasis' },
    { text: '72 % opt‑in rate', style: 'strong' },
    { text: '35 % less than SMS marketing', style: 'strong' },
  ],
  sections: [
    {
      id: 'services',
      itemTitleReveal: false,
      items: [
        {
          paragraphs: [
            'Designed and developed a comprehensive back-office management platform that enables merchants and marketing managers to easily create, customize, deploy, and manage digital wallet campaigns and cards.',
          ],
          title: '1. Back-Office Development:',
        },
        {
          paragraphs: [
            'Configured and integrated Eldo Wallet with Apple Wallet and Google Wallet ecosystems to ensure seamless delivery, updates, and notifications of digital cards on users’ mobile devices.',
          ],
          title: '2. Apple Wallet & Google Wallet Integration:',
        },
        {
          paragraphs: [
            'Developed tailored APIs for specific client systems, facilitating smooth integration of Eldo Wallet functionalities into existing client infrastructures and enabling automated, real-time wallet campaign management.',
          ],
          title: '3. Custom API Development:',
        },
        {
          paragraphs: [
            'Provided continuous technical and strategic support to onboard new clients, troubleshoot issues, optimize campaigns, and expand Eldo Wallet’s user and merchant base.',
          ],
          title: '4. Ongoing Client Support & Growth Assistance:',
        },
      ],
      label: 'Services',
      title: 'Services Provided',
    },
    {
      id: 'challenges',
      items: [
        {
          paragraphs: [
            'Instantly issued and stored on customers’ phones, reducing friction and increasing adoption.',
          ],
          title: 'Customer engagement fatigue',
        },
        {
          paragraphs: [
            ' High marketing costs: SMS and paper campaigns remain expensive, with limited personalization and low conversion rates.',
          ],
          title: 'High marketing costs',
        },
        {
          paragraphs: [
            'Customers often juggle multiple apps and physical cards, creating friction instead of loyalty.',
          ],
          title: 'Fragmented experiences',
          textReveal: false,
          titleReveal: false,
        },
        {
          paragraphs: [
            'Without seamless digital tools, brands face churn and limited visibility into customer behavior.',
          ],
          title: 'Low retention',
          textReveal: false,
          titleReveal: false,
        },
        {
          paragraphs: [
            'Many businesses lack resources to build and maintain their own mobile apps for loyalty and engagement.',
          ],
          title: 'Technical barriers:',
          textReveal: false,
          titleReveal: false,
        },
      ],
      label: 'Challanges',
      title: 'Breaking Through Loyalty Barriers',
    },
    {
      id: 'solutions',
      intro: [
        'EldoWallet eliminates these barriers with a mobile-first, app-free loyalty solution built directly into Apple Wallet and Google Wallet:',
      ],
      items: [
        {
          image: image('MsMRkJVqZnhGilnyqGRFuDJ3YM.webp', 'EldoWallet membership cards'),
          paragraphs: [
            'Instantly issued and stored on customers’ phones, reducing friction and increasing adoption.',
          ],
          title: 'Digital Loyalty & Membership Cards',
        },
        {
          image: image('wUFGHxhZ7mHEPcAUcHRoZdQU.webp', 'EldoWallet notifications'),
          paragraphs: [
            'Engage users daily with real-time offers, reminders, and targeted campaigns.',
          ],
          title: 'Push Notifications & Personalization',
        },
        {
          image: image('Uthsprd7x8Ae9ir14uHdJsbqy8.webp', 'EldoWallet data and insights'),
          paragraphs: [
            'CRM integration and campaign dashboards provide actionable insights into customer behavior and retention.',
          ],
          title: 'Data & Insights',
        },
      ],
      label: 'Solutions',
      title: 'The Solution: Redefining Digital Loyalty',
    },
    {
      id: 'results',
      itemTitleReveal: false,
      textReveal: false,
      intro: [
        'EldoWallet’s reported outcomes turn mobile wallets into a measurable growth channel, linking customer engagement to activation, acquisition efficiency, daily throughput, and year-end ROI in a way that informs executive decisions.\n  The KPIs below provide a concise view of performance across the funnel and operational efficiency:',
      ],
      items: [
        {
          paragraphs: [
            '65% average active usage rate, indicating good user retention and interaction',
          ],
          title: 'Transaction Volume:',
        },
        {
          paragraphs: ['70% of distributed wallet campaigns activated within 1 month'],
          title: 'Campaign Activation Rate:',
        },
        {
          paragraphs: ['Approx. $15 per new client, reflecting cost-efficient marketing'],
          title: 'Customer Acquisition Cost:',
        },
        {
          paragraphs: ['150+ digital wallet transactions per day on average'],
          title: 'Transaction Volume:',
        },
        {
          paragraphs: ['3x or higher by year-end, showing strong campaign effectiveness'],
          title: 'Return on Marketing Investment (ROMI):',
        },
        {
          paragraphs: [
            "Over the past two years, EldoWallet has expanded into new sectors. Initially focused primarily on customer loyalty programs offering digital loyalty cards, offers, and coupons, it has successfully extended its reach into transit, hospitality, clubs and associations, ticketing, and more. This expansion has contributed to a tripling of its revenue, demonstrating the platform's growing impact across multiple industries.",
          ],
          textReveal: true,
        },
      ],
      label: 'Results',
      title: 'The Results: KPIs That Drive Real Business Value',
    },
    {
      id: 'conclusion',
      intro: [
        'EldoWallet shows that an app-free, wallet‑native approach can simplify customer engagement, cut costs, and scale quickly across retail, hospitality, events, among others. By meeting customers in Apple Wallet and Google Wallet, brands reduce friction from sign‑up to repeat use while gaining actionable data to optimize campaigns. Reported results include a 72% opt‑in rate, 65% active usage, and 70% campaign activation within 30 days, alongside 35% lower costs than SMS, 150+ daily interactions, and 3x year‑end ROI. For leaders focused on profitable growth, EldoWallet offers a secure, scalable path to higher engagement and lower acquisition costs without building a mobile app.',
      ],
      label: 'Conclusion',
    },
  ],
  seoDescription:
    'How Astrolab helped EldoWallet transform mobile marketing through digital loyalty cards in Apple Wallet and Google Wallet.',
  seoTitle: 'EldoWallet Use Case | Astrolab Digital Wallet & Mobile Marketing',
  slug: 'eldowallet-use-case',
  title: 'EldoWallet: Revolutionizing Mobile Marketing Through Digital Wallets',
}
