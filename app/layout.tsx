import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mental Health Support System',
  description: 'Digital Psychological Intervention System for College Students - Providing AI-guided support, confidential counselling, and mental wellness resources.',
  keywords: 'mental health, college students, psychological support, counselling, AI chat, mental wellness',
  authors: [{ name: 'Mental Health Support Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <div className="min-h-screen bg-gradient-mental">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
