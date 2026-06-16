import type { ReactNode } from 'react';

interface ObjectHintProps {
    children: ReactNode;
}

export default function ObjectHint({ children }: ObjectHintProps) {
    return (
        <div
            style={{
                padding: '7px 11px',
                borderRadius: '999px',
                border: '1px solid rgba(244, 208, 63, 0.35)',
                background: 'rgba(16, 11, 7, 0.68)',
                color: 'rgba(255, 248, 231, 0.9)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35), 0 0 18px rgba(244, 208, 63, 0.12), inset 0 1px 0 rgba(255, 248, 231, 0.08)',
                backdropFilter: 'blur(10px)',
                fontFamily: "var(--font-geist-mono), 'JetBrains Mono', monospace",
                fontSize: '11px',
                lineHeight: 1,
                letterSpacing: '0.08em',
                textTransform: 'lowercase',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                animation: 'fadeIn 0.18s ease-out forwards',
            }}
        >
            {children}
        </div>
    );
}
