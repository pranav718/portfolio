'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Bulb3D = dynamic(() => import('./Bulb3D'), { ssr: false });

interface LightBulbProps {
  onToggle?: (isOn: boolean) => void;
  initialOn?: boolean;
}

export default function LightBulb({ onToggle, initialOn = true }: LightBulbProps) {
  const [isOn, setIsOn] = useState(initialOn);
  const [isDragging, setIsDragging] = useState(false);

  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 300, damping: 15 });
  const rotateZ = useTransform(springY, [-50, 0, 50], [-6, 0, 6]);

  const handleDragEnd = () => {
    setIsDragging(false);
    if (y.get() > 60) {
      const newState = !isOn;
      setIsOn(newState);
      onToggle?.(newState);
    }
    y.set(0);
  };

  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        const randomSwing = (Math.random() - 0.5) * 1.5;
        rotateZ.set(randomSwing);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isDragging, rotateZ]);

  return (
    <div className="light-bulb-container">
      <div className="ceiling-mount" />

      <motion.div
        className="wire-segment"
        style={{
          height: 80,
          scaleY: useTransform(springY, [0, 100], [1, 1.3]),
          originY: 0
        }}
      />

      <motion.div
        className="bulb-wrapper"
        drag="y"
        dragConstraints={{ top: 0, bottom: 120 }}
        dragElastic={0.2}
        style={{ y: springY, rotateZ }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.02 }}
      >
        <div className="socket">
          <div className="thread"></div>
          <div className="thread"></div>
          <div className="thread"></div>
          <div className="socket-base"></div>
        </div>

        <div className={`glass-bulb ${isOn ? 'on' : 'off'}`}>
          <div className="inner-glow"></div>

          <div className="filament-assembly">
            <div className="stem stem-left"></div>
            <div className="stem stem-right"></div>

            <div className="filament">
              <div className="coil"></div>
              <div className="coil coil-2"></div>
              <div className="coil coil-3"></div>
            </div>
          </div>

          <div className="glass-highlight"></div>
          <div className="glass-reflection"></div>
        </div>

        {isOn && <div className="outer-glow"></div>}

        {isDragging && (
          <motion.div
            className="pull-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {y.get() > 60 ? 'Release!' : 'Pull down'}
          </motion.div>
        )}
      </motion.div>

      {isOn && (
        <motion.div
          className="light-cone"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <style jsx>{`
        .light-bulb-container {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
        }

        .ceiling-mount {
          width: 40px;
          height: 10px;
          background: linear-gradient(180deg, #3a3a3a, #1a1a1a);
          border-radius: 0 0 6px 6px;
          box-shadow: 
            0 2px 8px rgba(0,0,0,0.4),
            inset 0 -2px 4px rgba(0,0,0,0.5);
          z-index: 102;
        }

        .wire-segment {
          width: 2px;
          background: linear-gradient(90deg, #111, #222, #111);
          box-shadow: 1px 0 2px rgba(0,0,0,0.5);
          margin-top: -1px;
          z-index: 101;
        }

        .bulb-wrapper {
          cursor: grab;
          pointer-events: auto;
          position: relative;
          z-index: 103;
          margin-top: -10px;
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.3));
        }

        .bulb-wrapper:active {
          cursor: grabbing;
        }

        /* Socket/Screw Cap */
        .socket {
          position: relative;
          width: 35px;
          height: 32px;
          background: linear-gradient(135deg, #b8a88a 0%, #8b7e6a 50%, #6d6352 100%);
          border-radius: 6px 6px 3px 3px;
          margin: 0 auto;
          box-shadow: 
            0 3px 6px rgba(0,0,0,0.3),
            inset 0 -1px 3px rgba(0,0,0,0.2),
            inset 0 2px 4px rgba(255,255,255,0.1);
        }

        .thread {
          position: absolute;
          width: 100%;
          height: 4px;
          background: #9a8366;
          border-radius: 50%;
          box-shadow: 
            0 1px 2px rgba(0,0,0,0.3),
            inset 0 -1px 1px rgba(0,0,0,0.3);
        }

        .thread:nth-child(1) { top: 10px; }
        .thread:nth-child(2) { top: 20px; }
        .thread:nth-child(3) { top: 30px; }

        .socket-base {
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 42px;
          height: 8px;
          background: linear-gradient(180deg, #7a6e5a, #5a5040);
          border-radius: 0 0 4px 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.4);
        }

        /* Glass Bulb */
        .glass-bulb {
          position: relative;
          width: 50px;
          height: 70px;
          margin: -5px auto 0;
          background: radial-gradient(ellipse at 50% 40%, 
            rgba(255, 255, 255, 0.15), 
            rgba(255, 255, 255, 0.05) 60%,
            rgba(200, 200, 200, 0.08));
          border-radius: 50% 50% 48% 48% / 60% 60% 45% 45%;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            inset 0 0 20px rgba(255,255,255,0.1),
            inset -10px -10px 30px rgba(0,0,0,0.05),
            0 8px 16px rgba(0,0,0,0.2);
          overflow: visible;
          transition: all 0.3s ease;
        }

        .glass-bulb.on {
          background: radial-gradient(ellipse at 50% 50%, 
            rgba(255, 240, 200, 0.4), 
            rgba(255, 220, 150, 0.2) 60%,
            rgba(255, 200, 100, 0.1));
          box-shadow: 
            inset 0 0 40px rgba(255,220,100,0.5),
            inset -10px -10px 30px rgba(255,180,50,0.2),
            0 0 60px rgba(255, 200, 80, 0.6),
            0 0 100px rgba(255, 180, 50, 0.4),
            0 8px 16px rgba(0,0,0,0.2);
        }

        /* Inner Glow */
        .inner-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: 60%;
          background: radial-gradient(circle, rgba(255,200,80,0), rgba(255,200,80,0));
          border-radius: 50%;
          filter: blur(8px);
          transition: background 0.3s ease;
          pointer-events: none;
        }

        .glass-bulb.on .inner-glow {
          background: radial-gradient(circle, 
            rgba(255,220,100,0.6) 0%, 
            rgba(255,180,50,0.3) 40%,
            rgba(255,150,0,0) 70%);
        }

        /* Filament Assembly */
        .filament-assembly {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 26px;
          height: 52px;
        }

        .stem {
          position: absolute;
          width: 1.5px;
          height: 45px;
          background: linear-gradient(180deg, #999, #666);
          top: 5px;
        }

        .stem-left {
          left: 12px;
          transform: rotate(-8deg);
        }

        .stem-right {
          right: 12px;
          transform: rotate(8deg);
        }

        /* Tungsten Filament Coil */
        .filament {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 26px;
        }

        .coil {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 13px;
          height: 2px;
          background: #888;
          border-radius: 50%;
          box-shadow: 
            inset 0 -1px 1px rgba(0,0,0,0.3),
            0 0 2px rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }

        .glass-bulb.on .coil {
          background: #ff8800;
          box-shadow: 
            0 0 10px rgba(255,136,0,0.8),
            0 0 20px rgba(255,100,0,0.6),
            inset 0 -1px 2px rgba(100,50,0,0.8);
        }

        .coil:nth-child(1) { top: 5px; width: 14px; }
        .coil-2 { top: 10px; width: 15px; }
        .coil-3 { top: 15px; width: 14px; }

        /* Glass Highlights for Realism */
        .glass-highlight {
          position: absolute;
          top: 15%;
          left: 20%;
          width: 16px;
          height: 35px;
          background: linear-gradient(135deg, 
            rgba(255,255,255,0.8) 0%, 
            rgba(255,255,255,0.4) 30%,
            rgba(255,255,255,0) 60%);
          border-radius: 50% 30% 50% 30%;
          transform: rotate(-25deg);
          filter: blur(1px);
          pointer-events: none;
        }

        .glass-reflection {
          position: absolute;
          bottom: 20%;
          right: 18%;
          width: 10px;
          height: 16px;
          background: linear-gradient(225deg, 
            rgba(255,255,255,0.5) 0%, 
            rgba(255,255,255,0) 60%);
          border-radius: 50%;
          transform: rotate(15deg);
          filter: blur(2px);
          pointer-events: none;
        }

        /* Outer Glow when ON */
        .outer-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 140px;
          background: radial-gradient(ellipse, 
            rgba(255,220,80,0.5) 0%, 
            rgba(255,200,50,0.3) 40%,
            rgba(255,180,30,0.15) 70%,
            rgba(255,150,0,0) 90%);
          border-radius: 50%;
          filter: blur(25px);
          animation: pulse 2s ease-in-out infinite;
          pointer-events: none;
          z-index: -1;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.05); }
        }

        .pull-hint {
          position: absolute;
          bottom: -45px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.85);
          color: #fff;
          padding: 6px 12px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          white-space: nowrap;
          pointer-events: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .light-cone {
          position: absolute;
          top: 140px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 800px solid transparent;
          border-right: 800px solid transparent;
          border-top: 1400px solid rgba(255, 220, 100, 0.18);
          filter: blur(70px);
          z-index: 90;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
