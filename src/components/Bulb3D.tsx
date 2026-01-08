'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function TestCube() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.5;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
}

export default function Bulb3D({ isOn }: { isOn: boolean }) {
    console.log('Bulb3D rendering, isOn:', isOn);

    return (
        <div style={{ width: '100%', height: '100%', background: 'transparent' }}>
            <Canvas
                camera={{ position: [0, 0, 3], fov: 50 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                    preserveDrawingBuffer: false,
                }}
                dpr={[1, 2]}
                onCreated={({ gl }) => {
                    console.log('Canvas created, WebGL renderer:', gl);
                }}
            >
                <color attach="background" args={['transparent']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                <TestCube />

                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}
