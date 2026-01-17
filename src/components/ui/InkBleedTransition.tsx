'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface InkBleedTransitionProps {
    isActive: boolean;
}

const FAREWELL_TEXT = "I hope you enjoyed my space";

export default function InkBleedTransition({ isActive }: InkBleedTransitionProps) {
    const router = useRouter();
    const [phase, setPhase] = useState<'idle' | 'text' | 'gate' | 'darkness' | 'complete'>('idle');
    const [displayedText, setDisplayedText] = useState('');
    const [gateOpen, setGateOpen] = useState(0);

    const words = useMemo(() => FAREWELL_TEXT.split(' '), []);

    useEffect(() => {
        if (!isActive) {
            setPhase('idle');
            setDisplayedText('');
            setGateOpen(0);
            return;
        }

        const textTimer = setTimeout(() => {
            setPhase('text');
        }, 300);

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
                setTimeout(() => setPhase('gate'), 800);
            }
        }, 280);

        return () => clearInterval(interval);
    }, [phase, words]);

    useEffect(() => {
        if (phase !== 'gate') return;

        const gateInterval = setInterval(() => {
            setGateOpen(prev => {
                const next = prev + 2;
                if (next >= 100) {
                    clearInterval(gateInterval);
                    return 100;
                }
                return next;
            });
        }, 20);

        const timer = setTimeout(() => setPhase('darkness'), 1200);

        return () => {
            clearInterval(gateInterval);
            clearTimeout(timer);
        };
    }, [phase]);

    useEffect(() => {
        if (phase !== 'darkness') return;

        const timer = setTimeout(() => {
            setPhase('complete');
            router.push('/portfolio');
        }, 600);

        return () => clearTimeout(timer);
    }, [phase, router]);

    if (!isActive && phase === 'idle') return null;

    const isGateOpening = phase === 'gate' || phase === 'darkness' || phase === 'complete';
    const isDark = phase === 'darkness' || phase === 'complete';

    return (
        <div className="fixed inset-0 z-[100] pointer-events-auto overflow-hidden">
            <div className="absolute inset-0 bg-[#0a0a0a]" />

            {!isGateOpening && (
                <div className="absolute inset-0 bg-[#FFF8E7] flex items-center justify-center">
                    <p
                        className="text-4xl md:text-5xl lg:text-6xl leading-relaxed text-center px-8"
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
            )}

            {isGateOpening && (
                <>
                    <div
                        className="absolute top-0 left-0 h-full bg-[#FFF8E7]"
                        style={{
                            width: `calc(50% - ${gateOpen / 2}%)`,
                            boxShadow: gateOpen > 0 ? '10px 0 40px rgba(0,0,0,0.5)' : 'none',
                            transition: 'width 0.05s linear',
                        }}
                    />

                    <div
                        className="absolute top-0 right-0 h-full bg-[#FFF8E7]"
                        style={{
                            width: `calc(50% - ${gateOpen / 2}%)`,
                            boxShadow: gateOpen > 0 ? '-10px 0 40px rgba(0,0,0,0.5)' : 'none',
                            transition: 'width 0.05s linear',
                        }}
                    />

                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{
                            opacity: Math.max(0, 1 - gateOpen / 40),
                        }}
                    >
                        <p
                            className="text-4xl md:text-5xl lg:text-6xl leading-relaxed text-center px-8"
                            style={{
                                fontFamily: "'Caveat', cursive",
                                color: '#2a1f0f',
                                textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            }}
                        >
                            {displayedText}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
