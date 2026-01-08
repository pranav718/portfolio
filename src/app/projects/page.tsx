'use client';

import Header from '@/components/Header';
import LightBulb from '@/components/LightBulb';
import ProjectCard from '@/components/ProjectCard';
import SpotlightOverlay from '@/components/SpotlightOverlay';
import { motion } from 'framer-motion';
import { useState } from 'react';

const allProjects = [
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
    },
    {
        title: "E-commerce API",
        description: "A scalable REST API for e-commerce platforms built with Node.js and MongoDB, featuring auth, payments, and order management.",
        tags: ["Node.js", "MongoDB", "Express", "Docker"],
        githubUrl: "https://github.com/pranavray/ecommerce-api",
        gradient: "linear-gradient(135deg, #e8f5e9, #c8e6c9)"
    },
    {
        title: "TaskMaster",
        description: "Collaborative task management application with real-time updates using WebSockets and team workspaces.",
        tags: ["Vue.js", "Firebase", "Tailwind"],
        githubUrl: "https://github.com/pranavray/taskmaster",
        liveUrl: "https://taskmaster.demo",
        gradient: "linear-gradient(135deg, #fff3e0, #ffcc80)"
    }
];

export default function ProjectsPage() {
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
                        all projects
                    </motion.h1>

                    <div className="projects-grid">
                        {allProjects.map((project, idx) => (
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
          position: relative;
          display: inline-block;
        }

        .page-title::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--color-bulb-glow);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
      `}</style>
        </>
    );
}
