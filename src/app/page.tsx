"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

function HandwrittenText({
  text,
  delay = 0,
  charDelay = 0.05,
  onComplete,
}: {
  text: string;
  delay?: number;
  charDelay?: number;
  onComplete?: () => void;
}) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay * 1000);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayedChars < text.length) {
      const timer = setTimeout(() => {
        setDisplayedChars(prev => prev + 1);
      }, charDelay * 1000);
      return () => clearTimeout(timer);
    } else if (!completed) {
      setCompleted(true);
      onComplete?.();
    }
  }, [displayedChars, started, text.length, charDelay, completed, onComplete]);

  return (
    <span className="relative">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: i < displayedChars ? 1 : 0 }}
          transition={{ duration: 0.08 }}
          style={{ whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))}
      {started && !completed && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.7, repeat: Infinity }}
          className="inline-block w-[2px] h-[0.7em] bg-current ml-[2px] align-middle"
        />
      )}
    </span>
  );
}

export default function Home() {
  const [showButtons, setShowButtons] = useState(false);

  const line1 = "Hey,";
  const line2 = "I'm Pranav Ray,";
  const line3 = "I build projects and work on OSS";

  const charDelay = 0.05;
  const lineGap = 0.4;
  const line1Start = 0.5;
  const line2Start = line1Start + (line1.length * charDelay) + lineGap;
  const line3Start = line2Start + (line2.length * charDelay) + lineGap;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F5E6C8]">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, #FDF6E3 0%, #F5E6C8 50%, #EDD9B5 100%)`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 39px,
            rgba(0, 0, 0, 0.12) 39px,
            rgba(0, 0, 0, 0.12) 40px
          )`,
        }}
      />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 sm:px-8">
        <div className="w-full max-w-4xl">

          <div
            className="text-center mb-0"
            style={{ fontFamily: "var(--font-caveat)" }}
          >
            <span
              className="text-[28px] sm:text-[32px] text-[#0a0a0a] inline-block"
              style={{ lineHeight: '40px' }}
            >
              <HandwrittenText
                text={line1}
                delay={line1Start}
                charDelay={charDelay}
              />
            </span>
          </div>

          <div
            className="text-center mb-0"
            style={{ fontFamily: "var(--font-caveat)" }}
          >
            <span
              className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-semibold text-[#0a0a0a] inline-block"
              style={{ lineHeight: '40px' }}
            >
              <HandwrittenText
                text={line2}
                delay={line2Start}
                charDelay={charDelay}
              />
            </span>
          </div>

=          <div
            className="text-center mb-12 sm:mb-16"
            style={{ fontFamily: "var(--font-caveat)" }}
          >
            <span
              className="text-[28px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-semibold text-[#0a0a0a] inline-block"
              style={{ lineHeight: '40px' }}
            >
              <HandwrittenText
                text={line3}
                delay={line3Start}
                charDelay={charDelay}
                onComplete={() => setShowButtons(true)}
              />
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: showButtons ? 1 : 0, y: showButtons ? 0 : 15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
          >
            <Link href="/journey" className="group">
              <span
                className="relative text-[24px] sm:text-[28px] text-[#0a0a0a] cursor-pointer transition-colors hover:text-[#5a4a3a]"
                style={{ fontFamily: "var(--font-caveat)", fontWeight: 600 }}
              >
                Take the immersive journey
                <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </span>
            </Link>

            <Link href="/portfolio" className="group">
              <span
                className="relative text-[24px] sm:text-[28px] text-[#4a4a4a] cursor-pointer transition-colors hover:text-[#0a0a0a]"
                style={{ fontFamily: "var(--font-caveat)", fontWeight: 500 }}
              >
                Browse the portfolio
                <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </span>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showButtons ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-[12px] sm:text-[13px] text-[#666] mt-16 sm:mt-24"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            The immersive experience works best on desktop
          </motion.p>
        </div>
      </main>
    </div>
  );
}
