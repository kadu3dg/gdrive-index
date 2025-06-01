import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeSelector } from '@/components/ThemeSelector'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Google Drive Index',
  description: 'Um índice de arquivos do Google Drive',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50 dark:bg-gray-900`}>
        <div className="min-h-full">
          <nav className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between items-center">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Google Drive Index
                  </h1>
                </div>
                <ThemeSelector />
              </div>
            </div>
          </nav>
          <main className="py-10">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <footer className="bg-white dark:bg-gray-800 shadow-sm mt-auto">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Desenvolvido por{' '}
                  <a 
                    href="https://t.me/kadu3dg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    @kadu3dg
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <a 
                    href="https://t.me/kadu3dg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 3.767-1.362 5.017-.4 1.25-.759 2.051-.962 2.499-.203.448-.38.577-.558.577-.178 0-.38-.129-.759-.448-.38-.318-2.203-1.417-2.584-1.735-.38-.318-.759-.896.038-1.593.797-.697 1.755-1.593 2.332-2.171.577-.578.577-.897.038-1.275-.538-.378-1.932-1.275-2.332-1.593-.4-.318-.797-.378-1.076-.129-.28.25-1.076.897-1.076.897s-.797.697-1.076.897c-.28.2-.558.129-.797-.07-.238-.2-1.076-1.147-1.515-1.645-.438-.498-.438-.747-.038-.996.4-.25 1.076-.697 1.076-.697l2.332-1.645c.759-.498 1.515-.747 1.873-.747.358 0 .678.13.917.448.238.318 1.076 3.767 1.076 3.767s.178.697.4.996c.22.299.4.448.558.448.158 0 .38-.15.678-.448.297-.299 1.873-1.844 2.171-2.171.297-.328.517-.448.797-.448.28 0 .517.12.678.448.16.329.16.747-.04 1.147z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://instagram.com/kadu3dg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 