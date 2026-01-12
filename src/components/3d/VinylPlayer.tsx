'use client';

import { SCENE_POSITIONS } from '@/utils/constants';
import { Html, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface VinylPlayerProps {
    isPlaying: boolean;
    onToggle: () => void;
    lampOn: boolean;
}

function VinylModel({ isPlaying }: { isPlaying: boolean }) {
    const { scene } = useGLTF('/models/vinyl_player.glb');
    const modelRef = useRef<THREE.Group>(null);

    useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    useFrame(() => {
        if (modelRef.current && isPlaying) {
            // If there's a disc/record in the model, we can animate it
        }
    });

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={1.0}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
        />
    );
}

function FallbackVinyl() {
    return (
        <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 0.1, 0.3]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
        </mesh>
    );
}

export default function VinylPlayer({ isPlaying, onToggle, lampOn }: VinylPlayerProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    const handleClick = () => {
        if (!lampOn) return;
        onToggle();
    };

    return (
        <group ref={groupRef} position={SCENE_POSITIONS.vinylPlayer}>
            <Suspense fallback={<FallbackVinyl />}>
                <VinylModel isPlaying={isPlaying} />
            </Suspense>

            <mesh
                position={[0, 0.1, 0]}
                onPointerEnter={() => {
                    if (lampOn) {
                        setHovered(true);
                        document.body.style.cursor = 'pointer';
                    }
                }}
                onPointerLeave={() => {
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
                onClick={handleClick}
            >
                <boxGeometry args={[0.5, 0.3, 0.4]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {lampOn && (
                <Html position={[0, 0.3, 0.15]} center>
                    <div
                        className={`bg-black/95 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap pointer-events-none transition-all duration-200 border shadow-xl ${hovered ? 'border-yellow-400 bg-yellow-900/70 scale-110' : 'border-white/10'}`}
                    >
                        {isPlaying ? '⏸ Pause' : '▶ Play'}
                    </div>
                </Html>
            )}
        </group>
    );
}

useGLTF.preload('/models/vinyl_player.glb');
