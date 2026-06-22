'use client';

import { useEffect, useState } from 'react';

interface MusicPlayerProps {
    isOpen: boolean;
    onClose: () => void;
    isPlaying: boolean;
    onTogglePlay: () => void;
}

export default function MusicPlayer({
    isOpen,
    onClose,
}: MusicPlayerProps) {
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
            className="fixed inset-0 z-[60] flex items-center justify-start font-sans"
            onClick={onClose}
        >
            <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    opacity: visible ? 1 : 0,
                }}
            />

            <div
                className="relative ml-8 w-[min(240px,calc(100vw-4rem))] transition-all duration-500 ease-out md:ml-16 lg:ml-24"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0) scale(1)' : 'translateX(-12px) scale(0.97)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="relative rounded-lg px-6 py-4 border border-[#FFF8E7]/10 backdrop-blur-md bg-black/50 text-center shadow-lg"
                >
                    <button
                        onClick={onClose}
                        aria-label="close music player note"
                        className="absolute top-2.5 right-2.5 text-[#FFF8E7]/40 hover:text-[#FFF8E7]/80 hover:bg-white/5 p-1 rounded-full transition-all duration-150"
                    >
                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M2 2L12 12M12 2L2 12" />
                        </svg>
                    </button>

                    <p className="text-sm font-light text-[#FFF8E7]/90 tracking-wide select-none py-1">
                        will be here soon :)
                    </p>
                </div>
            </div>
        </div>
    );
}
