'use client';

import { booksRead, currentlyReading } from '@/data/books';
import { useEffect, useState } from 'react';

interface BookViewerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookViewer({ isOpen, onClose }: BookViewerProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setVisible(true));
            });
        } else {
            setVisible(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-start"
            onClick={onClose}
        >
            <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                    background: 'radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%)',
                    opacity: visible ? 1 : 0,
                }}
            />

            <div
                className="relative ml-8 md:ml-16 lg:ml-24 max-w-sm w-full transition-all duration-500 ease-out"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0) scale(1)' : 'translateX(-30px) scale(0.95)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="relative rounded-2xl p-6 pb-5 overflow-hidden"
                    style={{
                        background: 'linear-gradient(145deg, #FFF8E7 0%, #F5E6C8 40%, #EDD9B3 100%)',
                        boxShadow: `
                            0 0 40px rgba(244, 208, 63, 0.15),
                            0 20px 60px rgba(0, 0, 0, 0.4),
                            inset 0 1px 0 rgba(255, 255, 255, 0.5),
                            inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                        `,
                        border: '1px solid rgba(180, 150, 100, 0.3)',
                    }}
                >
                    <div
                        className="absolute inset-0 pointer-events-none opacity-30"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
                        }}
                    />

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full transition-colors z-10"
                        style={{ color: '#8B7355' }}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <path d="M2 2L12 12M12 2L2 12" />
                        </svg>
                    </button>

                    <div className="relative z-[1] mb-5">
                        <h3
                            className="text-lg mb-3"
                            style={{
                                fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
                                color: '#3E2723',
                                letterSpacing: '0.5px',
                            }}
                        >
                            some books i&apos;ve read:
                        </h3>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {booksRead.map((book, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 group/book cursor-default"
                                    style={{
                                        animation: `bookFadeIn 0.4s ease-out ${0.1 + i * 0.08}s both`,
                                    }}
                                >
                                    <div
                                        className="w-16 h-24 rounded-sm overflow-hidden shadow-md transition-transform duration-200 group-hover/book:scale-105"
                                        style={{
                                            boxShadow: '2px 2px 8px rgba(0,0,0,0.2), -1px -1px 3px rgba(255,255,255,0.3)',
                                        }}
                                    >
                                        <div
                                            className="w-full h-full flex items-center justify-center p-1"
                                            style={{
                                                background: `linear-gradient(135deg, ${['#2D4A3E', '#4A2D2D', '#2D3A4A', '#4A3D2D', '#3D2D4A'][i % 5]} 0%, ${['#1A2E25', '#2E1A1A', '#1A252E', '#2E261A', '#261A2E'][i % 5]} 100%)`,
                                            }}
                                        >
                                            <span
                                                className="text-[8px] text-center leading-tight text-white/90 font-medium"
                                                style={{ fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" }}
                                            >
                                                {book.title}
                                            </span>
                                        </div>
                                    </div>
                                    <p
                                        className="text-[9px] mt-1 text-center max-w-16 leading-tight truncate"
                                        style={{ color: '#6D4C41' }}
                                    >
                                        {book.author}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="w-full h-px mb-4"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(139, 115, 85, 0.3), transparent)',
                        }}
                    />

                    <div className="relative z-[1]">
                        <h3
                            className="text-lg mb-3"
                            style={{
                                fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
                                color: '#3E2723',
                                letterSpacing: '0.5px',
                            }}
                        >
                            reading nowadays:
                        </h3>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {currentlyReading.map((book, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 group/book cursor-default"
                                    style={{
                                        animation: `bookFadeIn 0.4s ease-out ${0.3 + i * 0.08}s both`,
                                    }}
                                >
                                    <div
                                        className="w-16 h-24 rounded-sm overflow-hidden shadow-md transition-transform duration-200 group-hover/book:scale-105"
                                        style={{
                                            boxShadow: '2px 2px 8px rgba(0,0,0,0.2), -1px -1px 3px rgba(255,255,255,0.3)',
                                            opacity: 0.7,
                                        }}
                                    >
                                        <div
                                            className="w-full h-full flex items-center justify-center p-1"
                                            style={{
                                                background: `linear-gradient(135deg, ${['#3A3A3A', '#2E2E3E'][i % 2]} 0%, ${['#222222', '#1E1E2E'][i % 2]} 100%)`,
                                            }}
                                        >
                                            <span
                                                className="text-[8px] text-center leading-tight text-white/70 font-medium"
                                                style={{ fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" }}
                                            >
                                                {book.title}
                                            </span>
                                        </div>
                                    </div>
                                    <p
                                        className="text-[9px] mt-1 text-center max-w-16 leading-tight truncate"
                                        style={{ color: '#8D6E63' }}
                                    >
                                        {book.author}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p
                            className="text-xs mt-3 leading-relaxed"
                            style={{
                                fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
                                color: '#8D6E63',
                                animation: 'bookFadeIn 0.4s ease-out 0.5s both',
                            }}
                        >
                            (there&apos;s many more but still, if you&apos;ve got some reccs, dm{' '}
                            <a
                                href="https://x.com/knightkun__"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-0.5 transition-colors duration-200"
                                style={{ color: '#5D4037', textDecoration: 'none' }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#8B4513')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '#5D4037')}
                            >
                                @knightkun__
                                <span className="text-[10px]"> on</span>
                                <svg className="w-2.5 h-2.5 inline" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            )
                        </p>
                    </div>

                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l opacity-20" style={{ borderColor: '#8B7355' }} />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r opacity-20" style={{ borderColor: '#8B7355' }} />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l opacity-20" style={{ borderColor: '#8B7355' }} />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r opacity-20" style={{ borderColor: '#8B7355' }} />
                </div>
            </div>
        </div>
    );
}
