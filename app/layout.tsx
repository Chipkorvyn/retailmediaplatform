/**
 * File: src/app/layout.tsx
 * Root layout component that wraps all pages
 */

import './globals.css'
import { Inter } from 'next/font/google'
import QueryProvider from '@/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Retail Media Platform',
  description: 'A comprehensive retail media analytics platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
