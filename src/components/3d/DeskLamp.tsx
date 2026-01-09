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
                            0.1
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
            scale={0.3}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
        />
    );
}

export default function DeskLamp({ onPull, lampOn }: DeskLampProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const [pulled, setPulled] = useState(false);

    const handlePull = () => {
        if (pulled || lampOn) return;
        setPulled(true);
        setTimeout(() => onPull(), 100);
    };

    const handleHoverEnter = () => {
        if (!lampOn) {
            setHovered(true);
            document.body.style.cursor = 'pointer';
        }
    };

    const handleHoverLeave = () => {
        setHovered(false);
        document.body.style.cursor = 'auto';
    };

    return (
        <group ref={groupRef} position={SCENE_POSITIONS.lamp}>
            
            <Suspense fallback={
                <mesh>
                    <boxGeometry args={[0.2, 0.5, 0.2]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            }>
                <LampModel lampOn={lampOn} />
            </Suspense>

            
            <mesh
                position={[0, 0.5, 0]}
                onPointerEnter={handleHoverEnter}
                onPointerLeave={handleHoverLeave}
                onClick={handlePull}
            >
                <boxGeometry args={[0.8, 1.2, 0.8]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            
            {!lampOn && (
                <Html position={[0, 1.2, 0.3]} center>
                    <div
                        className={`bg-black/90 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none transition-all duration-200 border ${hovered ? 'border-yellow-400 bg-yellow-900/50' : 'border-transparent'}`}
                    >
                        {hovered ? '👆 Click now!' : '💡 Click the lamp'}
                    </div>
                </Html>
            )}
        </group>
    );
}

useGLTF.preload('/models/desk-lamp.glb');
