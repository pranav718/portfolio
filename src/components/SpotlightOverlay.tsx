'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

interface SpotlightOverlayProps {
    isLightOn: boolean;
}

export default function SpotlightOverlay({ isLightOn }: SpotlightOverlayProps) {
    const { scrollY } = useScroll();

    const lightRadius = useTransform(scrollY, [0, 500], [450, 800]);

    if (!isLightOn) {
        return null;
    }

    return (
        <>
            <motion.div
                className="spotlight-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    background: useTransform(
                        lightRadius,
                        (r) => `radial-gradient(
                            circle at 50% 180px,
                            rgba(0, 0, 0, 0) 0%,
                            rgba(0, 0, 0, 0.1) ${r * 0.3}px,
                            rgba(0, 0, 0, 0.4) ${r * 0.6}px,
                            rgba(0, 0, 0, 0.7) ${r}px,
                            rgba(0, 0, 0, 0.85) ${r * 1.2}px,
                            rgba(0, 0, 0, 0.92) 100%
                        )`
                    )
                }}
            />

            <style jsx>{`
        .spotlight-overlay {
          position: fixed;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }
      `}</style>
        </>
    );
}
