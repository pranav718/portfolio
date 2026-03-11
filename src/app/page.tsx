'use client';

import Scene from '@/components/3d/Scene';
import AudioControls from '@/components/ui/AudioControls';
import BookViewer from '@/components/ui/BookViewer';
import InkBleedTransition from '@/components/ui/InkBleedTransition';
import LoadingScreen from '@/components/ui/LoadingScreen';
import MobileWarning from '@/components/ui/MobileWarning';
import MusicPlayer from '@/components/ui/MusicPlayer';
import OnboardingGuide from '@/components/ui/OnboardingGuide';
import { CAMERA } from '@/utils/constants';
import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useEffect, useState } from 'react';

export default function Home() {
  const [lampOn, setLampOn] = useState(false);
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [musicPlayerOpen, setMusicPlayerOpen] = useState(false);

  const [onboardingStep, setOnboardingStep] = useState<'landing' | 'lamp' | 'hints' | null>('landing');
  const [isMobile, setIsMobile] = useState(false);
  const [bookshelfOpen, setBookshelfOpen] = useState(false);

  useEffect(() => {
    setNotebookOpen(false);
    setIsTransitioning(false);
    setCurrentPage(0);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const hasVisited = localStorage.getItem('portfolio-visited');
    if (hasVisited) {
      setOnboardingStep('lamp');
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLampPull = () => {
    setLampOn(!lampOn);
    if (!lampOn) {
      localStorage.setItem('portfolio-visited', 'true');
      if (onboardingStep === 'lamp') {
        setOnboardingStep('hints');
      }
    }
    if (lampOn) {
      setNotebookOpen(false);
      setCurrentPage(0);
    }
  };

  const handleNotebookOpen = () => {
    setNotebookOpen(true);
    setTimeout(() => {
      setIsTransitioning(true);
    }, 1800);
  };

  const handleMusicToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBookshelfClick = () => {
    setBookshelfOpen(true);
  };

  const handleBookshelfClose = () => {
    setBookshelfOpen(false);
  };

  const handleEnterSpace = () => {
    setOnboardingStep('lamp');
  };

  const handleHintsDone = useCallback(() => {
    setOnboardingStep(null);
  }, []);

  if (isMobile) {
    return <MobileWarning />;
  }

  return (
    <main className="w-full h-screen bg-[#0a0a0a] canvas-container">

      <Canvas
        shadows
        camera={{
          position: CAMERA.initialPosition,
          fov: CAMERA.fov,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene
            lampOn={lampOn}
            onLampPull={handleLampPull}
            notebookOpen={notebookOpen}
            onNotebookOpen={handleNotebookOpen}
            currentPage={currentPage}
            isPlaying={isPlaying}
            onOpenPlayer={() => setMusicPlayerOpen(true)}
            onBookshelfClick={handleBookshelfClick}
            isBookshelfOpen={bookshelfOpen}
            isOnboarding={onboardingStep === 'hints'}
          />
        </Suspense>
      </Canvas>

      <LoadingScreen />

      <OnboardingGuide
        step={onboardingStep}
        onEnterSpace={handleEnterSpace}
        onHintsDone={handleHintsDone}
      />

      <AudioControls
        isPlaying={isPlaying}
        onOpenPlayer={() => setMusicPlayerOpen(true)}
      />

      <MusicPlayer
        isOpen={musicPlayerOpen}
        onClose={() => setMusicPlayerOpen(false)}
        isPlaying={isPlaying}
        onTogglePlay={handleMusicToggle}
      />

      <BookViewer isOpen={bookshelfOpen} onClose={handleBookshelfClose} />

      <InkBleedTransition isActive={isTransitioning} />
    </main>
  );
}
