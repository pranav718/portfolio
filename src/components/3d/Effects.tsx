'use client';

import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';

interface EffectsProps {
    lampOn: boolean;
}

export default function Effects({ lampOn }: EffectsProps) {
    return (
        <EffectComposer>
            
            <Bloom
                intensity={lampOn ? 0.3 : 0}
                luminanceThreshold={0.9}
                luminanceSmoothing={0.9}
                mipmapBlur
            />

            
            <Vignette
                offset={0.5}
                darkness={lampOn ? 0.3 : 0.7}
            />
        </EffectComposer>
    );
}
