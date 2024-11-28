import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
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
  // ดึง session จาก getServerSession
  const session = await getServerSession()
  console.log('session', session)
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
