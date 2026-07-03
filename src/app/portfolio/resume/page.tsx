'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';

export default function ResumePage() {
    const [copied, setCopied] = useState(false);

    const copyLink = useCallback(() => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, []);

    const downloadPdf = useCallback(async () => {
        try {
            const res = await fetch('/pranav_ray_resume.pdf');
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'pranav_ray_resume.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch {
            window.open('/pranav_ray_resume.pdf', '_blank');
        }
    }, []);

    return (
        <div className="h-screen w-screen flex flex-col bg-page">
            {/* Minimal top bar */}
            <div
                className="flex items-center justify-between px-4 py-2 shrink-0"
                style={{
                    background: 'var(--theme-nav-bg)',
                    backdropFilter: 'blur(32px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(32px) saturate(150%)',
                    borderBottom: '1px solid var(--theme-nav-border)',
                }}
            >
                <Link
                    href="/portfolio"
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs text-theme-secondary hover:text-theme-primary transition-colors"
                    style={{ fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" }}
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    back
                </Link>

                <span
                    className="text-xs text-theme-muted hidden sm:block"
                    style={{ fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" }}
                >
                    pranav_ray_resume.pdf
                </span>

                <div className="flex items-center gap-1">
                    <button
                        onClick={copyLink}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-theme-secondary hover:text-theme-primary hover:bg-theme-card transition-all cursor-pointer"
                        style={{ fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" }}
                        title="Copy shareable link"
                    >
                        {copied ? (
                            <>
                                <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>copied!</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                <span className="hidden sm:inline">copy link</span>
                            </>
                        )}
                    </button>

                    <button
                        onClick={downloadPdf}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-theme-secondary hover:text-theme-primary hover:bg-theme-card transition-all cursor-pointer"
                        style={{ fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" }}
                        title="Download PDF"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span className="hidden sm:inline">download</span>
                    </button>
                </div>
            </div>

            {/* PDF embed — fills remaining space */}
            <iframe
                src="/pranav_ray_resume.pdf"
                className="flex-1 w-full border-none"
                title="Pranav Ray Resume"
            />
        </div>
    );
}
