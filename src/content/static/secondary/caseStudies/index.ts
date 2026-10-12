import { eldowallet } from './eldowallet.ts'
import { mazad } from './mazad.ts'
import { rawi } from './rawi.ts'
import { talinty } from './talinty.ts'

export { eldowallet, mazad, rawi, talinty }
export const caseStudies = [eldowallet, talinty, rawi, mazad] as const
