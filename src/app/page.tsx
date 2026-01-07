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
    <span>
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

  const lineHeight = 40; 

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
            transparent ${lineHeight - 1}px,
            rgba(0, 0, 0, 0.15) ${lineHeight - 1}px,
            rgba(0, 0, 0, 0.15) ${lineHeight}px
          )`,
        }}
      />

      <main className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-8">
        <div
          className="w-full max-w-4xl"
          style={{
          }}
        >
          <div
            className="flex flex-col items-center"
            style={{ gap: 0 }}
          >
            <div
              className="w-full text-center"
              style={{
                height: `${lineHeight}px`,
                lineHeight: `${lineHeight}px`,
                fontFamily: "var(--font-caveat)",
                fontSize: 'clamp(24px, 5vw, 32px)',
                color: "#0a0a0a",
              }}
            >
              <HandwrittenText
                text={line1}
                delay={line1Start}
                charDelay={charDelay}
              />
            </div>

            <div
              className="w-full text-center"
              style={{
                height: `${lineHeight * 2}px`,
                lineHeight: `${lineHeight * 2}px`,
                fontFamily: "var(--font-caveat)",
                fontWeight: 600,
                fontSize: 'clamp(32px, 8vw, 64px)',
                color: "#0a0a0a",
              }}
            >
              <HandwrittenText
                text={line2}
                delay={line2Start}
                charDelay={charDelay}
              />
            </div>

            <div
              className="w-full text-center"
              style={{
                height: `${lineHeight * 2}px`,
                lineHeight: `${lineHeight * 2}px`,
                fontFamily: "var(--font-caveat)",
                fontWeight: 600,
                fontSize: 'clamp(24px, 6vw, 56px)',
                color: "#0a0a0a",
              }}
            >
              <HandwrittenText
                text={line3}
                delay={line3Start}
                charDelay={charDelay}
                onComplete={() => setShowButtons(true)}
              />
            </div>

            <div style={{ height: `${lineHeight}px` }} />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showButtons ? 1 : 0, y: showButtons ? 0 : 10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12"
              style={{
                height: `${lineHeight}px`,
                lineHeight: `${lineHeight}px`,
              }}
            >
              <Link href="/journey" className="group">
                <span
                  className="relative text-[20px] sm:text-[26px] text-[#0a0a0a] cursor-pointer transition-colors hover:text-[#5a4a3a]"
                  style={{ fontFamily: "var(--font-caveat)", fontWeight: 600 }}
                >
                  Take the immersive journey
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </span>
              </Link>

              <Link href="/portfolio" className="group">
                <span
                  className="relative text-[20px] sm:text-[26px] text-[#4a4a4a] cursor-pointer transition-colors hover:text-[#0a0a0a]"
                  style={{ fontFamily: "var(--font-caveat)", fontWeight: 500 }}
                >
                  Browse the portfolio
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </span>
              </Link>
            </motion.div>

            <div style={{ height: `${lineHeight * 2}px` }} />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: showButtons ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center text-[11px] sm:text-[13px] text-[#666]"
              style={{
                fontFamily: "var(--font-inter)",
                height: `${lineHeight}px`,
                lineHeight: `${lineHeight}px`,
              }}
            >
              The immersive experience works best on desktop
            </motion.p>
          </div>
        </div>
      </main>
    </div>
  );
}
