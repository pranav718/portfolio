'use client';

import { SCENE_POSITIONS } from '@/utils/constants';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Bookshelf() {
    const groupRef = useRef<THREE.Group>(null);

    return (
        <group ref={groupRef} position={SCENE_POSITIONS.bookshelf}>
            
            <mesh castShadow receiveShadow>
                <boxGeometry args={[2.5, 2.5, 0.4]} />
                <meshStandardMaterial color="#3E2723" roughness={0.8} />
            </mesh>

            
            {[-0.8, -0.2, 0.4, 1.0].map((y, i) => (
                <mesh key={i} position={[0, y, 0.05]} castShadow>
                    <boxGeometry args={[2.3, 0.04, 0.35]} />
                    <meshStandardMaterial color="#5D4037" roughness={0.7} />
                </mesh>
            ))}

            
            {[
                { pos: [-0.9, -0.55, 0.05], size: [0.08, 0.5, 0.25], color: '#8B0000' },
                { pos: [-0.75, -0.55, 0.05], size: [0.1, 0.45, 0.25], color: '#00008B' },
                { pos: [-0.58, -0.55, 0.05], size: [0.06, 0.48, 0.25], color: '#006400' },
                { pos: [-0.45, -0.55, 0.05], size: [0.12, 0.4, 0.25], color: '#4B0082' },
                { pos: [0.2, -0.55, 0.05], size: [0.15, 0.5, 0.25], color: '#8B4513' },
                { pos: [0.4, -0.55, 0.05], size: [0.08, 0.42, 0.25], color: '#2F4F4F' },
                { pos: [0.55, -0.55, 0.05], size: [0.1, 0.48, 0.25], color: '#800000' },
                { pos: [-0.8, 0.05, 0.05], size: [0.12, 0.4, 0.25], color: '#483D8B' },
                { pos: [-0.6, 0.05, 0.05], size: [0.1, 0.35, 0.25], color: '#2F4F4F' },
                { pos: [0.3, 0.05, 0.05], size: [0.08, 0.42, 0.25], color: '#8B0000' },
                { pos: [0.5, 0.05, 0.05], size: [0.15, 0.38, 0.25], color: '#006400' },
                { pos: [-0.7, 0.65, 0.05], size: [0.1, 0.45, 0.25], color: '#4B0082' },
                { pos: [0.6, 0.65, 0.05], size: [0.12, 0.4, 0.25], color: '#2F4F4F' },
            ].map((book, i) => (
                <mesh
                    key={i}
                    position={book.pos as [number, number, number]}
                    castShadow
                >
                    <boxGeometry args={book.size as [number, number, number]} />
                    <meshStandardMaterial color={book.color} roughness={0.6} />
                </mesh>
            ))}

            
            
            <mesh position={[0, 0.15, 0.1]} castShadow>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#4169E1" roughness={0.3} />
            </mesh>

            
            <mesh position={[0.9, 0.65, 0.08]} castShadow>
                <cylinderGeometry args={[0.06, 0.04, 0.1, 16]} />
                <meshStandardMaterial color="#8B4513" roughness={0.7} />
            </mesh>
            <mesh position={[0.9, 0.75, 0.08]} castShadow>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#228B22" roughness={0.8} />
            </mesh>
        </group>
    );
}
