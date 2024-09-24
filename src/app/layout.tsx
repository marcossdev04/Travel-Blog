'use client'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../../api/queryClient'

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body
          className={cn(
            'm-auto min-h-screen max-w-6xl bg-background font-sans antialiased',
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </QueryClientProvider>
  )
}
