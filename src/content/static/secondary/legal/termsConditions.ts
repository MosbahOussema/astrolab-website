import type { LegalDocumentContent } from '@/content/contracts/secondary'

export const termsConditions: LegalDocumentContent = {
  date: '08/12/2025',
  sections: [
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'These Terms and Conditions ("Terms") govern your access to and use of astrolab.co ("Website") and services provided by Astrolab ("Company," "we," "us," or "our"). By accessing or using our Website, you agree to be bound by these Terms. If you do not agree, please do not use the Website.',
          links: [{ text: 'astrolab.co', href: '/' }],
        },
      ],
      title: 'Introduction',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'Astrolab Co. is a technology consulting and digital solutions company that helps organizations design, build, and scale digital products through innovation, intelligent automation, and AI-driven strategies.',
        },
        {
          type: 'paragraph',
          text: ' This Website provides general information about our services and company. It does not include any login, user profile, or e-commerce functionality.',
        },
      ],
      title: 'About Astrolab',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'All content displayed on the Website, including but not limited to text, graphics, logos, icons, images, videos, and software, is the exclusive property of Astrolab Co. or its licensors and is protected under international copyright, trademark, and intellectual property laws.',
        },
        {
          type: 'paragraph',
          text: 'You may view or download content for personal, non-commercial use only. Any reproduction, modification, distribution, or commercial exploitation of the Website’s content is prohibited without prior written authorization from Astrolab Co.',
        },
      ],
      title: 'Intellectual Property',
    },
    {
      blocks: [
        { type: 'paragraph', text: 'When using the Website, you agree not to:' },
        {
          type: 'list',
          items: [
            'Use it for any illegal or fraudulent activity;',
            'Attempt to disrupt, damage, or gain unauthorized access to any part of it;',
            'Upload or transmit malicious code, viruses, or automated scripts;',
            'Copy, monitor, or extract any data using bots or scrapers without consent.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Violation of these Terms may result in restriction or termination of access.',
        },
      ],
      title: 'Website Use',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'Our Website may contain links to third-party websites or resources for your convenience.',
        },
        {
          type: 'paragraph',
          text: 'Astrolab Co. is not responsible for and does not endorse the content, policies, or practices of these external sites. Your use of third-party websites is at your own risk.',
        },
      ],
      title: 'Third-Party Links',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'The Website and all content are provided “as is” and “as available” without warranties of any kind.',
          emphasis: ['“as is”', '“as available”'],
        },
        {
          type: 'paragraph',
          text: ' We make no guarantees about the accuracy, reliability, or availability of the Website or that it will be free from errors or interruptions.',
        },
      ],
      title: 'Disclaimer of Warranties',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'To the fullest extent permitted by applicable law, Astrolab Co. shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the Website.',
        },
        {
          type: 'paragraph',
          text: ' Our total liability for any direct damages shall not exceed the amount (if any) you have paid us directly for the specific purpose of using the Website.',
        },
      ],
      title: 'Limitation of Liability',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'You agree to indemnify and hold harmless Astrolab Co., its directors, employees, and affiliates from any claims, liabilities, or expenses arising from your misuse of the Website or violation of these Terms & Conditions.',
        },
      ],
      title: 'Indemnification',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'We may update these Terms & Conditions at any time. The latest version will be posted on this page with an updated “Effective date.” Your continued use of the Website constitutes your acceptance of the revised Terms.',
        },
      ],
      title: 'Changes to Terms',
    },
    {
      blocks: [
        {
          type: 'paragraph',
          text: 'These Terms are governed by the laws of the Republic of Tunisia, without regard to conflict of law principles.',
        },
        {
          type: 'paragraph',
          text: ' Any disputes arising from or relating to these Terms shall be submitted to the competent courts of Tunis, Tunisia.',
        },
        {
          type: 'paragraph',
          text: ' If required by local law, users based in France, Qatar, or the USA may refer disputes to their respective local jurisdictions.',
        },
      ],
      title: 'Governing Law & Jurisdiction',
    },
    {
      blocks: [
        { type: 'paragraph', text: 'For any questions about these Terms, please contact us at:' },
        { type: 'paragraph', text: 'Astrolab Co.', emphasis: ['Astrolab Co.'] },
        { type: 'paragraph', text: ' 📍 Tunisia | France | Qatar | USA' },
        {
          type: 'paragraph',
          text: ' ✉️ contact@astrolab.co',
          links: [{ text: 'contact@astrolab.co', href: 'mailto:hello@astrolab.co' }],
        },
        {
          type: 'paragraph',
          text: ' 🌐Astrolab - Empower Your Technology Direction',
          links: [{ text: 'Astrolab - Empower Your Technology Direction', href: '/' }],
        },
      ],
      title: 'Contact Us',
    },
  ],
  seoDescription: 'Terms and conditions governing access to and use of the Astrolab website.',
  seoTitle: 'Terms & Conditions | Astrolab',
  slug: 'terms-conditions',
  title: 'Terms & conditions',
}
