'use client';

import BlogCard from '@/components/BlogCard';
import { blogs } from '@/data/blogs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BlogsPage() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const headingFont = { fontFamily: "'Outfit', sans-serif", fontWeight: 600 };
    const jetbrainsFont = { fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" };

    return (
        <div className="min-h-screen bg-black text-[#f5f5f5] overflow-y-auto overflow-x-hidden" style={jetbrainsFont}>
            <main
                className="relative transition-all duration-700 ease-out"
                style={{
                    filter: isLoaded ? 'blur(0px)' : 'blur(20px)',
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'scale(1)' : 'scale(1.02)',
                }}
            >

                <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                    <div
                        className="flex items-center gap-8 px-6 py-3 rounded-xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <Link href="/" className="hover:scale-105 transition-transform">
                            <img src="/images/avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-sm object-cover" />
                        </Link>
                        <Link href="/portfolio#projects" className="text-sm text-white/60 hover:text-white transition-colors">
                            projects
                        </Link>
                        <Link href="/portfolio#blog" className="text-sm text-white/60 hover:text-white transition-colors">
                            blog
                        </Link>
                    </div>
                </nav>

                <div className="max-w-2xl mx-auto px-6 pt-32 pb-20">
                    <div className="mb-10">
                        <Link href="/portfolio#blog" className="text-white/90 hover:text-white text-lg font-medium transition-colors inline-flex items-center gap-2">
                            <span className="text-xl">‹</span> Blogs
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
