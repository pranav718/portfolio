'use client';

import { COLORS, SCENE_POSITIONS } from '@/utils/constants';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface NotebookProps {
    isOpen: boolean;
    onOpen: () => void;
    lampOn: boolean;
    currentPage: number;
}

export default function Notebook({ isOpen, onOpen, lampOn, currentPage }: NotebookProps) {
    const groupRef = useRef<THREE.Group>(null);
    const coverRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    const handleOpen = () => {
        if (!lampOn || isOpen) return;

        if (coverRef.current) {
            gsap.to(coverRef.current.rotation, {
                x: -Math.PI * 0.4,
                duration: 0.8,
                ease: 'power2.out',
            });
        }

        onOpen();
    };

    useFrame(() => {
        if (groupRef.current && lampOn && !isOpen) {
            const scale = hovered ? 1.02 : 1;
            groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, scale, 0.1);
            groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, scale, 0.1);
        }
    });

    return (
        <group ref={groupRef} position={SCENE_POSITIONS.notebook}>
            <mesh castShadow receiveShadow position={[0, 0.02, 0]}>
                <boxGeometry args={[0.6, 0.04, 0.8]} />
                <meshStandardMaterial color={COLORS.cream} roughness={0.9} />
            </mesh>
            <mesh
                ref={coverRef}
                position={[0, 0.045, -0.4]}
                rotation={[0, 0, 0]}
                castShadow
                onPointerEnter={() => {
                    if (lampOn && !isOpen) {
                        setHovered(true);
                        document.body.style.cursor = 'pointer';
                    }
                }}
                onPointerLeave={() => {
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
                onClick={handleOpen}
            >
                <boxGeometry args={[0.62, 0.01, 0.82]} />
                <meshStandardMaterial
                    color="#5D4037"
                    roughness={0.4}
                    metalness={0.1}
                />
                
                <mesh position={[0, 0, 0.41]}>
                    <boxGeometry args={[0.62, 0.01, 0.01]} />
                    <meshStandardMaterial color="#4E342E" />
                </mesh>
            </mesh>

            
            <mesh position={[0, 0.025, -0.41]} castShadow>
                <boxGeometry args={[0.62, 0.05, 0.02]} />
                <meshStandardMaterial color="#4E342E" roughness={0.5} />
            </mesh>

            
            {isOpen && (
                <group position={[0, 0.045, 0.1]}>
                    {[...Array(8)].map((_, i) => (
                        <mesh key={i} position={[0, 0.001, -0.25 + i * 0.08]}>
                            <boxGeometry args={[0.5, 0.001, 0.002]} />
                            <meshStandardMaterial color="#ccc" />
                        </mesh>
                    ))}
                </group>
            )}

            
            {isOpen && (
                <Html
                    position={[0, 0.06, 0.1]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    transform
                    occlude
                    scale={0.05}
                >
                    <div
                        className="w-[500px] h-[700px] bg-[#FFF8E7] p-8 font-serif pointer-events-none"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                        <h1 className="text-3xl text-[#3E2723] mb-4">Welcome</h1>
                        <p className="text-[#5D4037] text-lg leading-relaxed">
                            to my portfolio journal
                        </p>
                        <p className="text-sm text-[#8B7355] mt-4">
                            Page {currentPage + 1}
                        </p>
                    </div>
                </Html>
            )}

            
            {hovered && lampOn && !isOpen && (
                <Html position={[0, 0.2, 0]} center>
                    <div className="bg-black/80 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap pointer-events-none">
                        Click to open journal
                    </div>
                </Html>
            )}

            
            {lampOn && !isOpen && (
                <mesh position={[0, 0.001, 0]}>
                    <planeGeometry args={[0.7, 0.9]} />
                    <meshBasicMaterial
                        color={COLORS.warmYellow}
                        transparent
                        opacity={hovered ? 0.15 : 0.05}
                    />
                </mesh>
            )}
        </group>
    );
}
