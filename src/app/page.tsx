'use client';

import GitHubContributions from '@/components/GitHubContributions';
import Header from '@/components/Header';
// import LightBulb from '@/components/LightBulb';
import ProjectCard from '@/components/ProjectCard';
import SocialLinks from '@/components/SocialLinks';
// import SpotlightOverlay from '@/components/SpotlightOverlay';
import { motion } from 'framer-motion';
// import { useState } from 'react';

export default function Home() {
  // const [isLightOn, setIsLightOn] = useState(true);

  return (
    <>
      <Header />

      {/* LightBulb temporarily disabled
      <LightBulb
        initialOn={true}
        onToggle={(on) => setIsLightOn(on)}
      />

      <SpotlightOverlay isLightOn={isLightOn} />
      */}

      <main className="max-w-[900px] mx-auto px-8 pt-20 pb-8">
        <section className="pt-8">
          <motion.div
            className="w-full text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-start gap-6 mb-6 flex-col md:flex-row">
              <motion.div
                className="shrink-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="w-20 h-20 rounded-xl border-2 border-text bg-bg-card flex items-center justify-center text-[2.5rem] text-text">
                  <span className="font-death-note">P</span>
                </div>
              </motion.div>

              <div className="w-full">
                <h1 className="m-0 mb-2 font-death-note text-[clamp(2rem,4vw,3rem)] leading-tight">
                  i&apos;m pranav
                </h1>
                <p className="text-[0.95rem] leading-relaxed text-text-dim m-0">
                  a <span className="text-text font-semibold">19 y/o fullstack developer</span>
                  <br />
                  currently pursuing cs <span className="text-text font-semibold">@muj</span>
                </p>
              </div>
            </div>

            <motion.div
              className="text-sm leading-loose text-text-dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="mb-3">
                i have experience working with{' '}
                <span className="text-bulb-warm font-medium">[react, next.js, node, python, typescript]</span>
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

        <section id="projects" className="py-16">
          <motion.h2
            className="text-[1.8rem] mb-8 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-[60%] after:h-[3px] after:bg-bulb-glow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            projects
          </motion.h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mb-6">
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
            className="inline-block text-[0.85rem] text-text border border-text px-4 py-2 rounded transition-all hover:bg-text hover:text-bg-dark"
            whileHover={{ x: 5 }}
          >
            show all →
          </motion.a>
        </section>

        <section className="py-16">
          <motion.h2
            className="text-[1.8rem] mb-8 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-[60%] after:h-[3px] after:bg-bulb-glow"
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
            <h3 className="text-[1.1rem] mb-4 font-mono font-normal">orgs i&apos;ve contributed to:</h3>
            <div className="flex gap-4 flex-wrap">
              <div className="w-[60px] h-[60px] border border-dashed border-[#2c2416]/30 rounded-lg flex items-center justify-center text-[0.65rem] text-text-muted text-center">
                <span>org logo</span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
