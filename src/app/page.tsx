'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ComingSoon() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      style={{ background: '#050505' }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {mounted && Array.from({ length: 80 }).map((_, i) => {
          const size = 1 + Math.random() * 1.5;
          const isLarger = Math.random() > 0.85;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${isLarger ? size + 1 : size}px`,
                height: `${isLarger ? size + 1 : size}px`,
                background: isLarger
                  ? 'rgba(255, 255, 255, 0.8)'
                  : `rgba(255, 255, 255, ${0.15 + Math.random() * 0.4})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: isLarger ? '0 0 4px rgba(255, 255, 255, 0.4)' : 'none',
                animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          );
        })}
      </div>

      <div
        className="relative z-10 text-center px-6 max-w-lg transition-all duration-1000"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <div className="mb-10 relative inline-block">
          <div className="relative w-20 h-20 mx-auto">
            <img
              src="/images/avatar.jpg"
              alt="Pranav"
              className="w-20 h-20 rounded-full object-cover"
              style={{
                border: '2px solid rgba(244, 208, 63, 0.2)',
                boxShadow: '0 0 30px rgba(244, 208, 63, 0.08), 0 0 60px rgba(244, 208, 63, 0.04)',
              }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, transparent 40%, rgba(244, 208, 63, 0.1) 100%)',
              }}
            />
          </div>
        </div>

        <h1
          className="mb-4"
          style={{
            fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#FFF8E7',
            letterSpacing: '0.02em',
            lineHeight: 1.2,
          }}
        >
          personal space
        </h1>

        <div
          className="mx-auto mb-6"
          style={{
            width: '40px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(244, 208, 63, 0.4), transparent)',
          }}
        />

        <p
          className="mb-3 font-mono"
          style={{
            color: 'rgba(255, 255, 255, 0.35)',
            fontSize: '13px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          coming soon
        </p>

        <p
          className="mb-10"
          style={{
            fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
            color: 'rgba(244, 208, 63, 0.5)',
            fontSize: '16px',
            lineHeight: 1.6,
          }}
        >
          an interactive 3D space where you can explore,<br />
          play music, and discover what i&apos;m up to
        </p>

        <Link
          href="/portfolio"
          className="inline-block no-underline transition-all duration-500 group"
          style={{
            padding: '14px 36px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(244, 208, 63, 0.1) 0%, rgba(255, 179, 71, 0.06) 100%)',
            border: '1px solid rgba(244, 208, 63, 0.2)',
            color: '#F4D03F',
            fontSize: '14px',
            fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
            letterSpacing: '0.04em',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(244, 208, 63, 0.18) 0%, rgba(255, 179, 71, 0.12) 100%)';
            e.currentTarget.style.borderColor = 'rgba(244, 208, 63, 0.4)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(244, 208, 63, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(244, 208, 63, 0.1) 0%, rgba(255, 179, 71, 0.06) 100%)';
            e.currentTarget.style.borderColor = 'rgba(244, 208, 63, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          visit my portfolio 
        </Link>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
      `}</style>
    </main>
  );
}
