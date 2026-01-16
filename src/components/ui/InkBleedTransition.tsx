'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface InkBleedTransitionProps {
    isActive: boolean;
}

const FAREWELL_TEXT = "I hope you enjoyed my space";

export default function InkBleedTransition({ isActive }: InkBleedTransitionProps) {
    const router = useRouter();
    const [phase, setPhase] = useState<'idle' | 'text' | 'zoom' | 'fade' | 'complete'>('idle');
    const [displayedText, setDisplayedText] = useState('');

    const words = useMemo(() => FAREWELL_TEXT.split(' '), []);

    useEffect(() => {
        if (!isActive) {
            setPhase('idle');
            setDisplayedText('');
            return;
        }

        const textTimer = setTimeout(() => {
            setPhase('text');
        }, 500);

        return () => clearTimeout(textTimer);
    }, [isActive]);

    useEffect(() => {
        if (phase !== 'text') return;

        let wordIndex = 0;
        setDisplayedText('');

        const interval = setInterval(() => {
            wordIndex++;
            if (wordIndex <= words.length) {
                setDisplayedText(words.slice(0, wordIndex).join(' '));
            } else {
                clearInterval(interval);
                setTimeout(() => setPhase('zoom'), 600);
            }
        }, 280);

        return () => clearInterval(interval);
    }, [phase, words]);

    useEffect(() => {
        if (phase !== 'zoom') return;
        const timer = setTimeout(() => setPhase('fade'), 1200);
        return () => clearTimeout(timer);
    }, [phase]);

    useEffect(() => {
        if (phase !== 'fade') return;
        const timer = setTimeout(() => {
            setPhase('complete');
            router.push('/portfolio');
        }, 800);
        return () => clearTimeout(timer);
    }, [phase, router]);

    if (!isActive && phase === 'idle') return null;

    const isZooming = phase === 'zoom' || phase === 'fade' || phase === 'complete';

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto overflow-hidden transition-colors duration-700 ${isZooming ? 'animate-shake' : ''
                } ${phase === 'fade' || phase === 'complete' ? 'bg-[#0a0a0a]' : 'bg-[#FFF8E7]'
                }`}
        >
            <div
                className={`relative flex items-center justify-center w-full h-full transition-all duration-1000 ${isZooming ? 'scale-[3] blur-sm opacity-0' : 'scale-100 blur-0 opacity-100'
                    }`}
            >
                <div className="text-center px-8">
                    <p
                        className="text-4xl md:text-5xl lg:text-6xl leading-relaxed"
                        style={{
                            fontFamily: "'Caveat', cursive",
                            color: '#2a1f0f',
                            textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        }}
                    >
                        {displayedText}
                        {phase === 'text' && (
                            <span className="inline-block w-[3px] h-[0.8em] bg-[#2a1f0f] ml-1 align-middle animate-pulse" />
                        )}
                    </p>
                </div>
            </div>

            <div
                className={`absolute inset-0 bg-[#0a0a0a] pointer-events-none transition-opacity duration-700 ${phase === 'fade' || phase === 'complete' ? 'opacity-100' : 'opacity-0'
                    }`}
            />
        </div>
    );
}
