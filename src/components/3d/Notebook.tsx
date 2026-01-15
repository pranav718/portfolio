'use client';

import { about, contact, skills } from '@/content';
import { projects } from '@/content/projects';
import { COLORS, SCENE_POSITIONS } from '@/utils/constants';
import { Html, Text, useGLTF } from '@react-three/drei';
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
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={0.25}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
        />
    );
}

function JournalText({
    children,
    position,
    fontSize = 0.015,
    color = '#3E2723',
    maxWidth = 0.25
}: {
    children: string;
    position: [number, number, number];
    fontSize?: number;
    color?: string;
    maxWidth?: number;
}) {
    return (
        <Text
            position={position}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={fontSize}
            color={color}
            anchorX="center"
            anchorY="top"
            maxWidth={maxWidth}
            lineHeight={1.5}
        >
            {children}
        </Text>
    );
}

function JournalPageContent({ currentPage }: { currentPage: number }) {
    const pageContents = [
        <group key="about">
            <JournalText position={[0, 0.001, 0.08]} fontSize={0.025} color="#3E2723">
                Pranav Ray
            </JournalText>
            <JournalText position={[0, 0.001, 0.04]} fontSize={0.012} color="#6D4C41">
                19 y/o Developer
            </JournalText>
            <JournalText position={[0, 0.001, -0.02]} fontSize={0.009} color="#5D4037" maxWidth={0.28}>
                {about.intro}
            </JournalText>
            <JournalText position={[0, 0.001, -0.12]} fontSize={0.008} color="#8D6E63">
                {about.interests.slice(0, 3).join(' • ')}
            </JournalText>
        </group>,

        <group key="projects">
            <JournalText position={[0, 0.001, 0.08]} fontSize={0.02} color="#3E2723">
                Projects
            </JournalText>
            <JournalText position={[0, 0.001, 0.03]} fontSize={0.012} color="#4E342E">
                {projects[0]?.title || 'Portfolio v2'}
            </JournalText>
            <JournalText position={[0, 0.001, 0]} fontSize={0.008} color="#5D4037" maxWidth={0.28}>
                {projects[0]?.description || 'Immersive 3D portfolio'}
            </JournalText>
            <JournalText position={[0, 0.001, -0.06]} fontSize={0.012} color="#4E342E">
                {projects[1]?.title || 'AlgoVisualizer'}
            </JournalText>
            <JournalText position={[0, 0.001, -0.1]} fontSize={0.008} color="#5D4037" maxWidth={0.28}>
                {projects[1]?.description || 'Algorithm visualization tool'}
            </JournalText>
        </group>,

        <group key="skills">
            <JournalText position={[0, 0.001, 0.08]} fontSize={0.02} color="#3E2723">
                Skills
            </JournalText>
            <JournalText position={[0, 0.001, 0.03]} fontSize={0.01} color="#6D4C41">
                Frontend
            </JournalText>
            <JournalText position={[0, 0.001, 0]} fontSize={0.007} color="#5D4037" maxWidth={0.28}>
                {skills.filter(s => s.category === 'frontend').map(s => s.name).join(' • ')}
            </JournalText>
            <JournalText position={[0, 0.001, -0.06]} fontSize={0.01} color="#6D4C41">
                Backend
            </JournalText>
            <JournalText position={[0, 0.001, -0.1]} fontSize={0.007} color="#5D4037" maxWidth={0.28}>
                {skills.filter(s => s.category === 'backend').map(s => s.name).join(' • ')}
            </JournalText>
        </group>,

        <group key="contact">
            <JournalText position={[0, 0.001, 0.06]} fontSize={0.018} color="#3E2723">
                Let's Connect
            </JournalText>
            <JournalText position={[0, 0.001, 0]} fontSize={0.01} color="#5D4037">
                {contact.email}
            </JournalText>
            <JournalText position={[0, 0.001, -0.05]} fontSize={0.008} color="#6D4C41">
                GitHub • LinkedIn
            </JournalText>
            <JournalText position={[0, 0.001, -0.12]} fontSize={0.007} color="#8D6E63">
                "Building beautiful experiences"
            </JournalText>
        </group>,
    ];

    return pageContents[currentPage] || pageContents[0];
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

            {lampOn && !isOpen && hovered && (
                <Html position={[0, 0.25, 0]} center>
                    <div
                        className="bg-black/90 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none border border-yellow-400/50 shadow-xl animate-fade-in"
                        style={{
                            animation: 'fadeIn 0.2s ease-out forwards',
                        }}
                    >
                        View Portfolio
                    </div>
                </Html>
            )}

            {isOpen && (
                <group position={[0.05, 0.06, 0]}>
                    <JournalPageContent currentPage={currentPage} />
                </group>
            )}
        </group>
    );
}

useGLTF.preload('/models/notebook.glb');
