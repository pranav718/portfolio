"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const lineSpacing = 46;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/paper-texture.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'sepia(0.15) saturate(1.2) blur(0.5px)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `rgba(240, 215, 170, 0.45)`,
          mixBlendMode: 'multiply',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent ${lineSpacing - 1}px,
            rgba(10, 10, 10, 0.25) ${lineSpacing - 1}px,
            rgba(10, 10, 10, 0.25) ${lineSpacing}px
          )`,
        }}
      />

      <main
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8"
      >
        <div className="text-center">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
            style={{
              fontFamily: "var(--font-caveat)",
              color: "#0a0a0a",
              fontSize: '32px',
              lineHeight: `${lineSpacing}px`,
              marginBottom: 0,
              transform: 'translateY(4px)',
            }}
          >
            Hey,
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              fontFamily: "var(--font-caveat)",
              fontWeight: 600,
              color: "#0a0a0a",
              fontSize: 'clamp(40px, 6vw, 64px)',
              lineHeight: `${lineSpacing}px`,
              marginBottom: 0,
              transform: 'translateY(4px)',
            }}
          >
            I&apos;m Pranav Ray,
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: "var(--font-caveat)",
              fontWeight: 600,
              color: "#0a0a0a",
              fontSize: 'clamp(40px, 6vw, 64px)',
              lineHeight: `${lineSpacing}px`,
              marginBottom: `${lineSpacing * 2}px`,
              transform: 'translateY(4px)',
            }}
          >
            I build projects and work on OSS
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
            style={{
              lineHeight: `${lineSpacing}px`,
              transform: 'translateY(4px)',
            }}
          >
            <Link href="/journey" className="group">
              <span
                className="relative cursor-pointer inline-block transition-colors duration-300 group-hover:text-[#4a4a4a]"
                style={{
                  fontFamily: "var(--font-caveat)",
                  fontWeight: 600,
                  fontSize: '28px',
                  color: "#0a0a0a",
                }}
              >
                 Take the immersive journey
                <span
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                />
              </span>
            </Link>

            <Link href="/portfolio" className="group">
              <span
                className="relative cursor-pointer inline-block transition-colors duration-300 group-hover:text-[#0a0a0a]"
                style={{
                  fontFamily: "var(--font-caveat)",
                  fontWeight: 500,
                  fontSize: '28px',
                  color: "#3a3a3a",
                }}
              >
                Browse the portfolio 
                <span
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                />
              </span>
            </Link>
          </motion.div>

          <div style={{ height: `${lineSpacing * 3}px` }} />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: '13px',
              color: '#555',
              lineHeight: `${lineSpacing}px`,
              transform: 'translateY(4px)',
            }}
          >
            The immersive experience works best on desktop
          </motion.p>
        </div>
      </main>
    </div>
  );
}
