'use client';

import { motion } from 'framer-motion';
import { FolderCard } from './FolderCard';

interface FolderGridProps {
  folders: Array<{
    name: string;
    path: string;
  }>;
}

export function FolderGrid({ folders }: FolderGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {folders.map((folder, index) => (
        <motion.div key={folder.path} variants={item}>
          <FolderCard name={folder.name} path={folder.path} />
        </motion.div>
      ))}
    </motion.div>
  );
} 