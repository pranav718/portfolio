'use client';

import { motion } from 'framer-motion';

interface AudioControlsProps {
    isPlaying: boolean;
    onOpenPlayer: () => void;
}

export default function AudioControls({
    isPlaying,
    onOpenPlayer,
}: AudioControlsProps) {

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenPlayer}
            aria-label="open music player"
            className="group fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center
                 rounded-full border border-[#F4D03F]/25 bg-black/45 text-[#FFF8E7]
                 shadow-[0_10px_35px_rgba(0,0,0,0.45),0_0_22px_rgba(244,208,63,0.08)]
                 backdrop-blur-xl transition-colors hover:border-[#F4D03F]/45 hover:bg-black/65"
        >
            <div className="flex items-center justify-center opacity-90">
                {isPlaying ? (
                    <div className="flex gap-[2px] h-3 items-end">
                        <motion.div animate={{ height: ["4px", "10px", "4px"] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1.5 bg-[#F4D03F] rounded-t-sm" />
                        <motion.div animate={{ height: ["8px", "12px", "6px"] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1.5 bg-[#F4D03F] rounded-t-sm" />
                        <motion.div animate={{ height: ["6px", "8px", "4px"] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 bg-[#F4D03F] rounded-t-sm" />
                    </div>
                ) : (
                    <svg className="h-6 w-6 text-[#F4D03F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                        <circle cx="12" cy="12" r="8" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
                        <path d="M17 8.5h2.4v5.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>
            <span
                className="pointer-events-none absolute left-14 rounded-full border border-[#F4D03F]/25
                    bg-black/55 px-3 py-2 text-[11px] leading-none text-[#FFF8E7]/85 opacity-0
                    shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-200
                    group-hover:translate-x-1 group-hover:opacity-100"
                style={{
                    fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                    letterSpacing: '0.08em',
                    textTransform: 'lowercase',
                }}
            >
                {isPlaying ? 'now playing' : 'music'}
            </span>
        </motion.button>
    );
}
