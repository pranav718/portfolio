'use client';

import { PAGES } from '@/utils/constants';
import { useEffect, useState } from 'react';

interface PageNavigatorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PageNavigator({
    currentPage,
    totalPages,
    onPageChange,
}: PageNavigatorProps) {
    const [visible, setVisible] = useState(true);
    const [lastActivity, setLastActivity] = useState(Date.now());

    useEffect(() => {
        const handleMouseMove = () => {
            setVisible(true);
            setLastActivity(Date.now());
        };

        window.addEventListener('mousemove', handleMouseMove);

        const interval = setInterval(() => {
            if (Date.now() - lastActivity > 3000) {
                setVisible(false);
            }
        }, 1000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, [lastActivity]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && currentPage > 0) {
                onPageChange(currentPage - 1);
            } else if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
                onPageChange(currentPage + 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPage, totalPages, onPageChange]);

    const sections = [
        { name: 'About', page: PAGES.aboutStart },
        { name: 'Projects', page: PAGES.projectsStart },
        { name: 'Skills', page: PAGES.skillsStart },
        { name: 'Contact', page: PAGES.contactStart },
    ];

    return (
        <div
            className={`fixed top-[15%] left-1/2 -translate-x-1/2 z-40
                  bg-black/40 backdrop-blur-md rounded-full px-6 py-3
                  flex items-center gap-4
                  transition-all duration-300 ${visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
        >
            
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="p-2 text-white/80 hover:text-white disabled:text-white/30 
                   disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            
            <span className="text-sm text-white/90 font-mono min-w-[80px] text-center">
                Page {currentPage + 1} / {totalPages}
            </span>

            
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="p-2 text-white/80 hover:text-white disabled:text-white/30 
                   disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            
            <div className="w-px h-6 bg-white/20 mx-2" />

            
            <div className="flex gap-2">
                {sections.map((section) => (
                    <button
                        key={section.name}
                        onClick={() => onPageChange(section.page)}
                        className={`px-3 py-1 text-xs rounded-full transition-all
                       ${currentPage >= section.page
                                ? 'bg-[#F4D03F]/30 text-[#F4D03F]'
                                : 'text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        {section.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
