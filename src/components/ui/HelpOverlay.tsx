'use client';

import { useEffect, useState } from 'react';

interface HelpOverlayProps {
    onDismiss: () => void;
}

export default function HelpOverlay({ onDismiss }: HelpOverlayProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 100);

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
    }, [onDismiss]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center
                  bg-black/70 backdrop-blur-sm transition-opacity duration-300
                  ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="text-center max-w-md px-8">
                
                <div className="mb-8 relative">
                    <svg
                        className="w-20 h-20 mx-auto text-[#F4D03F]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2C9.24 2 7 4.24 7 7c0 1.94 1.1 3.62 2.72 4.46L9 18h6l-.72-6.54C15.9 10.62 17 8.94 17 7c0-2.76-2.24-5-5-5zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                        <path d="M9 20v1c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9z" />
                    </svg>

                    
                    <div className="absolute top-16 left-1/2 -translate-x-1/2">
                        <div className="w-0.5 h-8 bg-[#8B4513] mx-auto" />
                        <div className="w-3 h-3 bg-[#654321] rounded-full mx-auto animate-bounce" />
                    </div>
                </div>

                
                <h2 className="text-2xl font-serif text-[#FFF8E7] mb-4">
                    Welcome to my workspace
                </h2>

                <p className="text-[#c0c0c0] mb-6 font-sans">
                    Pull the lamp string to illuminate the desk and begin exploring my portfolio journal.
                </p>

                
                <div className="flex justify-center gap-6 text-xs text-[#888] font-mono">
                    <div className="flex items-center gap-2">
                        <kbd className="px-2 py-1 bg-white/10 rounded">←</kbd>
                        <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd>
                        <span>Navigate pages</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>🎵</span>
                        <span>Click vinyl to play music</span>
                    </div>
                </div>

                
                <p className="mt-8 text-xs text-[#555] animate-pulse">
                    Click anywhere to continue
                </p>
            </div>
        </div>
    );
}
