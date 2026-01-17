'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface InkBleedTransitionProps {
    isActive: boolean;
}

const FAREWELL_TEXT = "I hope you enjoyed my space";

export default function InkBleedTransition({ isActive }: InkBleedTransitionProps) {
    const router = useRouter();
    const [phase, setPhase] = useState<'idle' | 'expand' | 'text' | 'gate' | 'darkness' | 'complete'>('idle');
    const [displayedText, setDisplayedText] = useState('');
    const [gateOpen, setGateOpen] = useState(0);
    const [circleSize, setCircleSize] = useState(0);

    const words = useMemo(() => FAREWELL_TEXT.split(' '), []);

    useEffect(() => {
        if (!isActive) {
            setPhase('idle');
            setDisplayedText('');
            setGateOpen(0);
            setCircleSize(0);
            return;
        }

        setPhase('expand');
    }, [isActive]);

    useEffect(() => {
        if (phase !== 'expand') return;

        let startTime: number | null = null;
        let animationId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const duration = 1800;
            const progress = Math.min(elapsed / duration, 1);

            const eased = 1 - Math.pow(1 - progress, 3);
            const size = eased * 250;

            setCircleSize(size);

            if (progress < 1) {
                animationId = requestAnimationFrame(animate);
            }
        };

        animationId = requestAnimationFrame(animate);

        const timer = setTimeout(() => setPhase('text'), 1900);

        return () => {
            cancelAnimationFrame(animationId);
            clearTimeout(timer);
        };
    }, [phase]);

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

        let startTime: number | null = null;
        let animationId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const duration = 1400;
            const progress = Math.min(elapsed / duration, 1);

            const eased = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            setGateOpen(eased * 100);

            if (progress < 1) {
                animationId = requestAnimationFrame(animate);
            }
        };

        animationId = requestAnimationFrame(animate);

        const timer = setTimeout(() => setPhase('darkness'), 1500);

        return () => {
            cancelAnimationFrame(animationId);
            clearTimeout(timer);
        };
    }, [phase]);

    useEffect(() => {
        if (phase !== 'darkness') return;

        const timer = setTimeout(() => {
            setPhase('complete');
            router.push('/portfolio');
        }, 400);

        return () => clearTimeout(timer);
    }, [phase, router]);

    if (!isActive && phase === 'idle') return null;

    const isExpanding = phase === 'expand';
    const isGateOpening = phase === 'gate' || phase === 'darkness' || phase === 'complete';
    const showFullScreen = phase === 'text';

    return (
        <div className="fixed inset-0 z-[100] pointer-events-auto overflow-hidden">
            {isGateOpening && (
                <div className="absolute inset-0 bg-[#0a0a0a]" />
            )}

            {isExpanding && (
                <div
                    className="absolute rounded-full bg-[#FFF8E7]"
                    style={{
                        width: `${circleSize}vmax`,
                        height: `${circleSize}vmax`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: circleSize > 10
                            ? '0 0 80px rgba(255, 248, 231, 0.6), 0 0 120px rgba(255, 248, 231, 0.3)'
                            : '0 0 20px rgba(255, 248, 231, 0.8)',
                    }}
                />
            )}

            {showFullScreen && (
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
                        }}
                    />

                    <div
                        className="absolute top-0 right-0 h-full bg-[#FFF8E7]"
                        style={{
                            width: `calc(50% - ${gateOpen / 2}%)`,
                            boxShadow: gateOpen > 0 ? '-10px 0 40px rgba(0,0,0,0.5)' : 'none',
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
