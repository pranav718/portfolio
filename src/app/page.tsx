'use client';

import GitHubContributions from '@/components/GitHubContributions';
import Header from '@/components/Header';
import LightBulb from '@/components/LightBulb';
import ProjectCard from '@/components/ProjectCard';
import SocialLinks from '@/components/SocialLinks';
import SpotlightOverlay from '@/components/SpotlightOverlay';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [isLightOn, setIsLightOn] = useState(true);

  return (
    <>
      <Header />

      <LightBulb
        initialOn={true}
        onToggle={(on) => setIsLightOn(on)}
      />

      <SpotlightOverlay isLightOn={isLightOn} />

      <main className="content-wrapper">
        <section className="hero-section">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="hero-intro">
              <motion.div
                className="hero-pfp"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="pfp-placeholder">
                  <span className="font-death-note">P</span>
                </div>
              </motion.div>

              <div className="hero-text">
                <h1 className="hero-title">
                  i&apos;m pranav
                </h1>
                <p className="hero-subtitle">
                  a <span className="highlight">19 y/o fullstack developer</span>
                  <br />
                  currently pursuing cs <span className="highlight">@muj</span>
                </p>
              </div>
            </div>

            <motion.div
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p>
                i have experience working with{' '}
                <span className="tech-stack">[react, next.js, node, python, typescript]</span>
                <br />
                stacks and have made some good projects with them
              </p>
              <p>
                i also solve algorithms and play chess in free time.
              </p>
            </motion.div>

            <SocialLinks />
          </motion.div>
        </section>

        <section id="projects" className="section projects-section">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            projects
          </motion.h2>

          <div className="projects-grid">
            {[
              {
                title: "Portfolio v2",
                description: "My personal portfolio website featuring a unique notebook aesthetic, interactive 3D elements, and smooth animations.",
                tags: ["Next.js", "Three.js", "Framer Motion"],
                githubUrl: "https://github.com/pranavray/portfolio",
                gradient: "linear-gradient(135deg, #fff8e1, #ffe0b2)"
              },
              {
                title: "AlgoVisualizer",
                description: "An interactive visualization tool for common sorting and pathfinding algorithms helping students understand complex logic.",
                tags: ["React", "TypeScript", "Algorithms"],
                githubUrl: "https://github.com/pranavray/algo-visualizer",
                liveUrl: "https://algo-viz.demo",
                gradient: "linear-gradient(135deg, #e3f2fd, #bbdefb)"
              },
              {
                title: "Chess Engine",
                description: "A chess engine written in Python capable of playing at a 1500 ELO level with minimax algorithm and alpha-beta pruning.",
                tags: ["Python", "AI", "Chess"],
                githubUrl: "https://github.com/pranavray/chess-engine",
                gradient: "linear-gradient(135deg, #f3e5f5, #e1bee7)"
              }
            ].map((project, idx) => (
              <ProjectCard
                key={idx}
                index={idx}
                title={project.title}
                description={project.description}
                tags={project.tags}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                bannerGradient={project.gradient}
              />
            ))}
          </div>

          <motion.a
            href="/projects"
            className="show-all-link"
            whileHover={{ x: 5 }}
          >
            show all →
          </motion.a>
        </section>

        <section className="section github-section">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            GitHub contributions
          </motion.h2>

          <GitHubContributions />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <h3 className="orgs-title">orgs i&apos;ve contributed to:</h3>
            <div className="orgs-logos">
              <div className="org-logo-placeholder">
                <span>org logo</span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <style jsx>{`
        .content-wrapper {
          max-width: 900px;
          margin: 0 auto;
          padding: 100px 2rem 2rem;
        }

        /* Hero Section */
        .hero-section {
          min-height: calc(100vh - 100px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-content {
          width: 100%;
          text-align: left;
        }

        .hero-intro {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .hero-pfp {
          flex-shrink: 0;
        }

        .pfp-placeholder {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          border: 2px solid var(--color-text);
          background: var(--color-bg-card);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          color: var(--color-text);
        }

        .hero-title {
          margin: 0 0 0.5rem 0;
          font-size: clamp(2rem, 4vw, 3rem);
        }

        .hero-subtitle {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--color-text-dim);
          margin: 0;
        }

        .highlight {
          color: var(--color-text);
          font-weight: 600;
        }

        .hero-description {
          font-size: 0.9rem;
          line-height: 1.8;
          color: var(--color-text-dim);
        }

        .hero-description p {
          margin: 0 0 0.75rem 0;
        }

        .tech-stack {
          color: var(--color-bulb-warm);
          font-weight: 500;
        }

        /* Sections */
        .section {
          padding: 4rem 0;
        }

        .section-title {
          font-size: 1.8rem;
          margin: 0 0 2rem 0;
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 60%;
          height: 3px;
          background: var(--color-bulb-glow);
        }

        /* Projects */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .project-card {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(44, 36, 22, 0.15);
          border-radius: 12px;
          overflow: hidden;
          transition: box-shadow 0.2s ease;
        }

        .project-card:hover {
          box-shadow: var(--shadow-soft);
        }

        .project-banner {
          height: 140px;
          background: linear-gradient(135deg, var(--color-paper-warm), #e8e0cc);
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(44, 36, 22, 0.1);
        }

        .placeholder-text {
          color: var(--color-ink-light);
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .project-info {
          padding: 1.25rem;
        }

        .project-info h3 {
          font-size: 1.2rem;
          margin: 0 0 0.5rem 0;
        }

        .project-info p {
          font-size: 0.85rem;
          color: var(--color-ink-light);
          margin: 0 0 1rem 0;
          line-height: 1.5;
        }

        .project-links {
          display: flex;
          gap: 1rem;
        }

        .project-link {
          font-size: 0.8rem;
          color: var(--color-ink);
          text-decoration: none !important;
          padding: 0.35rem 0.75rem;
          border: 1px solid var(--color-ink);
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .project-link:hover {
          background: var(--color-ink);
          color: var(--color-paper);
        }

        .show-all-link {
          display: inline-block;
          font-size: 0.85rem;
          color: var(--color-ink);
          text-decoration: none !important;
          border: 1px solid var(--color-ink);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .show-all-link:hover {
          background: var(--color-ink);
          color: var(--color-paper);
        }

        /* GitHub Section */
        .github-graph-placeholder {
          background: rgba(255, 255, 255, 0.5);
          border: 1px dashed rgba(44, 36, 22, 0.3);
          border-radius: 8px;
          padding: 3rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        .placeholder-hint {
          font-size: 0.75rem;
          color: var(--color-ink-light);
          opacity: 0.7;
          margin-top: 0.5rem;
        }

        .orgs-title {
          font-size: 1.1rem;
          margin: 0 0 1rem 0;
          font-family: 'JetBrains Mono', monospace;
          font-weight: normal;
        }

        .orgs-logos {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .org-logo-placeholder {
          width: 60px;
          height: 60px;
          border: 1px dashed rgba(44, 36, 22, 0.3);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          color: var(--color-ink-light);
          text-align: center;
        }

        @media (max-width: 768px) {
          .hero-intro {
            flex-direction: column;
            align-items: flex-start;
          }

          .pfp-placeholder {
            width: 60px;
            height: 60px;
            font-size: 2rem;
          }

          .section {
            padding: 3rem 0;
          }
        }
      `}</style>
    </>
  );
}
