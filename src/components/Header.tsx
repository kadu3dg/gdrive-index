'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ThemeSelector } from './ThemeSelector';
import { AnimatedLogo } from './AnimatedLogo';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleHomeClick = () => {
    if (pathname !== '/') {
      router.push('/');
    } else {
      router.refresh();
    }
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleHomeClick}
            className="hover:opacity-80 transition-opacity cursor-pointer"
          >
            <AnimatedLogo />
          </button>
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
} 