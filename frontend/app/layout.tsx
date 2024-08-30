import type { Metadata } from 'next'
import './globals.css'
import { Footer, Navbar } from '@/components'
import { bold, regular,semiBold, medium } from '@/utils/fonts/fonts'

export const metadata: Metadata = {
  title: 'CodePieces',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${regular.variable} ${bold.variable} ${semiBold.variable} ${medium.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Navbar />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}