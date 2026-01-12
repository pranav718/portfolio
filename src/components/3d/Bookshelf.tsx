'use client';

import { SCENE_POSITIONS } from '@/utils/constants';
import { useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';

function BookshelfModel() {
    const { scene } = useGLTF('/models/bookshelf.glb');
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
            scale={0.9}
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
        />
    );
}

function FallbackBookshelf() {
    return (
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 2, 0.4]} />
            <meshStandardMaterial color="#5c4033" roughness={0.8} />
        </mesh>
    );
}

export default function Bookshelf() {
    return (
        <group position={SCENE_POSITIONS.bookshelf}>
            <Suspense fallback={<FallbackBookshelf />}>
                <BookshelfModel />
            </Suspense>
        </group>
    );
}

useGLTF.preload('/models/bookshelf.glb');
