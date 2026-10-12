import type { Metadata } from 'next'
import { HomePage } from '@/components/sections/HomePage/HomePage'
import { getHomeContent } from '@/content/repositories/home'
export default function Page() { return <HomePage content={getHomeContent()} /> }
export const metadata: Metadata = { title: 'Astrolab - Empower Your Technology Direction', description: 'Your digital innovation partner for future-ready solutions for businesses through technology, design, and strategy.' }
