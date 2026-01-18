'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PortfolioPage() {
    const [activeNav, setActiveNav] = useState('work');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-y-auto overflow-x-hidden">
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
                    className="fixed top-[40%] left-[-20%] w-[500px] h-[500px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 40%, transparent 70%)',
                        filter: 'blur(70px)',
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
                        className="flex items-center gap-1 px-2 py-2 rounded-full"
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <Link
                            href="/"
                            className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold hover:scale-105 transition-transform"
                        >
                            P
                        </Link>

                        <div className="flex items-center gap-1 px-2">
                            <button
                                onClick={() => setActiveNav('work')}
                                className={`px-4 py-1.5 rounded-full text-sm transition-all ${activeNav === 'work'
                                    ? 'bg-white/15 text-white'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                Work
                            </button>
                            <button
                                onClick={() => setActiveNav('projects')}
                                className={`px-4 py-1.5 rounded-full text-sm transition-all ${activeNav === 'projects'
                                    ? 'bg-white/15 text-white'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                Projects
                            </button>
                            <button
                                onClick={() => setActiveNav('blog')}
                                className={`px-4 py-1.5 rounded-full text-sm transition-all ${activeNav === 'blog'
                                    ? 'bg-white/15 text-white'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                Blog
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="max-w-2xl mx-auto px-6 pt-32 pb-20">
                    <div className="mb-12">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-6 flex items-center justify-center text-2xl font-bold">
                            P
                        </div>

                        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
                            Hi, I'm <span className="text-white">Pranav</span>{' '}
                            <span className="text-white/50">— Full Stack Developer</span>
                        </h1>

                        <p className="text-white/60 text-lg leading-relaxed mb-6">
                            I build production-ready applications using{' '}
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/10 rounded text-sm text-white/80">React</span>,{' '}
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/10 rounded text-sm text-white/80">Next.js</span>,{' '}
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/10 rounded text-sm text-white/80">TypeScript</span>,{' '}
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/10 rounded text-sm text-white/80">Node.js</span>{' '}
                            and creating solutions that solve real-world problems.
                        </p>

                        <div className="flex items-center gap-3 mb-6">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-sm transition-colors border border-white/10">
                                <span>📄</span> Resume / CV
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-sm transition-colors border border-white/10">
                                <span>✉️</span> Get in touch
                            </button>
                        </div>

                        <div className="flex items-center gap-4 text-white/40">
                            <a href="#" className="hover:text-white transition-colors">𝕏</a>
                            <a href="#" className="hover:text-white transition-colors">in</a>
                            <a href="#" className="hover:text-white transition-colors">⌘</a>
                            <a href="#" className="hover:text-white transition-colors">✉</a>
                        </div>
                    </div>

                    <section className="mb-16">
                        <p className="text-white/40 text-sm mb-2">Featured</p>
                        <h2 className="text-2xl font-semibold mb-6">Experience</h2>

                        <div className="space-y-4">
                            <div className="flex items-start justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">A</div>
                                    <div>
                                        <p className="font-medium">Company A</p>
                                        <p className="text-sm text-white/50">Full Stack Developer</p>
                                    </div>
                                </div>
                                <p className="text-sm text-white/40">2024 - Present</p>
                            </div>

                            <div className="flex items-start justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">B</div>
                                    <div>
                                        <p className="font-medium">Company B</p>
                                        <p className="text-sm text-white/50">Frontend Developer</p>
                                    </div>
                                </div>
                                <p className="text-sm text-white/40">2023 - 2024</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-semibold mb-6">Projects</h2>

                        <div className="grid gap-4">
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-medium">Project Alpha</p>
                                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Live</span>
                                </div>
                                <p className="text-sm text-white/50 mb-3">A full-stack web application for managing tasks with real-time collaboration features.</p>
                                <div className="flex gap-2">
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">React</span>
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">Node.js</span>
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">MongoDB</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-medium">Project Beta</p>
                                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">In Progress</span>
                                </div>
                                <p className="text-sm text-white/50 mb-3">An AI-powered code review tool that helps developers write better code.</p>
                                <div className="flex gap-2">
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">Next.js</span>
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">OpenAI</span>
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">TypeScript</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-medium">Project Gamma</p>
                                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">Open Source</span>
                                </div>
                                <p className="text-sm text-white/50 mb-3">A CLI tool for scaffolding modern web projects with best practices baked in.</p>
                                <div className="flex gap-2">
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">Rust</span>
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">CLI</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-medium">Project Delta</p>
                                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Live</span>
                                </div>
                                <p className="text-sm text-white/50 mb-3">Real-time multiplayer game built with WebSockets and Canvas API.</p>
                                <div className="flex gap-2">
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">Socket.io</span>
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">Canvas</span>
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">Express</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-semibold mb-6">Skills & Technologies</h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                                <p className="text-sm">JavaScript</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                                <p className="text-sm">TypeScript</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                                <p className="text-sm">React</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                                <p className="text-sm">Next.js</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                                <p className="text-sm">Node.js</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                                <p className="text-sm">Three.js</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                                <p className="text-sm">PostgreSQL</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                                <p className="text-sm">MongoDB</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                                <p className="text-sm">Docker</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-semibold mb-6">Blog</h2>

                        <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                                <p className="text-sm text-white/40 mb-1">Dec 2024</p>
                                <p className="font-medium mb-1">Building Immersive Web Experiences with Three.js</p>
                                <p className="text-sm text-white/50">A deep dive into creating 3D portfolio experiences...</p>
                            </div>

                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                                <p className="text-sm text-white/40 mb-1">Nov 2024</p>
                                <p className="font-medium mb-1">The Future of Web Development in 2025</p>
                                <p className="text-sm text-white/50">Predictions and trends I'm excited about...</p>
                            </div>

                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                                <p className="text-sm text-white/40 mb-1">Oct 2024</p>
                                <p className="font-medium mb-1">Why I Switched to TypeScript (And You Should Too)</p>
                                <p className="text-sm text-white/50">My journey from JavaScript purist to TypeScript advocate...</p>
                            </div>
                        </div>
                    </section>

                    <div className="pt-8 border-t border-white/10">
                        <Link
                            href="/"
                            className="text-white/40 hover:text-white text-sm transition-colors"
                        >
                            ← Back to my space
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
