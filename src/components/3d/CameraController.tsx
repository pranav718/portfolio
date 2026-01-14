'use client';

import { SCENE_POSITIONS } from '@/utils/constants';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect } from 'react';

interface CameraControllerProps {
    isJournalOpen: boolean;
}

export default function CameraController({ isJournalOpen }: CameraControllerProps) {
    const { camera } = useThree();

    useEffect(() => {
        if (isJournalOpen) {
            const journalPos = SCENE_POSITIONS.notebook;
            gsap.to(camera.position, {
                x: journalPos[0],
                y: 1.8,
                z: journalPos[2] + 0.6,
                duration: 1.2,
                ease: 'power2.inOut',
            });
            gsap.to(camera.rotation, {
                x: -Math.PI / 2.8,
                y: 0,
                z: 0,
                duration: 1.2,
                ease: 'power2.inOut',
            });
        } else {
            gsap.to(camera.position, {
                x: 0,
                y: 2.2,
                z: 3.2,
                duration: 1.0,
                ease: 'power2.inOut',
            });
            gsap.to(camera.rotation, {
                x: -0.3,
                y: 0,
                z: 0,
                duration: 1.0,
                ease: 'power2.inOut',
            });
        }
    }, [isJournalOpen, camera]);

    return null;
}
