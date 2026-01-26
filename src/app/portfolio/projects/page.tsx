'use client';

import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const headingFont = { fontFamily: "'Outfit', sans-serif", fontWeight: 600 };
    const jetbrainsFont = { fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" };

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
                        <Link href="/portfolio" className="text-white/90 hover:text-white text-lg font-medium transition-colors inline-flex items-center gap-2">
                            <span className="text-xl">‹</span> Projects
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} compact />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
