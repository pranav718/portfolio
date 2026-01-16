'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface InkBleedTransitionProps {
    isActive: boolean;
}

const FAREWELL_TEXT = "I hope you enjoyed my space";

export default function InkBleedTransition({ isActive }: InkBleedTransitionProps) {
    const router = useRouter();
    const [phase, setPhase] = useState<'idle' | 'text' | 'ink' | 'complete'>('idle');
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
                setTimeout(() => setPhase('ink'), 800);
            }
        }, 300);

        return () => clearInterval(interval);
    }, [phase, words]);

    useEffect(() => {
        if (phase !== 'ink') return;

        const navTimer = setTimeout(() => {
            setPhase('complete');
            router.push('/portfolio');
        }, 1500);

        return () => clearTimeout(navTimer);
    }, [phase, router]);

    if (!isActive && phase === 'idle') return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
            <div
                className={`absolute inset-0 bg-[#FFF8E7]/90 transition-opacity duration-500 ${phase !== 'idle' ? 'opacity-100' : 'opacity-0'
                    }`}
            />
            <div
                className={`absolute inset-0 bg-[#1a1108] transition-all ease-out ${phase === 'ink' || phase === 'complete'
                        ? 'opacity-100 scale-100 duration-[1200ms]'
                        : 'opacity-0 scale-0 duration-300'
                    }`}
                style={{
                    borderRadius: phase === 'ink' || phase === 'complete' ? '0%' : '100%',
                    transformOrigin: 'center center',
                }}
            />

            <div
                className={`relative z-10 text-center px-8 transition-all duration-500 ${phase === 'ink' || phase === 'complete'
                        ? 'opacity-0 scale-95'
                        : 'opacity-100 scale-100'
                    }`}
            >
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
                        <span
                            className="inline-block w-[3px] h-[0.8em] bg-[#2a1f0f] ml-1 align-middle"
                            style={{ animation: 'pulse 1s ease-in-out infinite' }}
                        />
                    )}
                </p>
            </div>

            {phase === 'ink' && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-[#1a1108]"
                            style={{
                                width: `${30 + Math.random() * 50}px`,
                                height: `${30 + Math.random() * 50}px`,
                                left: `${10 + Math.random() * 80}%`,
                                top: `${10 + Math.random() * 80}%`,
                                animation: `ping 0.6s ease-out ${i * 0.1}s forwards`,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
