'use client';

import Bookshelf from './Bookshelf';
import CameraController from './CameraController';
import Desk from './Desk';
import DeskLamp from './DeskLamp';
import Effects from './Effects';
import GlowingStars from './GlowingStars';
import Lighting from './Lighting';
import Notebook from './Notebook';
import Props from './Props';
import VinylPlayer from './VinylPlayer';

interface SceneProps {
    lampOn: boolean;
    onLampPull: () => void;
    notebookOpen: boolean;
    onNotebookOpen: () => void;
    currentPage: number;
    isPlaying: boolean;
    onMusicToggle: () => void;
}

export default function Scene({
    lampOn,
    onLampPull,
    notebookOpen,
    onNotebookOpen,
    currentPage,
    isPlaying,
    onMusicToggle,
}: SceneProps) {
    return (
        <>
            <CameraController isJournalOpen={notebookOpen} />

            <Lighting lampOn={lampOn} />

            
            <Effects lampOn={lampOn} />

            
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                receiveShadow
            >
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#1a1512" />
            </mesh>

            
            <Desk />
            <DeskLamp onPull={onLampPull} lampOn={lampOn} />
            <Notebook
                isOpen={notebookOpen}
                onOpen={onNotebookOpen}
                lampOn={lampOn}
                currentPage={currentPage}
            />
            <GlowingStars visible={true} />
            <VinylPlayer isPlaying={isPlaying} onToggle={onMusicToggle} lampOn={lampOn} />
            <Bookshelf />
            <Props />
        </>
    );
}
