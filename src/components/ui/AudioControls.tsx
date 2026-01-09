'use client';

import { useState } from 'react';

interface AudioControlsProps {
    isPlaying: boolean;
    onToggle: () => void;
    volume: number;
    onVolumeChange: (vol: number) => void;
    isMuted: boolean;
    onMuteToggle: () => void;
}

export default function AudioControls({
    isPlaying,
    onToggle,
    volume,
    onVolumeChange,
    isMuted,
    onMuteToggle,
}: AudioControlsProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className="fixed bottom-4 left-4 z-40 flex items-center gap-3
                 bg-black/40 backdrop-blur-md rounded-lg p-3
                 transition-all duration-300"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            
            <button
                onClick={onMuteToggle}
                className="p-1 text-white/80 hover:text-white transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
                {isMuted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                )}
            </button>

            
            <div
                className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${expanded ? 'w-24 opacity-100' : 'w-0 opacity-0'
                    }`}
            >
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => onVolumeChange(Number(e.target.value))}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none 
                     [&::-webkit-slider-thumb]:w-3 
                     [&::-webkit-slider-thumb]:h-3 
                     [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-[#F4D03F]"
                />
            </div>

            
            {isPlaying && (
                <div className="flex items-center gap-2 text-xs text-white/60">
                    <div className="flex gap-0.5">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="w-0.5 bg-[#F4D03F] rounded-full animate-pulse"
                                style={{
                                    height: `${8 + i * 3}px`,
                                    animationDelay: `${i * 0.15}s`,
                                }}
                            />
                        ))}
                    </div>
                    <span className={expanded ? 'opacity-100' : 'opacity-0'}>
                        Playing...
                    </span>
                </div>
            )}
        </div>
    );
}
