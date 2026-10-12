import type { LegalDocumentContent } from '@/content/contracts/secondary'

export const privacyPolicy: LegalDocumentContent = {
  date: '8/12/2025',
  intro: [
    { type: 'paragraph', text: 'Last Updated:', emphasis: ['Last Updated:'] },
    {
      type: 'paragraph',
      text: 'Astrolab ("we," "us," or "our") operates astrolab.co and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.',
      links: [{ text: 'astrolab.co', href: '/' }],
    },
    {
      type: 'paragraph',
      text: 'We operate in Tunisia, France, Qatar, and the USA and comply with applicable data protection laws.',
    },
    { type: 'spacer' },
  ],
  sections: [
    {
      blocks: [
        { type: 'paragraph', text: 'Company Name: Astrolab', emphasis: ['Company Name:'] },
        {
          type: 'paragraph',
          text: 'Registered Office: D3, Dar el Hamed building, 4th floor, Taher Sfar Street, 4000 Sousse, Tunisie',
          emphasis: ['Registered Office:'],
        },
        {
          type: 'paragraph',
          text: 'Additional Offices: France, Qatar, USA',
          emphasis: ['Additional Offices:'],
        },
        {
          type: 'paragraph',
          text: 'Email: contact@astrolab.co',
          emphasis: ['Email:'],
          links: [{ text: 'contact@astrolab.co', href: 'mailto:contact@astrolab.co' }],
        },
        { type: 'spacer' },
      ],
      title: 'Data Controller Information',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'Information You Provide Directly:',
          emphasis: ['Information You Provide Directly:'],
        },
        {
          type: 'paragraph',
          text: 'We collect only limited personal data through our contact form or direct communications. This may include:',
          emphasis: ['contact form'],
        },
        {
          type: 'list',
          items: [
            'Name',
            'Email address',
            'Company name',
            'Phone number (optional)',
            'Message content',
          ],
        },
        {
          type: 'paragraph',
          text: 'We may also collect anonymous usage data via cookies or analytics (see section 6).',
        },
        { type: 'spacer' },
        {
          type: 'paragraph',
          text: 'Information Collected Automatically:',
          emphasis: ['Information Collected Automatically:'],
        },
        {
          type: 'list',
          items: [
            'Device information (IP address, browser type, operating system, device identifiers)',
            'Usage data (pages visited, time spent, links clicked, referral URLs)',
            'Location data (general geographic location based on IP address)',
            'Cookies and tracking technologies (see Cookie Policy section below)',
          ],
        },
      ],
      title: 'Personal Data We Collect',
    },
    {
      blocks: [
        { type: 'paragraph', text: 'We use your personal data for the following purposes:' },
        {
          type: 'list',
          items: [
            'Service Delivery: To provide, maintain, and improve our website, our services, and user experience.',
            'Communications: To respond to inquiries, provide customer support, and send service-related notifications',
            'Marketing: To send promotional materials (with your consent where required)',
            'Analytics: To analyze usage patterns and improve our website and services',
            'Security: To detect, prevent, and address fraud, security issues, and technical problems',
            'Legal Compliance: To comply with applicable laws, regulations, and legal processes',
          ],
          emphasis: [
            'Service Delivery:',
            'Communications:',
            'Marketing:',
            'Analytics:',
            'Security:',
            'Legal Compliance:',
          ],
        },
        {
          type: 'paragraph',
          text: 'We do not sell, rent, or share your personal data for commercial purposes.',
          emphasis: ['not'],
        },
      ],
      title: 'How We Use Your Personal Data',
    },
    {
      blocks: [
        { type: 'paragraph', text: 'We process your personal data based on:' },
        {
          type: 'list',
          items: [
            'Your consent (when you submit the contact form); and/or',
            'Our legitimate interest in responding to inquiries and managing business communications.',
          ],
          emphasis: ['consent', 'legitimate interest'],
        },
      ],
      title: 'Legal Basis for Processing',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'We use cookies and similar tracking technologies to enhance your experience on our website. Our Website may also use cookies and analytics tools (such as Google Analytics) to understand how visitors interact with the site. These tools collect non-identifiable data such as:',
        },
        {
          type: 'list',
          items: ['Browser type', 'Country or region', 'Pages visited', 'Duration of visit'],
        },
        {
          type: 'paragraph',
          text: 'Types of Cookies We Use:',
          emphasis: ['Types of Cookies We Use:'],
        },
        {
          type: 'list',
          items: [
            'Strictly Necessary Cookies: Essential for website functionality (no consent required)',
            'Performance Cookies: Analyze website usage and performance (consent required)',
            'Functionality Cookies: Remember your preferences and settings (consent required)',
            'Targeting/Advertising Cookies: Deliver relevant advertisements (consent required)',
          ],
          emphasis: [
            'Strictly Necessary Cookies:',
            'Performance Cookies:',
            'Functionality Cookies:',
            'Targeting/Advertising Cookies:',
          ],
        },
      ],
      title: 'Cookies and Tracking Technologies',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'We retain personal data only as long as necessary to respond to your inquiry or meet legal obligations, typically no longer than 3 years. After the retention period expires, we securely delete or anonymize your personal data.',
        },
      ],
      title: 'Data Retention',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'We implement technical and organizational measures to protect your personal data against unauthorized access, alteration, or disclosure. These include encrypted communications, restricted access, and secure hosting infrastructure.',
        },
      ],
      title: 'Data Security',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.',
        },
      ],
      title: 'Third-Party Links',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. Any changes will be posted on this page with a new effective date. Please review it periodically.',
        },
      ],
      title: 'Updates to This Privacy Policy',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'For questions, concerns, or requests regarding this Privacy Policy or our data practices:',
        },
        { type: 'paragraph', text: '📍 Tunisia | France | Qatar | USA' },
        {
          type: 'paragraph',
          text: ' ✉️ contact@astrolab.co',
          links: [{ text: 'contact@astrolab.co', href: 'mailto:privacy@astrolab.co' }],
        },
        {
          type: 'paragraph',
          text: ' 🌐 Astrolab - Empower Your Technology Direction',
          links: [{ text: 'Astrolab - Empower Your Technology Direction', href: '/' }],
        },
      ],
      title: 'Contact Us',
    },
  ],
  seoDescription:
    'Astrolab privacy policy and information about how personal data is collected, used, and protected.',
  seoTitle: 'Privacy Policy | Astrolab',
  slug: 'privacy-policy',
  title: 'Privacy policy',
}
