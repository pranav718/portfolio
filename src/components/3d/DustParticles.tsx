'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface DustParticlesProps {
    count?: number;
    lampOn: boolean;
}

export default function DustParticles({ count = 90, lampOn }: DustParticlesProps) {
    const pointsRef = useRef<THREE.Points>(null);
    const geoRef = useRef<THREE.BufferGeometry>(null);

    // Initial position, velocity and random phase offset for each particle
    const [positions, velocities, randoms, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const vels = [];
        const rands = [];

        for (let i = 0; i < count; i++) {
            // Scatter around the desk region: x [-1.8, 1.8], y [0.5, 2.5], z [-1.8, 1.8]
            pos[i * 3] = (Math.random() - 0.5) * 3.6;
            pos[i * 3 + 1] = Math.random() * 2.0 + 0.5;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 3.6;

            vels.push({
                x: (Math.random() - 0.5) * 0.04,
                y: (Math.random() - 0.1) * 0.03, // general slight upward float
                z: (Math.random() - 0.5) * 0.04,
            });

            rands.push(Math.random() * 100);

            // Default color (dim ambient light color)
            col[i * 3] = 0.02;
            col[i * 3 + 1] = 0.02;
            col[i * 3 + 2] = 0.02;
        }

        return [pos, vels, rands, col];
    }, [count]);

    useFrame((state) => {
        if (!geoRef.current) return;
        const posAttr = geoRef.current.getAttribute('position') as THREE.BufferAttribute;
        const colAttr = geoRef.current.getAttribute('color') as THREE.BufferAttribute;
        const time = state.clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
            let x = posAttr.getX(i);
            let y = posAttr.getY(i);
            let z = posAttr.getZ(i);

            // Apply slow continuous drift
            x += velocities[i].x * 0.08 + Math.sin(time * 0.3 + randoms[i]) * 0.0008;
            y += velocities[i].y * 0.08 + Math.cos(time * 0.2 + randoms[i]) * 0.0012;
            z += velocities[i].z * 0.08 + Math.sin(time * 0.4 + randoms[i]) * 0.0008;

            // Wrap coordinates inside boundaries
            if (x < -1.8) x = 1.8;
            if (x > 1.8) x = -1.8;
            if (y < 0.5) y = 2.5;
            if (y > 2.5) y = 0.5;
            if (z < -1.8) z = 1.8;
            if (z > 1.8) z = -1.8;

            posAttr.setXYZ(i, x, y, z);

            // Compute distance to the desk lamp bulb position [0.70, 1.35, -0.1]
            const dx = x - 0.70;
            const dy = y - 1.35;
            const dz = z - (-0.1);
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            let intensity = 0.03; // faint ambient visibility in dark
            if (lampOn) {
                // Bright warm light cone region falloff (max distance of influence is 1.4 units)
                const falloff = Math.max(0, 1 - dist / 1.4);
                // Inverse squared behavior for premium realism close to bulb
                intensity = 0.04 + Math.pow(falloff, 2.5) * 0.95;

                // Boost brightness further when inside the downward light beam cone
                if (dy < 0 && Math.abs(dx) < 0.8 && Math.abs(dz) < 0.8) {
                    intensity *= 1.35;
                }
            }

            // Warm golden glow tone: RGB [255, 232, 190]
            colAttr.setXYZ(
                i,
                (255 / 255) * intensity,
                (232 / 255) * intensity,
                (190 / 255) * intensity
            );
        }

        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry ref={geoRef}>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.016}
                vertexColors
                transparent
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
