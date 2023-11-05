import type { Metadata } from 'next'
import './globals.css'
import StyledComponentsRegistry from '../lib/style/registry'

export const metadata: Metadata = {
  title: 'Menabi Design Test',
  description: 'Menabi Design Test',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
