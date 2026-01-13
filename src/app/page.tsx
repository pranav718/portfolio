'use client';

import Scene from '@/components/3d/Scene';
import AudioControls from '@/components/ui/AudioControls';
import HelpOverlay from '@/components/ui/HelpOverlay';
import LoadingScreen from '@/components/ui/LoadingScreen';
import MobileWarning from '@/components/ui/MobileWarning';
import PageNavigator from '@/components/ui/PageNavigator';
import { CAMERA, PAGES } from '@/utils/constants';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';

export default function Home() {
  const [lampOn, setLampOn] = useState(false);
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [isMuted, setIsMuted] = useState(false);

  const [showHelp, setShowHelp] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const hasVisited = localStorage.getItem('portfolio-visited');
    if (hasVisited) {
      setShowHelp(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLampPull = () => {
    setLampOn(true);
    localStorage.setItem('portfolio-visited', 'true');
    setShowHelp(false);
  };

  const handleNotebookOpen = () => {
    setNotebookOpen(true);
  };

  const handleMusicToggle = () => {
    setIsPlaying(!isPlaying);
  };

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
            onMusicToggle={handleMusicToggle}
          />
        </Suspense>
      </Canvas>

      
      <LoadingScreen />

      
      {showHelp && !lampOn && (
        <HelpOverlay onDismiss={() => setShowHelp(false)} />
      )}

      
      {lampOn && notebookOpen && (
        <PageNavigator
          currentPage={currentPage}
          totalPages={PAGES.total}
          onPageChange={setCurrentPage}
        />
      )}

      
      <AudioControls
        isPlaying={isPlaying}
        onToggle={handleMusicToggle}
        volume={volume}
        onVolumeChange={setVolume}
        isMuted={isMuted}
        onMuteToggle={() => setIsMuted(!isMuted)}
      />
    </main>
  );
}
