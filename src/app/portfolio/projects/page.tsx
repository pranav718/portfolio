'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const projects = [
    {
        id: 'portfolio-v2',
        title: 'Portfolio v2',
        description: 'An immersive 3D desk portfolio experience with interactive elements and transitions.',
        techStack: ['Next.js', 'Three.js', 'Framer Motion'],
        status: 'Live',
        statusColor: 'green',
        githubUrl: 'https://github.com/pranav718/portfolio',
        liveUrl: '#',
        gradient: 'from-purple-600/30 via-blue-500/20 to-cyan-400/30',
        hoverGlow: 'hover:shadow-purple-500/10',
    },
    {
        id: 'algo-visualizer',
        title: 'AlgoVisualizer',
        description: 'Interactive visualization tool for popular algorithms and data structures.',
        techStack: ['React', 'TypeScript', 'Algorithms'],
        status: 'In Progress',
        statusColor: 'blue',
        githubUrl: 'https://github.com/pranav718',
        liveUrl: null,
        gradient: 'from-blue-600/30 via-indigo-500/20 to-violet-400/30',
        hoverGlow: 'hover:shadow-blue-500/10',
    },
    {
        id: 'chess-engine',
        title: 'Chess Engine',
        description: 'A chess engine with AI opponent using minimax algorithm with alpha-beta pruning.',
        techStack: ['Python', 'AI', 'Chess'],
        status: 'Open Source',
        statusColor: 'purple',
        githubUrl: 'https://github.com/pranav718/chess-engine',
        liveUrl: null,
        gradient: 'from-amber-600/30 via-orange-500/20 to-red-400/30',
        hoverGlow: 'hover:shadow-amber-500/10',
    },
];

export default function ProjectsPage() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const headingFont = { fontFamily: "'Outfit', sans-serif", fontWeight: 600 };
    const jetbrainsFont = { fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" };

    const getStatusBgColor = (color: string) => {
        switch (color) {
            case 'green': return 'bg-green-500/90';
            case 'blue': return 'bg-blue-500/90';
            case 'purple': return 'bg-purple-500/90';
            default: return 'bg-gray-500/90';
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] overflow-y-auto overflow-x-hidden" style={jetbrainsFont}>
            <main
                className="relative transition-all duration-700 ease-out"
                style={{
                    filter: isLoaded ? 'blur(0px)' : 'blur(20px)',
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'scale(1)' : 'scale(1.02)',
                }}
            >
                <div
                    className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
                <div
                    className="fixed bottom-[-30%] left-[-15%] w-[700px] h-[700px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(244, 208, 63, 0.08) 0%, rgba(244, 208, 63, 0.03) 40%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />

                <div
                    className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />

                <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                    <div
                        className="flex items-center gap-8 px-6 py-3 rounded-xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <Link href="/" className="hover:scale-105 transition-transform">
                            <img src="/images/avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-sm object-cover" />
                        </Link>
                        <Link href="/portfolio#projects" className="text-sm text-white/60 hover:text-white transition-colors">
                            projects
                        </Link>
                        <Link href="/portfolio#blog" className="text-sm text-white/60 hover:text-white transition-colors">
                            blog
                        </Link>
                    </div>
                </nav>

                <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                    <div className="mb-10">
                        <Link href="/portfolio" className="text-white/40 hover:text-white text-sm transition-colors mb-4 inline-block">
                            ← back to portfolio
                        </Link>
                        <h1 className="text-4xl text-white tracking-wide" style={headingFont}>All Projects</h1>
                        <p className="text-white/50 mt-2">A collection of things I've built</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={`group rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${project.hoverGlow}`}
                            >
                                <div className="relative h-36 overflow-hidden">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                                        <span className="text-white/30 text-sm">Preview</span>
                                    </div>
                                    <span className={`absolute top-3 right-3 text-xs px-2 py-1 ${getStatusBgColor(project.statusColor)} text-white rounded font-medium flex items-center gap-1`}>
                                        {project.status === 'Live' && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>}
                                        {project.status}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-medium text-white group-hover:text-purple-300 transition-colors">{project.title}</p>
                                        <div className="flex items-center gap-2">
                                            {project.githubUrl && (
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                                </a>
                                            )}
                                            {project.liveUrl && (
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-white/50 mb-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <span key={tech} className="text-xs px-2 py-1 bg-white/10 rounded">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
