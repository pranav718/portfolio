'use client';

import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  tags?: string[];
  bannerGradient?: string;
  githubUrl?: string;
  liveUrl?: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  tags = [],
  bannerGradient = 'linear-gradient(135deg, #fdfbf7, #e8e0cc)',
  githubUrl,
  liveUrl,
  index = 0
}: ProjectCardProps) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="project-banner" style={{ background: bannerGradient }}>
        <div className="banner-pattern" />
      </div>

      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>

        {tags.length > 0 && (
          <div className="project-tags">
            {tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="project-links">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              github
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link primary"
            >
              live demo
            </a>
          )}
        </div>
      </div>

      <style jsx>{`
        .project-card {
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(44, 36, 22, 0.15);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
        }

        .project-card:hover {
          background: rgba(255, 255, 255, 0.8);
          box-shadow: var(--shadow-soft);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .project-banner {
          height: 140px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(44, 36, 22, 0.08);
        }

        .banner-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.1;
          background-image: radial-gradient(var(--color-ink) 1px, transparent 1px);
          background-size: 10px 10px;
        }

        .project-content {
          padding: 1.25rem;
        }

        .project-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: var(--color-text);
        }

        .project-description {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--color-text-dim);
          line-height: 1.6;
          margin: 0 0 1rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .tag {
          font-size: 0.7rem;
          padding: 2px 8px;
          background: rgba(44, 36, 22, 0.05);
          border-radius: 4px;
          color: var(--color-text-dim);
          font-family: 'JetBrains Mono', monospace;
        }

        .project-links {
          display: flex;
          gap: 0.75rem;
        }

        .project-link {
          font-size: 0.75rem;
          padding: 6px 12px;
          border-radius: 4px;
          text-decoration: none !important;
          transition: all 0.2s ease;
          font-family: 'JetBrains Mono', monospace;
          background: transparent;
          color: var(--color-text);
          border: 1px solid rgba(44, 36, 22, 0.2);
        }

        .project-link:hover {
          background: rgba(44, 36, 22, 0.05);
          border-color: var(--color-text);
        }

        .project-link.primary {
          background: var(--color-ink);
          color: var(--color-bg-dark);
          border-color: var(--color-text);
        }

        .project-link.primary:hover {
          background: var(--color-ink-light);
          box-shadow: 0 2px 8px rgba(44, 36, 22, 0.15);
        }
      `}</style>
    </motion.div>
  );
}
