'use client';

import { ROOM } from '@/utils/constants';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import ObjectHint from './ObjectHint';
import { playChessKnightKnock } from '@/utils/audio';
import gsap from 'gsap';

interface StickyNoteProps {
    isJournalOpen: boolean;
}

function StickyNote({ isJournalOpen }: StickyNoteProps) {
    return (
        <group position={[0.35, 1.06, -0.3]} rotation={[0, 0.15, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
                <planeGeometry args={[0.1, 0.1]} />
                <meshStandardMaterial
                    color="#FFE082"
                    roughness={0.9}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <mesh
                position={[0.045, 0.003, -0.04]}
                rotation={[-Math.PI / 2.3, 0, 0.1]}
                castShadow
            >
                <planeGeometry args={[0.02, 0.02]} />
                <meshStandardMaterial
                    color="#FFF59D"
                    roughness={0.9}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <Html
                position={[0, 0.005, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                center
                transform
                scale={0.02}
                zIndexRange={[0, 0]}
            >
                <div
                    style={{
                        fontFamily: "'Caveat', 'Segoe Script', cursive",
                        fontSize: '14px',
                        color: '#5D4037',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        userSelect: 'none',
                        textAlign: 'center',
                        lineHeight: '1.3',
                    }}
                >
                    <div style={{ fontWeight: 'bold' }}>hire me pls</div>
                </div>
            </Html>
        </group>
    );
}


function ChessKnight() {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    const handleKnightClick = () => {
        playChessKnightKnock();
        if (!groupRef.current) return;

        gsap.killTweensOf(groupRef.current.position);
        gsap.killTweensOf(groupRef.current.rotation);
        
        groupRef.current.position.y = 1.05;

        const tl = gsap.timeline();
        tl.to(groupRef.current.position, {
            y: 1.16,
            duration: 0.15,
            ease: 'power2.out'
        })
        .to(groupRef.current.position, {
            y: 1.05,
            duration: 0.2,
            ease: 'bounce.out'
        });

        gsap.to(groupRef.current.rotation, {
            y: groupRef.current.rotation.y + Math.PI / 2,
            duration: 0.35,
            ease: 'power1.out'
        });
    };

    return (
        <group 
            ref={groupRef}
            position={[-0.55, 1.05, -0.25]}
            onClick={(e) => {
                e.stopPropagation();
                handleKnightClick();
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
            <mesh position={[0, 0.005, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.022, 0.025, 0.01, 16]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.4}
                    metalness={0.3}
                />
            </mesh>

            <mesh position={[0, 0.025, 0]} castShadow>
                <cylinderGeometry args={[0.014, 0.02, 0.03, 12]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.4}
                    metalness={0.3}
                />
            </mesh>

            <mesh position={[0, 0.05, 0.003]} rotation={[0.2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.01, 0.014, 0.025, 10]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.4}
                    metalness={0.3}
                />
            </mesh>

            <mesh position={[0, 0.065, 0.008]} castShadow>
                <sphereGeometry args={[0.013, 12, 12]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.4}
                    metalness={0.3}
                />
            </mesh>

            <mesh position={[0, 0.06, 0.02]} rotation={[0.3, 0, 0]} castShadow>
                <boxGeometry args={[0.012, 0.01, 0.018]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.4}
                    metalness={0.3}
                />
            </mesh>

            <mesh position={[0, 0.078, 0.003]} rotation={[0.1, 0, 0]} castShadow>
                <coneGeometry args={[0.005, 0.012, 6]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.4}
                    metalness={0.3}
                />
            </mesh>

            <mesh position={[0, 0.04, 0]}>
                <boxGeometry args={[0.06, 0.1, 0.06]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {hovered && (
                <Html position={[0, 0.16, 0]} center>
                    <ObjectHint>move knight</ObjectHint>
                </Html>
            )}
        </group>
    );
}


function getISTTime() {
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
    const istMs = utcMs + 5.5 * 60 * 60_000;
    const ist = new Date(istMs);
    return {
        hours: ist.getHours(),
        minutes: ist.getMinutes(),
        seconds: ist.getSeconds(),
    };
}

function ClockTicks() {
    const ticks = useMemo(() => {
        const items: { angle: number; isHour: boolean }[] = [];
        for (let i = 0; i < 60; i++) {
            items.push({
                angle: (i / 60) * Math.PI * 2,
                isHour: i % 5 === 0,
            });
        }
        return items;
    }, []);

    return (
        <group>
            {ticks.map((tick, i) => {
                const len = tick.isHour ? 0.04 : 0.015;
                const width = tick.isHour ? 0.006 : 0.003;
                const dist = 0.28 - len / 2;
                return (
                    <mesh
                        key={i}
                        position={[
                            Math.sin(tick.angle) * dist,
                            Math.cos(tick.angle) * dist,
                            0.006,
                        ]}
                        rotation={[0, 0, -tick.angle]}
                    >
                        <boxGeometry args={[width, len, 0.003]} />
                        <meshStandardMaterial
                            color={tick.isHour ? '#1a1510' : '#3a3530'}
                            roughness={0.6}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}

function ClockNumerals() {
    const numerals = useMemo(() => [
        { text: 'XII', angle: 0, pos: [0, 0.21] },
        { text: 'III', angle: -Math.PI / 2, pos: [0.21, 0] },
        { text: 'VI', angle: -Math.PI, pos: [0, -0.21] },
        { text: 'IX', angle: -Math.PI * 1.5, pos: [-0.21, 0] },
    ], []);

    return (
        <group>
            {numerals.map((n) => (
                <Html
                    key={n.text}
                    position={[n.pos[0], n.pos[1], 0.007]}
                    center
                    transform
                    scale={0.018}
                    zIndexRange={[0, 0]}
                >
                    <div
                        style={{
                            fontFamily: "'Georgia', 'Times New Roman', serif",
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#2a2018',
                            pointerEvents: 'none',
                            userSelect: 'none',
                            letterSpacing: '1px',
                        }}
                    >
                        {n.text}
                    </div>
                </Html>
            ))}
        </group>
    );
}

function ClockHands() {
    const hourRef = useRef<THREE.Group>(null);
    const minuteRef = useRef<THREE.Group>(null);
    const secondRef = useRef<THREE.Group>(null);

    useFrame(() => {
        const { hours, minutes, seconds } = getISTTime();

        const hourAngle = -((hours % 12) + minutes / 60) * (Math.PI * 2 / 12);
        const minuteAngle = -(minutes + seconds / 60) * (Math.PI * 2 / 60);
        const secondAngle = -seconds * (Math.PI * 2 / 60);

        if (hourRef.current) hourRef.current.rotation.z = hourAngle;
        if (minuteRef.current) minuteRef.current.rotation.z = minuteAngle;
        if (secondRef.current) secondRef.current.rotation.z = secondAngle;
    });

    return (
        <group position={[0, 0, 0.01]}>
            <group ref={hourRef}>
                <mesh position={[0, 0.07, 0]} castShadow>
                    <boxGeometry args={[0.014, 0.14, 0.006]} />
                    <meshStandardMaterial color="#1a1510" roughness={0.5} metalness={0.2} />
                </mesh>
            </group>

            <group ref={minuteRef}>
                <mesh position={[0, 0.1, 0.001]} castShadow>
                    <boxGeometry args={[0.008, 0.2, 0.004]} />
                    <meshStandardMaterial color="#1a1510" roughness={0.5} metalness={0.2} />
                </mesh>
            </group>

            <group ref={secondRef}>
                <mesh position={[0, 0.09, 0.002]}>
                    <boxGeometry args={[0.003, 0.22, 0.002]} />
                    <meshStandardMaterial color="#8B2500" roughness={0.3} metalness={0.4} />
                </mesh>
                <mesh position={[0, -0.03, 0.002]}>
                    <boxGeometry args={[0.006, 0.06, 0.002]} />
                    <meshStandardMaterial color="#8B2500" roughness={0.3} metalness={0.4} />
                </mesh>
            </group>

            <mesh position={[0, 0, 0.008]}>
                <cylinderGeometry args={[0.012, 0.012, 0.008, 16]} />
                <meshStandardMaterial color="#C0A060" roughness={0.3} metalness={0.7} />
            </mesh>
        </group>
    );
}

function WallClock() {
    return (
        <group position={[1.5, 2.4, ROOM.backWallZ + 0.03]}>
            <mesh castShadow receiveShadow>
                <torusGeometry args={[0.32, 0.03, 16, 48]} />
                <meshStandardMaterial
                    color="#3E2A18"
                    roughness={0.8}
                    metalness={0.05}
                />
            </mesh>

            <mesh position={[0, 0, 0.002]}>
                <torusGeometry args={[0.29, 0.008, 12, 48]} />
                <meshStandardMaterial
                    color="#5C4033"
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>

            <mesh position={[0, 0, 0.003]} receiveShadow>
                <circleGeometry args={[0.285, 48]} />
                <meshStandardMaterial
                    color="#F5F0E8"
                    roughness={0.95}
                />
            </mesh>

            <ClockTicks />

            <ClockNumerals />

            <ClockHands />

            <mesh position={[0, 0, 0.02]}>
                <circleGeometry args={[0.29, 48]} />
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.04}
                    roughness={0.1}
                    metalness={0.3}
                />
            </mesh>

            <spotLight
                position={[0, 0.6, 0.3]}
                target-position={[0, 0, 0]}
                angle={0.5}
                penumbra={0.8}
                intensity={0.4}
                color="#FFE4B5"
                distance={2}
                decay={2}
            />
        </group>
    );
}

interface PersonalArtifactsProps {
    isJournalOpen: boolean;
}

export default function PersonalArtifacts({ isJournalOpen }: PersonalArtifactsProps) {
    return (
        <group>
            <StickyNote isJournalOpen={isJournalOpen} />
            <ChessKnight />
            <WallClock />
        </group>
    );
}

