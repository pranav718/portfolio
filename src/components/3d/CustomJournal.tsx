'use client';

import { about, contact, skills } from '@/content';
import { projects } from '@/content/projects';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface CustomJournalProps {
    isOpen: boolean;
    currentPage: number;
    lampOn: boolean;
}

function PageText({ children, position, size = 0.02, color = '#3E2723' }: {
    children: string;
    position: [number, number, number];
    size?: number;
    color?: string;
}) {
    return (
        <Text
            position={position}
            fontSize={size}
            color={color}
            anchorX="center"
            anchorY="top"
            maxWidth={0.35}
            lineHeight={1.4}
        >
            {children}
        </Text>
    );
}

function Page({
    position,
    rotation = [0, 0, 0],
    content,
    isVisible = true
}: {
    position: [number, number, number];
    rotation?: [number, number, number];
    content: React.ReactNode;
    isVisible?: boolean;
}) {
    if (!isVisible) return null;

    return (
        <group position={position} rotation={rotation}>
            <mesh receiveShadow castShadow>
                <planeGeometry args={[0.4, 0.5]} />
                <meshStandardMaterial
                    color="#FFF8E7"
                    roughness={0.9}
                    side={THREE.DoubleSide}
                />
            </mesh>
            {content}
        </group>
    );
}

export default function CustomJournal({ isOpen, currentPage, lampOn }: CustomJournalProps) {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (groupRef.current && isOpen) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
        }
    });

    if (!lampOn) return null;

    const pages = [
        <group key="about">
            <PageText position={[0, 0.2, 0.001]} size={0.035} color="#3E2723">
                Pranav Ray
            </PageText>
            <PageText position={[0, 0.13, 0.001]} size={0.018} color="#6D4C41">
                19 y/o Developer
            </PageText>
            <PageText position={[0, 0.02, 0.001]} size={0.014} color="#5D4037">
                {about.intro}
            </PageText>
            <PageText position={[0, -0.15, 0.001]} size={0.012} color="#8D6E63">
                {about.interests.slice(0, 3).join(' • ')}
            </PageText>
        </group>,

        <group key="projects">
            <PageText position={[0, 0.2, 0.001]} size={0.025} color="#3E2723">
                Projects
            </PageText>
            <PageText position={[0, 0.1, 0.001]} size={0.016} color="#4E342E">
                {projects[0]?.title || 'Portfolio v2'}
            </PageText>
            <PageText position={[0, 0.02, 0.001]} size={0.012} color="#5D4037">
                {projects[0]?.description || 'Immersive 3D portfolio'}
            </PageText>
            <PageText position={[0, -0.08, 0.001]} size={0.016} color="#4E342E">
                {projects[1]?.title || 'AlgoVisualizer'}
            </PageText>
            <PageText position={[0, -0.16, 0.001]} size={0.012} color="#5D4037">
                {projects[1]?.description || 'Algorithm visualization tool'}
            </PageText>
        </group>,

        <group key="skills">
            <PageText position={[0, 0.2, 0.001]} size={0.025} color="#3E2723">
                Skills
            </PageText>
            <PageText position={[0, 0.1, 0.001]} size={0.014} color="#6D4C41">
                Frontend
            </PageText>
            <PageText position={[0, 0.04, 0.001]} size={0.012} color="#5D4037">
                {skills.filter(s => s.category === 'frontend').map(s => s.name).join(' • ')}
            </PageText>
            <PageText position={[0, -0.06, 0.001]} size={0.014} color="#6D4C41">
                Backend
            </PageText>
            <PageText position={[0, -0.12, 0.001]} size={0.012} color="#5D4037">
                {skills.filter(s => s.category === 'backend').map(s => s.name).join(' • ')}
            </PageText>
        </group>,

        <group key="contact">
            <PageText position={[0, 0.15, 0.001]} size={0.025} color="#3E2723">
                Let's Connect
            </PageText>
            <PageText position={[0, 0.02, 0.001]} size={0.014} color="#5D4037">
                {contact.email}
            </PageText>
            <PageText position={[0, -0.05, 0.001]} size={0.012} color="#6D4C41">
                GitHub • LinkedIn
            </PageText>
            <PageText position={[0, -0.15, 0.001]} size={0.011} color="#8D6E63">
                "Building beautiful experiences"
            </PageText>
        </group>,
    ];

    return (
        <group ref={groupRef} position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh position={[-0.22, 0, -0.01]} castShadow>
                <boxGeometry args={[0.03, 0.52, 0.03]} />
                <meshStandardMaterial color="#5D4037" roughness={0.8} />
            </mesh>

            <mesh position={[0, 0, -0.02]} receiveShadow>
                <planeGeometry args={[0.42, 0.52]} />
                <meshStandardMaterial color="#8D6E63" roughness={0.9} side={THREE.DoubleSide} />
            </mesh>

            <Page
                position={[0, 0, 0.005]}
                content={pages[currentPage] || pages[0]}
                isVisible={isOpen}
            />
        </group>
    );
}
