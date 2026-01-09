'use client';

import { COLORS, SCENE_POSITIONS } from '@/utils/constants';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface VinylPlayerProps {
    isPlaying: boolean;
    onToggle: () => void;
}

export default function VinylPlayer({ isPlaying, onToggle }: VinylPlayerProps) {
    const groupRef = useRef<THREE.Group>(null);
    const discRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame(() => {
        if (discRef.current && isPlaying) {
            discRef.current.rotation.y += 0.02;
        }
    });

    return (
        <group ref={groupRef} position={SCENE_POSITIONS.vinylPlayer}>
            
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.5, 0.08, 0.5]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.6} />
            </mesh>

            
            <mesh position={[0.05, 0.05, 0]} castShadow>
                <cylinderGeometry args={[0.18, 0.18, 0.02, 32]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.7} />
            </mesh>

            
            <mesh
                ref={discRef}
                position={[0.05, 0.07, 0]}
                rotation={[0, 0, 0]}
                onPointerEnter={() => {
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerLeave={() => {
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
                onClick={onToggle}
                castShadow
            >
                <cylinderGeometry args={[0.15, 0.15, 0.005, 32]} />
                <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />

                
                <mesh position={[0, 0.003, 0]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.002, 32]} />
                    <meshStandardMaterial color={COLORS.softOrange} roughness={0.5} />
                </mesh>
            </mesh>

            
            <mesh position={[-0.15, 0.06, -0.15]} castShadow>
                <cylinderGeometry args={[0.025, 0.025, 0.04, 16]} />
                <meshStandardMaterial color="#3a3a3a" metalness={0.9} roughness={0.2} />
            </mesh>

            
            <mesh
                position={[-0.05, 0.09, 0]}
                rotation={[0, -0.3, 0]}
                castShadow
            >
                <boxGeometry args={[0.2, 0.008, 0.01]} />
                <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.2} />
            </mesh>

            
            <mesh position={[0.18, 0.05, 0.18]} castShadow>
                <cylinderGeometry args={[0.015, 0.015, 0.02, 16]} />
                <meshStandardMaterial
                    color={isPlaying ? '#22c55e' : '#ef4444'}
                    emissive={isPlaying ? '#22c55e' : '#ef4444'}
                    emissiveIntensity={0.5}
                />
            </mesh>

            
            {hovered && (
                <Html position={[0, 0.25, 0]} center>
                    <div className="bg-black/80 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap pointer-events-none">
                        {isPlaying ? '⏸ Pause' : '▶ Play'} Music
                    </div>
                </Html>
            )}
        </group>
    );
}
