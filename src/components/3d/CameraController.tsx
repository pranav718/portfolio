'use client';

import { SCENE_POSITIONS } from '@/utils/constants';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CameraControllerProps {
    isJournalOpen: boolean;
    isBookshelfOpen: boolean;
}

export default function CameraController({ isJournalOpen, isBookshelfOpen }: CameraControllerProps) {
    const { camera } = useThree();
    const isIdle = !isJournalOpen && !isBookshelfOpen;
    const isTransitioning = useRef(false);
    const basePos = useRef({ x: 0, y: 2.2, z: 3.2 });
    const baseRot = useRef({ x: -0.3, y: 0, z: 0 });
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        isTransitioning.current = true;

        if (isJournalOpen) {
            gsap.to(camera.position, {
                x: SCENE_POSITIONS.notebook[0],
                y: SCENE_POSITIONS.notebook[1] + 0.65,
                z: SCENE_POSITIONS.notebook[2] + 0.05,
                duration: 1.8,
                ease: 'power3.inOut',
            });
            gsap.to(camera.rotation, {
                x: -Math.PI / 2,
                y: 0,
                z: 0,
                duration: 1.8,
                ease: 'power3.inOut',
                onComplete: () => {
                    isTransitioning.current = false;
                }
            });
        } else if (isBookshelfOpen) {
            gsap.to(camera.position, {
                x: SCENE_POSITIONS.bookshelf[0],
                y: SCENE_POSITIONS.bookshelf[1] + 1.2,
                z: SCENE_POSITIONS.bookshelf[2] + 2.0,
                duration: 1.6,
                ease: 'power2.inOut',
            });
            gsap.to(camera.rotation, {
                x: -0.1,
                y: 0,
                z: 0,
                duration: 1.6,
                ease: 'power2.inOut',
                onComplete: () => {
                    isTransitioning.current = false;
                }
            });
        } else {
            gsap.to(camera.position, {
                x: basePos.current.x,
                y: basePos.current.y,
                z: basePos.current.z,
                duration: 1.2,
                ease: 'power2.inOut',
            });
            gsap.to(camera.rotation, {
                x: baseRot.current.x,
                y: baseRot.current.y,
                z: baseRot.current.z,
                duration: 1.2,
                ease: 'power2.inOut',
                onComplete: () => {
                    isTransitioning.current = false;
                }
            });
        }
    }, [isJournalOpen, isBookshelfOpen, camera]);

    useFrame(({ clock }) => {
        if (!isIdle || isTransitioning.current) return;

        const t = clock.elapsedTime;
        const driftX = Math.sin(t * 0.25) * 0.035;
        const driftY = Math.sin(t * 0.18 + 1.0) * 0.015;
        const driftRotY = Math.sin(t * 0.15 + 0.5) * 0.003;

        const targetX = basePos.current.x + driftX + mouse.current.x * 0.12;
        const targetY = basePos.current.y + driftY + mouse.current.y * 0.06;
        const targetRotY = baseRot.current.y + driftRotY - mouse.current.x * 0.025;
        const targetRotX = baseRot.current.x + mouse.current.y * 0.015;

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotY, 0.04);
        camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotX, 0.04);
    });

    return null;
}
