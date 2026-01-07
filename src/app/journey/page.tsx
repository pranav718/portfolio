"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function JourneyPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at center, #FDF8F3 0%, #F5EDE4 50%, #F4E9DC 100%)`,
                }}
            />

            <main className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <h1
                        className="ink-text text-4xl sm:text-5xl md:text-6xl mb-8"
                        style={{ fontFamily: "var(--font-caveat)", fontWeight: 600 }}
                    >
                        The 3D Desk Experience
                    </h1>

                    <p
                        className="text-xl text-[#6B5D4D] mb-4"
                        style={{ fontFamily: "var(--font-caveat)" }}
                    >
                        Coming soon...
                    </p>

                    <p className="text-[#9C8D7D] mb-12" style={{ fontFamily: "var(--font-inter)" }}>
                        An immersive journey through a 3D desk with an interactive journal.
                        Explore my work in a unique way.
                    </p>

                    <Link
                        href="/portfolio"
                        className="inline-block text-lg text-[#2C2418] hover:text-[#8B7355] transition-colors"
                        style={{ fontFamily: "var(--font-caveat)" }}
                    >
                         Browse the static portfolio instead
                    </Link>
                </motion.div>
            </main>
        </div>
    );
}
