'use client';

import { COLORS, SCENE_POSITIONS } from '@/utils/constants';
import { Html, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface NotebookProps {
    isOpen: boolean;
    onOpen: () => void;
    lampOn: boolean;
    currentPage: number;
}

function NotebookModel() {
    const { scene } = useGLTF('/models/notebook.glb');
    const modelRef = useRef<THREE.Group>(null);

    useEffect(() => {
        scene.traverse((child) => {
            if(child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={0.5}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
        />
    );
}

export default function Notebook({ isOpen, onOpen, lampOn, currentPage }: NotebookProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    const handleOpen = () => {
        if (!lampOn || isOpen) return;

        if (groupRef.current) {
            gsap.to(groupRef.current.scale, {
                x: 1.05,
                y: 1.05,
                z: 1.05,
                duration: 0.2,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.to(groupRef.current!.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.15,
                    });
                },
            });
        }

        onOpen();
    };

    useFrame(() => {
        if (groupRef.current && lampOn && !isOpen) {
            const scale = hovered ? 1.02 : 1;
            groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
        }
    });

    return (
        <group ref={groupRef} position={SCENE_POSITIONS.notebook}>
            <Suspense fallback={
                <mesh position={[0, 0.02, 0]}>
                    <boxGeometry args={[0.6, 0.04, 0.8]} />
                    <meshStandardMaterial color={COLORS.cream} />
                </mesh>
            }>
                <NotebookModel />
            </Suspense>

            <mesh
                position={[0, 0.1, 0]}
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
                <boxGeometry args={[0.8, 0.3, 1.0]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {lampOn && !isOpen && (
                <Html position={[0, 0.25, 0]} center>
                    <div
                        className={`bg-black/95 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none transition-all duration-200 border shadow-xl ${hovered ? 'border-yellow-400 bg-yellow-900/70 scale-110' : 'border-white/10'}`}
                    >
                        {hovered ? ' Click to open!' : ' My Journal'}
                    </div>
                </Html>
            )}

            {isOpen && (
                <Html position={[0, 0.3, 0]} center transform occlude>
                    <div className="w-[400px] h-[300px] bg-[#FFF8E7] rounded-lg shadow-2xl p-6 overflow-auto">
                        <h2 className="text-xl font-serif text-[#3E2723] mb-4">
                            Page {currentPage + 1}
                        </h2>
                        <p className="text-[#5D4037] text-sm leading-relaxed">
                            Welcome to my portfolio journal. Navigate through the pages to explore my work.
                        </p>
                    </div>
                </Html>
            )}
        </group>
    );
}

useGLTF.preload('/models/notebook.glb');
