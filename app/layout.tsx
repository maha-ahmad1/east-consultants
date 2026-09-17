import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'استشاريون الشرق | مكتب هندسي معتمد في الرياض',
  description: 'استشاريون الشرق للهندسة المعمارية: التصميم الهندسي، إدارة المشاريع وإصدار رخص البناء في الرياض.',
  // generator: 'v0.app',
  // الأيقونات تأتي من app/icon.png و app/apple-icon.png عبر اصطلاح ملفات
  // Next.js — يولّد وسوم <link> تلقائياً مع بصمة تحديث للكاش.
  // أي حقل icons هنا يتجاوز ذلك الاصطلاح، فيُترك فارغاً عمداً.
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
