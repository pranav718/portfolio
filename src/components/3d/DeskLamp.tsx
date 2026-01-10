'use client';

import { COLORS, SCENE_POSITIONS } from '@/utils/constants';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

interface DeskLampProps {
    onPull: () => void;
    lampOn: boolean;
}

export default function DeskLamp({ onPull, lampOn }: DeskLampProps) {
    const groupRef = useRef<THREE.Group>(null);
    const bulbRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [pulled, setPulled] = useState(false);

    const metalColor = '#c0c0c0';

    const metalMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: metalColor,
        metalness: 0.7,
        roughness: 0.3,
    }), []);

    const darkMetal = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#2a2a2a',
        metalness: 0.8,
        roughness: 0.2,
    }), []);

    const shadeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: metalColor,
        metalness: 0.6,
        roughness: 0.4,
        side: THREE.DoubleSide,
    }), []);

    useFrame(() => {
        if (bulbRef.current) {
            const material = bulbRef.current.material as THREE.MeshStandardMaterial;
            material.emissiveIntensity = THREE.MathUtils.lerp(
                material.emissiveIntensity,
                lampOn ? 2.5 : 0,
                0.08
            );
        }
    });

    const handleClick = () => {
        if (pulled || lampOn) return;
        setPulled(true);
        setTimeout(() => onPull(), 80);
    };

    const ArmSegment = ({ length, position, rotation }: { length: number; position: [number, number, number]; rotation: [number, number, number] }) => {
        const rodOffset = 0.025;
        const halfLength = length / 2;

        return (
            <group position={position} rotation={rotation}>
                <mesh position={[rodOffset, halfLength, 0]} castShadow>
                    <cylinderGeometry args={[0.008, 0.008, length, 8]} />
                    <primitive object={metalMaterial} attach="material" />
                </mesh>
                <mesh position={[-rodOffset, halfLength, 0]} castShadow>
                    <cylinderGeometry args={[0.008, 0.008, length, 8]} />
                    <primitive object={metalMaterial} attach="material" />
                </mesh>

                {[0.15, 0.5, 0.85].map((t, i) => (
                    <mesh key={i} position={[0, length * t, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                        <cylinderGeometry args={[0.005, 0.005, 0.05, 6]} />
                        <primitive object={metalMaterial} attach="material" />
                    </mesh>
                ))}
            </group>
        );
    };

    const Joint = ({ position }: { position: [number, number, number] }) => (
        <group position={position}>
            <mesh castShadow>
                <cylinderGeometry args={[0.018, 0.018, 0.03, 16]} />
                <primitive object={darkMetal} attach="material" />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.022, 0.022, 0.05, 16]} />
                <primitive object={metalMaterial} attach="material" />
            </mesh>
        </group>
    );

    const Spring = ({ start, end }: { start: [number, number, number]; end: [number, number, number] }) => {
        const points = [];
        const segments = 20;
        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const x = start[0] + (end[0] - start[0]) * t;
            const y = start[1] + (end[1] - start[1]) * t;
            const z = start[2] + (end[2] - start[2]) * t + Math.sin(t * Math.PI * 8) * 0.008;
            points.push(new THREE.Vector3(x, y, z));
        }
        const curve = new THREE.CatmullRomCurve3(points);

        return (
            <mesh>
                <tubeGeometry args={[curve, 40, 0.003, 6, false]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
            </mesh>
        );
    };

    return (
        <group ref={groupRef} position={SCENE_POSITIONS.lamp}>

            <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.14, 0.16, 0.04, 32]} />
                <primitive object={metalMaterial} attach="material" />
            </mesh>
            <mesh position={[0, 0.045, 0]} castShadow>
                <cylinderGeometry args={[0.12, 0.14, 0.01, 32]} />
                <primitive object={metalMaterial} attach="material" />
            </mesh>

            <Joint position={[0, 0.07, 0]} />

            <group position={[0, 0.07, 0]} rotation={[0, 0, 0.4]}>
                <ArmSegment length={0.35} position={[0, 0, 0]} rotation={[0, 0, 0]} />
                <Spring start={[0.04, 0.08, 0]} end={[0.04, 0.28, 0]} />

                <Joint position={[0, 0.35, 0]} />

                <group position={[0, 0.35, 0]} rotation={[0, 0, -0.9]}>
                    <ArmSegment length={0.35} position={[0, 0, 0]} rotation={[0, 0, 0]} />
                    <Spring start={[-0.04, 0.08, 0]} end={[-0.04, 0.28, 0]} />

                    <Joint position={[0, 0.35, 0]} />

                    <group position={[0, 0.38, 0]} rotation={[0, 0, 0.3]}>
                        <mesh castShadow>
                            <sphereGeometry args={[0.11, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
                            <primitive object={shadeMaterial} attach="material" />
                        </mesh>

                        <mesh position={[0, -0.02, 0]}>
                            <sphereGeometry args={[0.105, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
                            <meshStandardMaterial
                                color="#fff8f0"
                                side={THREE.BackSide}
                                emissive="#fff8f0"
                                emissiveIntensity={lampOn ? 0.5 : 0}
                            />
                        </mesh>

                        <mesh position={[0, 0.03, 0]} castShadow>
                            <cylinderGeometry args={[0.02, 0.015, 0.04, 12]} />
                            <primitive object={darkMetal} attach="material" />
                        </mesh>

                        <mesh ref={bulbRef} position={[0, -0.03, 0]}>
                            <sphereGeometry args={[0.04, 16, 16]} />
                            <meshStandardMaterial
                                color={COLORS.warmYellow}
                                emissive={COLORS.warmYellow}
                                emissiveIntensity={0}
                                transparent
                                opacity={0.95}
                            />
                        </mesh>
                    </group>
                </group>
            </group>

            <mesh
                position={[0.15, 0.45, 0]}
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
                <Html position={[0.3, 0.85, 0.15]} center>
                    <div
                        className={`bg-black/95 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none transition-all duration-200 border shadow-xl ${hovered ? 'border-yellow-400 bg-yellow-900/70 scale-110' : 'border-white/10'}`}
                    >
                        {hovered ? '👆 Click!' : '💡 Click lamp'}
                    </div>
                </Html>
            )}
        </group>
    );
}
