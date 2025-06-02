'use client';

import React from 'react'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { TardisSound } from '@/components/TardisSound'
import './globals.css'
import { DoctorWhoProvider } from '@/contexts/DoctorWhoContext'
import { TardisLogo } from '@/components/TardisLogo'
import { TimeVortex } from '@/components/TimeVortex'
import { RegenerationTransition } from '@/components/RegenerationTransition'
import { useDoctorWho } from '@/contexts/DoctorWhoContext'

const inter = Inter({ subsets: ['latin'] })

function EffectsWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading, isRegenerating, showTardis } = useDoctorWho();

  return (
    <>
      {children}
      <TardisLogo isVisible={showTardis} />
      <TimeVortex isLoading={isLoading} />
      <RegenerationTransition
        isRegenerating={isRegenerating}
        onComplete={() => {}}
      />
      <TardisSound />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        <title>DW GDINDEX</title>
        <meta name="description" content="Um índice de arquivos do Google Drive" />
      </head>
      <body className={`${inter.className} h-full bg-gray-50 dark:bg-gray-900`}>
        <DoctorWhoProvider>
          <EffectsWrapper>
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
          </EffectsWrapper>
        </DoctorWhoProvider>
      </body>
    </html>
  )
} 