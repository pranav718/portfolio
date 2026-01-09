'use client';

import { COLORS, SCENE_POSITIONS } from '@/utils/constants';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Desk() {
    const groupRef = useRef<THREE.Group>(null);

    return (
        <group ref={groupRef} position={SCENE_POSITIONS.desk}>
            
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.5, 0.05, 1.5]} />
                <meshStandardMaterial
                    color={COLORS.warmBrown}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>

            
            {[
                [-1.1, 0.25, -0.6],
                [1.1, 0.25, -0.6],
                [-1.1, 0.25, 0.6],
                [1.1, 0.25, 0.6],
            ].map((pos, i) => (
                <mesh
                    key={i}
                    position={pos as [number, number, number]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[0.08, 0.5, 0.08]} />
                    <meshStandardMaterial
                        color={COLORS.warmBrown}
                        roughness={0.7}
                        metalness={0.1}
                    />
                </mesh>
            ))}

            
            <mesh position={[0, 0.52, 0.725]} castShadow>
                <boxGeometry args={[2.5, 0.03, 0.05]} />
                <meshStandardMaterial color="#5D3A1A" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.52, -0.725]} castShadow>
                <boxGeometry args={[2.5, 0.03, 0.05]} />
                <meshStandardMaterial color="#5D3A1A" roughness={0.6} />
            </mesh>
        </group>
    );
}
