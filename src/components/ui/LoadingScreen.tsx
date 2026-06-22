'use client';

import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
    onLoaded?: () => void;
}

export default function LoadingScreen({ onLoaded }: LoadingScreenProps) {
    const { progress, active } = useProgress();
    const [shouldRender, setShouldRender] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (!active) {
            setFadeOut(true);
            const timer = setTimeout(() => {
                setShouldRender(false);
                onLoaded?.();
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [active, onLoaded]);

    if (!shouldRender) return null;

    return (
        <div 
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/65 backdrop-blur-lg transition-all duration-[800ms] ease-in-out ${
                fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            <div className="text-center">
                <div className="mb-8">
                    <svg
                        className="w-16 h-16 mx-auto text-[#F4D03F] animate-pulse"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2C9.24 2 7 4.24 7 7c0 1.94 1.1 3.62 2.72 4.46L9 18h6l-.72-6.54C15.9 10.62 17 8.94 17 7c0-2.76-2.24-5-5-5zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                        <path d="M9 20v1c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9z" />
                    </svg>
                </div>

                <h2 className="text-xl font-serif text-[#FFF8E7] mb-4">
                    Loading my personal space...
                </h2>

                <div className="w-64 h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#F4D03F] to-[#FFB347] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <p className="mt-3 text-sm text-[#888] font-mono">
                    {Math.round(progress)}%
                </p>
            </div>

            <div className="absolute bottom-8 flex items-center gap-2 text-xs text-[#FFF8E7]/35 font-mono select-none">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <span>best experienced with sound on</span>
            </div>
        </div>
    );
}
