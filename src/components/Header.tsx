'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeaderProps {
  profileImage?: string;
}

export default function Header({ profileImage }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[200] px-8 py-4 backdrop-blur-md bg-black/20 border-b border-white/20 transition-all duration-300">
      <motion.div
        className="flex items-center justify-center max-w-[1200px] mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <nav className="flex items-center gap-10">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link href="/" className="font-death-note text-xl text-text no-underline relative group">
              P
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link href="#projects" className="font-mono text-sm text-text no-underline relative group">
              projects
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-bulb-glow transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link href="/blog" className="font-mono text-sm text-text no-underline relative group">
              blog
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-bulb-glow transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
          </motion.div>
        </nav>
      </motion.div>
    </header>
  );
}
