'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HelpOverlayProps {
    onDismiss: () => void;
}

export default function HelpOverlay({ onDismiss }: HelpOverlayProps) {
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        setTimeout(() => setVisible(true), 100);

        if (isMobile) return;

        const handleInteraction = () => {
            setVisible(false);
            setTimeout(onDismiss, 300);
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('keydown', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, [onDismiss, isMobile]);

    if (isMobile) {
        return (
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center
                      bg-black/80 backdrop-blur-sm transition-opacity duration-300
                      ${visible ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="text-center max-w-sm px-8">
                    <h2 className="text-2xl font-serif text-[#FFF8E7] mb-4">
                        welcome to my space
                    </h2>

                    <p className="text-[#a0a0a0] mb-8 font-sans text-sm">
                        this experience is best viewed on desktop
                    </p>

                    <Link
                        href="/portfolio"
                        className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all"
                    >
                        view portfolio →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center
                  bg-black/70 backdrop-blur-sm transition-opacity duration-300
                  ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="text-center max-w-md px-8">
                <div className="mb-8 relative">
                    <div className="relative w-24 h-24 mx-auto">
                        <img
                            src="/images/avatar.jpg"
                            alt="Pranav"
                            className="w-24 h-24 rounded-full object-cover border-2 border-white/20 animate-flicker"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
                    </div>
                </div>

                <h2 className="text-2xl font-serif text-[#FFF8E7] mb-4">
                    hey, welcome to my space
                </h2>

                <div className="text-[#a0a0a0] mb-6 font-sans text-sm leading-relaxed space-y-2">
                    <p>click on the lamp to turn it on</p>
                    <p>click on my journal to view my portfolio</p>
                    <p>click on the vinyl to play music</p>
                    <p>turn up volume for sound effects</p>
                </div>

                <p className="mt-6 text-xs text-[#555] animate-pulse">
                    click anywhere to continue
                </p>
            </div>
        </div>
    );
}
