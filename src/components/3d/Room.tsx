'use client';

import { ROOM } from '@/utils/constants';
import { useMemo } from 'react';
import * as THREE from 'three';

interface WindowTheme {
    color: string;
    intensity: number;
    lightIntensity: number;
}

function getISTWindowTheme(): WindowTheme {
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
    const istMs = utcMs + 5.5 * 60 * 60_000;
    const istHour = new Date(istMs).getHours();

    if (istHour >= 6 && istHour < 10) {
        return { color: '#FFE4B5', intensity: 0.4, lightIntensity: 0.15 };
    }
    if (istHour >= 10 && istHour < 17) {
        return { color: '#E8E4DF', intensity: 0.5, lightIntensity: 0.18 };
    }
    if (istHour >= 17 && istHour < 20) {
        return { color: '#FFAD60', intensity: 0.35, lightIntensity: 0.12 };
    }
    return { color: '#2a3a5c', intensity: 0.12, lightIntensity: 0.06 };
}

function Window() {
    const theme = useMemo(() => getISTWindowTheme(), []);
    const [wx, wy, wz] = ROOM.windowCenter;
    const [ww, wh] = ROOM.windowSize;

    const frameDepth = 0.03;
    const frameThick = 0.04;

    return (
        <group position={[wx, wy, wz]}>
            <mesh rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[ww, wh]} />
                <meshBasicMaterial
                    color={theme.color}
                    transparent
                    opacity={theme.intensity}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <mesh rotation={[0, Math.PI / 2, 0]} position={[0.01, 0, 0]}>
                <planeGeometry args={[ww + 0.15, wh + 0.15]} />
                <meshBasicMaterial
                    color={theme.color}
                    transparent
                    opacity={theme.intensity * 0.25}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            <mesh position={[0, wh / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[ww + frameThick, frameThick, frameDepth]} />
                <meshStandardMaterial color="#2a2018" roughness={0.85} />
            </mesh>
            <mesh position={[0, -wh / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[ww + frameThick, frameThick, frameDepth]} />
                <meshStandardMaterial color="#2a2018" roughness={0.85} />
            </mesh>
            <mesh position={[0, 0, -ww / 2]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[frameThick, wh, frameDepth]} />
                <meshStandardMaterial color="#2a2018" roughness={0.85} />
            </mesh>
            <mesh position={[0, 0, ww / 2]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[frameThick, wh, frameDepth]} />
                <meshStandardMaterial color="#2a2018" roughness={0.85} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[0.02, wh, frameDepth]} />
                <meshStandardMaterial color="#2a2018" roughness={0.85} />
            </mesh>
            <mesh position={[0, 0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[ww, 0.02, frameDepth]} />
                <meshStandardMaterial color="#2a2018" roughness={0.85} />
            </mesh>
            <pointLight
                position={[0.3, 0, 0]}
                color={theme.color}
                intensity={theme.lightIntensity}
                distance={4}
                decay={2}
            />
        </group>
    );
}


function Baseboards() {
    const stripHeight = 0.02;
    const stripColor = '#0d0b09';

    return (
        <group>
            <mesh position={[0, stripHeight / 2, ROOM.backWallZ + 0.01]}>
                <boxGeometry args={[ROOM.wallWidth, stripHeight, 0.02]} />
                <meshStandardMaterial color={stripColor} roughness={1} />
            </mesh>

            <mesh
                position={[ROOM.sideWallX + 0.01, stripHeight / 2, 0]}
                rotation={[0, Math.PI / 2, 0]}
            >
                <boxGeometry args={[ROOM.wallWidth, stripHeight, 0.02]} />
                <meshStandardMaterial color={stripColor} roughness={1} />
            </mesh>

            <mesh
                position={[ROOM.rightWallX - 0.01, stripHeight / 2, 0]}
                rotation={[0, -Math.PI / 2, 0]}
            >
                <boxGeometry args={[ROOM.wallWidth, stripHeight, 0.02]} />
                <meshStandardMaterial color={stripColor} roughness={1} />
            </mesh>
        </group>
    );
}


function CornerShadows() {
    const shadowColor = '#080604';

    return (
        <group>
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0.005, ROOM.backWallZ + 0.3]}
            >
                <planeGeometry args={[ROOM.wallWidth, 0.6]} />
                <meshBasicMaterial
                    color={shadowColor}
                    transparent
                    opacity={0.25}
                    depthWrite={false}
                />
            </mesh>

            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[ROOM.sideWallX + 0.3, 0.005, 0]}
            >
                <planeGeometry args={[0.6, ROOM.wallWidth]} />
                <meshBasicMaterial
                    color={shadowColor}
                    transparent
                    opacity={0.25}
                    depthWrite={false}
                />
            </mesh>

            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[ROOM.rightWallX - 0.3, 0.005, 0]}
            >
                <planeGeometry args={[0.6, ROOM.wallWidth]} />
                <meshBasicMaterial
                    color={shadowColor}
                    transparent
                    opacity={0.2}
                    depthWrite={false}
                />
            </mesh>

            <mesh
                position={[ROOM.sideWallX + 0.01, ROOM.wallHeight / 2, ROOM.backWallZ + 0.01]}
            >
                <planeGeometry args={[0.4, ROOM.wallHeight]} />
                <meshBasicMaterial
                    color={shadowColor}
                    transparent
                    opacity={0.15}
                    depthWrite={false}
                />
            </mesh>

            <mesh
                position={[ROOM.rightWallX - 0.01, ROOM.wallHeight / 2, ROOM.backWallZ + 0.01]}
                rotation={[0, Math.PI, 0]}
            >
                <planeGeometry args={[0.4, ROOM.wallHeight]} />
                <meshBasicMaterial
                    color={shadowColor}
                    transparent
                    opacity={0.15}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}


function FloorProps() {
    return (
        <group>
            <mesh
                rotation={[-Math.PI / 2, 0, 0.05]}
                position={[0, 0.003, 0.8]}
                receiveShadow
            >
                <planeGeometry args={[2.2, 1.4]} />
                <meshStandardMaterial
                    color="#3D2B1F"
                    roughness={0.98}
                />
            </mesh>
            <mesh
                rotation={[-Math.PI / 2, 0, 0.05]}
                position={[0, 0.002, 0.8]}
                receiveShadow
            >
                <planeGeometry args={[2.4, 1.6]} />
                <meshStandardMaterial
                    color="#4A3728"
                    roughness={0.98}
                />
            </mesh>



            <group position={[1.0, 0, 0.4]}>
                <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.1, 0.08, 0.24, 12, 1, true]} />
                    <meshStandardMaterial
                        color="#2A2118"
                        roughness={0.85}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[0.08, 12]} />
                    <meshStandardMaterial color="#1E1810" roughness={0.9} />
                </mesh>
                <mesh position={[0, 0.24, 0]}>
                    <torusGeometry args={[0.1, 0.006, 8, 24]} />
                    <meshStandardMaterial color="#3A3028" roughness={0.7} />
                </mesh>
            </group>
        </group>
    );
}


export default function Room() {
    const wallMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: '#1c1916',
                roughness: 0.92,
                metalness: 0,
                side: THREE.FrontSide,
            }),
        [],
    );

    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[ROOM.floorSize, ROOM.floorSize]} />
                <meshStandardMaterial color="#1a1512" roughness={0.95} />
            </mesh>

            <mesh
                position={[0, ROOM.wallHeight / 2, ROOM.backWallZ]}
                receiveShadow
            >
                <planeGeometry args={[ROOM.wallWidth, ROOM.wallHeight]} />
                <primitive object={wallMaterial} attach="material" />
            </mesh>

            <mesh
                position={[ROOM.sideWallX, ROOM.wallHeight / 2, 0]}
                rotation={[0, Math.PI / 2, 0]}
                receiveShadow
            >
                <planeGeometry args={[ROOM.wallWidth, ROOM.wallHeight]} />
                <primitive object={wallMaterial} attach="material" />
            </mesh>

            <mesh
                position={[ROOM.rightWallX, ROOM.wallHeight / 2, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                receiveShadow
            >
                <planeGeometry args={[ROOM.wallWidth, ROOM.wallHeight]} />
                <meshStandardMaterial
                    color="#1c1916"
                    roughness={0.92}
                    metalness={0}
                />
            </mesh>

            <Window />

            <FloorProps />

            <Baseboards />

            <CornerShadows />
        </group>
    );
}
