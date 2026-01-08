'use client';

import Header from '@/components/Header';
import LightBulb from '@/components/LightBulb';
import SpotlightOverlay from '@/components/SpotlightOverlay';
import { motion } from 'framer-motion';
import { useState } from 'react';

const mediumPosts = [
    {
        title: "Understanding React Server Components",
        preview: "A deep dive into how RSCs work and why they change the way we build Next.js applications.",
        date: "Dec 15, 2023",
        url: "#"
    },
    {
        title: "The Art of Clean Code",
        preview: "Best practices for writing maintainable and readable code in large scale TypeScript projects.",
        date: "Nov 28, 2023",
        url: "#"
    }
];

export default function BlogPage() {
    const [isLightOn, setIsLightOn] = useState(true);

    return (
        <>
            <Header />
            <LightBulb initialOn={true} onToggle={setIsLightOn} />
            <SpotlightOverlay isLightOn={isLightOn} />

            <main className="content-wrapper">
                <section className="section">
                    <motion.h1
                        className="page-title font-death-note"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        blog
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="blog-group"
                    >
                        <h2 className="group-title">on medium:</h2>
                        <div className="posts-list">
                            {mediumPosts.map((post, idx) => (
                                <motion.a
                                    key={idx}
                                    href={post.url}
                                    className="blog-card"
                                    whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.6)' }}
                                >
                                    <div className="post-date">{post.date}</div>
                                    <h3 className="post-title">{post.title}</h3>
                                    <p className="post-preview">{post.preview}</p>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="blog-group"
                    >
                        <h2 className="group-title">written here:</h2>
                        <div className="posts-list">
                            <div className="empty-state">
                                <span className="font-death-note">coming soon...</span>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>

            <style jsx>{`
        .content-wrapper {
          padding-top: 100px;
          min-height: 100vh;
        }

        .page-title {
          font-size: 3rem;
          margin-bottom: 2.5rem;
        }

        .blog-group {
          margin-bottom: 3rem;
        }

        .group-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          color: var(--color-ink);
          text-decoration: underline;
          text-decoration-color: var(--color-bulb-glow);
          text-underline-offset: 4px;
        }

        .posts-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 800px;
        }

        .blog-card {
          display: block;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(44, 36, 22, 0.15);
          border-radius: 8px;
          text-decoration: none !important;
          transition: all 0.2s ease;
        }

        .post-date {
          font-size: 0.75rem;
          color: var(--color-ink-light);
          margin-bottom: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
        }

        .post-title {
          font-size: 1.3rem;
          margin: 0 0 0.5rem 0;
          color: var(--color-ink);
        }

        .post-preview {
          font-size: 0.9rem;
          color: var(--color-ink-light);
          margin: 0;
          line-height: 1.6;
        }

        .empty-state {
          padding: 2rem;
          text-align: center;
          border: 1px dashed rgba(44, 36, 22, 0.2);
          border-radius: 8px;
          color: var(--color-ink-light);
        }
      `}</style>
        </>
    );
}
