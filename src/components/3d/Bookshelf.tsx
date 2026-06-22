'use client';

import { SCENE_POSITIONS } from '@/utils/constants';
import { Html, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import ObjectHint from './ObjectHint';
import { playCameraWhoosh } from '@/utils/audio';

interface BookshelfProps {
    lampOn: boolean;
    isBookshelfOpen: boolean;
    onBookshelfClick: () => void;
    isOnboarding: boolean;
}

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

export default function Bookshelf({ lampOn, isBookshelfOpen, onBookshelfClick, isOnboarding }: BookshelfProps) {
    const [hovered, setHovered] = useState(false);

    const handleClick = () => {
        if (!lampOn) return;
        setTimeout(() => playCameraWhoosh(), 160);
        setHovered(false);
        document.body.style.cursor = 'auto';
        onBookshelfClick();
    };

    return (
        <group position={SCENE_POSITIONS.bookshelf}>
            <Suspense fallback={<FallbackBookshelf />}>
                <BookshelfModel />
            </Suspense>

            <mesh
                position={[0, 1, 0.2]}
                onPointerEnter={() => {
                    if (lampOn && !isBookshelfOpen && !isOnboarding) {
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
                <boxGeometry args={[1.6, 2.2, 0.6]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {lampOn && hovered && !isBookshelfOpen && !isOnboarding && (
                <Html position={[0, 2.1, 0.2]} center>
                    <ObjectHint>browse shelf</ObjectHint>
                </Html>
            )}
        </group>
    );
}

useGLTF.preload('/models/bookshelf.glb');
