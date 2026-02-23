import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { ComplaintsProvider } from '@/context/ComplaintsContext'
import { UserProvider } from '@/context/UserContext'
import { ThemeProvider } from '@/context/ThemeContext'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Complaint Manager - Issue Reporting System',
  description: 'Report and manage complaints efficiently. Track your issues from submission to resolution.',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ThemeProvider>
          <UserProvider>
            <ComplaintsProvider>{children}</ComplaintsProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
