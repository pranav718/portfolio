'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiSkipBack, FiSkipForward, FiVolume2, FiVolumeX, FiX } from 'react-icons/fi';
import { IoPauseSharp, IoPlaySharp } from 'react-icons/io5';

interface Track {
    id: string;
    title: string;
    artist: string;
    duration: string;
    durationMs: number;
}

const PLAYLIST: Track[] = [
    { id: '1', title: 'Midnight City', artist: 'Synthwave Dreams', duration: '3:45', durationMs: 225000 },
    { id: '2', title: 'Neon Reflections', artist: 'Retrograde', duration: '4:12', durationMs: 252000 },
    { id: '3', title: 'After Hours', artist: 'The Weekend Vibes', duration: '2:58', durationMs: 178000 },
    { id: '4', title: 'Analog Heart', artist: 'Lo-Fi Chillers', duration: '3:30', durationMs: 210000 },
    { id: '5', title: 'Electric Horizon', artist: 'Future Classic', duration: '4:40', durationMs: 280000 },
];

interface MusicPlayerProps {
    isOpen: boolean;
    onClose: () => void;
    isPlaying: boolean;
    onTogglePlay: () => void;
    volume: number;
    onVolumeChange: (vol: number) => void;
    isMuted: boolean;
    onMuteToggle: () => void;
}

function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function MusicPlayer({
    isOpen,
    onClose,
    isPlaying,
    onTogglePlay,
    volume,
    onVolumeChange,
    isMuted,
    onMuteToggle,
}: MusicPlayerProps) {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [progressMs, setProgressMs] = useState(0);

    const currentTrack = PLAYLIST[currentTrackIndex];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgressMs((prev) => {
                    const next = prev + 1000;
                    if (next >= currentTrack.durationMs) {
                        handleNext();
                        return 0;
                    }
                    return next;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentTrack.durationMs]);

    useEffect(() => {
        setProgressMs(0);
    }, [currentTrackIndex]);

    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    };

    const handlePrev = () => {
        setCurrentTrackIndex((prev) => (prev === 0 ? PLAYLIST.length - 1 : prev - 1));
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProgressMs(Number(e.target.value));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ y: '100%', opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: '100%', opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[420px] 
                               bg-[#151515]/90 backdrop-blur-2xl md:rounded-3xl rounded-t-3xl border border-white/10 
                               shadow-2xl shadow-black/50 overflow-hidden flex flex-col"
                    >
                        <div className="flex justify-between items-center p-5 pb-0">
                            <div className="w-10" />
                            <div className="w-12 h-1.5 bg-white/20 rounded-full" />
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 
                                         text-white/60 hover:text-white transition-colors"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        <div className="p-6 md:p-8 flex flex-col gap-8 h-full">
                            <div className="relative aspect-square w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/5 flex items-center justify-center group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#F4D03F]/20 to-[#8B4513]/40" />
                                <motion.div
                                    animate={{ rotate: isPlaying ? 360 : 0 }}
                                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                                    className="relative w-48 h-48 rounded-full border-[12px] border-[#111] bg-[#1a1a1a] flex items-center justify-center shadow-inner"
                                >
                                    <div className="absolute inset-2 rounded-full border border-white/5" />
                                    <div className="absolute inset-6 rounded-full border border-white/5" />
                                    <div className="absolute inset-10 rounded-full border border-white/5" />
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#F4D03F] to-[#FFB347] flex items-center justify-center shadow-md">
                                        <div className="w-2 h-2 rounded-full bg-black/80" />
                                    </div>
                                </motion.div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-start gap-1">
                                    <h2 className="text-2xl font-semibold text-white tracking-tight leading-tight select-none font-sans" style={{ fontFamily: "var(--font-geist-mono), sans-serif" }}>
                                        {currentTrack.title}
                                    </h2>
                                    <p className="text-white/50 text-base font-medium select-none">
                                        {currentTrack.artist}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max={currentTrack.durationMs}
                                        value={progressMs}
                                        onChange={handleSeek}
                                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer
                                                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 
                                                 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full 
                                                 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg
                                                 hover:[&::-webkit-slider-thumb]:scale-125 transition-all
                                                 active:[&::-webkit-slider-thumb]:scale-110"
                                        style={{
                                            background: `linear-gradient(to right, white ${(progressMs / currentTrack.durationMs) * 100}%, rgba(255,255,255,0.1) ${(progressMs / currentTrack.durationMs) * 100}%)`
                                        }}
                                    />
                                    <div className="flex justify-between text-[11px] font-medium text-white/40 select-none font-mono">
                                        <span>{formatTime(progressMs)}</span>
                                        <span>{formatTime(currentTrack.durationMs)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-8">
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handlePrev}
                                        className="text-white/60 hover:text-white transition-colors p-2"
                                    >
                                        <FiSkipBack size={28} className="fill-current" />
                                    </motion.button>

                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={onTogglePlay}
                                        className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-xl shadow-white/10 hover:scale-105 transition-all"
                                    >
                                        {isPlaying ? <IoPauseSharp size={32} /> : <IoPlaySharp size={32} className="ml-1" />}
                                    </motion.button>

                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleNext}
                                        className="text-white/60 hover:text-white transition-colors p-2"
                                    >
                                        <FiSkipForward size={28} className="fill-current" />
                                    </motion.button>
                                </div>

                                <div className="flex items-center gap-3 mt-2 px-2">
                                    <button onClick={onMuteToggle} className="text-white/40 hover:text-white transition-colors">
                                        {isMuted || volume === 0 ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={isMuted ? 0 : volume}
                                        onChange={(e) => onVolumeChange(Number(e.target.value))}
                                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer
                                                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 
                                                 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full 
                                                 [&::-webkit-slider-thumb]:bg-white
                                                 hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                                        style={{
                                            background: `linear-gradient(to right, white ${isMuted ? 0 : volume}%, rgba(255,255,255,0.1) ${isMuted ? 0 : volume}%)`
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex-1 mt-2 mb-2 overflow-y-auto pr-2 custom-scrollbar">
                                <h3 className="text-xs uppercase tracking-wider text-white/30 font-semibold mb-3">Up Next</h3>
                                <div className="flex flex-col gap-1">
                                    {PLAYLIST.map((track, idx) => (
                                        <div
                                            key={track.id}
                                            onClick={() => {
                                                setCurrentTrackIndex(idx);
                                                if (!isPlaying) onTogglePlay();
                                            }}
                                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${idx === currentTrackIndex
                                                    ? 'bg-white/10 text-white'
                                                    : 'hover:bg-white/5 text-white/50 hover:text-white/80'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                {idx === currentTrackIndex && isPlaying ? (
                                                    <div className="flex gap-[2px] w-4 h-3 items-end shrink-0">
                                                        <motion.div animate={{ height: ["3px", "8px", "4px"] }} transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }} className="w-1 bg-[#F4D03F] rounded-t-sm" />
                                                        <motion.div animate={{ height: ["6px", "12px", "5px"] }} transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }} className="w-1 bg-[#F4D03F] rounded-t-sm" />
                                                        <motion.div animate={{ height: ["4px", "10px", "6px"] }} transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }} className="w-1 bg-[#F4D03F] rounded-t-sm" />
                                                    </div>
                                                ) : (
                                                    <span className="text-xs font-mono w-4 text-center">{idx + 1}</span>
                                                )}
                                                <div className="flex flex-col truncate">
                                                    <span className="text-sm font-medium truncate">{track.title}</span>
                                                    <span className="text-xs opacity-60 truncate">{track.artist}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-mono opacity-50 shrink-0 ml-4">{track.duration}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
