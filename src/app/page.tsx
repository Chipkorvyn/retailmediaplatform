/**
 * File: src/app/page.tsx
 * Main page component for the application
 */

import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/dashboard')
}
