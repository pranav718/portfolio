'use client';

import GitHubContributions from '@/components/GitHubContributions';
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
                                <h1 className="text-4xl md:text-5xl text-white tracking-wide mb-2" style={headingFont}>
                                    I'm Pranav
                                </h1>
                                <div className="text-white/70 text-sm leading-relaxed">
                                    <p>a 19 y/o fullstack developer</p>
                                    <p>currently pursuing cs</p>
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
                            <a href="https://linkedin.com/in/pranav718" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
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
                            <p className="text-lg mb-4 tracking-wider" style={headingFont}>SKILLS</p>
                            <div className="flex flex-wrap items-center gap-6 text-white/60">
                                <div className="flex items-center gap-2 text-xs"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278z" /></svg>React</div>
                                <div className="flex items-center gap-2 text-xs"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361l4.735 7.17 1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0z" /></svg>Next.js</div>
                                <div className="flex items-center gap-2 text-xs"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.998 24c-.321 0-.641-.084-.922-.247L8.14 22.016c-.438-.245-.224-.332-.08-.383.548-.19.659-.233 1.244-.564.061-.034.141-.021.203.015l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.048.134-.141.134-.238V6.921c0-.099-.053-.19-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.086.05-.14.143-.14.24v10.188c0 .095.055.189.138.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.058c0 1.745-.95 2.745-2.604 2.745-.509 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.604V6.883c0-.66.352-1.274.922-1.603L11.076.206c.558-.316 1.3-.316 1.848 0l8.794 5.074c.57.329.924.943.924 1.603v10.188c0 .66-.354 1.273-.924 1.604l-8.794 5.078c-.28.163-.6.247-.926.247z" /></svg>Node.js</div>
                                <div className="flex items-center gap-2 text-xs"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05z" /></svg>Python</div>
                                <div className="flex items-center gap-2 text-xs"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zM3.375 11.75h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" /></svg>TypeScript</div>
                            </div>
                        </div>
                    </div>

                    <section id="projects" className="mb-16">
                        <h2 className="text-2xl mb-6 tracking-wider" style={headingFont}>PROJECTS</h2>

                        <div className="grid gap-4">
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-medium">Portfolio v2</p>
                                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Live</span>
                                </div>
                                <p className="text-sm text-white/50 mb-3">An immersive 3D desk portfolio experience with interactive elements and transitions.</p>
                                <div className="flex gap-2">
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">Next.js</span>
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">Three.js</span>
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">Framer Motion</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-medium">AlgoVisualizer</p>
                                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">In Progress</span>
                                </div>
                                <p className="text-sm text-white/50 mb-3">Interactive visualization tool for popular algorithms and data structures.</p>
                                <div className="flex gap-2">
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">React</span>
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">TypeScript</span>
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">Algorithms</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-medium">Chess Engine</p>
                                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">Open Source</span>
                                </div>
                                <p className="text-sm text-white/50 mb-3">A chess engine with AI opponent using minimax algorithm with alpha-beta pruning.</p>
                                <div className="flex gap-2">
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">Python</span>
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">AI</span>
                                    <span className="text-xs px-2 py-1 bg-white/10 rounded">Chess</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl mb-6 tracking-wider" style={headingFont}>CONTRIBUTIONS</h2>
                        <GitHubContributions username="pranav718" />
                    </section>

                    <section id="blog" className="mb-16">
                        <h2 className="text-2xl mb-6 tracking-wider" style={headingFont}>BLOG</h2>

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
