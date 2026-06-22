'use client';

import { COLORS, LIGHTING } from '@/utils/constants';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LightingProps {
    lampOn: boolean;
}

export default function Lighting({ lampOn }: LightingProps) {
    const ambientRef = useRef<THREE.AmbientLight>(null);
    const pointRef = useRef<THREE.PointLight>(null);
    const spotRef = useRef<THREE.SpotLight>(null);
    const { scene } = useThree();

    useEffect(() => {
        if (!ambientRef.current || !pointRef.current || !spotRef.current) return;

        const targetLighting = lampOn ? LIGHTING.lampOn : LIGHTING.lampOff;

        gsap.to(ambientRef.current, {
            intensity: targetLighting.ambientIntensity,
            duration: 0.5,
            ease: 'power2.out',
        });

        gsap.killTweensOf(pointRef.current);
        gsap.killTweensOf(spotRef.current);

        if (lampOn) {
            const tl = gsap.timeline();
            tl.to(pointRef.current, { intensity: LIGHTING.lampOn.pointIntensity * 0.35, duration: 0.04, ease: 'power1.out' })
              .to(spotRef.current, { intensity: LIGHTING.lampOn.spotIntensity * 0.35, duration: 0.04, ease: 'power1.out' }, '<')
              
              .to(pointRef.current, { intensity: 0.05, duration: 0.03, ease: 'power1.in' })
              .to(spotRef.current, { intensity: 0, duration: 0.03, ease: 'power1.in' }, '<')
              
              .to(pointRef.current, { intensity: LIGHTING.lampOn.pointIntensity * 0.85, duration: 0.08, ease: 'power2.out' })
              .to(spotRef.current, { intensity: LIGHTING.lampOn.spotIntensity * 0.85, duration: 0.08, ease: 'power2.out' }, '<')
              
              .to(pointRef.current, { intensity: LIGHTING.lampOn.pointIntensity * 0.15, duration: 0.04, ease: 'power1.in' })
              .to(spotRef.current, { intensity: 0.05, duration: 0.04, ease: 'power1.in' }, '<')
              
              .to(pointRef.current, { intensity: LIGHTING.lampOn.pointIntensity, duration: 0.15, ease: 'power2.out' })
              .to(spotRef.current, { intensity: LIGHTING.lampOn.spotIntensity, duration: 0.15, ease: 'power2.out' }, '<');
        } else {
            gsap.to(pointRef.current, { intensity: 0, duration: 0.22, ease: 'power2.in' });
            gsap.to(spotRef.current, { intensity: 0, duration: 0.22, ease: 'power2.in' });
        }
    }, [lampOn]);

    useFrame(({ clock }) => {
        if (!lampOn) return;

        const t = clock.elapsedTime;
        const baseFluctuation = Math.sin(t * 22) * 0.012; 
        
        const hasDip = Math.random() < 0.0004;
        const dip = hasDip ? -0.12 : 0;

        const targetPoint = LIGHTING.lampOn.pointIntensity * (1 + baseFluctuation + dip);
        const targetSpot = LIGHTING.lampOn.spotIntensity * (1 + baseFluctuation + dip);

        if (pointRef.current) {
            pointRef.current.intensity = THREE.MathUtils.lerp(pointRef.current.intensity, targetPoint, 0.15);
        }
        if (spotRef.current) {
            spotRef.current.intensity = THREE.MathUtils.lerp(spotRef.current.intensity, targetSpot, 0.15);
        }
    });

    return (
        <>

            <ambientLight
                ref={ambientRef}
                intensity={LIGHTING.lampOff.ambientIntensity}
                color={COLORS.softBlue}
            />


            <pointLight
                ref={pointRef}
                position={[0.70, 1.35, -0.1]}
                intensity={0}
                color={COLORS.warmYellow}
                distance={5}
                decay={2}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0006}
            />


            <spotLight
                ref={spotRef}
                position={[0.70, 1.5, -0.1]}
                target-position={[-0.01, 1.05, 0.1]}
                angle={0.8}
                penumbra={0.5}
                intensity={0}
                color={COLORS.softOrange}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0006}
            />


            <directionalLight
                position={[-5, 3, -5]}
                intensity={0.15}
                color={COLORS.softBlue}
            />
            <directionalLight
                position={[0, 3, -4]}
                intensity={lampOn ? 0.2 : 0.05}
                color="#FFE0C0"
            />
        </>
    );
}
