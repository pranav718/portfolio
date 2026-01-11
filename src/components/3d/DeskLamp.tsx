'use client';

import { SCENE_POSITIONS } from '@/utils/constants';
import { Html, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface DeskLampProps {
    onPull: () => void;
    lampOn: boolean;
}

function LampModel({ lampOn }: { lampOn: boolean }) {
    const { scene } = useGLTF('/models/desk-lamp.glb');
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
        if (modelRef.current) {
            modelRef.current.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material) {
                    const mat = child.material as THREE.MeshStandardMaterial;
                    if (mat.emissive) {
                        mat.emissiveIntensity = THREE.MathUtils.lerp(
                            mat.emissiveIntensity || 0,
                            lampOn ? 1.5 : 0,
                            0.08
                        );
                    }
                }
            });
        }
    });

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={0.8}
            position={[0, 0, 0]}
            rotation={[0, Math.PI * 0.75, 0]}
        />
    );
}

export default function DeskLamp({ onPull, lampOn }: DeskLampProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const [pulled, setPulled] = useState(false);

    const handleClick = () => {
        if (pulled || lampOn) return;
        setPulled(true);
        setTimeout(() => onPull(), 80);
    };

    return (
        <group ref={groupRef} position={SCENE_POSITIONS.lamp}>
            <Suspense fallback={
                <mesh position={[0, 0.3, 0]}>
                    <boxGeometry args={[0.15, 0.6, 0.15]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            }>
                <LampModel lampOn={lampOn} />
            </Suspense>

            <mesh
                position={[0, 0.4, 0]}
                onPointerEnter={() => {
                    if (!lampOn) {
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
                <boxGeometry args={[0.6, 1.0, 0.5]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {!lampOn && (
                <Html position={[0, 0.9, 0.2]} center>
                    <div
                        className={`bg-black/95 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none transition-all duration-200 border shadow-xl ${hovered ? 'border-yellow-400 bg-yellow-900/70 scale-110' : 'border-white/10'}`}
                    >
                        {hovered ? 'Click!' : 'Click lamp'}
                    </div>
                </Html>
            )}
        </group>
    );
}

useGLTF.preload('/models/desk-lamp.glb');
