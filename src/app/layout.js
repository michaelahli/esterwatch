import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ester Watch',
  description: 'Jam tangan mewah harga terjangkau.',
  icons: {
    icon: ['/favicon.ico'],
    apple: ['/apple-icon.png'],
    shortcut: ['/apple-icon.png'],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
