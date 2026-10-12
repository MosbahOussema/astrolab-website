export type NotFoundPageContent = {
  description: string
  homeLabel: string
  homeHref: '/'
  title: string
}

export const notFoundPageContent = {
  description: 'The page you are looking for does not exist or may have been moved.',
  homeLabel: 'Back to Home',
  homeHref: '/',
  title: 'Page Not Found',
} as const satisfies NotFoundPageContent
