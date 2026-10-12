import type { CaseStudyContent } from '@/content/contracts/secondary'
import { image, relatedCases } from '../shared.ts'

export const mazad: CaseStudyContent = {
  facts: [
    {
      label: 'Market',
      lines: ['Government services, e-auction, customs, public sector'],
    },
    {
      label: 'Platform',
      lines: ['Mobile application (iOS and Android), web-based platform'],
    },
  ],
  heroImage: image('fSIIHnPNPYZlBL8XgMSxhUXxlcY.webp', 'Mazad Al Jomrok cover', 2544, 1908),
  overview: [
    "The platform aims to enhance transparency and public access to customs auctions. Users need to create an account and register to participate in the bidding process, with eligibility criteria including being at least 18 years old and having a valid driver's license. The app is officially regulated by Qatar Customs and provides a secure way to purchase high-value goods through bidding",
  ],
  related: [relatedCases.talinty, { ...relatedCases.eldo, title: 'Eldowallet' }, relatedCases.rawi],
  sections: [
    {
      id: 'services',
      items: [
        {
          paragraphs: [
            'In close collaboration with the TASMU Smart Qatar program and Qatar’s Ministry of Communications and Information Technology, Astrolab led the transformation of traditional, manual customs auction workflows into an efficient, fully digitized process, automating everything from product evaluation and auction listing creation to bidding, payment processing, and refunds.',
          ],
          title: 'Digital Transformation of Customs Auction Process:',
        },
        {
          paragraphs: [
            'Astrolab implemented secure integrations with critical national infrastructure, including Qatar Customs warehouse management systems, the Al Nadeeb Clearance System for customs clearance, and Qatar’s National Authentication System (NAS) for identity verification, as well as national payment gateways, to deliver a connected and streamlined auction ecosystem.',
          ],
          title: 'Integration with National Systems:',
        },
        {
          paragraphs: [
            'Astrolab designed, developed, and deployed the Mazad Al Jomrok mobile applications for both iOS and Android platforms, as well as the responsive web portal, ensuring a seamless and user-friendly digital auction experience accessible to all users.',
          ],
          title: 'Full-stack Mobile and Web Application Development:',
        },
        {
          paragraphs: [
            'Astrolab continues to provide maintenance, feature enhancements, and technical support to ensure the platform evolves with user needs and adheres to Qatar’s Digital Agenda 2030 standards and TASMU’s smart government objectives.',
          ],
          title: 'Ongoing Support and Enhancement:',
        },
      ],
      label: 'Services',
      title: 'Services Provided',
    },
    {
      id: 'challenges',
      intro: [
        'challenge of modernizing its customs auction process, traditionally constrained by manual procedures that limited public access and transparency. Prior to Mazad Al Jomrok, citizens and businesses had no easy way to participate in auctions for unclaimed goods, inhibiting marketplace efficiency and economic opportunity.',
      ],
      items: [
        { paragraphs: ['Manual auction processes limiting accessibility and transparency'] },
        {
          paragraphs: [
            'Disconnected customs warehouse, clearance, and payment systems causing operational inefficiencies',
          ],
        },
        {
          paragraphs: [
            'Need for a secure, unified platform supporting real-time bidding and integrated national identity verification',
          ],
        },
        {
          paragraphs: [
            'Requirement to align with Qatar’s Smart Nation vision and TASMU’s digital transformation goals',
          ],
        },
      ],
      label: 'Challanges',
      title: 'Challenges: Digitizing Customs Auctions in a National Smart City Context',
      bulletItems: true,
    },
    {
      id: 'solutions',
      introBlocks: [
        { type: 'heading', text: 'National ecosystem for bidders' },
        {
          type: 'paragraph',
          text: 'Mazad Al Jomrok is a digital auction platform developed jointly by the Ministry of Communications and Information Technology and the General Authority of Customs, as part of the TASMU Smart Qatar program. The platform provides exclusive access for users to participate in online auctions of unclaimed customs goods.',
          breakableWords: ['Communications'],
        },
        {
          type: 'paragraph',
          text: 'This initiative leverages TASMU’s digital infrastructure to modernize and streamline the auction of these goods, enhancing transparency and accessibility for both individuals and businesses. The app supports Qatar’s broader vision for smart government services and efficient management of national assets, ensuring secure, user-friendly participation in the process while driving innovation in public sector operations.',
          breakableWords: ['infrastructure', 'accessibility', 'user-friendly', 'participation'],
        },
        {
          type: 'paragraph',
          text: 'Mazad Al Jomrok is a national initiative under the TASMU Smart Qatar program that aims to create a fully connected digital ecosystem for customs auctions. This platform integrates key national systems including:',
        },
        {
          type: 'list',
          items: [
            'Qatar Customs warehouse management systems',
            'Al Nadeeb Clearance System for customs clearance',
            'National digital identity and payment systems',
          ],
          ordered: true,
        },
        {
          type: 'paragraph',
          text: 'By connecting these critical systems, Mazad Al Jomrok provides a unified and seamless ecosystem for bidders, enhancing efficiency, transparency, and user experience. This integration nsures smooth data flow, secure identity verification, and convenient payment processing within a single platform, exemplifying Qatar’s commitment to digital transformation and smart government service delivery through TASMU’s cutting-edge infrastructure.',
          breakableWords: ['transparency,', 'verification,', 'transformation', 'infrastructure.'],
        },
      ],
      items: [
        {
          paragraphs: [
            'The platform is accessible both through a responsive web portal and dedicated mobile applications available on Google Play and the Apple App Store. It provides a bilingual interface (Arabic and English) designed for easy navigation, enabling individuals and businesses to browse auction listings, explore item details with images and descriptions, and manage bids through an intuitive and seamless user experience.',
          ],
          title: 'User-Friendly Interface:',
          titleStrong: true,
        },
        {
          image: image('5UaeIl18ZlwOCniXR17VJkYuo.webp', 'Mazad Al Jomrok real-time bidding'),
          paragraphs: [
            'Users are empowered to view past, live, and upcoming auctions with comprehensive information. After placing a required participation deposit, bidders can join live auctions and place bids instantly in real time, fostering a competitive and transparent auction environment. The platform supports instant updates on bid status to keep users informed and engaged.',
          ],
          title: 'Real-Time Bidding:',
          titleStrong: true,
        },
        {
          paragraphs: [
            'The auction system ensures secure and convenient payment processing, integrating with national payment systems. Users can confidently make deposits and payments with automatic refunds for non-winning bids, ensuring transparency and protection of funds throughout the transaction lifecycle.',
          ],
          title: 'Secure Transactions:',
          titleStrong: true,
        },
        {
          paragraphs: [
            'Participants receive real-time alerts on their auction activities via email and SMS. This includes notifications about auction start times, new bids, winning bids, refunds, and other status updates. These prompt communications ensure users remain informed and can act quickly during time-sensitive auctions.',
          ],
          title: 'Notifications:',
          titleStrong: true,
        },
      ],
      label: 'Solutions',
      title: 'The Solution: The Mazad Al Jomrok Solution: A Connected Digital Auction Ecosystem',
    },
    {
      id: 'results',
      items: [
        {
          paragraphs: [
            'Successfully auctioned over 100 lots across multiple categories including vehicles, electronics, and jewelry in digital formats.',
            'Broadened public participation and empowered diverse segments of society to access government auctions.',
            'Positioned Qatar Customs as a pioneer in smart government auctions in the GCC region.',
            'Improved trust and engagement with digital government services.',
          ],
        },
      ],
      label: 'Results',
      title: 'Results and Impact: Empowering a Smart Nation through Digital Government Innovation',
      bulletItems: true,
    },
  ],
  seoDescription:
    'Astrolab digitized Qatar Customs auctions through a secure mobile and web platform integrated with national systems.',
  seoTitle: 'Mazad Al Jomrok Use Case | Astrolab Digital Customs Auctions',
  slug: 'mazad-al-jomrok-use-case',
  title: 'Mazad Al Jomrok: Digitizing Customs Auctions for a Smart Qatar',
}
