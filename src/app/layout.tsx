import './globals.css'
import React, { Suspense } from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getSession } from "next-auth/react";
import SessionProvider from './component/SessionProvider' // ใช้ default import
import Menu from './Menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'New Project',
  description: 'developer',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Suspense fallback={<div>กำลังโหลด...</div>}>
            {children}
          </Suspense>
        </SessionProvider>
      </body>
    </html>
  )
}
