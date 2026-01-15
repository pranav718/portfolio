'use client';

import { SCENE_POSITIONS } from '@/utils/constants';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface GlowingStarsProps {
    visible: boolean;
}

interface StarData {
    position: THREE.Vector3;
    baseY: number;
    phase: number;
    speed: number;
    scale: number;
}

function Star({ position, phase, speed, scale }: { position: THREE.Vector3; phase: number; speed: number; scale: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.position.y = position.y + Math.sin(time * speed + phase) * 0.02;

            const twinkle = 0.7 + Math.sin(time * 3 + phase) * 0.3;
            (meshRef.current.material as THREE.MeshBasicMaterial).opacity = twinkle;

            meshRef.current.rotation.z = time * 0.5 + phase;

            if (glowRef.current) {
                glowRef.current.intensity = 0.15 + Math.sin(time * 2 + phase) * 0.1;
            }
        }
    });

    return (
        <group position={position}>
            <mesh ref={meshRef} scale={scale}>
                <octahedronGeometry args={[0.015, 0]} />
                <meshBasicMaterial
                    color="#FFD700"
                    transparent
                    opacity={0.9}
                />
            </mesh>

            <pointLight
                ref={glowRef}
                color="#FFE066"
                intensity={0.2}
                distance={0.3}
            />

            <mesh scale={scale * 1.5}>
                <ringGeometry args={[0.02, 0.025, 4]} />
                <meshBasicMaterial
                    color="#FFD700"
                    transparent
                    opacity={0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}

export default function GlowingStars({ visible }: GlowingStarsProps) {
    const groupRef = useRef<THREE.Group>(null);
    const notebookPos = SCENE_POSITIONS.notebook;

    const stars = useMemo<StarData[]>(() => {
        const starData: StarData[] = [];
        const count = 5;

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const radius = 0.15 + Math.random() * 0.1;
            const height = 0.25 + Math.random() * 0.1;

            starData.push({
                position: new THREE.Vector3(
                    Math.cos(angle) * radius,
                    height,
                    Math.sin(angle) * radius
                ),
                baseY: height,
                phase: (i / count) * Math.PI * 2,
                speed: 1 + Math.random() * 0.5,
                scale: 0.8 + Math.random() * 0.4,
            });
        }

        return starData;
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            const targetOpacity = visible ? 1 : 0;
            groupRef.current.visible = visible || groupRef.current.scale.x > 0.01;

            const currentScale = groupRef.current.scale.x;
            const newScale = THREE.MathUtils.lerp(currentScale, targetOpacity, 0.05);
            groupRef.current.scale.setScalar(newScale);
        }
    });

    return (
        <group
            ref={groupRef}
            position={[notebookPos[0], notebookPos[1], notebookPos[2]]}
        >
            {stars.map((star, i) => (
                <Star
                    key={i}
                    position={star.position}
                    phase={star.phase}
                    speed={star.speed}
                    scale={star.scale}
                />
            ))}

            <pointLight
                position={[0, 0.3, 0]}
                color="#FFE066"
                intensity={0.3}
                distance={1}
            />
        </group>
    );
}
