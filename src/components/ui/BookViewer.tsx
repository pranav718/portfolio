'use client';

import { useEffect, useState } from 'react';

interface BookViewerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookViewer({ isOpen, onClose }: BookViewerProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            let secondFrame = 0;
            const firstFrame = requestAnimationFrame(() => {
                secondFrame = requestAnimationFrame(() => setVisible(true));
            });

            return () => {
                cancelAnimationFrame(firstFrame);
                cancelAnimationFrame(secondFrame);
            };
        }

        const hideTimer = window.setTimeout(() => setVisible(false), 0);
        return () => window.clearTimeout(hideTimer);
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
                    background: 'radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.68) 100%)',
                    opacity: visible ? 1 : 0,
                }}
            />

            <div
                className="relative ml-8 w-[min(360px,calc(100vw-4rem))] transition-all duration-500 ease-out md:ml-16 lg:ml-24"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0) scale(1)' : 'translateX(-24px) scale(0.96)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="relative overflow-hidden rounded-xl px-7 py-6"
                    style={{
                        background: 'linear-gradient(145deg, #FFF8E7 0%, #F2E0BD 100%)',
                        border: '1px solid rgba(139, 94, 52, 0.26)',
                        boxShadow: `
                            0 18px 60px rgba(0, 0, 0, 0.38),
                            0 0 36px rgba(244, 208, 63, 0.10),
                            inset 0 1px 0 rgba(255, 255, 255, 0.48)
                        `,
                    }}
                >
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
                        }}
                    />

                    <button
                        onClick={onClose}
                        aria-label="close bookshelf note"
                        className="absolute top-4 right-4 z-10 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-150"
                        style={{ color: '#8B7355' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)';
                            e.currentTarget.style.color = '#5D4037';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#8B7355';
                        }}
                    >
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M2 2L12 12M12 2L2 12" />
                        </svg>
                    </button>

                    <div className="relative z-[1] pr-7">
                        <p
                            className="mb-3"
                            style={{
                                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                                color: '#8B7355',
                                fontSize: '11px',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                            }}
                        >
                            bookshelf
                        </p>

                        <h3
                            style={{
                                fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
                                color: '#3E2723',
                                fontSize: '26px',
                                letterSpacing: '0.02em',
                                lineHeight: 1.25,
                            }}
                        >
                            updating all the books here soon
                        </h3>
                    </div>

                    <div className="absolute top-2.5 left-2.5 h-5 w-5 border-t border-l opacity-15" style={{ borderColor: '#8B7355' }} />
                    <div className="absolute bottom-2.5 right-2.5 h-5 w-5 border-b border-r opacity-15" style={{ borderColor: '#8B7355' }} />
                </div>
            </div>
        </div>
    );
}
