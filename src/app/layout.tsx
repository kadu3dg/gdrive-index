import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { TardisSound } from '@/components/TardisSound'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LoadingVortex } from '@/components/LoadingVortex'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DW GDINDEX',
  description: 'Um índice de arquivos do Google Drive com tema do Doctor Who',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${inter.className} h-full`}>
        <ThemeProvider>
          <TardisSound />
          <div className="min-h-full flex flex-col">
            <Header />
            <main className="flex-grow py-10">
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
            <footer className="bg-white dark:bg-gray-800 shadow-sm mt-auto">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                  Desenvolvido por kadu © 2025
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 