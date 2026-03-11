import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'SPIE@NITG - Society of Photo-Optical Instrumentation Engineers',
  description: 'SPIE Student Chapter at National Institute of Technology Goa - A dynamic student organization passionate about optics, photonics, and making a difference.',
  keywords: ['SPIE', 'NIT Goa', 'photonics', 'optics', 'student chapter', 'engineering'],
}

export const viewport: Viewport = {
  themeColor: '#0f0f0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
