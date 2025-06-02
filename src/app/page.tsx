'use client';

import { FolderGrid } from '@/components/FolderGrid';

export default function Home() {
  const folders = [
    { name: 'Doctor Who 1ª Temporada', path: '/season1' },
    { name: 'Doctor Who 2ª Temporada', path: '/season2' },
    { name: 'Doctor Who 3ª Temporada', path: '/season3' },
    { name: 'Doctor Who 4ª Temporada', path: '/season4' },
    { name: 'Doctor Who 5ª Temporada', path: '/season5' },
    { name: 'Doctor Who 6ª Temporada', path: '/season6' },
    { name: 'Doctor Who 7ª Temporada', path: '/season7' },
    { name: 'Doctor Who 8ª Temporada', path: '/season8' },
    { name: 'Doctor Who 9ª Temporada', path: '/season9' },
    { name: 'Doctor Who 10ª Temporada', path: '/season10' },
    { name: 'Doctor Who 11ª Temporada', path: '/season11' },
    { name: 'Doctor Who 12ª Temporada', path: '/season12' }
  ];

  return (
    <main className="min-h-screen">
      <FolderGrid folders={folders} />
    </main>
  );
} 