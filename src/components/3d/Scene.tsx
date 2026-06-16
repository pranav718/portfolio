'use client';

import Bookshelf from './Bookshelf';
import CameraController from './CameraController';
import Desk from './Desk';
import DeskLamp from './DeskLamp';
import Effects from './Effects';
import GlowingStars from './GlowingStars';
import Lighting from './Lighting';
import Notebook from './Notebook';
import OrigamiCrane from './OrigamiCrane';
import PersonalArtifacts from './PersonalArtifacts';
import Props from './Props';
import Room from './Room';
import VinylPlayer from './VinylPlayer';

interface SceneProps {
    lampOn: boolean;
    onLampPull: () => void;
    notebookOpen: boolean;
    onNotebookOpen: () => void;
    currentPage: number;
    isPlaying: boolean;
    onOpenPlayer: () => void;
    onBookshelfClick: () => void;
    isBookshelfOpen: boolean;
    isOnboarding: boolean;
}

export default function Scene({
    lampOn,
    onLampPull,
    notebookOpen,
    onNotebookOpen,
    currentPage,
    isPlaying,
    onOpenPlayer,
    onBookshelfClick,
    isBookshelfOpen,
    isOnboarding,
}: SceneProps) {
    return (
        <>
            <CameraController isJournalOpen={notebookOpen} isBookshelfOpen={isBookshelfOpen} />

            <Lighting lampOn={lampOn} />

            <Effects lampOn={lampOn} />

            <Room />

            <Desk />
            <DeskLamp onPull={onLampPull} lampOn={lampOn} isOnboarding={isOnboarding} />
            <Notebook
                isOpen={notebookOpen}
                onOpen={onNotebookOpen}
                lampOn={lampOn}
                currentPage={currentPage}
                isOnboarding={isOnboarding}
            />
            <GlowingStars visible={true} />
            <VinylPlayer isPlaying={isPlaying} onOpenPlayer={onOpenPlayer} lampOn={lampOn} isOnboarding={isOnboarding} />
            <Bookshelf lampOn={lampOn} isBookshelfOpen={isBookshelfOpen} onBookshelfClick={onBookshelfClick} isOnboarding={isOnboarding} />
            <Props />
            <PersonalArtifacts />
            <OrigamiCrane visible={lampOn && !notebookOpen} />
        </>
    );
}
