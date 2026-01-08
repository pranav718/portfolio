'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  profileImage?: string;
}

export default function Header({ profileImage }: HeaderProps) {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="header-content">
        <Link href="/" className="profile-link">
          <motion.div
            className="profile-pic-container"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Pranav Ray"
                width={40}
                height={40}
                className="profile-pic"
              />
            ) : (
              <div className="profile-pic-placeholder">
                <span>P</span>
              </div>
            )}
          </motion.div>
        </Link>

        <nav className="nav-links">
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link href="#projects" className="nav-link">
              projects
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link href="/blog" className="nav-link">
              blog
            </Link>
          </motion.div>
        </nav>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 1rem 2rem;
          background: linear-gradient(
            to bottom,
            var(--color-paper) 0%,
            rgba(250, 246, 233, 0.95) 70%,
            transparent 100%
          );
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
        }

        .profile-link {
          text-decoration: none;
        }

        .profile-pic-container {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid var(--color-ink);
          background: var(--color-paper-warm);
        }

        .profile-pic {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-pic-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Death Note', cursive;
          font-size: 1.2rem;
          color: var(--color-text);
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
        }

        .nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: var(--color-text);
          text-decoration: none !important;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--color-bulb-glow);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .header {
            padding: 0.75rem 1rem;
          }

          .nav-links {
            gap: 1.5rem;
          }

          .nav-link {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </motion.header>
  );
}
