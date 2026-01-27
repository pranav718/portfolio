'use client';

import GitHubContributions from '@/components/GitHubContributions';
import ProjectCard from '@/components/ProjectCard';
import RotatingTitle from '@/components/RotatingTitle';
import SkillBadges from '@/components/SkillBadges';
import { projects } from '@/data/projects';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PortfolioPage() {
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
                        <Link
                            href="/"
                            className="hover:scale-105 transition-transform"
                        >
                            <img
                                src="/images/avatar.jpg"
                                alt="Avatar"
                                className="w-8 h-8 rounded-sm object-cover"
                            />
                        </Link>
                        <Link href="#projects" className="text-sm text-white/60 hover:text-white transition-colors">
                            projects
                        </Link>
                        <Link href="#blog" className="text-sm text-white/60 hover:text-white transition-colors">
                            blog
                        </Link>
                    </div>
                </nav>

                <div className="max-w-2xl mx-auto px-6 pt-32 pb-20">
                    <div className="mb-16">
                        <div className="relative mb-8">
                            <img
                                src="/images/avatar.jpg"
                                alt="Avatar"
                                className="w-24 h-24 rounded-sm object-cover float-left mr-4"
                            />
                            <div>
                                <h1 className="text-2xl md:text-3xl text-white tracking-wide mb-1" style={headingFont}>
                                    Pranav Ray
                                </h1>
                                <RotatingTitle />
                                <div className="text-white/70 text-sm leading-relaxed">
                                    <p>a 19 y/o fullstack developer</p>
                                    <p>currently pursuing cs (and greatness)</p>
                                </div>
                            </div>
                            <div className="clear-both"></div>
                        </div>

                        <div className="text-white/60 text-sm leading-relaxed mb-8">
                            <p className="mb-3">i code, code and code, also learning devops and diving deep into backend these days</p>
                            <p>i also write blogs, solve algorithms and play chess in free time.</p>
                        </div>

                        <div className="flex items-center gap-5 text-white/50">
                            <a href="https://github.com/pranav718" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="GitHub">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                            </a>
                            <a href="https://x.com/knightkun__" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="X/Twitter">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a href="https://www.linkedin.com/in/pranav-ray-9ab54133b/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                            <a href="https://leetcode.com/pranav718" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="LeetCode">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg>
                            </a>
                            <a href="https://codeforces.com/profile/knightkun__" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Codeforces">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" /></svg>
                            </a>
                            <a href="https://buymeacoffee.com/pranav718" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Buy Me Coffee">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364z" /></svg>
                            </a>
                            <a href="https://www.chess.com/member/snow_7777" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="Chess.com">
                                <img src="/images/chesscom-logo.png" alt="Chess.com" className="w-5 h-5 rounded-sm" style={{ filter: 'grayscale(100%) brightness(2)' }} />
                            </a>
                        </div>

                        <div className="mt-12 mb-8">
                            <h2 className="text-2xl mb-6 tracking-wider" style={headingFont}>Skills</h2>
                            <SkillBadges />
                        </div>
                    </div>

                    <section id="projects" className="mb-16">
                        <h2 className="text-2xl mb-6 tracking-wider" style={headingFont}>Projects</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.slice(0, 2).map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>

                        <div className="flex justify-center mt-6">
                            <Link href="/portfolio/projects" className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all flex items-center gap-2">
                                View All Projects
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl mb-6 tracking-wider" style={headingFont}>Stats</h2>
                        <GitHubContributions username="pranav718" />
                    </section>

                    <section id="blog" className="mb-16">
                        <h2 className="text-2xl mb-6 tracking-wider" style={headingFont}>Blog</h2>

                        <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors cursor-pointer">
                                <p className="text-sm text-white/40 mb-1">Dec 2024</p>
                                <p className="font-medium mb-1">Building Immersive Web Experiences with Three.js</p>
                                <p className="text-sm text-white/50">A deep dive into creating 3D portfolio experiences...</p>
                            </div>

                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors cursor-pointer">
                                <p className="text-sm text-white/40 mb-1">Nov 2024</p>
                                <p className="font-medium mb-1">The Future of Web Development in 2025</p>
                                <p className="text-sm text-white/50">Predictions and trends I'm excited about...</p>
                            </div>

                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors cursor-pointer">
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
                            ← back to my space
                        </Link>
                    </div>
                </div>
            </main >
        </div >
    );
}
