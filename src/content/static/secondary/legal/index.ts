import { privacyPolicy } from './privacyPolicy.ts'
import { termsConditions } from './termsConditions.ts'

export { privacyPolicy, termsConditions }
export const legalDocuments = [privacyPolicy, termsConditions] as const
