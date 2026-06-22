'use client';

import { SCENE_POSITIONS } from '@/utils/constants';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import ObjectHint from './ObjectHint';
import { playMugClink } from '@/utils/audio';
import gsap from 'gsap';

function SteamParticles() {
    const particlesCount = 8;
    const pointsRef = useRef<THREE.Points>(null);
    const geoRef = useRef<THREE.BufferGeometry>(null);

    const [positions, velocities] = useMemo(() => {
        const pos = new Float32Array(particlesCount * 3);
        const vels = [];
        for (let i = 0; i < particlesCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 0.02;
            pos[i * 3 + 1] = 0.04 + Math.random() * 0.04;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
            vels.push({
                x: (Math.random() - 0.5) * 0.006,
                y: 0.008 + Math.random() * 0.012,
                z: (Math.random() - 0.5) * 0.006,
            });
        }
        return [pos, vels];
    }, []);

    useFrame((state) => {
        if (!geoRef.current) return;
        const posAttr = geoRef.current.getAttribute('position') as THREE.BufferAttribute;
        const time = state.clock.getElapsedTime();

        for (let i = 0; i < particlesCount; i++) {
            let x = posAttr.getX(i);
            let y = posAttr.getY(i);
            let z = posAttr.getZ(i);

            y += velocities[i].y * 0.4;
            x += velocities[i].x * 0.4 + Math.sin(time * 3 + i) * 0.0008;
            z += velocities[i].z * 0.4 + Math.cos(time * 2 + i) * 0.0008;

            if (y > 0.22) {
                y = 0.04;
                x = (Math.random() - 0.5) * 0.02;
                z = (Math.random() - 0.5) * 0.02;
            }

            posAttr.setXYZ(i, x, y, z);
        }
        posAttr.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry ref={geoRef}>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.022}
                color="#e5dec9"
                transparent
                opacity={0.16}
                depthWrite={false}
                blending={THREE.NormalBlending}
            />
        </points>
    );
}

function CoffeeMug() {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const [steamActive, setSteamActive] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMugClick = () => {
        playMugClink();
        if (!groupRef.current) return;

        gsap.killTweensOf(groupRef.current.scale);
        groupRef.current.scale.set(1, 1, 1);

        const tl = gsap.timeline();
        tl.to(groupRef.current.scale, { x: 1.12, y: 0.82, z: 1.12, duration: 0.08, ease: 'power1.out' })
          .to(groupRef.current.scale, { x: 0.9, y: 1.18, z: 0.9, duration: 0.12, ease: 'power2.out' })
          .to(groupRef.current.scale, { x: 1.04, y: 0.95, z: 1.04, duration: 0.08, ease: 'power1.inOut' })
          .to(groupRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.15, ease: 'power1.inOut' });

        setSteamActive(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setSteamActive(false);
        }, 5500);
    };

    return (
        <group
            ref={groupRef}
            position={SCENE_POSITIONS.coffeeMug}
        >
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.04, 0.035, 0.08, 16]} />
                <meshStandardMaterial color="#FFF8E7" roughness={0.6} />
            </mesh>

            <mesh position={[0.045, -0.005, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
                <torusGeometry args={[0.018, 0.005, 8, 16, Math.PI]} />
                <meshStandardMaterial color="#FFF8E7" roughness={0.6} />
            </mesh>

            <mesh position={[0, 0.03, 0]}>
                <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
                <meshStandardMaterial color="#3E2723" roughness={0.2} />
            </mesh>

            <mesh
                position={[0, 0, 0]}
                onClick={(e) => {
                    e.stopPropagation();
                    handleMugClick();
                }}
                onPointerEnter={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerLeave={(e) => {
                    e.stopPropagation();
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
            >
                <cylinderGeometry args={[0.055, 0.055, 0.1, 12]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {steamActive && <SteamParticles />}

            {hovered && (
                <Html position={[0, 0.16, 0]} center>
                    <ObjectHint>take a sip</ObjectHint>
                </Html>
            )}
        </group>
    );
}

export default function Props() {
    return (
        <group>
            <CoffeeMug />


            <group position={SCENE_POSITIONS.pen} rotation={[0, 0.5, Math.PI / 2]}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.008, 0.008, 0.15, 8]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
                </mesh>

                <mesh position={[0, -0.08, 0]} castShadow>
                    <coneGeometry args={[0.008, 0.02, 8]} />
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
                </mesh>

                <mesh position={[0.01, 0.05, 0]} castShadow>
                    <boxGeometry args={[0.003, 0.04, 0.01]} />
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
                </mesh>
            </group>


            <group position={[0.6, 0.52, -0.3]}>
                {[0, 0.002, 0.004, 0.006].map((y, i) => (
                    <mesh
                        key={i}
                        position={[0, y, 0]}
                        rotation={[0, (i * 0.1) - 0.15, 0]}
                        castShadow
                    >
                        <boxGeometry args={[0.08, 0.002, 0.08]} />
                        <meshStandardMaterial
                            color={['#FFE082', '#FFECB3', '#FFF59D', '#FFF176'][i]}
                            roughness={0.9}
                        />
                    </mesh>
                ))}
            </group>


            <group position={[-0.8, 0.52, 0.4]}>
                {[0, 0.02, 0.04].map((x, i) => (
                    <mesh
                        key={i}
                        position={[x, 0, 0]}
                        rotation={[Math.PI / 2, 0, 0.2 * i]}
                        castShadow
                    >
                        <torusGeometry args={[0.015, 0.002, 8, 16]} />
                        <meshStandardMaterial
                            color={['#C0C0C0', '#FFD700', '#FF6B6B'][i]}
                            metalness={0.9}
                            roughness={0.2}
                        />
                    </mesh>
                ))}
            </group>


            <group position={[-0.3, 0.52, -0.4]}>

                <mesh castShadow>
                    <cylinderGeometry args={[0.04, 0.03, 0.05, 16]} />
                    <meshStandardMaterial color="#D2691E" roughness={0.8} />
                </mesh>

                <mesh position={[0, 0.04, 0]} castShadow>
                    <dodecahedronGeometry args={[0.03]} />
                    <meshStandardMaterial color="#228B22" roughness={0.7} />
                </mesh>
            </group>
        </group>
    );
}
